export default function Task() {
  this.mount = (tasks) => {
    const taskList = document.getElementById("task-list");

    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }

    for (let id in tasks) {
      const link = document.createElement("a");
      link.setAttribute("id", `task-${tasks[id].id}`);
      link.setAttribute("href", "#");
      link.classList.add("list-group-item", "list-group-item-action");

      const header = document.createElement("div");
      header.classList.add("d-flex", "w-100", "justify-content-between");

      const title = document.createElement("h5");
      title.innerText = `${tasks[id].title}`;

      const timer = document.createElement("small");
      timer.innerText = "3 hours left";
      timer.classList.add("text-muted");

      const p = document.createElement("p");
      p.innerText = tasks[id].description;
      p.classList.add("mb-1");

      const priority = document.createElement("small");
      priority.innerText = tasks[id].priority;
      priority.classList.add("text-muted");

      header.appendChild(title);
      header.appendChild(timer);

      link.appendChild(header);
      link.appendChild(p);
      link.appendChild(priority);

      console.log(link);
      taskList.appendChild(link);
    }
  };
}
