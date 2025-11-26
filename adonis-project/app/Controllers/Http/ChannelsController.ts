import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Channel from 'App/Models/Channel';
import ChannelMember from 'App/Models/ChannelMember';
import Ws from '@ioc:Ruby184/Socket.IO/Ws'
export default class ChannelsController {
  public async getChannels({ auth, response }: HttpContextContract) {
    const channels = await Channel.query()
      .whereHas('users', (query) => {
        query.where('users.id', auth.user!.id);
      })
      .orWhereHas('invites', (query) => {
        query.where('for_user_id', auth.user!.id);
      })
      .preload('invites', (query) => {
        query.where('for_user_id', auth.user!.id).limit(1);
      })
      .preload('messages', (query) => {
        query.orderBy('sent_at', 'desc').limit(1);
      });

    return response.ok(channels);
  }

  public async getChannel({ auth, params, response }: HttpContextContract) {
    const channel = await Channel.query()
      .where('id', params.id)
      .preload('users', (query) => {
        query.orderBy('joined_at', 'desc');
      })
      .firstOrFail();

    if (channel.users.some((x) => x.id === auth.user!.id)) {
      await channel.load('messages', (query) => {
        query.orderBy('sent_at', 'desc');
        query.preload('user');
        query.preload('mentions');
      });
    } else {
      await channel.load('invites', (query) => {
        query.where('for_user_id', auth.user!.id).limit(1);
      });
    }

    return response.ok(channel);
  }


}
