import { createContext, useContext, useEffect, useState } from "react"
import { useColorScheme } from "react-native"

const DARK = {
  background: "#070709",
  button: "#C8FF00",
  text: "#FFF"
}

const LIGHT = {
  background: "#F4F4EF",
  button: "#0F0F1A",
  text: "#454ac8"
}

type ThemeColor = "light" | "dark"

type ThemeContextType = {
    currentColor: ThemeColor
    theme: typeof DARK
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

type Props = {
    children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
    const colorSchema = useColorScheme()
    const [color, setColor] = useState<ThemeColor>(colorSchema as ThemeColor) // light e dark
    const [theme, setTheme] = useState(DARK); // Hexadecimal

    const toggleTheme = () => {
        if (color === "light") {
            setTheme(DARK)
            setColor("dark")
        }

        if (color === "dark") {
            setTheme(LIGHT)
            setColor("light")
        }
    }

    useEffect(() => {
        if(colorSchema === "light") {
            setTheme(LIGHT)
        }else {
            setTheme(DARK)
        }
    }, [colorSchema])

    return (
        <ThemeContext.Provider value={{
            currentColor: color,
            theme: theme,
            toggleTheme: toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (context === null) {
        throw new Error("Use dentro do <ThemeContext>")
    }
    return context
}