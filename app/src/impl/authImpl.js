/**
 * @author ndarade
 *
 */

var KnurldAuthImpl = KnurldAuthImpl || {};

/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldAuthImpl.accesstoken = function(input,
		successCallback, errorCallBack, aPIExtraParams) {

	var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
			successCallback, errorCallBack);
	apiMetaData.localSuccessHandler = KnurldAuthImpl.catchAccessTokenSuccessCallBack;
	if (!KnurldSDKUtil.isValidObj(input)) {
		return KnurldResponse.invalidInputResponse(KnurldConstants.INVALID_INPUT, apiMetaData);
	}
	if (!KnurldSDKUtil.isEmpty(input.client_id)) {
		return KnurldResponse.invalidInputResponse(KnurldConstants.CLIENT_ID, apiMetaData);
	}
	if (!KnurldSDKUtil.isEmpty(input.client_secret)) {
		return KnurldResponse
				.invalidInputResponse(KnurldConstants.CLIENT_SECRET, apiMetaData);
	}
	if (KnurldSDKUtil.isValidObj(input.developer_id)) {
		KnurldConstants.DEV_ID = devId;
	}
	var url = KnurldSDKUtil
			.buildUrl(
					KnurldConstants.ENDPOINT_LOGIN,
					!KnurldConstants.ISV1);
	apiMetaData.requestType = KnurldConstants.POST;
	var bodyParams = {};
	bodyParams.client_id = input.client_id;
	bodyParams.client_secret = input.client_secret;
	apiMetaData.sendAccessToken = false;
	apiMetaData.sendDevID=false;
	apiMetaData.contentType=KnurldConstants.CONTENT_TYPE_FORM_ENCODED_URL;
	return KnurldHttpRequest.sendRequest(url, bodyParams, apiMetaData);
};

/**
 * [function description]
 * @param  {[type]} resp     [description]
 * @param  {[type]} callBack [description]
 * @return {[type]}          [description]
 */
KnurldAuthImpl.catchAccessTokenSuccessCallBack = function(resp, callBack) {
	KnurldConstants.ACCESS_TOKEN = resp.access_token;
	callBack(resp);
};

/**
 * [function description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldAuthImpl.status = function(successCallback, errorCallBack, aPIExtraParams) {

	var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
			successCallback, errorCallBack);

	var url = KnurldSDKUtil.buildUrl(KnurldConstants.ENDPOINT_STATUS, KnurldConstants.ISV1);
	return KnurldHttpRequest.sendRequest(url, null, apiMetaData);
};
