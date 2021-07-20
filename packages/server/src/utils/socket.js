import 'dotenv/config';
import sockets from 'socket.io';
import socketAuth from 'socketio-jwt-auth';

const { JWT_SECRET } = process.env;

const authMiddleware = socketAuth.authenticate(
  { secret: JWT_SECRET },
  (payload, done) => done(null, payload)
);

const io = sockets();
const socketFunction = {};
let newClient = null;
socketFunction.socketStartUp = (server) => {
  io.attach(server, { cors: { origin: '*' } });
  io.use(authMiddleware);
  io.on('connection', async (client) => {
    console.log('New client successfully connected!'.green.inverse);
    newClient = client;
    client.on('disconnect', () => {
      console.log('Bayi bayi ngona! 🐊'.red.inverse);
    });
  });
};

export default { socketFunction, io, newClient };
