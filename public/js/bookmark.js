function updateStats() {
    const time = parseInt(localStorage.getItem("researchTime"), 10) || 0;
    document.querySelector("#researchTimeStat .stat-value").textContent = formatTime(time);

    // --- Bookmarked Disorders ---
    const disorders = JSON.parse(localStorage.getItem("bookmarkedDisordersList") || "[]");
    document.querySelector("#bookmarkedDisordersStat .stat-value").textContent = disorders.length;

    // Populate disorders dropdown
    const disorderListEl = document.getElementById("bookmarkedDisordersList");
    disorderListEl.innerHTML = "";
    disorders.forEach(d => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${d.url}">${d.name}</a>`;
        disorderListEl.appendChild(li);
    });

    // --- Defects ---
    document.getElementById("defectsDiscoveredValue").textContent =
        Number(sessionStorage.getItem("defectsDiscovered")) || 0;

    // --- Bookmarked Datasets ---
    const datasets = JSON.parse(localStorage.getItem("bookmarkedDatasetsList") || "[]");
    document.querySelector("#bookmarkedDatasetsStat .stat-value").textContent = datasets.length;

    // Populate datasets dropdown
    const datasetListEl = document.getElementById("bookmarkedDatasetsList");
    datasetListEl.innerHTML = "";
    datasets.forEach(d => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${d.url}">${d.name}</a>`;
        datasetListEl.appendChild(li);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    const datasetBtn = document.getElementById("bookmarkDatasetBtn");

    if (datasetBtn) {
        const datasetKey = datasetBtn.dataset.datasetKey;
        const datasetName = datasetBtn.dataset.datasetName;
        const datasetUrl = datasetBtn.dataset.datasetUrl;

        function updateDatasetBtn() {
            if (localStorage.getItem(datasetKey) === "true") {
                datasetBtn.textContent = "📂 Unbookmark Dataset";
            } else {
                datasetBtn.textContent = "📂 Bookmark This Dataset";
            }
        }

        datasetBtn.addEventListener("click", () => {
            let datasets = JSON.parse(localStorage.getItem("bookmarkedDatasetsList") || "[]");
            const index = datasets.findIndex(d => d.url === datasetUrl);

            if (localStorage.getItem(datasetKey) === "true") {
                // remove bookmark
                localStorage.removeItem(datasetKey);
                if (index > -1) datasets.splice(index, 1);
                console.log(`Dataset removed: ${datasetName}`);
            } else {
                // add bookmark
                localStorage.setItem(datasetKey, "true");
                if (index === -1) datasets.push({ name: datasetName, url: datasetUrl });
                console.log(`Dataset added: ${datasetName}`);
            }

            localStorage.setItem("bookmarkedDatasetsList", JSON.stringify(datasets));
            updateDatasetBtn();
        });

        // Initialize button state on load
        updateDatasetBtn();
    }
});
