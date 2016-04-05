/***
 **/
describe("Test get verification API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkConsumerExistIfNotAddIt(done);
		});
	});
	var verification = it("Test get verification API", function(done) {
		log(verification.description);

		var inputs = {};
		inputs.verificationId = verificationId;

		KnurldSDK.verification.get(inputs, function(args) {
			printResponse(args);
			expect(true).toBe(true);
			done();
		}, function(args) {
			printResponse(args);
			expect(true).toBe(false);
			done();
		});
	});

});
