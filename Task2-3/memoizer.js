var memoizeModule = (function(){
	/**
	 * Get factorial
	 * @param  {number} n number
	 * @return {number}   factorial
	 */
	function factorial(n) {
	    var res = 1;
	    while(n !== 1) {
	        res *= n--;
	    }
	    return res;
	}

	/**
	 * Get sum of numbers
	 * @param  {number} a 
	 * @param  {number} b 
	 * @param  {number} c
	 * @return {number}   sum
	 */
	function sum(a, b, c) {
	    return a + b + c;
	}


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
	 * Test memoizer
	 */
	function testMemoize(){
		console.log("Check factorial:");
		var memoizeFactorial = memoize(factorial);
		console.log(memoizeFactorial(3));
		console.log(memoizeFactorial(3));
		console.log(memoizeFactorial(4));

		console.log("\nCheck sum:");
		var memoizeSum = memoize(sum);
		console.log(memoizeSum(2, 5, 3));
		console.log(memoizeSum(2, 5, 3));
		console.log(memoizeSum(5, 7, 9));
	}

	return{
		test:testMemoize
	};

})();

memoizeModule.test();