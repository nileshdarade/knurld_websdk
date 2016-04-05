/***
 **/
describe("Test doVerification API", function() {
  beforeEach(function(done) {
    verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
      checkConsumerExistIfNotAddIt(done);
    });
  });
  var doVerification = it(

    "Test - doVerification",
    function(done) {

      log(doVerification.description);
      var inputs = {};
      inputs.verificationUrl = verificationWav;

      var verificationArr = [];
			intervalForVerification = '[{"start":573,"stop":1582},{"start":1653,"stop":2453},{"start":2503,"stop":3483}]';
      intervalForVerification=eval(intervalForVerification);
      for (i = 0; i < intervalForVerification.length; i++) {
        var verification = {};
        verification["phrase"] = verificationVocabulary[i];
        verification["start"] = intervalForVerification[i].start;
        if (intervalForVerification[i].stop - intervalForVerification[i].start < 600 && fixBadGateWayError) {
          intervalForVerification[i].stop = intervalForVerification[i].start + 601;
        }
        verification["stop"] = intervalForVerification[i].stop;
        verificationArr[verificationArr.length] = verification;
      }

      inputs.intervals = verificationArr;

      inputs.verificationId = verificationId;

      KnurldSDK.verification.update(inputs, function(args) {
        printResponse(args);
        expect(args.href).toBeDefined();
        //pausecomp(5000);

        expect(true).toBe(true);
        done();
      }, function(args) {
        printResponse(args);
        expect(true).toBe(false);
        done();
      });
    });
});
