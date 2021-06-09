import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Category, Goal } from '../types';
import * as ENV from '../env';
import { useAuth } from './use-auth';

export interface GoalParams {
  title: string;
  description?: string;
}

export interface CategoryParams {
  name: string;
}

export const useManager = () => {
  const { logout, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const checkAuthError = useCallback(
    (err: any) => {
      if (err.response?.status == 401) {
        logout();
      }
    },
    [logout]
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    let canUpdate = true;

    const init = async () => {
      setLoading(true);

      try {
        const res = await axios.get<any, AxiosResponse<Category[]>>(
          ENV.API_URL + '/categories?includeGoals=true',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (canUpdate) {
          setCategories(res.data);
        }
      } catch (err) {
        checkAuthError(err);
      } finally {
        if (canUpdate) {
          setLoading(false);
        }
      }
    };
    init();

    return () => {
      canUpdate = false;
    };
  }, [checkAuthError, token]);

  const addGoal = async (goal: GoalParams, categoryId: string) => {
    try {
      const res = await axios.post<any, AxiosResponse<Goal>>(
        ENV.API_URL + '/goals',
        { ...goal, categoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      checkAuthError(err);
    }
  };

  const deleteGoal = async (goalId: string, categoryId: string) => {
    try {
      await axios.delete(ENV.API_URL + '/goals/' + goalId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
    } catch (err) {}
  };

  const addCategory = async (category: CategoryParams) => {
    try {
      const res = await axios.post<any, AxiosResponse<Category>>(
        ENV.API_URL + '/categories',
        category,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories([...categories, res.data]);
    } catch (err) {
      checkAuthError(err);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(ENV.API_URL + '/categories/' + categoryId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    } catch (err) {
      checkAuthError(err);
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
