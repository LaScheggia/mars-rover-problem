"use strict";

const HEADINGS = ["N", "E", "S", "W"];

class Rover {

  /**
   * Mars Rover class constructor.
   * The initial position must be in an empty space (falsy).
   * @param {Array} map map to explore (matrix)
   * @param {number} x initial x position
   * @param {number} y initial y position
   * @param {string} h initial heading (n,s,w,e)
   * @param {boolean} debug enable debug logging
   */
  constructor(map, x, y, h, debug = false) {
    if (map[x][y]) {
      throw new Error("Invalid initial position");
    }

    this.map = map;
    this.x = x;
    this.y = y;
    this.h = HEADINGS.indexOf(h.toUpperCase());
    this.debug = debug;
  }

  /**
   * Retrieve the current rover position.
   * @returns Object
   */
  getPosition() {
    return {
      x: this.x,
      y: this.y,
      h: HEADINGS[this.h],
    }
  }

  /**
   * Receives and processes a list of movements.
   * Possible commands are:
   * F = Forward
   * B = Backward
   * C = Clockwise (right)
   * A = Counterclockwise (left)
   * @param {Array} commands List of commands to process
   */
  sendCommands(commands) {
    if (!commands) {
      throw new Error("Cannot process an empty commands list!");
    }

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];

      if (["C", "A"].includes(command)) {
        this._handleHeading(command);

        if (this.debug) {
          console.log("My new heading is:", HEADINGS[this.h]);
        }
      } else if (["F", "B"].includes(command)) {
        const {newX, newY} = this._handleMovement(command);
        if (this.map[newX][newY]) {
          console.error(`I have found an obstacle in position: [${newX}, ${newY}, ${HEADINGS[this.h]}]`);
          console.error(`Backtracking to position: [${this.x}, ${this.y}, ${HEADINGS[this.h]}]`);
          console.error("Aborting commands sequence");
          throw new Error("Obstacle found");
        } else {
          this.x = newX;
          this.y = newY;

          if (this.debug) {
            console.log("My new position is: [", this.x, ",", this.y, ",", HEADINGS[this.h], "]");
          }
        }
      } else {
        throw new Error("Invalid command");
      }
    }
  }

  /**
   * Moves the rover clockwise or counterclockwise (stationary movement).
   * @param {string} direction Direction to move onto (C, A)
   */
  _handleHeading(direction) {
    switch (direction) {
      case "C":
        if (this.debug) {
          console.log("Moving clockwise");
        }
        this.h++;
        if (this.h === HEADINGS.length) this.h = 0;
        break;
      case "A":
        if (this.debug) {
          console.log("Moving counterclockwise");
        }
        this.h--;
        if (this.h < 0) this.h = HEADINGS.length - 1;
        break;
    }
  }

  /**
   * Moves the rover forward or backward.
   * @param {*} movement Movement to perform (F, B)
   * @returns Object with newX and newY position
   */
  _handleMovement(movement) {
    const hl = HEADINGS[this.h];

    let newX = this.x;
    let newY = this.y;

    switch (movement) {
      case "F":
        if (this.debug) {
          console.log("Moving forward");
        }
        ({newX, newY} = this._handleForward(hl));
        break;
      case "B":
        if (this.debug) {
          console.log("Moving backward");
        }
        ({newX, newY} = this._handleBackward(hl));
        break;
    }

    return {newX, newY}
  }

  /**
   * Perform forward movement based on current position.
   * @param {*} hl Heading
   * @returns Object with newX and newY position
   */
  _handleForward(hl) {
    let newX = this.x;
    let newY = this.y;

    if (this.x === 0 && hl === "N") {
      newX = this.map.length - 1;
    } else if (this.y === 0 && hl === "W") {
      newY = this.map[this.x].length - 1;
    } else if (this.y === this.map[this.x].length - 1 && hl === "E") {
      newY = 0;
    } else if (this.x === this.map.length - 1 && hl === "S") {
      newX = 0;
    } else {
      switch (hl) {
        case "N":
          newX--;
          break;
        case "S":
          newX++;
          break;
        case "W":
          newY--;
          break;
        case "E":
          newY++;
          break;
      }
    }

    return {newX, newY};
  }

  /**
   * Perform backward movement based on current position.
   * @param {*} hl Heading
   * @returns Object with newX and newY position
   */
  _handleBackward(hl) {
    let newX = this.x;
    let newY = this.y;

    if (this.x === 0 && hl === "S") {
      newX = this.map.length - 1;
    } else if (this.y === 0 && hl === "E") {
      newY = this.map[this.x].length - 1;
    } else if (this.x === this.map.length - 1 && hl === "N") {
      newX = 0;
    } else if (this.y === this.map[this.x].length - 1 && hl === "W") {
      newY = 0;
    } else {
      switch (hl) {
        case "N":
          newX++;
          break;
        case "S":
          newX--;
          break;
        case "W":
          newY++;
          break;
        case "E":
          newY--;
          break;
      }
    }

    return {newX, newY};
  }
}

module.exports = Rover;
