Promise.all([
  fetch('data.json').then(res => res.json()),
  fetch('master.json').then(res => res.json())
])
.then(([transactionData, masterData]) => {
  const tableBody = document.querySelector('#sales-invoice-table tbody');

  transactionData.forEach(tx => {
    const match = masterData.find(md => 
      md["Account no"] === tx["Account No"] && 
      md["item no"] === tx["item no"]
    );

    if (match) {
      const gstPercent = match["gst percentage"] || 0;
      const gstAmount = (tx.amount * gstPercent) / 100;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${tx["Doc type"]}</td>
        <td>${tx["Doc no"]}</td>
        <td>${tx["Account No"]}</td>
        <td>${match["account name"]}</td>
        <td>${tx["item no"]}</td>
        <td>${match["item name"]}</td>
        <td>${tx["qty"]}</td>
        <td>${tx["rate"]}</td>
        <td>${tx["amount"]}</td>
        <td>${gstPercent}%</td>
        <td>${gstAmount.toFixed(2)}</td>
      `;
      tableBody.appendChild(row);
    }
  });
})
.catch(err => console.error("Error loading or processing data:", err));

