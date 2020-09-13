class Table {
  constructor(name, db) {
    this.name = name;
    this.db = { name: db.name, users: db.users };
    this.data = {};
    this.token = 4452887648346026;
  }
}

export default Table;
