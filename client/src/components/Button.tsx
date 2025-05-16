import React from "react";
import "./Button.css";

type ButtonProps = {
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <button className={`custom-button ${props.className || ""}`} {...props}>
      {text}
    </button>
  );
};
