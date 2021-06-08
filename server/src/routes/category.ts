import { RequestHandler, Router } from 'express';
import { CategoryModel, GoalModel } from '../models';

class CategoriesController {
  static get: RequestHandler = async (req, res, next) => {
    try {
      const categories = await CategoryModel.find();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  };

  static create: RequestHandler = async (req, res, next) => {
    try {
      const category = await CategoryModel.create(req.body);
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  };

  static update: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      await CategoryModel.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json({});
    } catch (err) {
      next(err);
    }
  };

  static delete: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      const category = await CategoryModel.findOne({ _id: req.params.id });

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

router.get('/', CategoriesController.get);
router.post('/', CategoriesController.create);
router.delete('/:id', CategoriesController.delete);

export default router;