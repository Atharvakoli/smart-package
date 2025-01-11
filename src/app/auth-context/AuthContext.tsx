"use client";
import axios from "axios";
import { createContext, useContext, useReducer, ReactNode } from "react";

const initialState = {
  isSignIn: false,
  user: null,
  loading: false,
  error: null,
};

const actionTypes = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  LOGOUT: "LOGOUT",
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

interface User {
  name: string;
  email: string;
  contactNumber: string;
  password: string;
}

interface State {
  isSignIn: boolean;
  user: User | null;
}

interface Action {
  type: string;
  payload?: unknown;
}

function authReducer(state: State, action: Action): State {
  switch (action.type) {
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case actionTypes.SIGN_IN:
      return {
        ...state,
        isSignIn: true,
        loading: false,
        user: action.payload,
      };

    case actionTypes.SIGN_UP:
      return {
        ...state,
        isSignIn: true,
        loading: false,
        user: action.payload,
      };

    case actionTypes.LOGOUT:
      return {
        ...initialState,
        user: action.payload,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

interface AuthContextType {
  state: State;
  signIn: (email: string, password: string) => void;
  signUp: (userDetails: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = async (email: string, password: string) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const response = await axios.post(`/v1/api/user/login`, {
        email,
        password,
      });
      const { access_token, ...user } = response.data;

      dispatch({ type: actionTypes.SIGN_IN, payload: user });
      localStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("access_token", access_token);
      return user;
    } catch (error) {
      dispatch({
        type: actionTypes.ERROR,
        payload: `${error?.response?.data?.error || error.message}`,
      });
    }
  };

  const signUp = async (userDetails: User) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const response = await axios.post(`/v1/api/user/register`, userDetails);
      const { access_token, ...user } = response.data;

      dispatch({ type: actionTypes.SIGN_UP, payload: user });
      localStorage.setItem("user", JSON.stringify(user));

      sessionStorage.setItem("access_token", access_token);
      return user;
    } catch (error) {
      dispatch({
        type: actionTypes.ERROR,
        payload: `${error?.response?.data?.error || error.message}`,
      });
    }
  };

  const logout = async (id: string) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const user = await axios.delete(`/v1/api/user/delete/${id}`);
      localStorage.removeItem("user");
      localStorage.removeItem("trips");
      localStorage.removeItem("user-preferences");
      localStorage.removeItem("user");
      localStorage.removeItem("weather");
      sessionStorage.removeItem("access_token");

      dispatch({ type: actionTypes.LOGOUT, payload: user.data });
    } catch (error) {
      dispatch({
        type: actionTypes.ERROR,
        payload: `${error?.response?.data?.error || "Something went wrong."}`,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ state, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
