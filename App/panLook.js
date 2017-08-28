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
	RefreshControl,
	ListView,
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import OpenFile from 'react-native-doc-viewer';
var array = [];
var all=['pdf','png','jpg','xls','doc','ppt','xlsx','docx','pptx','txt','zip','rar'];
export default class panLook extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
		BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
		   type:'',
		   images:data.data.domain.slice(0,-6)+this.props.data.file_extension_icon.slice(1),
		   domain:'',
		   isshow:false,
		   down:true,
       infos:'文件预览',
		   loadings:true,
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

		for(var i in all){
			if(all[i] == this.props.data.downloadUrl.split(".")[this.props.data.downloadUrl.split(".").length-1]){
				this.setState({isshow:true,})

			}
		}
		this.setState({
			type:this.props.data.downloadUrl.split(".")[this.props.data.downloadUrl.split(".").length-1],
			images:data.data.domain.slice(0,-6)+this.props.data.file_extension_icon.slice(1),
			domain:data.data.domain,
		})
    }


	componentWillUnmount() {


	}


	download(){

	}

	look(){
    var that = this;
		this.setState({infos:'正在加载中...',loadings:false,})
		OpenFile.openDoc([{
		 url:this.state.domain.slice(0,-6)+this.props.data.preview_url.slice(1),
		 fileName:"sample"
	    }], (error, url) => {
		  if (error) {
			console.error(error);
      that.setState({infos:'文件预览',loadings:true,})
		  } else {
			console.log(url)
      that.setState({infos:'文件预览',loadings:true,})
		  }
		})
	}

    render() {
           return (
                <View style={{flex:1,flexDirection:'column',}}>
		           <View style={styles.card}>
						  <View style={{flex:1,justifyContent:'center'}}>
									 <TouchableOpacity onPress={this._pressButton.bind(this)}>
										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
												<Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
												<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
										  </View>
									</TouchableOpacity>
						  </View>
						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>详情</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>

						  </View>
					</View>

					<View style={{flex:1,flexDirection:'column',backgroundColor:'#ececec',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
						  <View style={{width:Dimensions.get('window').width,alignItems:'center',justifyContent:'center',flex:1}}>
						       <View style={{paddingLeft:10}}>
								   <Image source={{uri:this.state.images}} style={{width:60, height: 60,}} />
							   </View>
							   <Text style={{color:'#666',fontSize:12,marginTop:20}} allowFontScaling={false} adjustsFontSizeToFit={false}>{decodeURI(this.props.data.name)}</Text>
							   <Text style={{color:'#aaa',fontSize:12,marginTop:20}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.data.size}</Text>
						  </View>
						  <View style={{flexDirection:'row',height:50,backgroundColor:'#ddd',borderTopWidth:1,borderColor:'#bbb'}}>

							<View style={{width:1,backgroundColor:'#bbb'}}></View>
							{this.state.isshow ? <TouchableHighlight underlayColor='#aaa' activeOpacity ={1} style={{flex:1}} onPress={this.look.bind(this)}>
								<View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
								    {this.state.loadings ? <View style={{width: 35, height: 35,alignItems:'center', justifyContent:'center'}}>
									   <Image source={require('./imgs/opens.png')} style={{width: 20, height: 20,}} />
									</View> : <View style={{width: 35, height: 35,alignItems:'center', justifyContent:'center'}}>
									   <ActivityIndicator color="#4385f4"/>
									</View>}
								    <Text style={{color:'#4385f4',fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									    {this.state.infos}
									</Text>
								</View>
							 </TouchableHighlight> : <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
								    <Text style={{color:'#4385f4',fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									   此文件不支持预览
									</Text>
								</View>}
						  </View>
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
	backgroundColor:'#4385f4',
	paddingTop:20,
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
