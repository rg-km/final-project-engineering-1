import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import TextArea from '../../Components/TextArea';

type Props = {}

export default function CreateQuestion({}: Props) {

  const {handleSubmit} = useForm();
  const navigate = useNavigate()

  const onSubmit = () => {
    Swal.fire({
      title:"Pertanyaan berhasil dibuat",
      icon:"success",

    }).then(() => navigate('/'));
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-row items-center justify-between">
        <h1 className="font-bold text-2xl">Buat Pertanyaan</h1>
        <Button label="Kembali" primary to="/" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <Input label='Judul Pertanyaan'/>
        <TextArea label='Isi Pertanyaan'/>
        <div className='flex justify-end'>
          <Button label='Kirim' primary/>
        </div>
      </form>
    </div>
  );
}