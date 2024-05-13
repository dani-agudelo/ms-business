import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "service_executions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("customer_id")
        .unsigned()
        .references("customers.id")
        .onUpdate("CASCADE");
      table
        .integer("service_id")
        .unsigned()
        .references("services.id")
        .onUpdate("CASCADE");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
