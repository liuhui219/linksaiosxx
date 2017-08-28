import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableNativeFeedback,
	Text,
	DatePickerAndroid,
	TimePickerAndroid,
	ScrollView,
	ToastAndroid,
	TextInput,
	Animated,
	ActivityIndicator,
	WebView,
	Dimensions,
	Modal,
	BackAndroid,
	Platform,
	Image
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import YTjinfo from './YTjinfo';
export default class YTj extends Component {

	constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);

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

	render() {
    return (
	     <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
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

										<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>考勤统计</Text>

				  </View>
				  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

				  </View>
				</View>
				<View style={{flex:1,backgroundColor:'#fafafa'}}>
				    <YTjinfo navigator = {this.props.navigator} {...this.props}/>
				</View>
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
    height:65,
    paddingTop:20,
	backgroundColor:'#4385f4',
	flexDirection:'row',

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
