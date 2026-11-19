<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DemoPageTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_demo_uses_fictional_data_without_reading_the_database(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Demo')
                ->where('stats.transactions_jour', 1284)
                ->where('dernieres_transactions.0.reference', 'DEMO-84291')
                ->where('alertes.0.agence', 'Yopougon')
                ->has('graphique', 7)
            );

        $this->assertDatabaseCount('transactions', 0);
    }

    public function test_demo_alias_is_public_and_protected_dashboard_remains_private(): void
    {
        $this->get('/demo')->assertOk()->assertInertia(fn (Assert $page) => $page->component('Demo'));
        $this->get('/dashboard')->assertRedirect(route('login'));
        $this->get('/operations')->assertRedirect(route('login'));
        $this->post('/assistant/chat')->assertRedirect(route('login'));
    }
}
