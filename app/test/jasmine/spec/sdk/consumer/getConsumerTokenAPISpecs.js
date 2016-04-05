/***
 **/
describe("Test consumers token API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkConsumerExistIfNotAddIt(done);
		});
	});

	var consumers = it("Test  get consumer token", function(done) {
		log(consumers.description);

		var inputs = {};
    inputs.username=username;
    inputs.password=password;

		KnurldSDK.consumer.token(inputs, function(args) {
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
