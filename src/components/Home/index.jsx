import { useEffect } from 'react';
import { Header } from '../Header';
import { getUsers } from '../../store/slice/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ListUsers } from '../ListUsers';

import { useNavigate } from 'react-router';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector((store) => store.auth);
  const { users } = useSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUsers());
    if (!isAuth) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [dispatch, isAuth]);

  return (
    <>
      <Header
        title="Наша команда"
        subtitle="Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций."
        user={false}
      />
      {users && <ListUsers users={users} />}
    </>
  );
};

export default Home;
