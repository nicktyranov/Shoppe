import cn from 'classnames';
import styles from './page.module.css';

export default function Terms() {
   return (
      <div className={styles['wrapper']}>
         <h2 className={styles['heading']}>Terms & Conditions</h2>
         <p className={styles['text']}>
            <span>Introduction</span>
            <br />
            Welcome to Shoppe. By accessing or using our website and services,
            you agree to be bound by the following terms and conditions. Please
            read these terms carefully before making any purchases or using our
            services.
         </p>

         <p className={styles['text']}>
            <span>1. General Information</span>
            <br /> The website is owned and operated by Shoppe, located in the
            United States, Colorado. All content, products, and services
            available through the site are subject to these terms and
            conditions.
         </p>
         <p className={styles['text']}>
            <span>2. Orders and Payment</span>
            <br /> All prices listed on our website are in U.S. Dollars (USD)
            and include applicable taxes unless otherwise stated. We accept
            major credit cards, PayPal, and other standard payment methods. By
            placing an order, you agree that all information provided by you is
            accurate and complete. We reserve the right to refuse or cancel any
            order at our discretion.
         </p>
         <p className={styles['text']}>
            <span>3. Shipping and Delivery</span>
            <br /> We offer shipping within the United States. Shipping costs
            will be calculated at checkout based on your location. Estimated
            delivery times are provided for your convenience and may vary
            depending on the shipping method selected and location. Shoppe is
            not responsible for delays caused by the shipping carrier or customs
            clearance.
         </p>
         <p className={styles['text']}>
            <span>4. Returns and Refunds</span>
            <br /> We accept returns within 30 days of delivery, provided the
            item is in its original condition and packaging. Custom or
            personalized items are non-refundable unless defective. To initiate
            a return, please contact our customer service at the store.
         </p>
         <p className={styles['text']}>
            <span>5. Product Descriptions</span>
            <br /> We strive to ensure that all product descriptions, images,
            and prices are accurate. However, we do not warrant that the
            descriptions or other content on this website are error-free. If a
            product offered by Shoppe is not as described, your sole remedy is
            to return it in unused condition.
         </p>
         <p className={styles['text']}>
            <span>6. Intellectual Property</span>
            <br /> All content on this website, including but not limited to
            text, images, graphics, and logos, is the property of Shoppe and is
            protected by applicable intellectual property laws. You may not use,
            reproduce, or distribute any content without our prior written
            consent.
         </p>
         <p className={styles['text']}>
            <span>7. Privacy Policy</span>
            <br /> Your privacy is important to us. Please review our Privacy
            Policy to understand how we collect, use, and protect your personal
            information.
         </p>
         <p className={styles['text']}>
            <span>8. Limitation of Liability</span>
            <br /> Shoppe shall not be liable for any damages that result from
            the use of, or inability to use, the materials on this site or the
            performance of the products, even if Shoppe has been advised of the
            possibility of such damages.
         </p>
         <p className={styles['text']}>
            <span>9. Changes to Terms</span>
            <br /> We reserve the right to update or modify these terms and
            conditions at any time without prior notice. Your continued use of
            the website following any changes constitutes your acceptance of the
            new terms.
         </p>
         <p className={styles['text']}>
            <span>10. Governing Law</span>
            <br /> These terms and conditions are governed by and construed in
            accordance with the laws of the State of Colorado, USA, and you
            irrevocably submit to the exclusive jurisdiction of the courts in
            that location.
         </p>
         <p className={styles['text']}>
            <span>Contact Us</span>
            <br /> If you have any questions about these Terms & Conditions,
            please contact us at:
            <br /> Email: info@shoppe.com
            <br /> Phone: 303-534-1073
            <br /> Address: 910 16th St., Suite 400 Denver, CO 80202
         </p>
      </div>
   );
}
