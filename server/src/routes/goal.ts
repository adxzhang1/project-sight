import { CategoryModel, GoalModel } from '../models';
import { Router, RequestHandler } from 'express';
import { AuthController } from './auth';

class GoalsController {
  static get: RequestHandler = async (req, res, next) => {
    try {
      const goals = await GoalModel.find();
      res.status(200).json(goals);
    } catch (err) {
      next(err);
    }
  };

  static create: RequestHandler = async (req, res, next) => {
    try {
      // get the category
      const category = await CategoryModel.findOne({
        _id: req.body.categoryId,
      });
      if (!category) {
        throw {
          isCustom: true,
          statusCode: 500,
          message: 'invalid category',
        };
      }

      // create the goal
      const goal = await GoalModel.create(req.body);

      // update the category
      category.goals.push(goal.id);
      await category.save();

      res.status(200).json(goal);

      // // session
      // const session = await GoalModel.startSession();
      // session.startTransaction();
      // const opts = { session };
      // try {
      //   // create a goal
      //   const goal = await new GoalModel(req.body).save(opts);

      //   // update the category
      //   category.goals.push(goal.id);
      //   await category.save(opts);

      //   session.endSession();
      //   res.status(200).json(goal);
      // } catch (err) {
      //   await session.abortTransaction();
      //   session.endSession();
      //   throw err;
      // }
    } catch (err) {
      next(err);
    }
  };

  static delete: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      const goal = await GoalModel.findOne({ _id: req.params.id });

      if (!goal) {
        return res.status(200).json({});
      }

      // delete goal from all categories
      const categories = await CategoryModel.find({ goals: goal.id });
      await Promise.all(
        categories.map((category) => {
          category.goals = (category.goals as string[]).filter(
            (id) => id != goal.id
          );
          return category.save();
        })
      );

      // delete the goal
      await goal.delete();

      res.status(200).json({});
    } catch (err) {
      next(err);
    }
  };

  static update: RequestHandler<{ id: string }> = async (req, res, next) => {
    try {
      await GoalModel.findOneAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json({});
    } catch (err) {
      next(err);
    }
  };
}

const router = Router();

router.use(AuthController.verify);

router.get('/', GoalsController.get);
router.post('/', GoalsController.create);
router.patch('/:id', GoalsController.update);
router.delete('/:id', GoalsController.delete);

export default router;
