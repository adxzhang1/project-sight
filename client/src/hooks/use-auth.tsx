import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios, { AxiosResponse } from 'axios';
import * as ENV from '../env';
import { useHistory, useLocation } from 'react-router';

interface AuthState {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  token: null,
  login: () => Promise.resolve(),
  signup: () => Promise.resolve(),
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken('');
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await axios.post<any, AxiosResponse<{ token: string }>>(
        ENV.API_URL + '/auth/login',
        {
          email,
          password,
        }
      );

      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      console.log(err);
      setToken('');
    }
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    try {
      const res = await axios.post<any, AxiosResponse<{ token: string }>>(
        ENV.API_URL + '/auth/signup',
        {
          email,
          password,
        }
      );
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      console.log(err);
      setToken('');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthRedirect = () => {
  const { token } = useAuth();
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!token && !pathname.startsWith('/auth')) {
      history.push('/auth');
    } else if (token && pathname.startsWith('/auth')) {
      history.push('/');
    }
  });
};
