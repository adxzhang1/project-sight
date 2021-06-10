import { RequestHandler, Router } from 'express';
import bcrypt from 'bcrypt';
import { UserDocument, UserModel } from '../models';
import jwt from 'jsonwebtoken';
import * as ENV from '../env';

interface TokenData {
  userId: string;
}

export class AuthController {
  static create: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!password) {
        throw {
          isCustom: true,
          statusCode: 400,
          message: 'invalid password',
        };
      }

      if (await UserModel.findOne({ email })) {
        throw {
          isCustom: true,
          statusCode: 400,
          message: 'user with email already exists',
        };
      }

      const hash = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
        email,
        password: hash,
      });

      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };

  static login: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        throw {
          isCustom: true,
          statusCode: 400,
          message: 'no user with email found',
        };
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw {
          isCustom: true,
          statusCode: 400,
          message: 'invalid password',
        };
      }

      res.locals.user = user;
      next();
    } catch (err) {
      next(err);
    }
  };

  static sign: RequestHandler = async (req, res, next) => {
    try {
      const user = res.locals.user as UserDocument;

      const token = jwt.sign(
        {
          userId: user._id,
        },
        ENV.JWT_SECRET,
        { expiresIn: 60 * 60 }
      );

      res.status(200).json({ token, user });
    } catch (err) {
      next(err);
    }
  };

  static verify: RequestHandler = async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.split(' ')[1];
      if (!token) {
        throw {
          isCustom: true,
          statusCode: 401,
          message: 'no token provided',
        };
      }

      // development only
      if (ENV.NODE_ENV === 'development' && token === ENV.ADMIN_TOKEN) {
        const user = await UserModel.findOne({ email: 'admin@admin.com' });
        if (!user) {
          throw Error();
        }
        res.locals.userId = user._id;
        return next();
      }

      const decoded = jwt.verify(token, ENV.JWT_SECRET) as TokenData;
      res.locals.userId = decoded.userId;

      next();
    } catch (err) {
      if (err.isCustom) {
        return next(err);
      }

      console.log(err);
      next({
        isCustom: true,
        statusCode: 401,
        message: 'invalid token',
      });
    }
  };

  static delete: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ _id: req.params.id });

      if (!user) {
        return res.status(200).json({});
      }

      await user.remove();

      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
}

const router = Router();

router.post('/signup', AuthController.create, AuthController.sign);
router.post('/login', AuthController.login, AuthController.sign);
router.delete('/user/:id', AuthController.delete);
router.get('/secret', AuthController.verify, (req, res) =>
  res.status(200).json({ message: 'you found me' })
);

export default router;
