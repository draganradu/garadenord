<?php

function cleanup($data) {
    $data = str_replace([".jpg","/img","..","/"],"",$data);
    return $data;
}

$temp = glob('../../img/*.jpg');

echo json_encode(array_map('cleanup',$temp));

?>