
const mainToggleBtn = document.getElementById('mainToggleBtn');
const mainContent = document.getElementById('mainContent');
const mainArrowIcon = document.getElementById('mainArrowIcon');
const factSections = document.querySelectorAll('.fact-section');

mainToggleBtn.addEventListener('click', () => {
    mainContent.classList.toggle('hidden');
    mainArrowIcon.classList.toggle('rotate-90'); 
    mainToggleBtn.classList.toggle('rounded-b-lg'); // Adjust button border-radius when content expands/collapses
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


// --- Countries & ASD Data Logic ---
const countryToggleBtn = document.getElementById('countryToggleBtn');
const countryContent = document.getElementById('countryContent');
const countryArrowIcon = document.getElementById('countryArrowIcon');
const countryCards = document.querySelectorAll('.country-card');

// Store chart instances to destroy them before re-rendering
const charts = {};

// Dummy data for ASD patients vs. age for different countries
const countryData = {
    usa: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [150, 220, 180, 100, 70, 40],
        color: 'rgb(34, 197, 94)' 
    },
    uk: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [120, 190, 160, 90, 60, 30],
        color: 'rgb(34, 197, 94)' 
    },
    canada: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [100, 170, 140, 80, 50, 25],
        color: 'rgb(34, 197, 94)' 
    },
    australia: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [90, 150, 130, 75, 45, 20],
        color: 'rgb(34, 197, 94)' 
    },
    india: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [200, 280, 250, 150, 100, 60],
        color: 'rgb(34, 197, 94)' 
    },
    bangladesh: {
        labels: ['0-5', '6-12', '13-18', '19-30', '31-50', '51+'],
        data: [120, 100, 50, 70, 70, 60],
        color: 'rgb(34, 197, 94)' 
    }
};

// Function to render a Chart.js graph
function renderChart(canvasId, countryName, data, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // Destroy existing chart instance if it exists
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }

    // Create new chart instance
    charts[canvasId] = new Chart(ctx, {
        type: 'line', // Line graph for trend over age
        data: {
            labels: countryData[countryName].labels,
            datasets: [{
                label: `ASD Patients in ${countryName}`,
                data: countryData[countryName].data,
                borderColor: color,
                backgroundColor: `${color}40`, // Light fill for the area under the line
                fill: true,
                tension: 0.3, // Smooth the line
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: color,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Allow canvas to resize freely
            plugins: {
                title: {
                    display: true,
                    text: `ASD Patients vs. Age in ${countryName}`,
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    color: '#333'
                },
                legend: {
                    display: false // Hide legend as label is in title
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
                        display: false // Hide x-axis grid lines
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Number of Patients (Dummy Data)',
                        color: '#555'
                    },
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value; // Display raw numbers
                        }
                    }
                }
            }
        }
    });
}

// Function to toggle the main country content visibility
countryToggleBtn.addEventListener('click', () => {
    countryContent.classList.toggle('hidden');
    countryArrowIcon.classList.toggle('rotate-90');
    countryToggleBtn.classList.toggle('rounded-b-lg');
    countryToggleBtn.classList.toggle('rounded-lg');
});

// Loop through each country card to add toggle functionality and chart rendering
countryCards.forEach(card => {
    const toggleButton = card.querySelector('.country-toggle');
    const graphContentDiv = card.querySelector('.graph-content');
    const arrowIcon = card.querySelector('.arrow-icon');
    const canvas = graphContentDiv.querySelector('canvas');
    const countryName = canvas.id.replace('Chart', ''); // e.g., 'usa' from 'usaChart'

    toggleButton.addEventListener('click', () => {
        const isHidden = graphContentDiv.classList.toggle('hidden');
        arrowIcon.classList.toggle('rotate-90');
        arrowIcon.classList.toggle('rotate-0');

        if (!isHidden) {
            // Content is now visible, render the chart
            // Use requestAnimationFrame to ensure canvas is visible before drawing
            requestAnimationFrame(() => {
                renderChart(canvas.id, countryName, countryData[countryName].data, countryData[countryName].color);
            });
            toggleButton.classList.remove('rounded-b-lg');
        } else {
            // Content is now hidden, destroy the chart to free up resources
            if (charts[canvas.id]) {
                charts[canvas.id].destroy();
                delete charts[canvas.id]; // Remove reference
            }
            toggleButton.classList.add('rounded-b-lg');
        }
    });
});