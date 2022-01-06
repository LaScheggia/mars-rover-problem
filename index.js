"use strict";
const Rover = require("./src/rover");

const map = [
  [false, false, false],
  [false, true, true],
  [false, false, true],
];

const initialX = 0;
const initialY = 0;
const initialH = "N";

const commandsGood = ["C", "C", "F", "F", "A", "F"];
const commandsBad = ["C", "C", "F", "F", "A", "F", "F"];
const testCommands = [commandsGood, commandsBad];

console.log("Using map:", map);
console.log("Initial position: [", initialX, ", ", initialY, ", ", initialH, "]");

testCommands.forEach(commands => {
  console.log("Using commands:", commands);

  const rover = new Rover(map, initialX, initialY, initialH, true);
  rover.sendCommands(commands);
});
