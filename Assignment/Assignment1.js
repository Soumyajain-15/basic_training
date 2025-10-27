//question1 
function memoizedFibonacci() {
  const cache = {};
  function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) cache[n] = n;
    else cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  }
  return fib;
}
const fib = memoizedFibonacci();
console.log(fib(40));

//question2 
const calc = (function() {
  let result = 0; // private value

  const calculator = {
    add(n) {
      if (typeof n !== 'number' || isNaN(n)) {
        console.warn("Invalid input for add:", n);
        return this;
      }
      result += n;
      return this; // important for chaining
    },
    sub(n) {
      if (typeof n !== 'number' || isNaN(n)) {
        console.warn("Invalid input for sub:", n);
        return this;
      }
      result -= n;
      return this;
    },
    mul(n) {
      if (typeof n !== 'number' || isNaN(n)) {
        console.warn("Invalid input for mul:", n);
        return this;
      }
      result *= n;
      return this;
    },
    div(n) {
      if (typeof n !== 'number' || isNaN(n)) {
        console.warn("Invalid input for div:", n);
        return this;
      }
      if (n === 0) {
        console.warn("Division by zero ignored");
        return this;
      }
      result /= n;
      return this;
    },
    value() {
      const temp = result;
      result = 0; // reset for next chain
      return temp;
    }
  };

  return calculator;
})();
console.log(calc.add(5).sub(2).mul(3).div(2).value()); 
console.log(calc.add(10).div(0).value());              
console.log(calc.add("hello").value());



//question3
function deepClone(obj) {
  // Agar null ya primitive hai → return as-is
  if (obj === null || typeof obj !== 'object') return obj;

  // Agar array hai → new array
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }

  // Agar object hai → copy each property
  const clone = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}
const original = {
  name: "Somu",
  age: 23,
  details: {
    hobbies: ["reading", "gaming"],
    greet() {
      return `Hello, I'm ${this.name}`;
    }
  }
};

const cloned = deepClone(original);

console.log(cloned);
// { name: 'Somu', age: 23, details: { hobbies: [ 'reading', 'gaming' ], greet: [Function: bound greet] } }

console.log(cloned.details.greet()); 
// Hello, I'm Somu

cloned.details.hobbies.push("coding");
console.log(original.details.hobbies); 
// ["reading", "gaming"] → original unaffected

//question4 
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(l => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach(listener => listener(...args));
  }
}

// Example use:
const emitter = new EventEmitter();

function greet(name) {
  console.log("Hello", name);
}

emitter.on("hi", greet);
emitter.emit("hi", "Somu");  // Hello Somu

emitter.off("hi", greet);
emitter.emit("hi", "Somu");  // nothing happens



