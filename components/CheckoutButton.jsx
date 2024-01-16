
import { useStripe } from '@stripe/react-stripe-js';

const CheckoutButton = ({ productsData }) => {
  const stripe = useStripe();

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productsData }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const session = await response.json();
  
      console.log('Checkout Session:', session);
  
      // Redirect the user to the Stripe checkout page
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <button onClick={handleCheckout}>
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;