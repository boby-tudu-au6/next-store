import { User, Cart } from 'server/modals';
import bcrypt from 'bcrypt';
import initDb from 'server/initDb';

initDb();


export default async (req, res) => {
    try {
        const { phone, email, password } = req.body;
        const user = await User.findOne({ phone, email });
        if (user !== null) return res.status(406).json({ message: 'User already exist with email id' });
        const hash = bcrypt.hashSync(password, 10);
        const newUser = await User.create({ phone, email, password: hash });
        await Cart.create({ user: newUser._id });
        return res.status(201).json({ message: 'Register successfull' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}