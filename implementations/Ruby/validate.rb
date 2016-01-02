#!/usr/bin/env ruby

require "rubygems"
require "json"
require "LIVR"

LIVR.default_auto_trim("is_auto_trim")

input_data = JSON.parse(ARGV[0])
rules      = JSON.parse(ARGV[1])

validator  = LIVR.new(rules)

output_data = validator.validate(input_data)
errors      = validator.get_errors()

puts JSON.generate( output_data ? {:output => output_data} : {:errors => errors} )