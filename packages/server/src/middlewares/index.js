import { upload as uploadImage, deleteProfile, deleteNewsImage } from './image';
import { upload as uploadFile, deleteFile } from './file';
import { checkAuth as auth } from './auth';

export {
  auth,
  uploadFile,
  uploadImage,
  deleteProfile,
  deleteNewsImage,
  deleteFile,
};
