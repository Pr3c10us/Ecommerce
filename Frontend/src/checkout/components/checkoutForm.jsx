// import React, { useEffect, useState } from "react";
// import {
//   PaymentElement,
//   LinkAuthenticationElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ButtonLoader from "./btnLoader";

// export default function CheckoutForm({
//   firstName,
//   lastName,
//   email2,
//   phone,
//   address,
//   city,
//   state,
//   zip,
//   country,
//   shipping,
//   shippingMethods,
//   orderId,
//   total,
// }) {
//   const navigate = useNavigate();

//   const stripe = useStripe();
//   const elements = useElements();

//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!stripe) {
//       return;
//     }

//     const clientSecret = new URLSearchParams(window.location.search).get(
//       "payment_intent_client_secret",
//     );

//     if (!clientSecret) {
//       return;
//     }

//     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
//       switch (paymentIntent.status) {
//         case "succeeded":
//           toast.success("Payment succeeded!", {
//             style: {
//               border: "1px solid green",
//               padding: "8px 16px",
//               color: "green",
//               borderRadius: "4px",
//             },
//             iconTheme: {
//               primary: "green",
//               secondary: "#FFFAEE",
//             },
//           });
//           break;
//         case "processing":
//           toast.success("Your payment is processing", {
//             style: {
//               border: "1px solid green",
//               padding: "8px 16px",
//               color: "green",
//               borderRadius: "4px",
//             },
//             iconTheme: {
//               primary: "green",
//               secondary: "#FFFAEE",
//             },
//           });
//           break;
//         case "requires_payment_method":
//           toast.success("Your payment was not successful, please try again", {
//             style: {
//               border: "1px solid green",
//               padding: "8px 16px",
//               color: "green",
//               borderRadius: "4px",
//             },
//             iconTheme: {
//               primary: "green",
//               secondary: "#FFFAEE",
//             },
//           });
//           break;
//         default:
//           toast.success("Something went wrong", {
//             style: {
//               border: "1px solid green",
//               padding: "8px 16px",
//               color: "green",
//               borderRadius: "4px",
//             },
//             iconTheme: {
//               primary: "green",
//               secondary: "#FFFAEE",
//             },
//           });
//           break;
//       }
//     });
//   }, [stripe]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js hasn't yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: `${import.meta.env.VITE_STRIPE_REDIRECT_URL}`,
//       },
//     });

//     // This point will only be reached if there is an immediate error when
//     // confirming the payment. Otherwise, your customer will be redirected to
//     // your `return_url`. For some payment methods like iDEAL, your customer will
//     // be redirected to an intermediate site first to authorize the payment, then
//     // redirected to the `return_url`.
//     if (error.type === "card_error" || error.type === "validation_error") {
//       toast.error(error.message, {
//         style: {
//           border: "1px solid red",
//           padding: "8px 16px",
//           color: "red",
//           borderRadius: "4px",
//         },
//       });
//     } else {
//       toast.error("An unexpected error occurred", {
//         style: {
//           border: "1px solid red",
//           padding: "8px 16px",
//           color: "red",
//           borderRadius: "4px",
//         },
//       });
//     }

//     setTimeout(() => {
//       setIsLoading(false);
//     }, 2000);
//   };

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

//   const cancelOrder = async () => {
//     const apiUrl = `${
//       import.meta.env.VITE_BACKEND_URL
//     }orders/${orderId}/customer`;
//     try {
//       await axios.put(apiUrl, { status: "cancelled" });
//       toast.success("Order Canceled!", {
//         style: {
//           border: "1px solid green",
//           padding: "8px 16px",
//           color: "green",
//           borderRadius: "4px",
//         },
//         iconTheme: {
//           primary: "green",
//           secondary: "#FFFAEE",
//         },
//       });
//       navigate("/store", { replace: true });
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to cancel order", {
//         style: {
//           border: "1px solid red",
//           padding: "8px 16px",
//           color: "red",
//           borderRadius: "4px",
//         },
//       });
//     }
//   };

//   return (
//     <form
//       id="payment-form"
//       className="flex flex-col gap-12"
//       onSubmit={handleSubmit}
//     >
//       <LinkAuthenticationElement
//         id="link-authentication-element"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <PaymentElement id="payment-element" options={paymentElementOptions} />
//       <section className="border-2 border-asisDark px-3 py-4 text-sm sm:px-8 md:text-base">
//         <div className="my-2 flex justify-between ">
//           <h2 className="">Contact Information: </h2>
//           <p className="text-right text-xs font-semibold sm:text-left md:text-sm">
//             {` `}
//             {firstName},{lastName},<br className="block sm:hidden"></br>
//             {email2},<br className=":block sm:hidden"></br>
//             {phone}
//           </p>
//         </div>
//         <div className="my-2 flex items-start justify-between gap-x-2">
//           <h2 className="">Shipping Address: </h2>
//           <p className="text-right text-xs font-semibold md:text-sm">
//             {` `}
//             {address},{city},<br className="block sm:hidden"></br>
//             {state},{country},{zip}
//           </p>
//         </div>
//         <div className="flex justify-between">
//           <h2 className="">Shipping Method: </h2>
//           <p className="text-right text-xs font-semibold md:text-sm">
//             {` `}
//             {shippingMethods.name} {shippingMethods.durationInDays} days
//           </p>
//         </div>
//       </section>
//       <section className="flex items-end justify-between gap-4 pl-4 sm:justify-end">
//         <button
//           type="button"
//           onClick={cancelOrder}
//           className="h-min border-b-2 border-asisDark px-4 pb-1.5 text-sm font-bold"
//         >
//           Cancel Order
//         </button>
//         <button
//           disabled={isLoading || !stripe || !elements}
//           id="submit"
//           className="h-11 w-1/2 rounded-md bg-black text-white"
//         >
//           <span id="button-text">
//             {isLoading ? (
//               <ButtonLoader />
//             ) : (
//               `Pay ${Intl.NumberFormat("en-NG", {
//                 style: "currency",
//                 currency: "NGN",
//               }).format(total)}
//           now`
//             )}
//           </span>
//         </button>
//       </section>
//     </form>
//   );
// }
