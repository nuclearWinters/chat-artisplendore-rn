import React, { useState, useEffect } from "react"
import { View, Text, Button, Alert, AsyncStorage, ScrollView, ActivityIndicator } from "react-native"
import axios from "axios"
import { InputAndroid, InputAndroidPassword } from "./input"

const Registrarse = props => {

    const [loading, setLoading] = useState(true)

    const [usuario, setUsuario] = useState("")
    const [contraseña, setContraseña] = useState("")
    const [contraseñaConfirmar, setContraseñaConfirmar] = useState("")

    useEffect(() => {
        AsyncStorage.getItem("token")
        .then(token => {
            if (token) {
                    setLoading(false)
                    props.navigation.navigate("Main", {token})
            } else {
                setLoading(false)
            }
        })
    }, [])

    const cambiarUsuario = (text) => {
        setUsuario(text)
    }

    const cambiarContraseña = (text) => {
        setContraseña(text)
    }

    const cambiarContraseñaConfirmar = (text) => {
        setContraseñaConfirmar(text)
    }

    return(
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
        }}>
            <View pointerEvents={loading ? "none" : "auto"}>
                <Text style={{fontSize: 24, fontWeight: "bold", textAlign: "center", paddingVertical: 15}}>Registrarse</Text>
                <InputAndroid placeholder="Ingresa usuario..." bindedFunction={cambiarUsuario} containerStyle={{marginHorizontal: 20}} inputStyle={{fontSize: 20, borderBottomColor: "gray", borderBottomWidth: 2}} value={usuario}/>
                <InputAndroidPassword placeholder="Ingresa contraseña..." bindedFunction={cambiarContraseña} containerStyle={{marginHorizontal: 20}} inputStyle={{fontSize: 20, borderBottomColor: "gray", borderBottomWidth: 2}} value={contraseña} />
                <InputAndroidPassword placeholder="Confirma contraseña..." bindedFunction={cambiarContraseñaConfirmar} containerStyle={{marginHorizontal: 20}} inputStyle={{fontSize: 20, borderBottomColor: "gray", borderBottomWidth: 2}} value={contraseñaConfirmar} />
            </View>
            <View pointerEvents={loading ? "none" : "auto"} style={{paddingVertical: 80, marginHorizontal: 40}}>
                <Button title="Registrarse" onPress={() => {
                    if (usuario === "") {
                        Alert.alert("Falta ingresar usuario.")
                    } else if (contraseña === "") {
                        Alert.alert("Falta ingresar contraseña.")
                    } else if (contraseñaConfirmar === "") {
                        Alert.alert("Falta ingresar la contraseña confirmada.")
                    } else if (contraseñaConfirmar !== contraseña) {
                        Alert.alert("Las contraseñas no coinciden.")
                    } else {
                        setLoading(true)
                        axios.post(`http://192.168.0.7:3000/sign-up`, {
                            userInput: {
                                Usuario: usuario,
                                Contraseña: contraseña
                            }
                        })
                        .then(acceso => {
                            setLoading(false)
                            props.navigation.navigate("Login")
                        })
                        .catch(error => {
                            if (error.response !== undefined) {
                                setLoading(false)
                                Alert.alert(error.response.data.mensaje)
                            } else {
                                setLoading(false)
                                Alert.alert("Error de conexión.")
                            }
                        })
                    }}}
                />
            </View>
            {loading && <View style={{position: "absolute", top: 0, bottom: 0, right: 0, left: 0, alignItems: "center", justifyContent: "center"}}>
                <ActivityIndicator size="large" />
            </View>}
        </ScrollView>

    )
}

export default Registrarse