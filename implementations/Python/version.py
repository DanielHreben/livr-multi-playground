#!/usr/bin/env python3

import pkg_resources, platform

print(
    'Python',
    platform.python_version(),
    'LIVR',
    pkg_resources.get_distribution("LIVR").version
)
