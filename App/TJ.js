import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	BackAndroid,
	Dimensions,
	InteractionManager,
	Image,
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import Communications from 'react-native-communications';
import Token from './Token';
import CalendarTj from './CalendarTj';
import KqTj from './KqTj';
import Icon from 'react-native-vector-icons/Ionicons';
export default class TJ extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {id: '',uid:'',datas:{},img:''};
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

	_CalendarTj(){
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'CalendarTj',
                component: CalendarTj,
            })
			})
        }
	}

	_KqTj(){
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'KqTj',
                component: KqTj,
            })
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
										<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>统计</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
				</View>
				<View style={{flex:1,position:'absolute',top:65, left:0,}}>
				  <Image
					style={{flex:1,width:Dimensions.get('window').width,height:Dimensions.get('window').height-65,}}
					source={require('./imgs/BG.jpg')}
					/>
				</View>
				<View style={{flex:1,flexDirection:'column',}}>
				  <View style={{width:Dimensions.get('window').width-80,position:'absolute',left:40,height:Dimensions.get('window').height-200,top:50,backgroundColor:'#fff',borderRadius:10,}}>
				    <View style={{height:70,justifyContent:'center',alignItems:'center'}}>
				     <Text style={{fontSize:18,}} allowFontScaling={false}>选择考勤记录</Text>
					</View>
					<TouchableOpacity activeOpacity={0.9}   onPress={this._KqTj.bind(this)}  >
					<View style={{backgroundColor:'#ececec',borderRadius:10,height:100, marginLeft:20,marginRight:20,alignItems:'center',flexDirection:'row',justifyContent:'space-between',paddingLeft:20,paddingRight:20,}}>
					  <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center',}}>
					   <View style={{alignItems:'center',justifyContent:'center',}}>
					       <Icon name="md-stats" color="#bbb"size={36}  />
					   </View>
					   <Text style={{marginLeft:10,fontSize:14,}} allowFontScaling={false}>全公司考勤记录</Text>
					  </View>
					  <Icon name="ios-arrow-forward" color="#999"size={27}  />
					</View>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.9} onPress={this._CalendarTj.bind(this)}>
					<View style={{backgroundColor:'#ececec',borderRadius:10,height:100, marginLeft:20,marginRight:20,alignItems:'center',flexDirection:'row',justifyContent:'space-between',paddingLeft:20,paddingRight:20,marginTop:40,}}>
					  <View style={{alignItems:'center',flexDirection:'row',justifyContent:'center',}}>
					   <View style={{alignItems:'center',justifyContent:'center',}}>
					       <Icon name="md-person" color="#bbb"size={36}  />
					   </View>
					   <Text style={{marginLeft:10,fontSize:14,}} allowFontScaling={false}>个人考勤记录</Text>
					  </View>
					  <Icon name="ios-arrow-forward" color="#999"size={27}  />
					</View>
					</TouchableOpacity>
					<View style={{justifyContent:'center',alignItems:'center',flex:1,paddingBottom:15,}}>
					   <Text style={{color:'#999'}} allowFontScaling={false}>相信我们，会做得更好。</Text>
					</View>
				  </View>

				</View>
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
});
