class Model {
  //This must receive a Db object and a table name as string.
  constructor(db, table) {
    table = `collection_${table}`;
    this.table = db.tables[table];
  }

  save(data) {
    const { token } = this.table;
    data._id = `_${token.toString(16)}`;
    data.id = token.toString(16);
    this.table.token++;
    data._createdAt = new Date();

    Object.assign(this.table.data, {
      [`_${data.id}`]: data,
    });

    return this.table.data;
  }

  get find() {
    return this.table.data;
  }

  findOne(params) {}

  update(id, data) {
    const { ...args } = data;
    const el = this.table.data[id];
    for (let key in args) {
      el[key] = args[key];
    }
  }
}

export default Model;
