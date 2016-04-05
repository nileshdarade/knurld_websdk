/***
 **/
describe("Test add enrollment API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkAppModelExistIfNotAddIt(function() {
				checkConsumerExistIfNotAddIt(done);
			});
		});
	});

	var addEnrollment1 = it("Test - add enrollment", function(done) {
		log(addEnrollment1.description);
		var inputs = {};

		inputs.consumerId = consumerId;
		inputs.applicationId = modelId;

		KnurldSDK.enrollment.create(inputs, function(args) {
			printResponse(args);
			expect(args.href).toBeDefined();

			var arr = args.href.split('/');
			var endId = arr.pop();
			setEnrollmentId(endId);
			expect(true).toBe(true);
			done();
		}, function(args) {
			printResponse(args);
			expect(true).toBe(false);
			done();
		});
	});

	var addEnrollment2 = it("Test - add enrollment neg", function(done) {
		log(addEnrollment2.description);
		var inputs = {};
		inputs.consumer = "";
		inputs.application = modelId;

		KnurldSDK.enrollment.create(inputs, function(args) {
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
