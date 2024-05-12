import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'relocations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('origin').notNullable()
      table.string('destination').notNullable()
      table.dateTime('date').notNullable()
      table.float('price').notNullable()
      table.boolean('is_available').notNullable()
      table.integer('service_id').unsigned().references('services.id').onDelete('CASCADE');
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
