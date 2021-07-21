import { verifyToken, ErrorResponse, asyncHandler } from '../utils';
import User from '../models/user';

export const checkAuth = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : req.headers.authorization;

  // eslint-disable-next-line default-case
  switch (true) {
    case token === undefined:
      throw new ErrorResponse('please signup/login', 401);

    case token !== null:
      req.decoded = verifyToken(token, process.env.JWT_SECRET);
      break;
  }
  next();
});

export const checkRole = (reqRole) =>
  asyncHandler(async (req, res, next) => {
    const { userId } = req.decoded;
    const {
      _doc: { role },
    } = await User.findById(userId);

    if (role !== reqRole) throw new ErrorResponse('Unauthorized!', 403);

    next();
  });
