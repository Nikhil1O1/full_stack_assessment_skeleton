import React, { useState, useCallback, useEffect } from 'react';
import UserDropdown from '../components/UserDropdown';
import HomeCard from '../components/HomeCard';
import EditUserModal from '../components/EditUserModal';
import { useSelector } from 'react-redux';
import { useFetchHomesByUserQuery } from '../features/homes/homesApi';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const HomesForUser = () => {
  const selectedUser = useSelector((state) => state.users.selectedUser);
  const [page, setPage] = useState(1);
  const limit = 50;
  const [editingHome, setEditingHome] = useState(null);
  const { data: response = {}, isLoading, refetch } = useFetchHomesByUserQuery(
    { userId: selectedUser, page, limit },
    { skip: !selectedUser }
  );

  const homes = response.homes || [];

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  const handleUpdate = useCallback(() => {
    refetch();
  }, [refetch]);


  return (
    <>
      <div className='CenterView'>
        <div className='ContainerXL'>
          <UserDropdown />
        </div>
      </div>
      <div className="CenterView">
        <div className='Container'>
          {isLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {Array(3).fill(null).map((_, index) => (
                <div key={index} className="Card">
                  <Skeleton height={25} width="100%" />
                  <Skeleton height={18} />
                  <Skeleton height={18} count={3} />
                  <Skeleton height={18} count={2} />
                  <Skeleton height={40} width="30%" />
                </div>
              ))}
            </div>
          ) : (
            Array.isArray(homes) && homes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {homes.map((home) => (
                  <HomeCard key={home.id} home={home} onEditClick={setEditingHome} />
                ))}
              </div>
            ) : (
              <p>No homes found.</p>
            )
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="p-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            onClick={handleNextPage}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
        {editingHome && (
          <EditUserModal
            home={editingHome}
            onClose={() => setEditingHome(null)}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </>
  );
};

export default HomesForUser;
