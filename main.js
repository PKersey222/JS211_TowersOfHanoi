'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
  // d: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
  // console.log("y: " + stacks.d);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // console.log('tacos', startStack)
  // Your code here
// move a stone off an array with pop methods
// place a stone on an array with push methods
let piece = stacks[startStack].pop()

stacks[endStack].push(piece)

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Your code here
  // if array is empty then any stone can be placed
  // if stone is larger that the stone already in an array it return a console log
  if (stacks[startStack].slice(-1) || stacks[endStack] == 0) {
    return true
  } else {
    return false
  }
  
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  // if the stones are from largest to smallest on a different array then you win (remember to rfrence original stack)
 if (stacks['c'].length == 4) {
  return true
 } else {
  return false
 }


  }
  
// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // console.log('!!',startStack)
  
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack)
  } else {
    return console.log('Try again.')
  }

  if (checkForWin()) {
    return console.log ('You won!')
  // Your code here
  // printStacks()
   // movePiece(startStack)

}
}
const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
