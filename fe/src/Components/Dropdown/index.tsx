import { Menu, Transition } from "@headlessui/react";
import { ReactNode, Fragment } from "react";
import { classNames } from "../../Utils/classNames";
import { CaretDownIcon } from "../Icons";

type Props = {
  label: string;
  items: Item[];
  leftIcon?: ReactNode;
  classNameButton?: string;
};

export type Item = {
  label: string;
  icon: any;
  onClick: any;
};

export default function Dropdown({
  label,
  leftIcon,
  items,
  classNameButton = "",
}: Props) {

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={classNames(
              "inline-flex w-full items-center justify-center space-x-4 rounded-md py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
              classNameButton
            )}
          >
            {leftIcon}
            <span className="font-medium text-primary whitespace-nowrap">{label}</span>
            <span className='text-primary'>{CaretDownIcon}</span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white shadow-lg border focus:outline-none overflow-hidden">
            {items.map((item, idx) => (
              <div className="" key={idx}>
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      className={classNames(
                        "group flex w-full items-center px-2 py-2 text-sm space-x-2 text-primary",
                        active ? "bg-primary-light" : ""
                      )}
                      onClick={item.onClick}
                    >
                      <div className='h-4 w-4 text-primary'>{item.icon}</div>
                      <span>{item.label}</span>
                    </button>
                  )}
                </Menu.Item>
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
