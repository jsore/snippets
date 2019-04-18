/**
 * DevProjects/snippets/usefulSnippets.js
 *
 * Things I might want to use for some reason somewhere at
 * some time in the future maybe
 */


// go home
$ cd
// go to directory you were just in
$ cd -



/*===========================
=            CSS            =
===========================*/

/*----------  CSS Selectors  ----------*/

    /**
     * <class> selector
     */
    #element
    /**
     * <id> selector
     */
    .element

    /**
     * descendant selectors are expensive...
     */
    #nav a { ... }  // slow
    /**
     * ...add a specific ID inside every <a> instead:
     */
    .nav-link { ... }  // fast

    /**
     * CSS reads right to left:
     * 1. match every <a> on the page
     * 2. find every <a> that's inside a <li>
     * 3. use only <li>'s that are inside a <ul>
     * 4. filter the current selection to elms with a class of .container
     *
     * the more specific the rightmost selector is the better (faster):
     */
    .container ul li a { ... }  // slow
    .container-link-style { ... }  // faster, use for all <a>'s to style

    /**
     * order matters, example CSS + HTML:
     */
    .red { color: red; }
    .blue { color: blue; }
    <div class="blue red">HTML doesn't care about order...</div>
    <div class="red blue">...but CSS does: these will both be blue</div>


/*----------  expensive (slow) properties  ----------*/

    elm {
        border-radius
        box-shadow
        filter
        :nth-child
        position: fixed
        /**
         * or any geometric properties that affect layout:
         */
        width
        height
        top
        left
    }


/*----------  useful resources  ----------*/

/*
    - explains CSS selectors:
        https://github.com/josh/css-explain
*/

/*===============================================
=            helper global selectors            =
===============================================*/

/*----------  CSS selectors  ----------*/

/**
 * must specify class [.] or ID [#]
 */
let elm = document.querySelector.bind(document);
let elms = document.querySelectorAll.bind(document);



/*----------  HTML ID selectors  ----------*/

/**
 * always assumes selector is an ID [#]
 */
let id = (id) => { return document.getElementById( id ); };



/*----------  href ( URL ) helpers  ----------*/

/**
 * returns current page's href ( the URL )
 */
let URL = window.location.href;

/**
 * returns HTTPS or HTTP
 */
let protocol = window.location.protocol;

/**
 * returns anchor portion of URL
 */
let anchor = window.location.hash;

/**
 * returns the query string portion of URL
 */
let query = window.location.search;

/**
 * loads a new document ( page )
 */
const newDoc = () => { window.location.assign('https://anotherSite.com') };
// <body>
//   ...
//   <input type="button" value="Redirect Me" onclick="newDoc()">
//   ...
// </body>


/*======================================
=            devtools hacks            =
======================================*/

/*----------  console string substitutions  ----------*/

/**
 * %o or %O     print an object with expandable/collapsible details
 * %s           print a string
 * %d or %i     print an integer
 * %f           print floating-point value
 * %.<int>f     floating-point value to <int> amount of decimal places, example:
 *                  console.log('Foo %.4', 2.1)
 *                  > Foo 2.1000
 */


/*----------  demo <p>  ----------*/

    // <p onClick="colorMe()">×BREAK×DOWN×</p>
    // function colorMe() {
    //     const p = document.querySelector('p');
    //     p.style.color = '#BADA55';
    //     p.style.fontSize = '50px';
    // }


/*----------  direct DOM access  ----------*/

    console.dir(p);
    // ▶ <p onclick="makeGreen()" style="color: rgb(186, 218, 85); font-size: 50px;">


/*----------  interpolate strings  ----------*/

    console.log('Hello I am a %s string!', '💩');
    // Hello I am a 💩 string!


/*----------  CSS styled text  ----------*/

    /** most CSS properties are accepted */
    console.log('%c I am some great text', 'font-size:50px; background:red; text-shadow: 10px 10px 0 blue');
    /** pattern can be repeated with multiple strings: */
    console.log('%c String 1' + '%c String 2', 'CSS for 1st string', 'CSS for 2nd string');


/*----------  warnings and errors  ----------*/

    console.warn('OH NOOO');
    // ⚠ OH NOOO
    console.error('Shit!');
    // ⛔ ▼ Shit!
    //        <anonymous> debugger eval code:1:1


/*----------  inline testing  ----------*/

    const p = document.querySelector('p');
    console.assert(p.classList.contains('ouch'), 'That is wrong!');


/*----------  grouping logs  ----------*/

    const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];

    /**
     * manual segregation
     */
    dogs.forEach(dog => {
        console.groupCollapsed(`${dog.name}`);
        console.log(`This is ${dog.name}`);
        console.log(`${dog.name} is ${dog.age} years old`);
        console.log(`${dog.name} is ${dog.age * 7} dog years old`);
        console.groupEnd(`${dog.name}`);
    });
    // ▼ Snickers
    //    This is Snickers
    //    Snickers is 2 years old
    //    Snickers is 14 dog years old
    // ▼ hugo
    //    This is hugo
    //    hugo is 8 years old
    //    hugo is 56 dog years old

    /**
     * auto format
     */
    console.table(dogs);

/*=================================================
=            reminders of fundamentals            =
=================================================*/

/*----------  fetch() Promises  ----------*/

    console.time('fetching data');
    fetch('https://api.github.com/users/wesbos')
        .then(data => data.json())
        .then(data => {
            console.timeEnd('fetching data');
            console.log(data);
        });


/*----------  arrays & objects: reference vs copying  ----------*/
/**
 * - Array.slice()
 * - Array.concat()
 * - Array.from()
 * - ...spread
 * - Object.assign()
 */

    /**
     * make an array and try to copy it
     */
    const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
    const teamOne = players;
    console.log(players);  // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "Poppy" ]
    console.log(teamOne);  // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "Poppy" ]

    /**
     * try to manipulate the copy...
     */
    teamOne[3] = 'Lux';

    /**
     * ...oops, we made a REFERENCE, not a copy of the 1st array:
     */
    console.log(teamOne);  // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "Lux" ]
    console.log(players);  // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "Lux" ]

    /**
     * both arrays are REFERNCES to the same data, to make a
     * fresh copy instead:
     */

    /**
     * copy all indexes of an array by providing calling
     * slice() with no parameters
     */
    const teamCpy1 = players.slice();

    /**
     * manually create a new array then copy all indexes of
     * an existing array into it
     */
    const teamCpy2 = [].concat(players);

    /**
     * '...spread' all indexes of a given array into a new one
     */
    const teamCpy3 = [...players];

    /**
     * specify you want a new array and put all indexes of
     * another array into it
     */
    const teamCpy4 = Array.from(players);

    /**
     * now we can change one array without altering the other
     */
    teamCpy3[3] = 'A New Name';
    console.log(players);   // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "Poppy" ]
    console.log(teamFour);  // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "A New Name" ]

    /**
     * objects adhere to the same principles:
     */
    const person = {
        name: 'Justin Sorensen',
        age: 26
    };
    const captain = person;  // this is a REFERENCE to the same data, not a copy
    captain.number = 99;     // attempt to change property on new array
    console.log(person);     // ▶ Object { name: "Justin Sorensen", age: 26, number: 99 }
    console.log(captain);    // ▶ Object { name: "Justin Sorensen", age: 26, number: 99 }

    /**
     * assign([0])  the new object, leave blank for 'self'
     * assign([1])  the object to copy
     * assign([2])  object containing new or updated properties
     */
    const captain2 = Object.assign({}, person, { number: 99, age: 12 });
    console.log(captain2);  // ▶ Object { name: "Justin Sorensen", age: 12, number: 99 }

    /**
     * copy object without changes to properties, copying
     * an object that's been stringify'ed then parsed
     */
    const justin = {
        name: 'Justin',
        age: 36,
        social: {
            twitter: '@jsore',
            facebook: 'jsore.developer'
        }
    };
    const justin2 = Object.assign({}, justin);
    const justinJSON = JSON.parse(JSON.stringify(justin));



/*----------  arrays: item removal  ----------*/
/**
 * - Array.find()
 * - Array.slice() with arguments
 * - ES6 spread
 */

    /**
     * given an array of objects, find an object with a key
     * that has a specified value, get its index and build a
     * new array of objects with it removed
     */
    const comments = [
        { text: 'Love this!', id: 523423 },
        { text: 'Super good', id: 823423 },
        { text: 'You are the best', id: 2039842 },
        { text: 'Ramen is my fav food ever', id: 123523 },
        { text: 'Nice Nice Nice!', id: 542328 }
    ];

    /** returns the matched item from an array */
    const comment = comments.find(comment => comment.id === 823423);
    // ▶ Object { text: "Super good", id: 823423 }

    /** returns the index of a matched item from an array */
    const index = comments.findIndex(comment => comment.id === 823423);

    const newComments = [
        ...comments.slice(0, index),
        ...comments.slice(index + 1)
    ];
    // ▶ Array(4) [ {…}, {…}, {…}, {…} ]



/*===================================================
=            async > vanilla JS Promises            =
===================================================*/
/**
 * Promises resolve to the value returned by async function
 *
 * async functions are Promise-based but synchronous and
 * don't block the main thread
 *
 * await function x() SUSPENDS EXECUTION of current function
 *
 * Promise.then(x) continues execution of the current
 * function after adding x to callback chain
 *
 * async functions always return a promise regardless of if
 * an await is used or not, resolved to whatever the async
 * function returns (or reject message)
 */

    /*----------  fundamentals  ----------*/
    /**
     * async keyword means the function returns a Promise
     */
    async function asyncFunction() {
        try {
            // an await'ed function that might fail...

        } catch (e) {
            // error from rejected Promise returned from try block
        }

        // explicityly return a Promise
        return Promise.resolve('something');
        // or if returning a non-Promise value, JS wraps it into a resolved Promise
        return ('something');
    }


    /**
     * JS waits until Promise settles then you can do
     * stuff with the result, engine will continue with
     * other tasks (scripts, events, etc) while waiting
     */
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('something'), 2000)  // resolves in 2 secs
    });
    let result = await promise;  // paush until Promise resolves
    alert(result);  // "something"


    /**
     * async allows for a more readable replacement of
     * Promise .then() chains
     */
    async function getAPIData(url) {
        let payload;
        try {
            const v = await contentData(url);  // returns a Promise
            payload = await anotherThing(v);  // returns a Promise
        } catch (e) {
            v = await somethingElse(url);  // returns a Promise
        }
        // this is the resolution of a Promise
        return payload;  // it gets wrapped into a Promise
    }


    /**
     * async/await is more performant for how it manages
     * stack traces (drops the trace) vs how Promises handle
     * them (stores it, requiring more memory and time) to
     * track function contexts when calling callbacks
     */
    const foo = async () => {
        // boo() is a pointer to foo(), storing the pointer is more performant than
        // saving the entire stack tracke
        // foo() is suspended while boo() executes, saving foo()'s context
        await boo();  // returns a promise
        doe();
    };


    /*----------  async with streams  ----------*/
    /**
     * example of psuedo asynchronous loop with streams
     */
    async function getResponseSize(url) {
        const response = await fetch(url);
        const reader = response.body.getReader();
        let result = await reader.read();
        let total = 0;

        while (!result.done) {
            const value = result.value;
            total += value.length;
            console.log('Received chunk', value);
            // get the next result
            result = await reader.read();
        }
        return total;
    }
    getResponseSize('https://some-api.com/gimme-dat-booty');


    /*----------  async in arrow functions  ----------*/

    // maps URLs to json-promises
    const jsonPromises = urls.map(async url => {
        /**
         * .map() doesn't care it was given an async function,
         * it just sees a function that returns a promise, it
         * won't wait for the 1st function to complete before
         * calling the next
         */
        const response = await fetch(url);
        return response.json();
    });
    // urls = ['https://…', 'https://…', 'https://…', …];


    /*----------  async in object methods  ----------*/

    const storage = {
        async getAvatar(name) {
            const cache = await caches.open('avatars');
            return cache.match(`/avatars/${name}.jpg`);
        }
    };
    storage.getAvatar('username').then(…);


    /*----------  *** parallel examples ***  ----------*/

    // will take 1000ms
    async function series() {
        await wait(500);    // wait 500ms...
        await wait(500);    // ...then another 500ms
        return 'done';      // 1000ms after call
    }

    /* versus */

    // will take 500ms
    async function parallel() {
        const wait1 = wait(500);  // one 500ms timer...
        const wait2 = wait(500);  // ...another
        await wait1;  // these get started at the same time...
        await wait2;  // ...so this completes right after the 1st one
        return 'done';
    }

    /**
     * example that's not overly sequential and simple, fetch
     * a series of URLs and log them ASAP in correct order
     */
    async function logInOrder(urls) {
        // fetch all urls in parallel
        const textPromises = urls.map(async url => {
            const response = await fetch(url);
            return response.text();
        });
        // log them in sequence
        for (const textPromise of textPromises) {
            console.log(await textPromise);
        }
    }





// neat
//    <script>
//      const addItems = document.querySelector('.add-items');
//      const itemsList = document.querySelector('.plates');
//      const items = JSON.parse(localStorage.getItem('items')) || [];
//      function addItem(e) {
//        e.preventDefault();
//        const text = (this.querySelector('[name=item]')).value;
//        const item = {
//          text,
//          done: false
//        };
//        items.push(item);
//        populateList(items, itemsList);
//        localStorage.setItem('items', JSON.stringify(items));
//        this.reset();
//      }
//      function populateList(plates = [], platesList) {
//        platesList.innerHTML = plates.map((plate, i) => {
//          return `
//            <li>
//              <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
//              <label for="item${i}">${plate.text}</label>
//            </li>
//          `;
//        }).join('');
//      }
//      function toggleDone(e) {
//        if (!e.target.matches('input')) return; // skip this unless it's an input
//        const el = e.target;
//        const index = el.dataset.index;
//        items[index].done = !items[index].done;
//        localStorage.setItem('items', JSON.stringify(items));
//        populateList(items, itemsList);
//      }
//      addItems.addEventListener('submit', addItem);
//      itemsList.addEventListener('click', toggleDone);
//      populateList(items, itemsList);
//    </script>
//
//
// a better forEach
//    <script>
//        function debounce(func, wait = 20, immediate = true) {
//          var timeout;
//          return function() {
//            var context = this, args = arguments;
//            var later = function() {
//              timeout = null;
//              if (!immediate) func.apply(context, args);
//            };
//            var callNow = immediate && !timeout;
//            clearTimeout(timeout);
//            timeout = setTimeout(later, wait);
//            if (callNow) func.apply(context, args);
//          };
//        };
//        const sliderImages = document.querySelectorAll('.slide-in');
//        function checkSlide() {
//          sliderImages.forEach(sliderImage => {
//            // half way through the image
//            const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
//            // bottom of the image
//            const imageBottom = sliderImage.offsetTop + sliderImage.height;
//            const isHalfShown = slideInAt > sliderImage.offsetTop;
//            const isNotScrolledPast = window.scrollY < imageBottom;
//            if (isHalfShown && isNotScrolledPast) {
//              sliderImage.classList.add('active');
//            } else {
//              sliderImage.classList.remove('active');
//            }
//          });
//        }
//        window.addEventListener('scroll', debounce(checkSlide));
//    </script>
//
//
// a better innerHTML
//    const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];
//    function strip(bandName) {
//      return bandName.replace(/^(a |the |an )/i, '').trim();
//    }
//    const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1);
//    document.querySelector('#bands').innerHTML =
//      sortedBands
//        .map(band => `<li>${band}</li>`)
//        .join('');
//    console.log(sortedBands);
//
//
// keypress
//    <script>
//    const pressed = [];
//    const secretCode = 'wesbos';
//    window.addEventListener('keyup', (e) => {
//      console.log(e.key);
//      pressed.push(e.key);
//      pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
//      if (pressed.join('').includes(secretCode)) {
//        console.log('DING DING!');
//        cornify_add();
//      }
//      console.log(pressed);
//    });
//    </script>