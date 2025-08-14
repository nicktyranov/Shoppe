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
import { checkEmail } from '@/helpers/emailHelper';
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
   const [errorRating] = useState('');
   const [validForm, setValidForm] = useState(true);
   const formRef = useRef<HTMLFormElement>(null);
   const [, setStorage] = useState<string>();
   const { auth } = useAuth();

   function setData() {
      if (!checkbox) return;
      const data = { username, email };
      localStorage.setItem('shoppe-form-1', JSON.stringify(data));
      setStorage(JSON.stringify(data));
   }

   useEffect(() => {
      if (!auth) return;
      const emailFromAuth = auth.email ?? '';
      const nameFromEmail = emailFromAuth ? emailFromAuth.split('@')[0] : '';
      setEmail((prev) => (prev ? prev : emailFromAuth));
      setUsername((prev) => (prev ? prev : nameFromEmail));
   }, [auth]);

   useEffect(() => {
      const savedData = localStorage.getItem('shoppe-form-1');
      if (savedData) {
         try {
            const data = JSON.parse(savedData);
            if (typeof data?.username === 'string') setUsername(data.username);
            if (typeof data?.email === 'string') setEmail(data.email);
         } catch {
            // ignore broken saved data
         }
      }
   }, []);

   useEffect(() => {
      if (email.length > 1) {
         setErrorEmail(checkEmail(email) ? '' : 'Invalid email. Try again');
      } else {
         setErrorEmail('');
      }
   }, [email]);

   const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const v = e.target.value;
      setText(v);
      setErrorText(
         v.length < 10 ? 'Your text is too short. Add more details, please' : ''
      );
   };

   const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setUsername(v);
      setErrorName(
         v.length < 4 ? 'Name must be at least 4 characters long' : ''
      );
   };

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };

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
                  headers: { 'Content-Type': 'application/json' },
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
               showNotification(
                  'Your review has been sent for moderation.',
                  true
               );
               formRef.current?.reset();
               setReviewRating(0);
               setCheckbox(false);
               setText('');
               setUsername('');
               setEmail('');
            } else {
               showNotification(
                  'There is a problem with the connetction to the server',
                  false
               );
            }
         } catch (error) {
            showNotification(
               'There is a problem with the connetction to the server',
               false
            );
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
                  className={cn(styles['input-element'], styles.textarea)}
                  id="review"
                  value={text}
                  onChange={handleTextChange}
               />
            </div>

            {!auth?.email && (
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
                        onChange={handleChangeUsername}
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
                        id="checkbox"
                        className={styles.checkbox}
                        checked={checkbox}
                        onChange={(e) => setCheckbox(e.currentTarget.checked)}
                     />
                  </div>
               </>
            )}

            <div className={styles.rating}>
               <p>Your rating*</p>
               <label htmlFor="rating" />
               {errorRating && <div className={'error'}>{errorRating}</div>}
               <Rating
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

            <Button text="SEND" type="submit" className={styles.button} />
         </form>
      </div>
   );
}
