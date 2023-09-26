/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router';
import { logoutUser } from '../../store/slice/authSlice';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import style from './Header.module.css';
import out from '../../assets/out.svg';
import back from '../../assets/arrow_back.svg';

export function Header({ title, subtitle, user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleOut = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const drawContent = useCallback(
    () =>
      user ? (
        <>
          <button className={style.header__btn} onClick={handleBack}>
            Назад
          </button>
          <div className={style.header__block}>
            <button className={style.header__out} onClick={handleBack}>
              <img src={back} alt="button back" />
            </button>
            <button className={style.header__out} onClick={handleOut}>
              <img src={out} alt="button out" />
            </button>
          </div>

          <img
            className={style.header__avatar}
            src={user.avatar}
            alt="avatar"
          />
          <div
            className={`${style.header__content} ${style.header__contentInfo}`}
          >
            <h2 className={style.header__title}>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <button className={style.header__btn} onClick={handleOut}>
            Выход
          </button>
        </>
      ) : (
        <>
          <div className={style.header__block_btn}>
            <button className={style.header__out} onClick={handleOut}>
              <img src={out} alt="button out" />
            </button>
          </div>
          <div className={style.header__content}>
            <h2 className={style.header__title}>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <button className={style.header__btn} onClick={handleOut}>
            Выход
          </button>
        </>
      ),
    [user, title, subtitle]
  );

  return <header className={style.header}>{drawContent()}</header>;
}
