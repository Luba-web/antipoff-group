/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router';
import { CardUser } from '../CardUser';
import style from './ListUsers.module.css';
import { useState } from 'react';

export function ListUsers({ users }) {
  const navigate = useNavigate();

  const [typeLike, setTypeLike] = useState('white');

  const handleInfo = (item) => {
    navigate(`/users/${item.id}`);
  };

  const handleLike = () => {
    setTypeLike(typeLike === 'white' ? 'black' : 'white');
  };

  return (
    <ul className={style.listGrid}>
      {users.data?.length > 0 &&
        users.data.map((i) => (
          <CardUser
            item={i}
            key={i.id}
            handleInfo={() => handleInfo(i)}
            handleLike={handleLike}
            typeLike={typeLike}
          />
        ))}
    </ul>
  );
}
