

/**
 * @author ndarade
 *
 */

var KnurldResponse = KnurldResponse || {};
/**
 * [function description]
 * @param  {[type]} value  [description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
KnurldResponse.invalidInputResponse = function(value, params) {
	var response = {};
	response.StatusCode = 400;
	response.errorMessage = 'input param:' + value + ' is missing';
	if (!params.asyc) {
		params.errorCallBack(response);
		return;
	}
	return response;
};
