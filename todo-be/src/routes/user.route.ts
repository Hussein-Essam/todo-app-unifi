import { Router } from 'express';
import User from '../models/user.model';
import Todo from '../models/todo.model';

const router = Router();

router.post('/:userId/todo', async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, completed } = req.body;
    if (!title) throw new Error('Title is required');
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const todo = new Todo({
      user: userId,
      title,
      description,
      completed: !!completed,
    });
    await todo.save();
    return res.json({ msg: 'Todo created successfully', todo });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/:userId/todo/:todoId', async (req, res) => {
  try {
    const { userId, todoId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    const todo = await Todo.findOne({ user: user._id, _id: todoId });
    if (!todo) res.status(404).json({ msg: 'Todo not found' });
    return res.json({ todo });
  } catch (err) {
    res.status(404).send(err);
  }
});


router.delete('/:userId/todo/:todoId', async (req, res) => {
  try {
    const { userId, todoId } = req.params;
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const result = await Todo.deleteOne({
      _id: todoId,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/:userId/todo/:todoId', async (req, res) => {
  try {
    const { userId, todoId } = req.params;
    const { title, description, completed } = req.body;
    if (!title) throw new Error('Title is required');
    if (
      req.body.hasOwnProperty('completed') &&
      typeof req.body.completed !== 'boolean'
    ) {
      return res
        .status(400)
        .send({ message: 'Completed property must be a boolean' });
    }
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, user: userId },
      { title, description, completed },
      { new: true }
    );
    if (!todo) {
      return res.status(404).send({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo updated successfully', todo });
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
