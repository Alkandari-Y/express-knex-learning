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

  static async findOne(searchParams) {
    const query = await this.table.where(searchParams).first();
    return query;
  }

  static async find(searchParams) {
    const query = await this.table.where(searchParams);
    return query;
  }

  static async create(data) {
    const [query] = await this.table.insert(data).returning("*");
    return query;
  }

  static async updateOne(searchParams, data) {
    const query = await this.table
      .update(data)
      .where(searchParams)
      .returning("*");

    return query;
  }

  static async deleteOne(searchParams) {
    const query = await this.table.del().where(searchParams);

    return query;
  }
}

module.exports = BaseModel;
