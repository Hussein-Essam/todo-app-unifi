import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from './constants/routes';
import TodoList from './pages/TodoList/TodoList';
// import TodoDetails from './TodoDetails';
// import CreateTodo from './CreateTodo';
import './App.css';
import Header from './components/Header/Header';
import TodoDetails from './pages/TodoDetails/TodoDetails';
import NewTodo from './pages/NewTodo/NewTodo';

function MyRoutes() {
  return (
    <Routes>
      <Route path={routes.Home} element={<Navigate to={routes.Todo} />} />
      <Route path={routes.Todo}>
        <Route index element={<TodoList />} />
        <Route path='create' element={<NewTodo />} />
        <Route path=':todoId' element={<TodoDetails />} />
        <Route path=':todoId/edit' element={<NewTodo />} />
      </Route>
    </Routes>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <main>
        <MyRoutes />
      </main>
    </div>
  );
}

export default App;
