// array for todo list
const todoList = [
  {
    id: 1,
    task: "Learn HTML",
    completed: true,
  },
  {
    id: 2,
    task: "Learn CSS",
    completed: true,
  },
  {
    id: 3,
    task: "Learn JS",
    completed: false,
  },
  {
    id: 4,
    task: "Learn TypeScript",
    completed: false,
  },
  {
    id: 5,
    task: "Learn React",
    completed: false,
  },
];

// add your code here

const container = document.querySelector("ul");
function updateList() {
  container.innerHTML = "";
  todoList.forEach((todo) => {
    const li = document.createElement("li");

    const input = document.createElement("input");
    input.id = `todo-${todo.id}`;
    input.type = "checkbox";
    input.checked = todo.completed;

    input.addEventListener("change", (e) => {
      todoList.find((i) => i.id == todo.id).completed = e.target.checked;
      console.log(todoList);
    });

    const label = document.createElement("label");
    label.htmlFor = `todo-${todo.id}`;
    label.textContent = todo.task;

    const deleteButton = document.createElement("button");
    deleteButton.addEventListener("click", () => {
      const index = todoList.findIndex((i) => i.id == todo.id);
      todoList.splice(index, 1);
      updateList();
      console.log(todoList);
    });

    li.append(input, label, deleteButton);
    container.appendChild(li);
  });
  console.log(todoList);
}
updateList();

const dialog = document.querySelector("dialog");
document.querySelector(".add-btn").addEventListener("click", () => {
  dialog.showModal();
});

const todoInput = dialog.querySelector("input");
dialog.querySelector("button").addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
  todoList.push({
    id: todoList[todoList.length - 1].id + 1,
    task: todoInput.value,
    completed: false,
  });
  todoInput.value = "";
  updateList();
});
