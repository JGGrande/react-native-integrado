import { Text } from "react-native";

type Props = {
    children: React.ReactNode
}
export const H1 = (props: Props) => {
    return (
        <Text
            style={{
                color: "black",
                fontSize: 36,
                fontWeight: "bold"
            }}
        >{props.children}</Text>
    );
}

export const H2 = (props: Props) => {
    return (
        <Text
            style={{
                color: "black",
                fontSize: 24,
                fontWeight: "bold"
            }}
        >{props.children}</Text>
    );
}