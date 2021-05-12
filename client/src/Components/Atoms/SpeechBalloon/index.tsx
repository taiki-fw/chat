import { VFC } from "react";
import "./style.css";

type Props = {
  isImg?: boolean;
  children: string;
};

export const SpeechBalloon: VFC<Props> = ({ isImg, children: context }) => {
  return <div className={"speeach-ballon"}>{context}</div>;
};
