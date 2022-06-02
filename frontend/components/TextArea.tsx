import React, { Component, TextareaHTMLAttributes } from 'react';


interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  label?: string | JSX.Element;
  showAsterisk?: boolean;
  showObelisk?: boolean;
}

export default class TextArea extends Component<Props> {
  render() {
    const { className, id, showAsterisk, showObelisk, ...rest } = this.props;
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