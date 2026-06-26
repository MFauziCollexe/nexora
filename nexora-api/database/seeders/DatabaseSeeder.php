<?php

namespace Database\Seeders;

use App\Domains\User\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            MenuSeeder::class,
            PermissionSeeder::class,
        ]);

        $users = [
            ['email' => 'test@example.com', 'name' => 'Test User', 'password' => bcrypt('password')],
            ['email' => 'fauzi.mukhammad@gmail.com', 'name' => 'Fauzi Mukhammad', 'password' => bcrypt('Mukhammadfauzi23')],
        ];

        $roleId = DB::table('roles')->where('code', 'super-admin')->value('id');

        foreach ($users as $userData) {
            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                ['name' => $userData['name'], 'password' => $userData['password']]
            );

            if ($roleId) {
                DB::table('user_role')->updateOrInsert(
                    [
                        'user_id' => $user->id,
                        'role_id' => $roleId,
                    ],
                    [
                        'updated_at' => now(),
                        'created_at' => now(),
                    ]
                );
            }
        }

        $this->call([
            PurchaseRequestSeeder::class,
            SalesSeeder::class,
            ItemSeeder::class,
            SalesOrderSeeder::class,
            DeliveryOrderSeeder::class,
            DeliveryNoteSeeder::class,
            SalesReturnSeeder::class,
            CreditNoteSeeder::class,
        ]);
    }
}
