import React from "react";

const HighlightBox = ({ title, value, Icon }) => {
  return (
    <div className="bg-sky-700 text-white p-4 rounded-md w-full sm:w-60">
      <div>
        <div className="text-xl sm:text-xxl font-semibold mb-2">{title}</div>
        <div className="sm:justify-evenly">
          <Icon className="text-3xl sm:text-4xl" />
          <p className="text-4xl sm:text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default HighlightBox;
