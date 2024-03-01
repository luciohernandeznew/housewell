import React, { createContext, useState, useContext } from 'react';

// Create a Context with a default value of false
export const WaterMarkContext = createContext({
  hasWaterMark: false,
  setHasWaterMark: (value: boolean) => {},
});
