class Store {
  constructor(id, tables = ["standard"]) {
    this.id = id;
    this.data = window.localStorage;

    for (let table of tables) {
      if (!this.data[`collection_${table}`]) {
        this.setTable(table);
      }
    }
  }

  getTable(name) {
    let collection;
    if (!name) {
      return this.data;
    }

    if (name.includes("collection")) {
      throw new Error(
        "Table name must not contain (collection_) reserved word."
      );
    } else {
      collection = `collection_${name}`;
    }

    return JSON.parse(this.data[collection]);
  }

  setTable(name = "standard") {
    let collection;
    if (typeof name !== "string") {
      throw new Error("Table name must be a string!");
    }

    if (name.includes("collection")) {
      throw new Error(
        "Table name must not contain (collection_) reserved word."
      );
    } else {
      collection = `collection_${name}`;
    }

    const array = new Uint32Array(1);
    this.data.setItem(
      collection,
      JSON.stringify({
        name,
        data: [],
        token: window.crypto.getRandomValues(array)[0],
      })
    );
    return JSON.parse(this.data.getItem(collection));
  }

  key(n) {
    const array = Object.keys(this.data);
    return JSON.parse(this.data[array[n]]);
  }

  setItem(table, item) {
    return this.data.setItem(table, JSON.stringify(item));
  }
}

export default Store;
