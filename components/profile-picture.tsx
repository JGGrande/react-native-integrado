import { Image } from "expo-image";
import { View } from "react-native";

type Props = {
    fotoUrl: string
}

export const ProfilePicture = (props: Props) => {
    return (
        <View
            style={{
                width: 200,
                height: 200,
                borderRadius: 50,
                marginBottom: 20,
                overflow: "hidden"
            }}
        >
            <Image
                source={{
                    uri: props.fotoUrl
                }}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            />
        </View>
    );
}