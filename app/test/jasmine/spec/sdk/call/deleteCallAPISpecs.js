consumerId/***
 **/
describe("Test delete call API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkCallExistIfNotAddIt(done);
		});
	});
	var deletecall = it("Delete call", function(done) {
		log(deletecall.description);

		var inputs = {};
		inputs.callId = callId;

		KnurldSDK.call.del(inputs, function(args) {
			printResponse(args);
			expect(true).toBe(true);
			setCallId("");
			done();
		}, function(args) {
			printResponse(args);
			expect(true).toBe(false);
			done();
		});
	});

});
