/***
 **/
describe("Test verification flow API", function() {
  beforeEach(function() {
    //jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

  });

  var accessTokenPositiveTest = it(
    "Test - Test accesstoken async API valid creds",
    function(done) {
      log(accessTokenPositiveTest.description);
      var inputs = {};
      inputs.client_id = client_id;
      inputs.client_secret = client_secret;
      KnurldSDK.auth.accesstoken(inputs, function(
        args) {
        printResponse(args);
        expect(true).toBe(true);
        done();
      }, function(args) {
        printResponse(args);
        expect(true).toBe(false);
        done();
      });
    });

  var addAppModelAPISpec1 = it(
    "Test - add APP model API spec",
    function(done) {
      log(addAppModelAPISpec1.description);
      var inputs = {};

      inputs.enrollmentRepeats = enrollmentRepeats;
      inputs.vocabulary = vocabulary;
      inputs.verificationLength = verificationLength;

      KnurldSDK.appModel.create(inputs, function(args) {
        printResponse(args);
        expect(args.href).toBeDefined();

        var arr = args.href.split('/');
        modelId = arr.pop();
        setModelId(modelId);
        expect(true).toBe(true);
        done();
      }, function(args) {
        printResponse(args);
        expect(true).toBe(false);
        done();
      });
    });

  var addConsumer1 = it(
    "Test - add consumer",
    function(done) {
      log(addConsumer1.description);
      var inputs = {};
      var d = new Date();

      username = "knurldUser" + d.getTime();
      inputs.Gender = Gender;
      inputs.username = username;
      inputs.password = password;

      KnurldSDK.consumer.create(inputs, function(args) {
        printResponse(args);
        expect(args.href).toBeDefined();

        var arr = args.href.split('/');
        custId = arr.pop();
        setCustomerId(custId);
        expect(true).toBe(true);
        done();
      }, function(args) {
        printResponse(args);
        expect(true).toBe(false);
        done();
      });
    });


  var addEnrollment1 = it("Test - add enrollment", function(done) {
    log(addEnrollment1.description);
    var inputs = {};

    inputs.consumerId = consumerId;
    inputs.applicationId = modelId;

    KnurldSDK.enrollment.create(inputs, function(args) {
      printResponse(args);
      expect(args.href).toBeDefined();

      var arr = args.href.split('/');
      var endId = arr.pop();
      setEnrollmentId(endId);
      expect(true).toBe(true);
      done();
    }, function(args) {
      printResponse(args);
      expect(true).toBe(false);
      done();
    });
  });


  var analytics = it("Test analytics post url", function(done) {
    log(analytics.description);

    var inputs = {};
    inputs.audioUrl = wav;

    KnurldSDK.analytics.url(inputs, function(args) {
      printResponse(args);
      expect(true).toBe(true);
      //pausecomp(3000);
      setAnyticsId(args.taskName);
      done();
    }, function(args) {
      printResponse(args);
      expect(true).toBe(false);

      done();
    });
  });

  var analytics = it("Test analytics", function(done) {
    log(analytics.description);

    var inputs = {};
    inputs.id = analyticsId;

    KnurldSDK.analytics.get(inputs, function(args) {
      printResponse(args);
      if (args.taskStatus == "completed") {
        intervalForEnrollment = args.intervals;
      }
      expect(true).toBe(true);

      done();
    }, function(args) {
      printResponse(args);
      expect(true).toBe(false);
      done();
    });
  });


  var enrollment = it(

    "Test - enrollment",
    function(done) {

      log(enrollment.description);
      var inputs = {};
      inputs.enrollmentUrl = wav;

      var enrollMentIntervalArr = [];
      var enrollMentInterval = {};
      enrollMentInterval["phrase"] = vocabulary[0];
      if (intervalForEnrollment[0].stop - intervalForEnrollment[0].start < 600 && fixBadGateWayError) {
        intervalForEnrollment[0].stop = intervalForEnrollment[0].start + 601;
      }
      enrollMentInterval["start"] = intervalForEnrollment[0].start;
      enrollMentInterval["stop"] = intervalForEnrollment[0].stop;
      enrollMentIntervalArr[enrollMentIntervalArr.length] = enrollMentInterval;

      var enrollMentInterval1 = {};
      enrollMentInterval1["phrase"] = vocabulary[1];
      if (intervalForEnrollment[3].stop - intervalForEnrollment[3].start < 600 && fixBadGateWayError) {
        intervalForEnrollment[3].stop = intervalForEnrollment[3].start + 601;
      }
      enrollMentInterval1["start"] = intervalForEnrollment[3].start;
      enrollMentInterval1["stop"] = intervalForEnrollment[3].stop;
      enrollMentIntervalArr[enrollMentIntervalArr.length] = enrollMentInterval1;

      var enrollMentInterval2 = {};
      enrollMentInterval2["phrase"] = vocabulary[2];
      if (intervalForEnrollment[6].stop - intervalForEnrollment[6].start < 600 && fixBadGateWayError) {
        intervalForEnrollment[6].stop = intervalForEnrollment[6].start + 601;
      }

      enrollMentInterval2["start"] = intervalForEnrollment[6].start;
      enrollMentInterval2["stop"] = intervalForEnrollment[6].stop;
      enrollMentIntervalArr[enrollMentIntervalArr.length] = enrollMentInterval2;

      inputs.intervals = enrollMentIntervalArr;

      inputs.enrollmentId = enrollmentId;
      KnurldSDK.enrollment.create(inputs, function(args) {
        printResponse(args);
        expect(args.href).toBeDefined();
        expect(true).toBe(true);
        done();
      }, function(args) {
        printResponse(args);
        expect(true).toBe(false);
        done();
      });
    });


  var enrollment = it("Test get enrollment for verification 1", function(done) {
    log(enrollment.description);

    var inputs = {};
    inputs.enrollmentId = enrollmentId;
    KnurldSDK.enrollment.get(inputs, function(args) {
      printResponse(args);
      expect(true).toBe(true);
      done();
    }, function(args) {
      printResponse(args);
      expect(true).toBe(false);
      done();
    });
  });

  var enrollment = it("Test get enrollment for verification 2", function(done) {
    log(enrollment.description);

    var inputs = {};
    inputs.enrollmentId = enrollmentId;
    KnurldSDK.enrollment.get(inputs, function(args) {
      printResponse(args);
      expect(true).toBe(true);
      done();
    }, function(args) {
      printResponse(args);
      expect(true).toBe(false);
      done();
    });
  });

  // var addVerification1 = it("Test - add verification", function(done) {
  //   log(addVerification1.description);
  //   var inputs = {};
  //
  //   inputs.consumerId = consumerId;
  //   inputs.applicationId = modelId;
  //
  //   KnurldSDK.verification.create(inputs, function(args) {
  //     printResponse(args);
  //     expect(args.href).toBeDefined();
  //
  //     var arr = args.href.split('/');
  //     var id = arr.pop();
  //     setVerificationId(id);
  //     expect(true).toBe(true);
  //     done();
  //   }, function(args) {
  //     printResponse(args);
  //     expect(true).toBe(false);
  //     done();
  //   });
  // });

  var analytics = it("Test analytics post url", function(done) {
    log(analytics.description);

    var inputs = {};
    inputs.audioUrl = verificationWav;

    KnurldSDK.analytics.url(inputs, function(args) {
      printResponse(args);
      expect(true).toBe(true);
      //pausecomp(10000);
      setAnyticsId(args.taskName);
      done();
    }, function(args) {
      printResponse(args);
      expect(true).toBe(false);
      done();
    });
  });

  var analytics1 = it("Test analytics", function(done) {
    log(analytics1.description);

    var inputs = {};
    inputs.id = analyticsId;

    KnurldSDK.analytics.get(inputs, function(args) {
      printResponse(args);
      if (args.taskStatus == "completed") {
        intervalForVerification = args.intervals;
      }
      expect(true).toBe(true);
      done();
    }, function(args) {
      printResponse(args);
      expect(true).toBe(false);
      done();
    });
  });

  // var doVerification = it(
  //
  //   "Test - doVerification",
  //   function(done) {
  //
  //     log(doVerification.description);
  //     var inputs = {};
  //     inputs.verificationUrl = verificationWav;
  //
  //     var verificationArr = [];
  //
  //     for (i = 0; i < intervalForVerification.length; i++) {
  //       var verification = {};
  //       verification["phrase"] = verificationVocabulary[i];
  //       verification["start"] = intervalForVerification[i].start;
  //       if (intervalForVerification[i].stop - intervalForVerification[i].start < 600 && fixBadGateWayError) {
  //         intervalForVerification[i].stop = intervalForVerification[i].start + 601;
  //       }
  //       verification["stop"] = intervalForVerification[i].stop;
  //       verificationArr[verificationArr.length] = verification;
  //     }
  //     inputs.intervals = verificationArr;
  //
  //     inputs.verificationId = verificationId;
  //
  //     KnurldSDK.verification.create(inputs, function(args) {
  //       printResponse(args);
  //       expect(args.href).toBeDefined();
  //       //pausecomp(3000);
  //
  //       expect(true).toBe(true);
  //       done();
  //     }, function(args) {
  //       printResponse(args);
  //       expect(true).toBe(false);
  //       done();
  //     });
  //   });
  // var verification = it("Test get verification API", function(done) {
  //   log(verification.description);
  //
  //   var inputs = {};
  //   inputs.verificationId = verificationId;
  //
  //   KnurldSDK.verification.get(inputs, function(args) {
  //     printResponse(args);
  //     expect(args.verified).toBe(true);
  //     done();
  //   }, function(args) {
  //     printResponse(args);
  //     expect(true).toBe(false);
  //     done();
  //   });
  // });

});
