import {
  forwardRef,
  ForwardRefExoticComponent,
  TextareaHTMLAttributes,
} from "react";
import { classNames } from "../../Utils/classNames";
import { CheckIcon } from "../Icons";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  classContainer?: string;
  info?: string;
  infoType?: "info" | "danger" | "primary" | "success";
  error?: string;
  filename?: string;
  checked?: boolean;
  rows?: number;
}
const TextArea: ForwardRefExoticComponent<Props> = forwardRef<
  HTMLTextAreaElement,
  Props
>(
  (
    {
      label,
      info,
      infoType = "info",
      error,
      classContainer = "",
      filename = "",
      checked,
      rows = 5,
      ...rest
    },
    ref
  ) => {
    const { name } = rest;

    return (
      <div className={classNames("space-y-2", classContainer)}>
        {label && (
          <label className="inline-block" htmlFor={name}>
            {label}
          </label>
        )}
        <div className="flex flex-row w-full relative">
          <textarea
            id={name}
            name={name}
            ref={ref}
            className={classNames(
              "grow border border-gray-300 p-2 outline-none w-full rounded-md"
            )}
            rows={rows}
            {...rest}
          />
          {checked && (
            <span className="h-6 w-6 text-green-400 absolute right-4 top-1/2 -translate-y-1/2 ">
              {CheckIcon}
            </span>
          )}
        </div>
        {!error && info && (
          <p
            className={classNames(
              "text-xs inline-block",
              infoType === "danger" ? "text-red-600" : "",
              infoType === "success" ? "text-green-500" : "",
              infoType === "primary" ? "text-primary" : ""
            )}
          >
            {info}
          </p>
        )}
        {error && (
          <span className="text-sm inline-block text-red-600">{error}</span>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
