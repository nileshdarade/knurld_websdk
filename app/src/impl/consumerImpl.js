/**
 * @author ndarade
 *
 */
/**
 * [KnurldConsumerImpl description]
 * @type {[type]}
 */
var KnurldConsumerImpl = KnurldConsumerImpl || {};
/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldConsumerImpl.post = function(input, successCallback, errorCallBack,
  aPIExtraParams) {

  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  if (!KnurldSDKUtil.isValidObj(input)) {
    return KnurldResponse.invalidInputResponse(KnurldConstants.INVALID_INPUT,
      apiMetaData);
  }
  if (!KnurldSDKUtil.isValidObj(input.password)) {
    return KnurldResponse.invalidInputResponse('password',
      apiMetaData);
  }
  var url;
  apiMetaData.requestType = KnurldConstants.POST;
  var bodyParams = {};

  bodyParams.password = input.password;

  if (KnurldSDKUtil.isValidObj(input.consumerId)) {
    url = KnurldSDKUtil.buildUrl("consumers/" + input.consumerId,
      KnurldConstants.ISV1);
  } else {
    url = KnurldSDKUtil.buildUrl("consumers", KnurldConstants.ISV1);
    if (!KnurldSDKUtil.isEmpty(input.Gender)) {
      return KnurldResponse.invalidInputResponse('Gender',
        apiMetaData);
    }
    if (!KnurldSDKUtil.isValidObj(input.username)) {
      return KnurldResponse.invalidInputResponse('username',
        apiMetaData);
    }

    bodyParams.gender = input.Gender;
    bodyParams.username = input.username;
  }
  return KnurldHttpRequest.sendRequest(url, bodyParams, apiMetaData);
};
/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldConsumerImpl.get = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var bodyParams = {};
  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  var url;
  if (KnurldSDKUtil.isValidObj(input.consumerId)) {
    url = KnurldSDKUtil.buildUrl("consumers/" + input.consumerId,
      KnurldConstants.ISV1);
  } else {
    url = KnurldSDKUtil.buildUrl("consumers", KnurldConstants.ISV1);
    if (KnurldSDKUtil.isValidObj(input.limit)) {
      bodyParams.limit = input.limit;
    }
    if (KnurldSDKUtil.isValidObj(input.offset)) {
      bodyParams.offset = input.offset;
    }
  }
  return KnurldHttpRequest.sendRequest(url, bodyParams, apiMetaData);
};

/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldConsumerImpl.getAll = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var aPIExtraParams = {};
  var _response = [];
  //aPIExtraParams.async = true;
  var failCount=0;
  KnurldConsumerImpl.get(input, function(response) {
    if(KnurldSDKUtil.isValidObj(response)){
      if(response.length<=10){
        successCallback(response);
      }else{
        var items=response.items;
        for(var key in items){
          _response[_response.length]=items[key];
        }
        for(i=10;i<response.total;i+=KnurldConstants.FETCH_ALL_OFFSET){
          var inputs={};
          inputs.limit=KnurldConstants.FETCH_ALL_OFFSET;
          inputs.offset=i;
          KnurldConsumerImpl.get(inputs, function(response){
            var items=response.items;
            for(var key in items){
              _response[_response.length]=items[key];
            }
            if(_response.length>=(response.total-failCount*KnurldConstants.FETCH_ALL_OFFSET)){
              successCallback(_response);
            }
          }, function(response){
            console.log(response);
            failCount++;
          }, aPIExtraParams);
        }
      }
    }
  }, function(response) {
    errorCallBack(response);
  }, aPIExtraParams);
};

/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldConsumerImpl.getAllInOneCall = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,successCallback, errorCallBack);
  var bodyParams = {};
  bodyParams.limit = 1000;
  bodyParams.offset = 0;
  var url = KnurldSDKUtil.buildUrl("consumers", KnurldConstants.ISV1);
  return KnurldHttpRequest.sendRequest(url, bodyParams, apiMetaData);
};

/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldConsumerImpl.del = function(input, successCallback, errorCallBack,
  aPIExtraParams) {

  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);

  if (!KnurldSDKUtil.isValidObj(input.consumerId)) {
    return KnurldResponse.invalidInputResponse('consumerId',
      apiMetaData);
  }
  var url = KnurldSDKUtil.buildUrl("consumers/" + input.consumerId,
    KnurldConstants.ISV1);
  apiMetaData.requestType = KnurldConstants.DELETE;
  return KnurldHttpRequest.sendRequest(url, null, apiMetaData);
};

/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldConsumerImpl.token = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  apiMetaData.forceAdmin=true;
  apiMetaData.localSuccessHandler = KnurldConsumerImpl.catchAccessTokenSuccessCallBack;

  if (!KnurldSDKUtil.isValidObj(input.username)) {
    return KnurldResponse.invalidInputResponse('username',
      apiMetaData);
  }
  if (!KnurldSDKUtil.isValidObj(input.password)) {
    return KnurldResponse.invalidInputResponse('password',
      apiMetaData);
  }
  var url = KnurldSDKUtil.buildUrl("consumers/token",
    KnurldConstants.ISV1);
  var bodyParams = {};
  apiMetaData.requestType = KnurldConstants.POST;
  bodyParams.username = input.username;
  bodyParams.password = input.password;
  return KnurldHttpRequest.sendRequest(url, bodyParams, apiMetaData);
};

/**
 * [function description]
 * @param  {[type]} resp     [description]
 * @param  {[type]} callBack [description]
 * @return {[type]}          [description]
 */
KnurldConsumerImpl.catchAccessTokenSuccessCallBack = function(resp, callBack) {
  KnurldSDK.setConsumerDevID("Bearer: "+resp.token);
	callBack(resp);
};
