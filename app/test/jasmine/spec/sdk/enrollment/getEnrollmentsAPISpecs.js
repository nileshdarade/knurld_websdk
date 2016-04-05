/***
 **/
describe("Test get all enrollment API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkAppModelExistIfNotAddIt(function() {
				checkConsumerExistIfNotAddIt(function() {
					checkEnrollmentExistIfNotAddIt(done);
				});
			});
		});
	});

	var enrollment = it("Test get enrollment", function(done) {
		log(enrollment.description);

		var inputs = {};
		inputs.enrollmentId = enrollmentId;
		KnurldSDK.enrollment.get(inputs, function(args) {
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
