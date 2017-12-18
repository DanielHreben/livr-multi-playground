#!/usr/bin/env perl6

use v6;
use LIVR;
use JSON::Tiny;

sub MAIN(Str $input, Str $rules) {
  my $validator = LIVR::Validator.new(livr-rules => from-json($rules));

  if my $valid-data = $validator.validate(from-json($input)) {
    say to-json {output => $valid-data}
  } else {
    my $errors = $validator.errors();
    say to-json {errors => $errors}
  }
}
