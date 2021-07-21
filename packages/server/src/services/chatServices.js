/* eslint-disable class-methods-use-this */
import Chat from '../models/chat';

class ChatServices {
  formatChat(chat, select) {
    switch(select){
      default:
        return {
          ...chat,
          __v: undefined,
          author: {
            id: chat.author._id,
            name: chat.author.name,
            regNumber: chat.author.regNumber,
            image: chat.author.image
          }
        };
    }
  }

  async findAll() {
    const chats = await Chat.find().populate('author');
    return chats.map(({_doc: chat}) => this.formatChat(chat));
  }

  async findOne(params, select) {
    const { _doc: chat } = await Chat.findOne(params).populate('author');
    return this.formatChat(chat, select);
  }

  async create(params) {
    const { _doc } = await Chat.create(params);
    const chat = await this.findOne({ _id: _doc._id });
    return chat;
  }
}

const chatServices = new ChatServices;

export default chatServices;
