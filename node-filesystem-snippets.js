/**
 * Pub/git-remote-logger/snippets.js
 */
'use strict';


/*----------  excerpts from my files  ----------*/

const fs = require('fs');

/** grab the spawn method from child_process Node.js module */
const spawn = require('child_process').spawn;


/**
 * access argument vector array (passed CLI arguments)
 * argv[0] = node               // the first argument entered when running a node app
 * argv[1] = path/to/script.js  // 2nd argument, what app node is to run
 * argv[2] =                    // 1st argument supplied after telling node to run app
 */
//const filename = process.argv[2];
const logFile = './active-remotes.txt';


// watcher-spawn.js
if (!logFile) {
    throw Error('log not found');
}


// fs.writeFile()      create file or overwrite
// fs.readFile()
// fs.watch('target.txt', (err, data) => { console.log(data.toString) });


// read-stream.js
/** returns a module, works with it using EventEmitter */
require('fs').createReadStream(process.argv[2])
    .on('data', chunk => process.stdout.write(chunk))  /** data already contains \n's */
    .on('error', err => process.stderr.write(`Error: ${err.message}\n`));



// watcher.js
/** method watch() takes target path and a callback to call when file changes */
fs.watch('target.txt', () => console.log('File changed'));



// watcher-spawn.js
fs.watch(logFile, () => {
    /**
     * send spawn name of program to execute (ls) and array
     * of arguments and the program's target
     */
    const ls = spawn('ls', ['-l', '-h', logFile]);

    /** pipe stdout stream from child process into our stdout */
    ls.stdout.pipe(process.stdout);
});
console.log(`Watching ${logFile} for changes...`);



// watcher-spawn-parse.js
fs.watch(filename, () => {
    const ls = spawn('ls', ['-l', '-h', filename]);
    let output = '';

    /** event listener listening for stdout from stream */
    ls.stdout.on('data', chunk => output += chunk);
    /**
     * 'data' events pass Buffer objects to whatever callback
     * specified, which are inherently toString(), as chunk
     */

    /** stores stdout from string */
    ls.on('close', () => {
        /** parse and split on whitespace */
        const parts = output.split(/\s+/);
        /** report permissions, size, filename indexes to log */
        console.log([parts[0], parts[4], parts[8]]);
    })
});
console.log(`Watching ${filename} for changes...`);



/*----------  from source docs  ----------*/

// from yargs docs

require('yargs') // eslint-disable-line
  .command('serve [port]', 'start the server', (yargs) => {
    yargs
      .positional('port', {
        describe: 'port to bind on',
        default: 5000
      })
  }, (argv) => {
    if (argv.verbose) console.info(`start server on :${argv.port}`)
    serve(argv.port)
  })
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .argv

// if function throws, delegate to fail() or print to console

// simple callback
var argv = require('yargs')
  .coerce('file', function (arg) {
    return require('fs').readFileSync(arg, 'utf8')
  })
  .argv

// takes object that maps several keys to their coercion function
var argv = require('yargs')
  .coerce({
    date: Date.parse,
    json: JSON.parse
  })
  .argv

// map same function to array of several keys
var path = require('path')
var argv = require('yargs')
  .coerce(['src', 'dest'], path.resolve)
  .argv

// dot-notion & arrays, coercion applied to final object that is parsed
// --user.name Batman --user.password 123
// gives us: {name: 'batman', password: '[SECRET]'}
var argv = require('yargs')
  .option('user')
  .coerce('user', opt => {
    opt.name = opt.name.toLowerCase()
    opt.password = '[SECRET]'
    return opt
  })
  .argv




/**
 * lodash utility uniq
 * -- take an array, return it with duplicates removed
 */
//var filteredArray = _.uniq(['name', 1, 'name', 1, 2, 3, 4]);
//var filteredArray = _.uniq(['Mike']);
//console.log(filteredArray);



/** basic usage of appendFile(): */
//fs.appendFile('greetings.txt', 'Hello World!');  // Hello World!

/** concat'ing a variable: */
//fs.appendFile('greetings.txt', 'Hello' + user.username +'!');  // Helloroot!

/** using ES6 template strings (`string ${variable} more string`): */
//fs.appendFile('greetings.txt', `Hello ${user.username}!`);  // Hello root!

/** template strings and usage of exports from note.js: */
//fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`);
// Hello root! You are 25.
