const db = require("../database");

class BaseModel {
  static tableName;
  static _db = db;

  static get table() {
    return this._db(this.tableName);
  }

  static findAll() {
    const query = this.table;
    return query;
  }

  static findOne(searchParams) {
    const query = this.table.where(searchParams).first();
    return query;
  }

  static find(searchParams) {
    const query = this.table.where(searchParams);
    return query;
  }

  static create(data) {
    const query = this.table.insert(data).returning("*");
    return query;
  }

  static updateOne(searchParams, data) {
    const query = this.table
      .update(data)
      .where(searchParams)
      .returning("*");

    return query;
  }

  static deleteOne(searchParams) {
    const query = this.table.del().where(searchParams);

    return query;
  }
}

module.exports = BaseModel;
