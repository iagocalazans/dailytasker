import TaskController from "./controllers/Task.js";

const taskController = new TaskController();

(function () {
  const form = document.getElementById("newTaskForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    taskController.submit(e);

    e.target.title.value = "";
    e.target.description.value = "";
    e.target.priority.value = 4;
    e.target.finishAt.value = "";
  });

  form.addEventListener("reset", function (e) {
    const collapseItem = document.getElementById("collapseItem");
    collapseItem.classList.remove("show");
  });
})();
