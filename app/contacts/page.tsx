import styles from './page.module.css';

export default function Contacts() {
   return (
      <div className={styles['wrapper']}>
         <h2 className={styles['heading']}>Contact Us</h2>
         <p className={styles['text']}>
            We are here to help you find the perfect piece of jewelry to
            celebrate your special moments. Whether you have questions about our
            collections, need assistance with an order, or are looking for
            expert advice, feel free to reach out to us.
         </p>

         <p className={styles['text']}>
            <span>Store Location:</span>
            <br /> 910 16th St., Suite 400 Denver, CO 80202
         </p>
         <p className={styles['text']}>
            <span>Phone:</span>
            <br /> 303-534-1073
         </p>
         <p className={styles['text']}>
            <span>Store Hours:</span>
            <br /> Monday - Thursday: 10:00 AM - 5:00 PM <br />
            Friday: 10:00 AM - 3:00 PM
            <br /> Weekends and Evenings by Appointment
         </p>
      </div>
   );
}
