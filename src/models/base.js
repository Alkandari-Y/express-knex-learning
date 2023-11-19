const db = require("../database");

class BaseModel {
  static tableName;
  static _db = db;

  static get table() {
    return this._db(this.tableName);
  }

  static async findAll() {
    const query = await this.table;
    return query;
  }

  static async findOne({ by, column = "id" }) {
    const query = await this.table.where(column, by).first();
    return query;
  }

  static async create(data) {
    const [query] = await this.table.insert(data).returning("*");
    return query;
  }

  static async updateOne({ by, data, column = "id" }) {
    const query = await this.table
      .update(data)
      .where(column, by)
      .returning("*");

    return query;
  }

  static async deleteOne({ by, column = "id" }) {
    const query = await this.table.del().where(column, by);

    return query;
  }
}

module.exports = BaseModel;
