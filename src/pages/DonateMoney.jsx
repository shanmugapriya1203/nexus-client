import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { BASE_URL } from "../api/apiservice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51N11ZFSAH67u0bA3HrmzqyuwVK06zUT7Hp0l59ESd1tJZuUDWJyqllzArAaMUnzNMKfadJX1exz7sWrBrZ3cCnpv002ChIWkyJ"
);

const DonateForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setError(null);
          setLoading(false);
          toast.success("Donation successful! Thank you for your generosity.");
          setTimeout(() => {
            window.history.back();
          }, 2000);
        }
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <CardElement />
      <Label htmlFor="amount">Amount:</Label>
      <TextInput
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button color="success" type="submit" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Donate"}
      </Button>
    </form>
  );
};

const DonateMoney = () => {
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/stripe/create-payment-intent`,
          {
            amount: 5000,
          }
        );
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-between">
      <div className="w-full md:w-1/2 p-4 md:pr-8">
        <img src="/svg.svg" alt="Your SVG" className="w-full" />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <Elements stripe={stripePromise}>
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Donate Money</h2>
            {clientSecret ? (
              <DonateForm clientSecret={clientSecret} />
            ) : (
              <p>Loading...</p>
            )}
            <Button
              color="primary"
              className="flex items-center mb-4"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </div>
        </Elements>
      </div>
    </div>
  );
};

export default DonateMoney;
