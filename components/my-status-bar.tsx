import { useTheme } from "@/contexts/theme"
import { StatusBar } from "expo-status-bar"

export const MyStatusBar = () => {
    const { currentColor, theme } = useTheme()

    return (
        <>
            <StatusBar 
                style={currentColor === "dark" ? "light" : "dark"}
                backgroundColor={theme.bodyBg}
            />
        </>
    )
}