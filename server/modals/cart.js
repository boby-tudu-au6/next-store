import { Schema, model, models } from 'mongoose';

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    }
});

export default models.cart || model('cart', cartSchema);