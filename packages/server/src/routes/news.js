import { Router } from 'express';

import {
  read,
  create,
  update,
  readAll,
  readAllBy,
  deleteNews,
  // updateFile,
  // updateImage,
  downloadFile,
} from '../controllers/news';
import {
  uploadFile,
  uploadImage,
  auth,
  deleteFile,
  deleteNewsImage,
} from '../middlewares';

const router = Router();

router.route('/').get(auth, readAll);
router.route('/create').post(auth, uploadFile, uploadImage, create);
router.route('/by/:id').get(auth, readAllBy);
router.route('/file/download/:name').get(downloadFile);
// router.route('/:id/file').post(auth, uploadFile, updateFile);
// router.route('/:id/image').post(auth, uploadImage, updateImage);
router
  .route('/:id')
  .get(read)
  .put(auth, update)
  .delete(auth, deleteNewsImage, deleteFile, deleteNews);

export default router;
