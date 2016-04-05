/**
 * @author ndarade
 *
 */

var KnurldVerificationImpl = KnurldVerificationImpl || {};
/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldVerificationImpl.post = function(input, successCallback, errorCallBack,
  aPIExtraParams) {

  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  if (!KnurldSDKUtil.isValidObj(input)) {
    return KnurldResponse.invalidInputResponse(KnurldConstants.INVALID_INPUT,
      apiMetaData);
  }

  var url;

  apiMetaData.requestType = KnurldConstants.POST;
  var bodyParams = {};

  if (KnurldSDKUtil.isValidObj(input.verificationId)) {

    url = KnurldSDKUtil.buildUrl("verifications/" + input.verificationId,
      KnurldConstants.ISV1);

    if (!KnurldSDKUtil.isValidObj(input.verificationUrl)) {
      return KnurldResponse.invalidInputResponse('verificationUrl',
        apiMetaData);
    }
    if (!KnurldSDKUtil.isValidObj(input.intervals)) {
      return KnurldResponse
        .invalidInputResponse('intervals', apiMetaData);
    }
    bodyParams["verification.wav"] = input.verificationUrl;
    bodyParams.intervals = input.intervals;

  } else {

    if (!KnurldSDKUtil.isValidObj(input.applicationId)) {
      return KnurldResponse
        .invalidInputResponse('applicationId', apiMetaData);
    }
    if (!KnurldSDKUtil.isValidObj(input.consumerId)) {
      return KnurldResponse
        .invalidInputResponse('consumerId', apiMetaData);
    }

    url = KnurldSDKUtil.buildUrl("verifications", KnurldConstants.ISV1);
    bodyParams.application = KnurldSDKUtil
      .buildApplicationIdUrl(input.applicationId);
    bodyParams.consumer = KnurldSDKUtil
      .buildConsumerIdUrl(input.consumerId);
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
KnurldVerificationImpl.get = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var bodyParams = {};
  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  var url;
  if (KnurldSDKUtil.isValidObj(input.verificationId)) {
    url = KnurldSDKUtil.buildUrl("verifications/" + input.verificationId,
      KnurldConstants.ISV1);
  } else {
    if (KnurldSDKUtil.isValidObj(input.limit)) {
      bodyParams.limit = input.limit;
    }
    if (KnurldSDKUtil.isValidObj(input.offset)) {
      bodyParams.offset = input.offset;
    }
    url = KnurldSDKUtil.buildUrl("verifications", KnurldConstants.ISV1);
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
KnurldVerificationImpl.getAll = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var aPIExtraParams = {};
  var _response = [];
  //aPIExtraParams.async = true;
  var failCount=0;
  KnurldVerificationImpl.get(input, function(response) {
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
          KnurldVerificationImpl.get(inputs, function(response){
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
KnurldVerificationImpl.del = function(input, successCallback, errorCallBack,
  aPIExtraParams) {

  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);

  if (!KnurldSDKUtil.isEmpty(input.verificationId)) {
    return KnurldResponse.invalidInputResponse('verificationId', apiMetaData);
  }

  var url = KnurldSDKUtil.buildUrl("verifications/" + input.verificationId,
    KnurldConstants.ISV1);

  apiMetaData.requestType = KnurldConstants.DELETE;

  return KnurldHttpRequest.sendRequest(url, null, apiMetaData);
};
