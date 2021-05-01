import { Cart } from 'server/modals';
import jwt from 'jsonwebtoken';
import initDb from 'server/initDb';

initDb();

export default async (req, res) => {
    try {
        const { token } = req.query;
        const decoded = jwt.verify(token, process.env.SECRET)
        const data = await Cart.findOne({ user: decoded.user }).populate('user').populate('products.product')
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}