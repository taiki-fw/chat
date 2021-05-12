import React, { useState } from "react";
import { CTX } from "../../Store";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  List,
  Chip,
  Button,
  TextField,
} from "@material-ui/core";
import { SpeechBalloon } from "../Atoms";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey",
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20px",
  },
  chatBox: {
    width: "85%",
  },
  button: {
    width: "15%",
    marginRight: "10px",
  },
}));

export function Chat() {
  const classes = useStyles();
  const { chatId } = useParams<{ chatId: string }>();

  const { allChats, sendChatAction, user } = React.useContext(CTX);
  const [textValue, changeTextValue] = useState("");

  const chatData = allChats[chatId];

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h5">
          {chatId}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.chatWindow}>
            <List>
              {
                // @ts-ignore
                chatData.map((chat, index) => (
                  <div className={classes.flex} key={index}>
                    <Chip label={chat.from} className={classes.button} />
                    <SpeechBalloon>{chat.msg}</SpeechBalloon>
                  </div>
                ))
              }
            </List>
          </div>
        </div>
        <div className={classes.flex}>
          <TextField
            label="Send a Chat"
            className={classes.chatBox}
            value={textValue}
            onChange={(e) => changeTextValue(e.target.value)}
          />
          <Button
            onClick={() => {
              sendChatAction({
                from: user,
                msg: textValue,
                topic: chatId,
              });
              changeTextValue("");
            }}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
}
