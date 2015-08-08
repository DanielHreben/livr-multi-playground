#!/usr/bin/env perl

use strict;
use warnings;
use v5.20;

use FindBin;
use lib "$FindBin::Bin/local/lib/perl5/";

use Validator::LIVR;
use JSON qw/decode_json encode_json/;

my $input = decode_json($ARGV[0]);
my $rules = decode_json($ARGV[1]);

my $validator = Validator::LIVR->new($rules);

my $output = $validator->validate($input);
my $errors = $validator->get_errors();

print encode_json($errors
    ? {errors => $errors}
    : {output => $output}
);
