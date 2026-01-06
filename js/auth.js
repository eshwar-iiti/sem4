// Updated js/auth.js
function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // Using redirect instead of popup for better compatibility
    auth.signInWithRedirect(provider);
}

// Add this to handle the result after the redirect back
auth.getRedirectResult().then((result) => {
    if (result.user) {
        console.log("Logged in after redirect:", result.user);
    }
}).catch((error) => {
    console.error("Redirect login error:", error);
});

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
