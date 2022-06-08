import React, { Component, SelectHTMLAttributes } from 'react';


interface Props extends SelectHTMLAttributes<HTMLSelectElement>{
  label?: string | JSX.Element;
  showAsterisk?: boolean;
  showObelisk?: boolean;
}

export default class Select extends Component<Props> {
  render() {
    const { className, id, showAsterisk, children, ...rest } = this.props;
    const { disabled, label, name } = rest;

    return (
      <div className={`Select${!!className ? ' ' + className : ''}`} id={id}>
        {!!label && (
          <label
            htmlFor={name}
            style={disabled ? { opacity: '0.66667' } : undefined}
          >
            {label}
          </label>
        )}
        <select
          { ...rest }
          id={name}
        >
          {children}
        </select>
        {showAsterisk && (
          <span className='Select-asterisk'>*</span>
        )}
      </div>
    );
  }
};