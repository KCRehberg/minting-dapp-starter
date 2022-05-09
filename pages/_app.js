import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header/Header';

function Sweydaverse({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default Sweydaverse;
