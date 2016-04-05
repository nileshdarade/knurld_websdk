/***
 **/
describe("Test get call API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkCallExistIfNotAddIt(done);
		});
	});
	var call = it("Test get call APIl", function(done) {
		log(call.description);

		var inputs = {};
		inputs.callId = callId;

		KnurldSDK.consumer.get(inputs, function(args) {
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
