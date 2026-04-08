import { Router } from 'express';
import chatControllers from '../controllers/chat';
import { auth } from '../middlewares';
import news from './news';
import users from './users';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const router = Router();

router.use('/news', news);
router.use('/users', users);
router.get('/chats', auth, chatControllers.getChats);
router.post('/chat', auth, chatControllers.createChat);

export default router;