import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cremations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('location')
      table.dateTime('date')
      table.float('price')
      table.boolean('is_available')
      table.integer('service_id').unsigned().references('services.id').onDelete('CASCADE')
      table.integer('room_id').unsigned().references('rooms.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
