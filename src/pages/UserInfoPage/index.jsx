import { useSelector } from 'react-redux';
import { UserInfo } from '../../components/UserInfo';
import { Header } from '../../components/Header';
import { useParams } from 'react-router';
import { useState } from 'react';

export const UserInfoPage = () => {
  const { id } = useParams();

  const { users } = useSelector((store) => store.users);

  const [item] = useState(users.length === 0 ? [] : users?.data[id - 1]);

  return (
    <>
      <Header
        title={`${item?.first_name} ${item?.last_name}`}
        subtitle="Партнер"
        user={item}
      />
      <UserInfo item={item} />
    </>
  );
};
