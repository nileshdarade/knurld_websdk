/**
 * @author ndarade
 *
 */

var KnurldAnalysisImpl = KnurldAnalysisImpl || {};
/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldAnalysisImpl.get = function(input, successCallback, errorCallBack,
  aPIExtraParams) {

  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  if (!KnurldSDKUtil.isValidObj(input)) {
    return KnurldResponse.invalidInputResponse(KnurldConstants.INVALID_INPUT,
      apiMetaData);
  }
  if (!KnurldSDKUtil.isValidObj(input.id)) {
    return KnurldResponse.invalidInputResponse('id', apiMetaData);
  }
  var url = KnurldSDKUtil.buildUrl("endpointAnalysis/" + input.id,
    KnurldConstants.ISV1);

  return KnurldHttpRequest.sendRequest(url, null, apiMetaData);
};
/**2
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldAnalysisImpl.file = function(input, successCallback, errorCallBack,
  aPIExtraParams) {


  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);

  if (!KnurldSDKUtil.isValidObj(input)) {
    return KnurldResponse.invalidInputResponse(KnurldConstants.INVALID_INPUT,
      apiMetaData);
  }
  /*if (!KnurldSDKUtil.isEmpty(input.fileData)) {
    return KnurldResponse.invalidInputResponse('fileData', apiMetaData);
  }*/
  var bodyParams = {};

  if (KnurldSDKUtil.isValidObj(input.num_words)) {
    bodyParams.num_words = input.num_words;
  }
  bodyParams.fileData = input.fileData;
  apiMetaData.requestType = KnurldConstants.POST;

  var url = KnurldSDKUtil.buildUrl("endpointAnalysis/file",
    KnurldConstants.ISV1);
    apiMetaData.contentType=KnurldConstants.CONTENT_TYPE_MULTIPART_FORM_DATA;

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
KnurldAnalysisImpl.url = function(input, successCallback, errorCallBack,
  aPIExtraParams) {

  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);

  if (!KnurldSDKUtil.isValidObj(input)) {
    return KnurldResponse.invalidInputResponse(KnurldConstants.INVALID_INPUT,
      apiMetaData);
  }
  if (!KnurldSDKUtil.isEmpty(input.audioUrl)) {
    return KnurldResponse.invalidInputResponse('audioUrl', apiMetaData);
  }
  var bodyParams = {};

  if (KnurldSDKUtil.isValidObj(input.num_words)) {
    bodyParams.num_words = input.num_words;
  }
  bodyParams.audioUrl = input.audioUrl;
  apiMetaData.requestType = KnurldConstants.POST;

  var url = KnurldSDKUtil.buildUrl("endpointAnalysis/url",
    KnurldConstants.ISV1);
  return KnurldHttpRequest.sendRequest(url, bodyParams, apiMetaData);

};
