import React, { useState, useContext, useEffect } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import { useParams } from "react-router";
import { BlogsFromUser } from "./BlogsFromUser";
import ModalEditInfoProfile from "./ModalEditInfoProfile";
import { useProfilePageHooks } from "./hooks/useProfileHooks";
import { AuthContext } from "../../context/AuthProvider";
import BarChart from "./BarChart";
import CoolButton from "./CoolButton";

export default function ProfilePage() {
  const params = useParams();
  const [isCoolButtonOn, setIsCoolButtonOn] = useState(false);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const {
    setUsername,
    setLocation,
    setProfession,
    setBio,
    updateBackend,
    uploadImage,
    userInfoFromBackend,
    blogsLikesAndComments,
    userBlogs,
    username,
    location,
    profession,
    bio,
  } = useProfilePageHooks(params.userId);

  // Handle submit from ModelEditInfoProfile
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update user profile
    await updateBackend(
      userInfoFromBackend.email,
      userInfoFromBackend.user_id,
      username,
      location,
      profession,
      bio
    );
  };

  // while loading
  if (userId === null) {
    return <div className="min-h-screen bg-bgDarkPurple"></div>;
  }

  return (
    <>
      {/* Overlay when popup is open */}
      {modalOpen && <div className="fixed inset-0 bg-black bg-opacity-80 z-20"></div>}

      {/* Main */}
      <div className="min-h-screen bg-bgDarkPurple">
        <Header />
        <div className="sm:grid sm:grid-cols-[2fr,1fr] lg:grid-cols-[1fr,3fr,1fr] grid grid-cols-1 px-8 lg:pt-0 pb-24 mx-auto max-w-[1400px] gap-6 align-top">
          {/* Empty Column */}
          <div className="sm:hidden lg:block md:col-span-1 text-white h-fit"></div>
          {/* Feed section update this div */}
          <div className="w-full col-span-1 sm:p-4 mx-auto">
            {/* Header of info profile  */}
            <div className="flex flex-row justify-between items-center">
              <div className="flex sm:flex-row flex-col items-left sm:items-center">
                {/* Profile picture */}
                {userId === params.userId ? (
                  <label htmlFor="profile-picture-upload" className="cursor-pointer">
                    <div className="w-28 h-28 border-2 border-gray1 rounded-full cursor-pointer overflow-hidden inline-block relative">
                      <div className="w-full h-full overflow-hidden">
                        <img
                          src={userInfoFromBackend?.profilePicture}
                          alt="User profile pic"
                          className="object-cover w-full h-full transition-opacity duration-200 hover:opacity-60"
                        />
                      </div>
                    </div>
                  </label>
                ) : (
                  <div className="w-28 h-28 border-2 border-gray1 rounded-full cursor-pointer overflow-hidden inline-block relative">
                    <div className="w-full h-full overflow-hidden">
                      <img
                        src={userInfoFromBackend?.profilePicture}
                        alt="User profile pic"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                )}

                {/* Profile picture upload */}
                <input
                  id="profile-picture-upload"
                  className="sr-only"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      uploadImage(e.target.files[0], userInfoFromBackend.user_id);
                    }
                  }}
                />
                <div className="sm:ml-4 ml-0">
                  <h1 className="text-left text-3xl text-gray1 font-montserrat">
                    {userInfoFromBackend?.username || "Username"}'s Profile
                  </h1>
                  <div className="flex   gap-2">
                    <p className="text-gray3 inline-block break-all">
                      {userInfoFromBackend?.profession || "Profession"}
                    </p>
                    <p className="text-gray3 inline-block">|</p>
                    <p className="text-gray3 inline-block break-all">
                      {userInfoFromBackend?.location || "Location"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Edit user profile modal */}
              {userId === params.userId && (
                <ModalEditInfoProfile
                  setModalOpen={setModalOpen}
                  modalOpen={modalOpen}
                  handleSubmit={handleSubmit}
                  username={username}
                  bio={bio}
                  profession={profession}
                  location={location}
                  setLocation={setLocation}
                  setProfession={setProfession}
                  setBio={setBio}
                  setUsername={setUsername}
                  userInfoFromBackend={userInfoFromBackend}
                />
              )}
            </div>

            {/* Bio */}
            <div className="pt-0 sm:pt-4 col-span-1 sm:hidden">
              <p className="text-gray1 text-2xl my-2">
                About {userInfoFromBackend?.username || "Username"}
              </p>
              <div className="border h-fit sm:col-span-1 border-gray-100 border-opacity-60 rounded px-4 py-2">
                <p className="text-gray3 leading-5">
                  {userInfoFromBackend?.bio || "Bio section"}
                </p>
              </div>
            </div>

            <div className="py-2 px-4 my-4 bg-bgLightPurple2 w-fit rounded-md flex items-center justify-start gap-x-4">
              <p className="text-gray3 inline-block break-all">
                View {userInfoFromBackend?.username}'s blog stats from most recent to
                least recent
              </p>
              <CoolButton isOn={isCoolButtonOn} setIsOn={setIsCoolButtonOn} />
            </div>

            {/* User blogs posts stats */}
            {isCoolButtonOn && (
              <div className="my-8">
                <BarChart blogsLikesAndComments={blogsLikesAndComments} />
              </div>
            )}

            {/* Blogs from user */}
            <div>
              {userBlogs.length === 0 ? (
                <h1 className="text-white mt-20">You have not created any blogs yet</h1>
              ) : (
                <BlogsFromUser userBlogs={userBlogs} />
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="pt-0 sm:pt-4 col-span-1 hidden sm:block">
            <p className="text-gray1 text-2xl mb-4">
              About {userInfoFromBackend?.username || "Username"}
            </p>
            <div className="border h-fit sm:col-span-1 border-gray-100 border-opacity-60 rounded-md px-4 py-2">
              <p className="text-gray3 leading-5">
                {userInfoFromBackend?.bio || "Bio section"}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
