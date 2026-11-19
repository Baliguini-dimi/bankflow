<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminRecoveryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'services.bankflow_admin_recovery.enabled' => true,
            'services.bankflow_admin_recovery.token' => str_repeat('r', 48),
        ]);
    }

    public function test_recovery_is_disabled_by_default(): void
    {
        config(['services.bankflow_admin_recovery.enabled' => false]);

        $this->get('/temporary-admin-recovery')->assertNotFound();
        $this->post('/temporary-admin-recovery')->assertNotFound();
    }

    public function test_recovery_form_is_available_when_enabled(): void
    {
        $this->get('/temporary-admin-recovery')
            ->assertOk()
            ->assertSee('name="token"', false)
            ->assertSee('name="password_confirmation"', false)
            ->assertHeader('Cache-Control', 'no-store, private');
    }

    public function test_admin_password_can_be_recovered_once_with_the_token(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@bankflow.ci',
            'password' => 'Old-Temporary-Password-123!',
        ]);

        $response = $this->post('/temporary-admin-recovery', [
            'token' => str_repeat('r', 48),
            'password' => 'New-Temporary-Password-456!',
            'password_confirmation' => 'New-Temporary-Password-456!',
        ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('login'));

        $this->assertTrue(Hash::check('New-Temporary-Password-456!', $user->fresh()->password));
        $this->assertDatabaseHas('admin_recoveries', ['id' => 1]);

        $this->post('/login', [
            'email' => 'admin@bankflow.ci',
            'password' => 'New-Temporary-Password-456!',
        ])->assertRedirect(route('dashboard'));

        $this->post('/temporary-admin-recovery', [
            'token' => str_repeat('r', 48),
            'password' => 'Another-Temporary-Password-789!',
            'password_confirmation' => 'Another-Temporary-Password-789!',
        ])->assertStatus(410);

        $this->assertTrue(Hash::check('New-Temporary-Password-456!', $user->fresh()->password));
    }

    public function test_recovery_creates_the_admin_account_if_missing(): void
    {
        $this->post('/temporary-admin-recovery', [
            'token' => str_repeat('r', 48),
            'password' => 'New-Temporary-Password-456!',
            'password_confirmation' => 'New-Temporary-Password-456!',
        ])->assertRedirect(route('login'));

        $this->assertDatabaseHas('users', [
            'name' => 'Administrateur',
            'email' => 'admin@bankflow.ci',
        ]);
        $this->assertTrue(Hash::check(
            'New-Temporary-Password-456!',
            User::where('email', 'admin@bankflow.ci')->firstOrFail()->password
        ));
    }

    public function test_invalid_token_does_not_change_password_or_consume_recovery(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@bankflow.ci',
            'password' => 'Old-Temporary-Password-123!',
        ]);

        $this->from('/temporary-admin-recovery')
            ->post('/temporary-admin-recovery', [
                'token' => str_repeat('x', 48),
                'password' => 'New-Temporary-Password-456!',
                'password_confirmation' => 'New-Temporary-Password-456!',
            ])
            ->assertRedirect('/temporary-admin-recovery')
            ->assertSessionHasErrors('token');

        $this->assertTrue(Hash::check('Old-Temporary-Password-123!', $user->fresh()->password));
        $this->assertDatabaseMissing('admin_recoveries', ['id' => 1]);
    }
}
