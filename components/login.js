import React, { useState, useEffect } from "react"
import { View, Text, Button, Alert, AsyncStorage, ScrollView, ActivityIndicator, ImageBackground, TouchableOpacity, Platform } from "react-native"
import axios from "axios"
import { InputAndroid, InputAndroidPassword } from "./input"
import backgroundimage from "../imgs/chat.png"

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
        <ImageBackground source={backgroundimage} style={{width: '100%', height: '100%'}}>
            <ScrollView contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between'
            }}>
                <View style={{marginHorizontal: 40}} pointerEvents={loading ? "none" : "auto"}>
                    <Text style={{fontSize: 24, fontWeight: "bold", textAlign: "center", paddingVertical: 15, color: "white", letterSpacing: 2,
                    ...Platform.select({
                        ios: {
                          marginTop: 40,
                        },
                        android: {},
                      }),
                }}>Inicio de sesión</Text>
                </View>
                <View style={{marginHorizontal: 40, flex: 1, alignItems: "center", justifyContent: "center"}} pointerEvents={loading ? "none" : "auto"}>
                    <InputAndroid placeholder="Usuario..." bindedFunction={cambiarUsuario} containerStyle={{flexDirection: "row", backgroundColor: "rgba(0,0,0,0.1)"}} inputStyle={{fontSize: 20, borderBottomColor: "white", borderBottomWidth: 2, color: "white", flex: 1}} value={usuario}/>
                    <InputAndroidPassword placeholder="Contraseña..." bindedFunction={cambiarContraseña} containerStyle={{flexDirection: "row", backgroundColor: "rgba(0,0,0,0.1)", marginTop: 20}} inputStyle={{fontSize: 20, borderBottomColor: "white", borderBottomWidth: 2, color: "white", flex: 1}} value={contraseña} />
                    <TouchableOpacity onPress={() => {
                        if (usuario === "") {
                            Alert.alert("Falta ingresar usuario.")
                        } else if (contraseña === "") {
                            Alert.alert("Falta ingresar contraseña.")
                        } else {
                            setLoading(true)
                            axios.post(`https://chat-artisplendore-node.herokuapp.com/sign-in`, {
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
                        }}} style={{height: 35, elevation: 5, backgroundColor: "white", borderRadius: 80, alignItems: "center", justifyContent: "center", marginTop: 30, width: "100%"}}>
                        <Text style={{fontWeight: "bold", fontSize: 20, color: "rgba(0,0,0,0.75)"}}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
                <View pointerEvents={loading ? "none" : "auto"} style={{paddingVertical: 40, marginHorizontal: 40, alignItems: "center", justifyContent: "center"}}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.navigate("Registrarse")
                    }} >
                        <Text style={{color: "white", fontSize: 20, letterSpacing: 2}}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
                {loading && <View style={{position: "absolute", top: 0, bottom: 0, right: 0, left: 0, alignItems: "center", justifyContent: "center"}}>
                    <ActivityIndicator size="large" />
                </View>}
            </ScrollView>
        </ImageBackground>
    )
}

export default Login