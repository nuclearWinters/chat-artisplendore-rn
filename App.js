import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import Login from "./components/login"
import Main from "./components/main"
import Registrarse from "./components/registrarse"

const AppNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      title: "Sala de Chat"
    }
  }
}, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: {backgroundColor: "rgb(0,160,200)"},
    headerPressColorAndroid: "white",
    headerTitleStyle: {fontFamily: "Roboto-Medium", fontSize: 26, fontWeight: "bold"}
  }
});

const LoginNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Iniciar sesión"
    }
  },
  Registrarse: {
    screen: Registrarse,
    navigationOptions: {
      title: "Registrarse"
    }
  }
}, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: {backgroundColor: "rgb(0,160,200)"},
    headerPressColorAndroid: "white",
    headerTitleStyle: {fontFamily: "Roboto-Medium", fontSize: 26, fontWeight: "bold"}
  }
});

const SwitchNavigator = createSwitchNavigator({
  Logged: AppNavigator,
  NotLogged: LoginNavigator
}, {
  initialRouteName: "NotLogged"
});

export default createAppContainer(SwitchNavigator);