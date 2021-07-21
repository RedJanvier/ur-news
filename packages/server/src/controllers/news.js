/* eslint-disable no-underscore-dangle */
import path from 'path';
import newsServices from '../services/newsServices';
import userServices from '../services/userServices';
import { asyncHandler, ErrorResponse } from '../utils';

// @desc      Get all news
// @route     GET /api/v1/news/
// @access    Private
export const readAll = asyncHandler(async (req, res) => {
  const user = await userServices.findOne({ _id: req.decoded.userId });
  if (!user) throw new ErrorResponse('Please sign up to read news!', 404);
  
  const { campus, school, department, class: _class } = user;
  const news = await newsServices.findAll({
    $or: [
      { targetType: 'campus', target: campus },
      { targetType: 'school', target: school },
      { targetType: 'department', target: department },
      { targetType: 'class', target: _class },
    ],
  });
  
  res.status(200).json({
    success: true,
    count: news.length,
    data: news,
  });
});

// @desc      Get all news by Id
// @route     GET /api/v1/news/by/:id
// @access    Private
export const readAllBy = asyncHandler(async (req, res) => {
  const user = await userServices.findOne({ _id: req.decoded.userId });
  if (!user) throw new ErrorResponse('User does not exist', 404);

  const news = await newsServices.findAll({ creator: req.params.id });

  res.status(200).json({
    success: true,
    count: news.length,
    data: news,
  });
});

// @desc      Get a single news
// @route     GET /api/v1/news/:id
// @access    Public
export const read = asyncHandler(async (req, res) => {
  const news = await newsServices.findOne({_id: req.params.id});

  res.status(200).json({
    success: true,
    data: news,
  });
});

// @desc      Create a news
// @route     POST /api/v1/news/create
// @access    private
export const create = asyncHandler(async (req, res) => {
  const { userId: creator } = req.decoded;
  const { title, target, targetType } = req.body;
  if (!title || !target || !targetType)
    throw new ErrorResponse('Provide all fields please!', 400);

  const { imageUrl, imageId, fileUrl } = req;

  const news = await newsServices.create({ ...req.body, creator, img: imageUrl, imgId: imageId, file: fileUrl });
  if (!news) throw new ErrorResponse('News Not Created!', 500);

  res.status(201).json({
    success: true,
    data: news,
  });
});

// @desc      Update a single news
// @route     PUT /api/v1/news/:id
// @access    Private
export const update = asyncHandler(async (req, res) => {
  const news = await newsServices.update({ _id: req.params.id }, req.body);

  res.status(200).json({
    success: true,
    data: news,
  });
});

// @desc      Update a news image
// @route     POST /api/v1/news/:id/image
// @access    Private
export const updateImage = asyncHandler(async (req, res) => {
  const news = await newsServices.update(
    { _id: req.params.id },
    { img: req.imageUrl, imgId: req.imageId }
  );

  res.status(200).json({
    success: true,
    data: news,
  });
});

// @desc      Update a news file
// @route     POST /api/v1/news/:id/file
// @access    Private
export const updateFile = asyncHandler(async (req, res) => {
  const news = await newsServices.update(
    { _id: req.params.id },
    { file: req.fileUrl }
  );

  return res.status(200).json({
    success: true,
    data: news,
  });
});

// @desc      Download news file
// @route     GET /api/v1/news/file/download
// @access    Private
export const downloadFile = asyncHandler(async (req, res) => {
  const name = decodeURIComponent(req.params.name);
  const file = path.join(__dirname, '..', '..', `/public/files/${name}`);
  res.download(file);
});

// @desc      Delete a single news
// @route     DELETE /api/v1/news/:id
// @access    Private
export const deleteNews = asyncHandler(async (req, res) => {
  const { news } = req;
  const { deleteCount: count } = await news.deleteOne();
  res.status(200).json({
    success: true,
    count,
    data: {},
  });
});
