'use client';

import React, { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { useAccount } from 'wagmi';

const Navbar = ({setIsConn}) => {
	const { isConnected } = useAccount();

	useEffect(() => {
	  setIsConn(isConnected);
	}, [isConnected])
	
	return (
		<nav className='w-full flex justify-between p-3 bg-stone-200'>
			<Link href='/'>
				<img src='/images/logo.png' alt='Logo Image' width={200} />
			</Link>

			<ConnectButton showBalance={false} />
		</nav>
	);
};

export default Navbar;
