'use client';
import { IFormProps } from './Form.props';
import cn from 'classnames';
import Input from '../Input/Input';
import Rating from '../Rating/Rating';
import Button from '../Button/Button';
import CheckBox from '../CheckBox/CheckBox';
import { useEffect, useRef, useState } from 'react';
import { showNotification } from '../Notification/Notification';
import { useAuth } from '../AuthContext/AuthContext';
import styles from './Form.module.css';

type RequestStatus = {
   success: boolean;
   message: string;
};

export default function Form({
   className,
   placeholder,
   icon,
   sku,
   ...props
}: IFormProps) {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [text, setText] = useState('');
   const [checkbox, setCheckbox] = useState(false);
   const [reviewRating, setReviewRating] = useState(0);

   const [errorUsername, setErrorName] = useState('');
   const [errorEmail, setErrorEmail] = useState('');
   const [errorText, setErrorText] = useState('');
   const [errorRating, setErrorRating] = useState('');
   const [validForm, setValidForm] = useState(true);
   const [, setSuccessPost] = useState<boolean>();
   const [ratingKey, setRatingKey] = useState(Date.now());
   const formRef = useRef<HTMLFormElement>(null);
   const [, setStorage] = useState<string>();
   const { auth } = useAuth();

   function setData() {
      const data = {
         username,
         email
      };
      localStorage.setItem('shoppe-form-1', JSON.stringify(data));
      setStorage(JSON.stringify(data));
   }

   useEffect(() => {
      if (auth) {
         setEmail(auth.email);
         setUsername(auth.email);
      }
      if (auth && auth.userName) {
         setUsername(auth.userName);
      }
   }, [auth]);

   useEffect(() => {
      const savedData = localStorage.getItem('shoppe-form-1');
      if (savedData) {
         const data = JSON.parse(savedData);
         setUsername(data.username);
         setEmail(data.email);
      }
   }, []);

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

   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
      if (e.target.value.length < 10) {
         setErrorText('Your text is too short. Add more details, please');
      } else {
         setErrorText('');
      }
   };

   const handleChengeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length < 4) {
         setErrorName('Name must be at least 4 characters long');
      } else {
         setErrorName('');
      }
      setUsername(e.target.value);
   };

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

   function checkEmail(email: string) {
      const regex =
         /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
      return regex.test(email);
   }
   const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (
         username &&
         email &&
         text &&
         reviewRating >= 1 &&
         reviewRating <= 5 &&
         !errorUsername &&
         !errorEmail &&
         !errorText
      ) {
         setValidForm(true);
         setData();

         try {
            const response = await fetch(
               `${process.env.NEXT_PUBLIC_DOMAIN}/api-demo/products/sku/${sku}/review`,
               {
                  headers: {
                     'Content-Type': 'application/json'
                  },
                  method: 'POST',
                  body: JSON.stringify({
                     name: username,
                     email: email,
                     review: text,
                     rating: reviewRating
                  })
               }
            );

            const result: RequestStatus = await response.json();

            if (result.success) {
               setSuccessPost(true);
               showNotification(
                  'Your review has been sent for moderation.',
                  true
               );
               formRef.current?.reset();
               setReviewRating(0);
               setCheckbox(false);
               setText('');
               setRatingKey(Date.now());
            } else {
               setSuccessPost(false);
               showNotification(
                  'There is a problem with the connetction to the server',
                  false
               );
            }
         } catch (error) {
            setSuccessPost(false);
            console.error('Error submitting form:', error);
         }
      } else {
         setValidForm(false);
      }
   };

   return (
      <div className={cn(styles['wrapper'], className)} {...props}>
         <h2 className={styles['heading']}>Add a review</h2>
         <p className={styles['info']}>
            Your email will not be published. Required fields are marked *
         </p>
         <form
            ref={formRef}
            className={styles['form']}
            onSubmit={handleFormSubmit}
         >
            <div>
               <label htmlFor="review" />
               {errorText && <div className={'error'}>{errorText}</div>}
               <textarea
                  name="review"
                  placeholder="Your review*"
                  className={(styles['input-element'], styles.textarea)}
                  id="review"
                  value={text}
                  onChange={handleTextChange}
               />
            </div>

            {!auth && (
               <>
                  <div>
                     <label htmlFor="username" />
                     {errorUsername && (
                        <div className={'error'}>{errorUsername}</div>
                     )}
                     <Input
                        placeholder="Your name*"
                        className={styles['input-element']}
                        name="username"
                        id="username"
                        value={username}
                        onChange={handleChengeUsername}
                     />
                  </div>
                  <div>
                     <label htmlFor="email" />
                     {errorEmail && <div className={'error'}>{errorEmail}</div>}
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
                     <label htmlFor="checkbox" />
                     <CheckBox
                        text="Save data for future reviews"
                        onClick={() => setCheckbox(!checkbox)}
                        id="checkbox"
                        className={styles.checkbox}
                     />
                  </div>
               </>
            )}

            <div className={styles.rating}>
               <p>Your rating*</p>
               <label htmlFor="rating" />
               {errorRating && <div className={'error'}>{errorRating}</div>}
               <Rating
                  key={ratingKey}
                  isEditable
                  id="rating"
                  shareRating={setReviewRating}
                  value={reviewRating}
               />
            </div>
            {!validForm && (
               <div className={'error'}>
                  There is a mistake in this form. Check your input information
               </div>
            )}
            <Button text="SEND" className={styles.button} />
         </form>
      </div>
   );
}
