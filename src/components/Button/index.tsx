import { ButtonHTMLAttributes } from "react";
import "../../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export const Button = ({ isOutlined = false, ...rest }: ButtonProps) => (
  <button className={`button ${isOutlined && "outlined"}`} {...rest} />
);
