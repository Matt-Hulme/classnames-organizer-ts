import React from 'react';

export const jsxMock: React.ReactElement = (
    <div>
      <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"></div>
      <div className="border border-blue-500 hover:border-transparent rounded md:border-green-500"></div>
      <div className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded lg:text-red-500"></div>
      <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full md:bg-green-500"></div>
      <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full lg:bg-red-500"></div>
      <div className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full md:text-green-500"></div>
      <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2 lg:bg-red-500"></div>
      <div className="border rounded-b border-blue-500 px-4 py-2 md:border-green-500"></div>
    </div>
);