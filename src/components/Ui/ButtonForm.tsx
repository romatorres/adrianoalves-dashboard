import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "secondary_card"
    | "outline"
    | "link_enabled"
    | "link_disabled"
    | "link"
    | "danger"
    | "danger_card";
  isLoading?: boolean;
}

const buttonVariants = {
  primary:
    "bg-primary text-background hover:bg-primary_hover border-none px-5 py-2 rounded-lg duration-100",
  secondary:
    "bg-gray-02 text-white hover:text-white hover:bg-gray-01 px-5 py-2 border-none rounded-lg duration-100",
  outline:
    "bg-transparent text-gray-01 hover:text-white hover:bg-gray-02 px-5 py-2 border border-gray-02 rounded-lg duration-100",
  danger:
    "bg-red-500 text-white hover:bg-red-700 px-5 py-2 border-none rounded-lg duration-100",
  secondary_card:
    "text-gray-01 font-medium hover:text-background px-1 py-1 border-none duration-200",
  danger_card:
    "text-red-500 font-medium hover:text-red-700 px-1 py-1 border-none duration-200",
  link_enabled:
    "text-background hover:text-gray-01 border-none font-semibold bg-primary px-3 py-1 rounded-lg",
  link_disabled:
    "text-gray-03 hover:text-gray-02 border-none bg-secondary px-3 py-1 rounded-lg",
  link: "text-gray-01 hover:text-gray-02 border-none px-3 py-1",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading,
  children,
  className,
  ...props
}) => {
  const classes = classNames(
    "font-size-1em margin-1em padding-0.50em-1em border-2 border-radius-3 cursor-pointer transition-background-color-0.3s-ease color-0.3s-ease",
    buttonVariants[variant],
    className
  );

  return (
    <button className={classes} {...props}>
      {isLoading ? "Carregando..." : children}
    </button>
  );
};

export default Button;
