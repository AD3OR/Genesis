const ts = document.getElementById("title-screen");
const tab = document.getElementById("userTable");

if (ts && tab) {
  ts.classList.add("fade-in-out");

  setTimeout(() => {
    ts.style.display = "none";
    tab.classList.remove("hidden");
    tab.classList.add("fade-in");
  }, 2500); // Match with welcome screen animation duration
}

