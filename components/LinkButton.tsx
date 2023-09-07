import React from 'react';
import Link from 'next/link';

const LinkButton = ({ link, text }) => {
	return (
		<Link
			href={link}
			className='bg-stone-400 text-zinc-900 py-2 px-3 rounded-lg inline-block font-bold mx-3'>
			{text}
		</Link>
	);
};

export default LinkButton;
