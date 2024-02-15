function make2DArray(cols, rows) {
  let arr = new Array(cols); // for (x,y) x refers to --> column

  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let height = 600;
let width = 600;
let grid;
let rows, cols, pixel_size;
function setup() {
  createCanvas(height, width);
  frameRate(10);

  pixel_size = 8; // it changes the framerate;

  rows = height / pixel_size;
  cols = width / pixel_size;

  grid = make2DArray(cols, rows);

  // inserting some random values

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2)); // gives me 1 or 0;
    }
  }

  //console.table(grid);
}

function neighbour_counter(grid, x, y) {
  let sum = 0;

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let new_x = (x + i + cols) % cols;
      let new_y = (y + j + rows) % rows;
      sum += grid[new_x][new_y];
    }
  }

  sum -= grid[x][y];
  return sum;
}

function draw() {
  background(50);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(50);
      strokeWeight(2);

      if (grid[i][j] == 1) {
        fill(255);
        let x = i * pixel_size;
        let y = j * pixel_size;

        square(x, y, pixel_size);
      }
    }
  }

  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // here we write conditions
      let neighbours = neighbour_counter(grid, i, j);

      let state = grid[i][j];

      // if neighbours are less than 2 or more than 3 then cell dies

      if (state == 0 && neighbours == 3) nextGrid[i][j] = 1;
      else if (state == 1 && (neighbours < 2 || neighbours > 3))
        nextGrid[i][j] = 0;
      else nextGrid[i][j] = state;

      //console.log("test");
    }
  }

  grid = nextGrid;
}
