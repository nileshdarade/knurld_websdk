/***
 **/
describe("Test update call API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkCallExistIfNotAddIt(done);
		});
	});
	var call1 = it("Test - call", function(done) {

		log(call1.description);
		var inputs = {};
		inputs.callId = callId;

		KnurldSDK.call.update(inputs, function(args) {
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

});
