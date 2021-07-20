import userServices from '../services/userServices';
import {
  decryptPassword,
  encryptPassword,
  ErrorResponse,
  asyncHandler,
  signToken,
} from '../utils';

// @desc      Get All Users
// @route     GET /api/v1/users/
// @access    Public
export const readAll = asyncHandler(async (req, res) => {
  const users = await userServices.findAll();

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc      Get a single user
// @route     GET /api/v1/users/id
// @access    Public
export const read = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await userServices.findOne({ _id: id });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Create a user
// @route     POST /api/v1/users/register
// @access    Public
export const create = asyncHandler(async (req, res) => {
  const {
    name,
    regNumber,
    password,
    campus,
    department,
    school,
    class: _class,
  } = req.body;

  if (
    !name ||
    !regNumber ||
    !password ||
    !campus ||
    !school ||
    !department ||
    !_class
  )
    throw new ErrorResponse('Provide all fields please!', 400);

  const hash = await encryptPassword(password);
  const user = await userServices.create({ ...req.body, password: hash });

  return res.status(201).json({
    success: true,
    data: user,
  });
});

// @desc      Create a user
// @route     POST /api/v1/users/login
// @access    Public
export const login = asyncHandler(async (req, res) => {
  const { regNumber, password } = req.body;
  if (!regNumber || !password)
    throw new ErrorResponse('Provide all fields please!', 400);

  const user = await userServices.findOne({ regNumber }, 'password');
  if (!user) throw new ErrorResponse('User not found!', 404);

  await decryptPassword(password, user.password);

  const { _id: userId, name, role } = user;
  const token = signToken({ userId, name, regNumber, role });

  res.status(200).json({
    success: true,
    message: 'User logged in ',
    token,
    role,
    userId,
    regNumber,
  });
});

// @desc      Update a single user
// @route     PUT /api/v1/users/id
// @access    Public
export const update = asyncHandler(async (req, res) => {
  const user = await userServices.update({ _id: req.params.id }, req.body);

  res.status(200).json({
    success: true,
    data: { ...user, password: null },
  });
});

// @desc      Update a user's role
// @route     POST /api/v1/users/
// @access    Private
export const changeRole = asyncHandler(async (req, res) => {
  if (req.decoded.role === 'student')
    throw new ErrorResponse('Unauthorized!', 403);

  const { role, regNumber } = req.body;

  const user = await userServices.update({ regNumber }, { role });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update a user's profile picture
// @route     POST /api/v1/users/profile
// @access    Private
export const updateProfile = asyncHandler(async (req, res) => {
  const image = req.imageUrl;
  const { imageId, user } = req;

  const { _doc: result } = await user.updateOne({
    image,
    imageId,
  });
  res.status(200).json({
    success: true,
    data: { ...result, password: null },
  });
});

// @desc      Delete a single user
// @route     DELETE /api/v1/users/:id
// @access    Public
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await userServices.delete({ _id: req.params.id });
  res.status(200).json({
    success: true,
    count: user.deleteCount,
    data: {},
  });
});
