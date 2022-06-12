import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import _ from 'lodash';

const boxStyle = {
  width: '50%',
  height: 'auto',
  backgroundColor: '#DEDEDE',
  margin: 5,
  padding: 3,
  display: 'flex',
  alignItems: 'center',
};

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState('');
  const [editing, setEditing] = useState('');

  const handleOnClickEdit = (index) => {
    const todoCopy = _.cloneDeep(todo);
    todoCopy[index].editing = true;
    setTodo(todoCopy);
  };

  const handleOnClickCancel = (index) => {
    const todoCopy = _.cloneDeep(todo);
    todoCopy[index].editing = false;
    setTodo(todoCopy);
  };

  const handleOnClickEdited = (index) => {
    // let todoCopy = todo[index];
    // todoCopy.editing = true;
    // todo[index] = todoCopy;
    const todoCopy = _.cloneDeep(todo);
    todoCopy[index].value = editing;
    todoCopy[index].editing = false;
    setTodo(todoCopy);
  };

  const handleOnClickFinish = (index) => {
    const todoCopy = _.cloneDeep(todo);
    todoCopy[index].finish = true;
    setTodo(todoCopy);
  };

  const handleOnClickRevert = (index) => {
    const todoCopy = _.cloneDeep(todo);
    todoCopy[index].finish = false;
    setTodo(todoCopy);
  };

  const handleOnClick = () => {
    setTodo([...todo, { value: input, editing: false, finish: false }]);
    setInput('');
  };

  const handleOnChange = (event) => {
    setInput(event.target.value);
  };

  const handleOnClickDone = (index) => {
    // let filter = todo.splice(index, 1);
    // console.log(filter)
    // setTodo({ ...todo });
  };

  const renderEditedTodoList = (data, index) => {
    if (data.finish === false) {
      return (
        <div>
          {data.editing === true ? (
            <>
              <TextField
                defaultValue={todo[index].value}
                onChange={(event) => setEditing(event.target.value)}
              />
              <Button onClick={() => handleOnClickCancel(index)}>Cancel</Button>
              <Button onClick={() => handleOnClickEdited(index)}>Finish</Button>
            </>
          ) : (
            <div>
              {data.value}{' '}
              <Button
                onClick={() => handleOnClickEdit(index)}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button onClick={() => handleOnClickFinish(index)}>Finish</Button>
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  const taskFinish = (data, index) => {
    if (data.finish === true) {
      return (
        <div>
          {data.value}{' '}
          <Button onClick={() => handleOnClickRevert(index)}>Revert</Button>
          <Button onClick={() => handleOnClickDone(index)}>Done</Button>
        </div>
      );
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box sx={boxStyle}>
        <TextField value={input} onChange={handleOnChange} />
        <Button
          style={{ margin: 10 }}
          variant='outlined'
          onClick={handleOnClick}
          value='hi'
        >
          Add
        </Button>
      </Box>
      <Box sx={boxStyle}>
        {todo?.map((data, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {renderEditedTodoList(data, index)}
          </div>
        ))}
      </Box>
      <Box sx={boxStyle}>
        <div>
          {todo?.map((data, index) => (
            <div key={index}>{taskFinish(data, index)}</div>
          ))}
        </div>
      </Box>
    </div>
  );
}

export default App;
