import React from "react";
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root"));

function taskReducer(state, action) {
  switch (action.type) {
    case "task/completed":
      const newArray = [...state];
      const elementIndex = newArray.findIndex(
        (el) => el.id === action.payload.id
      );
      newArray[elementIndex].completed = true;
      return newArray;

    default:
      break;
  }
}
const store = createStore(taskReducer, [
  {
    id: 1,
    description: "Task 1",
    completed: false,
  },
  {
    id: 2,
    description: "Task 2",
    completed: false,
  },
]);

function createStore(reducer, initialState) {
  let state = initialState;

  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
  }
  return {
    getState,
    dispatch,
  };
}

const App = (params) => {
  const state = store.getState();

  const completeTask = (taskId) => {
    store.dispatch({ type: "task/completed", payload: { id: taskId } });

    console.log(store.getState());
  };
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => (
          <li key={el.id}>
            <p>{el.description}</p>
            <p>{`Completed: ${el.completed}`}</p>
            <button onClick={() => completeTask(el.id)}>completed</button>
          </li>
        ))}
      </ul>
    </>
  );
};
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
