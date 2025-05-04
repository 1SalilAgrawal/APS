fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.querySelector('#data-table tbody');
    data.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.id}</td>
        <td>${row.name}</td>
        <td>${row.email}</td>
      `;
      tableBody.appendChild(tr);
    });
  })
  .catch(error => console.error('Error loading data:', error));
