// ascii-stars.js
console.log('[ascii-stars] Script loaded');

document.addEventListener('DOMContentLoaded', function() {
function getGridSize() {
  // Make grid fill the viewport
  const width = Math.ceil(window.innerWidth / 8);
  const height = Math.ceil(window.innerHeight / 16);
  return { width, height };
}

let { width, height } = getGridSize();
let starCount = Math.floor((width * height) / 8);
let stars = [];
for (let i = 0; i < starCount; i++) {
  stars.push({
    x: Math.floor(Math.random() * width),
    y: Math.floor(Math.random() * height),
    phase: Math.random() * Math.PI * 2
  });
}

function renderStars() {
  let t = Date.now() / 1000;
  let grid = Array.from({length: height}, () => Array(width).fill(' '));
  for (let s of stars) {
    let shine = Math.abs(Math.sin(t + s.phase));
    grid[s.y][s.x] = shine > 0.7 ? '*' : (shine > 0.4 ? '.' : ' ');
  }
  const bg = document.getElementById('ascii-stars-bg');
  if (bg) {
    bg.textContent = grid.map(row => row.join('')).join('\n');
  }
  requestAnimationFrame(renderStars);
}

window.addEventListener('resize', () => {
  const size = getGridSize();
  width = size.width;
  height = size.height;
  starCount = Math.floor((width * height) / 8);
  stars = [];
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      phase: Math.random() * Math.PI * 2
    });
  }
});

renderStars();
});
