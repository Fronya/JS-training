/**
 * Reverse string
 * 
 * @param  {string} str input string
 * @return {string}     reverse string
 */
var reverse = function(str) {
	var newStr;

	for (var i = str.length - 1; i >= 0; i--) {
		newStr += str[i];
	}
	return newStr;
};
console.log("Reverse string:");
console.log(reverse("Hello world\n"));


/**
 * This function tests if this string ends with the specified suffix
 * 
 * @param  {string} str    input string
 * @param  {string} suffix suffix
 * @return {boolean}       return true if string ends with the suffix; 
 *                                false otherwise
 */
var endWith = function(str, suffix) {
	var indStart = str.length - suffix.length;
	if(indStart < 0){
		return false;
	}

	if(str.slice(indStart) === suffix){
		return true;
	}else{
		return false;
	}
};
console.log("\nEnd with:");
console.log(endWith("Hello world", "world"));
console.log(endWith("Hello world", "Hello my world"));
console.log(endWith("Hello world", "lord"));


/**
 * This function tests if this string begins with the specified suffix
 * 
 * @param  {string} str    input string
 * @param  {string} suffix suffix
 * @return {boolean}       return true if string begins with the suffix; 
 *                                false otherwise
 */
var startWith = function(str, suffix) {
	var indEnd = suffix.length;
	if(indEnd > str.length){
		return false;
	}

	if(str.slice(0, indEnd) === suffix){
		return true;
	}else{
		return false;
	}
};
console.log("\nStart with:");
console.log(startWith("hello world", "hello"));
console.log(startWith("hello world", "hello my world"));
console.log(startWith("hello world", "helo"));


/**
 * This function tests if this in camel case
 * 
 * @param  {string} str input string
 * @return {boolean}    return true if string in camelCase; 
 *                           false otherwise
 */
var camelCase = function(str) {
	var regexp = /^[A-Z]([A-Z0-9]*[a-z][a-z0-9]*[A-Z]|[a-z0-9]*[A-Z][A-Z0-9]*[a-z])[A-Za-z0-9]*$/;
	return regexp.test(str);
};
console.log("\nCamel case:");
console.log(camelCase("HelloWorld"));
console.log(camelCase("helloWorld"));
console.log(camelCase("Hello World"));


/**
 * This function tests if this in under score
 * 
 * @param  {string} str input string
 * @return {boolean}    return true if string in under_score; 
 *                           false otherwise
 */
var underScore = function(str) {
	var regexp = /^[a-z0-9_]*$/;
	return regexp.test(str);
};
console.log("\nUnder score:");
console.log(underScore("hello_world"));
console.log(underScore("helloWorld"));
console.log(underScore("hello_World"));