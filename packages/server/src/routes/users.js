import { Router } from 'express';

import {
  read,
  login,
  create,
  update,
  readAll,
  changeRole,
  deleteUser,
  updateProfile,
} from '../controllers/users';
import { auth, uploadImage, deleteProfile } from '../middlewares';

const router = Router();

router.route('/login').post(login);
router.route('/register').post(create);
router.route('/').get(readAll).post(auth, changeRole);
router.route('/:id').get(read).put(update).delete(deleteUser);
router.route('/profile').post(auth, deleteProfile, uploadImage, updateProfile);

export default router;
