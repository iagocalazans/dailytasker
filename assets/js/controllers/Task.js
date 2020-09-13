import TaskModel from "../models/Task.js";
import { db } from "../core/index.js";
const model = new TaskModel(db, "tasks");

export default function Task() {
  const obj = {
    submit: (event) => {
      const { title, description, priority, finishAt } = event.target;

      const task = {
        title: title.value,
        description: description.value,
        priority: parseInt(priority.value),
        finishAt: finishAt.value ? `${finishAt.value}:00` : "00:00:00",
      };

      model.save(task);
    },
  };

  return obj;
}
