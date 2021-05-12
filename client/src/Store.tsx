import React from "react";
import io, { Socket } from "socket.io-client";

type TopicTypes = "topic1" | "topic2" | string;

const initialState: { [key in TopicTypes]: { from: string; msg: string }[] } = {
  topic1: [
    {
      from: "aaron",
      msg: "hello",
    },
    {
      from: "arnold",
      msg: "hello",
    },
  ],
  topic2: [
    {
      from: "aaron",
      msg: "hello",
    },
    {
      from: "aaron",
      msg: "hello",
    },
  ],
};

let socket: Socket | null = null;

function sendChatAction(value: { from: string; msg: string; topic: string }) {
  socket?.emit("chat message", value);
}

export const CTX = React.createContext({
  allChats: initialState,
  sendChatAction,
  user: "",
});

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

function reducer(
  state: { [key in TopicTypes]: { from: string; msg: string }[] },
  action: {
    type: "RECEIVE_MESSAGE";
    payload: { from: string; msg: string; topic: string };
  }
): { [key in TopicTypes]: { from: string; msg: string }[] } {
  const { from, msg, topic } = action.payload;

  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg,
          },
        ],
      };
    default:
      return state;
  }
}

export default function Store({ children }: { children: React.ReactNode }) {
  if (!socket) {
    socket = io(":3001", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd",
      },
    }); // server port
    socket.on("chat message", function (msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const user = "aarron" + Math.random().toFixed(2);

  const [allChats, dispatch] = React.useReducer(reducer, initialState);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {children}
    </CTX.Provider>
  );
}
