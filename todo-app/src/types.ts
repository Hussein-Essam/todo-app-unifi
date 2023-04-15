export interface Todo {
  _id: string;
  description: string;
  title: string;
  completed: boolean;
  user?: User;
}

interface User {
  _id: string;
  email: string;
  name: string;
}
