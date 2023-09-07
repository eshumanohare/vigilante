import LinkButton from '../components/LinkButton';

export default function Home() {
	return (
		<section className='bg-stone-200 font-montserrat flex flex-col items-center h-screen'>
			Main page
			<div className='flex'>
				<LinkButton link={'/createFir'} text={'File new FIR'} />
				<LinkButton link={'/readFir'} text={'Access FIR'} />
			</div>
		</section>
	);
}
