import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { ButtonSubmit } from '../../ui/ButtonSubmit';
import { Input } from '../../ui/Input';
import { InputError } from '../../ui/InputError';

import style from './Register.module.css';

import { useFormAndValidation } from '../../utils/hooks/useFormAndValidation';
import { registerUser } from '../../store/slice/authSlice';

import hide from '../../assets/eyeoff.svg';
import show from '../../assets/eyeon.svg';

export function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState('password');
  const [err, setErr] = useState('');

  const { values, handleChange, isValid, errors } = useFormAndValidation();

  const submitForm = async (evt) => {
    evt.preventDefault();
    dispatch(registerUser(values));
    navigate('/');
  };
  const handleShowPassword = () =>
    setPasswordType(passwordType === 'text' ? 'password' : 'text');

  const validateСonfirmPassword = () => {
    if (values.password !== values.confirmPassword) {
      return setErr('Не совпал пароль.');
    }

    return setErr('');
  };

  useEffect(() => {
    validateСonfirmPassword();
  }, [values.password, values.confirmPassword]);

  return (
    <main className={style.main}>
      <div className={style.main__content}>
        <h2>Регистрация</h2>
        <form className={style.main__form} noValidate onSubmit={submitForm}>
          <label htmlFor="name">Имя</label>
          <Input
            type="text"
            handleChange={handleChange}
            name="name"
            placeholder="name"
            required={true}
            value={values.name || ''}
          />
          <InputError error={errors.name} />
          <label htmlFor="email">Электроная почта</label>
          <Input
            type="email"
            handleChange={handleChange}
            name="email"
            placeholder="email"
            required={true}
            value={values.email || ''}
          />
          <InputError error={errors.email} />
          <label htmlFor="password">Пароль</label>
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
          <label htmlFor="confirmPassword">Подтвердите пароль</label>
          <div className={style.position}>
            <Input
              type={passwordType}
              handleChange={handleChange}
              name="confirmPassword"
              placeholder="confirmPassword"
              required={true}
              value={values.confirmPassword || ''}
            />
            <img
              className={style.img_icon}
              onClick={handleShowPassword}
              src={passwordType === 'text' ? show : hide}
              alt={`icon ${passwordType}`}
            />
          </div>
          <InputError error={err} />
          <ButtonSubmit text="Зарегистрировать" isValid={isValid} />
        </form>
        <Link to="/login">Уже зарегистрированы?</Link>
      </div>
    </main>
  );
}
