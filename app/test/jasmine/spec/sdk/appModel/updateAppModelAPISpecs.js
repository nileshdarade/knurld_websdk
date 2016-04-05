/***
 **/
describe("Test updateDataModel API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkAppModelExistIfNotAddIt(done);
		});
	});
	var updateDataModel1 = it(
			"Test -updateDataModel for valid ", function(done) {
				log(updateDataModel1.description);
				var inputs = {};

				inputs.enrollmentRepeats = enrollmentRepeats-1;
				//inputs.vocabulary = vocabulary;
				inputs.verificationLength = verificationLength-1;
				inputs.appModelId=modelId;
				inputs.threshold=threshold;
				KnurldSDK.appModel.update(inputs, function(args) {
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

	var updateDataModel2 = it(
			"Test -updateDataModel for Invalid ", function(done) {
				log(updateDataModel2.description);
				var inputs = {};

				inputs.enrollmentRepeats = 0;
				inputs.vocabulary = vocabulary;
				inputs.verificationLength = verificationLength;
				inputs.appModelId=modelId;

				KnurldSDK.appModel.update(inputs, function(args) {
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
