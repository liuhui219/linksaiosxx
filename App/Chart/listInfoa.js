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
  AppState,
	ToastAndroid,
	BackAndroid,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import PassState from '../PassState';
import Orientation from 'react-native-orientation';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
var array = [];
var aa=[];
export default class qus extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
            show:true,
            appState:AppState.currentState,
			list:[],
			catename:[],
			summary:{},
			rw:[],
			datas:{},
			day:[],
			month:[],
			years:[],
	    };
    }

    _pressButton() {
        const { navigator } = this.props;
        if(this.props.getUser) {
    			let user = true;
    			this.props.getUser(user);
    		}
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            Orientation.lockToPortrait();
            navigator.pop();

            AppState.removeEventListener('change', this._handleAppStateChange);
			return true;
        }
		return false;
    }
    componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange.bind(this));

      this.timer = setTimeout(() => {this.getData();},800);

    }

    _handleAppStateChange(appState){
      var that = this;
	  	this.setState({appState});

	  }

	getData(){
    var that = this;
		fetch('' + data.data.domain + this.props.url + '&access_token=' + data.data.token )
		  .then((response) => response.json())
		  .then((responseData) => {
		  console.log(responseData)
             this.setState({
				 show:false,
				 datas:responseData,
				 list:responseData.list,
				 catename:responseData.catename,
				 summary:responseData.summary,
				 rw:responseData.summary.rw,
				 day:responseData.summary.day,
				 month:responseData.summary.month,
				 years:responseData.summary.years,
			 })
       this.timers = setTimeout(() => {
         Orientation.lockToPortrait();

       },300);

		  })
		  .catch((error) => {
             console.log(111)
          })
	}

	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
    this.timers && clearTimeout(this.timers);
	  BackAndroid.removeEventListener('hardwareBackPress', this._pressButton);
    AppState.removeEventListener('change', this._handleAppStateChange);
    Orientation.lockToPortrait();
	}

  onScroll(event){
		this.refs.trueScroll.scrollTo({y:0, x:event.nativeEvent.contentOffset.x,animated:false})
	}

  repeat(){
			if(Dimensions.get('window').width < Dimensions.get('window').height){
				Orientation.lockToLandscapeRight();
        this.refs.cards.setNativeProps({style:{
            height:45,
            paddingTop:0
         }});
			}else{
				Orientation.lockToPortrait();
        this.refs.cards.setNativeProps({style:{
            height:65,
            paddingTop:20
         }});
			}

	}




    render() {
           return (
                <View style={{flex:1,flexDirection:'column',}}>
		           <View  style={styles.card} ref="cards">
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
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>提车报表</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>
                   <TouchableOpacity onPress={this.repeat.bind(this)}>
    									  <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',paddingRight:15}}>
    											 <Icon name="ios-repeat-outline" color="#fff"size={30}  />
    									  </View>
    								</TouchableOpacity>
						  </View>
					</View>

					<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
             <View style={{flex:1,backgroundColor:'#fff',flexDirection:'row',position:'absolute',paddingTop:1,top:0,left:0,zIndex:9999999}}>
                <View style={{backgroundColor:'#fff',flexDirection:'column',width:180,borderRightWidth:1,borderColor:'#ccc',borderLeftWidth:1,borderColor:'#ccc',}}>
							     <View style={{flexDirection:'column',height:80,backgroundColor:'#fff'}}>
  								    <View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'#fff'}}>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>大区</Text>
									</View>
									<View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',height:40,backgroundColor:'#fff'}}>
									  <View style={{flex:1,alignItems:'center',justifyContent:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'#fff'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14}}>大区</Text></View>
									  <View style={{flex:1,alignItems:'center',justifyContent:'center',height:40, borderBottomWidth:1,borderColor:'#ccc',backgroundColor:'#fff'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14}}>总监</Text></View>
									</View>
  								 </View>
							  </View>
                <ScrollView horizontal={true} ref='trueScroll' scrollEnabled ={false} showsHorizontalScrollIndicator={false}>
                   <View style={{flexDirection:'column',flex:1,}}>
										<View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>月度任务</Text>
										</View>

										<View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <View key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} >{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderRightWidth:1,borderColor:'#ccc'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >汇总</Text></View>
										</View>
									 </View>

                   <View style={{flexDirection:'column',flex:1,}}>
										<View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>今日实绩</Text>
										</View>

										<View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <View key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} >{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >汇总</Text></View>
										</View>
									 </View>

                   <View style={{flexDirection:'column',flex:1,borderRightWidth:1,borderColor:'#ccc'}}>
										<View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>月度实绩</Text>
										</View>

										<View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <View  key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false}>{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >汇总</Text></View>
										</View>
									 </View>

                   <View style={{flexDirection:'column',flex:1,borderRightWidth:1,borderColor:'#ccc'}}>
										<View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>年度实绩</Text>
										</View>

										<View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <View key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} >{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >汇总</Text></View>
										</View>
									 </View>

                   <View style={{flexDirection:'column',flex:1,borderRightWidth:1,borderColor:'#ccc'}}>
										<View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>统计</Text>
										</View>
										<View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >完成率</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >完成率排名</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >上月同期</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >环比</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.datas['lastyears']}同期</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false}  >同比</Text></View>
										</View>
									 </View>
                </ScrollView>
             </View>
						 <ScrollView style={{flex:1,}} bounces={false}>
						    <View style={{flex:1,flexDirection:'row',borderTopWidth:1,borderColor:'#ccc'}}>
                <View style={{flexDirection:'column',width:180,borderRightWidth:1,borderColor:'#ccc',borderLeftWidth:1,borderColor:'#ccc'}}>
							     <View style={{flexDirection:'column',}}>
  								    <View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc'}}>
    									  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>大区</Text>
    									</View>
    									<View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',height:40,}}>
    									  <View style={{flex:1,alignItems:'center',justifyContent:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14}}>大区</Text></View>
    									  <View style={{flex:1,alignItems:'center',justifyContent:'center',height:40, borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14}}>总监</Text></View>
    									</View>
  								 </View>
  								 <View style={{flexDirection:'column',}}>
  								    {this.state.list.map((lists,i)=>{
  										return <View key={i} style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',height:40,}}>
  												  <View style={{flex:1,alignItems:'center',justifyContent:'center',borderRightWidth:1,borderColor:'#ccc',height:40,}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.areaName}</Text></View>
  												  <View style={{flex:1,alignItems:'center',justifyContent:'center',height:40,}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.fzrName}</Text></View>
  												</View>
  									})}

  								 </View>
  								 <View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc'}}>
  									  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>汇总</Text>
  								 </View>
							  </View>
							  <ScrollView horizontal={true} onScroll={this.onScroll.bind(this)} scrollEventThrottle={1}>

								  <View style={{flexDirection:'column',flex:1,}}>
									 <View style={{flexDirection:'column',flex:1}}>
										<View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>月度任务</Text>
										</View>

										<View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <View key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} >{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderRightWidth:1,borderColor:'#ccc'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >汇总</Text></View>
										</View>
									 </View>
									 <View style={{flexDirection:'column',}}>
										{this.state.list.map((lists,i)=>{
											return <View key={i} style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',}}>
												{lists.rw.map((info,j)=>{
													return  <View key={j} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text  allowFontScaling={false} adjustsFontSizeToFit={false} >{info}</Text></View>
												})}


													  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.rwtotal}</Text></View>
													</View>
										})}

									 </View>
									 <View style={{flexDirection:'row',}}>
										 {this.state.rw.map((catenames,i)=>{
											  return <View key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} >{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,height:40,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.summary.rwtotal}</Text></View>

									 </View>
								  </View>
								  <View style={{flexDirection:'column',flex:1,}}>
									 <View style={{flexDirection:'column',flex:1}}>
										<View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>今日实绩</Text>
										</View>

										<View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <View key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} >{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >汇总</Text></View>
										</View>
									 </View>
									 <View style={{flex:1,flexDirection:'column',}}>


										{this.state.list.map((lists,i)=>{
											return <View key={i} style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',}}>
												{lists.day.map((info,j)=>{
													return  <View key={j}  style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{info}</Text></View>
												})}


													  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.daytotal}</Text></View>
													</View>
										})}

									 </View>
									 <View style={{flex:1,flexDirection:'row',}}>
										 {this.state.rw.map((catenames,i)=>{
											  return <View key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false}>{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',borderRightWidth:1,borderColor:'#ccc'}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.summary.daytotal}</Text></View>

									 </View>
								  </View>

								  <View style={{flexDirection:'column',flex:1,borderRightWidth:1,borderColor:'#ccc'}}>
									 <View style={{flexDirection:'column',flex:1}}>
										<View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>月度实绩</Text>
										</View>

										<View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',flex:1}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <View  key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false}>{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >汇总</Text></View>
										</View>
									 </View>
									 <View style={{flex:1,flexDirection:'column',}}>


										{this.state.list.map((lists,i)=>{
											return <View key={i} style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',}}>
												{lists.month.map((info,j)=>{
													return  <View key={j}  style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{info}</Text></View>
												})}


													  <View style={{width:Dimensions.get('window').width/4,textAlign:'center',height:40,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.monthtotal}</Text></View>
													</View>
										})}

									 </View>
									 <View style={{flex:1,flexDirection:'row',}}>
										 {this.state.month.map((catenames,i)=>{
											  return <View key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} >{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.summary.monthtotal}</Text></View>

									 </View>
								  </View>

								  <View style={{flexDirection:'column',flex:1,borderRightWidth:1,borderColor:'#ccc'}}>
									 <View style={{flexDirection:'column',flex:1}}>
										<View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>年度实绩</Text>
										</View>

										<View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',}}>
										  {this.state.catename.map((catenames,i)=>{
											  return <View key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} >{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >汇总</Text></View>
										</View>
									 </View>
									 <View style={{flex:1,flexDirection:'column',}}>


										{this.state.list.map((lists,i)=>{
											return <View key={i} style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',}}>
												{lists.years.map((info,j)=>{
													return  <View key={j} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text  allowFontScaling={false} adjustsFontSizeToFit={false} >{info}</Text></View>
												})}


													  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.yearstotal}</Text></View>
													</View>
										})}

									 </View>
									 <View style={{flex:1,flexDirection:'row',}}>
										 {this.state.years.map((catenames,i)=>{
											  return <View key={i} style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} numberOfLines={1} adjustsFontSizeToFit={false} >{catenames}</Text></View>
										  })}
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc',}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.summary.yearstotal}</Text></View>

									 </View>
								  </View>
								  <View style={{flexDirection:'column',flex:1,borderRightWidth:1,borderColor:'#ccc'}}>
									 <View style={{flexDirection:'column',flex:1}}>
										<View style={{justifyContent:'center',alignItems:'center',height:40,borderBottomWidth:1,borderColor:'#ccc'}}>
										  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>统计</Text>
										</View>
										<View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >完成率</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >完成率排名</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >上月同期</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >环比</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.datas['lastyears']}同期</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false}  >同比</Text></View>
										</View>
									 </View>
									 <View style={{flex:1,flexDirection:'column',}}>
										{this.state.list.map((lists,i)=>{
											return <View key={i} style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
													  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.completion}%</Text></View>
													  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.completion_sort}</Text></View>
													  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.last_monthtotal}</Text></View>
													  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.link_ratio}%</Text></View>
													  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.last_yearstotal}</Text></View>
													  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{lists.tb_ratio}%</Text></View>
													</View>
										})}

									 </View>
									 <View style={{flexDirection:'row',height:40,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ccc',}}>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.summary.completion}%</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.summary.completion_sort}</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.summary.last_monthtotal}</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.summary.link_ratio}%</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'#ccc',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.summary.last_yearstotal}</Text></View>
										  <View style={{width:Dimensions.get('window').width/4,justifyContent:'center',alignItems:'center',height:40}}><Text allowFontScaling={false} adjustsFontSizeToFit={false} >{this.state.summary.tb_ratio}%</Text></View>
									</View>
								  </View>
							  </ScrollView>
							</View>
						 </ScrollView>
					</View>
					{this.state.show ? <View style={{justifyContent: 'center',alignItems: 'center',width:Dimensions.get('window').width, height:Dimensions.get('window').height-70,overflow:'hidden',position:'absolute',top:70,left:0, backgroundColor:'#fff'}}>
							<View style={styles.loading}>
								<ActivityIndicator color="white"/>
								<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
							</View>
						</View> : null}
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
