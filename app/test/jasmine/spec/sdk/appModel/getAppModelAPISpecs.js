/***
 **/
describe("Test get app model API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkAppModelExistIfNotAddIt(done);
		});
	});

	var getAppModel = it("Test = get app model", function(done) {
		log(getAppModel.description);

		var inputs = {};
		inputs.appModelId = modelId;

		KnurldSDK.appModel.get(inputs, function(args) {
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
