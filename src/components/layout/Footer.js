import React from "react";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-4 font-nunito bg-bgBlack py-12 text-white">
      <h2 className="text-[95px] font-light text-center mb-4 break-all">Let´s Connect</h2>
      <button className="px-4 py-2 rounded mb-10">
        <a
          target="_blank"
          type="button"
          rel="noopener noreferrer"
          className="text-black font-[500] butn butn__new"
          href="mailto:nicoc12024@gmail.com"
        >
          Send me an email
        </a>
      </button>
      <div className="text-gray-400">
        &copy; {new Date().getFullYear()} Nicolás Cabello - All Rights Reserved -{" "}
        <a
          href="https://www.linkedin.com/in/nicocabello/"
          className="text-gray2 px-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/nicoc12024"
          className="text-gray2 px-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          target="_blank"
          type="button"
          rel="noopener noreferrer"
          className="text-gray2 px-4"
          href="mailto:nicoc12024@gmail.com"
        >
          Send me an email
        </a>
      </div>
    </footer>
  );
}
