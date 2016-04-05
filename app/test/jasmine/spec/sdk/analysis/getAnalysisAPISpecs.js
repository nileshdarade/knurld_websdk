/***
 **/
describe("Test get analytics URL API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkAnalyticsExistIfNotAddIt(done);
		});
	});

	var analytics = it("Test analytics", function(done) {
		log(analytics.description);

		var inputs = {};
		inputs.id = analyticsId;

		KnurldSDK.analytics.get(inputs, function(args) {
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
