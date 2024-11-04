const apiUrl_exchange = localStorage.getItem('apiUrl'); // server API URL


// Load stock exchanges from API
async function loadStockExchanges() {
    const token = localStorage.getItem('token');
    if(apiUrl_exchange == null) {
        window.location.href = '/'; // Redirect to error page
    }
    const response = await fetch(`${apiUrl_exchange}/stockExchanges`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).catch((error) => {
        // Do something with the error
        window.location.href = '/error'; // Redirect to error page
      });
    const exchanges = await response.json();
    const exchangeList = document.getElementById('exchangeList');
    if(exchangeList != null) {
    exchangeList.innerHTML = '';

    exchanges.forEach(exchange => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${exchange.name} - ${exchange.description} </strong>`;
        exchange.stocks.forEach(stock => {
            li.innerHTML += `<input type="checkbox" disabled id=""${stock.id}"" value="${stock.id}" >${stock.name}</input`;
        });

        li.innerHTML += `<br/>
        <button onclick="editStockExchange(${exchange.id})">Edit</button><button onclick="deleteStockExchange(${exchange.id})">Delete</button>
    `;
      
        exchangeList.appendChild(li);
    });
}
}

document.addEventListener('DOMContentLoaded', () => {
    

    const createStockExchangeForm = document.getElementById('createStockExchangeForm');


    // Handle stock exchange creation
    if (createStockExchangeForm) {
        createStockExchangeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const exchangeData = {
                name: document.getElementById('exchangeName').value,
                description: document.getElementById('exchangeDescription').value
            };

            const response = await fetch(`${apiUrl_exchange}/stockExchanges`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(exchangeData)
            }).catch((error) => {
                // Do something with the error
                window.location.href = '/error'; // Redirect to error page
              });

            if (response.ok) {
                alert('Stock Exchange Created successfully!');
                 // Populate the form with stock data
        
            document.getElementById('exchangeName').value = null;
            document.getElementById('exchangeDescription').value = null;
            loadStockExchanges(); // Refresh exchange list
            } else {
                alert('Error Creation exchange stock.');
            }
        });
    }



    const updateStockExchangeForm = document.getElementById('updateStockExchangeForm');


    // Handle stock exchange creation
    if (updateStockExchangeForm) {
        updateStockExchangeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const exchangeData = {
                id: document.getElementById('updateexchangeId').value,
                name: document.getElementById('updateexchangeName').value,
                description: document.getElementById('updateexchangeDescription').value
            };

            const response = await fetch(`${apiUrl_exchange}/stockExchanges/${exchangeData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(exchangeData)
            }).catch((error) => {
                // Do something with the error
                window.location.href = '/error'; // Redirect to error page
              });

            if (response.ok) {
                alert('Stock Exchange updated successfully!');
                 // Populate the form with stock data
            document.getElementById('updateexchangeId').value = null;
            document.getElementById('updateexchangeName').value = null;
            document.getElementById('updateexchangeDescription').value = null;
            document.getElementById('updateStockExchangeForm').style.display=  "none"; 
            loadStockExchanges(); // Refresh exchange list
            } else {
                alert('Error updating stock.');
            }
        });
    }

    loadStockExchanges(); // Refresh exchange list
});




// Update stock exchange
async function editStockExchange(id) {
    document.getElementById('updateStockExchangeForm').style.display= "initial"; 
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl_exchange}/stockExchanges/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).catch((error) => {
        // Do something with the error
        window.location.href = '/error'; // Redirect to error page
      });

    const sockExchange = await response.json();

    // Populate the form with stock data
    document.getElementById('updateexchangeId').value = sockExchange.id;
    document.getElementById('updateexchangeName').value = sockExchange.name;
    document.getElementById('updateexchangeDescription').value = sockExchange.description;
}


// Delete stock exchange
async function deleteStockExchange(id) {
    if(confirm('Enter Confirm to Delete:'))
        {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl_exchange}/stockExchanges/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).catch((error) => {
        // Do something with the error
        window.location.href = '/error'; // Redirect to error page
      });

    if (response.ok) {
        alert("Stock Exchange Deleted successfully!");
        loadStockExchanges(); // Refresh exchange list
    } else {
        alert("Failed to delete stock exchange.");
    }
}
}

if(localStorage.getItem('apiUrl') == null || localStorage.getItem('token') == null) {
    window.location.href = '/'; // Redirect to error page
}
