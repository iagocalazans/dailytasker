import Model from "../core/Model.js";

class TaskModel extends Model {
  constructor(db, tasks) {
    super(db, tasks);
  }
}

export default TaskModel;
