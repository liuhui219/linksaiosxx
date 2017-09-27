import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Navigator,
    TouchableOpacity,
    Text,
    ScrollView,
    DeviceEventEmitter,
    InteractionManager,
    ViewPagerAndroid,
    ActivityIndicator,
    Modal,
    Animated,
    Dimensions,
    Image
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import Icon from 'react-native-vector-icons/Ionicons';
import Add from './Add';
import DeviceInfo from 'react-native-device-info';
import Netinfo from './Netinfo';
import CalendarInfo from './CalendarInfo';
import Token from './Token';
import {Lunar} from  './currentDate';

var bgcolors = '';
var colors=['rgb(30, 127, 181)','rgb(30, 154, 181)','rgb(30, 181, 131)','rgb(30, 181, 59)','rgb(178, 181, 30)','rgb(181, 116, 30)','rgb(173, 181, 30)','rgb(181, 93, 30)','rgb(181, 53, 30)','rgb(96, 30, 181)','rgb(56, 30, 181)','rgb(67, 133, 244)'];
var DValue=[[30, 127, 181],[30, 154, 181],[30, 181, 131],[30, 181, 59],[178, 181, 30],[181, 116, 30],[173, 181, 30],[181, 93, 30],[181, 53, 30],[96, 30, 181],[56, 30, 181],[67, 133, 244]];
var right=[
           [
             [0,27,0],[37,6,63]
           ],
           [
             [0,27,-50],[0,-27,0]
           ],
           [
             [0,0,-72],[0,-27,50]
           ],
           [
             [148,0,-29],[0,0,72]
           ],
           [
             [3,-65,0],[-148,0,29]
           ],
           [
             [-8,65,0],[-3,65,0]
           ],
           [
             [8,-88,0],[8,-65,0]
           ],
           [
             [0,-40,0],[-8,88,0]
           ],
           [
             [-85,-23,151],[0,40,0]
           ],
           [
             [-40,0,0],[85,23,-151]
           ],
           [
             [11,103,63],[40,0,0]
           ],
           [
             [-37,-6,-63],[-11,-103,-63]
           ]
         ];
export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
                 this.state = {
            year : new Date().getFullYear(),
            yeard : new Date().getFullYear(),
            month : new Date().getMonth() + 1,
            date : new Date().getDate(),
            dated : new Date().getDate(),
            monthd : new Date().getMonth() + 1,
        datas:[],
        datet:'',
        loaded: false,
        user: false,
        statu:false,
        fadeAnim: new Animated.Value(0),
        modalVisible:false,
        };

    }

    componentDidMount() {
      this.timer = setTimeout(
        () => { this.fetchData(); },
      1000
    );
    }

    fetchData() {
        fetch('' + data.data.domain + '/index.php?app=Calendar2&m=CalendarApi&a=get_calendar_schedule&uid=data.data.uid&time='+this.state.year+'-'+this.state.month+'-'+this.state.date+'&access_token=' + data.data.token + '')
        .then((response) => response.json())
        .then((responseData) => {
              this.setState({
                            datas: responseData.data,
                            loaded: true,
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


    Gdate(n){
      if(n<10){
         return '0'+n;
      }
       else{
           return ''+n;
      }
    }



    _datet(d){
        this.setState({
                      dated : this.Gdate(d),
                      monthd : this.Gdate(this.state.month),
                      yeard : this.Gdate(this.state.year),
                      datet: this.Gdate(this.state.year)+'-'+this.Gdate(this.state.month)+'-'+this.Gdate(d),
                      loaded: false,
                      date :d,
                      })

        fetch('' + data.data.domain + '/index.php?app=Calendar2&m=CalendarApi&a=get_calendar_schedule&uid=data.data.uid&time='+this.state.year+'-'+this.state.month+'-'+d+'&access_token=' + data.data.token + '')
        .then((response) => response.json())
        .then((responseData) => {
              this.setState({
                            datas: responseData.data,
                            loaded: true,
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
    componentWillUnmount() {
        this.timerx && clearTimeout(this.timerx);
        this.timer && clearTimeout(this.timer);
    }
    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
                    }

    }

    _xqButton(id,uid){
      var bgColor=colors[this.state.month-1];
        const { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'CalendarInfo',
                component: CalendarInfo,
                params: {
                  bgColor:bgColor,
                  id: id,
                  uid:uid,
                }
            })
        }
    }

    _add() {
         this.setState({
             modalVisible:true,
         })
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

    _quxiao(){
      this.setState({
          modalVisible:false,
      })
      this.fetchData();
    }

    myScroll(event) {
        let scrollX = event.nativeEvent.contentOffset.x;
        if (scrollX > Dimensions.get('window').width) {
            this.nextMonth()
        } else if (scrollX < Dimensions.get('window').width) {
            this.prevMonth()
        } else {

        }
        this.refs.trueScroll.scrollTo({y:0, x:Dimensions.get('window').width,animated:false})

    };
    onScroll(event){

      console.log((event.nativeEvent.contentOffset.x-Dimensions.get('window').width)/Dimensions.get('window').width);
      var pros = (event.nativeEvent.contentOffset.x-Dimensions.get('window').width)/Dimensions.get('window').width;
      var that = this;
      var bgcolor = colors[this.state.month-1];

      if(pros < 0){

        var progress = Math.abs(pros);

        this.refs['head'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(progress,right[that.state.month-1][1]),
            },
        });
        this.refs['week'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(progress,right[that.state.month-1][1]),
            },
        });
        this.refs['icons'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(progress,right[that.state.month-1][1]),
            },
        });

      }else{

        this.refs['head'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(pros,right[that.state.month-1][0]),
            },
        });
        this.refs['week'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(pros,right[that.state.month-1][0]),
            },
        });
        this.refs['icons'].setNativeProps({
            style: {
              backgroundColor: this.iconColor(pros,right[that.state.month-1][0]),
            },
        });


      }

      if(pros == 0){
        this.refs['head'].setNativeProps({
            style: {
              backgroundColor: bgcolor,
            },
        });
        this.refs['week'].setNativeProps({
            style: {
              backgroundColor: bgcolor,
            },
        });
        this.refs['icons'].setNativeProps({
            style: {
              backgroundColor: bgcolor,
            },
        });
      }
    }

    iconColor(progress,data) {
      const a = DValue[this.state.month-1][0] + data[0] * progress;
      const b = DValue[this.state.month-1][1] + data[1] * progress;
      const c = DValue[this.state.month-1][2] + data[2] * progress;
      return `rgb(${a}, ${b}, ${c})`;
    }

    render() {
        return (
                <View style={{flexDirection:'column',flex:1,backgroundColor:'#ececec',}}>
                   <View ref='head' style={styles.card}>
                     <View style={{flex:1,justifyContent:'center'}}>
                       <TouchableOpacity onPress={this._pressButton.bind(this)}>
                         <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
								           <Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
                           <Text style={{color:'white',fontSize:16,marginLeft:-5,}}allowFontScaling={false}>返回</Text>
                         </View>
                       </TouchableOpacity>
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                       <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                         <Text style={{color:'white',fontSize:16}}allowFontScaling={false}>{this.state.year}年{this.state.month}月</Text>
                       </View>
                    </View>
                    <View style={{flex:1,justifyContent:'center'}}>
                      <TouchableOpacity onPress={this._add.bind(this)}>
                         <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',marginRight:10,}}>
								           <Icon name="ios-add-circle-outline" color="#fff"size={27}  />

                         </View>
                      </TouchableOpacity>
                    </View>
                </View>
                <Netinfo  {...this.props}/>
                <View>
                    <Modal animationType={"slide"}
                            transparent={false}
                            visible={this.state.modalVisible}
                            onRequestClose={() => {console.log("Modal has been closed.")}}>
                               <View style={{flex:1,}}>
                                    <Add _quxiao={this._quxiao.bind(this)}/>
                               </View>
                            </Modal>
                </View>
                <View ref='week' style={styles.dateTitle}>
                    <Text style={styles.dateTitleText}allowFontScaling={false}>日</Text>
                    <Text style={styles.dateTitleText}allowFontScaling={false}>一</Text>
                    <Text style={styles.dateTitleText}allowFontScaling={false}>二</Text>
                    <Text style={styles.dateTitleText}allowFontScaling={false}>三</Text>
                    <Text style={styles.dateTitleText}allowFontScaling={false}>四</Text>
                    <Text style={styles.dateTitleText}allowFontScaling={false}>五</Text>
                    <Text style={styles.dateTitleText}allowFontScaling={false}>六</Text>
                </View>
                <View style={{height:290,overflow:'hidden'}}>
                <ScrollView  horizontal={true} contentOffset={{x: Dimensions.get('window').width, y: 0}}
                bounces={false} onMomentumScrollEnd={event=>this.myScroll(event)} ref="trueScroll"
                showsHorizontalScrollIndicator={false} pagingEnabled={true} onScroll={this.onScroll.bind(this)} scrollEventThrottle={1}>
                    <View>
                        <ScrollView bounces={false}>
                        <DateBoard bgcolor={colors[this.state.month-1]} year={this.state.year} month={this.state.month-1} _datet={this._datet.bind(this)}/>
                        </ScrollView>
                    </View>
                    <View>
                        <ScrollView bounces={false}>
                        <DateBoard bgcolor={colors[this.state.month-1]} year={this.state.year} month={this.state.month} _datet={this._datet.bind(this)}/>
                        </ScrollView>
                    </View>
                    <View>
                        <ScrollView bounces={false}>
                        <DateBoard bgcolor={colors[this.state.month-1]} year={this.state.year} month={this.state.month+1} _datet={this._datet.bind(this)}/>
                        </ScrollView>
                    </View>
                </ScrollView>
                </View>
                <View style={{height:10,width:Dimensions.get('window').width,backgroundColor:'#eee',flexDirection:'row',}}></View>
                <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#eee',backgroundColor:'#fff',}}>
                   <View ref='icons' style={{width:30,height:30,borderRadius:5,alignItems:'center',justifyContent:'center',backgroundColor:'#4385f4',marginLeft:10,marginRight:10,}}>
                      <Icon name="ios-clock-outline" color="#fff"size={22}  />
                   </View>
                   <View style={{flex:1,flexDirection:'row',height:55,alignItems:'center',justifyContent:'space-between',paddingLeft:10,paddingRight:10}}>
                      <View style={{flexDirection:'column'}}>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>今日日程</Text>
                       <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:12,marginTop:5}}>农历{Lunar.toLunar(this.state.yeard, this.state.monthd,this.state.dated)[5]}{Lunar.toLunar(this.state.yeard, this.state.monthd,this.state.dated)[6]}</Text>
                      </View>
                      <Text style={{fontSize:14, color:'#666'}} allowFontScaling={false}>{this.state.datet}</Text>
                   </View>
                </View>
                <ScrollView style={{flexDirection:'column',backgroundColor:'#fff'}}>
                <View style={{flexDirection:'column',}}>
                {!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',height:150,}}>
                <View style={styles.loading}>
                <ActivityIndicator color="white"/>
                <Text style={styles.loadingTitle}allowFontScaling={false}>加载中……</Text>
                </View>
                </View> : this.state.datas.length>0 ? this.state.datas.map((data, i) => {

                         return <View key={i} style={{flexDirection:'row',marginLeft:10,borderBottomWidth:0.5,borderColor:'#bbb',height:50,alignItems:'center',}}>
                         <Icon name="ios-alarm-outline" color="#333"size={20}  />
                         <Text style={{fontSize:14,marginLeft:10,flex:1,}}allowFontScaling={false}>{data.startime} —— {data.title}</Text>
                         <TouchableOpacity onPress={this._xqButton.bind(this,data.id,data.uid)} style={{paddingRight:10,height:50,justifyContent:'center', }} activeOpacity={0.4}  >
                         <Text style={{color:'#4385f4',}}allowFontScaling={false}>查看详情</Text>
                         </TouchableOpacity>
                         </View>

                         }): <View style={{flexDirection:'row',height:80,alignItems:'center',justifyContent:'center',}}>

                       <Text style={{fontSize:20,color:'#ccc',}}allowFontScaling={false}>暂无日程</Text>

                  </View>

                }

                </View>

                </ScrollView>

                    {this.state.statu ? <Animated.View style={{opacity: this.state.fadeAnim,padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
                    <Icon name="ios-close-outline" color="#fff"size={36}  />
                    <Text style={{fontSize:16,color:'#fff',marginTop:20,}}allowFontScaling={false}>加载失败，请重新加载。</Text>
                    </Animated.View> : <View></View>}
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
           bgcolorS:this.props.bgcolor,
        }
    }
    componentDidMount() {
        this.renderDate();

    }
    componentWillUnmount(){
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
                         <TouchableOpacity onPress={this.props._datet.bind(this,_thisDay.getDate())} key={i} style={{width:Dimensions.get('window').width/7-1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',height:45,	}}>
                         <View style={{height:30,width:30, borderWidth:1,borderColor:'#fff',borderRadius:15,alignItems:'center',justifyContent:'center',backgroundColor:this.props.bgcolor}}>
                         <Text style={{color: '#fff', ontSize:16,}}allowFontScaling={false}>{_thisDay.getDate()}</Text>
                         </View>
                         </TouchableOpacity>
                         )
            }
            else if(_thisDayStr.substr(0, 6) == this.getDateStr(_firstDay).substr(0, 6)) {
                arr.push(
                         <TouchableOpacity onPress={this.props._datet.bind(this,_thisDay.getDate())} key={i} style={{width:Dimensions.get('window').width/7-1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',height:45,}}>

                         <Text  style={{color: '#000', fontSize:16,}}allowFontScaling={false}>{_thisDay.getDate()}</Text>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color: '#999',  fontSize:8,}}>{Lunar.toLunar(_year, _month, _thisDay.getDate())[6]}</Text>
                         </TouchableOpacity>
                         )
            }else {    // 其他月
                arr.push(
                         <View key={i} style={{width:Dimensions.get('window').width/7-1,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',height:45,}}>

                         <Text style={{color: '#999', fontSize:16,}}allowFontScaling={false}>{_thisDay.getDate()}</Text>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color: '#999',  fontSize:8,}}>{Lunar.toLunar(_year, _thisDayStr.slice(4,6), _thisDay.getDate())[6]}</Text>
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
                <View style={{flexDirection: 'row', height:290, width:Dimensions.get('window').width, flexWrap:'wrap',backgroundColor:'#fff',paddingTop:5}}>
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
                                 height:(DeviceInfo.getModel() == 'iphone X' || DeviceInfo.getModel() == 'Simulator') ? 75 : 65,
                                 paddingTop:(DeviceInfo.getModel() == 'iphone X' || DeviceInfo.getModel() == 'Simulator') ? 30 : 20,
                                 backgroundColor:'#4385f4',
                                 flexDirection:'row'
                                 },
                                 dateTitle: {
                                 backgroundColor:'#4385f4',
                                 flexDirection: 'row',
                                 alignItems:'center',
                                 justifyContent:'space-around',
                                 height:35,
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
                                 color:'#fff',
                                 fontSize:12,
                                 },
                                 });
