import { classNames } from "../../Utils/classNames";

type Props = {
  label?: string;
  primary?: boolean;
};

export default function Checkbox({ label, primary }: Props) {
  return (
    <div className="form-check space-x-1">
      <input
        className={classNames(
          "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer",
          primary
            ? "checked:bg-primary-light checked:border-primary-dark"
            : "checked:bg-blue-600 checked:border-blue-600"
        )}
        type="checkbox"
      />
      <label className="form-check-label inline-block text-gray-800">
        {label}
      </label>
    </div>
  );
}
