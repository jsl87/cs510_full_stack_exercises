#!/bin/bash

source ./../setup.bash

strCategory="html"
strName="tables"
strFile="tables.html"

wget -q -O /dev/stdout --auth-no-challenge --user="${strUser}" --password="${strPassword}" --post-file="${strFile}" "${strServer}/test?strCategory=${strCategory}&strAssignment=${strName}"