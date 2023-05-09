import React, { useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import TextareaAutosize from "react-textarea-autosize";
import { FiEdit2 } from "react-icons/fi";
import { createCharLimitHandler } from "../../sharedUtils/utils/functions";

export default function ModalEditInfoProfile({
  setModalOpen,
  modalOpen,
  handleSubmit,
  username,
  profession,
  location,
  bio,
  setLocation,
  setProfession,
  setBio,
  setUsername,
  userInfoFromBackend,
}) {
  // Char counter from popup modal
  const [remainingBioChar, setRemainingBioChar] = useState(400);
  const [remainingLocationChar, setRemainingLocationChar] = useState(20);
  const [remainingProfessionChar, setRemainingProfessionChar] = useState(30);
  const [remainingUsernameChar, setRemainingUsernameChar] = useState(20);

  const handleBioChange = createCharLimitHandler(setBio, setRemainingBioChar, 400);
  const handleLocationChange = createCharLimitHandler(
    setLocation,
    setRemainingLocationChar,
    20
  );
  const handleProfessionChange = createCharLimitHandler(
    setProfession,
    setRemainingProfessionChar,
    30
  );
  const handleUsernameChange = createCharLimitHandler(
    setUsername,
    setRemainingUsernameChar,
    20
  );

  return (
    <Popover className="z-20 relative" open={modalOpen}>
      <Popover.Button onClick={() => setModalOpen(true)}>
        <div className="w-12 h-12 rounded-full cursor-pointer overflow-hidden">
          <div className="hover:bg-[#52356f] hover:opacity-90 transition duration-150 w-full h-full flex justify-center items-center">
            <FiEdit2 className="text-gray1 h-6 w-8 cursor-pointer" />
          </div>
        </div>
      </Popover.Button>
      <Transition
        show={modalOpen}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Popover.Panel className="border-[1px] min-w-[280px] sm:max-h-[650px] max-h-[550px] overflow-auto h-fit sm:w-[600px] w-full flex flex-col border-white/20 bg-bgLightPurple text-gray2 shadow-xl rounded">
          <div>
            <div className="cursor-pointer text-white">
              <p className="text-2xl w-full px-6 py-3 text-gray1 text-left border-b border-b-white/20">
                Update Profile
              </p>
              <form
                onSubmit={handleSubmit}
                className="text-gray1 flex flex-col justify-center rounded-lg"
              >
                <div className="py-6">
                  {/* username */}
                  <div className="px-6 pb-3">
                    <label htmlFor="username" className="text-gray2">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="New Username"
                      value={username}
                      onChange={handleUsernameChange}
                      className="max-w-xl w-full px-4 py-1 mt-1 bg-bgLightPurple text-gray1 border border-gray1 rounded  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {remainingUsernameChar === 0 && (
                      <p className="text-right text-gray2 mt-1 cursor-auto">
                        {remainingUsernameChar} characters remaining
                      </p>
                    )}
                  </div>
                  {/* location */}
                  <div className="px-6 pb-3">
                    <label htmlFor="location" className="text-gray2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="New Location"
                      value={location}
                      onChange={handleLocationChange}
                      className="max-w-xl w-full px-4 py-1 mt-1 bg-bgLightPurple text-gray1 border border-gray1 rounded  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {remainingLocationChar === 0 && (
                      <p className="text-right text-gray2 mt-1 cursor-auto">
                        {remainingLocationChar} characters remaining
                      </p>
                    )}
                  </div>
                  {/* profession */}
                  <div className="px-6 pb-3">
                    <label htmlFor="profession" className="text-gray2">
                      Profession
                    </label>
                    <input
                      type="text"
                      placeholder="New profession"
                      value={profession}
                      onChange={handleProfessionChange}
                      className="max-w-xl w-full px-4 py-1 mt-1 bg-bgLightPurple text-gray1 border border-gray1 rounded  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {remainingProfessionChar === 0 && (
                      <p className="text-right text-gray2 mt-1 cursor-auto">
                        {remainingProfessionChar} characters remaining
                      </p>
                    )}
                  </div>
                  {/* bio */}
                  <div className="px-6 pb-3">
                    <label htmlFor="bio" className="text-gray2">
                      Bio
                    </label>
                    <TextareaAutosize
                      type="text"
                      placeholder="New bio"
                      value={bio}
                      onChange={handleBioChange}
                      className="max-w-xl w-full px-4 py-1 mt-1 bg-bgLightPurple text-gray1 border border-gray1 rounded  focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    {remainingBioChar === 0 && (
                      <p className="text-right text-gray2 mt-1 cursor-auto">
                        {remainingBioChar} characters remaining
                      </p>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2 py-5 px-6 border-t border-t-white/20 ">
                  <button
                    type="button"
                    onClick={() => {
                      setModalOpen(false);
                      setUsername(userInfoFromBackend.username);
                      setBio(userInfoFromBackend.bio);
                      setProfession(userInfoFromBackend.profession);
                      setLocation(userInfoFromBackend.location);
                    }}
                    className="w-fit px-4 py-1 border-indigo-500 border text-white tracking-wider rounded-2xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => setModalOpen(false)}
                    className="w-fit px-4 py-1 bg-indigo-500 text-white tracking-wider rounded-2xl -sm hover:bg-indigo-600  transition duration-150 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
