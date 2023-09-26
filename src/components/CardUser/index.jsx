import style from './CardUser.module.css';
import heart from '../../assets/heart.svg';
import heartBlack from '../../assets/heart_black.svg';
import { useState } from 'react';

/* eslint-disable react/prop-types */
export function CardUser({ item, handleInfo }) {
  const [typeLike, setTypeLike] = useState('white');

  const handleLike = () => {
    setTypeLike(typeLike === 'white' ? 'black' : 'white');
  };
  console.log();
  return (
    <li className={style.cardUser}>
      {item && (
        <>
          <img
            className={style.cardUser__avatar}
            src={item.avatar}
            alt="avatar"
            onClick={handleInfo}
          />
          <p>{`${item.first_name} ${item.last_name}`}</p>
          <img
            className={style.cardUser__like}
            src={typeLike === 'black' ? heartBlack : heart}
            alt="like"
            onClick={handleLike}
          />
        </>
      )}
    </li>
  );
}
