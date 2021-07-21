import chatServices from '../../services/chatServices';
import emitter from '../eventEmitters';
import app from '../socket';

export default async () => {
  await emitter.on('new chat', async (params) => {
    const chat = await chatServices.findOne(params);
    app.io.emit('chat-message', chat);
  });
};
