/**
 * Insertion sort
 * 
 * @param  {int[]} array  input array
 * @return {int[]}        sorted array
 */
var insertionSort = function(array){
	var currentValue, j;
	for (var i = 0; i < array.length; i++) {
		currentValue = array[i];

		j = i-1;
		while(j >= 0 && array[j] > currentValue) {
		 	array[j + 1] = array[j];
		 	array[j] = currentValue;
		 	j--;
		} 
	}
	return array;
};
console.log("Insertion sort");
console.log(insertionSort([2, 1, 5, 4, -9]));



/**
 * Swap items
 * 
 * @param  {int[]}  array     input array
 * @param  {int}    indFirst  index first item
 * @param  {int}    indSecond index second item
 * @return {int[]}            array with swap items
 */
var swap = function(array, indFirst, indSecond){
    var temp = array[indFirst];
    array[indFirst] = array[indSecond];
    array[indSecond] = temp;
};

/**
 * The partition function for quicksort
 * 
 * @param  {int[]} array input array
 * @param  {int}   left  index to start the left pointer
 * @param  {int}   right index to start the right pointer
 * @return {int[]}       index new pivot
 */
var partition = function(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)],
        i = left,
        j = right;

    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }

        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i;
};

/**
 * Quicksort
 * 
 * @param  {int[]} array input array
 * @param  {int}   left  index to start the left pointer
 * @param  {int}   right index to start the right pointer
 * @return {int[]}       sorted array
 */
var quicksort = function(array, left, right) {
    var index;

    if (array.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? array.length - 1 : right;

        index = partition(array, left, right);

        if (left < index - 1) {
            quicksort(array, left, index - 1);
        }

        if (index < right) {
            quicksort(array, index, right);
        }
    }
    return array;
};
console.log("Quicksort:");
console.log(quicksort([2, 1, 5, 4, -9]));



/**
 * Merge items
 * 
 * @param  {int}  left  index left item
 * @param  {int}  right index right item
 * @return {int[]}      array with merge items
 */
var merge = function(left, right){
	var result = [],
	 	i = 0,
		j = 0;

	while(i<left.length && j<right.length){
		if(left[i] < right[j]){
			result.push(left[i]);
			i++;
		}else{
			result.push(right[j]);
			j++;
		}
	}
	return result.concat(left.slice(i)).concat(right.slice(j));
};

/**
 * Mergesort
 * 
 * @param  {int[]}  array input array
 * @return {int[]}        sorted array
 */
var mergesort = function(array){
    if (array.length < 2) {
        return array;
    }

    var middle = Math.floor(array.length / 2),
        left = array.slice(0, middle),
        right = array.slice(middle);
       
    return merge(mergesort(left), mergesort(right));
};
console.log("Mergesort:");
console.log(mergesort([2, 1, 5, 4, -9]));



/**
 * Bubble sort
 * 
 * @param  {int[]}  array input array
 * @return {int[]}        sorted array
 */
var bubblesort = function(array){
	var length = array.length - 1;

	for (var i = 0; i < length; i++) {
		var isSwapped = false,
			j = 0;

		while(j < length - i){
			if(array[j] > array[j + 1]){
				swap(array, j, j + 1);
				isSwapped = true;
			}
			j++;
		}

		if(!isSwapped){
			break;
		}
	}
	return array;
};
console.log("Bubble sort:");
console.log(bubblesort([2, 1, 5, 4, -9]));



/**
 * Shell sort
 * 
 * @param  {int[]}  array input array
 * @return {int[]}        sorted array
 */
var shellsort = function(array){
	var tmp, j,
		k = Math.floor(array.length / 2);

	while(k > 0){
		for(var i = k; i < array.length; i++){
			tmp = array[i];
			for(j = i; j >= k; j -= k){
				if(tmp < array[j - k]){
					array[j] = array[j - k];
				}else{
					break;
				}
			}
			array[j] = tmp;
		}
		k = Math.floor(k / 2);
	}
	return array;
};
console.log("Shell sort:");
console.log(shellsort([2, 1, 5, 4, -9]));



/**
 * Find max item
 * 
 * @param  {int[][]}  matrix  input matrix
 * @return {int}              max item
 */
var max = function(matrix){
	var max = matrix[0][0];

	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			if(matrix[i][j] > max){
				max = matrix[i][j];
			}
		}
	}

	return max;
};

/**
 * Find min item
 * 
 * @param  {int[][]}  matrix  input matrix
 * @return {int}              min item
 */
var min = function(matrix){
	var min = matrix[0][0];

	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			if(matrix[i][j] < min){
				min = matrix[i][j];
			}
		}
	}
	return min;
};

/**
 * Find avg matrix
 * 
 * @param  {int[][]}  matrix  input matrix
 * @return {int}              avg
 */
var avg = function(matrix){
	var sum = 0,
		count = matrix.length;

	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix[i].length; j++) {
			sum += matrix[i][j];
		}
		count += matrix[i].length - 1;
	}

	return sum / count;
};
var matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log("max item = " + max(matrix));
console.log("min item = " + min(matrix));
console.log("avg = " + avg(matrix));



/**
 * Assigns 0 to each element of the array
 * 
 * @param  {int}    count  count rows and columns
 * @return {int[][]}       matrix
 */
var fillZero = function(count){
	var matrix = new Array(count);

	for (var i = 0; i < count; i++) {
		matrix[i] = new Array(count);
		for (var j = 0; j < matrix[i].length; j++) {
			matrix[i][j] = 0;
		}
	}
	return matrix;
};

/**
 * Create 2 triangles
 * 
 * @param  {int[][]} matrix input matrix
 * @return {int[][]}        matrix with triangles
 */
var upDownTriangles = function(matrix){
	var newLength;

	for (var i = 0; i < matrix.length; i++) {
		newLength = matrix[i].length - i;
		if(i < newLength){
			for (var j = i; j < newLength; j++) {
				matrix[i][j] = 1;
			}
		} else {
			for (var j = i; j >= newLength - 1; j--) {
				matrix[i][j] = 1;
			}
		}
	}
	return matrix;
};
console.log("Matrix with two triangles:");
console.log(upDownTriangles(fillZero(5)));

/**
 * Create left triangle
 * 
 * @param  {int[][]} matrix input matrix
 * @return {int[][]}        matrix with triangle
 */
var leftTriangle = function(matrix){
	var newLength;

	for (var i = 0; i < matrix.length; i++) {
		newLength = matrix.length - i;
		for (var j = i; j < newLength; j++) {
			matrix[j][i] = 1;
		}
	}
	return matrix;
};
console.log("Matrix with left triangle:");
console.log(leftTriangle(fillZero(5)));



/**
 * Sort objects
 * 
 * @param  {obj[]}  array    input array
 * @param  {string} typeSort type sort ()
 * @return {[type]}          [description]
 */
var objSort = function(array, typeSort){
	if(typeSort == 'desc'){
		return array.sort(
			function(a,b){
				return a.a - b.a;
			}
		);
	} else if(typeSort == 'asc'){
		return array.sort(
			function(a,b){
				return b.a - a.a;
			}
		);
	} else {
		return false;
	}
};

// Input data
var obj1 = { a: 2, c: 3, d: 3};
var obj2 = { a: 1 };
var obj3 = { a: 2, c: 3};
var arOfObj = [obj1, obj2, obj3];
// Calling method
console.log("Ascending sort:");
console.log(objSort(arOfObj, 'desc'));
console.log("Descending sort:");
console.log(objSort(arOfObj, 'asc'));