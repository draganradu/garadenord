<?php

// $anotim = ['vara','toamna','iarna'];
// $ora = ['dimineata','pranz','seara'];
// $vreme = ['senin','inorat'];
// $temp = [];

// foreach ($anotim as $vAnotimp) {
//     foreach ($ora as $vOra) {
//         foreach ($vreme as $vVreme) {
//             array_push($temp,"{$vAnotimp}-{$vOra}-{$vVreme}");
//         }
//     }
// }
// echo json_encode($temp);

// echo('<hr>');

function cleanup($data) {
    $data = str_replace([".jpg","/img","..","/"],"",$data);
    return $data;
}

$temp = glob('../../img/*.jpg');

echo json_encode(array_map('cleanup',$temp));
?>