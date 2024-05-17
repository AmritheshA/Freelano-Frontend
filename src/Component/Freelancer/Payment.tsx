import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axiosInstance from "@/Config/AxiosConfig/axiosConfig";

function Payment() {


    const stripePromise = loadStripe('pk_test_51PGyKmSC2aXbbdUbWyklSfxBm7obTu48k2PvOXYlfsyfDK1BZCj6k2MXlK9fd6V3Ei5jfUVHeOJL6uS2UZUjk6sp00NzAlAq2e');


    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await axiosInstance.post('/api/v1/payment/create-intent', {
                    amount: 1000000,
                    currency: 'INR',
                });

                window.location.href = response.data;

            } catch (error) {
                console.error('Error creating payment intent:', error);
            }
        };

        createPaymentIntent();
    }, []);

    return (
        <>
            <h1>React Stripe and the Payment Element</h1>
        </>
    );
}

export default Payment;