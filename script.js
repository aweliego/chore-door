const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');
const currentStreakValue = document.getElementById('current-streak');
const bestStreakValue = document.getElementById('highest-streak');

const botDoorPath =
  'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg';
const beachDoorPath =
  'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg';
const spaceDoorPath =
  'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg';
const closedDoorPath =
  'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg';

let numClosedDoors = 3;
let currentStreak = 0;
let bestStreak = 0;

//Values of openDoors will be determine by the result of randomChoreDoorGenerator()
let openDoor1;
let openDoor2;
let openDoor3;

let currentlyPlaying = true;

// Randomly assigns an image to each door
const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 1) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 2) {
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
};

// Used inside playDoor() as part of a condition to check if game is won or lost
const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

// Used inside the door element .onclick() functions to check if a door was already open or not
const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
};

// Determine if the player won or lost
const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win'); // it's not possible to win the game without having open all doors, since you can't keep opening them if you find the bot on the 1st or 2nd door
    //updateScore();
    //updateBestStreak();
  } else if (isBot(door)) {
    gameOver();
  }
};

// gameOver() is called inside playDoor()
const gameOver = (status) => {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    if (bestStreak <= currentStreak) {
      bestStreak++;
    }
    currentStreak++;
  } else {
    startButton.innerHTML = 'Game over! Play again?';
    if (bestStreak <= currentStreak) {
      bestStreak = currentStreak;
    } 
    currentStreak = 0;
  }
  currentlyPlaying = false; // prevents additional doors from being clicked if it returns false in the door element .onclick() functions
  currentStreakValue.innerHTML = currentStreak;
  bestStreakValue.innerHTML = bestStreak;
};

doorImage1.onclick = () => {
  if (!isClicked(doorImage1) && currentlyPlaying) {
    // if the door wasn't yet clicked on and the game is not yet over
    doorImage1.src = openDoor1; // image will be chosen based on randomChoreDoorGenerator
    playDoor(doorImage1); // decreases the number of closed doors by 1 and checks if the game is won or lost
  }
};

doorImage2.onclick = () => {
  if (!isClicked(doorImage2) && currentlyPlaying) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if (!isClicked(doorImage3) && currentlyPlaying) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

// Start a new round when clicking on Start button
startButton.onclick = () => {
  if (!currentlyPlaying) {
    // condition prevents player from resetting game mid-round if the game is over
    startRound();
  }
};

// Resets all values back to original and generate a new random chore door
const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good luck!';
  // currentStreak = 0;
  //currentStreakValue.innerHTML = currentStreak;
  currentlyPlaying = true;
  randomChoreDoorGenerator();
};

startRound(); // sets the game's variables to their original values when the game is initially loaded.
