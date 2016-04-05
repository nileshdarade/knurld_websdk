/***
 **/
describe("Test accesstoken API", function() {
  beforeEach(function() {

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

  var accessTokenPositiveTest = it(
    "Test - Test accesstoken async API invalid client_secret client_id",
    function(done) {
      log(accessTokenPositiveTest.description);
      var inputs = {};
      inputs.client_id = "abc";
      inputs.client_secret = client_secret;
      KnurldSDK.auth.accesstoken(inputs, function(
        args) {
        printResponse(args);
        expect(true).toBe(false);
        done();
      }, function(args) {
        printResponse(args);
        expect(args.Error).toBe("ClientId is Invalid");
        expect(args.ErrorCode).toBe("invalid_client");
        expect(args.StatusCode).toBe(401);

        expect(true).toBe(true);
        done();
      });
    });

  var accessTokenPositiveTest = it(
    "Test - Test accesstoken async API invalid client_secret",
    function(done) {
      var inputs = {};
      inputs.client_id = client_id;
      inputs.client_secret = "abc";
      KnurldSDK.auth.accesstoken(inputs, function(
        args) {
        printResponse(args);
        expect(true).toBe(false);
        done();
      }, function(args) {
        printResponse(args);
        expect(args.Error).toBe("Client credentials are invalid");
        expect(args.ErrorCode).toBe("invalid_client");
        expect(args.StatusCode).toBe(401);

        expect(true).toBe(true);
        done();
      });
    });

});
