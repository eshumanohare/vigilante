'use client'
import './globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import '@rainbow-me/rainbowkit/styles.css';
import Navbar from '../components/Navbar';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {

	const [isConn, setIsConn] = useState(false);
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Providers>
					<Navbar setIsConn={setIsConn}/>
					{isConn && children}
					{!isConn && <h2 className='font-bold text-xl text-center w-full'>
				Cannot access without connecting wallet
			</h2> }
				</Providers>
			</body>
		</html>
	);
}
