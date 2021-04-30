import { Cart } from 'server/modals';
import jwt from 'jsonwebtoken';
import initDb from 'server/initDb';

initDb();

export default async (req, res) => {
    try {
        console.log('hello')
        const { token } = req.query;
        const decoded = jwt.verify(token, process.env.SECRET)
        const data = await Cart.find({ user: decoded.user }).populate('user')
        return res.status(200).json({ data });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}