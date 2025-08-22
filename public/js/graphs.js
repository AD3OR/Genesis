const disorderName = document.body.dataset.disorder || "Disorder";

// Main toggle for description
const mainToggleBtn = document.getElementById('mainToggleBtn');
const mainContent = document.getElementById('mainContent');
const mainArrowIcon = document.getElementById('mainArrowIcon');
if (mainToggleBtn) {
    mainToggleBtn.addEventListener('click', () => {
        mainContent.classList.toggle('hidden');
        mainArrowIcon.classList.toggle('rotate-90');
        mainToggleBtn.classList.toggle('rounded-b-lg');
        mainToggleBtn.classList.toggle('rounded-lg');
    });
}

// Country toggle
const countryToggleBtn = document.getElementById('countryToggleBtn');
const countryContent = document.getElementById('countryContent');
const countryArrowIcon = document.getElementById('countryArrowIcon');
if (countryToggleBtn) {
    countryToggleBtn.addEventListener('click', () => {
        countryContent.classList.toggle('hidden');
        countryArrowIcon.classList.toggle('rotate-90');
        countryToggleBtn.classList.toggle('rounded-b-lg');
        countryToggleBtn.classList.toggle('rounded-lg');
    });
}

const countryCards = document.querySelectorAll('.country-card');
const charts = {};

// Dummy country data (can reuse)
const countryData = {
    usa: { labels: ['0-5','6-12','13-18','19-30','31-50','51+'], data: [80,75,70,65,50,30], color: 'rgb(34,197,94)' },
    uk: { labels: ['0-5','6-12','13-18','19-30','31-50','51+'], data: [70,68,65,60,45,25], color: 'rgb(34,197,94)' },
    canada: { labels: ['0-5','6-12','13-18','19-30','31-50','51+'], data: [65,62,58,55,40,20], color: 'rgb(34,197,94)' },
    australia: { labels: ['0-5','6-12','13-18','19-30','31-50','51+'], data: [60,58,55,50,35,18], color: 'rgb(34,197,94)' },
    india: { labels: ['0-5','6-12','13-18','19-30','31-50','51+'], data: [100,95,90,80,60,40], color: 'rgb(34,197,94)' },
    bangladesh: { labels: ['0-5','6-12','13-18','19-30','31-50','51+'], data: [90,88,85,75,55,35], color: 'rgb(34,197,94)' }
};

function renderChart(canvasId, countryKey, disorderName) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    if (charts[canvasId]) charts[canvasId].destroy();

    const countryDisplayName = countryKey.charAt(0).toUpperCase() + countryKey.slice(1);

    charts[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: countryData[countryKey].labels,
            datasets: [{
                label: `${disorderName} Prevalence in ${countryDisplayName}`,
                data: countryData[countryKey].data,
                borderColor: countryData[countryKey].color,
                backgroundColor: `${countryData[countryKey].color}40`,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: countryData[countryKey].color,
                pointBorderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `${disorderName} Prevalence vs. Age in ${countryDisplayName}`,
                    font: { size: 18, weight: 'bold' }
                },
                legend: { display: false }
            }
        }
    });
}

countryCards.forEach(card => {
    const toggleButton = card.querySelector('.country-toggle');
    const graphContentDiv = card.querySelector('.graph-content');
    const arrowIcon = card.querySelector('.arrow-icon');
    const canvas = graphContentDiv.querySelector('canvas');
    const countryKey = canvas.id.replace('Chart', '');

    toggleButton.addEventListener('click', () => {
        const isHidden = graphContentDiv.classList.toggle('hidden');
        arrowIcon.classList.toggle('rotate-90');
        arrowIcon.classList.toggle('rotate-0');

        if (!isHidden) {
            requestAnimationFrame(() => {
                renderChart(canvas.id, countryKey, disorderName);
            });
        } else {
            if (charts[canvas.id]) {
                charts[canvas.id].destroy();
                delete charts[canvas.id];
            }
        }
    });
});
