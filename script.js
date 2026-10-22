var menuBtn = document.getElementById("menuBtn");
var menu = document.getElementById("menu");

menuBtn.addEventListener("click", function () {
  menu.classList.toggle("show");
});

var links = document.querySelectorAll(".nav-links a");
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function () {
    menu.classList.remove("show");
  });
}

var form = document.getElementById("contactForm");
var formMsg = document.getElementById("formMsg");

form.addEventListener("submit", function (event) {

  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  if (name === "" || email === "" || message === "") {
    formMsg.textContent = "Please fill all the fields.";
    formMsg.style.color = "#d93025";
    return;
  }

  if (email.indexOf("@") === -1) {
    formMsg.textContent = "Please enter a valid email.";
    formMsg.style.color = "#d93025";
    return;
  }

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
  form.reset();
});

var sections = document.querySelectorAll("section");

for (var s = 0; s < sections.length; s++) {
  sections[s].classList.add("fade");
}

var watcher = new IntersectionObserver(function (entries) {

  for (var e = 0; e < entries.length; e++) {

    if (entries[e].isIntersecting === true) {
      entries[e].target.classList.add("visible");
    }
  }

}, { threshold: 0.15 });

for (var w = 0; w < sections.length; w++) {
  watcher.observe(sections[w]);
}
