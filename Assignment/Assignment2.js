// mySetInterval.js
function mySetInterval(fn, delay) {
  let timerId = null;
  let cleared = false;

  const run = () => {
    if (cleared) return;
    fn();
    timerId = setTimeout(run, delay);
  };

  timerId = setTimeout(run, delay);

  return {
    clear: () => {
      cleared = true;
      clearTimeout(timerId);
    }
  };
}

// Usage example
const interval = mySetInterval(() => {
  console.log("Hello", new Date().toLocaleTimeString());
}, 1000);

// Stop interval after 5 seconds
setTimeout(() => {
  interval.clear();
  console.log("Interval cleared");
}, 5000);






// runSequential: runs array of promise-returning functions sequentially
async function runSequential(tasks) {
  const results = [];

  for (const task of tasks) {
    const result = await task();  // wait for current promise
    results.push(result);         // collect result
  }

  return results;
}
// Sample async tasks
const tasks = [
  () => new Promise(res => setTimeout(() => res(1), 1000)),
  () => new Promise(res => setTimeout(() => res(2), 500)),
  () => new Promise(res => setTimeout(() => res(3), 200)),
];

runSequential(tasks).then(results => {
  console.log("All results:", results);
  // Output after ~1.7 seconds: [1, 2, 3]
});






async function retryPromise(fn, retries) {
  try {
    return await fn(); // try first
  } catch (err) {
    if (retries <= 0) throw err; // no retries left
    console.log(`Retrying... (${retries} attempts left)`);
    await new Promise(res => setTimeout(res, 500)); // wait 500ms
    return retryPromise(fn, retries - 1);           // retry
  }
}
let attempt = 0;

async function unstableTask() {
  attempt++;
  if (attempt < 3) {
    console.log("Fail attempt", attempt);
    throw new Error("Fail");
  }
  console.log("Success at attempt", attempt);
  return "Done";
}

retryPromise(unstableTask, 5)
  .then(result => console.log("Result:", result))
  .catch(err => console.error("Final error:", err.message));






  function allSettled(promises) {
  return Promise.all(
    promises.map(p =>
      Promise.resolve(p)
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    )
  );
}
const promises = [
  Promise.resolve(10),
  Promise.reject("Error occurred"),
  42, // non-Promise value
];

allSettled(promises).then(results => {
  console.log(results);
});

