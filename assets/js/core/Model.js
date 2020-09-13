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
    const date = new Date();
    data._createdAt = date.toLocaleTimeString();

    Object.assign(this.table.data, {
      [`_${data.id}`]: data,
    });

    console.log(this.find);
  }

  get find() {
    return this.table.data;
  }

  findOne(params) {}
}

export default Model;
