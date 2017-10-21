import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	Text,
	ScrollView,
	TextInput,
	WebView,
  PushNotificationIOS,
	ActivityIndicator,
	InteractionManager,
	Animated,
  Platform,
	Dimensions,
	BackAndroid,
	AsyncStorage,
	Image
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Token from './Token';

var dataImpor = [];
var REQUEST_URL = 'http://www.linksame.com/OAuth/MobilePcdGant/loginOut?clearMid=1';
import AppMain from './main';
import Icon from 'react-native-vector-icons/Ionicons';
import { RNSKBucket } from 'react-native-swiss-knife';
var WEBVIEW_REF = 'webview';
export class Login extends Component {
	constructor(props) {
        super(props);
		this.state = {
		   url:'http://www.linksame.com/OAuth/MobilePcdGant/loginOut?clearMid=1',
		   isshow:false,
		   datas:'',
		   isfalse:true,
		   xiaoh:true,
       deviceToken:null,
	  };
    }

    toQueryString(obj) {
      return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
          return val.sort().map(function (val2) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
          }).join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
      }).join('&') : '';
    }

	componentDidMount() {
    PushNotificationIOS.addEventListener('register', this._registNotification.bind(this));
    PushNotificationIOS.requestPermissions();
        storage.save({
	        key: 'welcome',  // 注意:请不要在key中使用_下划线符号!
	        rawData: {
	          datas: '1234',
	        },
	        expires: null
	        });
    this.setState({
           isshow:false,
     })
    }
  _registNotification(deviceToken){
    alert(deviceToken)
    this.setState({deviceToken:deviceToken,})
  }
  componentWillUnmount(){
    fetch('' + data.data.domain + '/index.php?app=Im&m=User&a=mobileInfo&access_token=' + data.data.token + '', {
       method: 'POST',
       headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: this.toQueryString({
            'token': this.state.deviceToken,
            'type': 1
       })
     })
     .then(function (response) {
       return response.json();
     })
     .then(function (result) {
      console.log(result);
     })
     .catch((error) => {

     });
  }
	onNavigationStateChange(navState) {
    if(navState.url.indexOf("http://www.linksame.com/OAuth/MobilePcdGant")!=-1){
      this.setState({
		        isshow:false,
			})
    }else{
      this.setState({
            isshow:true,
      })
    }

		if(navState.url.indexOf("03in.com:8082/waibu")!=-1){

			this.setState({
				isshow:true,
			})


		}


		if(navState.url.indexOf("http://login/?data")==0){
      this.setState({
             isshow:true,
       })
		    storage.clearMap();
		    data=JSON.parse(decodeURI(navState.url.slice(19)));
			global.data=data
			 storage.save({
				key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
				rawData: {
				  data: data,
				},
				expires: 1000 * 3600 * 30 * 24
			  });

       

         fetch('' + data.data.domain + '/index.php?app=Im&m=MobileApi&a=getInfo&access_token=' + data.data.token + '')
     		  .then((response) => response.json())
     		  .then((responseData) => {

                var Bucket = {bool:'true',data:data}
                RNSKBucket.set('test', JSON.stringify(Bucket), 'group.com.linshang.org.reactjs.native.example.linksa')
                global.PUSHDATA=responseData;
                storage.save({
         				key: 'loginState',  // 注意:请不要在key中使用_下划线符号!
         				rawData: {
                  data: data,
         				  PUSHDATA: responseData,
         				},
         				expires: 1000 * 3600 * 30 * 24
         			  });
                const {navigator} = this.props;
                this.setState({
                       isshow:true,
                 })
        				navigator.resetTo({
        				  component: AppMain,
        				  name: 'AppMain'
        				});

     		  })
     		  .catch((error) => {
             console.log(error)
          });




		}

	 }




    renderLoading(){
		   return(
		      <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-60,width:Dimensions.get('window').width, position:'absolute',top:0,left:0,}}>
				     <View style={styles.loading}>
						<ActivityIndicator color="#999" size="large"/>
						<Text style={styles.loadingTitle} allowFontScaling={false}>正在加载中...</Text>
					</View>
				</View>
		   )
	}

	renderError(){
		if(this.state.isfalse){
		return(
			<TouchableOpacity activeOpacity={1} onPress={this._shuax.bind(this)}>
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-60,}}>
				    <Icon name="ios-refresh-outline" color="#ccc"size={70}  />
				    <Text style={{fontSize:16,color:'#ccc'}} allowFontScaling={false}>点击屏幕，重新加载</Text>
				</View>
			  </TouchableOpacity>
		   )
		}else{
			return(
			    <View></View>
			)
		}
	}

	onLoadEnd(){

		this.setState({

            isfalse:false,
		});
	}

	onError(){

		this.setState({
			isshow:false,
            isfalse:true,
		});
	}

	_shuax(){
	    this.refs[WEBVIEW_REF].reload();
		this.setState({
			isshow:true,
            isfalse: false,
		});


	}

	render() {
    return (

	         <View style={{flex:1}}>
			    <View style={{height:(DeviceInfo.getModel() == 'iphone X' || DeviceInfo.getModel() == 'Simulator') ? 75 : 65,paddingTop:(DeviceInfo.getModel() == 'iphone X' || DeviceInfo.getModel() == 'Simulator') ? 30 : 20,backgroundColor:'#4385f4',alignItems:'center', justifyContent:'center'}}>
				  <Text style={{color:'#fff',fontSize:18}} allowFontScaling={false}>登录</Text>
				</View>
				<WebView style={{  flex:1,}}
                      ref={WEBVIEW_REF}
					  source={{uri:REQUEST_URL}}
					  domStorageEnabled={true}
					  startInLoadingState ={true}
					  onNavigationStateChange={this.onNavigationStateChange.bind(this)}
					  renderError={this.renderError.bind(this)}
					  renderLoading={this.renderLoading.bind(this)}
					  javaScriptEnabled={true}
					  onError={this.onError.bind(this)}
					  onLoadEnd={this.onLoadEnd.bind(this)}
					  injectedJavaSript = "alert('webView 测试')"
					  bounces={false}
					  scalesPageToFit={false}
					  >
				</WebView>
				{this.state.isshow ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-60,width:Dimensions.get('window').width,backgroundColor:'#fff',position:'absolute',top:65,left:0,}}>
				     <View style={styles.loading}>
						<ActivityIndicator color="#999" size="large"/>
						<Text style={styles.loadingTitle} allowFontScaling={false}>正在加载...</Text>
					</View>
				</View> : null}

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

        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: '#999'
    },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
