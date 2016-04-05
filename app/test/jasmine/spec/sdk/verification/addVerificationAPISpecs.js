/***
 **/
describe("Test add verification API", function() {
  beforeEach(function(done) {
    verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
      checkAppModelExistIfNotAddIt(function() {
        checkConsumerExistIfNotAddIt(function() {
          checkEnrollmentExistIfNotAddIt(function() {
            checkEnrollmentExistIfNotAddItAndFinish(function() {
              checkEnrollmentExistAndCompleted(function() {
                done();
              });
            });
          });
        });
      });
    });
  });

  var addVerification1 = it("Test - add verification", function(done) {
    log(addVerification1.description);
    var inputs = {};

    inputs.consumerId = consumerId;
    inputs.applicationId = modelId;

    KnurldSDK.verification.create(inputs, function(args) {
      printResponse(args);
      expect(args.href).toBeDefined();

      var arr = args.href.split('/');
      var id = arr.pop();
      setVerificationId(id);
      expect(true).toBe(true);
      done();
    }, function(args) {
      printResponse(args);
      expect(true).toBe(false);
      done();
    });
  });

  var addVerification2 = it("Test - addVerification neg", function(done) {
    log(addVerification2.description);
    var inputs = {};
    inputs.consumer = "";
    inputs.application = modelId;

    KnurldSDK.verification.create(inputs, function(args) {
      printResponse(args);
      expect(true).toBe(false);
      done();
    }, function(args) {
      printResponse(args);
      expect(args.StatusCode).toBe(400);
      expect(true).toBe(true);
      done();
    });
  });

});
