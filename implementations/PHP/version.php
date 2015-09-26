#!/usr/bin/env php

<?php

$packages    = json_decode( file_get_contents('composer.lock'), true )['packages'];
$livrIndex   = array_search( 'validator/livr', array_column($packages, 'name') );
$livrVersion = $packages[$livrIndex]['version'];
$phpVersion  = join('.', [PHP_MAJOR_VERSION, PHP_MINOR_VERSION, PHP_RELEASE_VERSION]);
print( join(' ', ['PHP', $phpVersion, 'validator/livr', $livrVersion]) );

?>