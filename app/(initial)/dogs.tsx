import { Button } from "@/components/button"
import { H1 } from "@/components/text"
import { useTheme } from "@/contexts/theme"
import axios from "axios"
import { Image } from "expo-image"
import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Dogs() {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<string | null>(null)
    const { theme } = useTheme()

    const loadImage = async () => {
        setLoading(true)
        
        try {
            const resposta = await axios.get("https://dog.ceo/api/breeds/image/random")
            setImage(resposta.data.message)
        }catch {
            Alert.alert("Erro ao buscar foto de cachorro")
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadImage()
    }, [])

    if (loading) {
        return (
            <SafeAreaView style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.bodyBg
            }}>
                <ActivityIndicator color={"red"} />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.bodyBg
        }}>
            <H1>Aqui vai ter cachorros</H1>

            {
                image
                    ? (
                        <View style={{ width: 300, height: 300 }}>
                            <Image
                                style={{ width: "100%", height: "100%" }}
                                source={{ uri: image }}
                            />

                            <Button onPress={loadImage}>Recarregar</Button>
                        </View>
                    )
                    : (<></>)
            }

        </SafeAreaView>
    )
}