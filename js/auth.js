// js/auth.js

function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // Force Google to show the account picker every time
    provider.setCustomParameters({
        prompt: 'select_account'
    });
    auth.signInWithRedirect(provider);
}


function logout() {
    auth.signOut().then(() => {
        console.log("Logged out");
        // Optional: Force a reload to clear any local state
        window.location.reload();
    }).catch((error) => {
        console.error("Logout error:", error);
    });
}

// This handles the result when the user is redirected back from Google
auth.getRedirectResult()
    .then((result) => {
        if (result.user) {
            console.log("Successfully logged in via redirect:", result.user.email);
        }
    })
    .catch((error) => {
        console.error("Redirect error:", error.code, error.message);
        if (error.code === 'auth/unauthorized-domain') {
            alert("Domain not authorized. Please check Firebase Console -> Auth -> Settings -> Authorized Domains.");
        } else {
            alert("Login failed: " + error.message);
        }
    });

// Listen for auth state changes
auth.onAuthStateChanged((user) => {
    const loginSection = document.getElementById('login-section');
    const appSection = document.getElementById('app-section');
    const userEmail = document.getElementById('user-email');

    if (user) {
        loginSection.classList.remove('visible');
        appSection.classList.add('visible');
        userEmail.textContent = user.email;
        // Load data from Firestore
        if (typeof loadDataFromFirebase === 'function') {
            loadDataFromFirebase(user.uid);
        }
    } else {
        loginSection.classList.add('visible');
        appSection.classList.remove('visible');
    }
});
