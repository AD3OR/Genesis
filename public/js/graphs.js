const mainToggleBtn = document.getElementById('mainToggleBtn');
const mainContent = document.getElementById('mainContent');
const mainArrowIcon = document.getElementById('mainArrowIcon');
const factSections = document.querySelectorAll('.fact-section');

mainToggleBtn.addEventListener('click', () => {
    mainContent.classList.toggle('hidden');
    mainArrowIcon.classList.toggle('rotate-90');
    mainToggleBtn.classList.toggle('rounded-b-lg');
    mainToggleBtn.classList.toggle('rounded-lg');
});

factSections.forEach(section => {
    const toggleButton = section.querySelector('.fact-toggle');
    const contentDiv = section.querySelector('.fact-content');
    const arrowIcon = section.querySelector('.arrow-icon');

    toggleButton.addEventListener('click', () => {
        contentDiv.classList.toggle('hidden');
        arrowIcon.classList.toggle('rotate-90');
        arrowIcon.classList.toggle('rotate-0');
        if (contentDiv.classList.contains('hidden')) {
            toggleButton.classList.add('rounded-b-lg');
        } else {
            toggleButton.classList.remove('rounded-b-lg');
        }
    });
});

const countryToggleBtn = document.getElementById('countryToggleBtn');
const countryContent = document.getElementById('countryContent');
const countryArrowIcon = document.getElementById('countryArrowIcon');
const countryCards = document.querySelectorAll('.country-card');

const charts = {};

const countryData = {
    usa: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [80, 75, 70, 65, 50, 30],
        color: 'rgb(34, 197, 94)'
    },
    uk: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [70, 68, 65, 60, 45, 25],
        color: 'rgb(34, 197, 94)'
    },
    canada: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [65, 62, 58, 55, 40, 20],
        color: 'rgb(34, 197, 94)'
    },
    australia: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [60, 58, 55, 50, 35, 18],
        color: 'rgb(34, 197, 94)'
    },
    india: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [100, 95, 90, 80, 60, 40],
        color: 'rgb(34, 197, 94)'
    },
    bangladesh: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [90, 88, 85, 75, 55, 35],
        color: 'rgb(34, 197, 94)'
    }
};

function renderChart(canvasId, countryKey, data, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }

    const countryDisplayName = countryKey.charAt(0).toUpperCase() + countryKey.slice(1);

    charts[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: countryData[countryKey].labels,
            datasets: [{
                label: `Brachydactyly Prevalence in ${countryDisplayName}`,
                data: countryData[countryKey].data,
                borderColor: color,
                backgroundColor: `${color}40`,
                fill: true,
                tension: 0.3,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: color,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Brachydactyly Prevalence vs. Age in ${countryDisplayName}`,
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    color: '#333'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Age Group',
                        color: '#555'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Prevalence (Dummy Data)',
                        color: '#555'
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value;
                        }
                    }
                }
            }
        }
    });
}

countryToggleBtn.addEventListener('click', () => {
    countryContent.classList.toggle('hidden');
    countryArrowIcon.classList.toggle('rotate-90');
    countryToggleBtn.classList.toggle('rounded-b-lg');
    countryToggleBtn.classList.toggle('rounded-lg');
});

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
                renderChart(canvas.id, countryKey, countryData[countryKey].data, countryData[countryKey].color);
            });
            toggleButton.classList.remove('rounded-b-lg');
        } else {
            if (charts[canvas.id]) {
                charts[canvas.id].destroy();
                delete charts[canvas.id];
            }
            toggleButton.classList.add('rounded-b-lg');
        }
    });
});
