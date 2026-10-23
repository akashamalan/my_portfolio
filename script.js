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

  var allowed = ["gmail.com", "icloud.com", "outlook.com"];
  var parts = email.trim().toLowerCase().split("@");

  if (parts.length !== 2 || parts[0] === "" || allowed.indexOf(parts[1]) === -1) {
    formMsg.textContent = "Use a Gmail, iCloud or Outlook email.";
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

var nameText = document.getElementById("nameText");
var role = document.querySelector(".role");

function typeText(element, speed, whenDone) {
  var fullText = element.textContent;
  var letter = 0;

  element.style.minHeight = element.offsetHeight + "px";
  element.textContent = "";
  element.classList.add("typing");

  var timer = setInterval(function () {
    letter = letter + 1;
    element.textContent = fullText.slice(0, letter);

    if (letter === fullText.length) {
      clearInterval(timer);
      element.classList.remove("typing");
      whenDone();
    }
  }, speed);
}

var roleFull = role.textContent;
role.textContent = "";
role.style.minHeight = "30px";

setTimeout(function () {
  typeText(nameText, 100, function () {
    role.textContent = roleFull;
    typeText(role, 50, function () {});
  });
}, 600);

var bar = document.createElement("div");
bar.id = "progressBar";
document.body.appendChild(bar);

window.addEventListener("scroll", function () {
  var scrolled = window.scrollY;
  var total = document.documentElement.scrollHeight - window.innerHeight;

  bar.style.width = (scrolled / total) * 100 + "%";
});

var photoBox = document.getElementById("photoBox");

photoBox.addEventListener("click", function () {
  photoBox.classList.toggle("flipped");
});

var emailBox = document.getElementById("email");
var chips = document.querySelectorAll(".mail-chip");

for (var c = 0; c < chips.length; c++) {
  chips[c].addEventListener("click", function () {
    var firstPart = emailBox.value.split("@")[0];
    emailBox.value = firstPart + "@" + this.getAttribute("data-domain");
    emailBox.focus();
  });
}

var themeBtn = document.getElementById("themeBtn");

function setTheme(name) {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(name);

  if (name === "dark") {
    themeBtn.innerHTML = "&#9728;";
  } else {
    themeBtn.innerHTML = "&#9790;";
  }
}

var savedTheme = localStorage.getItem("theme");

if (savedTheme === null) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    savedTheme = "dark";
  } else {
    savedTheme = "light";
  }
}

setTheme(savedTheme);

themeBtn.addEventListener("click", function () {
  var next = "dark";
  if (document.body.classList.contains("dark")) {
    next = "light";
  }
  setTheme(next);
  localStorage.setItem("theme", next);
});
