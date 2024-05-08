import { Theme } from "@emotion/react"
import { Colors, colors } from "./color"

declare module "@emotion/react" {
  export interface Theme {
    colors: Colors
  }
}

export type Scheme = "light" | "dark"

type Options = {
  scheme: Scheme
}

export const createTheme = (options: Options): Theme => ({
  colors: colors[options.scheme]
})
