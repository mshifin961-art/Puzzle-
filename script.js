const gridElement = document.getElementById('grid');
const movesElement = document.getElementById('moves');

const states = ['PRESENT', 'FUTURE', 'PAST'];
let grid = Array(9).fill('PRESENT');
let moves = 0;

function renderGrid() {
  gridElement.innerHTML = '';
  grid.forEach((state, index) => {
    const tile = document.createElement('div');
    tile.className = `tile ${state}`;
    tile.onclick = () => handleTileClick(index);

    const dot = document.createElement('div');
    dot.className = 'dot';

    const text = document.createElement('span');
    text.className = 'state-text';
    text.innerText = state;

    tile.appendChild(dot);
    tile.appendChild(text);
    gridElement.appendChild(tile);
  });
  movesElement.innerText = moves;
}

function handleTileClick(index) {
  let currentState = grid[index];
  let nextStateIndex = (states.indexOf(currentState) + 1) % states.length;
  grid[index] = states[nextStateIndex];
  moves++;
  renderGrid();
}

renderGrid();
