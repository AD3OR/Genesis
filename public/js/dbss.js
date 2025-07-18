function loadUsersByLetter(letter) {
  fetch(`/api/users/${letter}`)
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#userTable tbody');
      tableBody.innerHTML = '';

      if (data.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3">No results found</td></tr>';
        return;
      }

      data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.fatality}</td>`;
        tableBody.appendChild(row);
      });
    })
    .catch(err => {
      console.error('Error loading user data:', err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const pageTitle = document.querySelector('h2')?.textContent || '';
  const match = pageTitle.match(/Section:\s([A-Z])/i);
  const letter = match ? match[1].toUpperCase() : 'A';
  loadUsersByLetter(letter);
});