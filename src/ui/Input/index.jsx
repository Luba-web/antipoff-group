/* eslint-disable react/prop-types */
import style from './Input.module.css';

export const Input = ({
  type,
  handleChange,
  name,
  placeholder,
  className,
  required,
  value,
}) => {
  return (
    <input
      type={type}
      onChange={handleChange}
      name={name}
      placeholder={placeholder}
      className={`${style.input} ${className ? className : ''}`}
      required={required}
      value={value}
      id={name}
    />
  );
};
