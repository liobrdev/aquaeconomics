import React, { Component, TextareaHTMLAttributes } from 'react';
import { v4 as uuidv4 } from 'uuid';


interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  label?: string | JSX.Element;
  showAsterisk?: boolean;
  showObelisk?: boolean;
  errors?: string[];
}

export default class TextArea extends Component<Props> {
  render() {
    const {
      className,
      id,
      showAsterisk,
      showObelisk,
      errors,
      ...rest
    } = this.props;

    const { disabled, label, name } = rest;

    return (
      <div className={`TextArea${!!className ? ' ' + className : ''}`} id={id}>
        {!!label && (
          <label
            htmlFor={name}
            style={disabled ? { opacity: '0.66667' } : undefined}
          >
            {label}
          </label>
        )}
        <textarea { ...rest } id={name} />
        {!!errors && errors.map(
          e => <p key={uuidv4()} className='TextArea-error'>{e}</p>
        )}
        {showAsterisk && (
          <span className='TextArea-asterisk'>*</span>
        )}
        {showObelisk && (
          <span className='TextArea-obelisk'>&dagger;</span>
        )}
      </div>
    );
  }
};