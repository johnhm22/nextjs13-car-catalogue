import { MouseEvent } from "react";

export interface ICustomButton {
  title: string;
  containerStyles?: string;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  btnType: "button" | "submit";
}
