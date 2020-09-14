import TaskController from "./controllers/Task.js";

const form = document.getElementById("newTaskForm");
const taskController = new TaskController();
const taskList = document.getElementById("task-list");
const refreshEvent = new Event("refresh");

// Function to control Form Events
(function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    taskController.submit(e);
    form.reset();
  });

  form.addEventListener("reset", function (e) {
    const collapseItem = document.getElementById("collapseItem");
    collapseItem.classList.remove("show");
  });
})();

// Function to control List Refresh
(function () {
  taskList.addEventListener("refresh", () => taskController.refresh());

  setInterval(refresh, 1 * 60000);
})();

//Function Refresh, to dispatch from Interval
function refresh() {
  taskList.dispatchEvent(refreshEvent);
}
