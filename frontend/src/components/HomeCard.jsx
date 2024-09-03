import React from 'react';

const HomeCard = ({ home, onEditClick }) => {
  return (
    <div className="border p-4 rounded Card CardContent">
      <div>

      <h3 className="text-lg font-bold">{home.street_address}</h3>
      </div>
      <div>
        
      <p>List Price: {home.list_price}</p>
      <p>State: {home.state}</p>
      <p>zip: {home.zip}</p>
      <p>sqft: {home.sqft}</p>
      <p>Beds: {home.beds}</p>
      <p>Baths: {home.baths}</p>
      </div>
      <div>
        
      <button
        onClick={() => onEditClick(home)}
        // className="mt-2 p-2 bg-blue-500 text-white rounded"
        className='button'
        >
        Edit User
      </button>
        </div>
    </div>
  );
};

export default HomeCard;