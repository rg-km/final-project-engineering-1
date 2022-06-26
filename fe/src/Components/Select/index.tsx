import { ReactNode } from "react";
import ReactSelect from "react-select";
import { classNames } from "../../Utils/classNames";

type Props = {
  onChange: (...event: any[]) => void;
  value: any;
  label?: string;
  options: { value: string | number; label: string }[];
  name?: string;
  info?: string | ReactNode;
  infoType?: "info" | "danger" | "primary" | "success";
  error?: string;
  disabled?: boolean;
  placeholder?: string;
};

export default function Select({
  value,
  onChange,
  label,
  options = [],
  name,
  info,
  infoType = "info",
  error,
  disabled = false,
  placeholder,
}: Props) {
  const styles = {
    control: (provided: any) => ({
      ...provided,
      padding: "2px",
    }),
  };

  return (
    <div className="space-y-2">
      <label className="inline-block" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <ReactSelect
          styles={styles}
          id={name}
          name={name}
          options={options}
          value={options.find((x) => x.value === value)}
          onChange={(val) => onChange(val?.value)}
          isDisabled={disabled}
          placeholder={placeholder}
        />
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
