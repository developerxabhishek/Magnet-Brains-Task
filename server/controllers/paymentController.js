const paymentModel=require("../models/paymentModel")
const stripe = require("stripe")(
    //This is the Secret Key of our Stripe....
    // I have create this account only for this project that the reaon why i am providing the secret key..
    "sk_test_51PJjyxSDNAiTNrgQVRq6LeMKjbvzZ6vK3TlDOBTMGuZKrbYnOWqVqFICm2wrYO39oYpd9MMOwK6fBCKU1X8sflt300F5eiR3eL"
  );

const makePayment=async (req, res) => {
    const { products ,email} = req.body;
    const lineItems = products.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            images: [product.image],
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      };
    });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });
    res.json({
      id: session.id,
    });
    const newdata=await new paymentModel({
      email:email,
      transactionId:"true",
      paymentStatus:"Success",
      products:products
    })
    await newdata.save()
      console.log(`data saved successfully `)
    
  }
  module.exports={
    makePayment
  }