consumerId/***
 **/
describe("Test delete verification API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkAppModelExistIfNotAddIt(function() {
				checkConsumerExistIfNotAddIt(function(){
					checkEnrollmentExistIfNotAddIt(function(){
						checkEnrollmentExistIfNotAddItAndFinish(function(){
							checkVerificationExistIfNotAddIt(done);
						});
					});
				});
			});
		});
	});
	var verification1 = it("Delete verification", function(done) {
		log(verification1.description);

		var inputs = {};
		inputs.verificationId = verificationId;

		KnurldSDK.verification.del(inputs, function(args) {
			printResponse(args);
			expect(true).toBe(true);
			setVerificationId("");
			done();
		}, function(args) {
			printResponse(args);
			expect(true).toBe(false);
			done();
		});
	});

});
