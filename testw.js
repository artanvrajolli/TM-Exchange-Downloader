const fs = require('fs');
const { Worker } = require('worker_threads');

const worker = new Worker(`
    console.log("AAA");

    
`, { eval: true, stdout: true, stderr: true });

worker.postMessage('hello world');