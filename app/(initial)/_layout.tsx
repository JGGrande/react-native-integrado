import FontAwesome from "@expo/vector-icons/FontAwesome"
import { Tabs } from "expo-router"

export default function Layout() {
    return (
        <Tabs>
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
            <Tabs.Screen 
                name="pastel"
                options={{
                    title: "Pastel no header",
                    tabBarIcon: ({ color }) => <FontAwesome size={18} name="hand-grab-o" color={color} />
                }}
            />
        </Tabs>
    )
}