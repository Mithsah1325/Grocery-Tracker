import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddItemForm from './components/AddItemForm';
import DrawerAppBar from './components/DrawerAppBar';
import SearchPage from './page/SearchPage';
import ItemListPage from './page/ItemListPage';

function App() {
  return (
    <Router>
      <DrawerAppBar />
      <Routes>
        <Route path="/" element={<AddItemForm />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/item-lists" element={<ItemListPage />} />
       

      </Routes>
    </Router>
  );
}

export default App;
