import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Category } from './types';
import * as ENV from './env';

export const useFoo = () => {
  const [loading, setLoading] = useState(true);
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

  return {
    loading,
    categories,
  };
};
