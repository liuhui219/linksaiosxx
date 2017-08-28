import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	Text,
	DatePickerAndroid,
	TimePickerAndroid,
	ScrollView,
	ToastAndroid,
	TextInput,
	Animated,
	ActivityIndicator,
	WebView,
  Share,
	Dimensions,
	BackAndroid,
	Image
} from 'react-native';
import Toast from '@remobile/react-native-toast';
import * as WeChat from 'react-native-wechat';
import Push from './Push';
import PassState from './PassState';
import Icon from 'react-native-vector-icons/Ionicons';
import Netinfo from './Netinfo';
import Application from './Application';


var WEBVIEW_REF = 'webview';
export default class Webviews extends Component {

    constructor(props) {
        super(props);
        WeChat.registerApp('wx068dae790a871385');
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {
			 isfalse:true,
			 isshow:true,
			 isreload:true,
			 url:'',
			 isloading:false,
       canBack:false,
       title:'',
       back:false,
       bot: new Animated.Value(-150),
       isShare:false,
       opacity:new Animated.Value(0),
       shareURL:this.props.url,
       targetID:null,
		};
    }

	componentDidMount() {
		 this.setState({
			url:this.props.url,
		 })



	  }




    _pressButton() {
        const { navigator } = this.props;
        if (this.state.canBack) {
           this.refs[WEBVIEW_REF].goBack();
           this.setState({back:true})
		   return true;
        } else {
           if(navigator) {
             navigator.popToTop({
         component: Application,
         name: 'Application'
       });
				return true;
			}
			return false;
        }
    }

    _back(){
      const { navigator } = this.props;
      if(navigator) {
        navigator.popToTop({
            component: Application,
            name: 'Application'
          });
           return true;
         }
         return false;
    }

	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
    this.share && clearTimeout(this.share);
	}
	onNavigationStateChange(navState) {

      if(navState.canGoBack){
        this.setState({back:true})
      }

			this.setState({
				isfalse:true,
        canBack: navState.canGoBack,
				title: navState.title,
        shareURL:navState.url,
			})

	 }

	renderLoading(){
		   return(
		        <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-60,width:Dimensions.get('window').width, position:'absolute',top:0,left:0,}}>

				     <View style={styles.loading}>
						<ActivityIndicator color="#fff" />
						<Text style={styles.loadingTitle} allowFontScaling={false}>正在加载中...</Text>
					</View>
				</View>

		   )
	}

	renderError(){

		if(this.state.isreload){
		return(
		   <View>

			 <TouchableOpacity activeOpacity={1} onPress={this._shuax.bind(this)}>
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-60,}}>
				    <Icon name="ios-refresh-outline" color="#ccc"size={70}  />
				    <Text style={{fontSize:16,color:'#ccc'}} allowFontScaling={false}>点击屏幕，重新加载</Text>
				</View>
			  </TouchableOpacity>

          </View>
		   )
		}else{
			return(
			    <View></View>
			)
		}
	}

	_shuax(){

		this.setState({
			isshow: true,
            isfalse: true,
            isloading:true,
		});
        this.refs[WEBVIEW_REF].reload();

	}

	onLoad(){

		this.setState({
				isshow:false,
			})
	}

	onLoadEnd(){

		this.setState({
			url:this.props.url,
			isloading:false,
		});
	}

	onError(){

		this.setState({
			isshow: true,
            isfalse: false,
            isloading:false,
		});
	}

  weixin(){
    this.setState({isShare:true,});
    Animated.parallel([
      Animated.timing(
         this.state.bot,
         {toValue: 10,
          duration: 500,
        },
      ),
      Animated.timing(
         this.state.opacity,
         {toValue: 1,
          duration: 500,
        },
      )
    ]).start();


  }

  closeShare(){

    Animated.parallel([
      Animated.timing(
         this.state.bot,
         {toValue: -150,
          duration: 500,
        },
      ),
      Animated.timing(
         this.state.opacity,
         {toValue: 0,
          duration: 500,
        },
      )
    ]).start();
    this.share = setTimeout(
		  () => {
        this.setState({isShare:false,})
      },400)
  }

  shareF(){
    Animated.parallel([
        Animated.timing(
           this.state.bot,
           {toValue: -150,
            duration: 500,
          },
        ),
        Animated.timing(
           this.state.opacity,
           {toValue: 0,
            duration: 500,
          },
        )
      ]).start();
      this.share = setTimeout(
  		  () => {
          this.setState({isShare:false,})
        },400)

    WeChat.isWXAppInstalled()
   .then( ( isInstalled ) => {
        if ( isInstalled ) {
           WeChat.shareToSession({
              type: 'news',
              title: this.state.title,
              description: this.state.shareURL,
              mediaTagName: 'email signature',
              messageAction: undefined,
              messageExt: undefined,
              webpageUrl: this.state.shareURL
            });
        } else {
          Toast.showShortBottom("请安装微信")
        }
    } );
  }

  shareW(){
    Animated.parallel([
        Animated.timing(
           this.state.bot,
           {toValue: -150,
            duration: 500,
          },
        ),
        Animated.timing(
           this.state.opacity,
           {toValue: 0,
            duration: 500,
          },
        )
      ]).start();
      this.share = setTimeout(
  		  () => {
          this.setState({isShare:false,})
        },400)

    WeChat.isWXAppInstalled()
   .then( ( isInstalled ) => {
        if ( isInstalled ) {
           WeChat.shareToTimeline({
              type: 'news',
              title: this.state.title,
              description: this.state.shareURL,
              mediaTagName: 'email signature',
              messageAction: undefined,
              messageExt: undefined,
              webpageUrl: this.state.shareURL
            });
        } else {
          Toast.showShortBottom("请安装微信")
        }
    } );
  }

  localShare(){
    Animated.parallel([
        Animated.timing(
           this.state.bot,
           {toValue: -150,
            duration: 500,
          },
        ),
        Animated.timing(
           this.state.opacity,
           {toValue: 0,
            duration: 500,
          },
        )
      ]).start();
      this.share = setTimeout(
  		  () => {
          this.setState({isShare:false,})
        },400)
    Share.share({
      message: this.state.title,
      url: this.state.shareURL,
      title: this.state.title
    }, {
      dialogTitle: 'Share React Native website',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
    .then()
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }







    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>

	         <View style={styles.card}>
				  <View style={{justifyContent:'center',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',width:110}}>
							 <TouchableOpacity onPress={this._pressButton.bind(this)} style={{paddingRight:10}}>
								  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
								        <Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
										<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false}>返回</Text>
								  </View>
							</TouchableOpacity>
              {this.state.back ? <TouchableOpacity onPress={this._back.bind(this)}>
                 <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
                   <Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false}>关闭</Text>
                 </View>
             </TouchableOpacity> : null}
				  </View>
				  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
										<Text numberOfLines={1} style={{color:'white',fontSize:16}} allowFontScaling={false}>{this.state.title}</Text>
							</View>
				  </View>
				  <View style={{justifyContent:'center',width:110,flexDirection:'row',justifyContent:'flex-end',alignItems:'center',}}>
             <TouchableOpacity onPress={this.weixin.bind(this)} style={{paddingRight:15}}>
              <View>
                 <Image source={require('./imgs/Shares.png')} style={{width: 22, height: 22,marginLeft:5,}} />
              </View>
             </TouchableOpacity>
				  </View>
				</View>
             <WebView style={{  flex:1,}}
                  ref={WEBVIEW_REF}
				  source={{uri:this.props.url}}
				  startInLoadingState={true}
				  bounces={false}
				  automaticallyAdjustContentInsets={false}
				  domStorageEnabled={false}
				  scalesPageToFit={false}
				  onLoad = {this.onLoad.bind(this)}
				  renderLoading={this.renderLoading.bind(this)}
                  onNavigationStateChange={this.onNavigationStateChange.bind(this)}
				  javaScriptEnabled={true}
				  onError={this.onError.bind(this)}
				  renderError={this.renderError.bind(this)}
				  onLoadEnd={this.onLoadEnd.bind(this)}

			  >
			 </WebView>

			 {this.state.isloading ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-60,width:Dimensions.get('window').width,backgroundColor:'#fff',position:'absolute',top:20,left:0,}}>
				     <View style={{justifyContent:'center',position:'absolute',top:0,left:0,height:45,alignItems:'flex-start',width:Dimensions.get('window').width,paddingLeft:5,backgroundColor:'#4385f4'}}>
				 <TouchableOpacity  onPress={this._pressButton.bind(this)}>
					  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',backgroundColor:'transparent'}}>
							<Image source={require('./imgs/back.png')} style={{width: 25, height: 25,}} />
							<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false}>返回</Text>
					  </View>
				</TouchableOpacity>
			 </View>
				     <View style={styles.loading}>
						<ActivityIndicator color="#fff" />
						<Text style={styles.loadingTitle} allowFontScaling={false}>正在加载...</Text>
					</View>
				</View> : <View></View>}
        {this.state.isShare ? <TouchableOpacity onPress={this.closeShare.bind(this)} style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,position:'absolute',left:0,top:0,opacity:this.state.opacity,backgroundColor:'rgba(57, 57, 57, 0.52)'}}><View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,position:'absolute',left:0,top:0,}}></View></TouchableOpacity> : null }
        <Animated.View style={{flexDirection:'row',height:100,width:Dimensions.get('window').width-20,position:'absolute',backgroundColor:'#ffffff',left:10,bottom:this.state.bot,borderRadius:10,alignItems:'center'}}>
         <TouchableOpacity onPress={this.shareF.bind(this)} style={{width:Dimensions.get('window').width/4-5,}}>
          <View style={{width:Dimensions.get('window').width/4-5,flexDirection:'column',justifyContent:'center',alignItems:'center',}}>
             <View style={{width:56,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',backgroundColor:'#28d91e'}}>
               <Image source={require('./imgs/WX.png')} style={{width: 32, height: 32,}} />
             </View>
             <Text style={{marginTop:8,fontSize:12}} allowFontScaling={false}>微信好友</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.shareW.bind(this)} style={{width:Dimensions.get('window').width/4-5,}}>
          <View style={{width:Dimensions.get('window').width/4-5,flexDirection:'column',justifyContent:'center',alignItems:'center',}}>
             <View style={{width:56,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',backgroundColor:'#28d91e'}}>
               <Image source={require('./imgs/friend.png')} style={{width: 32, height: 32,}} />
             </View>
             <Text style={{marginTop:8,fontSize:12}} allowFontScaling={false}>微信朋友圈</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.localShare.bind(this)} style={{width:Dimensions.get('window').width/4-5,}}>
          <View style={{width:Dimensions.get('window').width/4-5,flexDirection:'column',justifyContent:'center',alignItems:'center',}}>
             <View style={{width:56,height:56,borderRadius:28,justifyContent:'center',alignItems:'center',backgroundColor:'#1ebdd9'}}>
               <Image source={require('./imgs/local.png')} style={{width: 32, height: 32, marginLeft:5}} />
             </View>
             <Text style={{marginTop:8,fontSize:12}} allowFontScaling={false}>系统分享</Text>
          </View>
          </TouchableOpacity>
        </Animated.View>
        <Push navigator = {this.props.navigator} {...this.props}/>
			  <PassState navigator = {this.props.navigator} {...this.props}/>
	  </View>

    );
    }
}
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    flexDirection: 'column',
	backgroundColor:'#fafafa',
  },
  card: {
    height:65,
    paddingTop:20,
	backgroundColor:'#4385f4',
	flexDirection:'row'
  },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

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
});
