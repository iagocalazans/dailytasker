class Model {
  constructor(db, table) {
    this.db = db;
    this.table = db.getTable(table);
    this.collection = `collection_${table}`;
  }

  create(data) {
    const { token } = this.table;

    data.id = token.toString(16);

    this.table.token++;

    data._createdAt = new Date();
    this.table.data.push(data);

    return this.db.setItem(this.collection, this.table);
  }

  get find() {
    return this.table.data;
  }

  findOne(params) {}

  update(id, data) {
    const { ...args } = data;
    let el;

    for (let item of this.table.data) {
      if (item.id === id) {
        el = item;
      }
    }

    for (let key in args) {
      el[key] = args[key];
    }

    return this.db.setItem(this.collection, this.table);
  }

  delete(id) {
    this.table.data.splice(
      this.table.data.find((el, index) => {
        if (el.id === id) {
          return index;
        }
      }),
      1
    );

    return this.db.setItem(this.collection, this.table);
  }

  clear() {
    this.db.data.clear();
  }
}

export default Model;
