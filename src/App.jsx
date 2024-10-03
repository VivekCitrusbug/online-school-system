import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { List } from './components/List'
import { Additem } from './components/Additem'
import { Searchitem } from './components/Searchitem'
import axios from 'axios'

function App() {
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/itemlist');
        const result = response.data;
        console.log(result.data);
        setItem(result.data);
      } catch (err) {
        setFetchError(err);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);

  // Add new item:
  const addNewItem = async (itemLabel) => {
    let itemid = item.length ? item[item.length - 1].id + 1 : 1;
    let newItem = { id: itemid, checked: false, item: itemLabel.toString() };

    try {
      let response = await axios.post('http://localhost:3000/additem', {newItem});
      if (response.status === 201) {
        let addedItem = [...item, newItem];
        setItem(addedItem);
      }else{
        throw Error('data not created.')
      }
    } catch (err) {
      console.log(err);
      setFetchError(err.message);
    }
  };

  // On checked change:
  const onCheckChange = async(id) => {
try{
  let response=await axios.patch(`http://localhost:3000/changecheck/${id}`);
  if(response.status===200){
    let changeItem = item.map((x) => (
      x.id === id ? { ...x, checked: !x.checked } : x
    ));
    setItem(changeItem);
  }
 
}catch(err){
  console.log(err);
  setFetchError(err);
}
   
  };

  // On delete:
  const onDelete = async(id) => {
    try{
      let response=await axios.delete(`http://localhost:3000/delete/${id}`);
      if(response.status===204){
        let deleteItem = item.filter((x) => x.id !== id);
        setItem(deleteItem);
      }
    }catch(err){
      console.log(err);
      setFetchError(err);
    }
   
  };

  return (
    <div className='container'>
      <Header />
      <main>
        <Additem addNewItem={addNewItem} />

        <Searchitem search={search} setSearch={setSearch} />
        {isLoading && <p style={{ textAlign: 'center' }}>Loading items...</p>}
        {fetchError && <p style={{ textAlign: 'center', color: 'red' }}>{`Error: ${fetchError}`}</p>}
        
        {!fetchError && !isLoading && item.length === 0 && <p>Your list is empty.</p>}

        {!fetchError && !isLoading && item.length > 0 &&
          <List
            item={item.filter((x) => x && x.item.toLowerCase().includes(search.toLowerCase()))}  // Check if `x` exists before accessing `x.item`
            onCheckChange={onCheckChange}
            onDelete={onDelete}
          />
        }
      </main>
      <Footer item={item} />
    </div>
  );
}

export default App;
