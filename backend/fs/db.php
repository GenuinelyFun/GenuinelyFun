<?php
header("Content-Type: application/json");
global $fireandsecurity_servername, $fireandsecurity_username, $fireandsecurity_password, $fireandsecurity_dbname, $table_tags, $table_products, $table_categories, $table_tags_categories, $table_products_tags;

$conn = new mysqli($fireandsecurity_servername, $fireandsecurity_username, $fireandsecurity_password, $fireandsecurity_dbname);

$method = $_SERVER['REQUEST_METHOD'];

function returnResult($result): void
{
    global $conn;
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $conn->close();
}

/*
switch ($method) {
    case 'GET':
        include_once "./api/products.php";
        echo json_encode($products);
        break;
    default:
        echo "Invalid request method";
}*/

function get($table): void
{
    global $method, $conn;
    switch ($method) {
        case 'GET':
            $result = $conn->query("SELECT * FROM $table");
            $items = $result->fetch_all(MYSQLI_ASSOC);
            if (isset($_GET['id'])) {
                if (!array_key_exists('id', $items)) {
                    returnResult([]);
                    break;
                }
                $id = $_GET['id'];
                $item = array_find($items, function ($item) use ($id) {
                    return $item['id'] == $id;
                });
                returnResult($item);
                break;
            } elseif (isset($_GET['product_id'])) {
                if (!array_key_exists('product_id', $items)) {
                    returnResult([]);
                    break;
                }
                $id = $_GET['product_id'];
                $item = array_values(array_filter($items, function ($item) use ($id) {
                    return $item['product_id'] == $id;
                }));
                returnResult($item);
                break;
            } elseif (isset($_GET['tag_id'])) {
                if (!array_key_exists('tag_id', $items)) {
                    returnResult([]);
                    break;
                }
                $id = $_GET['tag_id'];
                $item = array_values(array_filter($items, function ($item) use ($id) {
                    return $item['tag_id'] == $id;
                }));
                returnResult($item);
                break;
            } elseif (isset($_GET['category_id'])) {
                if (!array_key_exists('category_id', $items)) {
                    returnResult([]);
                    break;
                }
                $id = $_GET['category_id'];
                $item = array_values(array_filter($items, function ($item) use ($id) {
                    return $item['category_id'] == $id;
                }));
                returnResult($item);
                break;
            }
            returnResult($items);
            break;
        /*
        $input = json_decode(file_get_contents('php://input'), true);
        case 'POST':
            //TODO NGHI post case
            $title = $input['title'];
            $description = $input['description'];
            echo $input;
            //$conn->query("INSERT INTO $table_products (title, description) VALUES ('$title', '$description')");
            //echo json_encode(["message" => "Product added successfully", "title" => $title, "description" => $description]);
            break;
        */
        /*
        
        case 'PUT':
            $id = $_GET['id'];
            $title = $input['title'];
            $description = $input['description'];
            $conn->query("UPDATE $table_products SET title='$title',
                         description='$description' WHERE id=$id");
            echo json_encode(["message" => "Product updated successfully", "title" => $title, "description" => $description]);
            break;
    
        case 'DELETE':
            $id = $_GET['id'];
            $conn->query("DELETE FROM $table_products WHERE id=$id");
            echo json_encode(["message" => "Product $id deleted successfully"]);
            break;
    
        default:
            echo json_encode(["message" => "Invalid request method"]);
            break;
        */
        default:
            echo "Invalid request method";
    }
}


if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $conn->connect_error
    ]);
    die("Connection failed: " . $conn->connect_error);
}
