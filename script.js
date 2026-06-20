const VIDEO_FOLDER = "assets/videos/";
const AUDIO_FOLDER = "assets/audio/";

const ambientAudio = {
  pasillo: new Audio(AUDIO_FOLDER + "vid1_pasillo.wav"),
  espacio1: new Audio(AUDIO_FOLDER + "vid2_salon1.wav"),
  espacio2: new Audio(AUDIO_FOLDER + "vid3_salon2.wav")
};

Object.values(ambientAudio).forEach(audio => {
  audio.loop = true;
  audio.volume = 0.5;
});

const state = {
  currentSceneId: "pasillo",
  previousSceneId: null,
  returnFrame: 1,
  currentFrame: 1,
  targetFrame: 1,
  activeHotspotIndex: -1,
  isModalOpen: false,
  soundEnabled: false,
  loopStarted: false
};

const imageCache = new Map();

const startScreen = document.getElementById("startScreen");
const tourScreen = document.getElementById("tourScreen");
const frameView = document.getElementById("frameView");
const hotspotLayer = document.getElementById("hotspotLayer");
const sceneLabel = document.getElementById("sceneLabel");
const sceneTitle = document.getElementById("sceneTitle");
const spaceNav = document.getElementById("spaceNav");

const enterBtn = document.getElementById("enterBtn");
const soundBtn = document.getElementById("soundBtn");
const homeBtn = document.getElementById("homeBtn");
const returnBtn = document.getElementById("returnBtn");
const backBtn = document.getElementById("backBtn");
const forwardBtn = document.getElementById("forwardBtn");
const progressBar = document.getElementById("progressBar");

const modal = document.getElementById("modal");
const modalVideo = document.getElementById("modalVideo");
const modalTitle = document.getElementById("modalTitle");
const closeModalBtn = document.getElementById("closeModalBtn");

function getCurrentScene() {
  return window.TOUR_SCENES[state.currentSceneId];
}

function renderSpaceNavigation() {
  if (!spaceNav || !window.TOUR_NAV) return;

  spaceNav.innerHTML = "";

  window.TOUR_NAV.forEach(item => {
    const button = document.createElement("button");
    button.textContent = item.label;
    button.className = "space-btn";

    if (item.target === state.currentSceneId) {
      button.classList.add("active");
    }

   button.addEventListener("click", () => {
  state.previousSceneId = state.currentSceneId;
  state.returnFrame = Math.round(state.currentFrame);
  loadScene(item.target, item.startFrame || 1);
});
    spaceNav.appendChild(button);
  });
}

function showTour() {
  startScreen.classList.add("hidden");
  tourScreen.classList.remove("hidden");

  loadScene("pasillo", 1);

  if (!state.loopStarted) {
    state.loopStarted = true;
    requestAnimationFrame(animationLoop);
  }
}

function loadScene(sceneId, startFrame = 1) {
  const scene = window.TOUR_SCENES[sceneId];
  if (!scene) return;

  state.currentSceneId = sceneId;
  state.currentFrame = startFrame;
  state.targetFrame = startFrame;
  state.activeHotspotIndex = -1;

  sceneLabel.textContent = scene.label;
  sceneTitle.textContent = scene.title;
  hotspotLayer.innerHTML = "";

  updateReturnButton();
  renderSpaceNavigation();
  setDocumentHeight();
  setFrame(startFrame);
  syncScrollToFrame(startFrame);
  preloadFrames(scene, startFrame);
  updateAmbientSound(sceneId);
}

function updateAmbientSound(sceneId) {
  Object.values(ambientAudio).forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  const selectedAudio = ambientAudio[sceneId];

  if (!selectedAudio) return;

  if (state.soundEnabled) {
    selectedAudio.play().catch(() => {});
  }
}

function setDocumentHeight() {
  const scene = getCurrentScene();
  const totalHeight = scene.frameCount * scene.pixelsPerFrame + window.innerHeight;
  document.body.style.height = `${totalHeight}px`;
}

function animationLoop() {
  if (!tourScreen.classList.contains("hidden") && !state.isModalOpen) {
    updateFrameEngine();
  }

  requestAnimationFrame(animationLoop);
}

function updateFrameEngine() {
  const scene = getCurrentScene();

  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollRatio = maxScroll <= 0 ? 0 : window.scrollY / maxScroll;

  state.targetFrame = Math.round(
    clamp(scrollRatio * scene.frameCount, 1, scene.frameCount)
  );

  const difference = state.targetFrame - state.currentFrame;

  if (Math.abs(difference) > 0.1) {
    state.currentFrame += difference * 0.10;
  }

  const visibleFrame = Math.round(state.currentFrame);

  setFrame(visibleFrame);
  updateHotspots(visibleFrame);
  updateProgressBar(visibleFrame);
  preloadFrames(scene, visibleFrame);
}

function setFrame(frameNumber) {
  const scene = getCurrentScene();
  const safeFrame = clamp(Math.round(frameNumber), 1, scene.frameCount);
  const frameName = `frame_${String(safeFrame).padStart(4, "0")}.jpg`;
  const src = scene.framePath + frameName;

  if (frameView.src.endsWith(src)) return;

  frameView.src = src;
}

function syncScrollToFrame(frameNumber) {
  const scene = getCurrentScene();
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const ratio = frameNumber / scene.frameCount;

  window.scrollTo({
    top: maxScroll * ratio,
    behavior: "auto"
  });
}

function moveFrames(amount) {
  const scene = getCurrentScene();
  const newFrame = clamp(
    Math.round(state.currentFrame + amount),
    1,
    scene.frameCount
  );

  state.currentFrame = newFrame;
  state.targetFrame = newFrame;
  setFrame(newFrame);
  syncScrollToFrame(newFrame);
  updateHotspots(newFrame);
  updateProgressBar(newFrame);
  preloadFrames(scene, newFrame);
}

function updateProgressBar(frameNumber) {
  const scene = getCurrentScene();
  const progress = (frameNumber / scene.frameCount) * 100;
  progressBar.style.width = `${progress}%`;
}

function updateHotspots(frameNumber) {
  const scene = getCurrentScene();
  const hotspots = scene.hotspots || [];

  const index = hotspots.findIndex(h => {
    return frameNumber >= h.start && frameNumber <= h.end;
  });

  if (index === state.activeHotspotIndex) return;

  state.activeHotspotIndex = index;
  hotspotLayer.innerHTML = "";

  if (index === -1) return;

  renderHotspot(hotspots[index]);
}

function renderHotspot(hotspot) {
  const card = document.createElement("div");
  card.className = "hotspot-card";

  const title = document.createElement("h3");
  title.textContent = hotspot.title;

  const text = document.createElement("p");
  text.textContent = hotspot.text;

  const actions = document.createElement("div");
  actions.className = "hotspot-actions";

  hotspot.actions.forEach(action => {
    const button = document.createElement("button");
    button.textContent = action.label;

    if (action.type === "continue" || action.type === "return") {
      button.classList.add("secondary");
    }

    button.addEventListener("click", () => handleAction(action));
    actions.appendChild(button);
  });

  card.appendChild(title);
  card.appendChild(text);
  card.appendChild(actions);
  hotspotLayer.appendChild(card);
}

function handleAction(action) {
  if (action.type === "goto") {
    state.previousSceneId = state.currentSceneId;
    state.returnFrame = Math.round(state.currentFrame);
    loadScene(action.target, 1);
    return;
  }

  if (action.type === "return") {
    returnToPreviousScene();
    return;
  }

  if (action.type === "continue") {
    const scene = getCurrentScene();
    const hotspot = scene.hotspots[state.activeHotspotIndex];

    if (hotspot) {
      moveFrames(hotspot.end - state.currentFrame + 8);
    }

    hotspotLayer.innerHTML = "";
    state.activeHotspotIndex = -1;
    return;
  }

  if (action.type === "modalVideo") {
    openModal(action.video, action.modalTitle || action.label);
    return;
  }

  if (action.type === "home") {
    goHome();
  }
}

function returnToPreviousScene() {
  closeModal();

  const currentScene = getCurrentScene();
  const targetScene = currentScene.returnTo || state.previousSceneId || "pasillo";

  loadScene(targetScene, state.returnFrame || 1);
}

function goHome() {
  closeModal();
  stopAmbientSound();

  window.scrollTo(0, 0);
  document.body.style.height = "100vh";

  startScreen.classList.remove("hidden");
  tourScreen.classList.add("hidden");

  state.currentSceneId = "pasillo";
  state.previousSceneId = null;
  state.returnFrame = 1;
  state.currentFrame = 1;
  state.targetFrame = 1;
  state.activeHotspotIndex = -1;

  hotspotLayer.innerHTML = "";
  updateReturnButton();
  renderSpaceNavigation();
}

function updateReturnButton() {
  if (state.currentSceneId === "pasillo") {
    returnBtn.classList.add("hidden");
  } else {
    returnBtn.classList.remove("hidden");
  }
}

function openModal(videoFile, title) {
  state.isModalOpen = true;

  pauseAmbientSound();

  modalTitle.textContent = title;
  modalVideo.src = VIDEO_FOLDER + videoFile;
  modalVideo.muted = !state.soundEnabled;
  modalVideo.load();

  modal.classList.remove("hidden");
  modalVideo.play().catch(() => {});
}

function closeModal() {
  state.isModalOpen = false;

  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();

  modal.classList.add("hidden");

  if (state.soundEnabled && !tourScreen.classList.contains("hidden")) {
    updateAmbientSound(state.currentSceneId);
  }
}

function pauseAmbientSound() {
  Object.values(ambientAudio).forEach(audio => {
    audio.pause();
  });
}

function stopAmbientSound() {
  Object.values(ambientAudio).forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;

  modalVideo.muted = !state.soundEnabled;

  if (state.soundEnabled) {
    updateAmbientSound(state.currentSceneId);
  } else {
    stopAmbientSound();
  }

  soundBtn.textContent = state.soundEnabled ? "Sonido activado" : "Activar sonido";
}

function preloadFrames(scene, startFrame) {
  const start = Math.max(1, startFrame - 40);
  const end = Math.min(scene.frameCount, startFrame + 90);

  for (let i = start; i <= end; i++) {
    const frameName = `frame_${String(i).padStart(4, "0")}.jpg`;
    const src = scene.framePath + frameName;

    if (imageCache.has(src)) continue;

    const img = new Image();
    img.src = src;
    imageCache.set(src, img);
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

enterBtn.addEventListener("click", showTour);
soundBtn.addEventListener("click", toggleSound);
homeBtn.addEventListener("click", goHome);
returnBtn.addEventListener("click", returnToPreviousScene);

backBtn.addEventListener("click", () => moveFrames(-12));
forwardBtn.addEventListener("click", () => moveFrames(12));
closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      closeModal();
      return;
    }

    if (state.currentSceneId !== "pasillo") {
      returnToPreviousScene();
      return;
    }
  }

  if (event.key === "ArrowRight") moveFrames(12);
  if (event.key === "ArrowLeft") moveFrames(-12);
});