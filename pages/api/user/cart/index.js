import initDb from 'server/initDb';
import { Cart } from 'server/modals';
import authenticate from 'server/authenticate';
import jwt from 'jsonwebtoken';


initDb();


const addCartItem = async (req, res) => {
    try {
        const { user } = jwt.verify(req.body.token, process.env.SECRET);
        const { product, quantity } = req.body;
        const cartItem = await Cart.findOne({ user });
        const itemExist = cartItem.products.some(item => {
            return item.product == product
        });
        if (itemExist) {
            await Cart.findOneAndUpdate(
                { _id: cartItem._id, "products.product": product },
                { $inc: { "products.$.quantity": quantity }}
            );
        } else {
            const newProduct = { quantity, product };
            await Cart.findByIdAndUpdate({ _id: cartItem._id },
                { $push: { products: newProduct } } 
            );
        }
        return res.status(200).json({ message: 'Item added to cart' });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

const getCartItem = async (req, res) => {
    try {
        const { user } = jwt.verify(req.body.token, process.env.SECRET);
        const data = await Cart.find({ user });
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const { token, product } = req.body;
        const { user } = jwt.verify(token, process.env.SECRET);
        const data = await Cart.findOneAndUpdate(
            { user },
            { $pull: { products: { product }}},
            { new: true }).populate('products.product');
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export default function(req, res) {
    switch (req.method) {
        case "GET": return getCartItem(req, res);
        case "POST": return addCartItem(req, res);
        case "PUT": return removeCartItem(req, res);
        default : return res.status(404).json({ error: 'Method not allowed'})
    }
}

