import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	ScrollView,
	Modal,
	CameraRoll,
	Animated,
	ActivityIndicator,
	InteractionManager,
	TextInput,
	ActionSheetIOS,
	Platform,
	Dimensions,
	BackAndroid,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import PassState from './PassState';
import Push from './Push';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import Gonggaob from './Gonggaob';
import Swipeable from 'react-native-swipeable';
import Toast from '@remobile/react-native-toast';
import CheckBox from 'react-native-check-box';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImagePicker from 'react-native-image-picker';
import panLook from './panLook';
import panainfosa from './panainfosa';
var array = [];
var dataImpor = [];
let aa=[];
var images = [];
var folder_str = [];
var file_str = [];
var folder_strs = [];
var file_strs = [];
var flog = false;
var flogs = false;
var BUTTONS = [
  '保存到相册',
  '取消',
];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;
export default class Newsb extends React.Component {

    constructor(props) {
        super(props);
        this._pressButton = this._pressButton.bind(this);
		BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
		  dataSource: new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		  }),
		  id: '',
		  widths: new Animated.Value(0),
		  uid:'',
		  datas:[],
		  imgs:[],
		  loaded: false,
		  isLoadMore:false,
		  p:1,
		  infos:'',
		  isReach:false,
		  isRefreshing:false,
		  isNull:false,
		  sx:false,
		  domain:'',
		  currentlyOpenSwipeable: null,
		  status:false,
		  tp:false,
		  bcimg:'',
		  bottoms: new Animated.Value(-110),
		  IDS:'',
		  type:'',
		  statust:'',
		  names:'',
		  downloadUrl:'',
		  add:false,
		  statusk:false,
		  textaera:'',
          isfalse:true,
		  checks:false,
		  isChecked:false,
		  imagest:true,
		  ischeck:true,
		  imguri:'',
		  avatarSource:'',
		  fileImg:'',
		  imagesshow:false,
		  IsImages:false,
	  };
    }

    componentDidMount() {
        //这里获取传递过来的参数: name
        this.setState({domain:data.data.domain})
		 array = [];
         aa=[];
		  this.timer = setTimeout(
			  () => {this.fetchData('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=lists&uid='+data.data.uid+'&folder_id='+this.props.dataID.id+'&isshareing=1&file_type=0&access_token=' + data.data.token + '');  },
			  500
			);
    }
	componentWillUnmount() {
	  this.timer && clearTimeout(this.timer);
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
	fetchData(url) {
		var that=this;
		fetch(url, {
				  method: 'GET',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  }
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 console.log(result)

					  if(result.data != null){
					   result.data.forEach((Data,i) => {
						   key={i}
						   array.push(Data);

					   })
					  }

					  if(result.count <= 10){

									   that.setState({
										   isReach:true,
										   isLoadMore:false,

									   })
								  }
					  if(result.data == null){
						  that.setState({
							   dataSource: that.state.dataSource.cloneWithRows(['暂无数据']),
							   loaded: true,
							   sx:false,
							   isLoadMore:false,
							   isNull:true,
						   })
					  }else if(array.length > Number(result.count)+Number(result.folders_count)){
						   that.setState({
							   isReach:true,
							   isLoadMore:false,
							   isNull:false,
						   })
					   }else{
						   that.setState({
							   datas:result.data,
							   dataSource: that.state.dataSource.cloneWithRows(array),
							   loaded: true,
							   sx:false,
							   isNull:false,
						   })
					   }

				})
				.catch((error) => {
					that.setState({
						   isRefreshing:false,
						   loaded: true,
						   sx:true,
                           isNull:false,
						   dataSource: that.state.dataSource.cloneWithRows(['加载失败，请下拉刷新']),

					   })

				  });


	}

    _quxiao(){
		folder_str = [];
        file_str = [];
		flog = false;
        flogs = false;
		this.setState({isfalse:true,checks:false,isChecked:false,ischeck:true,});
		this._Refresh();
		Animated.timing(
		   this.state.widths,
		   {toValue: 0},
		 ).start();
	}

    /* 新增文件夹 start */
	new_folder(){
		this.setState({statusk:true,add:false,});

	}
	_cancerk(){
		this.setState({
			statusk:false,
			textaera:'',
		})
	}
/* 消除空格  start */
   trim(str){
     return str.replace(/(^\s*)|(\s*$)/g, "");
   }
/* 消除空格  end */
	_yesk(){
		if(this.trim(this.state.textaera) == ''){
			Toast.showShortBottom("名称不能为空");
			return false;
		}else{
			this.addFech('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=create_folder&name='+this.state.textaera+'&uid='+data.data.uid+'&folder_id='+this.props.dataID.id+'&access_token=' + data.data.token + '')
		    this.setState({
				statusk:false,
			})
		}

	}

	addFech(url){
		var that = this;
		this.setState({textaera:''});
		fetch(url, {
				  method: 'GET',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  }
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 Toast.showShortBottom("创建成功")

					 that._Refresh();
				})
				.catch((error) => {
					Toast.showShortBottom("创建失败")

				});
	}

    /*  全选  start */
	_allselect(){
		folder_str = folder_strs;
        file_str = file_strs;
		flog = true;
        flogs = true;
		this.setState({isChecked:true,ischeck:false,})
		this._Refresh();
		console.log(folder_str);
		console.log(file_str);
	}

	/*  全选  end */
	/*  全不选  start */
	_allnoselect(){
		folder_str = [];
        file_str = [];
		flog = false;
        flogs = false;
		this.setState({isChecked:false,ischeck:true,})
		this._Refresh();

	}

	/*  全不选  end */

	allDeletes(){
		this.setState({isfalse:true,checks:false,isChecked:false,ischeck:true,});
		Animated.timing(
		   this.state.widths,
		   {toValue: 0},
		 ).start();
		if(folder_str.length>0 && file_str.length>0){
		    console.log(folder_str.join(','))
			console.log(file_str.join(','))
			this.deleteFech('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=delete&uid='+data.data.uid+'&folder_str='+folder_str.join(',')+'&file_str='+file_str.join(',')+'&access_token=' + data.data.token + '');
		}else if(folder_str.length == 0 && file_str.length>0){
			this.deleteFech('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=delete&uid='+data.data.uid+'&file_str='+file_str.join(',')+'&access_token=' + data.data.token + '');
		}else if(folder_str.length > 0 && file_str.length == 0){
			this.deleteFech('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=delete&uid='+data.data.uid+'&folder_str='+folder_str.join(',')+'&access_token=' + data.data.token + '');
		}else if(folder_str.length == 0 && file_str.length == 0){
			return false;
		}
	}

	/* 新增文件夹 end */

	_add(){
		this.setState({add:!this.state.add,})
	}

	_adds(){
		this.setState({add:false,})
	}

	_Tj(){
		this.setState({add:false,isfalse:false,checks:true,});
		Animated.timing(
		   this.state.widths,
		   {toValue: 50},
		 ).start();
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



    selectPhotoTapped() {
	    const options = {
	      quality: 1.0,
	      maxWidth: 500,
	      maxHeight: 500,
	      storageOptions: {
	        skipBackup: true
	      }
	    };

	    ImagePicker.showImagePicker(options, (response) => {
	      console.log('Response = ', response);

	      if (response.didCancel) {
	        console.log('User cancelled photo picker');
	        this.setState({IsImages:false,})
	      }
	      else if (response.error) {
	        console.log('ImagePicker Error: ', response.error);
	      }
	      else if (response.customButton) {
	        console.log('User tapped custom button: ', response.customButton);
	      }
	      else {
	        var source;

	        if (Platform.OS === 'android') {
	          source = {uri: response.uri, isStatic: true};
	        } else {
	          source = {uri: response.uri.replace('file://', ''), isStatic: true};
	        }
	        console.log(response)

	        this.setState({
	          imguri:response.uri,
	          avatarSource: source,
			  fileImg:response,
			  IsImages:true,
	        });
	      }
	    });
  }

  imgcancel(){
  	  this.setState({IsImages:false,})
  }

    /*  单个文档删除  start */
	deleteFech(url){
		var that = this;
		fetch(url, {
				  method: 'GET',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  }
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 console.log(result);
					if(result.status == 'success'){
						Toast.showShortBottom("删除成功")
					}else{
						Toast.showShortBottom("删除失败")
					}
					folder_str = [];
					file_str = [];
					flog = false;
					flogs = false;
					that._Refresh();

				})
				.catch((error) => {
					Toast.showShortBottom("删除失败")
				});
	}
    deletes(data){
		if(this.state.currentlyOpenSwipeable) {
		  this.state.currentlyOpenSwipeable.recenter();
		}
		this.setState({
			status:true,
			IDS:data.id,
			type:data.type,
		})
	}
	_Yes(){
		if(this.state.type == 'folder'){
			this.deleteFech('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=delete&uid='+data.data.uid+'&folder_str='+this.state.IDS+'&access_token=' + data.data.token + '');
		}else{
			this.deleteFech('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=delete&uid='+data.data.uid+'&file_str='+this.state.IDS+'&access_token=' + data.data.token + '');
		}

		this.setState({
			status:false,
		})
	}
	/*  单个文档删除  end */


	 handleScroll(){
		if(this.state.currentlyOpenSwipeable) {
		  this.state.currentlyOpenSwipeable.recenter();
		}
	};

	_cancer(){
		this.setState({
			status:false,
		})
	}
	_cancers(){
		this.setState({
			statust:false,
		})
	}
 /*文件上传  start*/
	_uploads(){
		var that = this;
		this.setState({IsImages:false,});
		var type = this.state.imguri.split(".")[this.state.imguri.split(".").length-1];
        var types = new Date().getTime()+'.'+type;
        let formData = new FormData();
        var file = {uri: this.state.imguri, type: 'multipart/form-data', name: types};
        formData.append("file",file);
        fetch('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=uploadify&uid='+data.data.uid+'&fid='+this.props.dataID.id+'&access_token=' + data.data.token + '', {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body:formData,
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
                    console.log(result)
                    Toast.showShortBottom("上传成功");
                    that._Refresh();
				})
				.catch((error) => {
					Toast.showShortBottom("上传失败");
					  console.log(error)
				});

	}

 /*文件上传  end*/
    render() {
          if(!this.state.loaded){
		  return (
		     <View style={{flex:1,backgroundColor:'#fff'}}>
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
											<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.dataID.name}</Text>
								</View>
					  </View>
					  <View style={{flex:1,justifyContent:'flex-end',alignItems:'center', flexDirection:'row'}}>

					  </View>
			      </View>
		          <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-110,width:Dimensions.get('window').width}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
					</View>
				   </View>
			</View>
		  )
		}
		return(
		<View style={{flex:1,backgroundColor:'#fff'}}>
		{this.state.isfalse ? <View style={styles.card}>
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
											<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>{this.props.dataID.name}</Text>
								</View>
					  </View>
					  <View style={{flex:1,justifyContent:'flex-end',alignItems:'center', flexDirection:'row'}}>

					  </View>
			  </View> : <View style={styles.card}>
					  <View style={{flex:1,justifyContent:'center'}}>
								 <TouchableOpacity onPress={this._quxiao.bind(this)}>
									  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',paddingLeft:15,}}>
											<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>取消</Text>
									  </View>
								</TouchableOpacity>
					  </View>
					  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
								<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
											<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>个人网盘</Text>
								</View>
					  </View>
					  <View style={{flex:1,justifyContent:'flex-end',alignItems:'center', flexDirection:'row'}}>


						   {this.state.ischeck ? <View style={{paddingRight:5,}}>

									<CheckBox
										 style={{width:40, alignItems:'center',justifyContent:'center'}}
										 onClick={this._allselect.bind(this)}
										 isChecked={this.state.isChecked}
										 leftTextStyle={{color:'#fff',width:40,fontSize:16}}
										 leftText={'全选'}
										 checkedImage={<Image source={require('./imgs/enabled.png')} style={{width:0,height:0}}/>}
										 unCheckedImage={<Image source={require('./imgs/disabled.png')} style={{width:0,height:0}}/>}
								   />
							  </View> : <View style={{paddingRight:5,}}>

									<CheckBox
										 style={{width:50, alignItems:'center',justifyContent:'center'}}
										 onClick={this._allnoselect.bind(this)}
										 isChecked={this.state.isChecked}
										 leftTextStyle={{color:'#fff',width:50,fontSize:16}}
										 leftText={'全不选'}
										 checkedImage={<Image source={require('./imgs/enabled.png')} style={{width:0,height:0}}/>}
										 unCheckedImage={<Image source={require('./imgs/disabled.png')} style={{width:0,height:0}}/>}
								   />
			                   </View>}

					  </View>
			 </View>}
		 <ListView
		    onScroll={this.handleScroll.bind(this)}
			dataSource={this.state.dataSource}
			renderRow={this.renderMovie.bind(this)}
			refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this) }
                colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
				progressBackgroundColor="#ffffff"
                />
            }
		  />
		  {!this.state.isfalse ? <TouchableHighlight underlayColor='transparent' activeOpacity ={0.9} onPress={this.allDeletes.bind(this)}><View style={{width:Dimensions.get('window').width,height:50,backgroundColor:'#ddd',borderTopWidth:1,borderColor:'#ddd',alignItems:'center',justifyContent:'center'}}>
			     <Text style={{fontSize:18,color:'#ff0a0a'}} allowFontScaling={false} adjustsFontSizeToFit={false}>删除</Text>
			  </View></TouchableHighlight> : null}
		  {this.state.status ? <View style={{backgroundColor:'rgba(119, 119, 119, 0.51)',position:'absolute',width:(Dimensions.get('window').width),height:(Dimensions.get('window').height),top:0,left:0}}><View style={{position:'absolute',backgroundColor:'#fff',width:260,height:150,top:(Dimensions.get('window').height-230)/2,left:(Dimensions.get('window').width-260)/2,borderRadius:5,overflow:'hidden'}}>
					 <View  style={{height:40,alignItems:'center',justifyContent:'center',flexDirection:'row', }}>
					 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,color:'#000'}}>删除此文件？</Text>
					 </View>
					 <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec'}}>
						 <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,}}>该文件将从网盘里彻底删除</Text>
					 </View>
					 <View style={{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:'#ececec',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
						<TouchableOpacity onPress={this._cancer.bind(this)} style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomLeftRadius:5,backgroundColor:'#fff'}}>
						 <View ><Text allowFontScaling={false} adjustsFontSizeToFit={false}style={{color:'#4385f4',fontSize:16}}>取消</Text></View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this._Yes.bind(this)}  style={{flex:1, alignItems:'center',justifyContent:'center', borderBottomRightRadius:5,marginLeft:1,backgroundColor:'#fff'}}>
						 <View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:16}}>确定</Text></View>
						</TouchableOpacity>
					 </View>
			 </View></View> : null}
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
			{this.state.add ? <TouchableOpacity onPress={this._adds.bind(this)}  style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,position:'absolute',top:0,left:0,}}><View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'rgba(61, 61, 62, 0.3)',position:'absolute',top:0,left:0,}}></View></TouchableOpacity> : <View></View>}
					{this.state.add ? <View style={{position:'absolute',top:55,right:5,flexDirection:'column',width:120,height:100,}}>
				   <View style={{width:120,height:90,backgroundColor:'#fff',borderRadius:5,flexDirection:'column',alignItems:'center',marginTop:10,}}>
						 <TouchableOpacity  onPress={this._Tj.bind(this)}>
						   <View style={{borderBottomWidth:1,borderColor:'#ccc',width:120,alignItems:'center',height:45,flexDirection:'row',paddingLeft:10,}}>
							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:10,fontSize:16,}}>多选</Text>
						   </View>
						 </TouchableOpacity>
						 <TouchableOpacity onPress={this.new_folder.bind(this)}>
						   <View style={{width:120,alignItems:'center',height:45,flexDirection:'row',paddingLeft:10,}}>

							  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{marginLeft:10,fontSize:16,}}>新建文件夹</Text>
						   </View>
						 </TouchableOpacity>
					   </View>
					   <View style={{position:'absolute',top:-8,right:13,backgroundColor:'transparent'}}><Icon name="md-arrow-dropup" color="#fff"size={30}  /></View>
				   </View> : <View></View>}

			{this.state.statusk ? <View style={{backgroundColor:'rgba(119, 119, 119, 0.51)',position:'absolute',width:(Dimensions.get('window').width),height:(Dimensions.get('window').height),top:0,left:0}}><View style={{position:'absolute',backgroundColor:'#fff',width:260,height:150,top:(Dimensions.get('window').height-230)/2,left:(Dimensions.get('window').width-260)/2,borderRadius:5,overflow:'hidden'}}>
					 <View  style={{height:40,alignItems:'center',justifyContent:'center',flexDirection:'row', }}>
					   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,color:'#000'}}>文件夹名称</Text>
					 </View>
					 <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',}}>
						<TextInput
						  onChangeText={(textaera) => this.setState({textaera})}
						  numberOfLines={1}
						  multiline = {false}
						  placeholderTextColor={'#999'}
						  style={{ color:'#666',fontSize:14,width:230,borderWidth:1,marginLeft:15,borderColor:'#ccc',height:35,textAlignVertical:'bottom',padding: 0,paddingLeft:5,borderRadius:3}}
						  placeholder='文件夹名称'
						  underlineColorAndroid={'transparent'}
						/>
					 </View>
					 <View style={{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:'#ececec',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
						<TouchableOpacity onPress={this._cancerk.bind(this)} style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomLeftRadius:5,backgroundColor:'#fff'}}>
						 <View ><Text allowFontScaling={false} adjustsFontSizeToFit={false}style={{color:'#4385f4',fontSize:16}}>取消</Text></View>
						</TouchableOpacity>
						<TouchableOpacity  onPress={this._yesk.bind(this)}  style={{flex:1, alignItems:'center',justifyContent:'center', borderBottomRightRadius:5,marginLeft:1,backgroundColor:'#fff'}}>
						 <View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:16}}>确定</Text></View>
						</TouchableOpacity>
					 </View>
			 </View></View> : null}

			{this.state.IsImages ? <View style={{backgroundColor:'rgba(119, 119, 119, 0.51)',position:'absolute',width:(Dimensions.get('window').width),height:(Dimensions.get('window').height),top:0,left:0}}><View style={{position:'absolute',backgroundColor:'#fff',width:260,height:200,top:(Dimensions.get('window').height-230)/2,left:(Dimensions.get('window').width-260)/2,borderRadius:5,overflow:'hidden'}}>

					 <View style={{flex:1,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',}}>
						 <Image source={{uri:this.state.imguri}} style={{width: 260, height: 150,}} />
					 </View>
					 <View style={{flexDirection:'row',justifyContent:'space-between',height:50,backgroundColor:'#ececec',borderBottomLeftRadius:5,borderBottomRightRadius:5}}>
						<TouchableOpacity onPress={this.imgcancel.bind(this)} style={{flex:1,alignItems:'center',justifyContent:'center',borderBottomLeftRadius:5,backgroundColor:'#fff'}}>
						 <View ><Text allowFontScaling={false} adjustsFontSizeToFit={false}style={{color:'#4385f4',fontSize:16}}>取消</Text></View>
						</TouchableOpacity>
						<TouchableOpacity  onPress={this._uploads.bind(this)}  style={{flex:1, alignItems:'center',justifyContent:'center', borderBottomRightRadius:5,marginLeft:1,backgroundColor:'#fff'}}>
						 <View><Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#4385f4',fontSize:16}}>上传</Text></View>
						</TouchableOpacity>
					 </View>
			 </View></View> : null}
       <Push navigator = {this.props.navigator} {...this.props}/>
       <PassState navigator = {this.props.navigator} {...this.props}/>
		  </View>
		)

    }

imgAll(img){
	var ims={url:img};
	images=[];
	images.push(ims)
	this.setState({tp:true,bcimg:img})
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


  looks(data){
		if(this.state.currentlyOpenSwipeable) {
		  this.state.currentlyOpenSwipeable.recenter();
		  this.setState({currentlyOpenSwipeable: null})
		}else{
			var { navigator } = this.props;
			if(navigator) {
				InteractionManager.runAfterInteractions(() => {
					navigator.push({
						name: 'panLook',
						component: panLook,
						params: {
							data: data
						}
					})
				})
			}
		}
	}


   files_k(data){
    	if(this.state.currentlyOpenSwipeable) {
		  this.state.currentlyOpenSwipeable.recenter();
		  this.setState({currentlyOpenSwipeable: null})
		}else{
			var { navigator } = this.props;
			if(navigator) {
				InteractionManager.runAfterInteractions(() => {
					navigator.push({
						name: 'panainfosa',
						component: panainfosa,
						params: {
							dataID: data
						}
					})
				})
			}
		}
    }


	_check(data){
		if(!flog){
			file_str.push(data.id);
			flog = true;
		}else{
			for(var i in file_str){
				if(file_str[i] == data.id){
					file_str.splice(i,1);
					if(file_str.length == 0){
						flog = false;
					}
				}else{
					if(i == file_str.length-1){
						file_str.push(data.id);
					}
				}
			}
		}
	}

	_checks(data){
		if(!flogs){
			folder_str.push(data.id);
			flogs = true;
			console.log(folder_str)
		}else{
			for(var i in folder_str){
				if(folder_str[i] == data.id){
					folder_str.splice(i,1);
					console.log(folder_str)
					if(folder_str.length == 0){
						flogs = false;
					}
				}else{
					if(i == folder_str.length-1){
						folder_str.push(data.id);
						console.log(folder_str)
					}
				}
			}
		}
	}


	onOpen(event,gestureState,swipeable){
		const {currentlyOpenSwipeable} = this.state;
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }

        this.setState({currentlyOpenSwipeable: swipeable});
      }
	onClose(){this.setState({currentlyOpenSwipeable: null})}




	 renderMovie(data,sectionID: number, rowID: number) {
		if(this.state.sx){
			return(
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-170,}}>
				    <Icon name="ios-sad-outline" color="#ccc"size={70}  />
				    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>{data}</Text>
				</View>
			)
		}
        else if(this.state.isNull){
			return (
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-170,}}>
				    <Icon name="ios-folder-outline" color="#ccc"size={70}  />
				    <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:18,}}>{data}</Text>
				</View>
			)
		}
		else{
			if(data.icon){
			return (
			<View style={{flexDirection:'row'}}>
			  <Animated.View style={{width:this.state.widths,alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
			    <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
				   <CheckBox
						 style={{width:50, alignItems:'center',justifyContent:'center'}}
						 onClick={this._checks.bind(this,data)}
						 isChecked={this.state.isChecked}
						 leftText={''}
						 checkedImage={<Image source={require('./imgs/enabled.png')} style={{width:30,height:30}}/>}
                         unCheckedImage={<Image source={require('./imgs/disabled.png')} style={{width:30,height:30}}/>}
				  />
				</View>
			  </Animated.View>
			  <View style={{width:(Dimensions.get('window').width)}}>
			  <Swipeable rightActionActivationDistance={75} onRightButtonsOpenRelease={this.onOpen.bind(this)} onRightButtonsCloseRelease={this.onClose.bind(this)}


				>
				<TouchableHighlight underlayColor='#ddd' onPress={this.files_k.bind(this,data)}>
					<View style={{alignItems:'center',flexDirection:'row'}}>
						<View style={{paddingLeft:10}}>
						   <Image source={require('./imgs/folder.png')} style={{width: 36, height: 36,}} />
						</View>
						<View style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderColor:'#ddd',marginLeft:10,paddingTop:10,paddingBottom:10,paddingRight:10,justifyContent:'space-between',alignItems:'center'}}>
						   <View style={{flexDirection:'column',}}>
								<Text allowFontScaling={false} adjustsFontSizeToFit={false}>
									{data.name}
								</Text>
								<Text style={{fontSize:12,color:'#aaa'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.inputtime}   {data.size}</Text>
						   </View>
						   <View style={{alignItems:'center'}}>
							  <Image source={require('./imgs/right.png')} style={{width: 14, height: 14,}} />
						   </View>
						</View>
					</View>
				</TouchableHighlight>
			 </Swipeable>
			 </View>
			</View>
			)
		  }else if(data.file_extension == 1){
			  return (
			  <View style={{flexDirection:'row'}}>
			  <Animated.View style={{width:this.state.widths,alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
			    <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
				   <CheckBox
						 style={{width:50, alignItems:'center',justifyContent:'center'}}
						 onClick={this._check.bind(this,data)}
						 isChecked={this.state.isChecked}
						 leftText={''}
						 checkedImage={<Image source={require('./imgs/enabled.png')} style={{width:30,height:30}}/>}
                         unCheckedImage={<Image source={require('./imgs/disabled.png')} style={{width:30,height:30}}/>}
				  />
				</View>
			  </Animated.View>
			  <View style={{width:(Dimensions.get('window').width)}}>
			  <Swipeable  rightButtonWidth={75} onRightButtonsOpenRelease={this.onOpen.bind(this)} onRightButtonsCloseRelease={this.onClose.bind(this)}
				>
				<TouchableHighlight underlayColor='#ddd' onPress={this.imgAll.bind(this,this.state.domain.slice(0,-6)+data.preview_url.slice(1))}>
					<View style={{alignItems:'center',flexDirection:'row'}}>
						<View style={{paddingLeft:10}}>
						   <Image source={{uri:this.state.domain.slice(0,-6)+data.imgUrl.slice(1)}} style={{width: 36, height: 36,}} />
						</View>
						<View style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderColor:'#ddd',marginLeft:10,paddingTop:10,paddingBottom:10,paddingRight:10,justifyContent:'space-between',alignItems:'center'}}>
						   <View style={{flexDirection:'column',flex:1}}>
								<Text allowFontScaling={false} adjustsFontSizeToFit={false}>
									{decodeURI(data.name)}
								</Text>
								<Text style={{fontSize:12,color:'#aaa'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.inputtime}   {data.size}</Text>
						   </View>
						   <View style={{alignItems:'center'}}>
							  <Image source={require('./imgs/right.png')} style={{width: 14, height: 14,}} />
						   </View>
						</View>
					</View>
                </TouchableHighlight>
			 </Swipeable>
			 </View>
			</View>
			)
		  }else{
			  return (
			  <View style={{flexDirection:'row'}}>
			  <Animated.View style={{width:this.state.widths,alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
			    <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
				   <CheckBox
						 style={{width:50, alignItems:'center',justifyContent:'center'}}
						 onClick={this._check.bind(this,data)}
						 isChecked={this.state.isChecked}
						 leftText={''}
						 checkedImage={<Image source={require('./imgs/enabled.png')} style={{width:30,height:30}}/>}
                         unCheckedImage={<Image source={require('./imgs/disabled.png')} style={{width:30,height:30}}/>}
				  />
				</View>
			  </Animated.View>
			  <View style={{width:(Dimensions.get('window').width)}}>
			  <Swipeable rightActionActivationDistance={75}  onRightButtonsOpenRelease={this.onOpen.bind(this)} onRightButtonsCloseRelease={this.onClose.bind(this)}
				>
				<TouchableHighlight underlayColor='#ddd' onPress={this.looks.bind(this,data)}>
					<View style={{alignItems:'center',flexDirection:'row'}}>
						<View style={{paddingLeft:10}}>
						   <Image source={{uri:this.state.domain.slice(0,-6)+data.file_extension_icon.slice(1)}} style={{width: 36, height: 36,}} />
						</View>
						<View style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderColor:'#ddd',marginLeft:10,paddingTop:10,paddingBottom:10,paddingRight:10,justifyContent:'space-between',alignItems:'center'}}>
						   <View style={{flexDirection:'column',flex:1}}>
								<Text allowFontScaling={false} adjustsFontSizeToFit={false}>
									{decodeURI(data.name)}
								</Text>
								<Text style={{fontSize:12,color:'#aaa'}} allowFontScaling={false} adjustsFontSizeToFit={false}>{data.inputtime}   {data.size}</Text>
						   </View>
						   <View style={{alignItems:'center'}}>
							  <Image source={require('./imgs/right.png')} style={{width: 14, height: 14,}} />
						   </View>
						</View>
					</View>
				</TouchableHighlight>
			 </Swipeable>
			 </View>
			</View>
			)
		  }
        }
	  }



	  _onRefresh() {
		 this.setState({
			   isRefreshing:true,
               p:1,
		  })
		  var that=this
		  this.fresh();
	  }


	   _Refresh() {
		 this.setState({
			   isRefreshing:false,
               p:1,
		  })
		 var that=this
		 this.fresh();
	  }

	  fresh(){
		  var that=this;
		  fetch('' + data.data.domain + '/index.php?app=Wangpan&m=MobileApi&a=lists&uid='+data.data.uid+'&folder_id='+this.props.dataID.id+'&isshareing=1&file_type=0&access_token=' + data.data.token + '', {
						  method: 'POST',
						  headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
						  }
						})
						.then(function (response) {
							return response.json();
						})
						.then(function (result) {
							  folder_strs = [];
							  file_strs = [];
							  array=[];
							  array.length = 0;

							   if(result.data != null){
								   result.data.forEach((Data,i) => {
									   key={i}
									   array.push(Data);
									   if(Data.icon){
										   folder_strs.push(Data.id);
									   }else{
										   file_strs.push(Data.id);
									   }

								   })
								  }
							      if(result.count <= 10){
									   that.setState({
										   isReach:true,
										   isLoadMore:false,

									   })
								  }
								  if(result.data == null){
								  that.setState({
										   dataSource: that.state.dataSource.cloneWithRows(['暂无数据']),
										   loaded: true,
										   sx:false,
										   isLoadMore:false,
										   isRefreshing:false,
										   isReach:true,
										   isNull:true,
									   })
								  }else if(array.length > Number(result.count)+Number(result.folders_count)){

									   that.setState({
										   isReach:true,
										   isLoadMore:false,
										   isNull:false,
									   })
								   }else{
									   that.setState({
										   imgs: aa,
										   dataSource: that.state.dataSource.cloneWithRows(array),
										   loaded: true,
										   sx:false,
										   isRefreshing:false,
										   isNull:false,
									   })

								   }
							   console.log(result)

						})
			            .catch((error) => {
					that.setState({

						   loaded: true,
						   sx:true,
						   isReach:true,
                           isRefreshing:false,
						   dataSource: that.state.dataSource.cloneWithRows(['加载失败，请下拉刷新']),

					   })

				  });
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
