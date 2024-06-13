import { useEffect, useState } from 'react';
import './App.css';

const API_URL = "http://localhost:3000/items";

function App() {
  const [items, setItems] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  async function fetchAndSaveItems() {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (res.ok) {
      const json = await res.json();
      setItems(json);
    } else {
      console.error('Error fetching and saving items');
    }
  }

  async function addItem(item) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({item})
    });

    if (res.ok) {
      setItems([...items, item]);
    } else {
      console.error('Failed to add item');
    }
  }

  async function removeItem(item) {
    const res = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({item})
    });
    
    if (res.ok) {
      await fetchAndSaveItems();
    } else {
      console.error('Failed to remove item');
    }
  }

  useEffect(() => {
    fetchAndSaveItems();
  }, [currentItem]);

  return (
    <>
      <h1>Item List</h1>
      <div className='add-item'>
        <input
          type='text'
          placeholder='Enter item name...'
          value={currentItem}
          onChange={e => {
            setCurrentItem(e.target);
          }}
        />
        <button
          onClick={async () => {
            await addItem(currentItem);
            setCurrentItem('');
          }}
        >
          Add Item
        </button>
        <button onClick={async () => {
          await removeItem(currentItem);
          setCurrentItem('');
        }}>
          Remove Item
        </button>
      </div>
      <ul>
        {items.map((item, i) => {
          return (
            <li key={i} className='list-item'>
              {item}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default App;
