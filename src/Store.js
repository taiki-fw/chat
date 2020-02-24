import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

/*

msg: {
  form: 'user',
  msg: 'hi',
  topic: 'general'
}

state: {
  topic1: 
    [
      msg, msg, msg
    ]
  ,
  topic2: 
    [
      msg, msg, msg
    ]
  
}

 */

const initialState = {
  topic1: [
    {
      from: "aaron",
      msg: "hello"
    },
    {
      from: "arnold",
      msg: "hello"
    }
  ],
  topic2: [
    {
      from: "aaron",
      msg: "hello"
    },
    {
      from: "aaron",
      msg: "hello"
    }
  ]
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;

  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  if (!socket) {
    socket = io(":3001"); // server port
    socket.on("chat message", function(msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const user = "aarron" + Math.random(100).toFixed(2);

  const [allChats, dispatch] = React.useReducer(reducer, initialState);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
