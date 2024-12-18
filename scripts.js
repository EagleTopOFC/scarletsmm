const API_KEY = 'your_api_key_here';
let username = '';

// Función para registrar un nuevo usuario
function registerUser() {
    const usernameInput = document.getElementById('register_username').value;
    const passwordInput = document.getElementById('register_password').value;

    fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        showLoginForm();
    })
    .catch(error => console.error('Error al registrar usuario:', error));
}

// Función para iniciar sesión
function loginUser() {
    const usernameInput = document.getElementById('login_username').value;
    const passwordInput = document.getElementById('login_password').value;

    fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message);
            username = usernameInput;
            showUserPanel();
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error al iniciar sesión:', error));
}

// Función para mostrar el panel del usuario
function showUserPanel() {
    document.getElementById('login_form').style.display = 'none';
    document.getElementById('register_form').style.display = 'none';
    document.getElementById('user_panel').style.display = 'block';
    loadBalance();
}

// Cargar el saldo del usuario
function loadBalance() {
    fetch(`http://127.0.0.1:5000/balance?user_id=${username}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('usd_balance').textContent = data.usd_balance;
        });
}

// Función para agregar saldo
function addBalance() {
    const amount = document.getElementById('add_amount').value;
    
    fetch('http://127.0.0.1:5000/add_balance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: API_KEY, username: username, amount: parseFloat(amount) })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        loadBalance();
    })
    .catch(error => console.error('Error al agregar saldo:', error));
}

// Función para realizar un pedido
function placeOrder() {
    const link = document.getElementById('order_link').value;
    const quantity = document.getElementById('order_quantity').value;

    fetch('http://127.0.0.1:5000/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            api_key: API_KEY,
            user_id: username,
            service: 'followers', // Esto lo puedes cambiar según el servicio que seleccionen
            link: link,
            quantity: quantity
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    })
    .catch(error => console.error('Error al realizar el pedido:', error));
}

function showLoginForm() {
    document.getElementById('register_form').style.display = 'none';
    document.getElementById('login_form').style.display = 'block';
}

function showRegisterForm() {
    document.getElementById('login_form').style.display = 'none';
    document.getElementById('register_form').style.display = 'block';
}

function showAddBalanceForm() {
    document.getElementById('add_balance_form').style.display = 'block';
}

function showOrderForm() {
    document.getElementById('order_form').style.display = 'block';
}
