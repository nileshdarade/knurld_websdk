// initializing sdk
KnurldSDK.init();
KnurldSDK.setHostUrl(host);
KnurldSDK.setDevID(devId);
var isSpecRunnerExecuting = false;

/*******************************************************************************
 *
 * @param message
 */
function log(message) {
  console.log(message);
}

function printResponse(response) {
  if (response == null) {
    log("Response is null")
  } else {
    log("Response from SDK is:" + JSON.stringify(response));
  }
}

function setModelId(model) {
  modelId = model;
}

function setCustomerId(cust) {
  consumerId = cust;
}

function setEnrollmentId(endId) {
  enrollmentId = endId;
}

function setVerificationId(id) {
  verificationId = id;
}

function setCallId(id) {
  callId = id;
}

function setAnyticsId(id) {
  analyticsId = id;
}

function verifyAccessTokenIfNotPresentLoginAndGetOne(done) {
  if ("" == KnurldConstants.ACCESS_TOKEN) {
    var inputs = {};
    inputs.client_id = client_id;
    inputs.client_secret = client_secret;
    KnurldSDK.auth.accesstoken(inputs, done, null);
  } else {
    done();
  }
}

function checkConsumerExistIfNotAddIt(done) {
  if ("" == consumerId) {
    var inputs = {};
    inputs.Gender = Gender;
    inputs.username = username;
    inputs.password = password;
    KnurldSDK.consumer.create(inputs, function(args) {
      var arr = args.href.split('/');
      custId = arr.pop();
      setCustomerId(custId);
      done();
    }, null);
  } else {
    done();
  }
}

function checkAppModelExistIfNotAddIt(done) {
  if ("" == modelId) {
    var inputs = {};

    inputs.enrollmentRepeats = enrollmentRepeats;
    inputs.vocabulary = vocabulary;
    inputs.verificationLength = verificationLength;

    KnurldSDK.appModel.create(inputs, function(args) {
      var arr = args.href.split('/');
      modelId = arr.pop();
      setModelId(modelId);
      done();
    }, null);
  } else {
    done();
  }
}

function checkEnrollmentExistIfNotAddIt(done) {
  if ("" == enrollmentId) {
    var inputs = {};
    inputs.consumerId = consumerId;
    inputs.applicationId = modelId;
    KnurldSDK.enrollment.create(inputs, function(args) {
      var arr = args.href.split('/');
      var id = arr.pop();
      setEnrollmentId(id);
      done();
    }, null);
  } else {
    done();
  }
}

function checkEnrollmentExistIfNotAddItAndFinish(done) {
  if ("" != enrollmentId) {
    var inputs = {};

    //inputs.consumerId = consumerId;
    //inputs.applicationId = modelId;

    inputs.enrollmentUrl = wav;

    var enrollMentIntervalArr = [];
    var enrollMentInterval = {};
    enrollMentInterval.phrase = vocabulary[0];
    enrollMentInterval.start = 600;
    enrollMentInterval.stop = 1500;
    enrollMentIntervalArr[enrollMentIntervalArr.length] = enrollMentInterval;

    var enrollMentInterval1 = {};
    enrollMentInterval1.phrase = vocabulary[1];
    enrollMentInterval1.start = 1600;
    enrollMentInterval1.stop = 2300;
    enrollMentIntervalArr[enrollMentIntervalArr.length] = enrollMentInterval1;

    var enrollMentInterval2 = {};
    enrollMentInterval2.phrase = vocabulary[2];
    enrollMentInterval2.start = 2400;
    enrollMentInterval2.stop = 3010;
    enrollMentIntervalArr[enrollMentIntervalArr.length] = enrollMentInterval2;

    inputs.intervals = enrollMentIntervalArr;

    inputs.enrollmentId = enrollmentId;

    KnurldSDK.enrollment.create(inputs, function(args) {
      var arr = args.href.split('/');
      var id = arr.pop();
      setEnrollmentId(id);
      done();
    }, done);
  } else {
    done();
  }
}

function checkEnrollmentExistAndCompleted(done) {
  var inputs = {};
  //pausecomp(2000);
  inputs.enrollmentId = enrollmentId;
  KnurldSDK.enrollment.get(inputs, function(response) {
    if ("completed" == response.status) {
      done();
    }
  }, function(response) {});
  done();
}

function checkVerificationExistIfNotAddIt(done) {
  if ("" == verificationId) {
    var inputs = {};

    inputs.consumerId = consumerId;
    inputs.applicationId = modelId;

    KnurldSDK.verification.create(inputs, function(args) {
      var arr = args.href.split('/');
      var id = arr.pop();
      setVerificationId(id);
      done();
    }, null);
  } else {
    done();
  }
}

function checkCallExistIfNotAddIt(done) {
  if ("" == callId) {
    var inputs = {};

    inputs.number = number;

    KnurldSDK.call.create(inputs, function(args) {
      var arr = args.href.split('/');
      var id = arr.pop();
      setCallId(id);
      done();
    }, null);
  } else {
    done();
  }
}


function checkAnalyticsExistIfNotAddIt(done) {
  if ("" == analyticsId) {
    var inputs = {};

    var inputs = {};
    inputs.audioUrl = wav;

    KnurldSDK.analytics.url(inputs, function(args) {
      setAnyticsId(args.taskName);
      done();
    }, null);
  } else {
    done();
  }
}

function pausecomp(millis) {
  var date = new Date();
  var curDate = null;
  do {
    curDate = new Date();
  }
  while (curDate - date < millis);
}
