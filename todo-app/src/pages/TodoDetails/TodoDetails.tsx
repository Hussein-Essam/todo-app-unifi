import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Button, Box } from '@material-ui/core';
import { Todo } from '../../types';
import axios from 'axios';
import { USER_ID } from '../../constants/userId';

function TodoDetails() {
  const { todoId } = useParams<{ todoId: string }>();
  const [todo, setTodo] = useState<Todo | ''>('');
  const history = useNavigate();

  const getTodoDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${USER_ID}/todo/${todoId}`
      );
      setTodo(res.data.todo);
    } catch (error) {}
  };

  useEffect(() => {
    getTodoDetails();
  }, []);

  const openEditTodoDetails = () => {
    if (!todo) return;
    history(`/todo/${todo._id}/edit`);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/users/${USER_ID}/todo/${todoId}`
      );
      setTodo(res.data.todo);
      history('/');
    } catch (error) {}
  };

  return (
    <Box m={4}>
      {todo && (
        <>
          <Typography variant='h4'>{todo.title}</Typography>
          <Typography variant='body1' style={{ marginTop: 8 }}>
            {todo.description}
          </Typography>
          <Typography variant='body1' style={{ marginTop: 8 }}>
            {todo.completed ? 'Completed' : 'Not Completed'}
          </Typography>
          <Button
            variant='contained'
            color='primary'
            style={{ marginTop: 16 }}
            onClick={openEditTodoDetails}
            disabled={!todo}
          >
            Edit Todo
          </Button>
          <Button
            variant='contained'
            color='secondary'
            style={{ marginTop: 16 }}
            onClick={handleDelete}
            disabled={!todo}
          >
            Delete Todo
          </Button>
        </>
      )}
    </Box>
  );
}

export default TodoDetails;
