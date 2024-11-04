const apiUrl_rel= localStorage.getItem('apiUrl'); // server API URL
    
    // Load stock exchanges into the dropdown
    async function loadStockExchanges() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl_rel}/stockExchanges`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).catch((error) => {
            // Do something with the error
            window.location.href = '/error'; // Redirect to error page
          });
        const stockExchanges = await response.json();
        const stockExchangeSelect = document.getElementById('stockExchangeSelect');

        stockExchangeSelect.innerHTML = ''; // Clear existing options

        const option = document.createElement('option');
            option.value = 0;
            option.textContent = 'please select a stock exchange';
            stockExchangeSelect.appendChild(option);
        stockExchanges.forEach(exchange => {
            const option = document.createElement('option');
            option.value = exchange.id;
            option.textContent = exchange.name;
            stockExchangeSelect.appendChild(option);
        });

        loadStocks(); // Load stocks for the first exchange
    }

    // Load stocks for the selected stock exchange
    async function loadStocks() {
        const stockExchangeId = document.getElementById('stockExchangeSelect').value;
        if(stockExchangeId != null && stockExchangeId != 0) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl_rel}/stockExchanges/${stockExchangeId}/stocks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).catch((error) => {
            // Do something with the error
            window.location.href = '/error'; // Redirect to error page
          });
        const stocks = await response.json();
        const stockTableBody = document.getElementById('stockTable').querySelector('tbody');

        stockTableBody.innerHTML = ''; // Clear existing stock rows
        stocks.forEach(stock => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${stock.name}</td>
                <td>${stock.description}</td>
                <td>$${stock.currentPrice.toFixed(2)}</td>
                <td><button onclick="removeStockFromExchange(${stockExchangeId}, ${stock.id})">Remove</button></td>
            `;
            stockTableBody.appendChild(row);
        });

        loadAvailableStocks(stockExchangeId); // Load available stocks for adding to the exchange
    }else{
        const stockTableBody = document.getElementById('stockTable').querySelector('tbody');

        stockTableBody.innerHTML = ''; // Clear existing stock rows
        const addStockSelect = document.getElementById('addStockSelect');

        addStockSelect.innerHTML = ''; // Clear existing options
        document.getElementById('addStockToExchangebtn').style.display= "none";
    }
    }

    // Load all stocks for adding to an exchange
    async function loadAvailableStocks(stockExchangeId) {

        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl_rel}/stockExchanges/${stockExchangeId}/availablestocks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).catch((error) => {
            // Do something with the error
            window.location.href = '/error'; // Redirect to error page
          });
        const stocks = await response.json();
        const addStockSelect = document.getElementById('addStockSelect');

        addStockSelect.innerHTML = ''; // Clear existing options
        stocks.forEach(stock => {
            const option = document.createElement('option');
            option.value = stock.id;
            option.textContent = stock.name;
            addStockSelect.appendChild(option);
        });

        if(stocks.length > 0) {
            document.getElementById('addStockToExchangebtn').style.display= "initial";
        }else{
            document.getElementById('addStockToExchangebtn').style.display= "none";
        }
    }

    // Add a stock to the selected stock exchange
    async function addStockToExchange() {
        const stockExchangeId = document.getElementById('stockExchangeSelect').value;
        const stockId = document.getElementById('addStockSelect').value;

        if(stockExchangeId!= null && stockExchangeId!= 0 && stockId!= null && stockId!= 0) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl_rel}/stockExchanges/${stockExchangeId}/stocks/${stockId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).catch((error) => {
            // Do something with the error
            window.location.href = '/error'; // Redirect to error page
          });


        if (response.ok) {
            alert('Stock added successfully!');
            loadStocks(); // Reload the stock list
        } else {
            alert('Failed to add stock.');
        }
    }
    }

    // Remove a stock from the selected stock exchange
    async function removeStockFromExchange(stockExchangeId, stockId) {
        if(stockExchangeId!= null && stockExchangeId!= 0 && stockId!= null && stockId!= 0) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl_rel}/stockExchanges/${stockExchangeId}/stocks/${stockId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).catch((error) => {
            // Do something with the error
            window.location.href = '/error'; // Redirect to error page
          });

        if (response.ok) {
            alert('Stock removed successfully!');
            loadStocks(); // Reload the stock list
        } else {
            alert('Failed to remove stock.');
        }
    }
    }

    // Initial load
    loadStockExchanges();
    if(localStorage.getItem('apiUrl') == null || localStorage.getItem('token') == null) {
        window.location.href = '/'; // Redirect to error page
    }