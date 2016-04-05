/***
 **/
describe("Test delete APP data model API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(function() {
			checkAppModelExistIfNotAddIt(done);
		});
	});

	var deleteDataModel = it("Test delete APP data model API positive",
			function(done) {
				log(deleteDataModel.description);
				var inputs = {};
				inputs.appModelId = modelId;
				KnurldSDK.appModel.del(inputs, function(args) {
					printResponse(args);
					setModelId("");
					expect(true).toBe(true);
					done();
				}, function(args) {
					printResponse(args);
					expect(true).toBe(false);
					done();
				});
			});

});
