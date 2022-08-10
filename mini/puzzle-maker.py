#! /usr/bin/env python

#
# To run:
#
# ./puzzle-maker.py example-puzzle.txt > puzzle.js
#
# This turns the text in the file 'example-puzzle.txt' into
# the javascript needed by the front-end.
#
import sys

#
# Part 1: Read in puzzle file
#
# Format is simple:
# across1 clue for across1
# across2 clue for across2
# ...
# across5 clue for across5
# down1 clue for down1
# ...
# down5 clue for down5
#
# Avoid double quotes - just use singles
# (the code will auto-replace doubles with singles)
#
words = {}
across = {}
down = {}

fd = open(sys.argv[1])
i = 0
for line in fd:
    sline = line.strip()
    # replace double quotes with single quotes
    sline = sline.replace('"', "'")
    # skip blanks
    if len(sline) == 0:
        continue
    if len(sline) <= 5:
        print('line does not have clue:', sline)
        exit(1)
    # get the words from the 'across' entries, clues for both
    # assumes across are the first 5 clues
    if i < 5:
        words[i] = sline.split()[0]
        across[i] = sline[6:]
    else:
        down[i-5] = sline[6:]
    i += 1
if i != 10:
    print('crossword needs to have exactly 10 lines: 5 across, 5 down')
fd.close()

#
# Part 2: Generate javascript file (redirect into 'puzzle.js')
#
# Format dictated by rest of web front-end code
# Skip loops and just write it out as it's easier to read this way
#
print 'var puzzle = {'
print '  grid: [[ "%s","%s","%s","%s","%s" ],' % (words[0][0], words[0][1], words[0][2], words[0][3], words[0][4])
print '         [ "%s","%s","%s","%s","%s" ],' % (words[1][0], words[1][1], words[1][2], words[1][3], words[1][4])
print '         [ "%s","%s","%s","%s","%s" ],' % (words[2][0], words[2][1], words[2][2], words[2][3], words[2][4])
print '         [ "%s","%s","%s","%s","%s" ],' % (words[3][0], words[3][1], words[3][2], words[3][3], words[3][4])
print '         [ "%s","%s","%s","%s","%s" ]],' % (words[4][0], words[4][1], words[4][2], words[4][3], words[4][4])
print '  acrossClues: ["%s","%s","%s","%s","%s"],' % (across[0], across[1], across[2], across[3], across[4])
print '  downClues: ["%s","%s","%s","%s","%s"]' % (down[0], down[1], down[2], down[3], down[4])
print '};'
