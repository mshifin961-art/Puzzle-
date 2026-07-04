const gridElement = document.getElementById('grid');
const movesElement = document.getElementById('moves');

const states = ['PRESENT', 'FUTURE', 'PAST'];

// ഗെയിം തുടങ്ങുമ്പോൾ തന്നെ ടൈലുകൾ പല സമയങ്ങളിൽ (Random) ആക്കി വെക്കാൻ
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
  // ടൈം റിപ്പിൾ ലോജിക്: ക്ലിക്ക് ചെയ്ത ടൈലും ചുറ്റുമുള്ളവയും കണ്ടുപിടിക്കാൻ
  const affectedIndices = [index];

  if (index - 3 >= 0) affectedIndices.push(index - 3); // മുകളിലുള്ള ടൈൽ
  if (index + 3 < 9) affectedIndices.push(index + 3); // താഴെയുള്ള ടൈൽ
  if (index % 3 !== 0) affectedIndices.push(index - 1); // ഇടതുവശത്തെ ടൈൽ
  if (index % 3 !== 2) affectedIndices.push(index + 1); // വലതുവശത്തെ ടൈൽ

  // ഈ കണ്ടുപിടിച്ച എല്ലാ ടൈലുകളുടെയും സമയം മാറ്റാൻ
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
  // എല്ലാ ടൈലുകളും ഒരേ സമയത്ത് (ഒരേ നിറത്തിൽ) എത്തിയോ എന്ന് ചെക്ക് ചെയ്യാൻ
  const firstState = grid[0];
  const isWin = grid.every(state => state === firstState);
  
  if (isWin) {
    setTimeout(() => {
      alert(`congruatulations! You stabilized the Time Rift in ${moves} moves! 🚀`);
    }, 300);
  }
}

renderGrid();
