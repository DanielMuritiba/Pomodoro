const btnAddTask = document.querySelector(".app__button--add-task");
const btnCancelTask = document.querySelector(
  ".app__form-footer__button--cancel",
);

const formAddTask = document.querySelector(".app__form-add-task");
const textArea = document.querySelector(".app__form-textarea");

const taskList = JSON.parse(localStorage.getItem("taskList")) ?? [];
const taskUl = document.querySelector(".app__section-task-list");
const taskOnGoingDescription = document.querySelector(
  ".app__section-active-task-description",
);
let selectedTask = null;
const selectedTaskClass = "app__section-task-list-item-active";

btnAddTask.addEventListener("click", () => {
  formAddTask.classList.toggle("hidden");
});

btnCancelTask.addEventListener("click", () => {
  textArea.value = "";
  formAddTask.classList.add("hidden");
});

function updateTask() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

formAddTask.addEventListener("submit", (e) => {
  e.preventDefault();

  const task = { descricao: textArea.value };
  taskList.push(task);
  refreshList(task);

  updateTask();

  textArea.value = "";

  formAddTask.classList.add("hidden");
});

function createElementTask(task) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `
    <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
      <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
  `;

  const p = document.createElement("p");
  p.textContent = task.descricao;
  p.classList.add("app__section-task-list-item-description");

  const button = document.createElement("button");
  const imageButton = document.createElement("img");

  button.onclick = () => {
    const newText = prompt("Qual é o novo nome da tarefa?");

    if (newText.length > 0) {
      p.textContent = newText;
      task.descricao = newText;

      updateTask();
    }
  };

  imageButton.setAttribute("src", "/imagens/edit.png");

  button.append(imageButton);
  button.classList.add("app_button-edit");
  li.append(svg, p, button);

  li.onclick = () => {
    taskOnGoingDescription.textContent = task.descricao;

    if (selectedTask != li) {
      document.querySelectorAll("." + selectedTaskClass).forEach((e) => {
        console.log(e);
        e.classList.remove(selectedTaskClass);
      });

      li.classList.add(selectedTaskClass);
      selectedTask = li;
    } else {
      li.classList.remove(selectedTaskClass);
      taskOnGoingDescription.textContent = "";
      selectedTask = null;
    }
  };

  return li;
}

function refreshList(task) {
  const taskElement = createElementTask(task);
  taskUl.append(taskElement);
}

taskList.forEach((task) => {
  const taskElement = createElementTask(task);
  taskUl.append(taskElement);
});

document.addEventListener("endedFocus", () => {
  if (selectedTask) {
    selectedTask.classList.remove(selectedTaskClass);
    selectedTask.classList.add("app__section-task-list-item-complete");
    selectedTask.querySelector("button").setAttribute("disabled", "disabled");
  }
});
