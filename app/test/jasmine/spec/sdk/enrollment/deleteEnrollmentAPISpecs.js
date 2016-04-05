consumerId/***
 **/
describe("Test delete enrollment API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkAppModelExistIfNotAddIt(function() {
				checkConsumerExistIfNotAddIt(function() {
					checkEnrollmentExistIfNotAddIt(done);
				});
			});
		});
	});
	var delEnrollment = it("Delete enrollment", function(done) {
		log(delEnrollment.description);

		var inputs = {};
		inputs.enrollmentId = enrollmentId;

		KnurldSDK.enrollment.del(inputs, function(args) {
			printResponse(args);
			expect(true).toBe(true);
			setEnrollmentId("");
			done();
		}, function(args) {
			printResponse(args);
			expect(true).toBe(false);
			done();
		});
	});

});
