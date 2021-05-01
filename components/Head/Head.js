import Head from 'next/head';

const HeadComponent = ({ title }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
        </div>
    );
}
 
export default HeadComponent;