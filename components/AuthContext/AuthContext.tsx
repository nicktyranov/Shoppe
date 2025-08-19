'use client';

import React, {
   createContext,
   useContext,
   useEffect,
   useCallback,
   useMemo,
   useState,
   ReactNode
} from 'react';

export interface ProfileData {
   id?: number;
   email: string;
   address: string;
   name: string;
   restoreToken?: unknown;
   phone: string;
}

type AuthApiSuccess = { access_token: string };
type AuthApiError = { message: string };

export interface UserLogin {
   email: string;
   password: string;
}

export interface UserRegister {
   email: string;
   password: string;
   username?: string;
   mobileNumber?: string;
   address?: string;
}

interface StoredAuth {
   jwt: string;
   email: string;
   expiresAt: number; // ms timestamp
}

interface AuthContextType {
   login: (data: UserLogin) => Promise<AuthApiSuccess | AuthApiError>;
   register: (data: UserRegister) => Promise<AuthApiSuccess | AuthApiError>;
   getProfile: (bearerCode?: string) => Promise<ProfileData | AuthApiError>;
   updateProfile: (
      user: ProfileData,
      bearerCode?: string
   ) => Promise<ProfileData | AuthApiError>;
   restorePassword: (email: string) => Promise<string | undefined>;
   logout: () => void;
   isLogined: boolean;
   auth: StoredAuth | undefined;
}

const STORAGE_KEY = 'shoppe_auth_v2';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const AuthContext = createContext<AuthContextType | null>(null);

function safeDecodeJwtExp(jwt: string): number | null {
   try {
      const [, payloadB64] = jwt.split('.');
      if (!payloadB64) return null;
      const json = JSON.parse(atob(payloadB64));
      if (typeof json?.exp === 'number') {
         // exp is in seconds, convert to ms
         return json.exp * 1000;
      }
      return null;
   } catch {
      return null;
   }
}

function isExpired(expiresAt: number | undefined): boolean {
   return !expiresAt || Date.now() >= expiresAt;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [auth, setAuth] = useState<StoredAuth>();
   const isLogined = useMemo(
      () => (auth ? !isExpired(auth.expiresAt) : false),
      [auth]
   );

   const persist = useCallback((next: StoredAuth | undefined) => {
      setAuth(next);
      if (next) {
         localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } else {
         localStorage.removeItem(STORAGE_KEY);
      }
   }, []);

   const logout = useCallback(() => {
      persist(undefined);
   }, [persist]);

   useEffect(() => {
      try {
         const raw = localStorage.getItem(STORAGE_KEY);
         if (!raw) return;
         const parsed: StoredAuth = JSON.parse(raw);
         if (parsed?.jwt && !isExpired(parsed.expiresAt)) {
            setAuth(parsed);
         } else {
            localStorage.removeItem(STORAGE_KEY);
         }
      } catch {
         localStorage.removeItem(STORAGE_KEY);
      }
   }, []);

   useEffect(() => {
      const onStorage = (e: StorageEvent) => {
         if (e.key !== STORAGE_KEY) return;
         try {
            if (!e.newValue) {
               setAuth(undefined);
            } else {
               const parsed: StoredAuth = JSON.parse(e.newValue);
               setAuth(parsed);
            }
         } catch {
            setAuth(undefined);
         }
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
   }, []);

   const handleApiResponse = async <T,>(
      response: Response
   ): Promise<T | AuthApiError> => {
      let data: unknown;
      try {
         data = await response.json();
      } catch {
         return { message: 'Invalid server response' };
      }
      if (!response.ok) {
         const msg =
            (data as { message?: string })?.message || 'Request failed';
         return { message: msg };
      }
      return data as T;
   };

   const authRequest = useCallback(async (url: string, body: unknown) => {
      const response = await fetch(url, {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify(body)
      });
      return handleApiResponse<AuthApiSuccess>(response);
   }, []);

   const saveAuthData = useCallback(
      (res: AuthApiSuccess, email: string) => {
         const jwt = res.access_token;
         const expFromJwt = safeDecodeJwtExp(jwt);
         const expiresAt =
            expFromJwt && expFromJwt > Date.now()
               ? expFromJwt
               : Date.now() + ONE_DAY_MS;

         const next: StoredAuth = { jwt, email, expiresAt };
         persist(next);
      },
      [persist]
   );

   const register = useCallback(
      async ({
         email,
         password,
         username,
         mobileNumber,
         address
      }: UserRegister) => {
         const data = await authRequest(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/auth/register`,
            { name: username, email, password, phone: mobileNumber, address }
         );

         if ('access_token' in data) {
            saveAuthData(data, email);
         }
         return data;
      },
      [authRequest, saveAuthData]
   );

   const login = useCallback(
      async ({ email, password }: UserLogin) => {
         const data = await authRequest(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/auth/login`,
            { email, password }
         );

         if ('access_token' in data) {
            saveAuthData(data, email);
         }
         return data;
      },
      [authRequest, saveAuthData]
   );

   const _bearer = auth?.jwt
      ? { Authorization: `Bearer ${auth.jwt}` }
      : undefined;

   const getProfile = useCallback(
      async (bearerOverride?: string) => {
         const token = bearerOverride ?? auth?.jwt;
         if (!token) return { message: 'Not authenticated' };

         try {
            const response = await fetch(
               `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/user/profile`,
               { headers: { Authorization: `Bearer ${token}` } }
            );
            return handleApiResponse<ProfileData>(response);
         } catch {
            return { message: 'Network error' };
         }
      },
      [auth?.jwt]
   );

   const updateProfile = useCallback(
      async (user: ProfileData, bearerOverride?: string) => {
         const token = bearerOverride ?? auth?.jwt;
         if (!token) return { message: 'Not authenticated' };

         try {
            const response = await fetch(
               `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/user/profile`,
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                     'Content-Type': 'application/json'
                  },
                  method: 'PATCH',
                  body: JSON.stringify({
                     email: user.email,
                     address: user.address,
                     name: user.name,
                     restoreToken: user.restoreToken,
                     phone: user.phone
                  })
               }
            );
            return handleApiResponse<ProfileData>(response);
         } catch {
            return { message: 'Network error' };
         }
      },
      [auth?.jwt]
   );

   const restorePassword = useCallback(
      async (email: string) => {
         const res = await authRequest(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/auth/restore`,
            { email }
         );
         if (
            'message' in res &&
            res.message === 'Ссылка на восстановление отправлена'
         ) {
            return 'Recovery link has been sent';
         }
         return undefined;
      },
      [authRequest]
   );

   useEffect(() => {
      if (!auth) return;
      const msLeft = auth.expiresAt - Date.now();
      if (msLeft <= 0) {
         logout();
         return;
      }
      const t = setTimeout(logout, msLeft);
      return () => clearTimeout(t);
   }, [auth, logout]);

   const value = useMemo<AuthContextType>(
      () => ({
         login,
         register,
         getProfile,
         updateProfile,
         restorePassword,
         logout,
         isLogined,
         auth
      }),
      [
         login,
         register,
         getProfile,
         updateProfile,
         restorePassword,
         logout,
         isLogined,
         auth
      ]
   );

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
   const ctx = useContext(AuthContext);
   if (!ctx) throw new Error('useAuth must be used within AuthProvider');
   return ctx;
};
