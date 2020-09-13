import Model from "../core/Model.js";

class Task extends Model {
  constructor(db, tasks) {
    super(db, tasks);
  }
}

export default Task;
