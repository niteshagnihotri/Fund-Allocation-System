import TextInputComponent from '@/components/inputs/textinputcomponent'
import React from 'react'
import { useFormContext } from 'react-hook-form';

const CreateRequestLeftForm = () => {
  
  const {register, formState: { errors }} = useFormContext();

  return (
    <div className='space-y-8'>
        <TextInputComponent 
        type='text'
        label='Request title'
        name='title'
        register={register}
        errors={errors}
        required={true}
        placeholder='Title your request'
        className='text-xs'
        />
        <TextInputComponent 
        type='textarea'
        label='Description'
        name='description'
        register={register}
        errors={errors}
        required={true}
        placeholder='Short description of fund request'
        className='text-xs'
        rows='10'
        />
    </div>
  )
}

export default CreateRequestLeftForm