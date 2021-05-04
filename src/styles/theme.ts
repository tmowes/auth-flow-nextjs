import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#252A37',
      '700': '#494D4B',
      '600': '#565964',
      '500': '#616480',
      '400': '#AFB2B1',
      '300': '#DADADA',
      '200': '#E6E8EB',
      '100': '#F7F8FA',
    },
    orange: {
      '500': '#E65100',
    },
    orangeAlpha: {
      '500': '#E6510080',
    },
    grayAlpha: {
      '500': '#AFB2B180',
      '300': '#AFB2B14D',
      '100': '#AFB2B120',
    },
  },
  fonts: {
    heading: 'Lexend, sans-serif',
    body: 'Inter, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.100',
        overflowX: 'hidden',
        focusBorderColor: 'orangeAlpha.500',
      },
    },
  },
})
