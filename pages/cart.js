import axios from 'axios';
import withAuth from 'hoc/withAuthentication';
import { parseCookies } from 'nookies';
import Head from 'components/Head';
import CartItem from 'components/CartItem';
import { Grid, Button, Paper, Container } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Snackbar from 'components/Snackbar';
import StripeCheckout from 'react-stripe-checkout';


const Cart = (props) => {
    const { data: { products, user } } = props;
    const [cartItem, setcartItem] = useState([]);
    const [price, setprice] = useState(0);
    const [state, setstate] = useState({
        title: '',
        severity: '',
        open: false
    })

    useEffect(() => {
        setcartItem(products);
        calculatePrice(products);
    }, []);

    const closeSnack = () => setstate({ ...state, open: false });

    const calculatePrice = (products) => {
        let priceItem = 0;
        products.forEach(item => {
            priceItem = priceItem + (item.quantity * item.product.price)
        });
        setprice(priceItem);
    }
    const onToken = async (paymentInfo) => {
        const { user } = parseCookies();
        try {
            const { data: { charge } } = await axios.post('/api/user/cart/checkout', {
                paymentInfo, token: JSON.parse(user).token
            });
            console.log(charge);
            setstate({ title: `Payment successfully made of amount ${charge.amount} Rs.`, severity: 'success', open: true })
        } catch (error) {
            setstate({ title: JSON.stringify(error.response.data), severity: 'error', open: true });
        }
    }

    const deleteProduct = async (product) => {
        try {
            const { user } = parseCookies();
            const { data: { data: { products }} } = await axios.put('/api/user/cart', {product, token: JSON.parse(user).token})
            console.log(products)
            if (products) setcartItem(products);
            calculatePrice(products);
            return setstate({ severity: 'success', title: 'Item removed successfully', open: true });
        } catch (error) {
            setstate({ severity: 'error', title: error.message, open: true });
        }
    }
    
    return (
        <Container style={{ paddingTop: 24 }}>
            <Head title="Cart" />
            <Snackbar {...state} onClose={closeSnack} />
            <Grid container spacing={3}>
                <Grid item md={8} sm={8} xs={12} style={{ padding: 24 }}>
                    {
                       cartItem && cartItem.map((item) => (
                            <CartItem key={item._id} { ...item} deleteProduct={deleteProduct} />
                        ))
                    }
                </Grid>
                <Grid item md={4} sm={4} xs={12}>
                    <Paper elevation={2} style={{ padding: 12 }}>
                        <StripeCheckout
                        name="Next store" 
                        description="Checkout all your cart items"
                        image="/logo.jpg"
                        ComponentClass="div"
                        panelLabel="Pay"
                        amount={price * 100} 
                        currency="INR"
                        stripeKey="pk_test_51HSbWoKj8Sbxr1rGSkmSXabjIy29S4KhPcwUeSFakzhJq1qf2qmIHOoICQHiTqqUDaidsGT5HohMGQmv06ujW1I600jHvqc8NR"
                        email={user.email}
                        shippingAddress
                        billingAddress={false}
                        zipCode={false}
                        allowRememberMe 
                        token={onToken}
                        reconfigureOnUpdate={false}
                        triggerEvent="onClick"
                        >
                        <Button fullWidth variant="contained" color="primary">
                            Pay {price} Rs.
                        </Button>
                        </StripeCheckout>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export const getServerSideProps = async (ctx) => {
    const cookies = parseCookies(ctx);
    const { token } = JSON.parse(cookies.user);
    const { data } = await axios.get(`http://localhost:3000/api/user/cart/${token}`);
    return {
        props: { data: data.data }
    }
}
 
export default withAuth(Cart);