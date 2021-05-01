import { User } from 'server/modals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import initDb from 'server/initDb';

initDb();

export default async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send(`User not registered with email ${email}`)
        const match = bcrypt.compareSync(password, user.password);
        if (!match) return res.status(401).send('Unauthorized');
        const token = jwt.sign({ user: user._id }, 'shhhhh');
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}