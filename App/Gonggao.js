import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	StatusBar,
	ScrollView,
	BackAndroid,
	Image
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import Gonggaoa from './Gonggaoa';
export default class Gonggao extends React.Component {
	constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {map: '正在定位中...',datas:{},data:{},longitude:'',latitude:'',backgroundColor:'#4385f4'};
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
										<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>通知公告</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
				</View>

				<View style={{flex:1,backgroundColor:'#ececec',}}>
				   <Gonggaoa   navigator = {this.props.navigator} {...this.props}/>
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
                                 paddingTop:20,
                                 height:65,
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
