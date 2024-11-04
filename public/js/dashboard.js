if(localStorage.getItem('apiUrl') == null || localStorage.getItem('token') == null) {
    window.location.href = '/'; // Redirect to error page
}