<?php
    header('Content-Type: application/x-javascript; charset=UTF-8');

    $model = $_GET["model"];
    $user_name = $_GET["user_name"];

    $mysql_server_name = "sql313.epizy.com";
    $mysql_user_name = "epiz_27201474";
    $mysql_password = "kx4dLeuJJm86";
    $mysql_dbname = "epiz_27201474_bcg";
    $conn = mysqli_connect($mysql_server_name, $mysql_user_name, $mysql_password, $mysql_dbname);

    if ($model === "download") {
        $download = "SELECT name, content FROM user_upload";
        $result = mysqli_query($conn, $download);
        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                if ($row["name"] === $user_name) {
                    echo "User = " . $row["content"];
                }
            }
        } else {
            echo "No Found2";
        }
    }

    if ($model === "upload") {
        $stmt = $conn->prepare("INSERT INTO user_upload (name, content) VALUES (?, ?)");
        $stmt->bind_param("ss", $name, $content);
        $name = ""
        $content = ""
    }

    mysqli_close($conn);
?>
