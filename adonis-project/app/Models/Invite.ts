import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import {DateTime} from "luxon";
import Channel from "App/Models/Channel";
import User from "App/Models/User";

export default class Invite extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'channel_id' })
  public channelId: string

  @column({ columnName: 'by_user_id' })
  public byUserId: number

  @column({ columnName: 'for_user_id' })
  public forUserId: number

  @column.dateTime({ autoCreate: true, columnName: 'invited_at' })
  public invitedAt: DateTime

  @belongsTo(() => Channel, {
    foreignKey: 'channel_id',
  })
  public channel: BelongsTo<typeof Channel>

  @belongsTo(() => User, {
    foreignKey: 'by_user_id',
  })
  public byUser: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'for_user_id',
  })
  public forUser: BelongsTo<typeof User>
}
