import WalletLink from "walletlink";
import WalletConnectProvider from "@walletconnect/web3-provider";
import detectEthereumProvider from "@metamask/detect-provider";
import CoinbaseLogo from '../../public/coinbase-logo.jpeg';
import MetaMaskLogo from '../../public/metamask-logo.svg';

const testing = false;

export const web3Config = {
	network           : testing ? "rinkeby"                                   : "mainnet",
	chainId           : testing ? 4                                           : 1,
	contract          : testing ? "": "",
	infuraId          : process.env.NEXT_PUBLIC_INFURA_ID
};

export const web3providers = {
	'custom-metamask': {
		display: {
			logo: MetaMaskLogo.src,
			name: 'MetaMask',
			description: 'Connect to your MetaMask Wallet',
		},
		package: detectEthereumProvider,
		connector: async () => {
			const provider = await detectEthereumProvider();
			if (provider.providers) {
				const metamask = provider.providers.find(p => p.isMetaMask);
				return metamask;
			} else if(provider.isMetaMask){
				return provider;
			}
		},
	},
	walletconnect: {
		package: WalletConnectProvider,
		options: {
			infuraId: web3Config.infuraId,
		},
	},
	'custom-walletlink': {
		display: {
			logo: CoinbaseLogo.src,
			name: 'Coinbase',
			description: 'Connect to Coinbase Wallet',
		},
		options: {
			appName: 'Divine Anarchy',
			networkUrl: `https://mainnet.infura.io/v3/${web3Config.infuraId}`,
			chainId: web3Config.chainId,
		},
		package: WalletLink,
		connector: async (_, options) => {
			const { appName, networkUrl, chainId } = options;
			const walletLink = new WalletLink({ appName });
			const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
			await provider.enable();
			return provider;
		},
	},
}