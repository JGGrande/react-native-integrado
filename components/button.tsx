import { useTheme } from "@/contexts/theme";
import { Text, TouchableOpacity } from "react-native";

type Props = {
    onPress: () => void;
    children: string;
}

export const Button = (props: Props) => {
    const { theme } = useTheme()
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{
                backgroundColor: theme.button,
                width: 200,
                height: 100,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 20
            }}
        >
            <Text
                style={{
                    color: theme.text,
                    fontWeight: "bold",
                    fontSize: 20,
                }}
            >{props.children}</Text>
        </TouchableOpacity>
    )
}