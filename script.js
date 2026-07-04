const gridElement = document.getElementById('grid');
const movesElement = document.getElementById('moves');

// സൗണ്ട് എഫക്റ്റുകൾ (ഓൺലൈൻ ലിങ്കുകൾ ഉപയോഗിക്കുന്നു)
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
const winSound = new Audio('https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3');
clickSound.volume = 0.5; // ക്ലിക്ക് സൗണ്ട് കുറച്ചു വെക്കാൻ

const states = ['PRESENT', 'FUTURE', 'PAST'];
let grid = Array(9).fill(0).map(() => states[Math.floor(Math.random() * states.length)]);
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
  // ക്ലിക്ക് ചെയ്യുമ്പോൾ സൗണ്ട് പ്ലേ ചെയ്യാൻ
  clickSound.currentTime = 0; 
  clickSound.play();

  const affectedIndices = [index];

  if (index - 3 >= 0) affectedIndices.push(index - 3); 
  if (index + 3 < 9) affectedIndices.push(index + 3); 
  if (index % 3 !== 0) affectedIndices.push(index - 1); 
  if (index % 3 !== 2) affectedIndices.push(index + 1); 

  affectedIndices.forEach(i => {
    let currentState = grid[i];
    let nextStateIndex = (states.indexOf(currentState) + 1) % states.length;
    grid[i] = states[nextStateIndex];
  });

  moves++;
  renderGrid();
  checkWin();
}

function checkWin() {
  const firstState = grid[0];
  const isWin = grid.every(state => state === firstState);
  
  if (isWin) {
    // ജയിക്കുമ്പോൾ ഉള്ള സൗണ്ട് 
    winSound.play();
    
    setTimeout(() => {
      alert(`പൊളിച്ചു! You stabilized the Time Rift in ${moves} moves! 🚀`);
    }, 500);
  }
}

function resetGame() {
  grid = Array(9).fill(0).map(() => states[Math.floor(Math.random() * states.length)]);
  moves = 0;
  renderGrid();
}

renderGrid();
