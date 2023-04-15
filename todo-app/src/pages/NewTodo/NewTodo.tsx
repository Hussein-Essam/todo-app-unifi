import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  TextField,
  Button,
  makeStyles,
  Theme,
  createStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { USER_ID } from '../../constants/userId';
import { Todo } from '../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '0 auto',
      marginTop: theme.spacing(8),
    },
    form: {
      alignItems: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    formInput: {
      marginBottom: theme.spacing(2),
    },
    formButton: {
      margin: theme.spacing(1),
    },
  })
);

const initialState = {
  _id: '',
  title: '',
  description: '',
  completed: false,
};

function NewTodo() {
  const history = useNavigate();
  const classes = useStyles();
  const { todoId } = useParams<{ todoId: string }>();

  const [todo, setTodo] = useState<Todo>(initialState);

  const getTodoDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/${USER_ID}/todo/${todoId}`
      );
      setTodo(res.data.todo);
    } catch (error) {}
  };

  useEffect(() => {
    if (todoId) {
      getTodoDetails();
    } else {
      setTodo(initialState);
    }
  }, [todoId]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, checked } = e.target;
    setTodo((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let result;
      if (todoId) {
        // upadte
        result = await axios.put(
          `http://localhost:3000/api/users/${USER_ID}/todo/${todoId}`,
          todo
        );
      } else {
        // create
        result = await axios.post(
          `http://localhost:3000/api/users/${USER_ID}/todo`,
          todo
        );
      }
      setTodo(result.data.todo);
      history(`/`);
    } catch (error) {}
  };

  return (
    <Paper className={classes.root}>
      <Typography variant='h4'> {todoId ? 'Update' : 'New'} Todo</Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          name='title'
          label='Title'
          value={todo.title}
          onChange={handleInputChange}
          className={classes.formInput}
        />
        <TextField
          name='description'
          label='Description'
          value={todo.description}
          onChange={handleInputChange}
          className={classes.formInput}
        />
        <div>
          <label>
            Completed:
            <input
              type='checkbox'
              name='completed'
              checked={todo.completed}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
        <div>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            className={classes.formButton}
          >
            {todoId ? 'Update' : 'Submit'}
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => history(`/todo/${todoId}`)}
            className={classes.formButton}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default NewTodo;
