import TaskController from "./controllers/taskController.js";

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

//Function to first refresh after Window Load
(function () {
  window.addEventListener("load", () => taskController.refresh());
})();

(function () {
  const clearBtn = document.getElementById("clearAll");
  clearBtn.addEventListener("click", () => taskController.clear());
})();
