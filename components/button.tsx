import { Text, TouchableOpacity } from "react-native";

type Props = {
    onPress: () => void;
    children: string;
}

export const Button = (props: Props) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={{
                backgroundColor: "red",
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
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 20,
                }}
            >{props.children}</Text>
        </TouchableOpacity>
    )
}