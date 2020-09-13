import Db from "./Db/Db.js";

export const db = new Db();
export const table = db.create("tasks");
