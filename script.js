const scenes = {
  intro: document.getElementById("intro"),
  door: document.getElementById("doorScene"),
  walk: document.getElementById("walkScene"),
  hall: document.getElementById("hallScene"),
  card: document.getElementById("cardScene")
};

const music = document.getElementById("music");

function showScene(scene) {
  Object.values(scenes).forEach(s => s.classList.remove("active"));
  scene.classList.add("active");
  window.scrollTo(0, 0);
}

function tryMusic() {
  music.play().catch(() => {
    // Browsers may block autoplay until the user interacts.
  });
}

document.getElementById("startBtn").addEventListener("click", () => {
  tryMusic();
  showScene(scenes.door);

  setTimeout(() => {
    document.getElementById("door").classList.add("open");
  }, 700);

  setTimeout(() => {
    document.getElementById("girl").classList.add("show");
  }, 1600);

  setTimeout(() => {
    document.getElementById("welcomeText").classList.add("show");
  }, 2400);

  setTimeout(() => {
    document.getElementById("enterBtn").classList.remove("hidden");
  }, 3500);
});

document.getElementById("enterBtn").addEventListener("click", () => {
  showScene(scenes.walk);
});

document.getElementById("hallBtn").addEventListener("click", () => {
  showScene(scenes.hall);
});

document.getElementById("cardBtn").addEventListener("click", () => {
  showScene(scenes.card);
});

document.getElementById("replayBtn").addEventListener("click", () => {
  document.getElementById("door").classList.remove("open");
  document.getElementById("girl").classList.remove("show");
  document.getElementById("welcomeText").classList.remove("show");
  document.getElementById("enterBtn").classList.add("hidden");
  showScene(scenes.intro);
});
