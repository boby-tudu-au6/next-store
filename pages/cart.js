import axios from 'axios';
import withAuth from 'hoc/withAuthentication';
import { parseCookies } from 'nookies';
import Head from 'components/Head';


const Cart = (props) => {
    console.log(props)
    
    return (
        <div>
            <Head title="Cart" />
            <h1>cart page</h1>
        </div>
    );
}

export const getServerSideProps = async (ctx) => {
    const cookies = parseCookies(ctx);
    const { token } = JSON.parse(cookies.user)
    console.log(token)
    const { data } = await axios.get(`http://localhost:3000/api/user/cart/${token}`)
        console.log(data)
        return {
            props: { data: data.data }
        }
}
 
export default withAuth(Cart);