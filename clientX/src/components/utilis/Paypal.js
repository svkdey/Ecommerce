import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
class Paypal extends Component {
    render() {

        const onSuccess = (payment) => {
         
            console.log("Payment successful!", payment);
            this.props.onSuccess(payment)
             // { 
            //     "paid": true, 
            //     "cancelled": false, 
            //     "payerID": "3GFGQ6GNJ4PWA", 
            //     "paymentID": "PAY-0UB74233TB278434KLMYYMVY", 
            //     "paymentToken": "EC-2J270753AK460261B", 
            //     "returnUrl": "https://www.sandbox.paypal.com/?paymentId=PAY-0UB74233TB278434KLMYYMVY&token=EC-2J270753AK460261B&PayerID=3GFGQ6GNJ4PWA", 
            //     "address": { 
            //         "recipient_name": "test buyer", 
            //         "line1": "1 Main St", 
            //         "city": "San Jose", 
            //         "state": "CA", 
            //         "postal_code": "95131", 
            //         "country_code": "US" 
            //     }, 
            //     "email": "svkdey9-buyer@gmail.com" 
            // }
           
        }

        const onCancel = (data) => {
            this.props.transactionCancled(data)
            // console.log('Payment cancelled!', data);
          
        }

        const onError = (err) => {
            this.props.transactionError(err)
            // console.log("Error!", err);
           
        }

        let env = 'sandbox'; // you can set this string to 'production'
        let currency = 'USD'; // you can set this string from your props or state  
        let total = this.props.toPay;  // this is the total amount (based on currency) to charge
      

        const client = {
            sandbox: 'AfbA2-qjz92KhC5IDxvx2UpiIDBmSD7PdlKkZk1-OndNwg7Wc5wVAJKlPWQJcHwioMFz0kn4zOXnbqGW',
            // production: 'YOUR-PRODUCTION-APP-ID',
        }
       
        return (
            <PaypalExpressBtn 
                env={env} 
                client={client} 
                currency={currency} 
                total={total} 
                onError={onError} 
                onSuccess={onSuccess} 
                onCancel={onCancel} 
                style={{
                size: 'large',
                color: 'blue',
                shape: 'rect',
                label: 'checkout'
            }}/>
        );
  }
}

export default Paypal;
