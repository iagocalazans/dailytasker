import Table from "./Table.js";

class Db {
  constructor() {
    this.name = "dailytasker";
    this.users = {
      user: {
        name: "Iago Calazans",
        role: "root",
        username: "root",
      },
    };
    this.tables = {};
  }

  create(name) {
    let title = "collection_" + name;
    if (!name.includes("collection_")) {
      title = "collection_" + name;
    }
    const table = new Table(name, this);
    Object.assign(this.tables, { [title]: table });

    return this.table(name);
  }

  table(name) {
    return this.tables[`collection_${name}`];
  }

  get getTables() {
    return this.tables;
  }
}

export default Db;
