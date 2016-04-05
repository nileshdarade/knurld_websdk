/***
 **/
describe("Test add APP model API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(done);
	});

	var addAppModelAPISpec1 = it(
			"Test - add APP model API spec", function(done) {
				log(addAppModelAPISpec1.description);
				var inputs = {};

				inputs.enrollmentRepeats = enrollmentRepeats;
				inputs.vocabulary = vocabulary;
				inputs.verificationLength = verificationLength;

				KnurldSDK.appModel.create(inputs, function(args) {
					printResponse(args);
					expect(args.href).toBeDefined();
				
				    var arr = args.href.split( '/' );
				    modelId = arr.pop();  
				    setModelId(modelId);
					expect(true).toBe(true);
					done();
				}, function(args) {
					printResponse(args);
					expect(true).toBe(false);
					done();
				});
			});

	var addAppModelAPISpec2 = it(
			"Test app model api spec2", function(done) {
				log(addAppModelAPISpec2.description);
				var inputs = {};

				inputs.enrollmentRepeats = "abc";
				inputs.vocabulary = vocabulary;
				inputs.verificationLength = verificationLength;

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
