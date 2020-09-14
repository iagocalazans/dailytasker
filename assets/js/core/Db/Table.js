class Table {
  constructor(name, db) {
    this.name = name;
    this.db = { name: db.name, users: db.users };
    this.data = {};
    this.token = Math.floor(Math.random() * 4452887648346026) + 909090;
  }
}

export default Table;
