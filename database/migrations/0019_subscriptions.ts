import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.integer('plan_id').unsigned().references('plans.id').onDelete('CASCADE').onUpdate('CASCADE')
      table.dateTime('start_date').notNullable()
      table.dateTime('end_date').notNullable()
      table.float('monthly_fee').notNullable()
      table.boolean('is_paid').notNullable()
  
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
