import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Adjust the path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery) return; // Skip search if query is empty

    try {
      // Query the Firestore database
      const q = query(
        collection(db, 'pantryItems'),
        where('itemName', '>=', searchQuery),
        where('itemName', '<=', searchQuery + '\uf8ff') // Ensures case-insensitive search
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSearchResults(results);
    } catch (error) {
      console.error('Error searching items: ', error);
    }
  };

  return (
    <div className='search p-2'>
    <div className='search flex  flex-col justify-center items-center  '>
      <input
        type='text'
        placeholder='Search...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='border rounded-lg p-2 mb-4'
      />
      <button
        type='button'
        onClick={handleSearch}
        className='bg-blue-700 text-white p-1 rounded-md'
      >
        Search
      </button>
      </div>
      <div className='mt-6 w-full max-w-4xl'>
        {searchResults.length > 0 ? (
          <ul className='space-y-4'>
            {searchResults.map((item) => (
              <li key={item.id} className='p-4 bg-white border border-gray-200 rounded-md shadow-md'>
                <p><strong>Item Name:</strong> {item.itemName}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Expiration Date:</strong> {item.expirationDate}</p>
                <p><strong>Price:</strong> ${item.price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
