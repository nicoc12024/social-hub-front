import React, { useContext } from "react";
import { UserCircleIcon, UserGroupIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import SignOut from "../auth/SignOut";
import { AuthContext } from "../../context/AuthProvider";
import { Link } from "react-router-dom";

export default function Header() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="bg-bgBlack flex items-center justify-between py-4 sm:px-24 p-6">
      <Link to="/home">
        <h1 className="font-bold text-2xl gradient-text font-montserrat cursor-pointer">
          Social Hub
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-gray1 font-bold hidden sm:block">{authUser?.email}</h2>
        <Popover className="z-40 relative">
          <Popover.Button>
            <UserCircleIcon className="h-10 w-10 cursor-pointer text-gray1" />
          </Popover.Button>
          <Transition
            className="absolute right-0 top-0"
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel>
              <div className="p-4 border-[1px] w-[260px] flex flex-col border-gray-300 bg-bgLightPurple text-gray2  absolute top-12 right-0 shadow-xl rounded">
                <Link to="/home">
                  <div className="grid grid-cols-4 items-center mb-2 group cursor-pointer ">
                    <HomeIcon className="h-9 w-9 stroke-1 mr-4 text-gray-400 group-hover:text-white transition duration-150" />
                    <p className="text-sm group-hover:text-white transition duration-150">
                      Home
                    </p>
                  </div>
                </Link>
                <Link to={`/profile/${authUser?.uid}`}>
                  <div className="grid grid-cols-4 items-center mb-2 group cursor-pointer ">
                    <UserGroupIcon className="h-9 w-9 stroke-1 mr-4 text-gray-400 group-hover:text-white transition duration-150" />
                    <p className="text-sm group-hover:text-white transition duration-150">
                      Profile
                    </p>
                  </div>
                </Link>

                <div className="h-[0.8px] mt-2 bg-gray-300 w-full mb-3"></div>
                <SignOut />
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  );
}
