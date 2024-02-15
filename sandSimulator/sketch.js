function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let w = 5; // length of every square pixels
let cols, rows;

function setup() {
  createCanvas(400, 400);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);

  grid[20][10] = 1;
}

function mouseDragged() {
  // dividing with width will give col and row the position of white pixels
  let col = floor(mouseX / w);
  let row = floor(mouseY / w);
  if (col >= 0 && col <= cols - 1 && row >= 0 && row <= rows - 1) {
    grid[col][row] = 1;
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      //fill (grid[i][j]*255);

      // only filling the blocks those are 1;
      if (grid[i][j] == 1) {
        fill(255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  // creating next grid

  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];

      // is state is 1 I need to react according to below pixel state
      if (state === 1) {
        // adding randomness

        let dir = 1;
        if (random(1) > 0.5) {
          dir *= -1;
        }

        let below = grid[i][j + 1];
        let belowRand;
        if (i - dir >= 0 && i - dir <= cols - 1) {
          belowRand = grid[i - dir][j + 1];
        }
        //let belowB = grid [i+dir][j+1];

        if (below === 0) {
          nextGrid[i][j + 1] = 1;
        } else if (belowRand === 0) {
          nextGrid[i - dir][j + 1] = 1;
        } else {
          nextGrid[i][j] = 1; // for the lasst row
        }
      }
    }
  }

  grid = nextGrid;
}

/*
 ** next update: add color mode;
 */
