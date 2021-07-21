import cloudinary from '../config/cloudinary';
import { asyncHandler, ErrorResponse } from '../utils';
import userServices from '../services/userServices';
import newsServices from '../services/newsServices';

export const upload = asyncHandler(async (req, res, next) => {
  const { role } = req.decoded;

  if (role === 'student') throw new ErrorResponse('You are not allowed!', 403);
  if (!req.files || !req.files.img) return next();

  const { tempFilePath } = req.files.img;
  const { url, public_id: pid } = await cloudinary.upload(
    tempFilePath,
    (_, result) => result
  );

  req.imageUrl = url;
  req.imageId = pid;
  return next();
});

export const deleteProfile = asyncHandler(async (req, res, next) => {
  const { regNumber } = req.decoded;

  const user = await userServices.findOne({ regNumber });
  if (user.imageId) {
    const { result } = await cloudinary.destroy(user.imageId, (err, reslt) => {
      if (err) throw err;
      return reslt;
    });
    if (result !== 'ok') throw new ErrorResponse('unable to change profile!');
  }
  req.user = user;
  next();
});

export const deleteNewsImage = asyncHandler(async (req, res, next) => {
  const news = await newsServices.findOne({ _id: req.params.id });
  if (news.img) {
    const { result } = await cloudinary.destroy(news.imgId, (err, reslt) => {
      if (err) throw err;
      return reslt;
    });
    if (result !== 'ok') throw new ErrorResponse('Unable to delete image');
  }
  req.news = news;
  next();
});
