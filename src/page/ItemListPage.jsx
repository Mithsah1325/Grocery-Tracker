import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Adjust the path according to your project structure
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

function ItemListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Baking Essentials');
  const [expirationDate, setExpirationDate] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    // Fetch items from Firestore
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pantryItems'));
        const itemsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setItems(itemsList);
      } catch (error) {
        console.error('Error fetching items: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleEdit = (item) => {
    // Set the state with item data to populate the form
    setEditingItem(item);
    setItemName(item.itemName);
    setDescription(item.description);
    setCategory(item.category);
    setExpirationDate(item.expirationDate);
    setPrice(item.price);
  };

  const handleUpdate = async () => {
    if (!editingItem) return;

    try {
      const itemRef = doc(db, 'pantryItems', editingItem.id);
      await updateDoc(itemRef, {
        itemName,
        description,
        category,
        expirationDate,
        price
      });
      // Update the local state
      setItems(items.map(item =>
        item.id === editingItem.id ? { ...item, itemName, description, category, expirationDate, price } : item
      ));
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item: ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'pantryItems', id));
      // Remove the item from local state
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold '>Pantry Items</h1>
      {loading ? (
        <p>Loading...</p>
      ) : items.length > 0 ? (
        <ul className='space-y-4'>
          {items.map(item => (
            <li key={item.id} className='p-4 bg-white border border-gray-200 rounded-md shadow-md'>
              <p><strong>Item Name:</strong> {item.itemName}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Expiration Date:</strong> {item.expirationDate}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <div className='mt-4 flex space-x-2'>
                <button
                  onClick={() => handleEdit(item)}
                  className='py-2 px-4 bg-yellow-500 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className='py-2 px-4 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found</p>
      )}

      {editingItem && (
        <div className='mt-6 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md'>
          <h2 className='text-xl font-bold mb-4'>Edit Item</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <div className='flex flex-col mb-4'>
              <label htmlFor='itemName' className='text-lg font-medium mb-2'>Item Name:</label>
              <input
                id='itemName'
                type='text'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
                className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='description' className='text-lg font-medium mb-2'>Description:</label>
              <input
                id='description'
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='category' className='text-lg font-medium mb-2'>Category:</label>
              <select
                id='category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value="Baking Essentials">Baking Essentials</option>
                <option value="Canned">Canned</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Snacks">Snacks</option>
                <option value="Cooking">Cooking</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='expirationDate' className='text-lg font-medium mb-2'>Expiration Date:</label>
              <input
                id='expirationDate'
                type='date'
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
                className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='flex flex-col mb-4'>
              <label htmlFor='price' className='text-lg font-medium mb-2'>Price:</label>
              <input
                id='price'
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <button
              type='submit'
              className='w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ItemListPage;
