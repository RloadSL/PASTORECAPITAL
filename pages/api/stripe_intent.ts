import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const handler = async (req: any, res: any) => {
  const { amount, payment_intent_id, description, metadata_order } = req.body;
  if (payment_intent_id) {
    try {
      // If a payment_intent_id is passed, retrieve the paymentIntent
      const current_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
      );
      // If a paymentIntent is retrieved update its amount
      if (current_intent) {
        const updated_intent = await stripe.paymentIntents.update(
          payment_intent_id,
          {
            amount: amount,
          }
        );
        res.status(200).json(updated_intent);
        return;
      }
    } catch (e: any) {
      //Catch any error and return a status 500
      if (e.code !== 'resource_missing') {
        const errorMessage =
          e instanceof Error ? e.message : 'Internal server error';
        res.status(500).json({ statusCode: 500, message: errorMessage });
        return;
      }
    }
  }
  try {
    // Create PaymentIntent
    const params = {
      amount: amount,
      currency: 'eur',
      description: description || 'Payment description',
      payment_method_types: [ 'sepa_debit', 'card'],
      metadata_order,
    };
    const payment_intent = await stripe.paymentIntents.create(params);
    //Return the payment_intent object
    res.status(200).json(payment_intent);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error';
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
};

export default handler;