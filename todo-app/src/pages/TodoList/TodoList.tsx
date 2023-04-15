import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Todo } from '../../types';
import axios from 'axios';
import { USER_ID } from '../../constants/userId';
import { Link } from 'react-router-dom';

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodoList = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${USER_ID}/todo`
      );
      setTodos(res.data.todos);
    } catch (error) {}
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <List>
      {todos.map((todo) => (
        <Link to={`/todo/${todo._id}`} key={todo._id}>
          <ListItem button>
            <ListItemText primary={todo.title} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default TodoList;
