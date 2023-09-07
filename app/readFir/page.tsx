import FIRForm from '../../components/FirForm';
import { type Address, useContractRead } from 'wagmi'

export default function ReadFir() {
	return (
		<section className='bg-stone-200 font-montserrat flex flex-col items-center h-screen'>
			<h1 className='text-xl font-bold'>Access FIR</h1>
			<FIRForm />
		</section>
	);
}