/***
 **/
describe("Test get customer API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkConsumerExistIfNotAddIt(done);
		});
	});
	var consumer = it("Test get customer APIl", function(done) {
		log(consumer.description);

		var inputs = {};
		inputs.consumerId = consumerId;

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
