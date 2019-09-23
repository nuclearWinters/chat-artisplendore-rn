import React, { useState, useEffect } from "react"
import { View, Text, Button, Alert, AsyncStorage, ScrollView, ActivityIndicator } from "react-native"
import axios from "axios"
import { InputAndroid, InputAndroidPassword } from "./input"

const Login = props => {

    const [loading, setLoading] = useState(true)

    const [usuario, setUsuario] = useState("")
    const [contraseña, setContraseña] = useState("")

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

    return(
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between'
        }}>
            <View pointerEvents={loading ? "none" : "auto"}>
                <Text style={{fontSize: 24, fontWeight: "bold", textAlign: "center", paddingVertical: 15}}>Iniciar sesión</Text>
                <InputAndroid placeholder="Ingresa usuario..." bindedFunction={cambiarUsuario} containerStyle={{marginHorizontal: 20}} inputStyle={{fontSize: 20, borderBottomColor: "gray", borderBottomWidth: 2}} value={usuario}/>
                <InputAndroidPassword placeholder="Ingresa contraseña..." bindedFunction={cambiarContraseña} containerStyle={{marginHorizontal: 20}} inputStyle={{fontSize: 20, borderBottomColor: "gray", borderBottomWidth: 2}} value={contraseña} />
            </View>
            <View pointerEvents={loading ? "none" : "auto"} style={{paddingVertical: 80, marginHorizontal: 40}}>
                <View style={{paddingVertical: 40}}>
                    <Button title="Registarse" onPress={() => {
                        props.navigation.navigate("Registrarse")
                    }}
                    />
                </View>
                <Button title="Inicia sesión" onPress={() => {
                    if (usuario === "") {
                        Alert.alert("Falta ingresar usuario.")
                    } else if (contraseña === "") {
                        Alert.alert("Falta ingresar contraseña.")
                    } else {
                        setLoading(true)
                        axios.post(`http://192.168.1.64:3000/sign-in`, {
                            userInput: {
                                Usuario: usuario,
                                Contraseña: contraseña
                            }
                        })
                        .then(acceso => {
                            AsyncStorage.setItem("token", acceso.data)
                            .then(token => {
                                setLoading(false)
                                props.navigation.navigate("Main", {token: acceso.data})
                            })
                            .catch(error => {
                                setLoading(false)
                                Alert.alert("Error. Intenta de nuevo.")
                            })
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

export default Login