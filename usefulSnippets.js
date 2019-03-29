/**
 * DevProjects/snippets/usefulSnippets.js
 *
 * Things I might want to use for some reason somewhere at
 * some time in the future maybe
 */

/*===============================================
=            helper global selectors            =
===============================================*/

/**
 * selects elements with CSS selectors ( fuzzy-ish )
 * so, specify if selector is class [.] or ID [#]
 */
let elm = document.querySelector.bind(document);
let elms = document.querySelectorAll.bind(document);

/**
 * always assumes selector is an ID [#] ( specific-ish )
 */
let id = (id) => { return document.getElementById( id ); };

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
const newDoc = () => { window.location.asign('https://anotherSite.com') };
// <body>
//   ...
//   <input type="button" value="Redirect Me" onclick="newDoc()">
//   ...
// </body>


/*======================================
=            devtools hacks            =
======================================*/

// just a <p> with properties for snippets in this section
// <p onClick="makeGreen()">×BREAK×DOWN×</p>
const dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
function colorMe() {
    const p = document.querySelector('p');
    p.style.color = '#BADA55';
    p.style.fontSize = '50px';
}


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


/*----------  view DOM elements  ----------*/

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



/*=================================================
=            reminders of fundamentals            =
=================================================*/

/*----------  timing with Promises  ----------*/

    console.time('fetching data');
    fetch('https://api.github.com/users/wesbos')
        .then(data => data.json())
        .then(data => {
            console.timeEnd('fetching data');
            console.log(data);
        });
    console.table(dogs);


/*----------  arrays & objects: reference vs copying  ----------*/
/**
 * Array.slice() without arguments to copy an entire array
 * Array.concat() for copying arrays
 * Array.from() for copying arrays into an existing array
 * ES6 spread
 * Object.assign() for copying Objects
 */

    /**
     * make an array and try to copy it
     */
    const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
    const teamOne = players;
    console.log(players);  // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "Poppy" ]
    console.log(teamOne);  // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "Poppy" ]

    /** try to manipulate the copy... */
    teamOne[3] = 'Lux';

    /** ...oops, we made a REFERENCE, not a copy of the 1st array: */
    console.log(teamOne);  // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "Lux" ]
    console.log(players);  // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "Lux" ]

    /**
     * both arrays are REFERNCES to the same data
     *
     * to make a fresh COPY and have two datasets:
     */

    /** 1 - create a new array out of .slice'ed array */
    const teamCpy1 = players.slice();

    /** 2 - instantiate a new array and concat() from an existing array into it */
    const teamCpy2 = [].concat(players);

    /** 3 - use spread syntax to copy every index of an existing array into a new array */
    const teamCpy3 = [...players];

    /** 4 - basically concat() but without having to manually build a new array */
    const teamCpy4 = Array.from(players);

    /** now we can change one array without altering the other */
    teamCpy3[3] = 'A New Name';
    console.log(players);   // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "Poppy" ]
    console.log(teamFour);  // ▶ Array(4) [ "Wes", "Sarah", "Ryan", "A New Name" ]

    /**
     * make an object and, like our arrays, fail to copy it
     */
    const person = {
        name: 'Justin Sorensen',
        age: 26
    };
    const captain = person;
    captain.number = 99;
    console.log(person);   // ▶ Object { name: "Justin Sorensen", age: 26, number: 99 }
    console.log(captain);  // ▶ Object { name: "Justin Sorensen", age: 26, number: 99 }

    /**
     * assign({<the new object>}, <object to copy>, { <new or updated properties> });
     */
    const captain2 = Object.assign({}, person, { number: 99, age: 12 });
    console.log(captain2);  // ▶ Object { name: "Justin Sorensen", age: 12, number: 99 }

    /** more examples */
    const justin = {
        name: 'Justin',
        age: 36,
        social: {
            twitter: '@jsore',
            facebook: 'jsore.developer'
        }
    };
    /** no changes to properties while copying */
    const justin2 = Object.assign({}, justin);
    /** from JSON */
    const justinJSON = JSON.parse(JSON.stringify(justin));



/*----------  arrays: item removal  ----------*/
/**
 * Array.find()
 * Array.slice() with arguments
 * ES6 spread
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