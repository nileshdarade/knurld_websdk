/***
 **/
describe(
		"Test update enrollment API",
		function() {
			beforeEach(function(done) {
				verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
					checkAppModelExistIfNotAddIt(function() {
						checkConsumerExistIfNotAddIt(function() {
							checkEnrollmentExistIfNotAddIt(done);
						});
					});
				});
			});
			var enrollment = it(

					"Test - enrollment",
					function(done) {

						log(enrollment.description);
						var inputs = {};
						inputs.enrollmentUrl = wav;

						var enrollMentIntervalArr = [];
						var enrollMentInterval = {};
						enrollMentInterval.phrase = vocabulary[0];
						enrollMentInterval.start = 600;
						enrollMentInterval.stop = 1500;
						enrollMentIntervalArr[enrollMentIntervalArr.length] = enrollMentInterval;

						var enrollMentInterval1 = {};
						enrollMentInterval1.phrase = vocabulary[1];
						enrollMentInterval1.start = 1600;
						enrollMentInterval1.stop = 2300;
						enrollMentIntervalArr[enrollMentIntervalArr.length] = enrollMentInterval1;

						var enrollMentInterval2 = {};
						enrollMentInterval2.phrase = vocabulary[2];
						enrollMentInterval2.start = 2400;
						enrollMentInterval2.stop = 3010;
						enrollMentIntervalArr[enrollMentIntervalArr.length] = enrollMentInterval2;

						inputs.intervals = enrollMentIntervalArr;

						inputs.enrollmentId = enrollmentId;
						KnurldSDK.enrollment.update(inputs, function(args) {
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

		});
