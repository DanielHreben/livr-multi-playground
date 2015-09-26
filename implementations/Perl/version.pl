#!/usr/bin/env perl

use strict;
use warnings;
use v5.20;

use FindBin;
use lib "$FindBin::Bin/local/lib/perl5/";

use Validator::LIVR;

say(
    'perl ',
    $^V,
    ' ',
    'Validator::LIVR ',
    $Validator::LIVR::VERSION
);

