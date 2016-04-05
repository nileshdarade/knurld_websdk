/***
 **/
describe("Test get all call API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkCallExistIfNotAddIt(done);
		});
	});
	var call = it("Test = get call", function(done) {
		log(call.description);

		var inputs = {};

		KnurldSDK.call.get(inputs, function(args) {
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
