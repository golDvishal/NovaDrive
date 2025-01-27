import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: "https://sampleapp-5c908-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const booksRef = ref(database, "books");

const booksEl = document.getElementById("books");

// Fetch and display books
onValue(booksRef, (snapshot) => {
    const booksData = snapshot.val();
    clearBooksListEl();

    if (booksData) {
        Object.entries(booksData).forEach(([key, value]) => {
            appendBookToBooksListEl(value);
        });
    } else {
        booksEl.innerHTML = "<li>No books available</li>";
    }
});

function clearBooksListEl() {
    booksEl.innerHTML = "";
}

function appendBookToBooksListEl(bookValue) {
    const listItem = document.createElement("li");
    listItem.textContent = bookValue;
    booksEl.appendChild(listItem);
}