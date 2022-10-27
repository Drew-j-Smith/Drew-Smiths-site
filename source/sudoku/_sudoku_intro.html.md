### Introduction

This is a simple sudoku solving algorithm made in rust and compiled to web assembly.
The algorithm used is fairly simple. It sorts the remaining squared by the number of squares that
would be affected if it changed. Then the algorithm randomly selects a number for the square and updates
the remaining squares until the board is invalid or solved. If the board is invalid the algorithm tries again.

While this is a rather crude algorithm, it is quite effective at solving puzzles. The random nature of
the algorithm is not as optimal or clean as I would like and as such I may eventually rework the algorithm to
use backtracing instead with a more complicated evaluation algorithm.

### Demo

(The generate button doesn't work right now because of an api breakage)
