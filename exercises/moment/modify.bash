#!/bin/bash

source ./../setup.bash

strCategory="moment"
strName="modify"
strFile="modify.html"

wget -q -O /dev/stdout --auth-no-challenge --user="${strUser}" --password="${strPassword}" --post-file="${strFile}" "${strServer}/test?strCategory=${strCategory}&strAssignment=${strName}"