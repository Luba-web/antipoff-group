/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../../store/slice/usersSlice';
import { userMod, userText } from '../../utils/consts';

import phone from '../../assets/phone.svg';
import email from '../../assets/email.svg';

import style from './UserInfo.module.css';

export function UserInfo({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUsers());
    if (users.length === 0) {
      navigate('/');
    }
  }, [dispatch]);

  return (
    <div className={style.userInfo}>
      <div className={style.userInfo__text}>
        {userText.map((i, index) => {
          return (
            <p key={index} className={style.userInfo__pg}>
              {i}
            </p>
          );
        })}
      </div>
      <div className={style.userInfo__info}>
        <div className={style.userInfo__contact}>
          <img className={style.userInfo__icon} src={phone} alt="phone" />
          {userMod}
        </div>
        <div className={style.userInfo__contact}>
          <img className={style.userInfo__icon} src={email} alt="email" />
          {item?.email}
        </div>
      </div>
    </div>
  );
}
