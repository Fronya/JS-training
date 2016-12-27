var debehaviorizeModule = (function(){

	/**
	 * Function receive object as argument, and remove any behavior related properties from it.
	 * Or return array with all behavior 
	 * @param  {object}         complicatedObject  object
	 * @param  {Boolean}        isBehaviorSeparate boolean
	 * @return {object/array}        return array of behavior if isBehaviorSeparate is true;
	 *                    				object otherwise
	 */
	function debehaviorize(complicatedObject, isBehaviorSeparate){
		if(isBehaviorSeparate === true){
			return getArrayBehavior(complicatedObject);
		}else{
			return getStateObject(complicatedObject);
		}
	}


	function getStateObject(complicatedObject){
		var newObj = {};

		for(var prop in complicatedObject){
			switch(typeof complicatedObject[prop]){
				case "object":
					newObj[prop] = getStateObject(complicatedObject[prop]);
					break;
				case "function":
					break;
				default:
					newObj[prop] = complicatedObject[prop];
					break;
			}
		}
		return newObj;
	}


	function getArrayBehavior(complicatedObject){
		var arrayBehavior = [];

		for(var behavior in complicatedObject){
			switch(typeof complicatedObject[behavior]){
				case "object":
					arrayBehavior = arrayBehavior.concat(
						getArrayBehavior(complicatedObject[behavior]));
					break;
				case "function":
					arrayBehavior.push(complicatedObject[behavior]);
					delete complicatedObject[behavior];
					break;
			}
		}
		return arrayBehavior;
	}

	/**
	 * Function reverse debehaviorize
	 * @param  {object}         complicatedObject  object
	 * @param  {Boolean}        isPropSeparate     boolean
	 * @return {object/array}        return array of properties if isPropSeparate is true;
	 *                    				object otherwise
	 */
	function reverseDebehaviorize(complicatedObject, isPropSeparate){
		if(isPropSeparate === true){
			return getArrayProp(complicatedObject);
		}else{
			return getBehaviorObject(complicatedObject);
		}
	}

	function getBehaviorObject(complicatedObject){
		var newObj = {};

		for(var prop in complicatedObject){
			switch(typeof complicatedObject[prop]){
				case "object":
					newObj[prop] = getBehaviorObject(complicatedObject[prop]);
					break;
				case "function":
					newObj[prop] = complicatedObject[prop];
					break;
			}
		}
		return newObj;
	}


	function getArrayProp(complicatedObject){
		var arrayProp = [];

		for(var prop in complicatedObject){
			switch(typeof complicatedObject[prop]){
				case "object":
					arrayProp = arrayProp.concat(
						getArrayProp(complicatedObject[prop]));
					break;
				case "function":
					break;
				default:
					arrayProp.push(complicatedObject[prop]);
					delete complicatedObject[prop];
					break;
			}
		}
		return arrayProp;
	}

	/**
	 * Test module
	 */
	function testDebehaviorize(){
		function factorial(n) {
		    var res = 1;
		    while(n !== 1) {
		        res *= n--;
		    }
		    return res;
		}

		var obj1 = {a:123, b:"Hello", c:factorial};
		var obj2 = {a:123, b:"Hello", c:factorial, e:obj1};
		console.log("State object:");
		console.log(debehaviorize(obj2));

		console.log("Array of behavior:");
		console.log(debehaviorize(obj2, true));
		console.log(obj2);

		var obj3 = {a:123, b:"Hello", c:factorial};
		var obj4 = {a:123, b:"Hello", c:factorial, e:obj3};
		console.log("\nBevavior object:");
		console.log(reverseDebehaviorize(obj4));

		console.log("Array of properties:");
		console.log(reverseDebehaviorize(obj4, true));
		console.log(obj4);
	}


	return{
		test: testDebehaviorize
	};
})();

debehaviorizeModule.test();