import {
  gray,
  slate,
  slateA,
  blue,
  red,
  green,
  grayDark,
  slateDark,
  slateDarkA,
  blueDark,
  redDark,
  greenDark,
  indigo,
  indigoDark,
  whiteA,
  blackA
} from "@radix-ui/colors"

export type Colors = typeof colors.light & typeof colors.dark

export const colors = {
  light: {
    ...indigo,
    ...gray,
    ...slate,
    ...slateA,
    ...blue,
    ...red,
    ...green,
    ...whiteA,
    ...blackA,
    bg: "#ffffff",
    lm: "#ededed",
  },
  dark: {
    ...indigoDark,
    ...grayDark,
    ...slateDark,
    ...slateDarkA,
    ...blueDark,
    ...redDark,
    ...greenDark,
    ...whiteA,
    ...blackA,
    bg: "#1a1a1f",
    lm: "#1a1a1f",
  },
}
