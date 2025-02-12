import React from "react";
import classNames from "classnames";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "error";
}

const inputVariants = {
  default:
    "bg-gray-04 text-background border-gray-300 focus:border-gray-03 focus:ring-gray-02",
  error:
    "bg-white text-background border-red-500 focus:border-gray-03 focus:ring-red-700",
};

const Input: React.FC<InputProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const classes = classNames(
    "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none transition duration-300",
    inputVariants[variant],
    className
  );

  return <input className={classes} {...props} />;
};

export default Input;
