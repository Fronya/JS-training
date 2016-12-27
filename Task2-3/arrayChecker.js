var arrayCheckerModule = (function(){
	
	/**
	 * Function check is a array
	 * @param  {object} obj  any object
	 * @return {boolean}     return true if object is a array;
	 *                              false otherwise
	 */
	function checkArray(obj){
		if(obj instanceof Array){
			return true;
		}
		return false;
	}

	/**
	 * Test array checker
	 */
	function testChecker(){
		console.log(checkArray([]));
		console.log(checkArray(1));
		console.log(checkArray(undefined));
		console.log(checkArray([1, 5, 'Hi']));
	}

	return{
		test: testChecker
	};
})();

arrayCheckerModule.test();