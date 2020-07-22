function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const index = Math.floor(arr.length / 2);

  // 如果此处使用 midVal = arr[index]; 那么将会出现无限递归的错误；
  const midVal = arr.splice(index, 1);

  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < midVal) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat(midVal, quickSort(right));

}

var test1 = quickSort([2,1,3,4,1,2,5,2,7,2,10,21,8,9]);

console.log(test1);


function b(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }

  return arr;
}


function curry(fn, args = []) {
  return function result() {
    const rest = [...args, ...arguments];
    if (rest.length < fn.length) {
      return curry.call(this, fn, rest);
    } else {
      return fn.apply(this, rest);
    }
  }
}



document.getElementById('btn').onclick = function () {
  Print('#wrap', {
    onStart: function () {
      console.log('onStart', new Date())
    },
    onEnd: function () {
      console.log('onEnd', new Date())
    }
  })
}

