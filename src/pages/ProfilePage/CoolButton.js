import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CoolButton({ isOn, setIsOn }) {
  return (
    <Switch
      checked={isOn}
      onChange={setIsOn}
      className={classNames(
        isOn ? "bg-indigo-600" : "bg-gray-200",
        "hover:bg-gradient-to-r from-blue-500 via-green-500 to-blue-500  relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 "
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          isOn ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-150 ease-in-out"
        )}
      />
    </Switch>
  );
}
