consumerId/***
 **/
describe("Test delete customer API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkConsumerExistIfNotAddIt(done);
		});
	});
	var delConsumer = it("Delete consumer", function(done) {
		log(delConsumer.description);

		var inputs = {};
		inputs.consumerId = consumerId;

		KnurldSDK.consumer.del(inputs, function(args) {
			printResponse(args);
			expect(true).toBe(true);
			setCustomerId("");
			done();
		}, function(args) {
			printResponse(args);
			expect(true).toBe(false);
			done();
		});
	});

});
