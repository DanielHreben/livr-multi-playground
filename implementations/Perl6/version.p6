#!/usr/bin/env perl6
use v6;
my $comp-spec = CompUnit::DependencySpecification.new: short-name => 'LIVR';
my $comp-unit = $*REPO.resolve: $comp-spec;

if try $comp-unit.distribution.meta -> %dist-meta {
  say 'Perl ', $*PERL.version, '; LIVR ', %dist-meta<ver>, ';';
}