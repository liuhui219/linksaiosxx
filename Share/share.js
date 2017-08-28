import React, { Component } from 'react'
import {
  Text,
  TextInput,
  View,
  InteractionManager,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from 'react-native'
import Storage from 'react-native-storage';
import Main from './Main';
import NoLogin from './NoLogin';
import Pan from './Pan';
import { RNSKBucket } from 'react-native-swiss-knife';


export default class Share extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }

  componentWillMount(){
    var {navigator} = this.props;
    RNSKBucket.get('test', 'group.com.linshang.org.reactjs.native.example.linksa').then( (value) =>{
      var Value = JSON.parse(value);
      if(Value.bool == 'true'){
        global.data=Value.data;
        navigator.push({
          component: Main,
          name: 'Main',
          params: {
            data:Value.data
          }
        });
      }else if(Value.bool == 'false'){
        navigator.resetTo({
          component: NoLogin,
          name: 'NoLogin'
        });
      }
    }
    )
  }



  render() {

       return (
         <View style={{flex:1}}>

         </View>
        )



  }
}
