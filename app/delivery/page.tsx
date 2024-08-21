import styles from './page.module.css';

export default function Delivery() {
   return (
      <div className={styles['wrapper']}>
         <h2 className={styles['heading']}>Delivery Information</h2>
         <p className={styles['text']}>
            <span>1. Shipping Locations</span>
            <br />
            We currently offer shipping within the United States. Unfortunately,
            international shipping is not available at this time.
         </p>
         <p className={styles['text']}>
            <span>2. Shipping Methods and Costs</span>
            <br />
            <strong>Standard Shipping:</strong> Estimated delivery time is 5-7
            business days. Shipping costs will be calculated at checkout based
            on your location and the weight of your order.
            <br />
            <strong>Expedited Shipping:</strong> For faster delivery, we offer
            expedited shipping options. Delivery time is 2-3 business days, with
            additional costs calculated at checkout.
            <br />
            <strong>Free Shipping:</strong> We offer free standard shipping on
            orders over $150.
         </p>
         <p className={styles['text']}>
            <span>3. Order Processing Time</span>
            <br />
            All orders are processed within 1-2 business days. Orders are not
            processed or shipped on weekends or holidays.
         </p>
         <p className={styles['text']}>
            <span>4. Tracking Your Order</span>
            <br />
            Once your order is shipped, you will receive a confirmation email
            with a tracking number. You can use this number to track your
            package until it arrives at your doorstep.
         </p>
         <p className={styles['text']}>
            <span>5. Delivery Issues</span>
            <br />
            If you experience any issues with your delivery, such as a delay or
            a missing package, please contact our customer service team at
            info@shoppe.com or call us at 303-534-1073. We will work with the
            carrier to resolve the issue as quickly as possible.
         </p>
         <p className={styles['text']}>
            <span>6. Undeliverable Packages</span>
            <br />
            In the event that a package is returned to us due to an incorrect
            address or failed delivery attempts, we will contact you to arrange
            reshipment. Please note that additional shipping fees may apply.
         </p>
         <p className={styles['text']}>
            <span>7. Delivery Timeframes</span>
            <br />
            Please note that delivery timeframes are estimates and may vary due
            to unforeseen circumstances such as weather conditions or carrier
            delays.
         </p>
         <p className={styles['text']}>
            <span>Contact Us</span>
            <br />
            For any questions or concerns regarding your delivery, feel free to
            contact us at info@shoppe.com or 303-534-1073. We are here to help!
         </p>
      </div>
   );
}
