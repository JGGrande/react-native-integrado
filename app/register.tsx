import { H1 } from "@/components/text";
import { useTheme } from "@/contexts/theme";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput } from "react-native";

export default function Register() {
    const { theme, radius, fontSize } = useTheme()
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[
                styles.container,
                {
                    backgroundColor: theme.bodyBg,
                    gap: 20
                }
            ]}
        >
            <H1>Cadastro</H1>

            {/* Nome */}
            <TextInput 
                style={[
                    styles.input,
                    {
                        borderColor: theme.borderColor,
                        backgroundColor: theme.tertiaryColor,
                        borderRadius: radius.base,
                        fontSize: fontSize.base
                    }
                ]}
                placeholder="nome"
                value={nome}
                onChangeText={setNome}
            />

            {/* Email */}
            <TextInput 
                style={[
                    styles.input,
                    {
                        borderColor: theme.borderColor,
                        backgroundColor: theme.tertiaryColor,
                        borderRadius: radius.base,
                        fontSize: fontSize.base
                    }
                ]}
                placeholder="e-mail"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            {/* Senha */}
            <TextInput 
                style={[
                    styles.input,
                    {
                        borderColor: theme.borderColor,
                        backgroundColor: theme.tertiaryColor,
                        borderRadius: radius.base,
                        fontSize: fontSize.base
                    }
                ]}
                placeholder="senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

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