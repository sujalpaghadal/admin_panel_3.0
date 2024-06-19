import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';
import { AuthContext } from './auth-context';
import { AUTH_API } from '../../../config-global';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const JWT = 'jwt';
const JWT_REFRESH = 'jwtRefresh';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const jwt = sessionStorage.getItem(JWT);
      const jwtRefresh = sessionStorage.getItem(JWT_REFRESH);

      if (jwt && jwtRefresh) {
        setSession(jwt, jwtRefresh);
        const url = `${AUTH_API}/api/users/me`;
        const response = await axios.get(url);

        const user = response?.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
              jwt,
              jwtRefresh,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };

    const URL = `https://admin-panel-dmawv.ondigitalocean.app/api/auth/v2/login`;
    const response = await axios.post(URL, data);

    const { user } = response.data.data;
    const { jwt, jwtRefresh } = user.other_info;

    setSession(jwt, jwtRefresh);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          ...user,
          jwt,
          jwtRefresh,
        },
      },
    });
  }, []);

  // REGISTER
  // const register = useCallback(async (email, password, firstName, lastName) => {
  //   const data = {
  //     email,
  //     password,
  //     firstName,
  //     lastName,
  //   };
  //
  //   const response = await axios.post(endpoints.auth.register, data);
  //
  //   const { accessToken, user } = response.data;
  //
  //   sessionStorage.setItem(STORAGE_KEY, accessToken);
  //
  //   dispatch({
  //     type: 'REGISTER',
  //     payload: {
  //       user: {
  //         ...user,
  //         accessToken,
  //       },
  //     },
  //   });
  // }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
    }),
    [login, logout, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
        