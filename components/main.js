  import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import jwt_decode from "jwt-decode"
import axios from "axios"

class Main extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      index: 0,
      onTop: false,
      changed: false
    };

    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = SocketIOClient('http://192.168.0.7:3000');
    this.socket.on('message', this.onReceivedMessage);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: <TouchableOpacity onPress={() => {
        AsyncStorage.removeItem("token").then(res => navigation.navigate("NotLogged"))
      }}><Icon name="sign-out" size={30} color="#ffffff" style={{paddingHorizontal: 20, paddingVertical: 20}}/></TouchableOpacity>
    }
  }

  componentDidMount() {
    const decoded = jwt_decode(this.props.navigation.getParam("token"));
    this.setState({userId: decoded.Usuario}, () => {
      axios.get(`http://192.168.0.7:3000/get-10?index=${this.state.index}`)
      .then(messages => this.setState({messages: messages.data, index: messages.data.length}))
      .catch(err => Alert.alert("Error de conexión."))
    })
  }

  onReceivedMessage(message) {
    this._storeMessages(message);
  }

  onSend(messages=[]) {
    axios.post(`http://192.168.0.7:3000/post-message`, {message: messages[0], userInput: {Usuario: this.state.userId}}, {headers: {authorization: this.props.navigation.getParam("token")}})
    .then(messages => console.log("sent"))
    .catch(err => Alert.alert("Error de conexión."))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.onTop === true && this.state.changed === true) {
      axios.get(`http://192.168.0.7:3000/get-10?index=${this.state.index}`)
      .then(messages => this.setState({messages: [...this.state.messages,...messages.data], index: [...this.state.messages,...messages.data].length, changed: false}))
      .catch(err => Alert.alert("Error de conexión."))
    }
  }

  isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToBottom = 40;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  }

  render() {
    var user = {_id: this.state.userId}
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
        onLongPress={(context, message) => {}}
        listViewProps={{
          scrollEventThrottle: 400,
          onScroll: ({ nativeEvent }) => {
            if (this.isCloseToTop(nativeEvent) === false && this.state.onTop === true) {
              this.setState({onTop: false, changed: true})
            } else if (this.isCloseToTop(nativeEvent) === true && this.state.onTop === false) {
              this.setState({onTop: true, changed: true})
            }
          }
        }}
      />
    );
  }

  // Helper functions
  _storeMessages(message) {
    message.createdAt = new Date(message.createdAt)
    this.setState({messages: [message, ...this.state.messages], index: [...this.state.messages, message].length})
  }
}

export default Main;