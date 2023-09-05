import React from 'react';
import LinkButton from '../components/LinkButton';
import { useAccount } from 'wagmi';

export default function Page() {
	const { isConnected } = useAccount();
	return (
		<section className='bg-stone-200 font-montserrat flex flex-col items-center h-screen'>
			Main page
			{isConnected && (
				<div className='flex'>
					<LinkButton link={'/createFir'} text={'File new FIR'} />
					<LinkButton link={'/readFir'} text={'Access FIR'} />
				</div>
			)}
		</section>
	);
}
