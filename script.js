/* ============================================
   Portfolio JavaScript - Akash Amalan
   Three features:
   1. Open and close the menu on small screens
   2. Check the contact form before sending
   3. Fade the sections in while scrolling
   (The form also saves each message in localStorage)
   ============================================ */


/* ---------- 1. MENU BUTTON ---------- */

// get the button and the menu list from the HTML
var menuBtn = document.getElementById("menuBtn");
var menu = document.getElementById("menu");

// on click, add or remove the class "show"
menuBtn.addEventListener("click", function () {
  menu.classList.toggle("show");
});

// close the menu again after a link inside it is clicked
var links = document.querySelectorAll(".nav-links a");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    menu.classList.remove("show");
  });
}


/* ---------- 2. CONTACT FORM CHECK ---------- */

var form = document.getElementById("contactForm");
var formMsg = document.getElementById("formMsg");

form.addEventListener("submit", function (event) {

  event.preventDefault(); // stop the page from reloading

  // read what the user typed
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // if any box is empty, show a warning
  if (name === "" || email === "" || message === "") {
    formMsg.textContent = "Please fill all the fields.";
    formMsg.style.color = "#d93025";
    return;
  }

  // the email must contain @
  if (email.indexOf("@") === -1) {
    formMsg.textContent = "Please enter a valid email.";
    formMsg.style.color = "#d93025";
    return;
  }

  // everything is fine -> SAVE it in the browser (localStorage)
  // localStorage keeps text only, so we turn the list into text with JSON.stringify
  var saved = JSON.parse(localStorage.getItem("messages")) || [];
  saved.push({
    name: name,
    email: email,
    message: message,
    time: new Date().toLocaleString()
  });
  localStorage.setItem("messages", JSON.stringify(saved));

  formMsg.textContent = "Thank you, your message has been received.";
  formMsg.style.color = "#1a7f4b";
  form.reset(); // clear the boxes
});


/* ---------- 3. FADE THE SECTIONS IN ---------- */

// pick every section on the page
var sections = document.querySelectorAll("section");

// give each one the class "fade" (starts invisible, see CSS)
for (var s = 0; s < sections.length; s++) {
  sections[s].classList.add("fade");
}

// a watcher that tells us when a section comes into view
var watcher = new IntersectionObserver(function (entries) {

  for (var e = 0; e < entries.length; e++) {
    // isIntersecting is true when the section is on the screen
    if (entries[e].isIntersecting === true) {
      entries[e].target.classList.add("visible");
    }
  }

}, { threshold: 0.15 }); // start when 15% of it is visible

// tell the watcher to look at every section
for (var w = 0; w < sections.length; w++) {
  watcher.observe(sections[w]);
}