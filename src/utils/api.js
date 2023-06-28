import axios from 'axios';

const baseUrl = 'https://what-to-do-backend.onrender.com';

const getAllTodos = async setTodo => {
  try {
    const response = await axios.get(baseUrl);
    setTodo(response.data);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const addTodo = async (text, setText, setTodo) => {
    try {
      const response = await axios.post(`${baseUrl}/add`, { text });
      console.log(response.data);
      setText('');
      await getAllTodos(setTodo);
    } catch (error) {
      console.log(error);
    }
  };

const editTodo = async (todoId, text, setText, setTodo, setIsUpdating) => {
    try {
      const response = await axios.put(`${baseUrl}/update`, { _id: todoId, text });
      console.log(response.data);
      setText('');
      getAllTodos(setTodo);
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
    }
  };

const deleteTodo = async (_id, setTodo) => {
  try {
    const response = await axios.delete(`${baseUrl}/delete`, { data: { _id } });
    console.log('🧩', response.data);
    getAllTodos(setTodo);
  } catch (error) {
    console.log(error);
  }
};

export { getAllTodos, addTodo, editTodo, deleteTodo };
