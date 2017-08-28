import React, {Component} from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	Text,
	ScrollView,
	BackAndroid,
	InteractionManager,
	ViewPagerAndroid,
	ActivityIndicator,
	Animated,
	Dimensions,
	Image
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import Icon from 'react-native-vector-icons/Ionicons';
import Add from './Add';
import CalendarInfo from './CalendarInfo';
import Token from './Token';
export default class CalendarTj extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {
			year : new Date().getFullYear(),
			month : new Date().getMonth() + 1,
			date : new Date().getDate(),
			datas:[],
			datet:'',
			loaded: false,
			user: false,
			datax:'',
			statu:false,
			fadeAnim: new Animated.Value(0),
		};

    }

	componentDidMount() {
		this.timer = setTimeout(
		() => {this.fetchData();},
		800
		);
    }
	componentWillUnmount() {
	     this.timer && clearTimeout(this.timer);
    }
	fetchData() {
		fetch('' + data.data.domain + '/index.php?app=Kaoqin&m=KaoqinReportApi&a=my_history&uid='+data.data.uid+'&cid='+data.data.cid+'&fromdate='+this.state.year+'-'+this.state.month+'-'+this.state.date+'&todate='+this.state.year+'-'+this.state.month+'-'+this.state.date+'&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {
				this.setState({
					datas: responseData.data,
					loaded: true,
					datax:responseData.sett,
					statu:false,
				});

		  })
		  .catch((error) => {

			this.setState({
					loaded: true,
					statu:true,
				});
				Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

			  this.timerx = setTimeout(() => {
							  this.setState({
								 statu:false,
							})
						  },1500)
		  });
    }

	_datet(d){
		this.setState({
			datet: this.state.year+'-'+this.state.month+'-'+d,
			loaded: false,
			date :d,
		})

		fetch('' + data.data.domain + '/index.php?app=Kaoqin&m=KaoqinReportApi&a=my_history&uid='+data.data.uid+'&cid='+data.data.cid+'&fromdate='+this.state.year+'-'+this.state.month+'-'+d+'&todate='+this.state.year+'-'+this.state.month+'-'+d+'&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {
				this.setState({
					datas: responseData.data,
					loaded: true,
					datax:responseData.sett,
					statu:false,
				});
		  })
		  .catch((error) => {

			this.setState({
					loaded: true,
					statu:true,
				});
				Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 1,
				  duration: 1000,
				},

			  ).start();

			  this.timerx = setTimeout(() => {
							  this.setState({
								 statu:false,
							})
						  },1500)
		  });
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

	_xqButton(id,uid){
		const { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'CalendarInfo',
                component: CalendarInfo,
				params: {
					id: id,
					uid:uid,
				}
            })
        }
	}

	_add() {
		let _this = this;
        const { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'Add',
                component: Add,
				params: {
                    getUser: function(user) {
                        _this.setState({
                            user: user
                        })
						if(user == true){
							_this.fetchData();
						}

                    }
                }
            })
			})
        }
    }

    nextMonth() {

        if (this.state.month == 12) {

            this.setState({
                year: this.state.year + 1,
                month: 1,

            })


        } else {
            this.setState({
                month: this.state.month + 1,

            })


        }

    }

	componentWillUnmount() {
	  this.timerx && clearTimeout(this.timerx);
	}

    prevMonth() {

        if (this.state.month == 1) {
            this.setState({
                year: this.state.year - 1,
                month: 12,

            })
        } else {
            this.setState({
                month: this.state.month - 1,

            })
        }

    }

   myScroll(event) {
        let scrollX = event.nativeEvent.contentOffset.x;
        if (scrollX > Dimensions.get('window').width) {
            this.nextMonth()
        } else if (scrollX < Dimensions.get('window').width) {
            this.prevMonth()
        } else {

        }
        this.refs.trueScroll.scrollWithoutAnimationTo(0, Dimensions.get('window').width)

    };

    render() {
    return (
	   <View style={{flexDirection:'column',flex:1,backgroundColor:'#ccc',}}>
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
										<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>{this.state.year}年{this.state.month}月</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
			</View>
            <View style={styles.dateTitle}>
				<Text style={styles.dateTitleText} allowFontScaling={false}>日</Text>
				<Text style={styles.dateTitleText} allowFontScaling={false}>一</Text>
				<Text style={styles.dateTitleText} allowFontScaling={false}>二</Text>
				<Text style={styles.dateTitleText} allowFontScaling={false}>三</Text>
				<Text style={styles.dateTitleText} allowFontScaling={false}>四</Text>
				<Text style={styles.dateTitleText} allowFontScaling={false}>五</Text>
				<Text style={styles.dateTitleText} allowFontScaling={false}>六</Text>
			</View>
			<View style={{height:250,}}>
			<ScrollView horizontal={true} contentOffset={{x: Dimensions.get('window').width, y: 0}}
                bounces={false} onMomentumScrollEnd={event=>this.myScroll(event)} ref="trueScroll"
                showsHorizontalScrollIndicator={false} pagingEnabled={true}>
					     <View>
						  <ScrollView bounces={false}>
                           <DateBoard year={this.state.year} month={this.state.month-1} _datet={this._datet.bind(this)}/>
						  </ScrollView>
						 </View>
						 <View>
						  <ScrollView bounces={false}>
                           <DateBoard year={this.state.year} month={this.state.month} _datet={this._datet.bind(this)}/>
						  </ScrollView>
						 </View>
						 <View>
						  <ScrollView bounces={false}>
                           <DateBoard year={this.state.year} month={this.state.month+1} _datet={this._datet.bind(this)}/>
						  </ScrollView>
						 </View>
			</ScrollView>
			</View>
			<View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:0.7,borderColor:'#bbb',backgroundColor:'#fff'}}>
				      <View style={{width:30,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#4385f4',marginLeft:10,marginRight:10,}}>
					     <Icon name="ios-clock-outline" color="#fff"size={22}  />
					  </View>
					  <View style={{flex:1,flexDirection:'row',height:50,alignItems:'center',justifyContent:'space-between',paddingLeft:10,paddingRight:10}}>
					     <Text style={{fontSize:16,fontWeight:'600'}} allowFontScaling={false}>打卡记录</Text>
					  </View>
			</View>
		    <ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
			    <View style={{flexDirection:'column',}}>
				  {!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',height:150,}}>
						<View style={styles.loading}>
							<ActivityIndicator color="white"/>
							<Text style={styles.loadingTitle} allowFontScaling={false}>加载中……</Text>
						</View>
					  </View> : <View>
					  {this.state.datax.is_sw_star == 1 ? <View  style={{flexDirection:'row',marginLeft:10,borderBottomWidth:0.5,borderColor:'#bbb',height:60,alignItems:'center',}}>
									 <Icon name="ios-clock-outline" color="#333"size={36}  />
									 <View style={{flex:1,justifyContent: 'space-between',alignItems: 'center',flexDirection:'row',}}>
									    <View style={{flexDirection:'column',marginLeft:10,}}>
										   <View style={{flexDirection:'row',alignItems:'center',}}>
										      <Text style={{fontSize:14,color:'#333'}} allowFontScaling={false}>上班打卡</Text>
											  {this.state.datas != null ? this.state.datas[0].sw_star_status == 0 ? <Text style={{marginLeft:10,color:'red'}} allowFontScaling={false}></Text> : <Text style={{marginLeft:10,color:'red'}} allowFontScaling={false}>{this.state.datas[0].sw_star_status}</Text> : <Text allowFontScaling={false}></Text>}
										   </View>
											{this.state.datas != null ? <Text style={{fontSize:12,}} allowFontScaling={false}>签到时间 —— {this.state.datas[0].qd_time}</Text> : <Text style={{fontSize:12,}} allowFontScaling={false}>签到时间 —— 未签到</Text>}
										</View>
										 <View style={{paddingRight:10,height:50,justifyContent:'center', }} activeOpacity={0.4}  >
											 {this.state.datas != null ? <Text style={{color:'#4385f4',}} allowFontScaling={false}>{this.state.datas[0].date}</Text> : <Text allowFontScaling={false}></Text>}
										 </View>
									 </View>

					  </View> : <View></View>}
					  {this.state.datax.is_sw_end == 1 ? <View  style={{flexDirection:'row',marginLeft:10,borderBottomWidth:0.5,borderColor:'#bbb',height:60,alignItems:'center',}}>
									 <Icon name="ios-clock-outline" color="#333"size={36}  />
									 <View style={{flex:1,justifyContent: 'space-between',alignItems: 'center',flexDirection:'row',}}>
									    <View style={{flexDirection:'column',marginLeft:10,}}>
										   <View style={{flexDirection:'row',alignItems:'center',}}>
										      <Text style={{fontSize:14,color:'#333'}} allowFontScaling={false}>下班打卡</Text>
											  {this.state.datas != null ? this.state.datas[0].sw_end_status == 0 ? <Text allowFontScaling={false}></Text> : <Text style={{marginLeft:10,color:'red'}} allowFontScaling={false}>{this.state.datas[0].sw_end_status}</Text> : <Text allowFontScaling={false}></Text>}
										   </View>
											   {this.state.datas != null ? <Text style={{fontSize:12,}} allowFontScaling={false}>签到时间 —— {this.state.datas[0].sw_end_time}</Text> : <Text style={{fontSize:12,}} allowFontScaling={false}>签到时间 —— 未签到</Text>}
										</View>
										 <View style={{paddingRight:10,height:50,justifyContent:'center', }} activeOpacity={0.4}  >
											 {this.state.datas != null ? <Text style={{color:'#4385f4',}} allowFontScaling={false}>{this.state.datas[0].date}</Text> : <Text allowFontScaling={false}></Text>}
										 </View>
									 </View>

					  </View> : <View></View>}
					  {this.state.datax.is_xw_star == 1 ? <View  style={{flexDirection:'row',marginLeft:10,borderBottomWidth:0.5,borderColor:'#bbb',height:60,alignItems:'center',}}>
									 <Icon name="ios-clock-outline" color="#333"size={36}  />
									 <View style={{flex:1,justifyContent: 'space-between',alignItems: 'center',flexDirection:'row',}}>
									    <View style={{flexDirection:'column',marginLeft:10,}}>
										   <View style={{flexDirection:'row',alignItems:'center',}}>
										      <Text style={{fontSize:14,color:'#333'}} allowFontScaling={false}>上班打卡</Text>
											  {this.state.datas != null ? this.state.datas[0].xw_star_status == 0 ? <Text allowFontScaling={false}></Text> : <Text style={{marginLeft:10,color:'red'}} allowFontScaling={false}>{this.state.datas[0].xw_star_status}</Text> : <Text allowFontScaling={false}></Text>}
										   </View>
											   {this.state.datas != null ? <Text style={{fontSize:14,}} allowFontScaling={false}>签到时间 —— {this.state.datas[0].xw_star_time}</Text> : <Text style={{fontSize:12,}} allowFontScaling={false}>签到时间 —— 未签到</Text>}
										</View>
										 <View style={{paddingRight:10,height:50,justifyContent:'center', }} activeOpacity={0.4}  >
											 {this.state.datas != null ? <Text style={{color:'#4385f4',}} allowFontScaling={false}>{this.state.datas[0].date}</Text> : <Text allowFontScaling={false}></Text>}
										 </View>
									 </View>

					  </View> : <View></View>}
					  {this.state.datax.is_xw_end == 1 ? <View  style={{flexDirection:'row',marginLeft:10,borderBottomWidth:0.5,borderColor:'#bbb',height:60,alignItems:'center',}}>
									 <Icon name="ios-clock-outline" color="#333"size={36}  />
									 <View style={{flex:1,justifyContent: 'space-between',alignItems: 'center',flexDirection:'row',}}>
									    <View style={{flexDirection:'column',marginLeft:10,}}>
										   <View style={{flexDirection:'row',alignItems:'center',}}>
										      <Text style={{fontSize:14,color:'#333'}} allowFontScaling={false}>下班打卡</Text>
											  {this.state.datas != null ? this.state.datas[0].xw_end_status == 0 ? <Text allowFontScaling={false}></Text> : <Text style={{marginLeft:10,color:'red'}} allowFontScaling={false}>{this.state.datas[0].xw_end_status}</Text> : <Text allowFontScaling={false}></Text>}
										   </View>
											   {this.state.datas != null ? <Text style={{fontSize:12,}} allowFontScaling={false}>签到时间 —— {this.state.datas[0].xw_end_time}</Text> : <Text style={{fontSize:12,}} allowFontScaling={false}>签到时间 —— 未签到</Text>}
										</View>
										 <View style={{paddingRight:10,height:50,justifyContent:'center', }} activeOpacity={0.4}  >
											 {this.state.datas != null ? <Text style={{color:'#4385f4',}} allowFontScaling={false}>{this.state.datas[0].date}</Text> : <Text allowFontScaling={false}></Text>}
										 </View>
									 </View>

					  </View> : <View></View>}


					      </View>

					  }

				</View>
			</ScrollView>
			{this.state.statu ? <Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
				  <Icon name="ios-close-outline" color="#fff"size={36}  />
				  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false}>加载失败，请重新加载。</Text>
	           </Animated.View> : null}
             <Push navigator = {this.props.navigator} {...this.props}/>
             <PassState navigator = {this.props.navigator} {...this.props}/>
	  </View>
    )
    }
}

class DateBoard extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }
	componentDidMount() {
		this.renderDate();
	}
	renderDate() {
     let arr = [];
	 var _year = this.props.year;
	 var _month = this.props.month;
	 var _firstDay = new Date(_year, _month - 1, 1);
     for (var i = 1; i < 43; i++) {
		 var _thisDay = new Date(_year, _month - 1, i - _firstDay.getDay());
		 var _thisDayStr = this.getDateStr(_thisDay);
		 if(_thisDayStr == this.getDateStr(new Date())) {
		     arr.push(
			    <TouchableOpacity onPress={this.props._datet.bind(this,_thisDay.getDate())} key={i} style={{width:Dimensions.get('window').width/7-1,backgroundColor:'#4385f4',alignItems:'center',justifyContent:'center',height:40,	}}>
					<View style={{height:30,width:30, borderWidth:1,borderColor:'#fff',borderRadius:15,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
						<Text style={{color: '#000', fontSize:14,}} allowFontScaling={false}>{_thisDay.getDate()}</Text>
					</View>
				 </TouchableOpacity>
			 )
		 }
		 else if(_thisDayStr.substr(0, 6) == this.getDateStr(_firstDay).substr(0, 6)) {
			 arr.push(
			    <TouchableOpacity onPress={this.props._datet.bind(this,_thisDay.getDate())} key={i} style={{width:Dimensions.get('window').width/7-1,backgroundColor:'#4385f4',alignItems:'center',justifyContent:'center',height:40,}}>

						<Text  style={{color: '#fff', fontSize:14,}} allowFontScaling={false}>{_thisDay.getDate()}</Text>

				 </TouchableOpacity>
			 )
		  }else {    // 其他月
			arr.push(
			   <View key={i} style={{width:Dimensions.get('window').width/7-1,backgroundColor:'#4385f4',alignItems:'center',justifyContent:'center',height:40,}}>

						<Text style={{color: '#ccc', fontSize:14,}} allowFontScaling={false}>{_thisDay.getDate()}</Text>

			   </View>
			 )
		  }


	  }
      return arr;
  }
  getDateStr(date) {
    var _year = date.getFullYear();
    var _month = date.getMonth() + 1;    // 月从0开始计数
    var _d = date.getDate();

    _month = (_month > 9) ? ("" + _month) : ("0" + _month);
    _d = (_d > 9) ? ("" + _d) : ("0" + _d);
    return _year + _month + _d;
  }
  render() {
        return (
                <View style={{flexDirection: 'row',height:250, width:Dimensions.get('window').width, flexWrap:'wrap',backgroundColor:'#4385f4',}}>
                {this.renderDate()}
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
  dateTitle: {
	backgroundColor:'#4385f4',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-around',
    height:40,
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
  dateTitleText: {
	  color:'#ccc',
	  fontSize:14,
  },
});
