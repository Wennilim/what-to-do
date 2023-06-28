import {
  Button,
  ChakraProvider,
  Flex,
  Input,
  Text,
  theme,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { addTodo, deleteTodo, editTodo, getAllTodos } from './utils/api';

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [todoId, setTodoId] = useState('');
  const [displayLimit, setDisplayLimit] = useState(7);

  useEffect(() => {
    getAllTodos(setTodo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setTodoId(_id);
    setText(text);
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        bgImg={{
          base: 'none',
          md: 'https://freesvg.org/img/laurent_panda_point_d_interrogation.png',
        }}
        bgRepeat={'no-repeat'}
        bgSize={'300px'}
        bgPosition={'bottom left'}
        w={'100%'}
      >
        <Flex
          flexDirection={'column'}
          padding={5}
          justifyContent={'center'}
          alignItems={'center'}
          w={'100%'}
        >
          <Text fontSize={'3xl'} fontWeight={800}>
            What To Do?
          </Text>
          <Flex py={5}>
            <Input
              marginX={5}
              focusBorderColor="black"
              variant="flushed"
              placeholder="Add ToDos..."
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && text !== '') {
                  isUpdating
                    ? editTodo(todoId, text, setText, setTodo, setIsUpdating)
                    : addTodo(text, setText, setTodo);
                }
              }}
            />
            <Button
              shadow={'2xl'}
              isDisabled={text === '' ? true : false}
              onClick={() =>
                isUpdating
                  ? editTodo(todoId, text, setText, setTodo, setIsUpdating)
                  : addTodo(text, setText, setTodo)
              }
              variant="outline"
              colorScheme="black"
            >
              {isUpdating ? 'Update' : 'Add'}
            </Button>
          </Flex>
          {todo.slice(0, displayLimit).map(item => (
            <List
              key={item._id}
              content={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteMode={() => deleteTodo(item._id, setTodo)}
            />
          ))}
          {todo.length > displayLimit && (
            <Button
              onClick={() => setDisplayLimit(todo.length)}
              variant="outline"
              colorScheme="black"
              mt={2}
              w={'300px'}
            >
              Load More...
            </Button>
          )}
          {displayLimit > 7 && (
            <Button
              onClick={() => setDisplayLimit(7)}
              variant="outline"
              colorScheme="black"
              mt={2}
              w={'300px'}
            >
              Collapse
            </Button>
          )}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

function List({ content, updateMode, deleteMode }) {
  return (
    <Flex
      justifyContent={'space-between'}
      borderRadius={'md'}
      marginY={'2'}
      borderColor={'white'}
      bg="black"
      minWidth={'290px'}
      minH={'50px'}
      p={4}
      color="white"
      whiteSpace={'normal'}
      shadow={'2xl'}
    >
      {content}
      <Flex alignItems={'center'}>
        <EditIcon mr={1} cursor={'pointer'} onClick={updateMode} />
        <DeleteIcon ml={1} cursor={'pointer'} onClick={deleteMode} />
      </Flex>
    </Flex>
  );
}

export default App;
