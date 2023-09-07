'use client';

import React from 'react';
import {
	RainbowKitProvider,
	getDefaultWallets,
	darkTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

const { connectors } = getDefaultWallets({
	appName: 'Vigilante',
	projectId: 'e25b6bd0f1976d16cb62749b0c7cb0a0',
	chains,
});

const demoAppInfo = {
	appName: 'Rainbowkit Demo',
};

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient,
});

const Providers = ({ children }) => {
	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider
				chains={chains}
				appInfo={demoAppInfo}
				modalSize='compact'
				theme={darkTheme({
					accentColor: '#09090b',
					accentColorForeground: 'white',
					borderRadius: 'small',
					fontStack: 'system',
					overlayBlur: 'small',
				})}>
				{children}
			</RainbowKitProvider>
		</WagmiConfig>
	);
};

export default Providers;
