import { API_PORT } from './utils/auth/authGlobals';
import {StylesConfig, GroupBase } from "react-select";
import { colors } from './styles/colors';

const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true';

export const WS_URL = isProduction ? `wss://housewell.com/v1/ws` : `ws://localhost:${API_PORT}/v1/ws`;

export const baseURL = isProduction ? `https://housewell.com` : `http://localhost:${API_PORT}`;

export const mapboxApiKey = isProduction ? 'pk.eyJ1IjoiYnJ5YW50cGEiLCJhIjoiY2xuaTg0M2t6MTh0YTJ0bXNpejZ5ZHVxYyJ9.vHw6StUhnv0_Nv3lelKeEQ'
  : 'pk.eyJ1IjoiYnJ5YW50cGEiLCJhIjoiY2xjOWE0cmMxMGk3bzQxbGhlanZhNzFvOCJ9.m421CzH3MmBf-rXYLKngiQ'

export const LOGOUT_USER = 'LOGOUT_USER';

type OptionType = {
  value: string;
  label: string;
};
  
export const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
    control: (base, state) => ({
      ...base,
      fontFamily: "Mint Grotesk",
      borderColor: state.isFocused ? colors.darkgreen1000 : base.borderColor,
      boxShadow: state.isFocused ? `0 0 0 1px ${colors.darkgreen1000}` : base.boxShadow,
      '&:hover': {
        borderColor: state.isFocused ? colors.darkgreen1000 : base.borderColor, // change border on hover too
      }
    }),
    option: (base, state) => ({
        ...base,
        fontFamily: "Mint Grotesk",
        backgroundColor: state.isFocused
          ? colors.darkgreen1000
          : state.isSelected
          ? colors.darkgreen500 // or a lighter green color code of your choice
          : base.backgroundColor,
        color: state.isFocused ? 'white' : base.color,
      }),
  };

  export const customStylesTaller = (width = 230) => ({
    control: (base, state) => ({
      ...base,
      fontFamily: "Mint Grotesk",
      height: '48px',
      borderRadius: '12px',
      width: `${width}px`,
      borderColor: state.isFocused ? 'transparent' : 'transparent', // Set the border to transparent for both default and focused states
      boxShadow: state.isFocused ? 'none' : base.boxShadow,
      backgroundColor: state.isFocused
        ? colors.gray100
        : state.menuIsOpen || state.hasValue 
        ? colors.gray100
        : colors.gray100,
      '&:hover': {
        borderColor: 'transparent', // Ensure it remains transparent on hover
      }
    }),
    option: (base, state) => ({
        ...base,
        fontFamily: "Mint Grotesk",
        backgroundColor: state.isFocused
          ? colors.darkgreen1000
          : state.isSelected
          ? colors.darkgreen500
          : base.backgroundColor,
        color: state.isFocused ? 'white' : base.color,
      }),
});
