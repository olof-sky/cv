const experienceCards = document.querySelector(".experience .cards");
const educationCards = document.querySelector(".education .cards");
const projectCards = document.querySelector(".projects");

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

  projectCard.classList.add("card");
  projectCards.appendChild(projectCard);
}

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
  });
