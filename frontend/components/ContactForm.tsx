import { FormEvent, useState } from 'react';

import { IContactForm } from '@/types';
import { parseErrorResponse } from '@/utils';

import { Input, TextArea } from './';


const initialForm: IContactForm = {
  first_name: '',
  last_name: '',
  email: '',
  organization: '',
  services_needed: [],
  message: '',
};

const initialError: ReturnType<typeof parseErrorResponse> = {};

export default function ContactForm() {
  const [form, setForm] = useState({ ...initialForm });
  const [error, setError] = useState({ ...initialError });
  const [isSending, setIsSending] = useState(false);

  const handleCheckbox = () => (e: FormEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    const checked = (e.target as HTMLInputElement).checked;

    if (checked) {
      setForm((prevState) => {
        if (prevState.services_needed.includes(value)) return { ...prevState };

        return {
          ...prevState,
          services_needed: [...prevState.services_needed, value],
        };
      });
    } else {
      setForm((prevState) => ({
        ...prevState,
        services_needed:
          prevState.services_needed.filter(service => service !== value),
      }));
    }
  };

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
            label={<>First name<span>*</span></>}
            name='first_name'
            value={form.first_name}
            type='text'
            disabled={isSending}
            minLength={1}
            maxLength={50}
            onChange={handleInput()}
            placeholder='Jane'
            required
            errors={error?.first_name?.map(e => e.msg)}
          />
          <Input
            className='ContactForm-input'
            label={<>Last name<span>*</span></>}
            name='last_name'
            value={form.last_name}
            type='text'
            disabled={isSending}
            minLength={1}
            maxLength={50}
            onChange={handleInput()}
            placeholder='Doe'
            required
            errors={error?.last_name?.map(e => e.msg)}
          />
        </div>
        <div className='ContactForm-table-row'>
          <Input
            className='ContactForm-input'
            label={<>Email<span>*</span></>}
            name='email'
            value={form.email}
            type='text'
            disabled={isSending}
            minLength={1}
            maxLength={255}
            onChange={handleInput()}
            placeholder='janedoe@email.org'
            required
            errors={error?.email?.map(e => e.msg)}
          />
          <Input
            className='ContactForm-input'
            label={<>Organization<span>*</span></>}
            name='organization'
            value={form.organization}
            type='text'
            disabled={isSending}
            minLength={1}
            maxLength={255}
            onChange={handleInput()}
            placeholder='Business LLC'
            required
            errors={error?.organization?.map(e => e.msg)}
          />
        </div>
        <div className='ContactForm-table-row'>
          <div className='ContactForm-table-row-column'>
            <div className='ContactForm-servicesLabel'>Services Needed</div>
            <Input
              className='ContactForm-checkbox'
              label='Site Planning &amp; Design'
              name='site_design'
              value='Site Planning and Design'
              type='checkbox'
              checked={form.services_needed.some(
                s => s === 'Site Planning and Design'
              )}
              disabled={isSending}
              onChange={handleCheckbox()}
            />
            <Input
              className='ContactForm-checkbox'
              label='Land Surveying'
              name='surveying'
              value='Land Surveying'
              type='checkbox'
              checked={form.services_needed.some(s => s === 'Land Surveying')}
              disabled={isSending}
              onChange={handleCheckbox()}
            />
            <Input
              className='ContactForm-checkbox'
              label='Water Resources'
              name='water_resources'
              value='Water Resources'
              type='checkbox'
              checked={form.services_needed.some(s => s === 'Water Resources')}
              disabled={isSending}
              onChange={handleCheckbox()}
            />
            <Input
              className='ContactForm-checkbox'
              label='Stormwater Bill Analysis'
              name='stormwater'
              value='Stormwater Bill Analysis'
              type='checkbox'
              checked={form.services_needed.some(
                s => s === 'Stormwater Bill Analysis'
              )}
              disabled={isSending}
              onChange={handleCheckbox()}
            />
            <Input
              className='ContactForm-checkbox'
              label='Other'
              name='other'
              value='Other'
              type='checkbox'
              checked={form.services_needed.some(s => s === 'Other')}
              disabled={isSending}
              onChange={handleCheckbox()}
            />
          </div>
          <div className='ContactForm-table-row-column'>
            <TextArea
              className='ContactForm-textArea'
              label={<>Message<span>*</span></>}
              name='message'
              value={form.message}
              disabled={isSending}
              minLength={1}
              maxLength={500}
              onChange={handleTextArea()}
              placeholder='Briefly describe your project, goals, needs, etc.'
              required
              errors={error?.message?.map(e => e.msg)}
            />
          </div>
        </div>
      </div>
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