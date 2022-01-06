# mars-rover-problem :milky_way:
This repo contains my personal solution of the Mars rover problem. :earth_africa:

## The Problem
You’re part of the team that explores Mars by sending remotely controlled vehicles to the surface of the planet. Develop an API that translates the commands sent from earth to instructions that are understood by the rover.

## Requirements
- You are given the initial starting point (x,y) of a rover and the direction (N,S,E,W) it is facing
- The rover receives a character array of commands
- Implement commands that move the rover forward/backward (f,b)
- Implement commands that turn the rover left/right (l,r)
- Implement wrapping from one edge of the grid to another (planets are spheres after all)
- Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle.

## The Solution
### Modeling
- The map has been modeled as a Matrix (array of arrays) of booleans, where `true` means an obstacle and `false` a free space in which the rover can move to
- The map indexes (X, Y) start from the 1st column and 1st row on the top left
  | C1   | C2   | C3   |
  | ---- | ---- | ---- |
  | 0, 0 | 0, 1 | 0, 2 |
  | 1, 0 | 1, 1 | 1, 2 |
  | 2, 0 | 2, 1 | 2, 2 |
- Initial coordinates are numbers while heading is a character

### Initialization
- The rover has been described with the usage of an ES6 Class
- The class constructor checks if the initial position in the map is valid (must not be an obstacle) and all the rows must be the of same length
- The constructor accepts 3 parameters: X, Y in the form of an integer and H in the form of a string, H accepts **"N", "S", "W", "E"** while X and Y must be **positive integer numbers**
- The heading has been modeled as an array so that the index defines the current heading following this structure: ["N", "E", "S", "W"].

### Movements
- In the rover class the function `sendCommands` accepts an array of commands in the form of "F", "B", "C" (clockwise), "A" (counterclockwise)
- In the function `_handleHeading` we manage the stationary movements by adding or removing 1 to the current heading index. If the index reaches the end of the array (W) and we need to turn clockwise, it turns back to 0 (N), while if we are at the beginning of the array (N) and we need to turn counterclockwise, it turns to the last array index (W)
- In the function `_handleMovement` we discriminate between forward and backward movements
- In each respectiove funcion for forard and backward movements, apart from handling in-map movements (not on the edges), we managed around map wrapping
  - For forward movements
    - While in 1st row, facing N -> Moves to last row
    - While in 1st column, facing W -> Moves to last column
    - While in last column, facing E -> Moves to 1st column
    - While in last row, facing S -> Moves to 1st row
  - For backward movements
    - While in 1st row, facing S -> Moves to last row
    - While in 1st column, facing E -> Moves to last column
    - While in last row, facing N -> Moves to 1st row
    - While in last column, facing W -> Moves to 1st column

### Obstacle Detection
Each time we move to a new position on the map, the rover checks if the new position is obstacle-free. If so moves onto it, otherwise stays in the same position and returns an error in the form of logs and last position.

## How to run it
NodeJS is needed in order to run the following command.

In a terminal, start the rover with `npm start`.

> *My battery is low and it's getting dark...*
