#!/usr/bin/env php

<?php

require('vendor/autoload.php');

$input = json_decode($argv[1], true);
$rules = json_decode($argv[2], true);

$validator = new \Validator\LIVR( $rules );

$output    = $validator->validate($input, $rules);
$errors    = $validator->getErrors();

print json_encode($errors
    ? [ 'errors' => $errors ]
    : [ 'output' => $output ]
);

?>