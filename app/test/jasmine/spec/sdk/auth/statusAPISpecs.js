/***
 **/
describe("Test Status API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(done);
	});

	var statusTest = it("Test - status API", function(done) {
		log(statusTest.description);

		KnurldSDK.auth.status(function(args) {
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
