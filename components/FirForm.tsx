import React from 'react';

const FIRForm = () => {
	return (
		<div className='max-w-md mx-auto p-4'>
			<div className='flex space-x-4'>
				<input
					type='text'
					className='w-full py-2 px-3 border border-zinc-900 rounded-md outline-none'
					placeholder='FIR ID'
				/>
				<button className='bg-stone-400 text-zinc-900 py-2 px-3 font-semibold rounded-lg'>
					Submit
				</button>
			</div>
		</div>
	);
};

export default FIRForm;
