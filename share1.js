import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'

export default class Share extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      isOpen: true,
      type: '',
      value: ''
    }
  }

  async componentDidMount() {
    try {
      const { type, value } = await ShareExtension.data()
      this.setState({
        type,
        value
      })
    } catch(e) {
      console.log('errrr', e)
    }
  }

  onClose() {
    ShareExtension.close()
  }

  closing = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    return (
      <Modal backdrop={false} coverScreen={true} swipeToClose={false} style={{ backgroundColor: 'transparent' }} position="center" isOpen={this.state.isOpen} onClosed={this.onClose}>
           <View style={{ backgroundColor: 'white', width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
            <View style={{height:65,paddingTop:20,flexDirection:'row',borderColor:'#ccc',borderBottomWidth:1}}>
              <View style={{flex:1,justifyContent:'center'}}>
               <TouchableOpacity onPress={this.onClose.bind(this)}>
                 <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                <Text style={{color:'#000',fontSize:16,paddingLeft:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>取消</Text>
                 </View>
               </TouchableOpacity>
               </View>
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                  <Text style={{color:'#000',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>邻盛管家</Text>
                </View>
               </View>
               <View style={{flex:1,justifyContent:'center'}}>
                <TouchableOpacity >
                   <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>

                   </View>
                 </TouchableOpacity>
               </View>
            </View>
            <View style={{ }}>

                <Text>Close11</Text>
                <Text>type: { this.state.type }</Text>
                <Text>value: { this.state.value }</Text>
               
            </View>
          </View>
      </Modal>
    )
  }
}
