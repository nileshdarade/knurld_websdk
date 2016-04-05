/**
 * @author ndarade
 *
 */
/**
 * [KnurldCallImpl description]
 * @type {[type]}
 */
var KnurldCallImpl = KnurldCallImpl || {};
/**
 * [post description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldCallImpl.post = function (input, successCallback, errorCallBack,
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
    bodyParams.number = input.number;
    if (KnurldSDKUtil.isValidObj(input.callId)) {

        url = KnurldSDKUtil.buildUrl("calls/" + input.callId,
            KnurldConstants.ISV1);
    } else {
        if (!KnurldSDKUtil.isEmpty(input.number)) {
            return KnurldResponse.invalidInputResponse('number',
                apiMetaData);
        }
        url = KnurldSDKUtil.buildUrl("calls", KnurldConstants.ISV1);
    }
    return KnurldHttpRequest.sendRequest(url, bodyParams, apiMetaData);
};
/**
 * [get description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldCallImpl.get = function (input, successCallback, errorCallBack,
    aPIExtraParams) {
    var bodyParams = {};
    var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
        successCallback, errorCallBack);
    var url;
    if (KnurldSDKUtil.isValidObj(input.callId)) {
        url = KnurldSDKUtil.buildUrl("calls/" + input.callId,
            KnurldConstants.ISV1);
    } else {
        url = KnurldSDKUtil.buildUrl("calls", KnurldConstants.ISV1);
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
 * [del description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldCallImpl.del = function (input, successCallback, errorCallBack,
    aPIExtraParams) {

    if (!KnurldSDKUtil.isValidObj(input.callId)) {
        return KnurldResponse.invalidInputResponse('callId',
            apiMetaData);
    }

    var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
        successCallback, errorCallBack);
    var url = KnurldSDKUtil.buildUrl("calls/" + input.callId,
        KnurldConstants.ISV1);

    apiMetaData.requestType = KnurldConstants.DELETE;


    return KnurldHttpRequest.sendRequest(url, null, apiMetaData);
};
