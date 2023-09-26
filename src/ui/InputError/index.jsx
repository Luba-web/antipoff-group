import style from './InputError.module.css';

// eslint-disable-next-line react/prop-types
export const InputError = ({ error }) => {
  return (
    <div className={`${style.error} ${error ? style.active : ''}`}>{error}</div>
  );
};
