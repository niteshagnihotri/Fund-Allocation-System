"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import {BiArrowBack} from 'react-icons/bi';

const BackButton = ({route=""}) => {

  const router = useRouter();

  return (
    <button type="button" onClick={()=> route!=="" ? router.push(route) : router.back()}>
        <BiArrowBack className='text-3xl cursor-pointer text-gray-600'/>
    </button>
  )
}

export default BackButton