const scenes = {
  intro: document.getElementById("intro"),
  door: document.getElementById("doorScene"),
  walk: document.getElementById("walkScene"),
  hall: document.getElementById("hallScene"),
  card: document.getElementById("cardScene")
};

const music = document.getElementById("music");
const voice = document.getElementById("voice");
const originalMusicVolume = 0.32;
let revealTimer = null;

function showScene(scene) {
  Object.values(scenes).forEach(s => s.classList.remove("active"));
  scene.classList.add("active");
  window.scrollTo(0, 0);
}

function tryMusic(volume = originalMusicVolume) {
  music.volume = volume;
  music.play().catch(() => {});
}

function resetHallReveal() {
  clearTimeout(revealTimer);
  document.getElementById("pookalamReveal").classList.remove("revealed");
  document.getElementById("revealText").classList.remove("show");
  document.getElementById("cardBtn").classList.add("hidden");
}

function startHallReveal() {
  resetHallReveal();
  showScene(scenes.hall);

  // Give the camera a moment to settle before revealing the pookalam.
  revealTimer = setTimeout(() => {
    document.getElementById("pookalamReveal").classList.add("revealed");
    document.getElementById("revealText").classList.add("show");

    // Personal voice starts exactly with the flower-face reveal.
    music.volume = 0.08;
    voice.currentTime = 0;
    voice.volume = 1.0;
    voice.play().catch(() => {});

    setTimeout(() => {
      document.getElementById("cardBtn").classList.remove("hidden");
    }, 2500);
  }, 1400);
}

function stopVoice() {
  voice.pause();
  voice.currentTime = 0;
  music.volume = originalMusicVolume;
}

document.getElementById("startBtn").addEventListener("click", () => {
  tryMusic();
  showScene(scenes.door);

  setTimeout(() => document.getElementById("door").classList.add("open"), 700);
  setTimeout(() => document.getElementById("girl").classList.add("show"), 1600);
  setTimeout(() => document.getElementById("welcomeText").classList.add("show"), 2200);
  setTimeout(() => document.getElementById("enterBtn").classList.remove("hidden"), 3200);
});

document.getElementById("enterBtn").addEventListener("click", () => {
  showScene(scenes.walk);
  tryMusic(0.28);

  // The visitor walks into the celebration; no separate corridor scene.
  setTimeout(() => {
    document.getElementById("hallBtn").classList.remove("hidden");
  }, 5200);
});

document.getElementById("hallBtn").addEventListener("click", startHallReveal);

document.getElementById("cardBtn").addEventListener("click", () => {
  showScene(scenes.card);
});

document.getElementById("replayBtn").addEventListener("click", () => {
  stopVoice();
  resetHallReveal();
  document.getElementById("door").classList.remove("open");
  document.getElementById("girl").classList.remove("show");
  document.getElementById("welcomeText").classList.remove("show");
  document.getElementById("enterBtn").classList.add("hidden");
  document.getElementById("hallBtn").classList.add("hidden");
  showScene(scenes.intro);
});
