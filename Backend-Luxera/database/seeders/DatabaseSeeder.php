<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\FashionDeal;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Category::create(['name' => 'Dresses', 'slug' => 'dresses']);
        Category::create(['name' => 'Tops', 'slug' => 'tops']);
        Category::create(['name' => 'Bottoms', 'slug' => 'bottoms']);
        Category::create(['name' => 'Kingsmans', 'slug' => 'kingmans']);

        FashionDeal::factory(20)->create();

        User::factory()->create([
            'first_name' => 'Widad',
            'last_name' => 'Moumkine',
            'email' => 'widad.moumkine@gmail.com',
            'phone' => '+1234567890',
            'location' => 'Morocco, Casablanca',
            'bio' => 'Lorem ipsum | dolor sit amet | consectetur adipiscing elit.',
            'profile_image' => null,
            'password' => '123123123',
        ]);
    }
}
