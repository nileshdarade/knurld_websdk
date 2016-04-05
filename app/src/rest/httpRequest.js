/**
 * [KnurldHttpRequest description]
 * @type {[type]}
 */
var KnurldHttpRequest = KnurldHttpRequest || {};
/**
 * [function description]
 * @param  {[type]} url          [description]
 * @param  {[type]} bodyParams   [description]
 * @param  {[type]} configParams [description]
 * @return {[type]}              [description]
 */
KnurldHttpRequest.sendRequest = function(url, bodyParams, configParams) {
  var httpRequest = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  if (bodyParams != null) {
    if (KnurldConstants.CONTENT_TYPE_FORM_ENCODED_URL == configParams.contentType || KnurldConstants.GET == configParams.requestType) {

      for (name in bodyParams) {
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(bodyParams[name]));
      }
      urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    } else if (KnurldConstants.CONTENT_TYPE_APPLICATION_JSON == configParams.contentType) {
      var jsonObj = {};
      for (name in bodyParams) {
        jsonObj[name] = bodyParams[name];
      }
      urlEncodedData = JSON.stringify(jsonObj);
    } else if (KnurldConstants.CONTENT_TYPE_MULTIPART_FORM_DATA == configParams.contentType) {
      urlEncodedData = new FormData();
      for (name in bodyParams) {
        urlEncodedData.append(name, bodyParams[name]);
      }
    }
  }

  httpRequest.onreadystatechange = function() {
    var response = {};
    if (httpRequest.readyState == XMLHttpRequest.DONE && configParams.async) {
      if (httpRequest.readyState == 4 && (httpRequest.status === 200 || httpRequest.status === 201 || httpRequest.status === 202) || (KnurldConstants.DELETE == configParams.requestType && httpRequest.status === 204)) {
        response = httpRequest.responseText;
        if ("" != response && response.indexOf("{") != -1) {
          response = eval("(" + response + ')');
        }
        if (configParams["localSuccessHandler"] != undefined) {
          configParams.localSuccessHandler(response,
            configParams.successCallBack);
        } else {
          configParams.successCallBack(response);
        }
        return response;
      } else {
        response = httpRequest.responseText;
        if (KnurldSDKUtil.isEmpty(response)) {
          response = eval("(" + response + ')');
        } else {
          response = {};
        }
        response.StatusCode = httpRequest.status;
        configParams.errorCallBack(response);
        return response;
      }

    }

  };

  if (KnurldConstants.GET == configParams.requestType) {
    url += "?" + urlEncodedData;
  }

  httpRequest.open(configParams.requestType, url, configParams.async);

  if (KnurldConstants.POST == configParams.requestType && KnurldConstants.CONTENT_TYPE_MULTIPART_FORM_DATA != configParams.contentType) {
    httpRequest.setRequestHeader('Content-Type', configParams.contentType);
  }
  if (configParams.sendAccessToken) {
    httpRequest.setRequestHeader("Authorization", "Bearer " + KnurldConstants.ACCESS_TOKEN);
  }
  if (configParams.sendDevID) {
    if(KnurldSDK.isConsumer() && !configParams.forceAdmin){
      httpRequest.setRequestHeader("Developer-Id", KnurldConstants.CONSUMER_DEV_ID);
    }else{
      httpRequest.setRequestHeader("Developer-Id", KnurldConstants.DEV_ID);
    }
  }
  return httpRequest.send(urlEncodedData);
};

/**
 * [function description]
 * @param  {[type]} url          [description]
 * @param  {[type]} bodyParams   [description]
 * @param  {[type]} configParams [description]
 * @return {[type]}              [description]
 */
KnurldHttpRequest.uploadFile = function(url, bodyParams, configParams) {
  var httpRequest = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }
  /* Create a FormData instance */
  var formData = new FormData();
  for (name in bodyParams) {
    formData.append(name, bodyParams[name]);
  }
  httpRequest.onreadystatechange = function() {
    var response = {};
    if (httpRequest.readyState == XMLHttpRequest.DONE && configParams.async) {
      if (httpRequest.readyState == 4 && (httpRequest.status === 200 || httpRequest.status === 201 || httpRequest.status === 202) || (KnurldConstants.DELETE == configParams.requestType && httpRequest.status === 204)) {
        response = httpRequest.responseText;
        if (configParams["localSuccessHandler"] != undefined) {
          configParams.localSuccessHandler(response,
            configParams.successCallBack);
        } else {
          configParams.successCallBack(response);
        }
        return response;
      } else {
        response = httpRequest.responseText;
        response.StatusCode = httpRequest.status;
        configParams.errorCallBack(response);
        return response;
      }
    }
  };
  httpRequest.open("post", url , true);
  //httpRequest.setRequestHeader('Content-Type','');
  httpRequest.send(formData); /* Send to server */
};
