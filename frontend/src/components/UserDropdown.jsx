import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchAllUsersQuery } from '../features/users/usersApi';
import { selectUser } from '../features/users/usersSlice';

const UserDropdown = () => {
  const { data: users = [], isLoading } = useFetchAllUsersQuery();
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const dispatch = useDispatch();

  if (isLoading) return <p>Loading users...</p>;

  return (
    <select
      value={selectedUser}
      onChange={(e) => dispatch(selectUser(e.target.value))}
      className="p-2 border rounded"
    >
      <option value="">Select User</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.username}
        </option>
      ))}
    </select>
  );
};

export default UserDropdown;
