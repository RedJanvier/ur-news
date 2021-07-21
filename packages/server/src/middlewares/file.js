import fs from 'fs';
import path from 'path';
import { asyncHandler, ErrorResponse } from '../utils';

export const upload = asyncHandler(async (req, res, next) => {
  const { role } = req.decoded;

  if (role === 'student') throw new ErrorResponse('You are not allowed!', 403);
  if (!req.files || !req.files.file) return next();

  const { file } = req.files;
  const url = path.join(__dirname, '..', '..', `/public/files/${file.name}`);

  file.mv(url, (err) => err && console.log(err));
  req.fileUrl = file.name;
  return next();
});

export const deleteFile = asyncHandler(async (req, res, next) => {
  const { news } = req;
  if (news.file) {
    fs.unlink(
      path.join(__dirname, '..', '..', `/public/files/${news.file}`),
      (err) => {
        if (err) throw err;
      }
    );
  }
  next();
});
