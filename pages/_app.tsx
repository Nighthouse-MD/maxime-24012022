import '../styles/globals.scss';
import Layout from '../components/common/Layout';

const MyApp = ({ Component, pageProps }) => {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
