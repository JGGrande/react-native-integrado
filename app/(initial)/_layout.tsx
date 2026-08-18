import { useTheme } from "@/contexts/theme"
import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

export default function Layout() {
    const { theme } = useTheme()

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.secondaryColor,
                tabBarStyle: {
                    backgroundColor: theme.secondaryBg,
                    borderTopColor: theme.borderColor,
                },
            }}
        >
            <Tabs.Screen 
                name="home"
                options={{
                    title: "Initial",
                    tabBarIcon: ({ color }) => <FontAwesome size={18} name="home" color={color} />
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <FontAwesome size={18} name="user" color={color} />
                }}
            />
        </Tabs>
    )
}