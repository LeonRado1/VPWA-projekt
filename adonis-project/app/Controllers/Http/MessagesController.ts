import Message from 'App/Models/Message';

export default class MessagesController {
  public async index({ params }) {
    const messages = await Message
      .query()
      .where('channel_id', params.id)
      .orderBy('sent_at', 'asc');
    console.log("Fetched messages for channel", params.id, messages);
    return messages;
  }
}
