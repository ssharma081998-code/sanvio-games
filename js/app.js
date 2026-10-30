const games = [
  {id:"runner",name:"Endless Runner",category:"arcade",label:"ARCADE",description:"Dodge obstacles, collect rewards and see how far you can run.",symbol:"🏃",background:"linear-gradient(135deg,#34205e,#a44c9b)",status:"Coming soon",image:"09-game-endless-runner.webp"},
  {id:"traffic",name:"Traffic Racer",category:"racing",label:"RACING",description:"Weave through busy highways and chase your distance record.",symbol:"🏎️",background:"linear-gradient(135deg,#123b61,#168f9b)",status:"Coming soon",image:"10-game-traffic-racer.webp"},
  {id:"bubble",name:"Bubble Shooter",category:"puzzle",label:"PUZZLE",description:"Aim, match colorful bubbles and clear the board.",symbol:"🫧",background:"linear-gradient(135deg,#173c73,#8a5cc8)",status:"Coming soon",image:"11-game-bubble-shooter.webp"},
  {id:"2048",name:"2048 Puzzle",category:"brain",label:"BRAIN",description:"Combine matching numbers and work your way to 2048.",symbol:"🔢",background:"linear-gradient(135deg,#76502e,#d69a4e)",status:"Coming soon",image:"12-game-2048-puzzle.webp"},
  {id:"blocks",name:"Block Puzzle",category:"puzzle",label:"PUZZLE",description:"Fit the pieces, clear lines and keep the board alive.",symbol:"🧩",background:"linear-gradient(135deg,#254b70,#4d9caa)",status:"Coming soon",image:"13-game-block-puzzle.webp"},
  {id:"flyer",name:"Sky Flyer",category:"arcade",label:"ARCADE",description:"Fly through tricky gaps in this fast one-touch challenge.",symbol:"🪽",background:"linear-gradient(135deg,#254b83,#52a6cb)",status:"Coming soon",image:"14-game-sky-flyer.webp"},
  {id:"snake",name:"Snake Arena",category:"arcade",label:"ARCADE",description:"Collect food, grow longer and avoid your own tail.",symbol:"🐍",background:"linear-gradient(135deg,#164d3b,#55a66d)",status:"Coming soon",image:"15-game-snake-arena.webp"},
  {id:"memory",name:"Memory Match",category:"brain",label:"BRAIN",description:"Flip the cards, find matching pairs and train your memory.",symbol:"🧠",background:"linear-gradient(135deg,#50306d,#b46caa)",status:"Coming soon",image:"16-game-memory-match.webp"},
  {id:"sort",name:"Color Sort",category:"puzzle",label:"PUZZLE",description:"Sort the colors into the right tubes, one move at a time.",symbol:"🎨",background:"linear-gradient(135deg,#6b3654,#d17a7a)",status:"Coming soon",image:"17-game-color-sort.webp"},
  {id:"parking",name:"Parking Master",category:"racing",label:"RACING",description:"Plan your moves and guide each car into its parking spot.",symbol:"🅿️",background:"linear-gradient(135deg,#34405e,#7889b8)",status:"Coming soon",image:"18-game-parking-master.webp"}
];

const grid = document.querySelector("#gamesGrid");
const search = document.querySelector("#gameSearch");
const emptyState = document.querySelector("#emptyState");
const filters = [...document.querySelectorAll(".filter-chip")];
const toast = document.querySelector("#toast");
let activeFilter = "all";
let toastTimer;

function renderGames() {
  const query = search.value.trim().toLowerCase();
  const visible = games.filter(game => {
    const matchesFilter = activeFilter === "all" || game.category === activeFilter;
    const matchesSearch = game.name.toLowerCase().includes(query) || game.description.toLowerCase().includes(query) || game.category.includes(query);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = visible.map((game, index) => `
    <article class="game-card">
      <div class="game-art" style="--art-bg:${game.background};--game-image:url(${game.image})">
        <span class="art-index">GAME ${String(games.indexOf(game) + 1).padStart(2, "0")}</span>
        <span class="art-tag">${game.label}</span>
        <span class="art-symbol" aria-hidden="true">${game.symbol}</span>
      </div>
      <div class="game-info">
        <div class="game-topline"><h3>${game.name}</h3><span class="game-number">#${String(games.indexOf(game) + 1).padStart(2, "0")}</span></div>
        <p>${game.description}</p>
        <div class="game-bottom"><span class="game-category">${game.category}</span><button class="play-button" type="button" data-game="${game.id}">Coming soon</button></div>
      </div>
    </article>
  `).join("");

  emptyState.hidden = visible.length !== 0;
  grid.hidden = visible.length === 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

filters.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach(item => item.classList.toggle("selected", item === button));
    renderGames();
  });
});

search.addEventListener("input", renderGames);
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-game]");
  if (!button) return;
  const game = games.find(item => item.id === button.dataset.game);
  if (game) showToast(`${game.name} is in development. Stay tuned!`);
});

document.querySelector("#searchToggle").addEventListener("click", () => {
  search.focus();
  document.querySelector("#games").scrollIntoView({behavior:"smooth"});
});

document.querySelector("#mobileMenuButton").addEventListener("click", () => {
  document.querySelector("#games").scrollIntoView({behavior:"smooth"});
});

document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    search.focus();
  }
  if (event.key === "Escape") search.blur();
});

document.querySelector("#year").textContent = new Date().getFullYear();
renderGames();