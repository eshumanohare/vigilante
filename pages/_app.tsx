import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import {
	getDefaultWallets,
	RainbowKitProvider,
	darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }: AppProps) {
	const { chains, publicClient } = configureChains(
		[mainnet, polygon, optimism, arbitrum, base, zora],
		[publicProvider()]
	);

	const { connectors } = getDefaultWallets({
		appName: 'Vigilant',
		projectId: '101',
		chains,
	});

	const wagmiConfig = createConfig({
		autoConnect: true,
		connectors,
		publicClient,
	});

	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider
				chains={chains}
				theme={darkTheme({
					accentColor: '#09090b',
					accentColorForeground: 'white',
					borderRadius: 'small',
					fontStack: 'system',
					overlayBlur: 'small',
				})}>
					<Navbar/>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
