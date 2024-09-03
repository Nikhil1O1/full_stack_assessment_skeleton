import React, { useState, useEffect } from 'react';
import { useFetchAllUsersQuery } from '../features/users/usersApi';
import { useFetchUsersByHomeQuery } from '../features/homes/homesApi';
import { useUpdateHomeUsersMutation } from '../features/homes/homesApi';

const EditUserModal = ({ home, onClose, onUpdate }) => {
  const { data: users = [], isLoading: usersLoading } = useFetchAllUsersQuery();
  const { data: homeUsers = [], isLoading: homeUsersLoading } = useFetchUsersByHomeQuery({ homeId: home.id });
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [enableSave, setEnableSave] = useState(false);
  const [updateHomeUsers] = useUpdateHomeUsersMutation();

  useEffect(() => {
    if (homeUsers && homeUsers.length > 0) {
      const associatedUserIds = homeUsers.map(user => user.id);
      setSelectedUsers(associatedUserIds);
    }
  }, [homeUsers]);

  const toggleUserSelection = (userId) => {
    setEnableSave(true);
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleSave = async () => {
    await updateHomeUsers({ homeId: home.id, userIds: selectedUsers });
    onUpdate(); // Trigger an update on the HomesForUser page
    onClose();
  };

  const isSaveDisabled = selectedUsers.length === 0;

  if (usersLoading || homeUsersLoading) return <p>Loading...</p>;

  return (
    <div className="fixed inset-0 frostedBack bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2>Edit Users for {home.street_address}</h2>
        <div className="mt-4 checkBoxModal">
          {users.map((user) => (
            <label
              key={user.id}
              className={`block ${selectedUsers.includes(user.id) ? 'font-bold' : ''}`}
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleUserSelection(user.id)}
              />
              {user.username}
            </label>
          ))}
        </div>
        <div className="mt-4 modalButtons">
          <button onClick={onClose} className="p-2 bg-gray-500 text-white rounded scaleAnimation">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!enableSave || !selectedUsers.length >= 1}
            className="mr-2 p-2 bg-blue-500 text-white rounded disabled:opacity-50 scaleAnimation"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
