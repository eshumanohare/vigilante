import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

const Navbar = () => {
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
