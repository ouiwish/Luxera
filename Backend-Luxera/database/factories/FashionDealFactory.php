<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
use App\Models\FashionDeal;

/**
 * @extends Factory<FashionDeal>
 */
class FashionDealFactory extends Factory
{
    protected $model = FashionDeal::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $originalPrice = $this->faker->numberBetween(50, 100);
        $discount = $this->faker->numberBetween(10, 50);
        $dealPrice = (int) round($originalPrice * (1 - $discount / 100));

        $productDataByCategory = [
            'dresses' => [
                'names' => [
                    'Summer Floral Dress',
                    'Evening Gown',
                    'Casual Sundress',
                    'Cocktail Dress',
                    'Maxi Dress',
                    'Bodycon Dress',
                    'Wedding Dress',
                    'Little Black Dress',
                    'Bohemian Dress',
                    'Wrap Dress',
                ],
                'images' => [
                    'dresses-1.png',
                    'dresses-2.png',
                    'dresses-3.png',
                    'dresses-4.png',
                    'dresses-5.png',
                    'dresses-6.png',
                    'dresses-7.png',
                    'dresses-8.png',
                    'dresses-9.png',
                    'dresses-10.png',
                    'dresses-11.png',
                ],
            ],
            'tops' => [
                'names' => [
                    'Silk Blouse',
                    'Cotton T-Shirt',
                    'Denim Shirt',
                    'Casual Tank Top',
                    'Crop Top',
                    'Long Sleeve Tunic',
                    'Button-Down Shirt',
                    'V-Neck Sweater',
                    'Graphic Tee',
                    'Off-Shoulder Top',
                ],
                'images' => [
                    'tops-1.png',
                    'tops-2.png',
                    'tops-3.png',
                    'tops-4.png',
                    'tops-5.png',
                    'tops-6.png',
                    'tops-7.png',
                    'tops-8.png',
                    'tops-9.png',
                ],
            ],
            'bottoms' => [
                'names' => [
                    'High-Waisted Jeans',
                    'A-Line Skirt',
                    'Leather Pants',
                    'Cargo Shorts',
                    'Wide-Leg Trousers',
                    'Denim Shorts',
                    'Pencil Skirt',
                    'Palazzo Pants',
                    'Chinos',
                    'Pleated Skirt',
                ],
                'images' => [
                    'bottoms-1.png',
                    'bottoms-2.png',
                    'bottoms-3.png',
                    'bottoms-4.png',
                    'bottoms-5.png',
                    'bottoms-6.png',
                    'bottoms-7.png',
                    'bottoms-8.png',
                    'bottoms-9.png',
                    'bottoms-10.png',
                    'bottoms-11.png',
                ],
            ],
            'kingmans' => [
                'names' => [
                    'Leather Belt',
                    'Silk Tie',
                    'Gold Cufflinks',
                    'Pocket Square Set',
                    'Fedora Hat',
                    'Leather Gloves',
                    'Bow Tie',
                    'Wool Scarf',
                    'Luxury Watch',
                    'Sunglasses Duo',
                ],
                'images' => [
                    'kingmans-1.png',
                    'kingmans-2.png',
                    'kingmans-3.png',
                    'kingmans-4.png',
                    'kingmans-5.png',
                    'kingmans-6.png',
                    'kingmans-7.png',
                    'kingmans-8.png',
                    'kingmans-9.png',
                    'kingmans-10.png',
                    'kingmans-11.png',
                    'kingmans-12.png',
                ],
            ],
        ];

        // Get a random category
        $category = Category::inRandomOrder()->first();
        $categorySlug = $category->slug;

        // Select a random product name and image based on the category
        $productName = $this->faker->randomElement($productDataByCategory[$categorySlug]['names']);
        $productImage = $this->faker->randomElement($productDataByCategory[$categorySlug]['images']);

        return [
            'category_id' => $category->id,
            'name' => $productName,
            'image' => url("storage/assets/fashion_deals/{$productImage}"), // Full URL to the image
            'original_price' => $originalPrice,
            'discount' => $discount,
            'deal_price' => $dealPrice,
        ];
    }
}
