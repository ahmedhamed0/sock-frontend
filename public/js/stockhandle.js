const apiUrl_stock = localStorage.getItem('apiUrl'); // server API URL


// Load stocks from API
async function loadStocks() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl_stock}/stocks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const stocks = await response.json();
    const stockList = document.getElementById('stockList');
    if(stockList != null) {
    stockList.innerHTML = '';

    stocks.forEach(stock => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${stock.name}</strong> - ${stock.description} (Price: $${stock.currentPrice.toFixed(2)} ) </strong>
            <br/>
            <button onclick="editStock(${stock.id})">Edit</button><button onclick="deleteStock(${stock.id})">Delete</button>
            <button onclick="updateStockPrice(${stock.id},${stock.currentPrice.toFixed(2)})">Update Price</button>
        `;
        stockList.appendChild(li);
    });
}
}

// Update stock price
async function editStock(id) {
    document.getElementById('updateStockForm').style.display= "initial"; 
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl_stock}/stocks/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).catch((error) => {
        // Do something with the error
        window.location.href = '/error'; // Redirect to error page
      });

    const stock = await response.json();

    // Populate the form with stock data
    document.getElementById('updatestockId').value = stock.id;
    document.getElementById('updatestockName').value = stock.name;
    document.getElementById('updatestockDescription').value = stock.description;
    document.getElementById('updatecurrentPrice').value = stock.currentPrice;
}


document.addEventListener('DOMContentLoaded', () => {


    const StockForm = document.getElementById('createStockForm');
    if(StockForm){
// Event listener for insert form submission
StockForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const stockData = {
        name: document.getElementById('stockName').value,
        description: document.getElementById('stockDescription').value,
        currentPrice: parseFloat(document.getElementById('currentPrice').value),
        lastUpdate: new Date().toISOString()
    };

    const response = await fetch(`${apiUrl_stock}/stocks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(stockData)
    }).catch((error) => {
        // Do something with the error
        window.location.href = '/error'; // Redirect to error page
      });

    if (response.ok) {
        alert('Stock Created successfully!');
         // Populate the form with stock data

    document.getElementById('stockName').value = null;
    document.getElementById('stockDescription').value = null;
    document.getElementById('currentPrice').value = null;
        loadStocks(); // Reload the stock list
    } else {
        alert('Error Create stock.');
    }
});

    }
    const updateStockForm = document.getElementById('updateStockForm');
    if(updateStockForm){
// Event listener for update form submission
updateStockForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const stockId = document.getElementById('updatestockId').value;
    const stockData = {
        id: stockId,
        name: document.getElementById('updatestockName').value,
        description: document.getElementById('updatestockDescription').value,
        currentPrice: parseFloat(document.getElementById('updatecurrentPrice').value)
    };

    const response = await fetch(`${apiUrl_stock}/stocks/${stockId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(stockData)
    }).catch((error) => {
        // Do something with the error
        window.location.href = '/error'; // Redirect to error page
      });

    if (response.ok) {
        alert('Stock updated successfully!');
         // Populate the form with stock data
    document.getElementById('updatestockId').value = null;
    document.getElementById('updatestockName').value = null;
    document.getElementById('updatestockDescription').value = null;
    document.getElementById('updatecurrentPrice').value = null;
    document.getElementById('updateStockForm').style.display=  "none"; 
        loadStocks(); // Reload the stock list
    } else {
        alert('Error updating stock.');
    }
});
    }
 
 // Load stocks
    loadStocks();

    
});
   
 
// Delete stock
async function deleteStock(id) {
    if(confirm('Enter Confirm to Delete:'))
{

    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl_stock}/stocks/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).catch((error) => {
        // Do something with the error
        window.location.href = '/error'; // Redirect to error page
      });

    if (!response.ok) {   
        alert("Failed to delete stock.");
    }

}
loadStocks(); // Refresh stock list
}

// Update stock price
async function updateStockPrice(id,price) {
    const newPrice = prompt('Enter new stock price:',price);

    if (newPrice === null) return; // User cancelled

    const stockData = {
        id : id,
        name: null,
        description: null,
        currentPrice: newPrice,
        lastUpdate: new Date().toISOString()
    };
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${apiUrl_stock}/stocks/${id}/price`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(stockData)
        }).catch((error) => {
            // Do something with the error
            window.location.href = '/error'; // Redirect to error page
          });

        if (!response.ok) throw new Error('Failed to update stock price.');
        
    } catch (error) {
        alert(`Error: ${error.message}`);
    }

    loadStocks(); // Refresh stock list
}


if(localStorage.getItem('apiUrl') == null || localStorage.getItem('token') == null) {
    window.location.href = '/'; // Redirect to error page
}