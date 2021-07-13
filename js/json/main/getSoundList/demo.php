<?php

    header('Content-Type: application/json; charset=UTF-8');


$con = dirname(__FILE__);
$filename = scandir($con);
$conname = array();
foreach ($filename as $k => $v) {
    if($v == "." || $v == "..") {
        continue;
    }
    $conname[] = $v;
};
echo $conname;

    echo "{'demo': 'demo'}";

?>