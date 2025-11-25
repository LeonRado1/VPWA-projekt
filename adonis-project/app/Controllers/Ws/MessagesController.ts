import type { WsContextContract } from '@ioc:Ruby184/Socket.IO/WsContext'
import Message from 'App/Models/Message'

export default class MessagesController {
  public async onJoin({ socket }: WsContextContract, channelId: string) {
    socket.join(`channel:${channelId}`)
    console.log(`WS: joined room channel:${channelId}`)
  }

  public async onSend({ socket, auth }: WsContextContract, payload) {
    console.log("WS: incoming message", payload)

    const saved = await Message.create({
      channelId: payload.channelId,
      userId: auth.user!.id,
      content: payload.content,
    })

    socket.emit('message:new', saved)        
    socket.to(`channel:${payload.channelId}`).emit('message:new', saved) 

    return saved
  }
}
