/* eslint-disable react/prop-types */
import style from './ButtonSubmit.module.css';
export const ButtonSubmit = ({ text, isValid }) => {
  return (
    <button className={style.button} type="submit" disabled={!isValid}>
      {text}
    </button>
  );
};
