<?php
include '../db_connect.php';

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
        $sql = "SELECT resume_id, name, email, phone, address, experience, education, skills, projects 
                FROM RESUME 
                WHERE name LIKE '%$searchQuery%' 
                OR email LIKE '%$searchQuery%'";
    } else {
        $sql = "SELECT resume_id, name, email, phone, address, experience, education, skills, projects FROM RESUME";
    }

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $resumes = [];
        while ($row = $result->fetch_assoc()) {
            $resumes[] = $row;
        }
        echo json_encode(["message" => "Resumes fetched successfully", "data" => $resumes]);
    } else {
        echo json_encode(["message" => "No resumes found", "data" => null]);
    }
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $name = isset($data->name) ? $data->name : null;
    $email = isset($data->email) ? $data->email : null;
    $phone = isset($data->phone) ? $data->phone : null;
    $address = isset($data->address) ? $data->address : null;
    $experience = isset($data->experience) ? $data->experience : null;
    $education = isset($data->education) ? $data->education : null;
    $skills = isset($data->skills) ? $data->skills : null;
    $projects = isset($data->projects) ? $data->projects : null;
    $resume_id = isset($data->resume_id) ? $data->resume_id : null;

    if ($method === 'POST') {
        // Prepare SQL query
        $sql = "INSERT INTO RESUME (name, email, phone, address, experience, education, skills, projects) 
                VALUES ('$name', '$email', '$phone', '$address', '$experience', '$education', '$skills', '$projects')";
    
        // Execute query
        if ($conn->query($sql) === TRUE) {
            $resp_data = [
                "success" => true, // Add this key
                "message" => "Resume added successfully",
                "data" => [
                    "resume_id" => $conn->insert_id,
                    "name" => $name,
                    "email" => $email,
                    "phone" => $phone,
                    "address" => $address,
                    "experience" => $experience,
                    "education" => $education,
                    "skills" => $skills,
                    "projects" => $projects
                ]
            ];
        } else {
            $resp_data = [
                "success" => false, // Add this key
                "message" => "Error inserting data: " . $conn->error,
                "data" => null
            ];
        }
    
        // Return response
        echo json_encode($resp_data);
        exit();
    }
     elseif ($method === 'PUT' && $resume_id) {
        $sql = "UPDATE RESUME SET name='$name', email='$email', phone='$phone', address='$address', 
                experience='$experience', education='$education', skills='$skills', projects='$projects' 
                WHERE resume_id=$resume_id";

        if ($conn->query($sql) === TRUE) {
            $resp_data = [
                "message" => "Resume updated successfully",
                "data" => [
                    "resume_id" => $resume_id,
                    "name" => $name,
                    "email" => $email,
                    "phone" => $phone,
                    "address" => $address,
                    "experience" => $experience,
                    "education" => $education,
                    "skills" => $skills,
                    "projects" => $projects
                ]
            ];
        } else {
            $resp_data = ["message" => "Error updating data", "data" => null];
        }
    } else {
        $resp_data = ["message" => "Invalid request", "data" => null];
    }

} elseif ($method === 'DELETE') {
    $resume_id = isset($_GET['resume_id']) ? intval($_GET['resume_id']) : null;

    if ($resume_id) {
        $sql = "DELETE FROM RESUME WHERE resume_id = $resume_id";

        if ($conn->query($sql) === TRUE) {
            $resp_data = ["message" => "Resume deleted successfully"];
        } else {
            $resp_data = ["message" => "Error deleting resume", "data" => null];
        }
    } else {
        $resp_data = ["message" => "Resume ID not provided", "data" => null];
    }
} else {
    $resp_data = ["message" => "Unsupported request method", "data" => null];
}

echo json_encode($resp_data);
?>
