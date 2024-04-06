// tailwind.config.js

import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ], // remove unused styles in production
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [nextui(), require("daisyui")],
  daisyui: {
    themes: [
      {
        'see2': {
          'primary': '#212121',
          'primary-focus': '#3d3d3d',
          'primary-content': '#ffffff',

          'secondary': '#212121',
          'secondary-focus': '#3d3d3d',
          'secondary-content': '#ffffff',

          'accent': '#b4e9d6',
          'accent-focus': '#8cdec0',
          'accent-content': '#ffffff',

          'neutral': '#71abc6',
          'neutral-focus': '#4b96b9',
          'neutral-content': '#ffffff',

          'base-100': '#131313',
          'base-200': '#ced3d9',
          'base-300': '#ced3d9',
          'base-content': '#898d90',

          'info': '#1c92f2',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',

          '--rounded-box': '1rem',
          '--rounded-btn': '1.9rem',
          '--rounded-badge': '1.9rem',

          '--animation-btn': '.25s',
          '--animation-input': '.2s',

          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
        },
      },
    ],
  },
}