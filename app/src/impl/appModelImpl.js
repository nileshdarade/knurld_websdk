/**
 * @author ndarade
 *
 */

var KnurldAppModelImpl = KnurldAppModelImpl || {};
/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldAppModelImpl.post = function(input, successCallback, errorCallBack,
  aPIExtraParams) {

  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  if (!KnurldSDKUtil.isValidObj(input)) {
    return KnurldResponse.invalidInputResponse(KnurldConstants.INVALID_INPUT,
      apiMetaData);
  }
  if (!KnurldSDKUtil.isValidObj(input.enrollmentRepeats)) {
    return KnurldResponse.invalidInputResponse('enrollmentRepeats',
      apiMetaData);
  }

  if (!KnurldSDKUtil.isValidObj(input.verificationLength)) {
    return KnurldResponse.invalidInputResponse('verificationLength',
      apiMetaData);
  }
  var url;

  apiMetaData.requestType = KnurldConstants.POST;
  var bodyParams = {};
  bodyParams.enrollmentRepeats = input.enrollmentRepeats;
  bodyParams.verificationLength = input.verificationLength;
  bodyParams.vocabulary = input.vocabulary;

  if (KnurldSDKUtil.isValidObj(input.appModelId)) {

    if (!KnurldSDKUtil.isValidObj(input.threshold)) {
      return KnurldResponse
        .invalidInputResponse('threshold', apiMetaData);
    }
    bodyParams.threshold = input.threshold;

    url = KnurldSDKUtil.buildUrl("app-models/" + input.appModelId,
      KnurldConstants.ISV1);
  } else {

    url = KnurldSDKUtil.buildUrl("app-models", KnurldConstants.ISV1);

    if (!KnurldSDKUtil.isValidObj(input.vocabulary)) {
      return KnurldResponse.invalidInputResponse('vocabulary',
        apiMetaData);
    }

    bodyParams.enrollmentRepeats = input.enrollmentRepeats;

    if (KnurldSDKUtil.isValidObj(input.threshold)) {
      bodyParams.threshold = input.threshold;
    }

    if (KnurldSDKUtil.isValidObj(input.autoThresholdEnable)) {
      bodyParams.autoThresholdEnable = input.autoThresholdEnable;
    }

    if (KnurldSDKUtil.isValidObj(input.autoThresholdClearance)) {
      bodyParams.autoThresholdClearance = input.autoThresholdClearance;
    }

    if (KnurldSDKUtil.isValidObj(input.autoThresholdMaxRise)) {
      bodyParams.autoThresholdMaxRise = input.autoThresholdMaxRise;
    }

    if (KnurldSDKUtil.isValidObj(input.useModelUpdate)) {
      bodyParams.useModelUpdate = input.useModelUpdate;
    }

    if (KnurldSDKUtil.isValidObj(input.modelUpdateDailyLimit)) {
      bodyParams.modelUpdateDailyLimit = input.modelUpdateDailyLimit;
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
KnurldAppModelImpl.get = function(input, successCallback, errorCallBack,
  aPIExtraParams) {

  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  var url;
  var bodyParams = {};
  if (KnurldSDKUtil.isValidObj(input.appModelId)) {
    url = KnurldSDKUtil.buildUrl("app-models/" + input.appModelId,
      KnurldConstants.ISV1);
  } else {
    if (KnurldSDKUtil.isValidObj(input.limit)) {
      bodyParams.limit = input.limit;
    }
    if (KnurldSDKUtil.isValidObj(input.offset)) {
      bodyParams.offset = input.offset;
    }
    url = KnurldSDKUtil.buildUrl("app-models", KnurldConstants.ISV1);
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
KnurldAppModelImpl.getAllInOneCall = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  var bodyParams = {};
  bodyParams.limit = 1000;
  bodyParams.offset = 0;
  var url = KnurldSDKUtil.buildUrl("app-models", KnurldConstants.ISV1);
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
KnurldAppModelImpl.getAll = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var aPIExtraParams = {};
  var _response = [];
  var failCount=0;
  KnurldAppModelImpl.get(input, function(response) {
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
          KnurldAppModelImpl.get(inputs, function(response){
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
KnurldAppModelImpl.del = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  if (!KnurldSDKUtil.isValidObj(input.appModelId)) {
    return KnurldResponse.invalidInputResponse('modelId',
      apiMetaData);
  }
  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  var url = KnurldSDKUtil.buildUrl("app-models/" + input.appModelId,
    KnurldConstants.ISV1);
  apiMetaData.requestType = KnurldConstants.DELETE;
  return KnurldHttpRequest.sendRequest(url, null, apiMetaData);
};
