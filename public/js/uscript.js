const researchTimeStat = document.getElementById('researchTimeStat');
const researchTimeChartCanvas = document.getElementById('researchTimeChart');
const researchTimeGraphContainer = document.getElementById('researchTimeGraphContainer'); // Get the new container

let researchChartInstance = null;

const dummyResearchTimeData = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    data: [2, 4, 3, 5, 4, 6, 2],
    color: 'rgb(34, 197, 94)'
};

function renderResearchTimeChart() {
    if (researchChartInstance) {
        researchChartInstance.destroy();
    }

    const ctx = researchTimeChartCanvas.getContext('2d');
    researchChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: dummyResearchTimeData.labels,
            datasets: [{
                label: 'Hours',
                data: dummyResearchTimeData.data,
                backgroundColor: dummyResearchTimeData.color,
                borderColor: dummyResearchTimeData.color,
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Research Time This Week',
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
                        text: 'Day of the Week',
                        color: '#555'
                    },
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Hours',
                        color: '#555'
                    },
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

researchTimeStat.addEventListener('click', () => {
    const isHidden = researchTimeGraphContainer.classList.toggle('hidden'); // Toggle visibility of the graph container
    if (!isHidden) {
        // If it's now visible, render the chart
        requestAnimationFrame(() => {
            renderResearchTimeChart();
        });
    } else {
        // If it's now hidden, destroy the chart to free up resources
        if (researchChartInstance) {
            researchChartInstance.destroy();
            researchChartInstance = null;
        }
    }
});
