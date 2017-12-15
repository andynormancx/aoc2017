var test1 = 2; // sum 1
var test2 = 3; // sum 2
var test3 = 4; // sum 4
var test4 = 5; // sum 5
var input = 277678;

var currentmemLocation = [0,0];
var currentmemIndex = 1;
var directions = [[1,0],[0,1],[-1,0],[0,-1]];
var currentDirectionIndex = 0;
var movedistance = 1;
var movesmadeinsamedirection = 0;
var grid = new Array();
grid["0,0"] = 1;

function locationToText(loc){
  return loc[0] + "," + loc[1];
}

function sumAdjacentLocations(loc, grid){
  // check grid for adjacent locations inc diagonals
  return [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]].reduce((prev,current) => {
    var key = locationToText([loc[0] + current[0],loc[1] + current[1]]);
    return prev + (grid[key] || 0); // assumes it doesnt come back with undefined so test
  }, 0);
}

while(currentmemIndex < input){
  // increment current memory location
  currentmemIndex++;
  
  // get current move 
  var move = directions[currentDirectionIndex % 4];
  // move from current location
  currentmemLocation = [currentmemLocation[0] + move[0], currentmemLocation[1] + move[1]];

  // store current location with value
  grid[locationToText(currentmemLocation)] = sumAdjacentLocations(currentmemLocation,grid);

  // check if value is larger than input
  if(grid[locationToText(currentmemLocation)] > input){
    break;
  }

  // increment current moves made in this direction
  movesmadeinsamedirection++;

  // check if all moves in this direction completed
  if(movesmadeinsamedirection == movedistance){
    // increment lastmove distance every 2 turns
    if(!((currentDirectionIndex + 1) % 2)){
      movedistance++;
    }    
    currentDirectionIndex++;
    movesmadeinsamedirection = 0;
  }
}
var finallocation = currentmemLocation;
var finalmovesaway = Math.abs(currentmemLocation[0]) + Math.abs(currentmemLocation[1]);
console.log("memory location " + currentmemIndex + " is " + finalmovesaway + " moves away and has a value stored of " + grid[locationToText(currentmemLocation)]);
