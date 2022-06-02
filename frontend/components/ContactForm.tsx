import { FormEvent, useState } from 'react';

import { IContactForm } from '@/types';
import { parseErrorResponse } from '@/utils';

import { Input, TextArea } from './';


const initialForm: IContactForm = {
  first_name: '',
  last_name: '',
  email: '',
  organization: '',
  phone_number: undefined,
  message: '',
};

const initialError: ReturnType<typeof parseErrorResponse> = {};

export default function ContactForm() {
  const [form, setForm] = useState({ ...initialForm });
  const [error, setError] = useState({ ...initialError });
  const [isSending, setIsSending] = useState(false);

  const handleInput = () => (e: FormEvent<HTMLInputElement>) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleTextArea = () => (e: FormEvent<HTMLTextAreaElement>) => {
    const message = (e.target as HTMLTextAreaElement).value;
    setForm((prevState) => ({ ...prevState, message }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setError({});
    setTimeout(() => {
      setForm({ ...initialForm });
      setIsSending(false);
    }, 3000);
  };

  const canSubmit = !!(
    !isSending &&
    form.first_name && form.last_name &&
    form.email && form.organization && form.message
  );

  return (
    <form
      className='ContactForm'
      id='formContact'
      onSubmit={canSubmit ? handleSubmit : undefined}
    >
      <div className='ContactForm-table'>
        <div className='ContactForm-table-row'>
          <Input
            className='ContactForm-input'
            label='First name'
            name='first_name'
            value={form.first_name}
            type='text'
            disabled={isSending}
            minLength={1}
            maxLength={50}
            onChange={handleInput()}
            placeholder='Jane'
            required
            autoFocus
          />
          {error?.first_name?.map(e => (
            <p key={e.id} className='ContactForm-error'>{e.msg}</p>
          ))}
          <Input
            className='ContactForm-input'
            label='Last name'
            name='last_name'
            value={form.last_name}
            type='text'
            disabled={isSending}
            minLength={1}
            maxLength={50}
            onChange={handleInput()}
            placeholder='Doe'
            required
          />
          {error?.last_name?.map(e => (
            <p key={e.id} className='ContactForm-error'>{e.msg}</p>
          ))}
        </div>
        <div className='ContactForm-table-row'>
          <Input
            className='ContactForm-input'
            label='Email'
            name='email'
            value={form.email}
            type='text'
            disabled={isSending}
            minLength={1}
            maxLength={255}
            onChange={handleInput()}
            placeholder='janedoe@email.org'
            required
          />
          {error?.email?.map(e => (
            <p key={e.id} className='ContactForm-error'>{e.msg}</p>
          ))}
          <Input
            className='ContactForm-input'
            label='Organization'
            name='organization'
            value={form.organization}
            type='text'
            disabled={isSending}
            minLength={1}
            maxLength={255}
            onChange={handleInput()}
            placeholder='Business LLC'
            required
          />
          {error?.organization?.map(e => (
            <p key={e.id} className='ContactForm-error'>{e.msg}</p>
          ))}
        </div>
      </div>
      <TextArea
        className='ContactForm-textArea'
        label='Message'
        name='message'
        value={form.message}
        disabled={isSending}
        minLength={1}
        maxLength={500}
        onChange={handleTextArea()}
        placeholder='Message'
        required
      />
      {error?.message?.map(e => (
        <p key={e.id} className='ContactForm-error'>{e.msg}</p>
      ))}
      {error?.nonField?.map(e => (
        <p key={e.id} className='ContactForm-error'>{e.msg}</p>
      ))}
      {error?.detail?.map(e => (
        <p key={e.id} className='ContactForm-error'>{e.msg}</p>
      ))}
      <button
        className='ContactForm-button'
        type='submit'
        disabled={!canSubmit}
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}