import React from 'react';
import {
  Animated,
  TextInput,
  View
} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5"

const InputAndroid = (props) => {
    const _animated = new Animated.Value(0)
    let {
        inputStyle,
        containerStyle,
        value,
        placeholder,
        bindedFunction,
        white
    } = props
    return (
        <View style={containerStyle}>
            <View style={{width: 40, borderBottomWidth: 2, borderBottomColor: white ? "gray" : "rgba(255,255,255,1)", borderBottomtStyle: "solid", alignItems: "center", justifyContent: "center"}}>
                <Icon name="user-alt" color="rgba(0,0,0,0.6)" size={20} />
            </View>
            <View style={{borderBottomWidth: 2, borderBottomColor: white ? "gray" : "rgba(255,255,255,1)", borderBottomStyle: "solid", width: 2, paddingRight: 5}}>
                <View style={{borderRightWidth: 2, borderRightColor: white ? "gray" : "rgba(255,255,255,0.75)", borderRightStyle: "solid", marginVertical: 10, flex: 1}}></View>
            </View>
            <TextInput
                style={[inputStyle, {...Platform.select({
                    ios: {
                      paddingVertical: 10,
                      paddingLeft: 10
                    },
                    android: {},
                  }),}]}
                underlineColorAndroid={'transparent'}
                placeholder={placeholder}
                placeholderTextColor={white ? "gray" : "rgba(255,255,255,0.8)"}
                value={value}
                onChangeText={bindedFunction}
                onFocus={() => {
                    Animated.timing(_animated, {
                        toValue: 1,
                        duration: 300
                    }).start()
                }}
                onBlur={() => {
                    Animated.timing(_animated, {
                        toValue: 0,
                        duration: 300
                    }).start()
                }}
            />
            <Animated.View
                style={[
                    {position: "absolute", bottom: 0, left: 0, top: 0, borderBottomColor: "rgb(33,150,243)", borderBottomWidth: 3, width: "0%"},
                    {
                        width: _animated.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "100%"]
                        })
                    }
                ]}
            />
        </View>
    );
}

const InputAndroidPassword = (props) => {
    const _animated = new Animated.Value(0);
    let {
        inputStyle,
        containerStyle,
        value,
        placeholder,
        bindedFunction,
        white
    } = props
    return (
        <View style={containerStyle}>
            <View style={{width: 40, borderBottomWidth: 2, borderBottomColor: white ? "gray" : "rgba(255,255,255,1)", borderBottomtStyle: "solid", alignItems: "center", justifyContent: "center"}}>
                <Icon name="lock" color="rgba(0,0,0,0.6)" size={20} />
            </View>
            <View style={{borderBottomWidth: 2, borderBottomColor: white ? "gray" : "rgba(255,255,255,1)", borderBottomStyle: "solid", width: 2, paddingRight: 5}}>
                <View style={{borderRightWidth: 2, borderRightColor: white ? "gray" : "rgba(255,255,255,0.75)", borderRightStyle: "solid", marginVertical: 10, flex: 1}}></View>
            </View>
            <TextInput
                secureTextEntry={true}
                style={[inputStyle, {...Platform.select({
                    ios: {
                      paddingVertical: 10,
                      paddingLeft: 10
                    },
                    android: {},
                  }),}]}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={white ? "gray" : "rgba(255,255,255,0.8)"}
                placeholder={placeholder}
                value={value}
                onChangeText={bindedFunction}
                onFocus={() => {
                    Animated.timing(_animated, {
                        toValue: 1,
                        duration: 300
                    }).start()
                }}
                onBlur={() => {
                    Animated.timing(_animated, {
                        toValue: 0,
                        duration: 300
                    }).start()
                }}
            />
            <Animated.View
                style={[
                    {position: "absolute", bottom: 0, left: 0, top: 0, borderBottomColor: "rgb(33,150,243)", borderBottomWidth: 3, width: "0%"},
                    {
                        width: _animated.interpolate({
                            inputRange: [0, 1],
                            outputRange: ["0%", "100%"]
                        })
                    }
                ]}
            />
        </View>
    );
}

export {
    InputAndroid,
    InputAndroidPassword
}