import Stripe from 'stripe';
import jwt from 'jsonwebtoken';
import { Cart, User } from 'server/modals';
import { v4 as uuidv4 } from 'uuid';


const stripe = Stripe(process.env.STRIPE_SECRET);

const calculatePrice = (products) => {
    let priceItem = 0;
    products.forEach(item => {
        priceItem = priceItem + (item.quantity * item.product.price)
    });
    return priceItem;
}

export default async (req, res) => {
    try {
        const { token, paymentInfo } = req.body;
        const { user } = jwt.verify(token, process.env.SECRET);
        const userdata = await Cart.findOne({ user }).populate("products.product");
        const amount = calculatePrice(userdata.products);
        const prevCustomer = await stripe.customers.list({
            email: paymentInfo.email
          });
        const isExistingCustomer = prevCustomer.data.length > 0;
        let newCustomer;
        if  (!isExistingCustomer) {
            newCustomer = await stripe.customers.create({
                email: paymentInfo.email,
                source: paymentInfo.id
             });
        }
        const charge = await stripe.charges.create({
            amount,
            currency: 'INR',
            receipt_email: paymentInfo.email,
            customer: isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
            description: 'You made a payment'
        }, { idempotencyKey: uuidv4() });
        return res.status(200).json({ charge });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
