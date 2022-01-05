"use strict";
const Rover = require("./src/rover.js");

const map = [
  [false, false, false],
  [false, true, true],
  [false, false, true],
];

const initialX = 0;
const initialY = 0;
const initialH = "N";
const commands = ["C", "C", "F", "F", "A", "F"];

console.log("Using map:", map);
console.log("Initial position: [", initialX, ", ", initialY, ", ", initialH, "]");
console.log("Using commands:", commands);

const rover = new Rover(map, initialX, initialY, initialH, true);
rover.sendCommands(commands);
