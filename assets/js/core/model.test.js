import Model from "./Model.js";
import Store from "./Storage/Store.js";

const store = new Store("dailytasker", ["tasks"]);
const model = new Model(store, "tasks");

describe("Model Class", () => {
  describe("Props:", () => {
    it("#db", () => {
      expect(model).to.have.a.property("db").to.be.an.instanceOf(Store);
    });
    it("#collection", () => {
      expect(model)
        .to.be.a("object")
        .to.have.a.property("collection")
        .to.equal("collection_tasks");
    });
    it("#table", () => {
      expect(model)
        .to.have.a.property("table")
        .to.have.a.deep.property("name")
        .to.equal("tasks");
    });
  });

  describe("Methods:", () => {
    it("#create(data)", () => {
      const data = {
        title: "title.value",
        description: "description.value",
        priority: parseInt("1"),
        finishAt: Date.parse(
          new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            "11:00".split(":")[0],
            "11:00".split(":")[1]
          )
        ),
        completed: false,
      };

      model.create(data);

      const [first] = model.table.data;
      expect(first).to.have.property("title").to.equal("title.value");
      expect(first)
        .to.have.property("description")
        .to.equal("description.value");
      expect(first).to.have.property("priority").to.equal(1);
      expect(first).to.have.property("finishAt").to.be.a("number");
      expect(first)
        .to.have.property("completed")
        .to.be.a("boolean")
        .to.equal(false);
    });

    it("#find()", () => {
      const all = model.find;
      expect(all).to.have.lengthOf(model.table.data.length);
    });

    it("#update(id, data)", () => {
      const [first] = model.table.data;
      model.update(first.id, { completed: true });
      expect(model.table.data[0])
        .to.have.a.property("completed")
        .to.equal(true);
    });

    it("#delete(id)", () => {
      const [first] = model.table.data;
      model.delete(first.id);
      expect(model.table.data).to.have.a.lengthOf(0);
    });

    it("#clear()", () => {
      model.clear();
      expect(window.localStorage).to.have.a.lengthOf(0);
    });
  });
});
