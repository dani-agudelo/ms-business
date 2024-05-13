import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sepultures'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('sepulture_name')
      table.string('description')
      table.string('cemetery_name')
      table.string('sepulture_type')
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
