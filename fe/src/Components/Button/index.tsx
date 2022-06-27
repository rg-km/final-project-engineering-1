import { classNames } from "../../Utils/classNames";
import { Link } from "react-router-dom";

type Props = {
  label?: string;
  className?: string;
  icon?: any;
  iconPlacement?: "left" | "right";
  iconClass?: string;
  white?: boolean;
  basic?: boolean;
  primary?: boolean;
  textClass?: string;
  danger?: boolean;
  success?: boolean;
  block?: boolean;
  medium?: boolean;
  bold?: boolean;
  to?: string;
  onClick?: (e?: any) => void;
};

export default function Button({
  label,
  className = "",
  icon,
  iconPlacement = "left",
  iconClass = "text-black",
  textClass = "",
  basic,
  white,
  primary,
  danger,
  success,
  block,
  medium,
  bold,
  to,
  onClick,
  ...rest
}: Props) {
  return to ? (
    <p className={classNames(block ? "w-full" : "inline-block")}>
      <Link
        to={to}
        {...rest}
        className={classNames(
          "flex flex-row items-center justify-center space-x-2 px-3 py-2",
          basic ? "bg-[#F8F9FA] hover:bg-gray-300" : "",
          white ? "bg-white text-black hover:bg-primary-light" : "",
          danger ? "bg-red-600 hover:bg-red-700" : "",
          primary ? "bg-primary hover:bg-primary-dark" : "",
          success ? "bg-success hover:bg-green-700" : "",
          className.includes("rounded") ? className : "rounded",
          className
        )}
      >
        {iconPlacement === "left" && icon && (
          <span className={iconClass}>{icon}</span>
        )}
        {label && (
          <span
            className={classNames(
              "inline-block text-center whitespace-nowrap",
              danger ? "text-white" : "",
              primary ? "text-white" : "",
              success ? "text-white" : "",
              medium ? "font-medium" : "",
              bold ? "font-bold" : "",
              textClass
            )}
          >
            {label}
          </span>
        )}
        {iconPlacement === "right" && icon && (
          <span className={iconClass}>{icon}</span>
        )}
      </Link>
    </p>
  ) : (
    <button
      className={classNames(
        "flex flex-row items-center justify-center space-x-2 px-3 py-2",
        block ? "w-full" : "",
        basic ? "bg-[#F8F9FA] hover:bg-gray-300" : "",
        white ? "bg-white text-black hover:bg-primary-light" : "",
        danger ? "bg-red-600 hover:bg-red-700" : "",
        primary ? "bg-primary hover:bg-primary-dark" : "",
        success ? "bg-success hover:bg-green-700" : "",
        className.includes("rounded") ? className : "rounded",
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {iconPlacement === "left" && icon && (
        <span className={iconClass}>{icon}</span>
      )}
      {label && (
        <span
          className={classNames(
            "inline-block text-center whitespace-nowrap",
            danger ? "text-white" : "",
            primary ? "text-white" : "",
            success ? "text-white" : "",
            medium ? "font-medium" : "",
            bold ? "font-bold" : "",
            textClass
          )}
        >
          {label}
        </span>
      )}
      {iconPlacement === "right" && icon && (
        <span className={iconClass}>{icon}</span>
      )}
    </button>
  );
}
