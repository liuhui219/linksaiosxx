import React ,{ Component }from 'react';
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
  AppState,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import PassState from '../PassState';
import Orientation from 'react-native-orientation';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import listInfoa from './listInfoa';
import listInfob from './listInfob';
import listInfoc from './listInfoc';
import listInfod from './listInfod';
import listInfoe from './listInfoe';
export default class List extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
            appState:AppState.currentState,
            data:[['提车报表',listInfoa],['终端报表',listInfob],['回款报表',listInfoc],['储运日报',listInfod],['库存日报',listInfoe]],
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
       Orientation.lockToPortrait();
       AppState.addEventListener('change', this._handleAppStateChange.bind(this));
    }


    _handleAppStateChange(appState){
      this.setState({appState});
      if(this.state.appState == 'active'){
        Orientation.lockToPortrait();
      }
    }



	componentWillUnmount() {
    Orientation.lockToPortrait();
	  BackAndroid.removeEventListener('hardwareBackPress', this._pressButton);
	}

	go(datas){
		var { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'pieChart',
                component: pieChart,
				params: {
					data: datas,
				}
            })
        }
	}

	btn(data){
		var { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'data',
                component: data,
                params: {
      						getUser: function(user) {
      							if(user == true){
      								Orientation.lockToPortrait();
      							}
      	                    }
      					}
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
												<Image source={require('../imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
												<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
										  </View>
									</TouchableOpacity>
						  </View>
						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>列表</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>

						  </View>
					</View>

					<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
						{this.state.data.map((datas,i)=>{
							return <TouchableHighlight key={i} onPress={this.btn.bind(this,datas[1])}  underlayColor="#d6d6d6">
								 <View style={{flexDirection:'row',alignItems:'center',height:65,paddingLeft:10,borderBottomWidth:1,borderColor:'#ddd',}}>
									<View style={{flex:1,marginLeft:15,height:65,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:15}}>
									   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#666',fontSize:16}}>{datas[0]}</Text>
									   <Image source={require('../imgs/right.png')} style={{width: 20, height: 18,}} />
									</View>
								 </View>
							</TouchableHighlight>
						})}



					</View>
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
