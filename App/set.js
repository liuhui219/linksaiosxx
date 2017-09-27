import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
	Dimensions,
	ToastAndroid,
	BackAndroid,
	Image,
  Linking,
	RefreshControl,
	ListView,
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import Toast from '@remobile/react-native-toast';
import DeviceInfo from 'react-native-device-info';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import Safe from './Safety/index';
var array = [];
var aa=[];
export default class set extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {

	  };
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }
		return false;
    }
    componentDidMount() {

    }

    safe(){
      var { navigator } = this.props;
          if(navigator) {
              this.props.navigator.push({
                  name: 'Safe',
                  component: Safe
              })
          }
    }







    render() {
           return (
                <View style={{flex:1,flexDirection:'column',}}>
		           <View style={styles.card}>
						  <View style={{flex:1,justifyContent:'center'}}>
									 <TouchableOpacity onPress={this._pressButton.bind(this)}>
										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
												<Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
												<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false}>返回</Text>
										  </View>
									</TouchableOpacity>
						  </View>
						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false}>设置</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>

						  </View>
					</View>

					<ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',}}>
              <View style={{marginTop:15}}>
                   <TouchableHighlight underlayColor="#aaa" onPress={()=>Linking.canOpenURL('App-Prefs:root=NOTIFICATIONS_ID&&path=com.linshang.org.reactjs.native.example.linksa').then(supported => {
             if (supported) {
                 Linking.openURL('App-Prefs:root=NOTIFICATIONS_ID&&path=com.linshang.org.reactjs.native.example.linksa');
             } else {
                console.log('无法打开该URI: ' + this.props.url);
             }
          })}>
                     <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',borderTopWidth:1,borderColor:'#ececec'}}>
                      <View style={{flexDirection:'row',alignItems:'center',}}>

                        <Text style={{marginLeft:10,fontSize:16,}}allowFontScaling={false}>推送通知</Text>
                      </View>
                      <View style={{alignItems:'center', justifyContent:'center'}}>
                         <Image source={require('./imgs/right.png')}  style={{width:26,height:15,}}/>
                      </View>
                     </View>
                   </TouchableHighlight>
              </View>
              <View >
                   <TouchableHighlight underlayColor="#aaa" onPress={this.safe.bind(this)}>
                     <View style={{flexDirection:'row',height:50,justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,backgroundColor:'#fff',borderTopWidth:1,borderColor:'#ececec'}}>
                      <View style={{flexDirection:'row',alignItems:'center',}}>

                        <Text style={{marginLeft:10,fontSize:16,}}allowFontScaling={false}>账号与安全</Text>
                      </View>
                      <View style={{alignItems:'center', justifyContent:'center'}}>
                         <Image source={require('./imgs/right.png')}  style={{width:26,height:15,}}/>
                      </View>
                     </View>
                   </TouchableHighlight>
              </View>
					</ScrollView>
          <Push navigator = {this.props.navigator} {...this.props}/>
          <PassState navigator = {this.props.navigator} {...this.props}/>
	            </View>
           	)
	}
}
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    flexDirection: 'column',
	backgroundColor:'#fafafa',
  },
  card: {
    height:(DeviceInfo.getModel() == 'iphone X' || DeviceInfo.getModel() == 'Simulator') ? 75 : 65,
    paddingTop:(DeviceInfo.getModel() == 'iphone X' || DeviceInfo.getModel() == 'Simulator') ? 30 : 20,
	backgroundColor:'#4385f4',
	flexDirection:'row'
  },
  loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    },
	footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },

    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
