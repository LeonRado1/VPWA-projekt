import {BaseModel, column, HasMany, hasMany} from '@ioc:Adonis/Lucid/Orm'
import Setting from "App/Models/Setting";

export default class Status extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: string

  @hasMany(() => Setting, {
    foreignKey: 'status_id',
  })
  public settings: HasMany<typeof Setting>
}
