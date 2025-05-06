<?php
header("Content-Type: application/json");
global $datachange_servername, $datachange_username, $datachange_password, $datachange_dbname;

$conn = new mysqli($datachange_servername, $datachange_username, $datachange_password, $datachange_dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $conn->connect_error
    ]);
    die("Connection failed: " . $conn->connect_error);
}