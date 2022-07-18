<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            // 'user_id' => User::factory(),
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(2, true),
            'category' => fake()->title(), 
            // 'author' => User::factory()
            // ->hasNews(3)
            // ->count(5)
            // ->create(),
        ];
    }
}
