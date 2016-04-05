/***
 **/
describe("Test add consumer API", function() {
	beforeEach(function(done) {
		verifyAccessTokenIfNotPresentLoginAndGetOne(done);
	});

	var addConsumer1 = it(
			"Test - add consumer", function(done) {
				log(addConsumer1.description);
				var inputs = {};
				var d = new Date();

				username = "knurldUser" + d.getTime();
				inputs.Gender = Gender;
				inputs.username = username;
				inputs.password = password;

				KnurldSDK.consumer.create(inputs, function(args) {
					printResponse(args);
					expect(args.href).toBeDefined();

				    var arr = args.href.split( '/' );
				    custId = arr.pop();
				    setCustomerId(custId);
					expect(true).toBe(true);
					done();
				}, function(args) {
					printResponse(args);
					expect(true).toBe(false);
					done();
				});
			});

	var addConsumer2 = it(
			"Test - add consumer neg", function(done) {
				log(addConsumer2.description);
				var inputs = {};
				inputs.Gender = "";
				inputs.username = username;
				inputs.password = password;

				KnurldSDK.consumer.create(inputs, function(args) {
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

	var addConsumer3 = it(
			"Test - add consumer with same id", function(done) {
				log(addConsumer3.description);
				var inputs = {};
				inputs.Gender = "M";
				inputs.username = username;
				inputs.password = password;

				KnurldSDK.consumer.create(inputs, function(args) {
					printResponse(args);
					expect(true).toBe(false);
					done();
				}, function(args) {
					printResponse(args);
					expect(args.StatusCode).toBe(409);
					expect(true).toBe(true);
					done();
				});
			});
});
