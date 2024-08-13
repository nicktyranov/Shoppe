'use client';
import { IShippingFormProps } from './ShippingForm.props';
import cn from 'classnames';
import styles from './ShippingForm.module.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../CartContext/CartContext';

type ErrorResponse = {
   statusCode: number;
   message: string;
   error: string;
};

type SuccessResponse = {
   access_token: string;
};

type ApiResponse = ErrorResponse | SuccessResponse;

type ErrorResponseCreateOrder = {
   message: string[];
   error: string;
   statusCode: number;
};

type SuccessResponseCreateOrder = {
   id: number;
   userId: number;
   status: string;
   createdAt: string;
   data: ServerOrderData[];
};

type ServerOrderData = {
   name: string;
   count: number;
   price: number;
};

type ApiResponseCreateOrder =
   | ErrorResponseCreateOrder
   | SuccessResponseCreateOrder;

export default function ShippingForm({
   className,
   placeholder,
   isLogined,
   ...props
}: IShippingFormProps) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [username, setUsername] = useState('');
   const [address, setAddress] = useState('');
   const [mobileNumber, setMobileNumber] = useState('');
   const [submitBtn, setSubmitBtn] = useState(false);
   const [errorUsername, setErrorUsername] = useState('');
   const [errorEmail, setErrorEmail] = useState('');
   const [errorPassword, setErrorPassword] = useState('');
   const [errorAddress, setErrorAddress] = useState('');
   const [errorMobile, setErrorMobile] = useState('');
   const [errorSubmit, setErrorSubmit] = useState('');
   const [validForm, setValidForm] = useState(true);
   const [successPost, setSuccessPost] = useState<boolean>();
   const formRef = useRef<HTMLFormElement>(null);
   const { cart } = useCart();
   const totalCost = cart.reduce((sum, x) => sum + x.price * x.amount, 0);

   const isLoginedStatus = isLogined || false;

   useEffect(() => {
      if (validForm && cart.length > 0) {
         setSubmitBtn(true);
      } else {
         setSubmitBtn(false);
      }
   }, [validForm, cart]);

   useEffect(() => {
      if (
         email &&
         password &&
         username &&
         address &&
         mobileNumber &&
         !errorUsername &&
         !errorEmail &&
         !errorPassword &&
         !errorMobile &&
         !errorUsername
      ) {
         setValidForm(true);
      } else {
         setValidForm(false);
      }
   }, [
      validForm,
      errorEmail,
      errorMobile,
      errorUsername,
      errorPassword,
      email,
      password,
      username,
      address,
      mobileNumber
   ]);

   useEffect(() => {
      if (totalCost === 0) {
         setValidForm(false);
      }
   }, [totalCost]);

   useEffect(() => {
      if (email.length < 1) {
         return;
      }
      if (checkEmail(email)) {
         setErrorEmail('');
      } else {
         setErrorEmail('Invalid email. Try again');
      }
   }, [email]);

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   function checkEmail(email: string) {
      const regex =
         /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
      return regex.test(email);
   }

   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (e.target.value.length < 5) {
         setErrorPassword(
            'Your passwordext is too short. At least 6 characters long '
         );
      } else {
         setErrorPassword('');
      }
   };

   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 4) {
         setErrorAddress('Address must be at least 4 characters long');
      } else {
         setErrorAddress('');
      }
      setAddress(e.target.value);
   };

   const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputData = e.target.value.trim();
      if (inputData.length < 4) {
         setErrorUsername('Name must be at least 4 characters long');
      } else if (!/^[a-zA-Z]+$/.test(inputData)) {
         setErrorUsername('Name must contain only letters');
      } else {
         setErrorUsername('');
      }
      setUsername(e.target.value);
   };

   const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputData = e.target.value.trim();
      if (inputData.length !== 10) {
         setErrorMobile('Mobile must be at least 10 characters long');
      } else if (!/^\d+$/.test(inputData)) {
         setErrorMobile('Mobile must contain only numbers');
      } else {
         setErrorMobile('');
      }
      setMobileNumber(e.target.value);
   };

   const registerUser = async (
      email: string,
      password: string,
      username: string,
      mobileNumber: string,
      address: string
   ): Promise<ApiResponse> => {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/auth/register`,
         {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
               name: username,
               email,
               password,
               phone: mobileNumber,
               address
            })
         }
      );
      return await response.json();
   };

   const loginUser = async (
      email: string,
      password: string
   ): Promise<ApiResponse> => {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/auth/login`,
         {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ email, password })
         }
      );
      return await response.json();
   };

   const createOrder = async (
      token: string,
      orderItems: ServerOrderData[]
   ): Promise<ApiResponseCreateOrder> => {
      const response = await fetch(
         `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/order`,
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify({ items: orderItems })
         }
      );
      return await response.json();
   };

   const hasValidationError =
      !validForm && (email || password || username || address || mobileNumber);
   const hasNoProductsInCart = cart.length < 1 && validForm;
   const validationErrorMessage = hasValidationError
      ? 'There is a mistake in this form. Check your input information'
      : '';
   const noProductsErrorMessage = hasNoProductsInCart
      ? 'No products in the cart. First, add products to the cart.'
      : '';

   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!validForm) {
         setValidForm(false);
         return;
      }

      try {
         // const registerResult = await registerUser(
         //    email,
         //    password,
         //    username,
         //    mobileNumber,
         //    address
         // );
         // if ('access_token' in registerResult) {
         //    localStorage.setItem(
         //       'Shoppe_access_token',
         //       registerResult.access_token
         //    );
         // } else {
         //    console.error(
         //       `Error ${registerResult.statusCode}: ${registerResult.message}`
         //    );
         //    setErrorSubmit(`${registerResult.message}`);
         //    return;
         // }

         const loginResult = await loginUser(email, password);
         if ('access_token' in loginResult) {
            console.log('Access token:', loginResult.access_token);
            localStorage.setItem(
               'Shoppe_access_token',
               loginResult.access_token
            );

            const orderItems = cart.map((item) => ({
               name: item.name,
               count: item.amount,
               price: item.price
            }));
            const orderResult = await createOrder(
               loginResult.access_token,
               orderItems
            );
            if ('id' in orderResult) {
               console.log('Order created successfully:', orderResult);
               setSuccessPost(true);
            } else {
               console.error('Error creating order:', orderResult);
            }
         } else {
            console.error(
               `Error ${loginResult.statusCode}: ${loginResult.message}`
            );
            setErrorSubmit(`${loginResult.message}`);
         }
      } catch (error) {
         console.error('Error handling form submission:', error);
         setSuccessPost(false);
      }
   };

   return (
      <div className={cn(styles['wrapper'], className)} {...props}>
         {/* <h2 className={styles['heading']}>Shipping and Contact information</h2> */}
         <form
            ref={formRef}
            className={styles['form']}
            onSubmit={handleFormSubmit}
         >
            {!isLoginedStatus && (
               <div className={styles['guest-user']}>
                  <div>
                     <label htmlFor="email" />
                     {errorEmail && (
                        <div className={styles.error}>{errorEmail}</div>
                     )}
                     <Input
                        placeholder="Your email*"
                        className={styles['input-element']}
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                     />
                  </div>

                  <div>
                     <label htmlFor="password" />
                     {errorPassword && (
                        <div className={styles.error}>{errorPassword}</div>
                     )}
                     <Input
                        placeholder="Your password*"
                        type="password"
                        className={styles['input-element']}
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                     />
                  </div>
               </div>
            )}

            <div>
               <label htmlFor="address" />
               {errorAddress && (
                  <div className={styles.error}>{errorAddress}</div>
               )}
               <Input
                  placeholder="Your address*"
                  className={styles['input-element']}
                  name="address"
                  id="address"
                  value={address}
                  onChange={handleAddressChange}
               />
            </div>

            <div>
               <label htmlFor="username" />
               {errorUsername && (
                  <div className={styles.error}>{errorUsername}</div>
               )}
               <Input
                  placeholder="Your name*"
                  className={styles['input-element']}
                  name="username"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
               />
            </div>

            <div>
               <label htmlFor="mobileNumber" />
               {errorMobile && (
                  <div className={styles.error}>{errorMobile}</div>
               )}
               <Input
                  placeholder="Your mobile number*"
                  className={styles['input-element']}
                  name="mobileNumber"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={handleMobileChange}
               />
            </div>

            <div className={styles.summary}>
               <p>Summary</p>
               <p>
                  <span>Total cost</span>
                  <span>${totalCost}</span>
               </p>
            </div>
            <div>
               {(validationErrorMessage || noProductsErrorMessage) && (
                  <div className={styles.error}>
                     {validationErrorMessage}
                     {noProductsErrorMessage}
                  </div>
               )}
               {errorSubmit && (
                  <div className={styles.error}>{errorSubmit}</div>
               )}
               <Button
                  text="SEND"
                  className={cn(styles.button, {
                     [styles['button-disabled']]: !validForm || cart.length < 1
                  })}
                  disabled={!validForm || cart.length < 1}
               />
            </div>
         </form>
      </div>
   );
}
