#!/usr/bin/env python3

from LIVR import Validator
import sys, json

inputData = json.loads(sys.argv[1])
rules     = json.loads(sys.argv[2])

validator  = Validator.Validator(rules)

outputData = validator.validate(inputData)
errors     = validator.get_errors()

result = {'errors': errors} if errors else {'output': outputData}

print( json.dumps(result) )
