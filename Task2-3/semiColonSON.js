var semiColonSONModule = (function(){

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
					} else if(input.charAt(i) === ','){
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


	function testSemiColonSON(){
		var data = ";key,value;key1,value;methodName,|return true|;methodName1,|function (a) {return a + 1;}|;methodName2,|function (a,b) { return a + b; }|;arrayHere:k1,v1;k2,v2;k3,v3;";
		var semiObj = semiColonSONMethod(data);
		console.log(semiObj);
		console.log(semiObj.methodName());
		console.log(semiObj.methodName1(1));
		console.log(semiObj.methodName2(2, 3));
	}

	return{
		test: testSemiColonSON
	};

})();

semiColonSONModule.test();