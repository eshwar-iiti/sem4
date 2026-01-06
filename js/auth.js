// Simple Google Auth
function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log("Logged in:", result.user);
        }).catch((error) => {
            console.error("Login error:", error);
            alert("Login failed: " + error.message);
        });
}

function logout() {
    auth.signOut().then(() => {
        console.log("Logged out");
    }).catch((error) => {
        console.error("Logout error:", error);
    });
}

// Listen for auth state changes
auth.onAuthStateChanged((user) => {
    const loginSection = document.getElementById('login-section');
    const appSection = document.getElementById('app-section');
    const userEmail = document.getElementById('user-email');

    if (user) {
        loginSection.classList.remove('visible');
        appSection.classList.add('visible');
        userEmail.textContent = user.email;
        loadDataFromFirebase(user.uid);
    } else {
        loginSection.classList.add('visible');
        appSection.classList.remove('visible');
    }
});
