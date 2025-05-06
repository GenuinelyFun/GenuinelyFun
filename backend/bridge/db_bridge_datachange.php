<?php
global $datachange_servername, $datachange_username, $datachange_password, $datachange_dbname;

$conn = new mysqli($datachange_servername, $datachange_username, $datachange_password, $datachange_dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Connection failed: " . $conn->connect_error
    ]);
    exit();
}

$result = $conn->query("SHOW TABLES");

if (!$result) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Query failed: " . $conn->error
    ]);
    exit();
}

$tables = [];
while ($row = $result->fetch_array(MYSQLI_NUM)) {
    $tables[] = $row[0];
}

echo json_encode($tables);

$conn->close();
?>