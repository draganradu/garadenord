<?php

function cleanup($data) {
    $data = str_replace([".jpg","/img","..","/",".JPG"],"",$data);
    return $data;
}

$temp = array_merge(glob('../../img/*.jpg'),glob('../../img/*.JPG')) ;

echo json_encode(array_map('cleanup',$temp));

?>