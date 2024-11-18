<?php
include '../db_connect.php'; // Ensure this file sets up `$conn`

$query = "SELECT * FROM ResumeDetails";
$result = mysqli_query($conn, $query);

$resumes = [];
while ($row = mysqli_fetch_assoc($result)) {
    $resumes[] = $row;
}

echo json_encode($resumes);
?>
