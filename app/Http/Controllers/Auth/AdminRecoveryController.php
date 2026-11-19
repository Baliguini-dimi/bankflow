<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AdminRecoveryController extends Controller
{
    public function show(): Response
    {
        abort_unless($this->isEnabled(), 404);

        return response()
            ->view('auth.admin-recovery')
            ->header('Cache-Control', 'no-store, private');
    }

    public function recover(Request $request): RedirectResponse
    {
        abort_unless($this->isEnabled(), 404);

        $validator = Validator::make($request->all(), [
            'token' => ['required', 'string', 'max:512'],
            'password' => ['required', 'string', 'min:16', 'max:128'],
            'password_confirmation' => ['required', 'same:password'],
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput([]);
        }

        if (! hash_equals((string) config('services.bankflow_admin_recovery.token'), $request->string('token')->toString())) {
            return back()->withErrors(['token' => 'Le jeton de récupération est invalide.'])->withInput([]);
        }

        if (DB::table('admin_recoveries')->where('id', 1)->exists()) {
            throw new HttpException(410, 'La récupération administrateur a déjà été utilisée.');
        }

        DB::transaction(function () use ($request): void {
            DB::table('admin_recoveries')->insert([
                'id' => 1,
                'used_at' => now(),
            ]);

            $user = User::firstOrNew(['email' => 'admin@bankflow.ci']);

            if (! $user->exists) {
                $user->name = 'Administrateur';
            }

            $user->password = $request->string('password')->toString();
            $user->setRememberToken(Str::random(60));
            $user->save();

            DB::table('sessions')->where('user_id', $user->id)->delete();
        });

        return redirect()
            ->route('login')
            ->with('status', 'Le compte administrateur a été réinitialisé. Connectez-vous puis désactivez la récupération.');
    }

    private function isEnabled(): bool
    {
        $token = config('services.bankflow_admin_recovery.token');

        return (bool) config('services.bankflow_admin_recovery.enabled')
            && is_string($token)
            && strlen($token) >= 32;
    }
}
