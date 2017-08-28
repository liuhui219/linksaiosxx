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
	TouchableHighlight,
	Modal,
	CameraRoll,
	Animated,
	TextInput,
	ActivityIndicator,
	ActionSheetIOS,
	BackAndroid,
	Dimensions,
	Image
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import SelectPoeple from './SelectPoeple';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
var dataImpor = [];
let aa=[];
var images = [];
var BUTTONS = [
  '保存到相册',
  '取消',
];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;
export default class Bxma extends Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
		BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {
            datas:{},
            datasx:{},
			Status:'',
			statu:false,
			statur:false,
			stat:'暂无',
			infos:'',
			product:[],
			poepledata:{},
			modalshow:false,
			modalshows:false,
			modalpoeple:false,
			zidan:[],
			zidan_id:'',
			tj:'提交',
			tp:false,
			tjstatus:true,
			textaera:'',
			textaeras:'',
			bcimg:'',
			historydata:[],
			imgs:[],
			imgsx:[],
			loaded:false,
			loadedst:false,
			url:'',
		};
    }

	componentDidMount() {
	  this.timer = setTimeout(
		  () => { this.fetchDataa(data.data.domain + this.props.data.checkInfo.detail_url+ '&access_token=' + data.data.token);
                  this.fetchDatab(data.data.domain + this.props.data.checkInfo.check_history_url+ '&access_token=' + data.data.token);
		                   },800);
	  aa=[];
	}

    componentWillUnmount() {

	  this.timer && clearTimeout(this.timer);
	  this.timerx && clearTimeout(this.timerx);

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
	fetchDataa(url) {
		var that=this;
		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'id': this.props.data.con_id,
					'notify_id': this.props.data.id,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 console.log(result)
					if(result.data.pj.data.length>0){
					result.data.pj.data.forEach((datas,i)=>{
						var IMG={uri: data.data.domain.slice(0,-6)+datas.fileid.slice(1)};
						aa.push(IMG);
						that.setState({
							imgs:aa,
						});
					})
                    }
					that.setState({
						loaded:true,
						loadedst:true,
						datas: result.data,
						datasx:result,
					});

				})


	}

	fetchDatab(url) {
		var that=this;
		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'id': this.props.data.con_id,
					'notify_id': this.props.data.id,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 console.log(result)

					 that.setState({
						historydata: result.data.slice(0,-1),
					});
					var aa=[];

					if(result.data != null){
					result.data.forEach((img, i) => {
						key={i}
						var IMG =  {uri:data.data.domain.slice(0,-6)+ img.img.slice(1)}
						aa.push(IMG)
						that.setState({
							imgsx: aa,
						});
					})
				   }

				})


	}

    _pressButton() {
		dataImpor = [];
        var { navigator } = this.props;

        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }
		return false;
    }


    _lxr(visible){
		 this.setState({modalshow: visible,url:''});
	}

	_xz(url){
		 this.setState({modalshow: true,url:url});
	}

	_lxrs(visible){
		 this.setState({modalshows: visible,poepledata:{},});
	}

	_xzs(visible){
		 this.setState({modalshows: visible,});
	}

	_lmodalpoeple(visible){
		 this.setState({modalpoeple: visible,modalshows: true});

	}

	_xmodalpoeple(visible){
		 this.setState({modalpoeple: visible,modalshows: false});

	}

    _select(data){
		console.log(data)
		this.setState({
			modalpoeple: false,
			modalshows: true,
			poepledata:data,
			});

	}

    _delets(){
    	this.setState({
			poepledata:{},
			});
    }


    tijiao(){
    	var that=this;
    	this.setState({
			tj:'正在提交...',
			tjstatus:false,
			});
		fetch(this.state.url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'id': this.props.data.con_id,
					'reply_text': this.state.textaera,
					'next_uid':0,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 console.log(result)
					 that.setState({
						modalshow:false,
						tj:'提交',
						tjstatus:true,
						loadedst:false,
						statu:true,
						infos:'审批成功'
					});
					that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000);
				if(that.props.getUser) {
					let user = true;
					that.props.getUser(user);
				}
				that.fetchDatab(data.data.domain + that.props.data.checkInfo.check_history_url+ '&access_token=' + data.data.token);

				})
				.catch((error) => {
					that.setState({

						   tjstatus:true,
						   statu:true,
						   tj:'提交',
						   infos:'审批失败'
					   })
					that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000)

				  });

    }

    tijiaos(){
    	var that=this;
    	if(JSON.stringify(this.state.poepledata) == "{}"){

    		this.setState({
						statur:true,
						infos:'请选择审批人'
					});
					 this.timerx = setTimeout(() => {
						  this.setState({
							 statur:false,
						})
					  },1500)

    	}else{
    	this.setState({
			tj:'正在提交...',
			tjstatus:false,
			});
		fetch('' + data.data.domain + '/index.php?app=Account&m=ExpenseMobile&a=index_bx_down&access_token=' + data.data.token+ '', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'id': this.props.data.con_id,
					'reply_text': this.state.textaeras,
					'next_uid':this.state.poepledata.uid,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 console.log(result)

					 if(result.status == 0){
					 	that.setState({
						 	modalshows:true,
							tj:'提交',
							tjstatus:true,
							statur:true,
							infos:'此人没有审核权限'
						});
						that.timerx = setTimeout(() => {
							  that.setState({
								 statur:false,
							})
						  },1000)
					 }else{
						 that.setState({
						 	modalshows:false,
							tj:'提交',
							tjstatus:true,
							poepledata:{},
							statu:true,
							loadedst:false,
							infos:'审批成功'
						});
						if(that.props.getUser) {
							let user = true;
							that.props.getUser(user);
						}
						that.fetchDatab(data.data.domain + that.props.data.checkInfo.check_history_url+ '&access_token=' + data.data.token);
					}
					 that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000)

				})
				.catch((error) => {
					that.setState({

						   tjstatus:true,
						   statu:true,
						   tj:'提交',
						   infos:'审批失败'
					   })
					that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000)

				  });
    }
}

tup(img){

	var ims={url:img.uri};
	images=[];
	images.push(ims)
    this.setState({tp:true,bcimg:img.uri})

}

showActionSheet() {
	var that=this;
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      if(buttonIndex == 0){
          CameraRoll.saveToCameraRoll(this.state.bcimg);
          that.setState({
          	statu:true,
			infos:'保存成功'
          })
          that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000)
      }else{
      	console.log(1)
      }
    });
  }

    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
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
										<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>已审批</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity>
								  <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center'}}>

								  </View>
							</TouchableOpacity>
				  </View>
				</View>
				{!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',flex:1,flexDirection:'column',backgroundColor:'#ececec'}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text style={styles.loadingTitle} allowFontScaling={false}>加载中……</Text>
					</View>
			    </View> : <ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ececec'}}>
				     <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:0}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false}>操作人</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
								<Text allowFontScaling={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
									{this.props.data.from_name}
								</Text>
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false}>来自</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.props.data.app_name ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.props.data.app_name}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false}>创建日期</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.datas.bx.time}
								</Text>
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false}>报销名</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.datas.bx.expensename}
								</Text>
							</View>
						</View>
					</View>

					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false}>报销金额</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.datas.bx.money}
								</Text>
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false}>报销人</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.datas.bx.userid}
								</Text>
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false}>报销状态</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center',color:'red'}} allowFontScaling={false}>
									{this.state.datasx.audit_status}
								</Text>
							</View>
						</View>
					</View>

				   <View style={{flexDirection:'row',paddingTop:18,paddingBottom:18,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false}>时间</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.datas.bx.time}
								</Text>
							</View>
						</View>
					</View>

					<View  style={{flexDirection:'row',paddingTop:18,paddingBottom:18,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false}>备注</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.datas.bx.bz}
								</Text>
							</View>
						</View>
					</View>

					<Modal visible={this.state.tp}
					      animationType={"fade"}
						  onRequestClose={() => {console.log("Modal has been closed.")}}
						   transparent={true}>

				                <ImageViewer saveToLocalByLongPress={false} onClick={(close)=>{this.setState({tp:false})}} imageUrls={images}/>
				                <TouchableOpacity onPress={this.showActionSheet.bind(this)} style={{position:'absolute',bottom:0,right:30}}>
				                <View ><Icon name="ios-list-outline" color="#fff"size={50}  /></View>
				                </TouchableOpacity>
				                {this.state.statu ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
								  <Icon name="ios-checkmark-outline" color="#fff"size={50}  />
								  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false}>{this.state.infos}</Text>
					            </Animated.View> : null}
		            </Modal>
					<View style={{marginTop:15,backgroundColor:'#fff'}}>
                    {this.state.datas.pj.count > 0 ? this.state.datas.pj.data.map((data,i)=>{
                    	return <View key={i} style={{flexDirection:'column',borderBottomWidth:1,borderColor:'#ccc'}}>
                    	    <View style={{flexDirection:'row',justifyContent:'space-between',paddingLeft:10,paddingRight:10,paddingTop:7,paddingBottom:7,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec'}}>
                                <Text style={{fontSize:14,color:'#aaa'}} allowFontScaling={false}>{data.documentsname}</Text>
                                <Text style={{fontSize:14,color:'#aaa'}} allowFontScaling={false}>{data.time}</Text>
                    	    </View>
                    	    <View style={{flexDirection:'row',padding:10}}>
                                <TouchableOpacity onPress={this.tup.bind(this,this.state.imgs[i])}><View style={{height:60,width:60,overflow:'hidden'}}><Image source={this.state.imgs[i]} style={{height:60,width:60,}} /></View></TouchableOpacity>
                                <View style={{marginLeft:10,flexDirection:'column',justifyContent:'space-between'}}>
                                   <Text style={{fontSize:14}} allowFontScaling={false}>票据号：{data.documentsid}</Text>
                                   <Text style={{fontSize:14}} allowFontScaling={false}>来源：{data.projectid}</Text>
                                   <Text style={{fontSize:14}} allowFontScaling={false}>分类：{data. cateid}</Text>
                                </View>
                    	    </View>
                    	    {data.docbz != '无' ? <View style={{paddingRight:10,paddingLeft:10,paddingBottom:10,paddingTop:10,borderTopWidth:1,borderColor:'#ececec',flexDirection:'row'}}>
                                <Text style={{fontSize:14,}} allowFontScaling={false}>备注：</Text>

                                <Text style={{fontSize:14,flex:1,}} allowFontScaling={false}>{data.docbz}</Text>
                            </View> : null}
                    	</View>
                    }) : null}
                    </View>

                   <View style={{marginTop:15,backgroundColor:'#fff',}}>
                        {this.state.historydata.length > 0 ? <View style={{paddingLeft:10,paddingRight:10,paddingTop:7,paddingBottom:7,borderBottomWidth:1,borderColor:'#ececec',flexDirection:'row',justifyContent:'space-between'}}>
                              <Text style={{fontSize:14}} allowFontScaling={false}> 评论</Text>
                              <Text style={{fontSize:14}} allowFontScaling={false}>共有{this.state.historydata.length}条评论</Text>
                           </View> : null}
					    {this.state.historydata.length > 0 ? this.state.historydata.map((data,i) => {
							return  <View key={i} style={{flexDirection:'row',paddingTop:15,paddingLeft:15,}}>
								<View style={{width: 40, height: 40,borderRadius:20,backgroundColor:'#718DC1',alignItems:'center', justifyContent:'center'}}>
								   <Image source={this.state.imgsx[i]} style={{width: 40, height: 40,borderRadius:20,}} />
								</View>
								<View style={{flexDirection:'column',marginLeft:15,flex:1, borderBottomWidth:1,borderColor:'#ececec',paddingBottom:15,paddingRight:15,}}>
								   <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
									  <Text allowFontScaling={false}>{data.apply_name}</Text>
									  <Text allowFontScaling={false}>{data.inserttime}</Text>
								   </View>
								   <Text style={{color:'#aaa',fontSize:14,flexWrap:'wrap',flex:1,paddingTop:5,}} allowFontScaling={false}>{data.reply_text}
								   </Text>
								</View>
							  </View>
						}) : null}

					</View>

				</ScrollView>}

				<View>
					   <Modal
					      animationType={"slide"}
						  transparent={false}
						  visible={this.state.modalshow}
						  onRequestClose={() => {console.log("Modal has been closed.")}}
					   >
					      <View style={styles.card}>
					          <TouchableOpacity onPress={this._lxr.bind(this,false)} style={{flex:1}}>
								  <View style={{flex:1,justifyContent:'center'}}>

											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
											  </View>

								  </View>
							  </TouchableOpacity>
							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>审批</Text>

							  </View>
							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

							  </View>
							</View>
							<ScrollView style={{flex:1,backgroundColor:'#ececec'}}>
							   <View style={{padding:10,backgroundColor:'#fff'}}>
							        <TextInput
									  onChangeText={(textaera) => this.setState({textaera})}
									  multiline={true}
									  numberOfLines={5}
									  placeholderTextColor={'#ccc'}
									  style={{ color:'#666',fontSize:14,textAlignVertical:'top',height:170,}}
									  placeholder='不说点什么...'
									  underlineColorAndroid={'transparent'}
									/>
							  </View>
							  {this.state.tjstatus ? <TouchableHighlight onPress={this.tijiao.bind(this)} underlayColor="rgba(82, 132, 216,0.7)" style={{marginLeft:10,marginRight:10,marginTop:40, borderWidth:1,borderColor:'#ececec',borderRadius:5,paddingTop:10,paddingBottom:10, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
					            <View style={{borderRadius:5, justifyContent:'center',alignItems:'center',}}>
					                <Text style={{fontSize:18, color:'#fff'}} allowFontScaling={false}>{this.state.tj}</Text>
					            </View>
					          </TouchableHighlight> : <TouchableHighlight  style={{marginLeft:10,marginRight:10,marginTop:40, borderWidth:1,borderColor:'#ececec',borderRadius:5,paddingTop:10,paddingBottom:10, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
					            <View style={{borderRadius:5, justifyContent:'center',alignItems:'center',}}>
					                <Text style={{fontSize:18, color:'#fff'}} allowFontScaling={false}>{this.state.tj}</Text>
					            </View>
					          </TouchableHighlight>}

							</ScrollView>
							{this.state.statu ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
							  <Icon name="ios-close-outline" color="#fff"size={36}  />
							  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false}>{this.state.infos}</Text>
				            </Animated.View> : null}
                    <PassState navigator = {this.props.navigator} {...this.props}/>
					   </Modal>
					</View>

					<View>
					   <Modal
					      animationType={"slide"}
						  transparent={false}
						  visible={this.state.modalshows}
						  onRequestClose={() => {console.log("Modal has been closed.")}}
					   >
					      <View style={styles.card}>
					          <TouchableOpacity onPress={this._lxrs.bind(this,false)} style={{flex:1}}>
								  <View style={{flex:1,justifyContent:'center'}}>

											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
											  </View>

								  </View>
							  </TouchableOpacity>
							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>审批</Text>

							  </View>
							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

							  </View>
							</View>
							<ScrollView style={{flex:1,backgroundColor:'#ececec'}}>
							   <View style={{padding:10,backgroundColor:'#fff'}}>
							        <TextInput
									  onChangeText={(textaeras) => this.setState({textaeras})}
									  multiline={true}
									  numberOfLines={5}
									  placeholderTextColor={'#ccc'}
									  style={{ color:'#666',fontSize:14,textAlignVertical:'top',height:170,}}
									  placeholder='不说点什么...'
									  underlineColorAndroid={'transparent'}
									/>
							  </View>
							  <View style={{backgroundColor:'#fff',marginTop:15,flexDirection:'column',paddingLeft:10,paddingTop:10,paddingBottom:10,}}>
                                 <View style={{flexDirection:'row',alignItems:'center'}}>
                                   <Text style={{fontSize:16}} allowFontScaling={false}>审批人</Text>
                                   <Text style={{fontSize:12,color:'#bbb',marginLeft:5}} allowFontScaling={false}>(点击姓名可删除)</Text>
                                 </View>
                                 <View style={{marginTop:15,flexDirection:'row',alignItems:'center',}}>
                                     {this.state.poepledata.name ? <TouchableOpacity onPress={this._delets.bind(this)} activeOpacity={1}><View style={{backgroundColor:'#60a9e8',paddingBottom:8,paddingTop:8,paddingLeft:10,paddingRight:10,marginRight:10,borderRadius:3}}>
                                        <Text style={{color:'#fff'}} allowFontScaling={false}>{this.state.poepledata.name}</Text>
                                     </View></TouchableOpacity> : null}
                                    <TouchableOpacity style={{width:46,height:46,marginTop:5,alignItems:'center',justifyContent:'center'}} onPress={this._xmodalpoeple.bind(this,true)}>

                                      <Icon name="ios-add-circle-outline" color="#ccc"size={46}  />

                                    </TouchableOpacity>
                                 </View>
							  </View>
							  {this.state.tjstatus ? <TouchableHighlight onPress={this.tijiaos.bind(this)}  underlayColor="rgba(82, 132, 216,0.7)" style={{marginLeft:10,marginRight:10,marginTop:40, borderWidth:1,borderColor:'#ececec',borderRadius:5,paddingTop:10,paddingBottom:10, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
					            <View style={{borderRadius:5, justifyContent:'center',alignItems:'center',}}>
					                <Text style={{fontSize:18, color:'#fff'}} allowFontScaling={false}>{this.state.tj}</Text>
					            </View>
					          </TouchableHighlight> : <TouchableHighlight  style={{marginLeft:10,marginRight:10,marginTop:40, borderWidth:1,borderColor:'#ececec',borderRadius:5,paddingTop:10,paddingBottom:10, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
					            <View style={{borderRadius:5, justifyContent:'center',alignItems:'center',}}>
					                <Text style={{fontSize:18, color:'#fff'}} allowFontScaling={false}>{this.state.tj}</Text>
					            </View>
					          </TouchableHighlight>}

							</ScrollView>
							{this.state.statur ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
							  <Icon name="ios-close-outline" color="#fff"size={36}  />
							  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false}>{this.state.infos}</Text>
				            </Animated.View> : null}
                    <PassState navigator = {this.props.navigator} {...this.props}/>
					   </Modal>

					</View>



					<View>
					   <Modal
					      animationType={"slide"}
						  transparent={false}
						  visible={this.state.modalpoeple}
						  onRequestClose={() => {console.log("Modal has been closed.")}}
					   >
					      <View style={styles.card}>
					          <TouchableOpacity onPress={this._lmodalpoeple.bind(this,false)} style={{flex:1}}>
								  <View style={{flex:1,justifyContent:'center'}}>

											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false}>取消</Text>
											  </View>

								  </View>
							  </TouchableOpacity>
							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false}>选择审批人</Text>

							  </View>
							  <View style={{flex:1,justifyContent:'center',alignItems:'flex-end',}}>

							  </View>
							</View>
							<View style={{flex:1}}>
                               <SelectPoeple _select={this._select.bind(this)}/>
							</View>
              <PassState navigator = {this.props.navigator} {...this.props}/>
					   </Modal>
					</View>
					{this.state.statu ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
					  <Icon name="ios-close-outline" color="#fff"size={36}  />
					  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false}>{this.state.infos}</Text>
		            </Animated.View> : null}
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
	backgroundColor:'#4385f4',
	paddingTop:20,
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
