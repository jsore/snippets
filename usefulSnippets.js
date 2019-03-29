/**
 * DevProjects/snippets/usefulSnippets.js
 *
 * code that I might want to use somewhere
 */


/*===============================================
=            helper globals ( mine )            =
===============================================*/

let elm = document.querySelector.bind(document);
let elms = document.querySelectorAll.bind(document);

let id = (id) => { return document.getElementById( id ); };

/** returns current page's href ( the URL ) */
let URL = window.location.href;

/** returns HTTPS or HTTP */
let protocol = window.location.protocol;

/** returns anchor portion of URL */
let anchor = window.location.hash;

/** loads a new document ( page ) */
const newDoc = () => { window.location.asign('https://anotherSite.com') };
// <body>
//   ...
//   <input type="button" value="Redirect Me" onclick="newDoc()">
//   ...
// </body>


/*======================================
=            devtools hacks            =
======================================*/

