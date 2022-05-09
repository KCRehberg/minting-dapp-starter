import '../styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header/Header';
import { Web3Provider } from '../context/web3';

function MintingDapp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Header />
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default MintingDapp;
