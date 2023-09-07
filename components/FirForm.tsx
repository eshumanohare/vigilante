'use client'
import React,{useEffect, useState} from 'react';
import { type Address, useContractRead } from 'wagmi'
import {FactoryConfig} from '../config/FactoryInfo';
import { CoreConfig } from '../config/CoreInfo';
import Loader from './Loader';

const FIRForm = () => {
	const [departmentId, setDepartmentId] = useState('1');
	const [firId, setFirId] = useState('1');
	const [coreAddr, setCoreAddr] = useState<Address>();

	const { data:data1,error:error1,isLoading:loading1 } = useContractRead({
		...FactoryConfig,
		functionName: 'allCores',
		args:[departmentId]
	})

	const { data:data2,error:error2,isLoading:loading2 } = useContractRead({
		...CoreConfig,
		address:coreAddr,
		functionName: 'getFIRData',
		args:[firId]
	})

	useEffect(() => {
	  console.log(data1);
	  if(data1){
		setCoreAddr(data1 as Address)
	  }
	}, [data1]);

	useEffect(() => {
		console.log(data2);
	  }, [data2]);

	useEffect(() => {
		console.log((error1 as any)?.cause?.reason, (error2 as any)?.cause?.reason);
		if ((error1 as any)?.cause?.reason) {
		  alert((error1 as any)?.cause?.reason);
		}

		if ((error2 as any)?.cause?.reason) {
			alert((error2 as any)?.cause?.reason);
		  }
	  }, [error1,error2]);
	
	return (
		<div className='max-w-md mx-auto p-4'>
			<div className='flex flex-col gap-4'>
				<p>Department IDs : [1,2]</p>
				<input
					type='text'
					className='w-full py-2 px-3 border border-zinc-900 rounded-md outline-none'
					placeholder='Department ID'
					onChange={(e) => setDepartmentId(e.target.value)}
					disabled={loading1 && loading2}
				/>
				<input
					type='text'
					className='w-full py-2 px-3 border border-zinc-900 rounded-md outline-none'
					placeholder='FIR ID'
					onChange={(e) => setFirId(e.target.value)}
					disabled={loading1 && loading2}
				/>

				{loading1 && <Loader />}
				{loading2 && <Loader />}
			</div>
		</div>
	);
};

export default FIRForm;
