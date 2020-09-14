export default function Task() {
  this.mount = (tasks) => {
    const taskList = document.getElementById("task-list");

    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    tasks.sort((a, b) => a.finishAt - b.finishAt);

    for (let task of tasks) {
      const link = document.createElement("a");
      link.setAttribute("id", `task-${task.id}`);
      link.setAttribute("href", "#");
      link.classList.add(
        "list-group-item",
        "list-group-item-action",
        "text-dark"
      );

      const header = document.createElement("div");
      header.classList.add("d-flex", "w-100", "justify-content-between");

      const title = document.createElement("h5");
      title.innerText = `${task.title}`;
      title.classList.add("font-weight-bold");

      const timer = document.createElement("small");
      const left = task.finishAt - Date.now();

      switch (Math.floor(left / 3600000)) {
        case -1:
          timer.innerText = `${
            Math.floor((left % 3600000) / 60000) * -1
          } minutes late`;
          timer.classList.add("font-weight-bold", "text-danger");
          break;
        case 0:
          if (Math.floor((left % 3600000) / 60000) === 0) {
            timer.innerText = `Less than a minute`;
          } else {
            timer.innerText = `${Math.floor(
              (left % 3600000) / 60000
            )} minutes left`;
          }
          timer.classList.add("font-weight-bold", "text-warning");
          break;
        case 1:
          timer.innerText = `> 1 hour left`;
          timer.classList.add("text-primary");
          break;
        default:
          if (Math.floor(left / 3600000) < 0) {
            timer.innerText = `${Math.floor(left / 3600000) * -1} hours late`;
            timer.classList.add("font-weight-bold", "text-danger");
          } else {
            timer.innerText = `${Math.floor(left / 3600000)} hours left`;
            timer.classList.add("text-primary");
          }
          break;
      }

      const p = document.createElement("p");
      p.innerText = task.description;
      p.classList.add("mb-1");

      const priority = document.createElement("small");
      let priorityText;
      switch (task.priority) {
        case 1:
          priorityText = "Extremely Important!";
          priority.classList.add("text-danger", "font-weight-bold");
          title.classList.add("text-danger");
          p.classList.add("text-danger");
          break;
        case 2:
          priorityText = "Important!";
          priority.classList.add("text-warning", "font-weight-bold");
          title.classList.add("text-warning");
          p.classList.add("text-warning");
          break;
        case 3:
          priorityText = "Need to do!";
          priority.classList.add("text-info", "font-weight-bold");
          title.classList.add("text-info");
          p.classList.add("text-info");
          break;
        case 4:
          priorityText = "To do!";
          priority.classList.add("text-success", "font-weight-bold");
          title.classList.add("text-success");
          p.classList.add("text-success");
          break;
      }
      priority.innerText = priorityText;

      header.appendChild(title);
      header.appendChild(timer);

      link.appendChild(header);
      link.appendChild(p);
      link.appendChild(priority);

      taskList.appendChild(link);
    }
  };
}
