<?php
global $fireandsecurity_servername, $fireandsecurity_username, $fireandsecurity_password, $fireandsecurity_dbname;
global $table_tags, $table_products, $table_categories, $table_tags_categories, $table_products_tags;
include '../config.php';


$conn = new mysqli($fireandsecurity_servername, $fireandsecurity_username, $fireandsecurity_password, $fireandsecurity_dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $conn->connect_error
    ]);
    exit();
}


$tagsResult = $conn->query("SELECT * FROM $table_tags");
$tags = $tagsResult->fetch_all(MYSQLI_ASSOC);

$productsResult = $conn->query("
    SELECT *
    FROM $table_products
");
$products = $productsResult->fetch_all(MYSQLI_ASSOC);

$catResult = $conn->query("SELECT * FROM $table_categories");
$categories = $catResult->fetch_all(MYSQLI_ASSOC);

$tagCategory = array();
$tagsCatResult = $conn->query("SELECT * FROM $table_tags_categories");
while ($row = $tagsCatResult->fetch_assoc()) {
    $tagCategory[$row['tag_id']] = $row['categories_id'];
}


echo json_encode($tagsCatResult);

$conn->close();
?>