console.log("Zoom script loaded");
document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("anatomy-image");
  const lens = document.getElementById("zoom-lens");

  if (!img || !lens) return;

  img.addEventListener("mousemove", moveLens);
  img.addEventListener("mouseenter", () => lens.style.visibility = "visible");
  img.addEventListener("mouseleave", () => lens.style.visibility = "hidden");

  function moveLens(e) {
    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lensSize = lens.offsetWidth / 2;

    let left = x - lensSize;
    let top = y - lensSize;

    // Keep lens within bounds
    left = Math.max(0, Math.min(left, img.width - lens.offsetWidth));
    top = Math.max(0, Math.min(top, img.height - lens.offsetHeight));

    lens.style.left = left + rect.left + window.scrollX + "px";
    lens.style.top = top + rect.top + window.scrollY + "px";

    lens.style.backgroundImage = `url('${img.src}')`;
    lens.style.backgroundPosition = `-${x * 2 - lensSize + 100}px -${y * 2 - lensSize + 100}px`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");

  searchBtn?.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      // You can change this to a real search route if you want
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });

  // Optional: Enter key support
  searchInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });
});

const welcomeScreen = document.getElementById("welcome-screen");
const searchBar = document.getElementById("search-bar");

if (welcomeScreen && searchBar) {
  welcomeScreen.classList.add("fade-in-out");

  setTimeout(() => {
    welcomeScreen.style.display = "none";
    searchBar.classList.remove("hidden");
    searchBar.classList.add("fade-in");
  }, 2500); // Match with welcome screen animation duration
}

