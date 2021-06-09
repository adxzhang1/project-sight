import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Category, Goal } from '../types';
import * as ENV from '../env';
import { useAuth } from './use-auth';

const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export interface CreateCategoryParams {
  name: string;
}

export interface UpdateCategoryParams {
  name?: string;
  goals?: string[];
}

export interface CreateGoalParams {
  title: string;
  description?: string;
}

export interface UpdateGoalParams {
  title?: string;
  description?: string;
}

// --- Category ---
interface UseCategoryParams {
  token: string | null;
  categories: Category[];
  setCategories: (categories: Category[]) => any;
  onError: (err: any) => any;
}

const useCategory = ({
  token,
  categories,
  setCategories,
  onError,
}: UseCategoryParams) => {
  // add a category
  const addCategory = async (category: CreateCategoryParams) => {
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
      onError(err);
    }
  };

  // delete category
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
      onError(err);
    }
  };

  // update category
  const updateCategory = async (
    categoryId: string,
    params: UpdateCategoryParams
  ) => {
    try {
      const res = await axios.patch<any, AxiosResponse<Category>>(
        ENV.API_URL +
          '/categories/' +
          categoryId +
          '?shouldReturn=true&includeGoals=true',
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCategories(
        categories.map((category) => {
          if (category._id === categoryId) {
            return res.data;
          }
          return category;
        })
      );
    } catch (err) {
      onError(err);
    }
  };

  const reorderGoals = async (
    categoryId: string,
    source: number,
    dest: number
  ) => {
    try {
      let updatedGoals: Goal[] = [];
      const updatedCategories = categories.map((category) => {
        if (category._id === categoryId) {
          updatedGoals = reorder(category.goals, source, dest);
          return {
            ...category,
            goals: updatedGoals,
          };
        }
        return category;
      });
      setCategories(updatedCategories);

      if (!updatedGoals.length) {
        return;
      }

      updateCategory(categoryId, {
        goals: updatedGoals.map(({ _id }) => _id),
      });
    } catch (err) {
      setCategories(categories);
      onError(err);
    }
  };

  return {
    addCategory,
    deleteCategory,
    updateCategory,
    reorderGoals,
  };
};

// --- Goal ---
interface UseGoalParams {
  token: string | null;
  categories: Category[];
  setCategories: (categories: Category[]) => any;
  onError: (err: any) => any;
}

const useGoal = ({
  token,
  categories,
  setCategories,
  onError,
}: UseGoalParams) => {
  // add a goal
  const addGoal = async (goal: CreateGoalParams, categoryId: string) => {
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
      onError(err);
    }
  };

  // delete a goal
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
    } catch (err) {
      onError(err);
    }
  };

  // update goal
  const updateGoal = async (
    goalId: string,
    params: UpdateGoalParams,
    categoryId: string
  ) => {
    try {
      const res = await axios.patch<any, AxiosResponse<Goal>>(
        ENV.API_URL + '/goals/' + goalId + '?shouldReturn=true',
        params,
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
              goals: category.goals.map((goal) => {
                if (goal._id === goalId) {
                  return res.data;
                }
                return goal;
              }),
            };
          }
          return category;
        })
      );
    } catch (err) {
      onError(err);
    }
  };

  return {
    addGoal,
    deleteGoal,
    updateGoal,
  };
};

// --- Manager ---
export const useManager = () => {
  const { logout, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // handle auth error
  const handleError = useCallback(
    (err: any) => {
      console.log(err);
      if (err.response?.status == 401) {
        logout();
      }
    },
    [logout]
  );

  // init
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
        handleError(err);
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
  }, [handleError, token]);

  const { addCategory, deleteCategory, updateCategory, reorderGoals } =
    useCategory({
      token,
      categories,
      setCategories,
      onError: handleError,
    });

  const { addGoal, deleteGoal, updateGoal } = useGoal({
    token,
    categories,
    setCategories,
    onError: handleError,
  });

  return {
    loading,
    isNewOpen,
    setIsNewOpen,
    categories,
    addCategory,
    deleteCategory,
    updateCategory,
    addGoal,
    deleteGoal,
    updateGoal,
    reorderGoals,
  };
};
