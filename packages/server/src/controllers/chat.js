/* eslint-disable class-methods-use-this */
import chatServices from '../services/chatServices';
// import { asyncHandler } from '../utils';

class ChatControllers {
  async getChats(req, res) {
    const chats = await chatServices.findAll();
    res.status(200).json({ success: true, chats });
  }

  async createChat(req, res) {
    const chat = await chatServices.create({ ...req.body, author: req.decoded.userId });
    res.status(201).json({ success: true, chat });
  }
}

const chatControllers = new ChatControllers();

export default chatControllers;
