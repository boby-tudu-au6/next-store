import initDb from 'server/initDb';
import { Cart } from 'server/modals';


initDb();


export default async (req, res) => {
    try {
        console.log(req.body)
        if (req.method === 'POST') {
            await Cart.create(req.body);
            return res.status(201).json({ message: 'Item added to cart successfully' });
        }
        return res.status(406).json({ error: 'Method not allowed' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}