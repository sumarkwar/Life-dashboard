function login() {
    fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            identifier: document.getElementById("identifier").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.json())   // 👈 IMPORTANT CHANGE
    .then(data => {

        if (data.message === "Login success") {

            // Save token (optional for now)
            localStorage.setItem("token", data.token);

            window.location.href = "dashboard.html";

        } else {
            alert(data);
        }
    });
}

function register() {
    fetch("/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        })
    })
    .then(res => res.text())
    .then(data => {
        if (data === "Registered successfully") {
            document.getElementById("formCard").style.display = "none";
            document.getElementById("successCard").style.display = "block";
        } else {
            alert(data);
        }
    });
}

function goToLogin() {
    window.location.href = "index.html";
}

function exitApp() {
    localStorage.removeItem("token"); // clear session
    window.location.href = "index.html"; // go back to login
}