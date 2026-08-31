import { Button } from "@/components/button";
import { ProfilePicture } from "@/components/profile-picture";
import { H1, H2 } from "@/components/text";
import { useTheme } from "@/contexts/theme";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Pessoa = {
  nome: string;
  idade: number;
  fotoURL: string;
}

const joao: Pessoa = {
  nome: "João",
  idade: 90,
  fotoURL: "https://avatars.githubusercontent.com/u/106830297?v=4"
}


export default function Profile() {
  const [pessoa, setPessoa] = useState<Pessoa | null>(joao);
  const { toggleTheme, theme, space } = useTheme()
  const router = useRouter()

  const selectUserPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert("Erro", "Preciso de permissão para acessar a galeria...")
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })


    setPessoa({
      nome: "Joao",
      idade: 31,
      fotoURL: result.assets![0].uri
    })
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync("token")
    router.replace("/login")
  }

  return (
    <SafeAreaView
      style={
        [
          styles.container,
          {
            backgroundColor: theme.bodyBg,
            padding: space[6],
            gap: space[2]
          }]
      }
    >
        <ProfilePicture
          fotoUrl={pessoa?.fotoURL ?? ""}
        />

        <H1>{pessoa?.nome}</H1>
        <H2>{pessoa?.idade} Anos</H2>

        <Button onPress={selectUserPhoto}>Selecionar foto</Button>
        <Button onPress={toggleTheme}>Trocar tema</Button>
        <Button onPress={logout}>Deslogar</Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})