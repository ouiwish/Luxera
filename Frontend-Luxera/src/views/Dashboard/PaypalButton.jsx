"use client";

import React, { useEffect } from "react";
import axiosInstance from "@/api/axios";

const PayPalButton = ({ DealID, SignedID , handlerCloseDialog, loadDeals }) => {

    console.log(DealID)
    useEffect(() => {
        if  (window.paypal) {
            // Initialize PayPal Buttons
            window.paypal.Buttons({
                createOrder: async () => {
                    try {
                        // Create PayPal order
                        console.log(DealID)
                        const response = await axiosInstance.post("/paypal/create", {
                            deal_id: DealID,
                        });
                        return response.data.id;
                    } catch (error) {
                        console.error("Error creating PayPal order:", error);
                        alert("Failed to create PayPal order. Please try again.");
                        return ""; // Return an empty string on error
                    }
                },
                onApprove: async (data) => {
                    try {
                        // Capture PayPal order
                        const response = await axiosInstance.post("/paypal/capture", {
                            orderID: data.orderID,
                            signed_id: SignedID,
                        });
                        console.log(response);
                        handlerCloseDialog();
                        loadDeals();
                    } catch (error) {
                        console.error("Error capturing PayPal order:", error);
                        alert("Failed to capture PayPal order. Please try again.");
                    }
                },
                onError: (err) => {
                    console.error("PayPal error:", err);
                    alert("An error occurred with PayPal. Please try again.");
                },
            }).render("#paypal-button-container"); // Render PayPal button
        }
    }, [DealID]); // Dependencies to ensure effect runs when needed

    return <div id="paypal-button-container"></div>; // Container for PayPal button
};

export default PayPalButton;
