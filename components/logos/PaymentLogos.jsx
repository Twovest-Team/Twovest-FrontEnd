import Image from "next/image";
import GooglePayLogo from "@/public/static/images/payments/google_pay_logo.svg";
import PaypalLogo from "@/public/static/images/payments/paypal_logo.svg";
import MBWayLogo from "@/public/static/images/payments/mbway_logo.svg";
import MastercardLogo from "@/public/static/images/payments/mastercard_logo.svg";


export default function PaymentLogos() {
    return (
      <div className="flex flex-wrap justify-center">
        <Image src={GooglePayLogo} alt="Logótipo do GooglePay" width={43} height={17} styles={{width: 'auto', height: 'auto'}}  className="footer--logos-payment mr-12"/>
        <Image src={PaypalLogo} alt="Logótipo do Paypal" width={29} height={18} styles={{width: 'auto', height: 'auto'}} className="footer--logos-payment mr-12"/>
        <Image src={MBWayLogo} alt="Logótipo do MBWay" width={30} height={19} styles={{width: 'auto', height: 'auto'}} className="footer--logos-payment mr-12"/>
        <Image src={MastercardLogo} alt="Logótipo da Mastercard" width={29} height={18} styles={{width: 'auto', height: 'auto'}} />
      </div>
    );
  }
  