import CreditCardIcon from '@mui/icons-material/CreditCard';
import MBWay from "./icons/MbWay.svg";
import GooglePay from './icons/gpay.svg';
import Paypal from "./icons/paypal.svg";
import Image from 'next/image';


const iconMapping = {
    "Cartão de crédito": <CreditCardIcon />,

    "MBWay": <Image src={MBWay} width={50} height={50} alt="MBWAY icon" />,

    "Google Pay": <Image src={GooglePay} width={50} height={50} alt="Google pay icon"  />,

    "Paypal": <Image src={Paypal} width={30} height={30} alt="Paypal icon" />,
  };
  
  export const PaymentButtons = ({ method }) => {
    const icon = iconMapping[method];
  
    if (!icon) {
      return null;
    }
  
    return (
      <div className="flex my-4 p-6 border border-grey rounded">
        {icon}
        <div className='ml-4 caption'>{method}</div>
      </div>
    );
  };