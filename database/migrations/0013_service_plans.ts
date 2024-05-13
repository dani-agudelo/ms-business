import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'service_plans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // references services.id
      table.integer('service_id').unsigned().references('services.id').onDelete('CASCADE')
      // references plans.id
      table.integer('plan_id').unsigned().references('plans.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
