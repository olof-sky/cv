const experienceCards = document.querySelector(".experience .cards");
const educationCards = document.querySelector(".education .cards");
const projectCards = document.querySelector(".projects");

function createWorkCard(work) {
  const workCard = document.createElement("div");
  const workCardHead = document.createElement("div");
  const workCardContent = document.createElement("div");
  const title = document.createElement("h4");
  const company = document.createElement("h3");
  const description = document.createElement("p");
  const tools = document.createElement("div");
  const toolsTitle = document.createElement("h3");
  const toolsUl = document.createElement("ul");

  workCard.classList.add("experience-card");
  workCardHead.classList.add("head");
  workCardContent.classList.add("content");
  tools.classList.add("tools");

  toolsTitle.textContent = "Verktyg";
  title.textContent = work.title;
  company.textContent = work.company;
  description.textContent = work.description;

  work.tools.map((tool) => {
    let listItem = document.createElement(`li`);
    listItem.textContent = tool;
    toolsUl.appendChild(listItem);
  });

  tools.appendChild(toolsTitle);
  tools.appendChild(toolsUl);
  workCardHead.appendChild(title);
  workCardHead.appendChild(company);
  workCardContent.appendChild(description);
  workCardContent.appendChild(tools);
  workCard.appendChild(workCardHead);
  workCard.appendChild(workCardContent);

  experienceCards.appendChild(workCard);
}

function createEducationCard(education) {
  const educationCard = document.createElement("div");
  const educationCardHead = document.createElement("div");
  const educationCardContent = document.createElement("div");
  const company = document.createElement("h4");
  const degree = document.createElement("h3");
  const description = document.createElement("p");

  educationCard.classList.add("experience-card");
  educationCardHead.classList.add("head");
  educationCardContent.classList.add("content");

  degree.textContent = education.degree;
  company.textContent = education.company;
  description.textContent = education.description;

  educationCardHead.appendChild(company);
  educationCardHead.appendChild(degree);
  educationCardContent.appendChild(description);
  educationCard.appendChild(educationCardHead);
  educationCard.appendChild(educationCardContent);

  educationCards.appendChild(educationCard);
}

function createProjectCard(project) {
  const projectCard = document.createElement("div");
  const projectCardHead = document.createElement("div");
  const projectCardContent = document.createElement("div");
  const title = document.createElement("h3");
  const type = document.createElement("h4");
  const description = document.createElement("p");
  const link = document.createElement("a");

  projectCard.classList.add("big-card");
  projectCardHead.classList.add("head");
  projectCardContent.classList.add("content");

  title.textContent = project.title;
  type.textContent = project.type;
  description.textContent = project.description;

  projectCardHead.appendChild(title);
  projectCardHead.appendChild(type);
  projectCardContent.appendChild(description);
  if (project.link) {
    link.textContent = project.link;
    link.href = project.link;
    projectCardContent.appendChild(link);
  }
  projectCard.appendChild(projectCardHead);
  projectCard.appendChild(projectCardContent);

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
