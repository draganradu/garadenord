<?php
header('Access-Control-Allow-Origin: *');

$anotim = ['primavara','vara','toamna','iarna'];
$ora = ['dimineata','pranz','seara','ora_albastra','ora_de_aur','noapte'];
$vreme = ['senin','innorat','ceata','ploaie','ninsoare'];
$temp = [];

function exception($vAnotimp,$vOra,$vVreme) {
    // --- take out ninsoare and ceata from forcast
    if(($vVreme === 'ceata') && ($vAnotimp === 'primavara' || $vAnotimp === 'vara' || $vAnotimp === 'toamna') ||
    ($vVreme === 'ninsoare') && ($vAnotimp === 'primavara' || $vAnotimp === 'vara' || $vAnotimp === 'toamna') ){
        return true;
    } else {
        return false;
    }    
}

foreach ($anotim as $vAnotimp) {
    foreach ($ora as $vOra) {
        foreach ($vreme as $vVreme) {
            if(!exception($vAnotimp,$vOra,$vVreme)){
                array_push($temp,"{$vAnotimp}_{$vOra}_{$vVreme}");
            }
        }
    }
}
echo json_encode($temp);

?>