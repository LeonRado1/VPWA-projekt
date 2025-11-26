import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Message from 'App/Models/Message'
import Mention from 'App/Models/Mention';
import User from 'App/Models/User';
export default class MessagesController {
  public async onJoin({ socket }: WsContextContract, channelId: string) {
    socket.join(`channel:${channelId}`)
    console.log(`WS: joined room channel:${channelId}`)
  }

  public async onSend({ socket, auth }: WsContextContract, payload) {
    console.log("WS: incoming message", payload);

    const saved = await Message.create({
      channelId: payload.channelId,
      userId: auth.user!.id,
      content: payload.content,
    });

    if (payload.mentions?.length) {
      const nicknames = payload.mentions.map((m: string) => m.replace("@", ""));
      const users = await User.query()
        .whereIn("nickname", nicknames);
    

      await Mention.createMany(
        users.map((user) => ({
          messageId: saved.id,
          userId: user.id,      
        }))
      );
    }

    socket.emit("message:new", saved);
    socket.to(`channel:${payload.channelId}`).emit("message:new", saved);

    return saved;
  }


 

}
