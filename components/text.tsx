import { useTheme } from "@/contexts/theme";
import { Text } from "react-native";

type Props = {
    children: React.ReactNode
}
export const H1 = (props: Props) => {
    const { theme } = useTheme()
    return (
        <Text
            style={{
                color: theme.text,
                fontSize: 36,
                fontWeight: "bold"
            }}
        >{props.children}</Text>
    );
}

export const H2 = (props: Props) => {
    const { theme } = useTheme()
    return (
        <Text
            style={{
                color: theme.text,
                fontSize: 24,
                fontWeight: "bold"
            }}
        >{props.children}</Text>
    );
}