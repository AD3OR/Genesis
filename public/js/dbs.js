fetch('/api/users')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = ''; // clear existing rows if any
    data.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.fatality}</td>`;
      tableBody.appendChild(row);
    });
  })
  .catch(err => {
    console.error('Error loading user data:', err);
  });
