import React, { useState } from "react";
import SignIn from "../../components/auth/SignIn";
import { Popover, Transition } from "@headlessui/react";
import ForgotPassword from "../../components/auth/ForgotPassword";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const AuthPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [signUpModalActive, setSignUpModalActive] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  return (
    <div className="flex flex-col items-center pt-8 bg-black bg-opacity-30 h-screen w-screen">
      {/* Overlay */}
      {modalOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 ${
            signUpModalActive ? "z-10" : "z-20"
          }`}
        ></div>
      )}
      <h1 className="font-bold text-center text-6xl p-4 gradient-text font-montserrat">
        Welcome to Social Hub
      </h1>
      <p className="text-gray2 text-xl max-w-[700px] w-full mb-8 px-4 text-center font-montserrat">
        Connect with like-minded individuals. Share your stories and learn from everyday
        experiences.
      </p>
      <SignIn setSignUpModalActive={setSignUpModalActive} />
      {/* Popup Reset Password  */}
      <div className="pt-4 px-4">
        <Popover
          className={`relative ${signUpModalActive ? "z-10" : "z-20"}`}
          open={modalOpen}
        >
          <Popover.Button onClick={() => setModalOpen(true)}>
            <p className="text-gray2 mt-4 cursor-pointer">Reset password</p>
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
            <Popover.Panel>
              <ForgotPassword setModalOpen={setModalOpen} />
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
      <Particles
        className="h-screen w-screen fixed top-0 left-0 -z-10 	"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: false,
          background: { image: " linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)" },
          particles: {
            number: { value: 10, density: { enable: true, value_area: 600 } },
            color: { value: "#ffffff" },
            shape: {
              type: "square",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 },
            },
            opacity: {
              value: 0.25,
              random: true,
              anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 29,
              random: true,
              anim: { enable: false, speed: 2, size_min: 0.1, sync: false },
            },
            line_linked: {
              enable: false,
              distance: 300,
              color: "#ffffff",
              opacity: 0,
              width: 0,
            },
            move: {
              enable: true,
              speed: 0.5,
              direction: "top",
              straight: true,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: false, mode: "repulse" },
              onclick: { enable: false, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 800, line_linked: { opacity: 1 } },
              bubble: { distance: 790, size: 79, duration: 2, opacity: 0.8, speed: 3 },
              repulse: { distance: 400, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        }}
      />
    </div>
  );
};

export default AuthPage;
