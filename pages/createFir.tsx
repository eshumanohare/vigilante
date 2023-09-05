import React from 'react';
import { useAccount } from 'wagmi';

export default function CreateFir() {
	const { isConnected } = useAccount();
	if (!isConnected)
		return (
			<h2 className='font-bold text-xl text-center w-full'>
				Cannot access without connecting wallet
			</h2>
		);
	return (
		<section className='bg-stone-200 font-montserrat flex flex-col items-center h-screen'>
			<h1 className='text-xl font-bold'>Create FIR</h1>
		</section>
	);
}
