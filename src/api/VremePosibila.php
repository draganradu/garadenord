<?php
header('Access-Control-Allow-Origin: *');

$anotim = ['primavara','vara','toamna','iarna'];
$ora = ['dimineata','pranz','seara','ora_albastra','ora_de_aur','noapte'];
$vreme = ['senin','innorat','ceata','ploaie'];
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