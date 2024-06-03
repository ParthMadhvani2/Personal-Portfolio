"use client";

import React from 'react';

const SubscribeButton: React.FunctionComponent = () => {
  const handleSubscribeClick = () => {
    window.open("https://parthmadhvani.substack.com/embed", "_blank");
  };

  return (
    <div>
      <button
        className="mt-12 max-md:mx-auto text-black bg-slate-200 p-2 rounded-md hover:brightness-110"
        onClick={handleSubscribeClick}
      >
        {'Subscribe to my newsletter'}
      </button>
    </div>
  );
};

export default SubscribeButton;
