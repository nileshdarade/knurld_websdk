/**
 * @author ndarade
 *
 */

var KnurldSDKUtil = KnurldSDKUtil || {};
/**
 * [function description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
KnurldSDKUtil.isValidObj = function(value) {
	if (typeof value == 'undefined' || null == value) {
		return false;
	}
	return true;
};
/**
 * [function description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
KnurldSDKUtil.isEmpty = function(value) {
	if (KnurldSDKUtil.isValidObj(value)) {
		value = value.trim();
		if ('' != value) {
			return true;
		}
	}
	return false;
};
/**
 * [function description]
 * @param  {[type]}  apiName [description]
 * @param  {Boolean} isV1    [description]
 * @return {[type]}          [description]
 */
KnurldSDKUtil.buildUrl = function(apiName, isV1) {
	if (isV1) {
		return KnurldConstants.HOST + KnurldConstants.V1 + apiName;
	}
	return KnurldConstants.HOST + apiName;
};
/**
 * [function description]
 * @param  {[type]} applicationId [description]
 * @return {[type]}               [description]
 */
KnurldSDKUtil.buildApplicationIdUrl = function(applicationId) {
	return KnurldConstants.APP_URL + applicationId;
}
/**
 * [function description]
 * @param  {[type]} consumerId [description]
 * @return {[type]}            [description]
 */
KnurldSDKUtil.buildConsumerIdUrl = function(consumerId) {
	return KnurldConstants.CONSUMER_URL + consumerId;
}
/**
 * [function description]
 * @param  {[type]} aPIExtraParams  [description]
 * @param  {[type]} successCallBack [description]
 * @param  {[type]} errorCallBack   [description]
 * @return {[type]}                 [description]
 */
KnurldSDKUtil.getAPIParams = function(aPIExtraParams, successCallBack,
		errorCallBack) {
	if (!KnurldSDKUtil.isValidObj(aPIExtraParams)) {
		aPIExtraParams = {};
	}
	if (aPIExtraParams["async"] === undefined) {
		aPIExtraParams.async = true;
	}
	if (aPIExtraParams["requestType"] === undefined) {
		aPIExtraParams.requestType = KnurldConstants.GET;
	}
	if (!KnurldSDKUtil.isFunction(successCallBack)) {
		successCallBack = KnurldSDKUtil.commonCallBack;
	}
	if (!KnurldSDKUtil.isFunction(errorCallBack)) {
		errorCallBack = KnurldSDKUtil.commonCallBack;
	}
	aPIExtraParams.successCallBack = successCallBack;
	aPIExtraParams.errorCallBack = errorCallBack;
	aPIExtraParams.sendDevID = true;
	aPIExtraParams.sendAccessToken = true;
	aPIExtraParams.contentType = KnurldConstants.CONTENT_TYPE_APPLICATION_JSON;
	aPIExtraParams.forceAdmin = false;
	return aPIExtraParams;
};
/**
 * [function description]
 * @param  {[type]} possibleFunction [description]
 * @return {[type]}                  [description]
 */
KnurldSDKUtil.isFunction = function(possibleFunction) {
	return typeof (possibleFunction) === typeof (Function);
};
/**
 * [function description]
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
KnurldSDKUtil.commonCallBack = function(param) {
	// TODO need to decide
}
/**
 * [function description]
 * @return {[type]} [description]
 */
KnurldSDKUtil.setupURL = function() {
	KnurldConstants.APP_URL = KnurldConstants.HOST + KnurldConstants.V1
			+ KnurldConstants.APPLICATION + KnurldConstants.URL_SEPR;

	KnurldConstants.CONSUMER_URL = KnurldConstants.HOST + KnurldConstants.V1
			+ KnurldConstants.CONSUMER + KnurldConstants.URL_SEPR;
}
