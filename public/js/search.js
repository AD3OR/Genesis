document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Function to handle the search
    const handleSearch = () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Encode the search term to handle special characters
            const encodedSearchTerm = encodeURIComponent(searchTerm);
            // Redirect to the new URL format
            window.location.href = `http://localhost:3000/${encodedSearchTerm}`;
        }
    };

    // Trigger search on button click
    if (searchButton) {
        searchButton.addEventListener('click', handleSearch);
    }

    // Trigger search on Enter key press
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission if it were a form
                handleSearch();
            }
        });
    }
});
