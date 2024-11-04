const apiUrl_login = localStorage.getItem('apiUrl'); // server API URL

document.addEventListener('DOMContentLoaded', () => {
    
    localStorage.setItem('apiUrl', 'http://localhost:8081/API/v1/AFS'); 

    const loginForm = document.getElementById('loginForm');

    // Handle login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch(`${apiUrl_login}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            }).catch((error) => {
                // Do something with the error
                window.location.href = '/error'; // Redirect to error page
              });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard'; // Redirect to dashboard
            } else {
                document.getElementById('loginMessage').innerText = data.message;
            }
        });
    }




   
});

localStorage.clear();