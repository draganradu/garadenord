<?php
header('Access-Control-Allow-Origin: *');

function cleanup($data) {
    $data = str_replace([".jpg","/img","..","/",".JPG"],"",$data);
    return $data;
}

function pathLevel() {
    if( strpos( get_included_files()[0], 'public_html' ) !== false) {
        return '../';
    }
    return '../../';
}

$absolute_path = pathLevel();

$temp = array_merge(glob($absolute_path . 'img/*.jpg'),glob($absolute_path  . 'img/*.JPG')) ;

echo json_encode(array_map('cleanup',$temp));


?>