/***
 **/
describe("Test get all consumers API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkConsumerExistIfNotAddIt(done);
		});
	});

	var consumers = it("Test = get consumers", function(done) {
		log(consumers.description);

		var inputs = {};

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
