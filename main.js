const experienceCards = document.querySelector(".experience .cards");
const educationCards = document.querySelector(".education .cards");
const projectCards = document.querySelector(".projects");
const hamburgerMenu = document.querySelector(".hamburger-menu");
let hamburgerActive = false;
const dropDownMenu = document.querySelector(".drop-down-menu");
const navLinks = document.querySelectorAll(".nav-link.mobile");
const borderColors = ["#205F71", "#3B5438"];
const bigCardBorderColors = ["#5CD9C2", "#DAC168", "#5CDC5A", "#E75757"];

//Helpers
const throttle = (fn, delay) => {
  let time = Date.now();
  return () => {
    if (time + delay - Date.now() <= 0) {
      fn();
      time = Date.now();
    }
  };
};

function getBorderColor(type) {
  if (type == "big")
    return bigCardBorderColors[
      Math.floor(Math.random() * bigCardBorderColors.length)
    ];
  if (type == "small")
    return borderColors[Math.floor(Math.random() * borderColors.length)];
}

function toggleHamburgerOnScroll(e) {
  console.log(this.oldScroll);
  if (this.oldScroll < this.scrollY) hamburgerMenu.style.display = "none";
  else hamburgerMenu.style.display = "block";
  this.oldScroll = this.scrollY;
}

function toggleHamburger() {
  if (hamburgerActive) {
    hamburgerMenu.classList.remove("active");
    dropDownMenu.classList.remove("active");
    hamburgerActive = !hamburgerActive;
  } else {
    hamburgerMenu.classList.add("active");
    dropDownMenu.classList.add("active");
    hamburgerActive = !hamburgerActive;
  }
}

//Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.classList.value === "card") {
        entry.target.classList.add("active-card");
      }
      if (entry.target.classList.value === "home") {
        document.querySelector(".back-btn").classList.remove("show-arrow");
      }
    } else {
      document.querySelector(".back-btn").classList.add("show-arrow");
      if (entry.target.classList.value === "card active-card")
        entry.target.classList.remove("active-card");
    }
  });
});

function observeCard() {
  cards = [...document.querySelectorAll(".card")];
  cards.map((card) => observer.observe(card));
}

observer.observe(document.querySelector(".home"));

//Create card functions
function createWorkCard(work) {
  const workCard = document.createElement("div");
  const toolsUl = document.createElement("ul");

  work.tools.map((tool) => {
    let listItem = document.createElement(`li`);
    listItem.textContent = tool;
    toolsUl.appendChild(listItem);
  });

  workCard.innerHTML = `
  <div class="experience-card">
    <div class="head">
    <h4>${work.title}</h4>
    <h3>${work.company}</h3>
    </div>
    <div class="content">
      <p>${work.description}</p>
      <div class="tools">
      <h3>Verktyg</h3>
      </div>
    </div>
    </div>`;

  workCard.querySelector(".tools").appendChild(toolsUl);
  workCard.querySelector(".experience-card").style.borderColor =
    getBorderColor("small");
  workCard.classList.add("card");
  experienceCards.appendChild(workCard);
}

function createEducationCard(education) {
  const educationCard = document.createElement("div");

  educationCard.innerHTML = `
  <div class="experience-card">
  <div class="head">
  <h4>${education.company}</h4>
  <h3>${education.degree}</h3>
  </div>
  <div class="content">
  <p>${education.description}</p>
  </div>
  </div>`;

  educationCard.querySelector(".experience-card").style.borderColor =
    getBorderColor("small");
  educationCard.classList.add("card");
  educationCards.appendChild(educationCard);
}

function createProjectCard(project) {
  const projectCard = document.createElement("div");
  const link = document.createElement("a");

  projectCard.innerHTML = `
  <div class="big-card">
  <div class="head">
  <h3>${project.title}</h3>
  <h4>${project.type}</h4>
  </div>
  <div class="content">
  <p>${project.description}</p>
  </div>
  </div>`;

  if (project.link) {
    link.textContent = project.link;
    link.href = project.link;
    projectCard.querySelector(".content").appendChild(link);
  }

  projectCard.querySelector(".head").style.borderColor = getBorderColor("big");
  projectCard.classList.add("card");
  projectCards.appendChild(projectCard);
}

// Fetch data, create and manipulate cards
fetch("./data/experience.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.work.map((work) => {
      createWorkCard(work);
    });
    data.education.map((education) => {
      createEducationCard(education);
    });
    data.projects.map((projects) => {
      createProjectCard(projects);
    });
    observeCard();
  });

//Event listeners
hamburgerMenu.addEventListener("click", toggleHamburger);
navLinks.forEach((link) => link.addEventListener("click", toggleHamburger));
window.addEventListener("scroll", throttle(toggleHamburgerOnScroll, 100));
