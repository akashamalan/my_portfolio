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

var role = document.querySelector(".role");
var fullText = role.textContent;
var letter = 0;

role.style.minHeight = role.offsetHeight + "px";
role.textContent = "";
role.classList.add("typing");

var timer = setInterval(function () {
  letter = letter + 1;
  role.textContent = fullText.slice(0, letter);

  if (letter === fullText.length) {
    clearInterval(timer);
    setTimeout(function () {
      role.classList.remove("typing");
    }, 1500);
  }
}, 70);

var bar = document.createElement("div");
bar.id = "progressBar";
document.body.appendChild(bar);

window.addEventListener("scroll", function () {
  var scrolled = window.scrollY;
  var total = document.documentElement.scrollHeight - window.innerHeight;

  bar.style.width = (scrolled / total) * 100 + "%";
});