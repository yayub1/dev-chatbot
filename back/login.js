// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbo4n-e6UmoeOsKaWROpUeTrkC9f7UPOw",
    authDomain: "authenti-cation-chatbot.firebaseapp.com",
    databaseURL: "https://authenti-cation-chatbot-default-rtdb.firebaseio.com",
    projectId: "authenti-cation-chatbot",
    storageBucket: "authenti-cation-chatbot.firebasestorage.app",
    messagingSenderId: "540211304699",
    appId: "1:540211304699:web:d499ec32cf7e3551aa785e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Get references to the signup, login, reset, and social login buttons
const sighUp = document.getElementById('sighUp');
const login = document.getElementById('login');
const reset = document.getElementById('reset');
const googleLogin = document.getElementById('googleLogin');
const facebookLogin = document.getElementById('facebookLogin');
const twitterLogin = document.getElementById('twitterLogin');

// Event listener for the signup button
sighUp.addEventListener('click', (e) => {
    e.preventDefault();
    var email = document.getElementById('email').value; // Get the email input value
    var password = document.getElementById('password').value; // Get the password input value
    var username = document.getElementById('username').value; // Get the username input value

    // Create a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user; // Get the user object
            // Store user information in the database
            set(ref(database, 'user/' + user.uid), {
                username: username,
                email: email,
            });
            // Notify the user of successful signup
            alert('User signed up');
        })
        .catch((error) => {
            const errorMessage = error.message; // Get the error message
            alert(errorMessage); // Alert the user with the error message
        });
});

// Event listener for the login button
login.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission
    var email2 = document.getElementById('email2').value; // Get the email input value for login
    var password2 = document.getElementById('password2').value; // Get the password input value for login

    // Sign in the user with email and password
    signInWithEmailAndPassword(auth, email2, password2)
        .then((userCredential) => {
            // User is signed in
            const user = userCredential.user;
            // Redirect to the main page
            window.location.href = 'chat.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
            const errormess = document.getElementById('errorMessage');
            errormess.textContent = errorMessage; // Display the specific error message
        });
});

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});

// Event listener for the password reset button
reset.addEventListener('click', function(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value; // Use the correct ID here
    // Send password reset email
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Email sent
            alert('Password reset email sent! Please check your inbox.');
        })
        .catch((error) => {
            const errorMessage = error.message; // Get the error message
            alert(errorMessage); // Alert the user with the error message
        });
});

// Event listener for Google login
googleLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // Store user information in the database if needed
            set(ref(database, 'user/' + user.uid), {
                username: user.displayName,
                email: user.email,
            });
            // Redirect to the main page
            window.location.href = 'chat.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

// Event listener for Facebook login
// Event listener for Facebook login
facebookLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            // Store user information in the database if needed
            set(ref(database, 'user/' + user.uid), {
                username: user.displayName,
                email: user.email,
            });
            // Redirect to the main page
            window.location.href = 'chat.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});

// Event listener for Twitter login
twitterLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            // Store user information in the database if needed
            set(ref(database, 'user/' + user.uid), {
                username: user.displayName,
                email: user.email,
            });
            // Redirect to the main page
            window.location.href = 'chat.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        });
});
