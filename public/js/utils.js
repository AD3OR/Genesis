
if (!localStorage.getItem("researchTime")) localStorage.setItem("researchTime", 0);
if (!localStorage.getItem("bookmarkedDisorders")) localStorage.setItem("bookmarkedDisorders", 0);
if (!localStorage.getItem("defectsDiscovered")) localStorage.setItem("defectsDiscovered", 0);
if (!localStorage.getItem("bookmarkedDatasets")) localStorage.setItem("bookmarkedDatasets", 0);

// public/js/utils.js
window.formatTime = function(totalSeconds) {
  totalSeconds = Math.max(0, Math.floor(totalSeconds));
  const h = String(Math.floor(totalSeconds / 3600)).padStart(2,'0');
  const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2,'0');
  const s = String(totalSeconds % 60).padStart(2,'0');
  return `${h}:${m}:${s}`;
};

window.loadJSON = function(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
window.saveJSON = function(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
};
