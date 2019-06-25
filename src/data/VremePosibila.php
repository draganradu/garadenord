<?php

$anotim = ['primavara','vara','toamna','iarna'];
$ora = ['dimineata','pranz','seara'];
$vreme = ['senin','inorat','ceata'];
$temp = [];

foreach ($anotim as $vAnotimp) {
    foreach ($ora as $vOra) {
        foreach ($vreme as $vVreme) {
            array_push($temp,"{$vAnotimp}_{$vOra}_{$vVreme}");
        }
    }
}
echo json_encode($temp);

?>