import { Button } from "@/components/button";
import { H1 } from "@/components/text";
import { useTheme } from "@/contexts/theme";
import { login } from "@/services/auth";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";


export default function Login() {
    const { theme, radius, fontSize } = useTheme()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter()

    useEffect(() => {
        const token = SecureStore.getItem("token")

        if (token) {
            router.replace("/home")
        }
    }, [])



    const onPressLogin = async () => {
        if (!email.trim()) {
            Alert.alert("Erro", "Campo email é obrigatório")
            return
        }

        if (!senha.trim()) {
            Alert.alert("Erro", "Senha é obrigatória")
            return
        }

        const token = await login(email, senha)

        if (token) {
            await SecureStore.setItemAsync("token", token)
            router.replace("/home")
        } else {
            Alert.alert("Email ou senha inválidos")
        }

    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[
                styles.container,
                {
                    backgroundColor: theme.bodyBg,
                    gap: 20
                }
            ]
            }
        >
            <H1>login</H1>

            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: theme.borderColor,
                        backgroundColor: theme.tertiaryBg,
                        borderRadius: radius.base,
                        fontSize: fontSize.base
                    }
                ]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Email"
            />

            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: theme.borderColor,
                        backgroundColor: theme.tertiaryBg,
                        borderRadius: radius.base,
                        fontSize: fontSize.base
                    }
                ]}
                value={senha}
                onChangeText={setSenha}
                placeholder="Senha"
                secureTextEntry
            />

            <Button onPress={onPressLogin}>Entrar</Button>

            <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={{
                    color: theme.secondaryColor,
                    fontSize: fontSize.base
                }}>Não tem conta? cadastre-se</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        borderWidth: 1,
        padding: 14,
        width: 300
    }
})