import { RequestHandler, Router } from 'express';
import { CategoryModel, GoalModel } from '../models';
import { AuthController } from './auth';

class CategoriesController {
  static get: RequestHandler<any, any, any, { includeGoals?: boolean }> =
    async (req, res, next) => {
      try {
        let categoriesPromise = CategoryModel.find({ user: res.locals.userId });
        if (req.query.includeGoals) {
          categoriesPromise = categoriesPromise.populate('goals');
        }
        const categories = await categoriesPromise;
        res.status(200).json(categories);
      } catch (err) {
        next(err);
      }
    };

  static create: RequestHandler = async (req, res, next) => {
    try {
      const category = await CategoryModel.create({
        ...req.body,
        user: res.locals.userId,
      });
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  };

  static update: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      await CategoryModel.findOneAndUpdate(
        { _id: req.params.id, user: res.locals.userId },
        req.body
      );
      res.status(200).json({});
    } catch (err) {
      next(err);
    }
  };

  static delete: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      const category = await CategoryModel.findOne({
        _id: req.params.id,
        user: res.locals.userId,
      });

      if (!category) {
        return res.status(200).json({});
      }

      // delete the goals
      await Promise.all(
        (category.goals as string[]).map((id) =>
          GoalModel.deleteOne({ _id: id })
        )
      );

      // delete the category
      await category.delete();

      res.status(200).json({});
    } catch (err) {
      next(err);
    }
  };
}

const router = Router();

router.use(AuthController.verify);

router.get('/', CategoriesController.get);
router.post('/', CategoriesController.create);
router.delete('/:id', CategoriesController.delete);

export default router;
