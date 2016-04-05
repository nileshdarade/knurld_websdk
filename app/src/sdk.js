/**
 * KnurldSDK Class, To call SDK api's which can be consumed by any UI
 * technologies
 *
 * @example Asynchronous call:
 *          accesstoken use
 *
 *          var inputs={};
 *          inputs.client_id=client_id;
 *          inputs.client_secret=client_secret;
 *          inputs.developer_id=developer_id
 *          KnurldSDK.auth.accesstoken(inputs,
 *          successCallback, errorCallBack);
 *
 * @example Synchronous call :
 *          accesstoken use : **synchronous requests on the main
 *          thread have been deprecated due to the negative effects to the user experience.
 *          so until you are using worker therad please do not use this option
 *
 *          var inputs={};
 *          var aPIExtraParams={};
 *          aPIExtraParams.async=true;
 *          inputs.client_id=client_id;
 *          inputs.client_secret=client_secret;
 *          inputs.developer_id=developer_id

 *          var response=KnurldSDK.auth.accesstoken(inputs,
 *          successCallback, errorCallBack, aPIExtraParams);
 * @namespace KnurldSDK
 *
 */

'use strict';
var KnurldSDK = KnurldSDK || {};

/**
 * Init the KnurldSDK object, which takes option as param
 *
 * @param options
 *            options is javascript object which contents info for initializing
 *            sdk
 *
 * @example var options = {}; var statusObj = KnurldSDK.init(options); if
 *          (!statusObj.initialized) { alert(statusObj.message); return; }
 * @memberOf KnurldSDK.prototype
 */

KnurldSDK.init = (function(options) {
  var returnObj = {};
  returnObj.initialized = true;
  if (KnurldSDKUtil.isValidObj(options)) {
    if ('host' in options) {
      KnurldSDK.setHostUrl(options.host);
    }
    // TODO need add logger level and global serttings
    // If something goes wrong then please set KnurldSDK to null as we do
    // not want user to do
    // any action without proper initialized SDK.
  }
  return returnObj;
});

/**
 * Setting the host url for SDK typically https://api.knurld.io/ : KnurldSDK.setHostUrl('https://api.knurld.io/');
 * @param  string function(url host url
 */
KnurldSDK.setHostUrl = (function(url) {
  KnurldConstants.HOST = url;
  KnurldSDKUtil.setupURL();
});

/**
 * getting the host url back Utility api : KnurldSDK.getHostUrl()
 * @return string hosturl;
 */
KnurldSDK.getHostUrl = (function() {
  return KnurldConstants.HOST;
});

/**
 * set is web sdk used for developer or consumer: KnurldSDK.setConsumer(true|false); // default consumer is false
 * @param  string
 */
KnurldSDK.setConsumer = (function(consumer) {
  KnurldConstants.IS_CONSUMER = consumer;
});

/**
 * getting the SDK is used by {developer|consumer} back Utility api : KnurldSDK.isConsumer()
 * @return string hosturl;
 */
KnurldSDK.isConsumer = (function() {
  return KnurldConstants.IS_CONSUMER;
});

/**
 * Uyility API for uploading file on server : KnurldSDK.uploadFile(url, bodyParams, successCallback,
   errorCallBack)
 * @param  url url where you want to upload file
 * @param bodyParams
 * @param successCallback {function}
     						Success Call Back
 * @param errorCallBack {function}
     						Error Call Back
 * @return response Response from API
 */
KnurldSDK.uploadFile = (function(url, bodyParams, successCallback,
  errorCallBack) {
  var aPIExtraParams = {};
  var apiMetaData = KnurldSDKUtil.getAPIParams(aPIExtraParams,
    successCallback, errorCallBack);
  if (!KnurldSDKUtil.isValidObj(url)) {
    return KnurldResponse.invalidInputResponse('invalid inputs',
      apiMetaData);
  }
  apiMetaData.contentType = KnurldConstants.CONTENT_TYPE_MULTIPART_FORM_DATA;
  apiMetaData.requestType = KnurldConstants.POST;
  return KnurldHttpRequest.uploadFile(url, bodyParams, apiMetaData)
});
/*
 * Get the host url
 *
 * @type {Function}
 */
KnurldSDK.clearInterval = (function(intervalId) {
  if (KnurldSDKUtil.isValidObj(intervalId)) {
    clearInterval(intervalId);
  }
});

/*
 * To set the dev_ID which is used to user in API's Set the cloud url
 */
KnurldSDK.setDevID = (function(devId) {
  KnurldConstants.DEV_ID = devId;
});
/*
 * Get the host url
 *
 * @type {Function}
 */
KnurldSDK.getDevID = (function() {
  return KnurldConstants.DEV_ID;
});



/*
 * To set the consumer dev_ID which is used to user in API's Set the cloud url
 */
KnurldSDK.setConsumerDevID = (function(devId) {
  KnurldConstants.CONSUMER_DEV_ID = devId;
});
/*
 * Get the consumer devId
 *
 * @type {Function}
 */
KnurldSDK.getConsumerDevID = (function() {
  return KnurldConstants.CONSUMER_DEV_ID;
});




KnurldSDK.setAccessToken = (function(token) {
  KnurldConstants.ACCESS_TOKEN = token;
});
/*
 * Get the host url
 *
 * @type {Function}
 */
KnurldSDK.getAccessToken = (function() {
  return KnurldConstants.ACCESS_TOKEN;
});
/**
 * Dealing with the user v1 management, call function in this namespace as <br/><br/><b>
 * KnurldSDK.auth.accesstoken(inputs, successCallback,
 * errorCallBack);</b>
 *
 * @namespace KnurldSDK.auth
 */
KnurldSDK.auth = (function() {
  return {
    /**
		 * API to get access token KnurldSDK.auth.accesstoken(inputs, successCallback,
     * errorCallBack);
		 * @param inputs {Object}
								javascript object which contents all the inputs for API
								e.g.<br/>
								var inputs={};<br/>
								inputs.client_id="client_id";<br/>
								inputs.client_secret="client_secret";<br/>
                inputs.developer_id="developer_id"<br/>

	   * @param successCallback {function}
		 						Success Call Back
   	 * @param errorCallBack {function}
								Error Call Back
		 * @memberOf KnurldSDK.auth.prototype
		 */
    accesstoken: function(input, successCallback, errorCallBack,
      aPIExtraParams) {

      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = KnurldConstants.LOGIN_TIMER;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER;
        }
        setInterval(function() {
          KnurldAuthImpl.accesstoken(input, KnurldSDKUtil.commonCallBack,
            KnurldSDKUtil.commonCallBack, aPIExtraParams)
        }, interval);
      }
      return KnurldAuthImpl.accesstoken(input, successCallback,
        errorCallBack, aPIExtraParams);

    },
    /**
		 * API to get API version and status, KnurldSDK.auth.status(successCallback,
     * errorCallBack);
	   * @param successCallback {function}
		 						Success Call Back
   	 * @param errorCallBack {function}
								Error Call Back
		 * @memberOf KnurldSDK.auth.prototype
		 */
    status: function(successCallback, errorCallBack, aPIExtraParams) {
      return KnurldAuthImpl.status(successCallback, errorCallBack,
        aPIExtraParams);
    }
  };
}(""));

/**
 * Dealing with the AppModel v1 management, call function in this namespace as <br/><br/><b>
 * KnurldSDK.appModel.get(inputs, successCallback,
 * errorCallBack);</b>
 *
 * @namespace KnurldSDK.appModel
 */
KnurldSDK.appModel = (function() {
  return {
    /** KnurldSDK.appModel.create(inputs, successCallback,
    * errorCallBack);
    * @param input {Object}
    						javascript object which contents all the inputs for API
    						<p></p>e.g.<p>
    						var inputs={};</p><p>
    						inputs.enrollmentRepeats="enrollmentRepeats"; Required.</p><p>
    						inputs.vocabulary="vocabulary"; Required. </p><p>
    						inputs.verificationLength="verificationLength"; Required. </p><p>
    						inputs.threshold=threshold; Optional. </p><p>
    						inputs.autoThresholdEnable=autoThresholdEnable; Optional. </p><p>
    						inputs.autoThresholdClearance=autoThresholdClearance; Optional. </p><p>
    						inputs.autoThresholdMaxRise=autoThresholdMaxRise; Optional. </p><p>
    						inputs.useModelUpdate=useModelUpdate; Optional. </p><p>
    						inputs.modelUpdateDailyLimit=modelUpdateDailyLimit; Optional. </p><p>

    						</p>----------Info-----------<p>
    						enrollmentRepeats:# of times the user is asked to repeat each phrase during the enrollment process. Minimum required is 3.</p><p>
    						vocabulary:Consumers may enroll with any combination of the phrases associated with app-model. A subset of phrases will be selected for each verification.</p><p>
    						verificationLength:# of phrases to use for verification. Recommended minimum is 3. Make sure that this is equal to or less than the number of phrases specified in the vocabulary parameter. The actual phrases asked for by the engine at verification time is a random subset of the phrase vocabulary.</p>
    						threshold:Optional, Score threshold for verification.  Default 2 (typical range between 2 and 4)<p></p>
    						autoThresholdEnable:Optional, If enabled, consumers who constantly score high will have their threshold adjusted automatically. (optional, default true) <p></p>
    						autoThresholdClearance:Optional, Distance above the base threshold that a consumer's score needs to be to activate auto-adjustment. (optional, default 2.5)<p></p>
    						autoThresholdMaxRise:Optional, Maximum value above the base threshold that a consumer's auto-adjustment will rise to. (optional, default 1.0)<p></p>
    						useModelUpdate:Optional, Optional. Enable augmenting enrollment data with audio from successful verifications. (optional, default false)<p></p>
    						modelUpdateDailyLimit:Optional, Maximum amount of times per day that model updating will be applied (default 1)<p></p>
     * @param successCallback {function}
    						Success Call Back
     * @param errorCallBack {function}
    						Error Call Back
     * @memberOf KnurldSDK.appModel.prototype
     */
    create: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldAppModelImpl.post(input, successCallback,
        errorCallBack, aPIExtraParams);
    },

    /** KnurldSDK.appModel.update(inputs, successCallback,
    * errorCallBack);
    * @param input {Object}
    						javascript object which contents all the inputs for API
    						<p></p>e.g.<p>
    						var inputs={};</p><p>
    						inputs.enrollmentRepeats="enrollmentRepeats"; Required.</p><p>
    						inputs.vocabulary="vocabulary"; Required. </p><p>
    						inputs.verificationLength="verificationLength"; Required. </p><p>
    						inputs.threshold=threshold; Optional. </p><p>
    						inputs.autoThresholdEnable=autoThresholdEnable; Optional. </p><p>
    						inputs.autoThresholdClearance=autoThresholdClearance; Optional. </p><p>
    						inputs.autoThresholdMaxRise=autoThresholdMaxRise; Optional. </p><p>
    						inputs.useModelUpdate=useModelUpdate; Optional. </p><p>
    						inputs.modelUpdateDailyLimit=modelUpdateDailyLimit; Optional. </p><p>
    						inputs.appModelId = "5571c3a5c203f17826740e90192d5602";


    						</p>----------Info-----------<p>
    						enrollmentRepeats:# of times the user is asked to repeat each phrase during the enrollment process. Minimum required is 3.</p><p>
    						vocabulary:Consumers may enroll with any combination of the phrases associated with app-model. A subset of phrases will be selected for each verification.</p><p>
    						verificationLength:# of phrases to use for verification. Recommended minimum is 3. Make sure that this is equal to or less than the number of phrases specified in the vocabulary parameter. The actual phrases asked for by the engine at verification time is a random subset of the phrase vocabulary.</p>
    						threshold:Optional, Score threshold for verification.  Default 2 (typical range between 2 and 4)<p></p>
    						autoThresholdEnable:Optional, If enabled, consumers who constantly score high will have their threshold adjusted automatically. (optional, default true) <p></p>
    						autoThresholdClearance:Optional, Distance above the base threshold that a consumer's score needs to be to activate auto-adjustment. (optional, default 2.5)<p></p>
    						autoThresholdMaxRise:Optional, Maximum value above the base threshold that a consumer's auto-adjustment will rise to. (optional, default 1.0)<p></p>
    						useModelUpdate:Optional, Optional. Enable augmenting enrollment data with audio from successful verifications. (optional, default false)<p></p>
    						modelUpdateDailyLimit:Optional, Maximum amount of times per day that model updating will be applied (default 1)<p></p>
     * @param successCallback {function}
    						Success Call Back
     * @param errorCallBack {function}
    						Error Call Back
     * @memberOf KnurldSDK.appModel.prototype
     */
    update: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldAppModelImpl.post(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /** KnurldSDK.appModel.get(inputs, successCallback,
    * errorCallBack);
     * API to get all app-model in the system, Pagination available
     * @param inputs {Object}
								javascript object which contents all the inputs for API
								e.g.<br/>
								var inputs={};<br/>
                inputs.limit = 10;<br/>
                inputs.offset = 0;<br/>
     * @param successCallback {function}
    						Success Call Back
     * @param errorCallBack {function}
    						Error Call Back
     * @memberOf KnurldSDK.appModel.prototype
     */
    get: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER;
        }
        response = setInterval(function() {
          KnurldAppModelImpl.get(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldAppModelImpl.get(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;
    },
    /** KnurldSDK.appModel.getAll(inputs, successCallback,
    * errorCallBack);
     * API to get all app-model in the system, if network is constraints please use get api with pagination, chunks 50 records at a time
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>

     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.appModel.prototype
     */
    getAll: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER;
        }
        response = setInterval(function() {
          KnurldAppModelImpl.getAll(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldAppModelImpl.getAll(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;
    },
    /** KnurldSDK.appModel.getAllInOneCall(inputs, successCallback,
    * errorCallBack);
     * API to get all app-model in the system, gives 1000 records in single call, if network is constraints please use get api with pagination
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.appModel.prototype
     */
    getAllInOneCall: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER_FOR_GET_ALL_CALL;
        }
        response = setInterval(function() {
          KnurldAppModelImpl.getAll(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldAppModelImpl.getAllInOneCall(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;
    },
    /** KnurldSDK.appModel.del(inputs, successCallback,
    * errorCallBack);
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.appModelId = "5571c3a5c203f17826740e90192d5602"; // Do not put full url
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.appModel.prototype
     */
    del: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldAppModelImpl.del(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
  };
}(""));
/**
 * Dealing with the Consumer v1 management, call function in this namespace as <br/><br/><b>
 * KnurldSDK.consumer.get(inputs, successCallback,
 * errorCallBack);</b>
 *
 * @namespace KnurldSDK.consumer
 */
KnurldSDK.consumer = (function() {
  return {
    /** KnurldSDK.consumer.create(inputs, successCallback,
    * errorCallBack);
     * API to create Consumer in the system
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.Gender = "M" or "F";<br/>
        				inputs.username = "John";<br/>
        				inputs.password = "password";<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.consumer.prototype
     */
    create: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldConsumerImpl.post(input, successCallback,
        errorCallBack, aPIExtraParams);
    },

    /** KnurldSDK.consumer.update(inputs, successCallback,
    * errorCallBack);
     * API to update Consumer in the system
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
        		inputs.password = "password";<br/>
        		inputs.consumerId = "5571c3a5c203f17826740e90192d5602";
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.consumer.prototype
     */
    update: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldConsumerImpl.post(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /** KnurldSDK.consumer.get(inputs, successCallback,
    * errorCallBack);
     * API to get all consumer in the system, Pagination available
     * @param inputs {Object}
								javascript object which contents all the inputs for API
								e.g.<br/>
                var inputs={};<br/>
                inputs.limit = 10;<br/>
                inputs.offset = 0;<br/>
     * @param successCallback {function}
    						Success Call Back
     * @param errorCallBack {function}
    						Error Call Back
     * @memberOf KnurldSDK.consumer.prototype
     */
    get: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER;
        }
        response = setInterval(function() {
          KnurldConsumerImpl.get(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldConsumerImpl.get(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;
    },

    /** KnurldSDK.consumer.getAll(inputs, successCallback,
    * errorCallBack);
     * API to get all Consumers in the system, if network is constraints please use get api with pagination, chunks 50 records at a time
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.consumer.prototype
     */
    getAll: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER;
        }
        response = setInterval(function() {
          KnurldConsumerImpl.getAll(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldConsumerImpl.getAll(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;
    },
    /** KnurldSDK.consumer.getAllInOneCall(inputs, successCallback,
    * errorCallBack);
     * API to get all Consumers in the system, gives 1000 records in single call, if network is constraints please use get api with pagination
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.consumer.prototype
     */
    getAllInOneCall: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER_FOR_GET_ALL_CALL;
        }
        response = setInterval(function() {
          KnurldAppModelImpl.getAll(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldConsumerImpl.getAllInOneCall(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;
    },
    /** KnurldSDK.consumer.del(inputs, successCallback,
     * errorCallBack);
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.consumerId = "5571c3a5c203f17826740e90192d5602"; // Do not put full url
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.consumer.prototype
     */
    del: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldConsumerImpl.del(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /**KnurldSDK.consumer.token(inputs, successCallback,
     * errorCallBack);
     * API to get consumer token
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.username=username;<br/>
                inputs.password=password;<br/>
     * @param successCallback {function}
    						Success Call Back
     * @param errorCallBack {function}
    						Error Call Back
     * @memberOf KnurldSDK.consumer.prototype
     */
    token: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldConsumerImpl.token(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
  };
}(""));

/**
 * Dealing with the Enrollment v1 management, call function in this namespace as <br/><br/><b>
 * KnurldSDK.enrollment.get(inputs, successCallback,
 * errorCallBack);</b>
 *
 * @namespace KnurldSDK.enrollment
 */
KnurldSDK.enrollment = (function() {
  return {
    /** KnurldSDK.enrollment.create(inputs, successCallback,
    * errorCallBack);
     * API to create Enrollment object in the system
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.consumerId = "5571c3a5c203f17826740e90192d5602";<br/> // do not send full url with href
            	inputs.applicationId = "5571c3a5c203f17826740e90194b5187";<br/> // do not send full url with href

     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.enrollment.prototype
     */
    create: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldEnrollmentImpl.post(input, successCallback,
        errorCallBack, aPIExtraParams);
    },

    /** KnurldSDK.enrollment.update(inputs, successCallback,
    * errorCallBack);
     * API to create Enrollment object in the system
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.enrollmentId="5571c3a5c203f17826740e90194b518a";<br/> // do not send full url with href
                inputs.enrollmentUrl = "http://drobox.com/user/verification.wav";<br/>
                inputs.intervals = [{\"phrase\":\"Phrase\",\"start\":value,\"stop\":value},\<br/>
                                    {\"phrase\":\"Phrase\",\"start\":value,\"stop\":value}, \<br/>
                                    {\"phrase\":\"Phrase\",\"start\":value,\"stop\":value}]}]<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.enrollment.prototype
     */
    update: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldEnrollmentImpl.post(input, successCallback,
        errorCallBack, aPIExtraParams);
    },




    postWithFile: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldEnrollmentImpl.postWithFile(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /** KnurldSDK.enrollment.createAndUpdate(inputs, successCallback,
    * errorCallBack);
     * API to create Enrollment object in the system
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.consumerId = "5571c3a5c203f17826740e90192d5602";<br/>
                inputs.applicationId = "5571c3a5c203f17826740e90194b5187";<br/>
                inputs.enrollmentUrl = "http://drobox.com/user/enrollment.wav";<br/>
                inputs.intervals = [{\"phrase\":\"Phrase\",\"start\":value,\"stop\":value},\<br/>
                                    {\"phrase\":\"Phrase\",\"start\":value,\"stop\":value}, \<br/>
                                    {\"phrase\":\"Phrase\",\"start\":value,\"stop\":value}]}]<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.enrollment.prototype
     */
    createAndUpdate: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldEnrollmentImpl.createAndPost(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /** KnurldSDK.enrollment.get(inputs, successCallback,
    * errorCallBack);
     * API to get all enrollments in the system, Pagination available
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.limit = 10;<br/>
                inputs.offset = 0;<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.enrollment.prototype
     */
    get: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER;
        }
        response = setInterval(function() {
          KnurldEnrollmentImpl.get(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldEnrollmentImpl.get(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;
    },
    /** KnurldSDK.enrollment.getAll(inputs, successCallback,
    * errorCallBack);
     * API to get all enrollment in the system, if network is constraints please use get api with pagination, chunks 50 records at a time
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.enrollment.prototype
     */
    getAll: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER;
        }
        response = setInterval(function() {
          KnurldEnrollmentImpl.getAll(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldEnrollmentImpl.getAll(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;
    },
    /** KnurldSDK.enrollment.del(inputs, successCallback,
     * errorCallBack);
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.enrollmentId = "5571c3a5c203f17826740e90192d5602"; // Do not put full url
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.enrollment.prototype
     */
    del: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldEnrollmentImpl.del(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
  };
}(""));

/**
 * Dealing with the Verification v1 management, call function in this namespace as <br/><br/><b>
 * KnurldSDK.enrollment.get(inputs, successCallback,
 * errorCallBack);</b>
 *
 * @namespace KnurldSDK.verification
 */
KnurldSDK.verification = (function() {
  return {
    /** KnurldSDK.verification.create(inputs, successCallback,
    * errorCallBack);
     * API to create verification object in the system
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.consumerId = "5571c3a5c203f17826740e90192d5602";// do not send full url with href<br/>
            		inputs.applicationId = "5571c3a5c203f17826740e90194b5187";// do not send full url with href<br/>


     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.verification.prototype
     */
    create: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldVerificationImpl.post(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /** KnurldSDK.verification.update(inputs, successCallback,
	    * errorCallBack);
	     * API to create verification object in the system
	     * @param inputs {Object}
	                javascript object which contents all the inputs for API
	                e.g.<br/>
	                var inputs={};<br/>


	                if user want to update the same endpoint with verification ID and it will post on that endpoint<br/>
	                inputs.verificationId="5571c3a5c203f17826740e90194b518a"; // do not send full url with href<br/>
	                inputs.verificationUrl = "http://drobox.com/user/verification.wav";<br/>
	                inputs.intervals = [{\"phrase\":\"Phrase\",\"start\":value,\"stop\":value},\<br/>
	                                    {\"phrase\":\"Phrase\",\"start\":value,\"stop\":value}, \<br/>
	                                    {\"phrase\":\"Phrase\",\"start\":value,\"stop\":value}]}]<br/>
	     * @param successCallback {function}
	                Success Call Back
	     * @param errorCallBack {function}
	                Error Call Back
	     * @memberOf KnurldSDK.verification.prototype
	     */
    update: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldVerificationImpl.post(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /** KnurldSDK.verification.get(inputs, successCallback,
    * errorCallBack);
     * API to get all verification in the system, Pagination available
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.limit = 10;<br/>
                inputs.offset = 0;<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.verification.prototype
     */
    get: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER;
        }
        response = setInterval(function() {
          KnurldVerificationImpl.get(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldVerificationImpl.get(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;

    },
    /** KnurldSDK.verification.getAll(inputs, successCallback,
    * errorCallBack);
     * API to get all verification in the system, if network is constraints please use get api with pagination, chunks 50 records at a time
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.verification.prototype
     */
    getAll: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER;
        }
        response = setInterval(function() {
          KnurldVerificationImpl.getAll(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldVerificationImpl.getAll(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;
    },
    /** KnurldSDK.verification.del(inputs, successCallback,
     * errorCallBack);
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.verificationId = "5571c3a5c203f17826740e90192d5602"; // Do not put full url
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.verification.prototype
     */
    del: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldVerificationImpl.del(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
  };
}(""));

/**
 * Dealing with the Call v1 management, call function in this namespace as <br/><br/><b>
 * KnurldSDK.call.get(inputs, successCallback,
 * errorCallBack);</b>
 *
 * @namespace KnurldSDK.call
 */
KnurldSDK.call = (function() {
  return {
    /**
     * API to get status
     * @param successCallback {function}
    						Success Call Back
     * @param errorCallBack {function}
    						Error Call Back
     * @memberOf KnurldSDK.call.prototype
     */
    create: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldCallImpl.post(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /**
     * API to get status
     * @param successCallback {function}
    						Success Call Back
     * @param errorCallBack {function}
    						Error Call Back
     * @memberOf KnurldSDK.call.prototype
     */
    update: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldCallImpl.post(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /**
     * API to get status
     * @param successCallback {function}
    						Success Call Back
     * @param errorCallBack {function}
    						Error Call Back
     * @memberOf KnurldSDK.call.prototype
     */
    get: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldCallImpl.get(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /**
     * API to get status
     * @param successCallback {function}
    						Success Call Back
     * @param errorCallBack {function}
    						Error Call Back
     * @memberOf KnurldSDK.call.prototype
     */
    del: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldCallImpl.del(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
  };
}(""));

/**
 * Dealing with the Analytics v1 management, call function in this namespace as <br/><br/><b>
 * KnurldSDK.analytics.get(inputs, successCallback,
 * errorCallBack);</b>
 *
 * @namespace KnurldSDK.analytics
 */
KnurldSDK.analytics = (function() {
  return {
    /** KnurldSDK.analytics.file(inputs, successCallback,
     * errorCallBack);
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.fileData = file or fileData; // it could be BLOB object as well <br/>
                inputs.num_words = 2;<br/>
      * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.analytics.prototype
     */
    file: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldAnalysisImpl.file(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
    /** KnurldSDK.analytics.get(inputs, successCallback,
    * errorCallBack);
     * API to get status of file
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.id = "5571c3a5c203f17826740e90194b5187"<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.analytics.prototype
     */
    get: function(input, successCallback, errorCallBack, aPIExtraParams) {
      var response;
      var isTimer = input.isTimer;
      if (KnurldSDKUtil.isValidObj(isTimer) && isTimer) {
        var interval = input.interval;
        if (KnurldSDKUtil.isValidObj(interval)) {
          interval = KnurldConstants.GLOBAL_TIMER;
        }
        response = setInterval(function() {
          KnurldAnalysisImpl.get(input, successCallback,
            errorCallBack)
        }, interval);
      } else {
        response = KnurldAnalysisImpl.get(input, successCallback,
          errorCallBack, aPIExtraParams);
      }
      return response;
    },
    /** KnurldSDK.analytics.get(inputs, successCallback,
    * errorCallBack);
     * API to get status of file
     * @param inputs {Object}
                javascript object which contents all the inputs for API
                e.g.<br/>
                var inputs={};<br/>
                inputs.audioUrl = "http://drobox.com/user/verification.wav"<br/>
                inputs.num_words = 2;<br/>
     * @param successCallback {function}
                Success Call Back
     * @param errorCallBack {function}
                Error Call Back
     * @memberOf KnurldSDK.analytics.prototype
     */
    url: function(input, successCallback, errorCallBack, aPIExtraParams) {
      return KnurldAnalysisImpl.url(input, successCallback,
        errorCallBack, aPIExtraParams);
    },
  };
}(""));
