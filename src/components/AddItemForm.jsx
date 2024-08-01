import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore'; // Import Firestore functions

function AddItemForm() {
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Baking Essentials');
    const [expirationDate, setExpirationDate] = useState('');
    const [price, setPrice] = useState('');
    const [savedItem, setSavedItem] = useState(null);
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    // Fetch items from Firestore
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'pantryItems'), (snapshot) => {
            const itemsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(itemsList);
        });
        return () => unsubscribe();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            itemName,
            description,
            category,
            expirationDate,
            price,
        };

        try {
            if (editingItem) {
                // Update the existing item
                await updateDoc(doc(db, 'pantryItems', editingItem.id), newItem);
                setEditingItem(null);
            } else {
                // Add a new item
                await addDoc(collection(db, 'pantryItems'), newItem);
            }
            setSavedItem(newItem);
            console.log('Item saved successfully');
        } catch (e) {
            console.error('Error saving document: ', e);
        }

        // Clear the form fields
        setItemName('');
        setDescription('');
        setCategory('Baking Essentials');
        setExpirationDate('');
        setPrice('');
    };

    // Handle edit button click
    const handleEdit = (item) => {
        setItemName(item.itemName);
        setDescription(item.description);
        setCategory(item.category);
        setExpirationDate(item.expirationDate);
        setPrice(item.price);
        setEditingItem(item);
    };

    // Handle delete button click
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'pantryItems', id));
            console.log('Item deleted successfully');
        } catch (e) {
            console.error('Error deleting document: ', e);
        }
    };

    return (
        <div className='max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold mb-6'>Add Item to the Pantry</h1>

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='flex flex-col'>
                    <label htmlFor='itemName' className='text-lg font-medium mb-2'>Item Name:</label>
                    <input
                        id='itemName'
                        type='text'
                        placeholder='Item Name'
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                        className='p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
                <div className='flex flex-col'>
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
                <div className='flex flex-col'>
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
                <div className='flex flex-col'>
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
                <div className='flex flex-col'>
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
                {/* Button for submission */}
                <button
                    type='submit'
                    className='w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    {editingItem ? 'Update' : 'Add'}
                </button>
            </form>

            {/* List of items with Edit and Delete buttons */}
            <div className='mt-6'>
                <h2 className='text-xl font-bold mb-4'>Pantry Items</h2>
                <ul className='space-y-4'>
                    {items.map((item) => (
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
            </div>
        </div>
    );
}

export default AddItemForm;
