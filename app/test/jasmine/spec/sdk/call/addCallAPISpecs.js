/***
 **/
describe("Test call API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(done);
	});

	var call1 = it("Test - add call", function(done) {
		log(call1.description);
		var inputs = {};

		inputs.number = number;

		KnurldSDK.call.create(inputs, function(args) {
			printResponse(args);
			expect(args.href).toBeDefined();

			var arr = args.href.split('/');
			var id = arr.pop();
			setCallId(id);
			expect(true).toBe(true);
			done();
		}, function(args) {
			printResponse(args);
			expect(true).toBe(false);
			done();
		});
	});

	var call2 = it("Test - add call neg", function(done) {
		log(call2.description);
		var inputs = {};
		inputs.number = "";

		KnurldSDK.call.create(inputs, function(args) {
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
