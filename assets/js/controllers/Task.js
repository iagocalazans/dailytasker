import TaskModel from "../models/Task.js";
import { db } from "../core/index.js";
import TaskView from "../views/Task.js";
const taskView = new TaskView();
const model = new TaskModel(db, "tasks");

export default function Task() {
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

      model.save(task);
      obj.refresh();
    },

    refresh: () => {
      obj.find();
    },

    find: () => {
      const array = [];
      const obj = model.find;

      for (let id in obj) {
        array.push(obj[id]);
      }

      return taskView.mount(array);
    },
  };

  return obj;
}
