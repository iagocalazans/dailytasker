import TaskModel from "../models/taskModel.js";
import { store } from "../core/index.js";
import TaskView from "../views/taskView.js";
const taskView = new TaskView();
const model = new TaskModel(store, "tasks");

// This Function returns obj with methods (instead of this attr as standard)! I made it to use all types of JavaScript Objects on this Little App.
export default function TaskController() {
  const obj = {
    submit: (event) => {
      const { title, description, priority, finishAt } = event.target;

      const task = {
        title: title.value,
        description: description.value,
        priority: parseInt(priority.value),
        finishAt: Date.parse(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            finishAt.value.split(":")[0],
            finishAt.value.split(":")[1]
          )
        ),
        completed: false,
      };

      model.create(task);
      obj.refresh();
    },

    refresh: () => {
      obj.find();
    },

    find: () => {
      const obj = model.find;

      for (let task of obj) {
        const left = task.finishAt - Date.now();
        if (left < -300000 && task.completed) {
          model.delete(task.id);
        }
      }

      return taskView.mount(obj);
    },

    complete: (id) => {
      model.update(`${id.split("-")[1]}`, { completed: true });
      obj.refresh();
    },

    clear: () => {
      model.clear();
      window.alert("All your tasks have been cleared!");
      document.location.reload();
    },
  };

  return obj;
}
