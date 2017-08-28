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
	TextInput,
	ActivityIndicator,
	BackAndroid,
	Image
} from 'react-native';
import PassState from './PassState';
import Push from './Push';
import Icon from 'react-native-vector-icons/Ionicons';
import Token from './Token';

var dataImpor = [];
export default class Info extends Component {

    constructor(props) {
        super(props);
		super(props);
		this._pressButton = this._pressButton.bind(this);
		BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {
            datas:{},
			Status:'',
			stat:'暂无',
			product:[],
			zidan:[],
			zidan_id:'',
			historydata:[],
			imgs:[],
			loaded:false,
		};
    }

	componentDidMount() {
	  this.fetchDataa(Token.window.url + this.props.data.checkInfo.detail_url+ '&access_token=' + Token.window.token);
	  this.fetchDatab(Token.window.url + this.props.data.checkInfo.check_history_url+ '&access_token=' + Token.window.token);
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
					 that.setState({
						loaded:true,
						datas: result.data.info,
                        Status:	result.audit_status,
                        product: result.data.product.list,
                        zidan: result.data.product.zidan_id,
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
						var IMG =  {uri:Token.window.url + img.img.slice(1)}
						aa.push(IMG)
						that.setState({
							imgs: aa,
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
										<Text style={{color:'white',fontSize:18}} allowFontScaling={false}>审批</Text>
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
				     <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>操作人</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
								{this.state.datas.uname ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.datas.uname}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>来自</Text>
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
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>创建日期</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.state.datas.creat_time ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.datas.creat_time}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>

					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>订单号</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.state.datas.order_num ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									 {this.state.datas.order_num}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>金额</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.state.datas.count_price ?
							    <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									 {this.state.datas.count_price}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>客户</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.state.datas.gys ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									 {this.state.datas.gys}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View><View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>状态</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.state.Status ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.Status}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>备注</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.state.datas.mark ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									 {this.state.datas.mark}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>交货地址</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.state.datas.to_address ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									 {this.state.datas.to_address}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>订单类型</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.state.datas.ordercates ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									 {this.state.datas.ordercates}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>
					<View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,}}>
					    <Text style={{fontSize:16,color:'#666',}} allowFontScaling={false}>抹零金额</Text>
						<View  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>

							<View style={{flex:1,}}>
							    {this.state.datas.ml_price ? <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									 {this.state.datas.ml_price}
								</Text> : <Text style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}} allowFontScaling={false}>
									{this.state.stat}
								</Text>
								}
							</View>
						</View>
					</View>
					{this.state.product.length > 0 ? <View style={{marginTop:15,backgroundColor:'#fff',paddingLeft:10,borderBottomWidth:1,borderColor:'#dcdcdc',}}>
					    <View style={{flex:1,paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#dcdcdc',}}>
					        <Text style={{color:'#999',fontSize:16,}} allowFontScaling={false}>产品详情</Text>
						</View>
						{this.state.product.map((data, i) => {
							return  <View key={i} style={{borderBottomWidth:1,borderColor:'#dcdcdc',}}>
							<View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',height:30,}}>
								<Text style={{flex:1,}} allowFontScaling={false}>名称：{data.proName}</Text>
								<Text style={{flex:1,}} allowFontScaling={false}>销售价：{data.price}</Text>
							</View>
							<View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',height:30,}}>
								<Text style={{flex:1,}} allowFontScaling={false}>已出库：{data.intoStoreNum}</Text>
								<Text style={{flex:1,}} allowFontScaling={false}>销售数：{data.num}({data.sum}{data.unitName}/{data.relation})</Text>
							</View>
							<View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',height:30,}}>
								<Text style={{flex:1,}} allowFontScaling={false}>规格：{data.formatname}</Text>
							</View>
						</View>
						})}
					</View> : <View></View>
					}
					{this.state.zidan.length > 0 ? this.state.zidan.map((datas, i) => {
							return  <View key={i} style={{marginTop:15,backgroundColor:'#fff',paddingLeft:10,borderBottomWidth:1,borderColor:'#dcdcdc',}}>
					    <View style={{flex:1,paddingTop:10,paddingBottom:10,borderBottomWidth:1,borderColor:'#dcdcdc',}}>
					        <Text style={{color:'#999',fontSize:16,}} allowFontScaling={false}>{datas.default5}</Text>
						</View>
						{datas.data.map((data,i) => {
							return <View key={i} style={{borderBottomWidth:1,borderColor:'#dcdcdc',}}>
							<View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',height:30,}}>
								<Text style={{flex:1,}} allowFontScaling={false}>名称：{data.proName}</Text>
								<Text style={{flex:1,}} allowFontScaling={false}>销售价：{data.price}</Text>
							</View>
							<View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',height:30,}}>
								<Text style={{flex:1,}} allowFontScaling={false}>已出库：{data.intoStoreNum}</Text>
								<Text style={{flex:1,}} allowFontScaling={false}>销售数：{data.num}({data.sum}{data.unitName}/{data.relation})</Text>
							</View>
							<View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',height:30,}}>
								<Text style={{flex:1,}} allowFontScaling={false}>规格：{data.formatname}</Text>
							</View>
						</View>
						})}
						</View>
						}) : <View></View>
					}
					<View style={{marginTop:15,backgroundColor:'#fff',}}>
					    {this.state.historydata.length > 0 ? this.state.historydata.map((data,i) => {
							return  <View key={i} style={{paddingLeft:10,paddingRight:10,borderBottomWidth:1,borderColor:'#dcdcdc',flexDirection:'row',paddingTop:10,paddingBottom:10,}}>
							  <View style={{marginRight:15,width: 40, height: 40,borderRadius:20,backgroundColor:'#1ADA9A',alignItems:'center', justifyContent:'center'}}>
								   <Image source={this.state.imgs[i]} style={{width: 40, height: 40,borderRadius:20,}} />
							  </View>
							  <View style={{flex:1,flexDirection:'column',}}>
								   <View style={{flexDirection:'row',justifyContent:'space-between',}}>
									  <Text style={{fontSize:16,}} allowFontScaling={false}>{data.apply_name}</Text>
									  <Text style={{fontSize:14,color:'#bbb'}} allowFontScaling={false}>{data.inserttime}</Text>
								   </View>
								   <View style={{backgroundColor:'#fff', borderRadius:3,marginTop:5,}}>
									  <Text style={{flexWrap:'wrap', paddingRight:15,}} allowFontScaling={false}>{data.reply_text}</Text>
								   </View>
							  </View>
						</View>
						}) : <View></View>}

					</View>
				</ScrollView>}
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
    height:45,
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
