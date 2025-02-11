import axios from "axios";
import React, { useEffect, useState } from "react";

const Premium = () => {
  const [isPremium, setisPremium] = useState(false);
  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        "http://localhost:4444/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );
      console.log(order);
      console.log(order.data);
      const { amount, keyId, currency, notes, orderId } = order.data;
      const options = {
        key: keyId,
        amount,
        currency,
        name: "DeTinder",
        description: "Develop New Relations",
        image: "https://example.com/your_logo",
        order_id: orderId,
        // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
        prefill: {
          name: notes.firstname + " " + notes.lastname,
          email: "notes.emailid",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async function (response) {
          console.log("Payment Success:", response);

          // ✅ Now send the payment_id and order_id to verify
          await verifyPremiumUser(response.razorpay_payment_id, orderId);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // after creating order we need to open dialog box
    } catch (err) {
      console.log(err.message);
    }
  };
  const verifyPremiumUser = async (paymentId, orderId) => {
    const res = await axios.post(
      "http://localhost:4444/premium/verify",
      { payment_id: paymentId, order_id: orderId },
      { withCredentials: true }
    );
    if (res.data.success) {
      setisPremium(true);
    }
  };
  //const ifPremium =  async()
  useEffect(() => {
    verifyPremiumUser();
  }, []);
  return isPremium ? (
    <p className="text-center">Congratulations,You are Premium User.</p>
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid  flex-grow place-items-center p-10">
          <h1 className="font-bold text-3xl mb-2">Silver Membership</h1>
          <ul>
            <li>Chat with Other People</li>
            <li>100 Connections Requests per day</li>
            <li> Blue Tick</li>
          </ul>
          <button
            className="bg-primary rounded-md p-2 mt-4"
            onClick={() => handleBuyClick("silver")}
          >
            Buy Silver Membership
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid  flex-grow place-items-center p-10">
          <h1 className="font-bold text-3xl mb-2">Gold Membership</h1>
          <ul>
            <li>Chat with Other People</li>
            <li>Infinite Connections Requests per day</li>
            <li> Blue Tick</li>
          </ul>
          <button
            className="bg-secondary rounded-md p-2 mt-4"
            onClick={() => handleBuyClick("gold")}
          >
            Buy Gold Membership
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
