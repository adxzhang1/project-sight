import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Category, Goal } from '../types';
import * as ENV from '../env';

export interface GoalParams {
  title: string;
  description?: string;
}

export interface CategoryParams {
  name: string;
}

export const useManager = () => {
  const [loading, setLoading] = useState(true);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      try {
        const res = await axios.get<any, AxiosResponse<Category[]>>(
          ENV.API_URL + '/categories?includeGoals=true'
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const addGoal = async (goal: GoalParams, categoryId: string) => {
    try {
      const res = await axios.post<any, AxiosResponse<Goal>>(
        ENV.API_URL + '/goals',
        { ...goal, categoryId }
      );
      setCategories(
        categories.map((category) => {
          if (category._id === categoryId) {
            return {
              ...category,
              goals: [...category.goals, res.data],
            };
          }
          return category;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGoal = async (goalId: string, categoryId: string) => {
    try {
      await axios.delete(ENV.API_URL + '/goals/' + goalId);

      setCategories(
        categories.map((category) => {
          if (category._id === categoryId) {
            return {
              ...category,
              goals: category.goals.filter((goal) => goal._id !== goalId),
            };
          }
          return category;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addCategory = async (category: CategoryParams) => {
    try {
      const res = await axios.post<any, AxiosResponse<Category>>(
        ENV.API_URL + '/categories',
        category
      );

      setCategories([...categories, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(ENV.API_URL + '/categories/' + categoryId);

      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {
    loading,
    isNewOpen,
    setIsNewOpen,
    categories,
    addGoal,
    deleteGoal,
    addCategory,
    deleteCategory,
  };
};
