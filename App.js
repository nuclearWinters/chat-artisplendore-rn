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
    headerStyle: {backgroundColor: "#669182"},
    headerPressColorAndroid: "white",
    headerTitleStyle: {fontSize: 26, fontWeight: "bold"}
  }
});

const LoginNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Iniciar sesión",
      header: null
    }
  },
  Registrarse: {
    screen: Registrarse,
    navigationOptions: {
      title: "Registrate"
    }
  }
}, {
  defaultNavigationOptions: {
    headerTintColor: "white",
    headerStyle: {backgroundColor: "#669182"},
    headerPressColorAndroid: "white",
    headerTitleStyle: {fontSize: 26, fontWeight: "bold"}
  }
});

const SwitchNavigator = createSwitchNavigator({
  Logged: AppNavigator,
  NotLogged: LoginNavigator
}, {
  initialRouteName: "NotLogged"
});

export default createAppContainer(SwitchNavigator);