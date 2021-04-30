import { Cart, User } from 'server/modals';
import jwt from 'jsonwebtoken';
import initDb from 'server/initDb';

initDb();

export default async (req, res) => {
    try {
        const { token } = req.query;
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ _id: decoded.user });
        const cartCount = await Cart.countDocuments({ user: decoded.user });
        return res.status(200).json({ user, cartCount });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};