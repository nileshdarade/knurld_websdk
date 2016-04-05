/**
 * @author ndarade
 *
 */

var KnurldEnrollmentImpl = KnurldEnrollmentImpl || {};

/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldEnrollmentImpl.post = function(input, successCallback, errorCallBack,
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

  if (KnurldSDKUtil.isValidObj(input.enrollmentId)) {

    url = KnurldSDKUtil.buildUrl("enrollments/" + input.enrollmentId,
      KnurldConstants.ISV1);

    if (!KnurldSDKUtil.isValidObj(input.enrollmentUrl)) {
      return KnurldResponse.invalidInputResponse('enrollmentUrl',
        apiMetaData);
    }
    if (!KnurldSDKUtil.isValidObj(input.intervals)) {
      return KnurldResponse
        .invalidInputResponse('intervals', apiMetaData);
    }
    bodyParams["enrollment.wav"] = input.enrollmentUrl;
    bodyParams.intervals = input.intervals;

  } else {

    if (!KnurldSDKUtil.isEmpty(input.consumerId)) {
      return KnurldResponse.invalidInputResponse('consumerId', apiMetaData);
    }

    if (!KnurldSDKUtil.isEmpty(input.applicationId)) {
      return KnurldResponse
        .invalidInputResponse('applicationId', apiMetaData);
    }
    url = KnurldSDKUtil.buildUrl("enrollments", KnurldConstants.ISV1);
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
KnurldEnrollmentImpl.createAndPost = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var bodyParams = {};

  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    function(response) {
      var _apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
        successCallback, errorCallBack);
      _apiMetaData.requestType = KnurldConstants.POST;
      var _bodyParams = {};
      url = response.href;

      if (!KnurldSDKUtil.isValidObj(input.enrollmentUrl)) {
        return KnurldResponse.invalidInputResponse('enrollmentUrl',
          _apiMetaData);
      }
      if (!KnurldSDKUtil.isValidObj(input.intervals)) {
        return KnurldResponse
          .invalidInputResponse('intervals', _apiMetaData);
      }
      _bodyParams["enrollment.wav"] = input.enrollmentUrl;
      _bodyParams.intervals = input.intervals;
      KnurldHttpRequest.sendRequest(url, _bodyParams, _apiMetaData);
    }, errorCallBack);

  if (!KnurldSDKUtil.isValidObj(input)) {
    return KnurldResponse.invalidInputResponse(KnurldConstants.INVALID_INPUT,
      apiMetaData);
  }
  if (!KnurldSDKUtil.isEmpty(input.consumerId)) {
    return KnurldResponse.invalidInputResponse('consumerId', apiMetaData);
  }
  if (!KnurldSDKUtil.isEmpty(input.applicationId)) {
    return KnurldResponse
      .invalidInputResponse('applicationId', apiMetaData);
  }
  if (!KnurldSDKUtil.isValidObj(input.enrollmentUrl)) {
    return KnurldResponse.invalidInputResponse('enrollmentUrl',
      apiMetaData);
  }
  if (!KnurldSDKUtil.isValidObj(input.intervals)) {
    return KnurldResponse
      .invalidInputResponse('intervals', apiMetaData);
  }

  var url = KnurldSDKUtil.buildUrl("enrollments", KnurldConstants.ISV1);
  bodyParams.application = KnurldSDKUtil
    .buildApplicationIdUrl(input.applicationId);
  bodyParams.consumer = KnurldSDKUtil
    .buildConsumerIdUrl(input.consumerId);
  apiMetaData.requestType = KnurldConstants.POST;
  KnurldHttpRequest.sendRequest(url, bodyParams, apiMetaData);

};


/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldEnrollmentImpl.postWithFile = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  if (!KnurldSDKUtil.isValidObj(input)) {
    return KnurldResponse.invalidInputResponse(KnurldConstants.INVALID_INPUT,
      apiMetaData);
  }
  apiMetaData.contentType = KnurldConstants.CONTENT_TYPE_MULTIPART_FORM_DATA;
  apiMetaData.requestType = KnurldConstants.POST;
  var bodyParams = {};
  var url = KnurldSDKUtil.buildUrl("enrollments/" + input.enrollmentId,
    KnurldConstants.ISV1);
  /*if (!KnurldSDKUtil.isValidObj(input.intervals)) {
  	return KnurldResponse
  			.invalidInputResponse('intervals', apiMetaData);
  }*/
  bodyParams['enrollment.wav'] = input['enrollment.wav'];
  bodyParams.name = "1.wav";
  //bodyParams.intervals = input.intervals;
  return KnurldHttpRequest.uploadFile(url, bodyParams, apiMetaData);
};
/**
 * [function description]
 * @param  {[type]} input           [description]
 * @param  {[type]} successCallback [description]
 * @param  {[type]} errorCallBack   [description]
 * @param  {[type]} aPIExtraParams  [description]
 * @return {[type]}                 [description]
 */
KnurldEnrollmentImpl.get = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var bodyParams = {};
  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  var url;
  if (KnurldSDKUtil.isValidObj(input.enrollmentId)) {
    url = KnurldSDKUtil.buildUrl("enrollments/" + input.enrollmentId,
      KnurldConstants.ISV1);
  } else {
    url = KnurldSDKUtil.buildUrl("enrollments", KnurldConstants.ISV1);
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
KnurldEnrollmentImpl.getAll = function(input, successCallback, errorCallBack,
  aPIExtraParams) {
  var aPIExtraParams = {};
  var _response = [];
  //aPIExtraParams.async = true;
  var failCount = 0;
  KnurldEnrollmentImpl.get(input, function(response) {
    if (KnurldSDKUtil.isValidObj(response)) {
      if (response.length <= 10) {
        successCallback(response);
      } else {
        var items = response.items;
        for (var key in items) {
          _response[_response.length] = items[key];
        }
        for (i = 10; i < response.total; i += KnurldConstants.FETCH_ALL_OFFSET) {
          var inputs = {};
          inputs.limit = KnurldConstants.FETCH_ALL_OFFSET;
          inputs.offset = i;
          KnurldEnrollmentImpl.get(inputs, function(response) {
            var items = response.items;
            for (var key in items) {
              _response[_response.length] = items[key];
            }
            if (_response.length >= (response.total - failCount * KnurldConstants.FETCH_ALL_OFFSET)) {
              successCallback(_response);
            }
          }, function(response) {
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
KnurldEnrollmentImpl.del = function(input, successCallback, errorCallBack,
  aPIExtraParams) {

  if (!KnurldSDKUtil.isValidObj(input.enrollmentId)) {
    return KnurldResponse.invalidInputResponse('enrollmentId', apiMetaData);
  }

  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  var url = KnurldSDKUtil.buildUrl("enrollments/" + input.enrollmentId,
    KnurldConstants.ISV1);

  apiMetaData.requestType = KnurldConstants.DELETE;

  return KnurldHttpRequest.sendRequest(url, null, apiMetaData);
};
