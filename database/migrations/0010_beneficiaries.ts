import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "beneficiaries";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("owner_id").unsigned().references("owners.id");
      table
        .integer("customer_id")
        .unsigned()
        .references("customers.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("age");

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
