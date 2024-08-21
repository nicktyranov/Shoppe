'use client';

import React, {
   createContext,
   useContext,
   useState,
   ReactNode,
   useEffect,
   useCallback
} from 'react';

export interface ProfileData {
   id?: number;
   email: string;
   passwordHash?: string;
   address: string;
   name: string;
   restoreToken?: any;
   phone: string;
}

export interface UserData {
   jwt: string;
   expiredAt?: number;
   userName?: string;
   email: string;
   password: string;
   phone?: string;
   address?: string;
}

export interface User {
   email: string;
   password: string;
   phone?: string;
   address?: string;
   saveData?: boolean;
}

interface AuthContextType {
   login: (data: User) => Promise<{ message?: string; access_token?: string }>;
   register: (
      email: string,
      password: string,
      username?: string,
      mobileNumber?: string,
      address?: string
   ) => Promise<{ message?: string; access_token?: string }>;
   getProfile: (bearerCode: string) => Promise<ProfileData | { message: any }>;
   updateProfile: (
      bearerCode: string,
      user: ProfileData
   ) => Promise<ProfileData | { message: any }>;
   restorePassword: (email: string) => Promise<string | undefined>;
   logout: () => void;
   isLogined: boolean;
   auth: UserData | undefined;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [auth, setAuth] = useState<UserData>();
   const [isLogined, setIsLogined] = useState<boolean>(false);

   const logout = useCallback(() => {
      setIsLogined(false);
      localStorage.removeItem('shoppe_jwt');
   }, []);

   useEffect(() => {
      const storedJWT = JSON.parse(localStorage.getItem('shoppe_jwt') || '[]');
      setAuth(storedJWT);
   }, []);

   useEffect(() => {
      console.log(`isLogined - ${isLogined}`);
   }, [isLogined]);

   useEffect(() => {
      const checkAuth = () => {
         if (auth?.expiredAt && auth?.expiredAt > new Date().getTime()) {
            setIsLogined(true);
         } else if (auth?.jwt) {
            setIsLogined(true);
         } else {
            logout();
         }
      };

      if (auth) {
         checkAuth();
      }
   }, [auth, logout]);

   const handleApiResponse = async (response: Response) => {
      const data = await response.json();
      if (!response.ok) {
         console.error(`Error: ${data.message}`);
         return { message: data.message || 'Request failed' };
      }
      return data;
   };

   const saveAuthData = (
      data: { access_token: string },
      email: string,
      password: string
   ) => {
      const userInfo = {
         jwt: data.access_token,
         email,
         password,
         expiredAt: new Date().getTime() + 100000
      };
      setAuth(userInfo);
      setIsLogined(true);
      localStorage.setItem('shoppe_jwt', JSON.stringify(userInfo));
   };

   const authRequest = async (url: string, body: any) => {
      const response = await fetch(url, {
         headers: { 'Content-Type': 'application/json' },
         method: 'POST',
         body: JSON.stringify(body)
      });
      return handleApiResponse(response);
   };

   const register = async (
      email: string,
      password: string,
      username?: string,
      mobileNumber?: string,
      address?: string
   ) => {
      const data = await authRequest(
         `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/auth/register`,
         {
            name: username,
            email,
            password,
            phone: mobileNumber,
            address
         }
      );
      if (data.access_token) {
         saveAuthData(data, email, password);
      }
      return data;
   };

   const login = useCallback(async (user: User) => {
      const data = await authRequest(
         `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/auth/login`,
         {
            email: user.email,
            password: user.password
         }
      );
      if (data.access_token) {
         saveAuthData(data, user.email, user.password);
      }
      return data;
   }, []);

   const getProfile = async (bearerCode: string) => {
      try {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/user/profile`,
            {
               headers: {
                  Authorization: `Bearer ${bearerCode}`
               }
            }
         );

         return handleApiResponse(response);
      } catch (error) {
         console.error('Network error:', error);
         return { message: 'Network error' };
      }
   };

   const updateProfile = async (bearerCode: string, user: ProfileData) => {
      try {
         const response = await fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/user/profile`,
            {
               headers: {
                  Authorization: `Bearer ${bearerCode}`,
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

         return handleApiResponse(response);
      } catch (error) {
         console.error('Network error:', error);
         return { message: 'Network error' };
      }
   };

   const restorePassword = async (email: string) => {
      const response = await authRequest(
         `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/auth/restore`,
         {
            email
         }
      );

      if (response.message === 'Ссылка на восстановление отправлена') {
         return 'Recovery link has been sent';
      } else {
         return undefined;
      }
   };

   return (
      <AuthContext.Provider
         value={{
            login,
            logout,
            register,
            isLogined,
            auth,
            getProfile,
            updateProfile,
            restorePassword
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useCart must be used within an AuthContext.Provider');
   }
   return context;
};
