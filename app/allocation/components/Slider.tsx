import * as React from 'react';
import Slider, { SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const StyledSlider = styled(Slider)({
  'color': '#c0c0c0',
  'height': 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    'height': 24,
    'width': 24,
    'backgroundColor': '#fff',
    'border': '2px solid #323232',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    'lineHeight': 1.2,
    'fontSize': 12,
    'background': 'unset',
    'padding': 0,
    'width': 32,
    'height': 32,
    'borderRadius': '50% 50% 50% 0',
    'backgroundColor': '#52af77',
    'transformOrigin': 'bottom left',
    'transform': 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

export const CustomizedSlider: React.FC<SliderProps> = (props) => {
  return (
    <StyledSlider
      {...props}
    />
  );
};
