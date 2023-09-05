import React from 'react';

const Loader = () => {
	return (
		<div className='flex justify-center items-center my-5'>
			<div className='border-t-4 border-zinc-900 border-solid h-12 w-12 rounded-full animate-spin'></div>
		</div>
	);
};

export default Loader;
