<?php
header("Content-Type: application/json");

$categories = ["Electronics", "Clothing", "Home Appliances", "Beverages", "Toys", "Books"];
$baseImages = [
    "https://source.unsplash.com/150x150/?electronics",
    "https://source.unsplash.com/150x150/?clothing",
    "https://source.unsplash.com/150x150/?home",
    "https://source.unsplash.com/150x150/?beverages",
    "https://source.unsplash.com/150x150/?toys",
    "https://source.unsplash.com/150x150/?books"
];

$products = [];

for ($i = 1; $i <= 1000; $i++) {
    $categoryIndex = array_rand($categories);
    $category = $categories[$categoryIndex];
    $image = $baseImages[$categoryIndex];

    $product = [
        "id" => $i,
        "name" => "Product $i",
        "category" => $category,
        "image_url" => $image,
        "varieties" => [
            ["id" => $i * 10 + 1, "name" => "Small", "price" => rand(10, 50)],
            ["id" => $i * 10 + 2, "name" => "Medium", "price" => rand(51, 100)],
            ["id" => $i * 10 + 3, "name" => "Large", "price" => rand(101, 200)]
        ]
    ];
    
    $products[] = $product;
}

echo json_encode($products, JSON_PRETTY_PRINT);
