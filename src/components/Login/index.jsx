import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ButtonSubmit } from '../../ui/ButtonSubmit';
import { Input } from '../../ui/Input';
import { InputError } from '../../ui/InputError';

import style from './Login.module.css';

import { useFormAndValidation } from '../../utils/hooks/useFormAndValidation';
import { loginUser } from '../../store/slice/authSlice';
import { useState } from 'react';
import hide from '../../assets/eyeoff.svg';
import show from '../../assets/eyeon.svg';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState('password');

  const { values, handleChange, isValid, errors } = useFormAndValidation();

  const submitForm = async (evt) => {
    evt.preventDefault();

    dispatch(loginUser(values)).then(() => navigate('/'));
  };

  const handleShowPassword = () =>
    setPasswordType(passwordType === 'text' ? 'password' : 'text');

  return (
    <main className={style.main}>
      <div className={style.main__content}>
        <h2>Авторизация</h2>
        <form className={style.main__form} noValidate onSubmit={submitForm}>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            handleChange={handleChange}
            name="email"
            placeholder="email"
            required={true}
            value={values.email || ''}
          />
          <InputError error={errors.email} />
          <label htmlFor="password">Password</label>
          <div className={style.position}>
            <Input
              type={passwordType}
              handleChange={handleChange}
              name="password"
              placeholder="password"
              required={true}
              value={values.password || ''}
            />
            <img
              className={style.img_icon}
              onClick={handleShowPassword}
              src={passwordType === 'text' ? show : hide}
              alt={`icon ${passwordType}`}
            />
          </div>
          <InputError error={errors.password} />
          <ButtonSubmit text="Войти" isValid={isValid} />
        </form>
        <Link to="/register">Зарегистрироваться</Link>
      </div>
    </main>
  );
}
