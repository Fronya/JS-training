var STKit = (function(){
	/**
	 * Get memoized version of any function
	 * @param  {function} func any function
	 * @return {function}      memoized function
	 */
	function memoize(func) {
	  var cache = [];
	  var slice = Array.prototype.slice;

	  return function() {
	    var args = slice.call(arguments);

	    if (args in cache){
	    	console.log('Cache hit for '+args);
	     	return cache[args];
	    }
	    else{
	    	console.log('Cache miss for '+args);
	      	return (cache[args] = func.apply(this, args));
	    }
	  };
	}

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

	function readyInputString(input){
		var i = 0;

		String.prototype.replaceAt=function(index, character) {
	    	return this.substr(0, index) + character + this.substr(index+character.length);
		};

		while(i < input.length){
			if(input.charAt(i) === '|'){
				do{
					i++;
					if(input.charAt(i) === ';'){
						input = input.replaceAt(i, '@');
					}
					if(input.charAt(i) === ','){
						input = input.replaceAt(i, '#');
					}
				}while(input.charAt(i) != '|');
			}
			i++;
		}
		console.log("input text = " + input);
		return input;
	}


	function readyFunctionString(input){
		input = input.replace('#', ',');
		return input.replace('@', ';');
	}


	/**
	 * SemiColonSON with method
	 * 
	 * @param  {string} text input text
	 * @return {obj}         ready object
	 */
	function semiColonSONMethod(text) {
		var obj = {};
		var inputText = readyInputString(text);
		var properties = inputText.split(';');
		var prop;
		var array;
		var arrayObj;
		var regexp = /\|.*?\|/;
		var regexpFun = /\(.*?\)/;
		var regexpFunBody = /\{.*?\}/;
		var funString, argString, argArray;
		
		for (var i = 1; i < properties.length - 1; i++) {
			array = properties[i].split(':');
			if(array.length == 1){
				prop = properties[i].split(',');

				if(regexp.test(prop[1])){
					funString = regexp.exec(prop[1]).input;
					funString = funString.slice(1, -1);
					funString = readyFunctionString(funString);
					if(regexpFun.test(funString)){

						argString = regexpFun.exec(funString)[0];
						argString = argString.slice(1, -1);

						argArray = [];
						argArray.push(Function);
						if(argString.indexOf(',') != -1){
							argArray.push(argString.split(','));
						}else{
							argArray.push(argString);
						}
						argArray.push(regexpFunBody.exec(funString)[0].slice(1, -1));
						obj[prop[0]] = new (Function.bind.apply(Function, argArray));
					}else{
						obj[prop[0]] = new Function(funString);
					}
				}else{
					obj[prop[0]] = prop[1];
				}
			}else{
				arrayObj = [];
				arrayObj = createObj(arrayObj, array[1]);
				i++;
				while(i < properties.length - 1){
					prop = properties[i].split(',');
					arrayObj = createObj(arrayObj, properties[i]);
					i++;
				}
				obj[array[0]] = arrayObj;
			}
		}
		return obj;
	}


	function createObj(array, str){
		var obj = {};
		var property = str.split(',');
		obj[property[0]] = property[1];
		array.push(obj);
		return array;
	}


	return{
		memoizer: memoize,
		checkArray: checkArray,
		debehaviorize: debehaviorize,
		reverseDebehaviorize: reverseDebehaviorize,
		semiColonSON: semiColonSONMethod
	};
})();

var memoizeFun = STKit.memoizer(function(a){return a * 2;});
var obj1 = {a:123, b:"Hello", c:memoizeFun};
var obj2 = STKit.debehaviorize(obj1);
console.log(obj2);