import { EVENTS } from "@/mocks/evento";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {

    return (
        <SafeAreaView>
            <FlatList 
                data={EVENTS}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (<Text>{item.title}</Text>)}
            />
        </SafeAreaView>
    )
}