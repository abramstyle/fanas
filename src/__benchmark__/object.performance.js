const objectUtils = require('../object');

console.log('run benchmark for json builder');
const maxRunningCount = 10000;
const repeatCount = 5;

const data = {};

console.log('json builder benchmark is running...');
const startTime = Date.now();
for (let r = 0; r < repeatCount; ++r) {
  for (let i = 0; i < maxRunningCount; i += 1) {
    objectUtils.toJSON(data, true);
  }
}
const endTime = Date.now();
console.log('json builder benchmark is complete');
console.log(`json builder benchmark run ${maxRunningCount} x ${repeatCount} = ${maxRunningCount * repeatCount} times`);
console.log(`json build costs ${endTime - startTime} ms.`);
