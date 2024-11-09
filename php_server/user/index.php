<?php
include 'db_connect.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

$resp_data = ["message" => "No data received", "data" => null];
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $searchQuery = isset($_GET['search']) ? $_GET['search'] : '';
    if ($searchQuery) {
        $sql = "SELECT usr_no, usr_id, usr_name, usr_email,usr_pass, usr_status, usr_type 
                FROM USER 
                WHERE usr_name LIKE '%$searchQuery%' 
                OR usr_email LIKE '%$searchQuery%'";
    } else {
        $sql = "SELECT usr_no, usr_id, usr_name,usr_pass, usr_email, usr_status, usr_type FROM USER";
    }

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        echo json_encode(["message" => "Users fetched successfully", "data" => $users]);
    } else {
        echo json_encode(["message" => "No users found", "data" => null]);
    }
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $usr_id = isset($data->usr_id) ? $data->usr_id : null;
    $name = isset($data->usr_name) ? $data->usr_name : null;
    $password = isset($data->usr_pass) ? $data->usr_pass : null;  // Password should be hashed in SHA256 on client side
    $status = isset($data->usr_status) ? $data->usr_status : 1;
    $type = isset($data->usr_type) ? $data->usr_type : 'Student';
    $email = isset($data->usr_email) ? $data->usr_email : null;
    $usr_no = isset($data->usr_no) ? $data->usr_no : null;

    if ($method === 'POST') {
        $sql = "INSERT INTO USER (usr_id, usr_name, usr_pass, usr_status, usr_type, usr_email) 
                VALUES ('$usr_id', '$name', '$password', $status, '$type', '$email')";

        if ($conn->query($sql) === TRUE) {
            $resp_data = [
                "message" => "User added successfully",
                "data" => [
                    "usr_no" => $conn->insert_id,
                    "usr_id" => $usr_id,
                    "usr_name" => $name,
                    "usr_email" => $email,
                    "usr_pass" => $password,
                    "usr_status" => $status,
                    "usr_type" => $type
                ]
            ];
        } else {
            $resp_data = ["message" => "Error inserting data", "data" => null];
        }

    } elseif ($method === 'PUT' && $usr_no) {
        $sql = "UPDATE USER SET usr_id='$usr_id', usr_name='$name', usr_pass='$password', usr_status=$status, 
                usr_type='$type', usr_email='$email' WHERE usr_no=$usr_no";

        if ($conn->query($sql) === TRUE) {
            $resp_data = [
                "message" => "User updated successfully",
                "data" => [
                    "usr_no" => $usr_no,
                    "usr_id" => $usr_id,
                    "usr_name" => $name,
                    "usr_email" => $email,
                    "usr_pass" => $password,
                    "usr_status" => $status,
                    "usr_type" => $type
                ]
            ];
        } else {
            $resp_data = ["message" => "Error updating data", "data" => null];
        }
    } else {
        $resp_data = ["message" => "Invalid request", "data" => null];
    }

} elseif ($method === 'DELETE') {
    $usr_no = isset($_GET['usr_no']) ? intval($_GET['usr_no']) : null;

    if ($usr_no) {
        $sql = "DELETE FROM USER WHERE usr_no = $usr_no";

        if ($conn->query($sql) === TRUE) {
            $resp_data = ["message" => "User deleted successfully"];
        } else {
            $resp_data = ["message" => "Error deleting user", "data" => null];
        }
    } else {
        $resp_data = ["message" => "User ID not provided", "data" => null];
    }
} else {
    $resp_data = ["message" => "Unsupported request method", "data" => null];
}

echo json_encode($resp_data);
?>
