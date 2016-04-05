/***
 **/
describe("Test update consumer API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkConsumerExistIfNotAddIt(done);
		});
	});
	var updateConsumer1 = it(

	"Test - updateConsumer", function(done) {

		log(updateConsumer1.description);
		var inputs = {};
		inputs.consumerId = consumerId;

		inputs.password = password;

		KnurldSDK.consumer.create(inputs, function(args) {
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

	var updateConsumer2 = it("Test - update consumer", function(done) {
		log(updateConsumer2.description);
		var inputs = {};
		inputs.consumerId = consumerId;
		inputs.password = password;
		KnurldSDK.appModel.create(inputs, function(args) {
			printResponse(args);
			expect(true).toBe(false);
			done();
		}, function(args) {
			printResponse(args);
			expect(args.StatusCode).toBe(400);
			expect(true).toBe(true);
			done();
		});
	});
});
