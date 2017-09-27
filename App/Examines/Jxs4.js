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
	Animated,
	TextInput,
	ActivityIndicator,
  ActionSheetIOS,
	CameraRoll,
	BackAndroid,
	Dimensions,
	Image
} from 'react-native';
import Push from '../Push';
import SelectPoeple from '../SelectPoeple';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import Picker from 'react-native-picker';
import PassState from '../PassState';
var dataImpor = [];
var images = [];
var BUTTONS = [
  '保存到相册',
  '取消',
];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;
var SHRS=[];
export default class Jxs extends Component {

    constructor(props) {
        super(props);
		super(props);
		this._pressButton = this._pressButton.bind(this);
		BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {
            datas:{},
            datasx:{},
			tp:false,
			bottoms: new Animated.Value(-110),
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
			tjstatus:true,
			textaera:'',
			textaeras:'',
			historydata:[],
			imgs:[],
			imgsx:[],
			loaded:false,
			loadedst:false,
			url:'',
			SHR:[],
			SHRS:[''],
			shid:'',
			shows:false,
			poepleName:'',
			listCheck:{},
			img:'',
			isshowd:true,
		};
    }

	componentDidMount() {
	  this.timer = setTimeout(
		  () => { this.fetchDataa(data.data.domain + this.props.data.checkInfo.detail_url+ '&access_token=' + data.data.token);
                  this.fetchDatab(data.data.domain + this.props.data.checkInfo.check_history_url+ '&access_token=' + data.data.token);
                 },800);
		SHRS=[];
	}

    componentWillUnmount() {

	  this.timer && clearTimeout(this.timer);
	  this.timerx && clearTimeout(this.timerx);
	  BackAndroid.removeEventListener('hardwareBackPress', this._pressButton);
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
					 var IMG={uri: data.data.domain.slice(0,-6)+result.data.base.appendix_img.slice(1)};
					 that.setState({
						loaded:true,
						datas: result.data,
						datasx:result,
						img:IMG
					});

					fetch('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=get_shenhe_btn&access_token=' + data.data.token + '', {
						  method: 'POST',
						  headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						  },
						  body: that.toQueryString({
							'app': result.flow.node.split(".")[0],
							'mm': result.flow.node.split(".")[1],
							'aa':result.flow.node.split(".")[2],
							'con_id': that.props.data.con_id,
							'current_step': result.flow ? result.flow.current_step : 0
						  })
						})
						.then(function (response) {
							return response.json();
						})
						.then(function (result) {

							console.log(result)
							that.setState({
								loadedst:true,
								SHR:result.btns.auth_users,
								listCheck:result.btns.list,
							});
							if(result.flow_data.length > 0){
								console.log(result.flow_data[result.btns.info.slice(-1)])
								that.setState({
									isshowd:false,
									shid:result.flow_data[result.btns.info.slice(-1)].users[0].uid,
									poepleName:result.flow_data[result.btns.info.slice(-1)].users[0].name,
								})
							}
							result.btns.auth_users.forEach((datas,i)=>{
								SHRS.push(datas.name);
								that.setState({SHRS:SHRS,});
							})

						})
						.catch((error) => {
							that.setState({
								   loaded:true,
								   statu:true,
								   infos:'加载失败'
							   })
							that.timerx = setTimeout(() => {
							  that.setState({
								 statu:false,
							})
						  },1000)

						  });

				})
				.catch((error) => {
					that.setState({
						   loaded:true,
						   statu:true,
						   infos:'加载失败'
					   })
					that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000)

				  });


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
				.catch((error) => {
					that.setState({
						   loaded:true,
						   statu:true,
						   infos:'加载失败'
					   })
					that.timerx = setTimeout(() => {
					  that.setState({
						 statu:false,
					})
				  },1000)

				  });


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
    this.pickera.toggle();
    this.setState({shows:true});
  }

    _select(data){

		this.setState({
			modalpoeple: false,
			modalshows: true,
			poepledata:data,
			});

	}

    _delets(){
    	this.setState({
			poepleName:'',
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

					 that.setState({
						modalshow:false,
						tj:'提交',
						tjstatus:true,
						statu:true,
						loadedst:false,
						infos:'审批成功'
					});
					that.fetchDatab(data.data.domain + that.props.data.checkInfo.check_history_url+ '&access_token=' + data.data.token);
					if(that.props.getUser) {
							let user = true;
							that.props.getUser(user);
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

    tijiaos(){
    	var that=this;
    	if(this.state.poepleName == ""){

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
		fetch(data.data.domain + this.props.data.checkInfo.next_check_url + '&access_token=' + data.data.token, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'id': this.props.data.con_id,
					'reply_text': this.state.textaeras,
					'next_uid':this.state.shid,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {

					 that.setState({
					 	modalshows:false,
						tj:'提交',
						tjstatus:true,
						loadedst:false,
						poepledata:{},
						statu:true,
						infos:'审批成功'
					});
					that.fetchDatab(data.data.domain + that.props.data.checkInfo.check_history_url+ '&access_token=' + data.data.token);
					if(that.props.getUser) {
							let user = true;
							that.props.getUser(user);
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

	var ims={url:this.state.img.uri};
	images=[];
	images.push(ims)
    this.setState({tp:true,bcimg:this.state.img.uri})

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
								        <Image source={require('../imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
										<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
								  </View>
							</TouchableOpacity>
				  </View>
				  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
										<Text style={{color:'white',fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>审批</Text>
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
						<Text style={styles.loadingTitle} allowFontScaling={false} adjustsFontSizeToFit={false}>加载中……</Text>
					</View>
			    </View> : <ScrollView style={{flex:1,flexDirection:'column',backgroundColor:'#ececec'}}>
				     <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:0}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>操作人</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
								<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
									{this.props.data.from_name}
								</Text>
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>来自</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.props.data.app_name ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									{this.props.data.app_name}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>状态</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									{this.state.datasx.audit_status}
								</Text>
							</View>
						</View>
					</View>

					{this.state.datas.base.cname ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>经销商名称</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									{this.state.datas.base.cname}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.change.cname ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>变更后经销商名称</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									{this.state.datas.change.cname}
								</Text>
							</View>
						</View>
					</View> :null}

					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>经销商编号</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.identifier}
								</Text>
							</View>
						</View>
					</View>



					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>区域经理</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.area_manager_name}
								</Text>
							</View>
						</View>
					</View>

					{this.state.datas.base.name ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>联系人</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.name}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.change.name ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>变更后联系人</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.change.name}
								</Text>
							</View>
						</View>
					</View> : null}



					{this.state.datas.base.phone ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>联系电话</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.phone}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.change.phone ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>变更后联系电话</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.change.phone}
								</Text>
							</View>
						</View>
					</View> : null}

					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>签约时间</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.sign_time}
								</Text>
							</View>
						</View>
					</View>

					{this.state.datas.base.respo ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>经销商法人</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.respo}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.change.respo ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>变更后经销商法人</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.change.respo}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.base.respo_phone ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>法人电话</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.respo_phone}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.change.respo_phone ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>变更后法人电话</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.change.respo_phone}
								</Text>
							</View>
						</View>
					</View> : null}

					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>入网保证金</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.bu}
								</Text>
							</View>
						</View>
					</View>

					{this.state.datas.base.bank_name ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>开户行名称</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.bank_name}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.change.bank_name ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>变更后开户行名称</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.change.bank_name}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.base.bank_account ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>开户行账号</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.bank_account}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.change.bank_account? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>变更后开户行账号</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.change.bank_account}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.base.credit_code ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>统一信用代码</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.credit_code}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.change.credit_code ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>变更后统一信用代码</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.change.credit_code}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.base.tax_code ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>税务登记证号</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.tax_code}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.change.tax_code ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>变更后税务登记证号</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.change.tax_code}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.base.group_code ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>组织机构代码</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.base.group_code}
								</Text>
							</View>
						</View>
					</View> : null}

					{this.state.datas.change.group_code ? <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>变更后组织机构代码</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false} adjustsFontSizeToFit={false}>
									 {this.state.datas.change.group_code}
								</Text>
							</View>
						</View>
					</View> : null}

					<View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'flex-start',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,backgroundColor:'#fff',}}>

								<Text style={{fontSize:14,color:'#666',}} allowFontScaling={false} adjustsFontSizeToFit={false}>营业执照:</Text>
								<TouchableOpacity onPress={this.tup.bind(this)} style={{width: 60, height: 60,alignItems:'center', justifyContent:'center',marginLeft:15}}>
									<View style={{width: 60, height: 60,alignItems:'center', justifyContent:'center',}}>
									   <Image source={this.state.img} style={{width: 60, height: 60,}} />
									</View>
								</TouchableOpacity>
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








                   <View style={{marginTop:15,backgroundColor:'#fff',}}>
                        {this.state.historydata.length > 0 ? <View style={{paddingLeft:10,paddingRight:10,paddingTop:7,paddingBottom:7,borderBottomWidth:1,borderColor:'#ececec',flexDirection:'row',justifyContent:'space-between'}}>
                              <Text style={{fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}> 评论</Text>
                              <Text style={{fontSize:14}} allowFontScaling={false} adjustsFontSizeToFit={false}>共有{this.state.historydata.length}条评论</Text>
                           </View> : null}
					    {this.state.historydata.length > 0 ? this.state.historydata.map((data,i) => {
							return  <View key={i} style={{flexDirection:'row',paddingTop:15,paddingLeft:15,}}>
								<View style={{width: 40, height: 40,borderRadius:20,backgroundColor:'#718DC1',alignItems:'center', justifyContent:'center'}}>
								   <Image source={this.state.imgsx[i]} style={{width: 40, height: 40,borderRadius:20,}} />
								</View>
								<View style={{flexDirection:'column',marginLeft:15,flex:1, borderBottomWidth:1,borderColor:'#ececec',paddingRight:15,paddingBottom:15,}}>
								   <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between',}}>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>{data.apply_name}</Text>
									  <Text allowFontScaling={false} adjustsFontSizeToFit={false}>{data.inserttime}</Text>
								   </View>
								   <Text style={{color:'#aaa',fontSize:14,flexWrap:'wrap',flex:1,paddingTop:5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.reply_text}
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
					      <View style={styles.card1}>
					          <TouchableOpacity onPress={this._lxr.bind(this,false)} style={{flex:1}}>
								  <View style={{flex:1,justifyContent:'center'}}>

											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>取消</Text>
											  </View>

								  </View>
							  </TouchableOpacity>
							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>审批</Text>

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
									  placeholder='请填写备注'
									  underlineColorAndroid={'transparent'}
									/>
							  </View>
							  {this.state.tjstatus ? <TouchableHighlight onPress={this.tijiao.bind(this)} underlayColor="rgba(82, 132, 216,0.7)" style={{marginLeft:10,marginRight:10,marginTop:40, borderWidth:1,borderColor:'#ececec',borderRadius:5,paddingTop:10,paddingBottom:10, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
					            <View style={{borderRadius:5, justifyContent:'center',alignItems:'center',}}>
					                <Text style={{fontSize:18, color:'#fff'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.tj}</Text>
					            </View>
					          </TouchableHighlight> : <TouchableHighlight  style={{marginLeft:10,marginRight:10,marginTop:40, borderWidth:1,borderColor:'#ececec',borderRadius:5,paddingTop:10,paddingBottom:10, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
					            <View style={{borderRadius:5, justifyContent:'center',alignItems:'center',}}>
					                <Text style={{fontSize:18, color:'#fff'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.tj}</Text>
					            </View>
					          </TouchableHighlight>}

							</ScrollView>
							{this.state.statu ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
							  <Icon name="ios-close-outline" color="#fff"size={36}  />
							  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.infos}</Text>
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
					      <View style={styles.card1}>
					          <TouchableOpacity onPress={this._lxrs.bind(this,false)} style={{flex:1}}>
								  <View style={{flex:1,justifyContent:'center'}}>

											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>取消</Text>
											  </View>

								  </View>
							  </TouchableOpacity>
							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>审批</Text>

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
									  placeholder='请填写备注'
									  underlineColorAndroid={'transparent'}
									/>
							  </View>
							  <View style={{backgroundColor:'#fff',marginTop:15,flexDirection:'column',paddingLeft:10,paddingTop:10,paddingBottom:10,}}>
                                 <View style={{flexDirection:'row',alignItems:'center'}}>
                                   <Text style={{fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>审批人</Text>
								   {this.state.isshowd ? <Text style={{fontSize:12,color:'#bbb',marginLeft:5}} allowFontScaling={false} adjustsFontSizeToFit={false}>(点击姓名可删除)</Text> : null}
								   {!this.state.isshowd ? <Text style={{fontSize:16,color:'#999',marginLeft:5}} allowFontScaling={false} adjustsFontSizeToFit={false}>-- {this.state.poepleName}</Text> : null}
                                 </View>
                                 {this.state.isshowd ? <View style={{marginTop:15,flexDirection:'row',alignItems:'center',}}>
                                     {this.state.poepleName != '' ? <TouchableOpacity onPress={this._delets.bind(this)} activeOpacity={1}><View style={{backgroundColor:'#60a9e8',paddingBottom:8,paddingTop:8,paddingLeft:10,paddingRight:10,marginRight:10,borderRadius:3}}>
                                        <Text style={{color:'#fff'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.poepleName}</Text>
                                     </View></TouchableOpacity> : null}
                                    <TouchableOpacity style={{width:46,height:46,marginTop:5,alignItems:'center',justifyContent:'center'}} onPress={this._xmodalpoeple.bind(this)}>

                                      <Icon name="ios-add-circle-outline" color="#ccc"size={46}  />

                                    </TouchableOpacity>
                                 </View> : null}
							  </View>
							  {this.state.tjstatus ? <TouchableHighlight onPress={this.tijiaos.bind(this)}  underlayColor="rgba(82, 132, 216,0.7)" style={{marginLeft:10,marginRight:10,marginTop:40, borderWidth:1,borderColor:'#ececec',borderRadius:5,paddingTop:10,paddingBottom:10, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
					            <View style={{borderRadius:5, justifyContent:'center',alignItems:'center',}}>
					                <Text style={{fontSize:18, color:'#fff'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.tj}</Text>
					            </View>
					          </TouchableHighlight> : <TouchableHighlight  style={{marginLeft:10,marginRight:10,marginTop:40, borderWidth:1,borderColor:'#ececec',borderRadius:5,paddingTop:10,paddingBottom:10, justifyContent:'center',alignItems:'center',backgroundColor:'#4385f4'}}>
					            <View style={{borderRadius:5, justifyContent:'center',alignItems:'center',}}>
					                <Text style={{fontSize:18, color:'#fff'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.tj}</Text>
					            </View>
					          </TouchableHighlight>}

							</ScrollView>
							{this.state.statur ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
							  <Icon name="ios-close-outline" color="#fff"size={36}  />
							  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.infos}</Text>
				            </Animated.View> : null}
							{this.state.shows ? <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'rgba(107, 107, 107, 0.43)',position:'absolute',top:0,left:0}}></View> : null}
              <Picker
               ref={picker => this.pickera = picker}
               style={{height: 250,backgroundColor:'#fff',}}
               pickerToolBarStyle={{height:45,}}
               pickerBtnStyle ={{fontSize:16,color:'#000',}}
               showDuration={300}
               pickerBtnText='确定'
               pickerCancelBtnText='取消'
               selectedValue={this.state.SHRS[0]}
               pickerData={this.state.SHRS}
               onPickerCancel={()=>{this.setState({shows:false});}}
               onPickerDone={(pickedValue) => {
                  this.setState({poepleName:pickedValue,shows:false});
                  this.state.SHR.forEach((data,i)=>{
                    if(data.name == pickedValue){
                    this.setState({shid:data.uid});
                    }
                  })
               }}
               />
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
					      <View style={styles.card1}>
					          <TouchableOpacity onPress={this._lmodalpoeple.bind(this,false)} style={{flex:1}}>
								  <View style={{flex:1,justifyContent:'center'}}>

											  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
													<Text style={{color:'white',fontSize:16,paddingLeft:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>取消</Text>
											  </View>

								  </View>
							  </TouchableOpacity>
							  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

										  <Text style={{color:'white',fontSize:16}} allowFontScaling={false} adjustsFontSizeToFit={false}>选择审批人</Text>

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
					  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.state.infos}</Text>
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
    paddingTop:20,
	backgroundColor:'#4385f4',
	flexDirection:'row'
  },
  card1: {
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
