<?php
include '../db_connect.php'; // Ensure this file sets up $conn

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

// Handle different HTTP methods (GET, POST, PUT, DELETE)
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        getResumeDetails($conn);
        break;

    case 'POST':
        addResumeDetails($conn);
        break;

    case 'PUT':
        updateResumeDetails($conn);
        break;

    case 'DELETE':
        deleteResumeDetails($conn);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid HTTP method']);
}

function getResumeDetails($conn) {
    if (isset($_GET['id'])) {
        // Fetch a single resume detail by ID
        $id = mysqli_real_escape_string($conn, $_GET['id']);
        $query = "SELECT * FROM ResumeDetails WHERE id = $id";
        $result = mysqli_query($conn, $query);
        
        if (mysqli_num_rows($result) > 0) {
            $data = mysqli_fetch_assoc($result);
            echo json_encode(['status' => 'success', 'data' => $data]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Resume not found']);
        }
    } else {
        // Fetch all resume details
        $query = "SELECT * FROM ResumeDetails";
        $result = mysqli_query($conn, $query);
        
        $resumes = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $resumes[] = $row;
        }

        echo json_encode(['status' => 'success', 'data' => $resumes]);
    }
}

function addResumeDetails($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    $name = mysqli_real_escape_string($conn, $data['name']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $phone = mysqli_real_escape_string($conn, $data['phone']);
    $address = mysqli_real_escape_string($conn, $data['address']);
    $linkedin = mysqli_real_escape_string($conn, $data['linkedin']);
    $github = mysqli_real_escape_string($conn, $data['github']);
    $instagram = mysqli_real_escape_string($conn, $data['instagram']);
    $objective = mysqli_real_escape_string($conn, $data['objective']);
    $language = mysqli_real_escape_string($conn, $data['language']);
    $interest = mysqli_real_escape_string($conn, $data['interest']);
    $skill = mysqli_real_escape_string($conn, $data['skill']);
    $title = mysqli_real_escape_string($conn, $data['title']);

    $query = "INSERT INTO ResumeDetails (name, email, phone, address, linkedin, github, instagram, objective, language, interest, skill, title)
              VALUES ('$name', '$email', '$phone', '$address', '$linkedin', '$github', '$instagram', '$objective', '$language', '$interest', '$skill', '$title')";

    if (mysqli_query($conn, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'Resume added successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
    }
}

function updateResumeDetails($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = mysqli_real_escape_string($conn, $data['id']);
    $name = mysqli_real_escape_string($conn, $data['name']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $phone = mysqli_real_escape_string($conn, $data['phone']);
    $address = mysqli_real_escape_string($conn, $data['address']);
    $linkedin = mysqli_real_escape_string($conn, $data['linkedin']);
    $github = mysqli_real_escape_string($conn, $data['github']);
    $instagram = mysqli_real_escape_string($conn, $data['instagram']);
    $objective = mysqli_real_escape_string($conn, $data['objective']);
    $language = mysqli_real_escape_string($conn, $data['language']);
    $interest = mysqli_real_escape_string($conn, $data['interest']);
    $skill = mysqli_real_escape_string($conn, $data['skill']);
    $title = mysqli_real_escape_string($conn, $data['title']);

    $query = "UPDATE ResumeDetails SET
              name = '$name', 
              email = '$email', 
              phone = '$phone', 
              address = '$address', 
              linkedin = '$linkedin', 
              github = '$github', 
              instagram = '$instagram', 
              objective = '$objective', 
              language = '$language', 
              interest = '$interest', 
              skill = '$skill', 
              title = '$title' 
              WHERE id = $id";

    if (mysqli_query($conn, $query)) {
        echo json_encode(['status' => 'success', 'message' => 'Resume updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
    }
}

function deleteResumeDetails($conn) {
    if (isset($_GET['id'])) {
        $id = mysqli_real_escape_string($conn, $_GET['id']);
        $query = "DELETE FROM ResumeDetails WHERE id = $id";

        if (mysqli_query($conn, $query)) {
            echo json_encode(['status' => 'success', 'message' => 'Resume deleted successfully']);
        } else {
            echo json_encode(['status' => 'error', 'message' => mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'ID is required for deletion']);
    }
}
?>
