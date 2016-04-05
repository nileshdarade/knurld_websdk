/***
 **/
describe("Test post analytics URL API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(done);
	});

	var analytics = it("Test analytics post url", function(done) {
		log(analytics.description);

		var inputs = {};
		inputs.audioUrl = wav;

		KnurldSDK.analytics.url(inputs, function(args) {
			printResponse(args);
			expect(true).toBe(true);
			setAnyticsId(args.taskName);
			done();
		}, function(args) {
			printResponse(args);
			expect(true).toBe(false);
			done();
		});
	});

	var analytics1 = it("Test analytics post url", function(done) {
		log(analytics1.description);

		var inputs = {};
		inputs.audioUrl = wav;
		inputs.num_words = 1;

		KnurldSDK.analytics.url(inputs, function(args) {
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
