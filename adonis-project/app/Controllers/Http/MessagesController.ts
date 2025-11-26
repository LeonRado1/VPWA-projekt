import Message from 'App/Models/Message';

export default class MessagesController {
  public async index({ params, request }) {
  const page = request.input('page', 1);
  const limit = 10;

  const messages = await Message
    .query()
    .where('channel_id', params.id)
    .orderBy('sent_at', 'desc')
    .offset((page - 1) * limit)
    .limit(limit);

    console.log("Fetched messages for channel", params.id, messages);
    return messages;
  }
}
