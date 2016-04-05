/***
 **/
describe("Test get all app model API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkAppModelExistIfNotAddIt(done);
		});
	});

	var getAppModels = it("Test get all app model", function(done) {
		log(getAppModels.description);

		var inputs = {};
		inputs.offset=40;
		inputs.limit=10;
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
