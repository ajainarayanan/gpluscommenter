/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("components~jquery@2.1.1", Function("exports, module",
"/*!\n\
 * jQuery JavaScript Library v2.1.1\n\
 * http://jquery.com/\n\
 *\n\
 * Includes Sizzle.js\n\
 * http://sizzlejs.com/\n\
 *\n\
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors\n\
 * Released under the MIT license\n\
 * http://jquery.org/license\n\
 *\n\
 * Date: 2014-05-01T17:11Z\n\
 */\n\
\n\
(function( global, factory ) {\n\
\n\
\tif ( typeof module === \"object\" && typeof module.exports === \"object\" ) {\n\
\t\t// For CommonJS and CommonJS-like environments where a proper window is present,\n\
\t\t// execute the factory and get jQuery\n\
\t\t// For environments that do not inherently posses a window with a document\n\
\t\t// (such as Node.js), expose a jQuery-making factory as module.exports\n\
\t\t// This accentuates the need for the creation of a real window\n\
\t\t// e.g. var jQuery = require(\"jquery\")(window);\n\
\t\t// See ticket #14549 for more info\n\
\t\tmodule.exports = global.document ?\n\
\t\t\tfactory( global, true ) :\n\
\t\t\tfunction( w ) {\n\
\t\t\t\tif ( !w.document ) {\n\
\t\t\t\t\tthrow new Error( \"jQuery requires a window with a document\" );\n\
\t\t\t\t}\n\
\t\t\t\treturn factory( w );\n\
\t\t\t};\n\
\t} else {\n\
\t\tfactory( global );\n\
\t}\n\
\n\
// Pass this if window is not defined yet\n\
}(typeof window !== \"undefined\" ? window : this, function( window, noGlobal ) {\n\
\n\
// Can't do this because several apps including ASP.NET trace\n\
// the stack via arguments.caller.callee and Firefox dies if\n\
// you try to trace through \"use strict\" call chains. (#13335)\n\
// Support: Firefox 18+\n\
//\n\
\n\
var arr = [];\n\
\n\
var slice = arr.slice;\n\
\n\
var concat = arr.concat;\n\
\n\
var push = arr.push;\n\
\n\
var indexOf = arr.indexOf;\n\
\n\
var class2type = {};\n\
\n\
var toString = class2type.toString;\n\
\n\
var hasOwn = class2type.hasOwnProperty;\n\
\n\
var support = {};\n\
\n\
\n\
\n\
var\n\
\t// Use the correct document accordingly with window argument (sandbox)\n\
\tdocument = window.document,\n\
\n\
\tversion = \"2.1.1\",\n\
\n\
\t// Define a local copy of jQuery\n\
\tjQuery = function( selector, context ) {\n\
\t\t// The jQuery object is actually just the init constructor 'enhanced'\n\
\t\t// Need init if jQuery is called (just allow error to be thrown if not included)\n\
\t\treturn new jQuery.fn.init( selector, context );\n\
\t},\n\
\n\
\t// Support: Android<4.1\n\
\t// Make sure we trim BOM and NBSP\n\
\trtrim = /^[\\s\\uFEFF\\xA0]+|[\\s\\uFEFF\\xA0]+$/g,\n\
\n\
\t// Matches dashed string for camelizing\n\
\trmsPrefix = /^-ms-/,\n\
\trdashAlpha = /-([\\da-z])/gi,\n\
\n\
\t// Used by jQuery.camelCase as callback to replace()\n\
\tfcamelCase = function( all, letter ) {\n\
\t\treturn letter.toUpperCase();\n\
\t};\n\
\n\
jQuery.fn = jQuery.prototype = {\n\
\t// The current version of jQuery being used\n\
\tjquery: version,\n\
\n\
\tconstructor: jQuery,\n\
\n\
\t// Start with an empty selector\n\
\tselector: \"\",\n\
\n\
\t// The default length of a jQuery object is 0\n\
\tlength: 0,\n\
\n\
\ttoArray: function() {\n\
\t\treturn slice.call( this );\n\
\t},\n\
\n\
\t// Get the Nth element in the matched element set OR\n\
\t// Get the whole matched element set as a clean array\n\
\tget: function( num ) {\n\
\t\treturn num != null ?\n\
\n\
\t\t\t// Return just the one element from the set\n\
\t\t\t( num < 0 ? this[ num + this.length ] : this[ num ] ) :\n\
\n\
\t\t\t// Return all the elements in a clean array\n\
\t\t\tslice.call( this );\n\
\t},\n\
\n\
\t// Take an array of elements and push it onto the stack\n\
\t// (returning the new matched element set)\n\
\tpushStack: function( elems ) {\n\
\n\
\t\t// Build a new jQuery matched element set\n\
\t\tvar ret = jQuery.merge( this.constructor(), elems );\n\
\n\
\t\t// Add the old object onto the stack (as a reference)\n\
\t\tret.prevObject = this;\n\
\t\tret.context = this.context;\n\
\n\
\t\t// Return the newly-formed element set\n\
\t\treturn ret;\n\
\t},\n\
\n\
\t// Execute a callback for every element in the matched set.\n\
\t// (You can seed the arguments with an array of args, but this is\n\
\t// only used internally.)\n\
\teach: function( callback, args ) {\n\
\t\treturn jQuery.each( this, callback, args );\n\
\t},\n\
\n\
\tmap: function( callback ) {\n\
\t\treturn this.pushStack( jQuery.map(this, function( elem, i ) {\n\
\t\t\treturn callback.call( elem, i, elem );\n\
\t\t}));\n\
\t},\n\
\n\
\tslice: function() {\n\
\t\treturn this.pushStack( slice.apply( this, arguments ) );\n\
\t},\n\
\n\
\tfirst: function() {\n\
\t\treturn this.eq( 0 );\n\
\t},\n\
\n\
\tlast: function() {\n\
\t\treturn this.eq( -1 );\n\
\t},\n\
\n\
\teq: function( i ) {\n\
\t\tvar len = this.length,\n\
\t\t\tj = +i + ( i < 0 ? len : 0 );\n\
\t\treturn this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );\n\
\t},\n\
\n\
\tend: function() {\n\
\t\treturn this.prevObject || this.constructor(null);\n\
\t},\n\
\n\
\t// For internal use only.\n\
\t// Behaves like an Array's method, not like a jQuery method.\n\
\tpush: push,\n\
\tsort: arr.sort,\n\
\tsplice: arr.splice\n\
};\n\
\n\
jQuery.extend = jQuery.fn.extend = function() {\n\
\tvar options, name, src, copy, copyIsArray, clone,\n\
\t\ttarget = arguments[0] || {},\n\
\t\ti = 1,\n\
\t\tlength = arguments.length,\n\
\t\tdeep = false;\n\
\n\
\t// Handle a deep copy situation\n\
\tif ( typeof target === \"boolean\" ) {\n\
\t\tdeep = target;\n\
\n\
\t\t// skip the boolean and the target\n\
\t\ttarget = arguments[ i ] || {};\n\
\t\ti++;\n\
\t}\n\
\n\
\t// Handle case when target is a string or something (possible in deep copy)\n\
\tif ( typeof target !== \"object\" && !jQuery.isFunction(target) ) {\n\
\t\ttarget = {};\n\
\t}\n\
\n\
\t// extend jQuery itself if only one argument is passed\n\
\tif ( i === length ) {\n\
\t\ttarget = this;\n\
\t\ti--;\n\
\t}\n\
\n\
\tfor ( ; i < length; i++ ) {\n\
\t\t// Only deal with non-null/undefined values\n\
\t\tif ( (options = arguments[ i ]) != null ) {\n\
\t\t\t// Extend the base object\n\
\t\t\tfor ( name in options ) {\n\
\t\t\t\tsrc = target[ name ];\n\
\t\t\t\tcopy = options[ name ];\n\
\n\
\t\t\t\t// Prevent never-ending loop\n\
\t\t\t\tif ( target === copy ) {\n\
\t\t\t\t\tcontinue;\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Recurse if we're merging plain objects or arrays\n\
\t\t\t\tif ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {\n\
\t\t\t\t\tif ( copyIsArray ) {\n\
\t\t\t\t\t\tcopyIsArray = false;\n\
\t\t\t\t\t\tclone = src && jQuery.isArray(src) ? src : [];\n\
\n\
\t\t\t\t\t} else {\n\
\t\t\t\t\t\tclone = src && jQuery.isPlainObject(src) ? src : {};\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// Never move original objects, clone them\n\
\t\t\t\t\ttarget[ name ] = jQuery.extend( deep, clone, copy );\n\
\n\
\t\t\t\t// Don't bring in undefined values\n\
\t\t\t\t} else if ( copy !== undefined ) {\n\
\t\t\t\t\ttarget[ name ] = copy;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\t// Return the modified object\n\
\treturn target;\n\
};\n\
\n\
jQuery.extend({\n\
\t// Unique for each copy of jQuery on the page\n\
\texpando: \"jQuery\" + ( version + Math.random() ).replace( /\\D/g, \"\" ),\n\
\n\
\t// Assume jQuery is ready without the ready module\n\
\tisReady: true,\n\
\n\
\terror: function( msg ) {\n\
\t\tthrow new Error( msg );\n\
\t},\n\
\n\
\tnoop: function() {},\n\
\n\
\t// See test/unit/core.js for details concerning isFunction.\n\
\t// Since version 1.3, DOM methods and functions like alert\n\
\t// aren't supported. They return false on IE (#2968).\n\
\tisFunction: function( obj ) {\n\
\t\treturn jQuery.type(obj) === \"function\";\n\
\t},\n\
\n\
\tisArray: Array.isArray,\n\
\n\
\tisWindow: function( obj ) {\n\
\t\treturn obj != null && obj === obj.window;\n\
\t},\n\
\n\
\tisNumeric: function( obj ) {\n\
\t\t// parseFloat NaNs numeric-cast false positives (null|true|false|\"\")\n\
\t\t// ...but misinterprets leading-number strings, particularly hex literals (\"0x...\")\n\
\t\t// subtraction forces infinities to NaN\n\
\t\treturn !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;\n\
\t},\n\
\n\
\tisPlainObject: function( obj ) {\n\
\t\t// Not plain objects:\n\
\t\t// - Any object or value whose internal [[Class]] property is not \"[object Object]\"\n\
\t\t// - DOM nodes\n\
\t\t// - window\n\
\t\tif ( jQuery.type( obj ) !== \"object\" || obj.nodeType || jQuery.isWindow( obj ) ) {\n\
\t\t\treturn false;\n\
\t\t}\n\
\n\
\t\tif ( obj.constructor &&\n\
\t\t\t\t!hasOwn.call( obj.constructor.prototype, \"isPrototypeOf\" ) ) {\n\
\t\t\treturn false;\n\
\t\t}\n\
\n\
\t\t// If the function hasn't returned already, we're confident that\n\
\t\t// |obj| is a plain object, created by {} or constructed with new Object\n\
\t\treturn true;\n\
\t},\n\
\n\
\tisEmptyObject: function( obj ) {\n\
\t\tvar name;\n\
\t\tfor ( name in obj ) {\n\
\t\t\treturn false;\n\
\t\t}\n\
\t\treturn true;\n\
\t},\n\
\n\
\ttype: function( obj ) {\n\
\t\tif ( obj == null ) {\n\
\t\t\treturn obj + \"\";\n\
\t\t}\n\
\t\t// Support: Android < 4.0, iOS < 6 (functionish RegExp)\n\
\t\treturn typeof obj === \"object\" || typeof obj === \"function\" ?\n\
\t\t\tclass2type[ toString.call(obj) ] || \"object\" :\n\
\t\t\ttypeof obj;\n\
\t},\n\
\n\
\t// Evaluates a script in a global context\n\
\tglobalEval: function( code ) {\n\
\t\tvar script,\n\
\t\t\tindirect = eval;\n\
\n\
\t\tcode = jQuery.trim( code );\n\
\n\
\t\tif ( code ) {\n\
\t\t\t// If the code includes a valid, prologue position\n\
\t\t\t// strict mode pragma, execute code by injecting a\n\
\t\t\t// script tag into the document.\n\
\t\t\tif ( code.indexOf(\"use strict\") === 1 ) {\n\
\t\t\t\tscript = document.createElement(\"script\");\n\
\t\t\t\tscript.text = code;\n\
\t\t\t\tdocument.head.appendChild( script ).parentNode.removeChild( script );\n\
\t\t\t} else {\n\
\t\t\t// Otherwise, avoid the DOM node creation, insertion\n\
\t\t\t// and removal by using an indirect global eval\n\
\t\t\t\tindirect( code );\n\
\t\t\t}\n\
\t\t}\n\
\t},\n\
\n\
\t// Convert dashed to camelCase; used by the css and data modules\n\
\t// Microsoft forgot to hump their vendor prefix (#9572)\n\
\tcamelCase: function( string ) {\n\
\t\treturn string.replace( rmsPrefix, \"ms-\" ).replace( rdashAlpha, fcamelCase );\n\
\t},\n\
\n\
\tnodeName: function( elem, name ) {\n\
\t\treturn elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();\n\
\t},\n\
\n\
\t// args is for internal usage only\n\
\teach: function( obj, callback, args ) {\n\
\t\tvar value,\n\
\t\t\ti = 0,\n\
\t\t\tlength = obj.length,\n\
\t\t\tisArray = isArraylike( obj );\n\
\n\
\t\tif ( args ) {\n\
\t\t\tif ( isArray ) {\n\
\t\t\t\tfor ( ; i < length; i++ ) {\n\
\t\t\t\t\tvalue = callback.apply( obj[ i ], args );\n\
\n\
\t\t\t\t\tif ( value === false ) {\n\
\t\t\t\t\t\tbreak;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t} else {\n\
\t\t\t\tfor ( i in obj ) {\n\
\t\t\t\t\tvalue = callback.apply( obj[ i ], args );\n\
\n\
\t\t\t\t\tif ( value === false ) {\n\
\t\t\t\t\t\tbreak;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t// A special, fast, case for the most common use of each\n\
\t\t} else {\n\
\t\t\tif ( isArray ) {\n\
\t\t\t\tfor ( ; i < length; i++ ) {\n\
\t\t\t\t\tvalue = callback.call( obj[ i ], i, obj[ i ] );\n\
\n\
\t\t\t\t\tif ( value === false ) {\n\
\t\t\t\t\t\tbreak;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t} else {\n\
\t\t\t\tfor ( i in obj ) {\n\
\t\t\t\t\tvalue = callback.call( obj[ i ], i, obj[ i ] );\n\
\n\
\t\t\t\t\tif ( value === false ) {\n\
\t\t\t\t\t\tbreak;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn obj;\n\
\t},\n\
\n\
\t// Support: Android<4.1\n\
\ttrim: function( text ) {\n\
\t\treturn text == null ?\n\
\t\t\t\"\" :\n\
\t\t\t( text + \"\" ).replace( rtrim, \"\" );\n\
\t},\n\
\n\
\t// results is for internal usage only\n\
\tmakeArray: function( arr, results ) {\n\
\t\tvar ret = results || [];\n\
\n\
\t\tif ( arr != null ) {\n\
\t\t\tif ( isArraylike( Object(arr) ) ) {\n\
\t\t\t\tjQuery.merge( ret,\n\
\t\t\t\t\ttypeof arr === \"string\" ?\n\
\t\t\t\t\t[ arr ] : arr\n\
\t\t\t\t);\n\
\t\t\t} else {\n\
\t\t\t\tpush.call( ret, arr );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn ret;\n\
\t},\n\
\n\
\tinArray: function( elem, arr, i ) {\n\
\t\treturn arr == null ? -1 : indexOf.call( arr, elem, i );\n\
\t},\n\
\n\
\tmerge: function( first, second ) {\n\
\t\tvar len = +second.length,\n\
\t\t\tj = 0,\n\
\t\t\ti = first.length;\n\
\n\
\t\tfor ( ; j < len; j++ ) {\n\
\t\t\tfirst[ i++ ] = second[ j ];\n\
\t\t}\n\
\n\
\t\tfirst.length = i;\n\
\n\
\t\treturn first;\n\
\t},\n\
\n\
\tgrep: function( elems, callback, invert ) {\n\
\t\tvar callbackInverse,\n\
\t\t\tmatches = [],\n\
\t\t\ti = 0,\n\
\t\t\tlength = elems.length,\n\
\t\t\tcallbackExpect = !invert;\n\
\n\
\t\t// Go through the array, only saving the items\n\
\t\t// that pass the validator function\n\
\t\tfor ( ; i < length; i++ ) {\n\
\t\t\tcallbackInverse = !callback( elems[ i ], i );\n\
\t\t\tif ( callbackInverse !== callbackExpect ) {\n\
\t\t\t\tmatches.push( elems[ i ] );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn matches;\n\
\t},\n\
\n\
\t// arg is for internal usage only\n\
\tmap: function( elems, callback, arg ) {\n\
\t\tvar value,\n\
\t\t\ti = 0,\n\
\t\t\tlength = elems.length,\n\
\t\t\tisArray = isArraylike( elems ),\n\
\t\t\tret = [];\n\
\n\
\t\t// Go through the array, translating each of the items to their new values\n\
\t\tif ( isArray ) {\n\
\t\t\tfor ( ; i < length; i++ ) {\n\
\t\t\t\tvalue = callback( elems[ i ], i, arg );\n\
\n\
\t\t\t\tif ( value != null ) {\n\
\t\t\t\t\tret.push( value );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t// Go through every key on the object,\n\
\t\t} else {\n\
\t\t\tfor ( i in elems ) {\n\
\t\t\t\tvalue = callback( elems[ i ], i, arg );\n\
\n\
\t\t\t\tif ( value != null ) {\n\
\t\t\t\t\tret.push( value );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Flatten any nested arrays\n\
\t\treturn concat.apply( [], ret );\n\
\t},\n\
\n\
\t// A global GUID counter for objects\n\
\tguid: 1,\n\
\n\
\t// Bind a function to a context, optionally partially applying any\n\
\t// arguments.\n\
\tproxy: function( fn, context ) {\n\
\t\tvar tmp, args, proxy;\n\
\n\
\t\tif ( typeof context === \"string\" ) {\n\
\t\t\ttmp = fn[ context ];\n\
\t\t\tcontext = fn;\n\
\t\t\tfn = tmp;\n\
\t\t}\n\
\n\
\t\t// Quick check to determine if target is callable, in the spec\n\
\t\t// this throws a TypeError, but we will just return undefined.\n\
\t\tif ( !jQuery.isFunction( fn ) ) {\n\
\t\t\treturn undefined;\n\
\t\t}\n\
\n\
\t\t// Simulated bind\n\
\t\targs = slice.call( arguments, 2 );\n\
\t\tproxy = function() {\n\
\t\t\treturn fn.apply( context || this, args.concat( slice.call( arguments ) ) );\n\
\t\t};\n\
\n\
\t\t// Set the guid of unique handler to the same of original handler, so it can be removed\n\
\t\tproxy.guid = fn.guid = fn.guid || jQuery.guid++;\n\
\n\
\t\treturn proxy;\n\
\t},\n\
\n\
\tnow: Date.now,\n\
\n\
\t// jQuery.support is not used in Core but other projects attach their\n\
\t// properties to it so it needs to exist.\n\
\tsupport: support\n\
});\n\
\n\
// Populate the class2type map\n\
jQuery.each(\"Boolean Number String Function Array Date RegExp Object Error\".split(\" \"), function(i, name) {\n\
\tclass2type[ \"[object \" + name + \"]\" ] = name.toLowerCase();\n\
});\n\
\n\
function isArraylike( obj ) {\n\
\tvar length = obj.length,\n\
\t\ttype = jQuery.type( obj );\n\
\n\
\tif ( type === \"function\" || jQuery.isWindow( obj ) ) {\n\
\t\treturn false;\n\
\t}\n\
\n\
\tif ( obj.nodeType === 1 && length ) {\n\
\t\treturn true;\n\
\t}\n\
\n\
\treturn type === \"array\" || length === 0 ||\n\
\t\ttypeof length === \"number\" && length > 0 && ( length - 1 ) in obj;\n\
}\n\
var Sizzle =\n\
/*!\n\
 * Sizzle CSS Selector Engine v1.10.19\n\
 * http://sizzlejs.com/\n\
 *\n\
 * Copyright 2013 jQuery Foundation, Inc. and other contributors\n\
 * Released under the MIT license\n\
 * http://jquery.org/license\n\
 *\n\
 * Date: 2014-04-18\n\
 */\n\
(function( window ) {\n\
\n\
var i,\n\
\tsupport,\n\
\tExpr,\n\
\tgetText,\n\
\tisXML,\n\
\ttokenize,\n\
\tcompile,\n\
\tselect,\n\
\toutermostContext,\n\
\tsortInput,\n\
\thasDuplicate,\n\
\n\
\t// Local document vars\n\
\tsetDocument,\n\
\tdocument,\n\
\tdocElem,\n\
\tdocumentIsHTML,\n\
\trbuggyQSA,\n\
\trbuggyMatches,\n\
\tmatches,\n\
\tcontains,\n\
\n\
\t// Instance-specific data\n\
\texpando = \"sizzle\" + -(new Date()),\n\
\tpreferredDoc = window.document,\n\
\tdirruns = 0,\n\
\tdone = 0,\n\
\tclassCache = createCache(),\n\
\ttokenCache = createCache(),\n\
\tcompilerCache = createCache(),\n\
\tsortOrder = function( a, b ) {\n\
\t\tif ( a === b ) {\n\
\t\t\thasDuplicate = true;\n\
\t\t}\n\
\t\treturn 0;\n\
\t},\n\
\n\
\t// General-purpose constants\n\
\tstrundefined = typeof undefined,\n\
\tMAX_NEGATIVE = 1 << 31,\n\
\n\
\t// Instance methods\n\
\thasOwn = ({}).hasOwnProperty,\n\
\tarr = [],\n\
\tpop = arr.pop,\n\
\tpush_native = arr.push,\n\
\tpush = arr.push,\n\
\tslice = arr.slice,\n\
\t// Use a stripped-down indexOf if we can't use a native one\n\
\tindexOf = arr.indexOf || function( elem ) {\n\
\t\tvar i = 0,\n\
\t\t\tlen = this.length;\n\
\t\tfor ( ; i < len; i++ ) {\n\
\t\t\tif ( this[i] === elem ) {\n\
\t\t\t\treturn i;\n\
\t\t\t}\n\
\t\t}\n\
\t\treturn -1;\n\
\t},\n\
\n\
\tbooleans = \"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped\",\n\
\n\
\t// Regular expressions\n\
\n\
\t// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace\n\
\twhitespace = \"[\\\\x20\\\\t\\\\r\\\\n\
\\\\f]\",\n\
\t// http://www.w3.org/TR/css3-syntax/#characters\n\
\tcharacterEncoding = \"(?:\\\\\\\\.|[\\\\w-]|[^\\\\x00-\\\\xa0])+\",\n\
\n\
\t// Loosely modeled on CSS identifier characters\n\
\t// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors\n\
\t// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier\n\
\tidentifier = characterEncoding.replace( \"w\", \"w#\" ),\n\
\n\
\t// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors\n\
\tattributes = \"\\\\[\" + whitespace + \"*(\" + characterEncoding + \")(?:\" + whitespace +\n\
\t\t// Operator (capture 2)\n\
\t\t\"*([*^$|!~]?=)\" + whitespace +\n\
\t\t// \"Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]\"\n\
\t\t\"*(?:'((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\"|(\" + identifier + \"))|)\" + whitespace +\n\
\t\t\"*\\\\]\",\n\
\n\
\tpseudos = \":(\" + characterEncoding + \")(?:\\\\((\" +\n\
\t\t// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:\n\
\t\t// 1. quoted (capture 3; capture 4 or capture 5)\n\
\t\t\"('((?:\\\\\\\\.|[^\\\\\\\\'])*)'|\\\"((?:\\\\\\\\.|[^\\\\\\\\\\\"])*)\\\")|\" +\n\
\t\t// 2. simple (capture 6)\n\
\t\t\"((?:\\\\\\\\.|[^\\\\\\\\()[\\\\]]|\" + attributes + \")*)|\" +\n\
\t\t// 3. anything else (capture 2)\n\
\t\t\".*\" +\n\
\t\t\")\\\\)|)\",\n\
\n\
\t// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter\n\
\trtrim = new RegExp( \"^\" + whitespace + \"+|((?:^|[^\\\\\\\\])(?:\\\\\\\\.)*)\" + whitespace + \"+$\", \"g\" ),\n\
\n\
\trcomma = new RegExp( \"^\" + whitespace + \"*,\" + whitespace + \"*\" ),\n\
\trcombinators = new RegExp( \"^\" + whitespace + \"*([>+~]|\" + whitespace + \")\" + whitespace + \"*\" ),\n\
\n\
\trattributeQuotes = new RegExp( \"=\" + whitespace + \"*([^\\\\]'\\\"]*?)\" + whitespace + \"*\\\\]\", \"g\" ),\n\
\n\
\trpseudo = new RegExp( pseudos ),\n\
\tridentifier = new RegExp( \"^\" + identifier + \"$\" ),\n\
\n\
\tmatchExpr = {\n\
\t\t\"ID\": new RegExp( \"^#(\" + characterEncoding + \")\" ),\n\
\t\t\"CLASS\": new RegExp( \"^\\\\.(\" + characterEncoding + \")\" ),\n\
\t\t\"TAG\": new RegExp( \"^(\" + characterEncoding.replace( \"w\", \"w*\" ) + \")\" ),\n\
\t\t\"ATTR\": new RegExp( \"^\" + attributes ),\n\
\t\t\"PSEUDO\": new RegExp( \"^\" + pseudos ),\n\
\t\t\"CHILD\": new RegExp( \"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\\\(\" + whitespace +\n\
\t\t\t\"*(even|odd|(([+-]|)(\\\\d*)n|)\" + whitespace + \"*(?:([+-]|)\" + whitespace +\n\
\t\t\t\"*(\\\\d+)|))\" + whitespace + \"*\\\\)|)\", \"i\" ),\n\
\t\t\"bool\": new RegExp( \"^(?:\" + booleans + \")$\", \"i\" ),\n\
\t\t// For use in libraries implementing .is()\n\
\t\t// We use this for POS matching in `select`\n\
\t\t\"needsContext\": new RegExp( \"^\" + whitespace + \"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\\\(\" +\n\
\t\t\twhitespace + \"*((?:-\\\\d)?\\\\d*)\" + whitespace + \"*\\\\)|)(?=[^-]|$)\", \"i\" )\n\
\t},\n\
\n\
\trinputs = /^(?:input|select|textarea|button)$/i,\n\
\trheader = /^h\\d$/i,\n\
\n\
\trnative = /^[^{]+\\{\\s*\\[native \\w/,\n\
\n\
\t// Easily-parseable/retrievable ID or TAG or CLASS selectors\n\
\trquickExpr = /^(?:#([\\w-]+)|(\\w+)|\\.([\\w-]+))$/,\n\
\n\
\trsibling = /[+~]/,\n\
\trescape = /'|\\\\/g,\n\
\n\
\t// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters\n\
\trunescape = new RegExp( \"\\\\\\\\([\\\\da-f]{1,6}\" + whitespace + \"?|(\" + whitespace + \")|.)\", \"ig\" ),\n\
\tfunescape = function( _, escaped, escapedWhitespace ) {\n\
\t\tvar high = \"0x\" + escaped - 0x10000;\n\
\t\t// NaN means non-codepoint\n\
\t\t// Support: Firefox<24\n\
\t\t// Workaround erroneous numeric interpretation of +\"0x\"\n\
\t\treturn high !== high || escapedWhitespace ?\n\
\t\t\tescaped :\n\
\t\t\thigh < 0 ?\n\
\t\t\t\t// BMP codepoint\n\
\t\t\t\tString.fromCharCode( high + 0x10000 ) :\n\
\t\t\t\t// Supplemental Plane codepoint (surrogate pair)\n\
\t\t\t\tString.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );\n\
\t};\n\
\n\
// Optimize for push.apply( _, NodeList )\n\
try {\n\
\tpush.apply(\n\
\t\t(arr = slice.call( preferredDoc.childNodes )),\n\
\t\tpreferredDoc.childNodes\n\
\t);\n\
\t// Support: Android<4.0\n\
\t// Detect silently failing push.apply\n\
\tarr[ preferredDoc.childNodes.length ].nodeType;\n\
} catch ( e ) {\n\
\tpush = { apply: arr.length ?\n\
\n\
\t\t// Leverage slice if possible\n\
\t\tfunction( target, els ) {\n\
\t\t\tpush_native.apply( target, slice.call(els) );\n\
\t\t} :\n\
\n\
\t\t// Support: IE<9\n\
\t\t// Otherwise append directly\n\
\t\tfunction( target, els ) {\n\
\t\t\tvar j = target.length,\n\
\t\t\t\ti = 0;\n\
\t\t\t// Can't trust NodeList.length\n\
\t\t\twhile ( (target[j++] = els[i++]) ) {}\n\
\t\t\ttarget.length = j - 1;\n\
\t\t}\n\
\t};\n\
}\n\
\n\
function Sizzle( selector, context, results, seed ) {\n\
\tvar match, elem, m, nodeType,\n\
\t\t// QSA vars\n\
\t\ti, groups, old, nid, newContext, newSelector;\n\
\n\
\tif ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {\n\
\t\tsetDocument( context );\n\
\t}\n\
\n\
\tcontext = context || document;\n\
\tresults = results || [];\n\
\n\
\tif ( !selector || typeof selector !== \"string\" ) {\n\
\t\treturn results;\n\
\t}\n\
\n\
\tif ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {\n\
\t\treturn [];\n\
\t}\n\
\n\
\tif ( documentIsHTML && !seed ) {\n\
\n\
\t\t// Shortcuts\n\
\t\tif ( (match = rquickExpr.exec( selector )) ) {\n\
\t\t\t// Speed-up: Sizzle(\"#ID\")\n\
\t\t\tif ( (m = match[1]) ) {\n\
\t\t\t\tif ( nodeType === 9 ) {\n\
\t\t\t\t\telem = context.getElementById( m );\n\
\t\t\t\t\t// Check parentNode to catch when Blackberry 4.6 returns\n\
\t\t\t\t\t// nodes that are no longer in the document (jQuery #6963)\n\
\t\t\t\t\tif ( elem && elem.parentNode ) {\n\
\t\t\t\t\t\t// Handle the case where IE, Opera, and Webkit return items\n\
\t\t\t\t\t\t// by name instead of ID\n\
\t\t\t\t\t\tif ( elem.id === m ) {\n\
\t\t\t\t\t\t\tresults.push( elem );\n\
\t\t\t\t\t\t\treturn results;\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t} else {\n\
\t\t\t\t\t\treturn results;\n\
\t\t\t\t\t}\n\
\t\t\t\t} else {\n\
\t\t\t\t\t// Context is not a document\n\
\t\t\t\t\tif ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&\n\
\t\t\t\t\t\tcontains( context, elem ) && elem.id === m ) {\n\
\t\t\t\t\t\tresults.push( elem );\n\
\t\t\t\t\t\treturn results;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\n\
\t\t\t// Speed-up: Sizzle(\"TAG\")\n\
\t\t\t} else if ( match[2] ) {\n\
\t\t\t\tpush.apply( results, context.getElementsByTagName( selector ) );\n\
\t\t\t\treturn results;\n\
\n\
\t\t\t// Speed-up: Sizzle(\".CLASS\")\n\
\t\t\t} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {\n\
\t\t\t\tpush.apply( results, context.getElementsByClassName( m ) );\n\
\t\t\t\treturn results;\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// QSA path\n\
\t\tif ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {\n\
\t\t\tnid = old = expando;\n\
\t\t\tnewContext = context;\n\
\t\t\tnewSelector = nodeType === 9 && selector;\n\
\n\
\t\t\t// qSA works strangely on Element-rooted queries\n\
\t\t\t// We can work around this by specifying an extra ID on the root\n\
\t\t\t// and working up from there (Thanks to Andrew Dupont for the technique)\n\
\t\t\t// IE 8 doesn't work on object elements\n\
\t\t\tif ( nodeType === 1 && context.nodeName.toLowerCase() !== \"object\" ) {\n\
\t\t\t\tgroups = tokenize( selector );\n\
\n\
\t\t\t\tif ( (old = context.getAttribute(\"id\")) ) {\n\
\t\t\t\t\tnid = old.replace( rescape, \"\\\\$&\" );\n\
\t\t\t\t} else {\n\
\t\t\t\t\tcontext.setAttribute( \"id\", nid );\n\
\t\t\t\t}\n\
\t\t\t\tnid = \"[id='\" + nid + \"'] \";\n\
\n\
\t\t\t\ti = groups.length;\n\
\t\t\t\twhile ( i-- ) {\n\
\t\t\t\t\tgroups[i] = nid + toSelector( groups[i] );\n\
\t\t\t\t}\n\
\t\t\t\tnewContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;\n\
\t\t\t\tnewSelector = groups.join(\",\");\n\
\t\t\t}\n\
\n\
\t\t\tif ( newSelector ) {\n\
\t\t\t\ttry {\n\
\t\t\t\t\tpush.apply( results,\n\
\t\t\t\t\t\tnewContext.querySelectorAll( newSelector )\n\
\t\t\t\t\t);\n\
\t\t\t\t\treturn results;\n\
\t\t\t\t} catch(qsaError) {\n\
\t\t\t\t} finally {\n\
\t\t\t\t\tif ( !old ) {\n\
\t\t\t\t\t\tcontext.removeAttribute(\"id\");\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\t// All others\n\
\treturn select( selector.replace( rtrim, \"$1\" ), context, results, seed );\n\
}\n\
\n\
/**\n\
 * Create key-value caches of limited size\n\
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with\n\
 *\tproperty name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)\n\
 *\tdeleting the oldest entry\n\
 */\n\
function createCache() {\n\
\tvar keys = [];\n\
\n\
\tfunction cache( key, value ) {\n\
\t\t// Use (key + \" \") to avoid collision with native prototype properties (see Issue #157)\n\
\t\tif ( keys.push( key + \" \" ) > Expr.cacheLength ) {\n\
\t\t\t// Only keep the most recent entries\n\
\t\t\tdelete cache[ keys.shift() ];\n\
\t\t}\n\
\t\treturn (cache[ key + \" \" ] = value);\n\
\t}\n\
\treturn cache;\n\
}\n\
\n\
/**\n\
 * Mark a function for special use by Sizzle\n\
 * @param {Function} fn The function to mark\n\
 */\n\
function markFunction( fn ) {\n\
\tfn[ expando ] = true;\n\
\treturn fn;\n\
}\n\
\n\
/**\n\
 * Support testing using an element\n\
 * @param {Function} fn Passed the created div and expects a boolean result\n\
 */\n\
function assert( fn ) {\n\
\tvar div = document.createElement(\"div\");\n\
\n\
\ttry {\n\
\t\treturn !!fn( div );\n\
\t} catch (e) {\n\
\t\treturn false;\n\
\t} finally {\n\
\t\t// Remove from its parent by default\n\
\t\tif ( div.parentNode ) {\n\
\t\t\tdiv.parentNode.removeChild( div );\n\
\t\t}\n\
\t\t// release memory in IE\n\
\t\tdiv = null;\n\
\t}\n\
}\n\
\n\
/**\n\
 * Adds the same handler for all of the specified attrs\n\
 * @param {String} attrs Pipe-separated list of attributes\n\
 * @param {Function} handler The method that will be applied\n\
 */\n\
function addHandle( attrs, handler ) {\n\
\tvar arr = attrs.split(\"|\"),\n\
\t\ti = attrs.length;\n\
\n\
\twhile ( i-- ) {\n\
\t\tExpr.attrHandle[ arr[i] ] = handler;\n\
\t}\n\
}\n\
\n\
/**\n\
 * Checks document order of two siblings\n\
 * @param {Element} a\n\
 * @param {Element} b\n\
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b\n\
 */\n\
function siblingCheck( a, b ) {\n\
\tvar cur = b && a,\n\
\t\tdiff = cur && a.nodeType === 1 && b.nodeType === 1 &&\n\
\t\t\t( ~b.sourceIndex || MAX_NEGATIVE ) -\n\
\t\t\t( ~a.sourceIndex || MAX_NEGATIVE );\n\
\n\
\t// Use IE sourceIndex if available on both nodes\n\
\tif ( diff ) {\n\
\t\treturn diff;\n\
\t}\n\
\n\
\t// Check if b follows a\n\
\tif ( cur ) {\n\
\t\twhile ( (cur = cur.nextSibling) ) {\n\
\t\t\tif ( cur === b ) {\n\
\t\t\t\treturn -1;\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\treturn a ? 1 : -1;\n\
}\n\
\n\
/**\n\
 * Returns a function to use in pseudos for input types\n\
 * @param {String} type\n\
 */\n\
function createInputPseudo( type ) {\n\
\treturn function( elem ) {\n\
\t\tvar name = elem.nodeName.toLowerCase();\n\
\t\treturn name === \"input\" && elem.type === type;\n\
\t};\n\
}\n\
\n\
/**\n\
 * Returns a function to use in pseudos for buttons\n\
 * @param {String} type\n\
 */\n\
function createButtonPseudo( type ) {\n\
\treturn function( elem ) {\n\
\t\tvar name = elem.nodeName.toLowerCase();\n\
\t\treturn (name === \"input\" || name === \"button\") && elem.type === type;\n\
\t};\n\
}\n\
\n\
/**\n\
 * Returns a function to use in pseudos for positionals\n\
 * @param {Function} fn\n\
 */\n\
function createPositionalPseudo( fn ) {\n\
\treturn markFunction(function( argument ) {\n\
\t\targument = +argument;\n\
\t\treturn markFunction(function( seed, matches ) {\n\
\t\t\tvar j,\n\
\t\t\t\tmatchIndexes = fn( [], seed.length, argument ),\n\
\t\t\t\ti = matchIndexes.length;\n\
\n\
\t\t\t// Match elements found at the specified indexes\n\
\t\t\twhile ( i-- ) {\n\
\t\t\t\tif ( seed[ (j = matchIndexes[i]) ] ) {\n\
\t\t\t\t\tseed[j] = !(matches[j] = seed[j]);\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t});\n\
\t});\n\
}\n\
\n\
/**\n\
 * Checks a node for validity as a Sizzle context\n\
 * @param {Element|Object=} context\n\
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value\n\
 */\n\
function testContext( context ) {\n\
\treturn context && typeof context.getElementsByTagName !== strundefined && context;\n\
}\n\
\n\
// Expose support vars for convenience\n\
support = Sizzle.support = {};\n\
\n\
/**\n\
 * Detects XML nodes\n\
 * @param {Element|Object} elem An element or a document\n\
 * @returns {Boolean} True iff elem is a non-HTML XML node\n\
 */\n\
isXML = Sizzle.isXML = function( elem ) {\n\
\t// documentElement is verified for cases where it doesn't yet exist\n\
\t// (such as loading iframes in IE - #4833)\n\
\tvar documentElement = elem && (elem.ownerDocument || elem).documentElement;\n\
\treturn documentElement ? documentElement.nodeName !== \"HTML\" : false;\n\
};\n\
\n\
/**\n\
 * Sets document-related variables once based on the current document\n\
 * @param {Element|Object} [doc] An element or document object to use to set the document\n\
 * @returns {Object} Returns the current document\n\
 */\n\
setDocument = Sizzle.setDocument = function( node ) {\n\
\tvar hasCompare,\n\
\t\tdoc = node ? node.ownerDocument || node : preferredDoc,\n\
\t\tparent = doc.defaultView;\n\
\n\
\t// If no document and documentElement is available, return\n\
\tif ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {\n\
\t\treturn document;\n\
\t}\n\
\n\
\t// Set our document\n\
\tdocument = doc;\n\
\tdocElem = doc.documentElement;\n\
\n\
\t// Support tests\n\
\tdocumentIsHTML = !isXML( doc );\n\
\n\
\t// Support: IE>8\n\
\t// If iframe document is assigned to \"document\" variable and if iframe has been reloaded,\n\
\t// IE will throw \"permission denied\" error when accessing \"document\" variable, see jQuery #13936\n\
\t// IE6-8 do not support the defaultView property so parent will be undefined\n\
\tif ( parent && parent !== parent.top ) {\n\
\t\t// IE11 does not have attachEvent, so all must suffer\n\
\t\tif ( parent.addEventListener ) {\n\
\t\t\tparent.addEventListener( \"unload\", function() {\n\
\t\t\t\tsetDocument();\n\
\t\t\t}, false );\n\
\t\t} else if ( parent.attachEvent ) {\n\
\t\t\tparent.attachEvent( \"onunload\", function() {\n\
\t\t\t\tsetDocument();\n\
\t\t\t});\n\
\t\t}\n\
\t}\n\
\n\
\t/* Attributes\n\
\t---------------------------------------------------------------------- */\n\
\n\
\t// Support: IE<8\n\
\t// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)\n\
\tsupport.attributes = assert(function( div ) {\n\
\t\tdiv.className = \"i\";\n\
\t\treturn !div.getAttribute(\"className\");\n\
\t});\n\
\n\
\t/* getElement(s)By*\n\
\t---------------------------------------------------------------------- */\n\
\n\
\t// Check if getElementsByTagName(\"*\") returns only elements\n\
\tsupport.getElementsByTagName = assert(function( div ) {\n\
\t\tdiv.appendChild( doc.createComment(\"\") );\n\
\t\treturn !div.getElementsByTagName(\"*\").length;\n\
\t});\n\
\n\
\t// Check if getElementsByClassName can be trusted\n\
\tsupport.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {\n\
\t\tdiv.innerHTML = \"<div class='a'></div><div class='a i'></div>\";\n\
\n\
\t\t// Support: Safari<4\n\
\t\t// Catch class over-caching\n\
\t\tdiv.firstChild.className = \"i\";\n\
\t\t// Support: Opera<10\n\
\t\t// Catch gEBCN failure to find non-leading classes\n\
\t\treturn div.getElementsByClassName(\"i\").length === 2;\n\
\t});\n\
\n\
\t// Support: IE<10\n\
\t// Check if getElementById returns elements by name\n\
\t// The broken getElementById methods don't pick up programatically-set names,\n\
\t// so use a roundabout getElementsByName test\n\
\tsupport.getById = assert(function( div ) {\n\
\t\tdocElem.appendChild( div ).id = expando;\n\
\t\treturn !doc.getElementsByName || !doc.getElementsByName( expando ).length;\n\
\t});\n\
\n\
\t// ID find and filter\n\
\tif ( support.getById ) {\n\
\t\tExpr.find[\"ID\"] = function( id, context ) {\n\
\t\t\tif ( typeof context.getElementById !== strundefined && documentIsHTML ) {\n\
\t\t\t\tvar m = context.getElementById( id );\n\
\t\t\t\t// Check parentNode to catch when Blackberry 4.6 returns\n\
\t\t\t\t// nodes that are no longer in the document #6963\n\
\t\t\t\treturn m && m.parentNode ? [ m ] : [];\n\
\t\t\t}\n\
\t\t};\n\
\t\tExpr.filter[\"ID\"] = function( id ) {\n\
\t\t\tvar attrId = id.replace( runescape, funescape );\n\
\t\t\treturn function( elem ) {\n\
\t\t\t\treturn elem.getAttribute(\"id\") === attrId;\n\
\t\t\t};\n\
\t\t};\n\
\t} else {\n\
\t\t// Support: IE6/7\n\
\t\t// getElementById is not reliable as a find shortcut\n\
\t\tdelete Expr.find[\"ID\"];\n\
\n\
\t\tExpr.filter[\"ID\"] =  function( id ) {\n\
\t\t\tvar attrId = id.replace( runescape, funescape );\n\
\t\t\treturn function( elem ) {\n\
\t\t\t\tvar node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode(\"id\");\n\
\t\t\t\treturn node && node.value === attrId;\n\
\t\t\t};\n\
\t\t};\n\
\t}\n\
\n\
\t// Tag\n\
\tExpr.find[\"TAG\"] = support.getElementsByTagName ?\n\
\t\tfunction( tag, context ) {\n\
\t\t\tif ( typeof context.getElementsByTagName !== strundefined ) {\n\
\t\t\t\treturn context.getElementsByTagName( tag );\n\
\t\t\t}\n\
\t\t} :\n\
\t\tfunction( tag, context ) {\n\
\t\t\tvar elem,\n\
\t\t\t\ttmp = [],\n\
\t\t\t\ti = 0,\n\
\t\t\t\tresults = context.getElementsByTagName( tag );\n\
\n\
\t\t\t// Filter out possible comments\n\
\t\t\tif ( tag === \"*\" ) {\n\
\t\t\t\twhile ( (elem = results[i++]) ) {\n\
\t\t\t\t\tif ( elem.nodeType === 1 ) {\n\
\t\t\t\t\t\ttmp.push( elem );\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\n\
\t\t\t\treturn tmp;\n\
\t\t\t}\n\
\t\t\treturn results;\n\
\t\t};\n\
\n\
\t// Class\n\
\tExpr.find[\"CLASS\"] = support.getElementsByClassName && function( className, context ) {\n\
\t\tif ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {\n\
\t\t\treturn context.getElementsByClassName( className );\n\
\t\t}\n\
\t};\n\
\n\
\t/* QSA/matchesSelector\n\
\t---------------------------------------------------------------------- */\n\
\n\
\t// QSA and matchesSelector support\n\
\n\
\t// matchesSelector(:active) reports false when true (IE9/Opera 11.5)\n\
\trbuggyMatches = [];\n\
\n\
\t// qSa(:focus) reports false when true (Chrome 21)\n\
\t// We allow this because of a bug in IE8/9 that throws an error\n\
\t// whenever `document.activeElement` is accessed on an iframe\n\
\t// So, we allow :focus to pass through QSA all the time to avoid the IE error\n\
\t// See http://bugs.jquery.com/ticket/13378\n\
\trbuggyQSA = [];\n\
\n\
\tif ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {\n\
\t\t// Build QSA regex\n\
\t\t// Regex strategy adopted from Diego Perini\n\
\t\tassert(function( div ) {\n\
\t\t\t// Select is set to empty string on purpose\n\
\t\t\t// This is to test IE's treatment of not explicitly\n\
\t\t\t// setting a boolean content attribute,\n\
\t\t\t// since its presence should be enough\n\
\t\t\t// http://bugs.jquery.com/ticket/12359\n\
\t\t\tdiv.innerHTML = \"<select msallowclip=''><option selected=''></option></select>\";\n\
\n\
\t\t\t// Support: IE8, Opera 11-12.16\n\
\t\t\t// Nothing should be selected when empty strings follow ^= or $= or *=\n\
\t\t\t// The test attribute must be unknown in Opera but \"safe\" for WinRT\n\
\t\t\t// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section\n\
\t\t\tif ( div.querySelectorAll(\"[msallowclip^='']\").length ) {\n\
\t\t\t\trbuggyQSA.push( \"[*^$]=\" + whitespace + \"*(?:''|\\\"\\\")\" );\n\
\t\t\t}\n\
\n\
\t\t\t// Support: IE8\n\
\t\t\t// Boolean attributes and \"value\" are not treated correctly\n\
\t\t\tif ( !div.querySelectorAll(\"[selected]\").length ) {\n\
\t\t\t\trbuggyQSA.push( \"\\\\[\" + whitespace + \"*(?:value|\" + booleans + \")\" );\n\
\t\t\t}\n\
\n\
\t\t\t// Webkit/Opera - :checked should return selected option elements\n\
\t\t\t// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n\
\t\t\t// IE8 throws error here and will not see later tests\n\
\t\t\tif ( !div.querySelectorAll(\":checked\").length ) {\n\
\t\t\t\trbuggyQSA.push(\":checked\");\n\
\t\t\t}\n\
\t\t});\n\
\n\
\t\tassert(function( div ) {\n\
\t\t\t// Support: Windows 8 Native Apps\n\
\t\t\t// The type and name attributes are restricted during .innerHTML assignment\n\
\t\t\tvar input = doc.createElement(\"input\");\n\
\t\t\tinput.setAttribute( \"type\", \"hidden\" );\n\
\t\t\tdiv.appendChild( input ).setAttribute( \"name\", \"D\" );\n\
\n\
\t\t\t// Support: IE8\n\
\t\t\t// Enforce case-sensitivity of name attribute\n\
\t\t\tif ( div.querySelectorAll(\"[name=d]\").length ) {\n\
\t\t\t\trbuggyQSA.push( \"name\" + whitespace + \"*[*^$|!~]?=\" );\n\
\t\t\t}\n\
\n\
\t\t\t// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)\n\
\t\t\t// IE8 throws error here and will not see later tests\n\
\t\t\tif ( !div.querySelectorAll(\":enabled\").length ) {\n\
\t\t\t\trbuggyQSA.push( \":enabled\", \":disabled\" );\n\
\t\t\t}\n\
\n\
\t\t\t// Opera 10-11 does not throw on post-comma invalid pseudos\n\
\t\t\tdiv.querySelectorAll(\"*,:x\");\n\
\t\t\trbuggyQSA.push(\",.*:\");\n\
\t\t});\n\
\t}\n\
\n\
\tif ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||\n\
\t\tdocElem.webkitMatchesSelector ||\n\
\t\tdocElem.mozMatchesSelector ||\n\
\t\tdocElem.oMatchesSelector ||\n\
\t\tdocElem.msMatchesSelector) )) ) {\n\
\n\
\t\tassert(function( div ) {\n\
\t\t\t// Check to see if it's possible to do matchesSelector\n\
\t\t\t// on a disconnected node (IE 9)\n\
\t\t\tsupport.disconnectedMatch = matches.call( div, \"div\" );\n\
\n\
\t\t\t// This should fail with an exception\n\
\t\t\t// Gecko does not error, returns false instead\n\
\t\t\tmatches.call( div, \"[s!='']:x\" );\n\
\t\t\trbuggyMatches.push( \"!=\", pseudos );\n\
\t\t});\n\
\t}\n\
\n\
\trbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join(\"|\") );\n\
\trbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join(\"|\") );\n\
\n\
\t/* Contains\n\
\t---------------------------------------------------------------------- */\n\
\thasCompare = rnative.test( docElem.compareDocumentPosition );\n\
\n\
\t// Element contains another\n\
\t// Purposefully does not implement inclusive descendent\n\
\t// As in, an element does not contain itself\n\
\tcontains = hasCompare || rnative.test( docElem.contains ) ?\n\
\t\tfunction( a, b ) {\n\
\t\t\tvar adown = a.nodeType === 9 ? a.documentElement : a,\n\
\t\t\t\tbup = b && b.parentNode;\n\
\t\t\treturn a === bup || !!( bup && bup.nodeType === 1 && (\n\
\t\t\t\tadown.contains ?\n\
\t\t\t\t\tadown.contains( bup ) :\n\
\t\t\t\t\ta.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16\n\
\t\t\t));\n\
\t\t} :\n\
\t\tfunction( a, b ) {\n\
\t\t\tif ( b ) {\n\
\t\t\t\twhile ( (b = b.parentNode) ) {\n\
\t\t\t\t\tif ( b === a ) {\n\
\t\t\t\t\t\treturn true;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t\treturn false;\n\
\t\t};\n\
\n\
\t/* Sorting\n\
\t---------------------------------------------------------------------- */\n\
\n\
\t// Document order sorting\n\
\tsortOrder = hasCompare ?\n\
\tfunction( a, b ) {\n\
\n\
\t\t// Flag for duplicate removal\n\
\t\tif ( a === b ) {\n\
\t\t\thasDuplicate = true;\n\
\t\t\treturn 0;\n\
\t\t}\n\
\n\
\t\t// Sort on method existence if only one input has compareDocumentPosition\n\
\t\tvar compare = !a.compareDocumentPosition - !b.compareDocumentPosition;\n\
\t\tif ( compare ) {\n\
\t\t\treturn compare;\n\
\t\t}\n\
\n\
\t\t// Calculate position if both inputs belong to the same document\n\
\t\tcompare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?\n\
\t\t\ta.compareDocumentPosition( b ) :\n\
\n\
\t\t\t// Otherwise we know they are disconnected\n\
\t\t\t1;\n\
\n\
\t\t// Disconnected nodes\n\
\t\tif ( compare & 1 ||\n\
\t\t\t(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {\n\
\n\
\t\t\t// Choose the first element that is related to our preferred document\n\
\t\t\tif ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {\n\
\t\t\t\treturn -1;\n\
\t\t\t}\n\
\t\t\tif ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {\n\
\t\t\t\treturn 1;\n\
\t\t\t}\n\
\n\
\t\t\t// Maintain original order\n\
\t\t\treturn sortInput ?\n\
\t\t\t\t( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :\n\
\t\t\t\t0;\n\
\t\t}\n\
\n\
\t\treturn compare & 4 ? -1 : 1;\n\
\t} :\n\
\tfunction( a, b ) {\n\
\t\t// Exit early if the nodes are identical\n\
\t\tif ( a === b ) {\n\
\t\t\thasDuplicate = true;\n\
\t\t\treturn 0;\n\
\t\t}\n\
\n\
\t\tvar cur,\n\
\t\t\ti = 0,\n\
\t\t\taup = a.parentNode,\n\
\t\t\tbup = b.parentNode,\n\
\t\t\tap = [ a ],\n\
\t\t\tbp = [ b ];\n\
\n\
\t\t// Parentless nodes are either documents or disconnected\n\
\t\tif ( !aup || !bup ) {\n\
\t\t\treturn a === doc ? -1 :\n\
\t\t\t\tb === doc ? 1 :\n\
\t\t\t\taup ? -1 :\n\
\t\t\t\tbup ? 1 :\n\
\t\t\t\tsortInput ?\n\
\t\t\t\t( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :\n\
\t\t\t\t0;\n\
\n\
\t\t// If the nodes are siblings, we can do a quick check\n\
\t\t} else if ( aup === bup ) {\n\
\t\t\treturn siblingCheck( a, b );\n\
\t\t}\n\
\n\
\t\t// Otherwise we need full lists of their ancestors for comparison\n\
\t\tcur = a;\n\
\t\twhile ( (cur = cur.parentNode) ) {\n\
\t\t\tap.unshift( cur );\n\
\t\t}\n\
\t\tcur = b;\n\
\t\twhile ( (cur = cur.parentNode) ) {\n\
\t\t\tbp.unshift( cur );\n\
\t\t}\n\
\n\
\t\t// Walk down the tree looking for a discrepancy\n\
\t\twhile ( ap[i] === bp[i] ) {\n\
\t\t\ti++;\n\
\t\t}\n\
\n\
\t\treturn i ?\n\
\t\t\t// Do a sibling check if the nodes have a common ancestor\n\
\t\t\tsiblingCheck( ap[i], bp[i] ) :\n\
\n\
\t\t\t// Otherwise nodes in our document sort first\n\
\t\t\tap[i] === preferredDoc ? -1 :\n\
\t\t\tbp[i] === preferredDoc ? 1 :\n\
\t\t\t0;\n\
\t};\n\
\n\
\treturn doc;\n\
};\n\
\n\
Sizzle.matches = function( expr, elements ) {\n\
\treturn Sizzle( expr, null, null, elements );\n\
};\n\
\n\
Sizzle.matchesSelector = function( elem, expr ) {\n\
\t// Set document vars if needed\n\
\tif ( ( elem.ownerDocument || elem ) !== document ) {\n\
\t\tsetDocument( elem );\n\
\t}\n\
\n\
\t// Make sure that attribute selectors are quoted\n\
\texpr = expr.replace( rattributeQuotes, \"='$1']\" );\n\
\n\
\tif ( support.matchesSelector && documentIsHTML &&\n\
\t\t( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&\n\
\t\t( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {\n\
\n\
\t\ttry {\n\
\t\t\tvar ret = matches.call( elem, expr );\n\
\n\
\t\t\t// IE 9's matchesSelector returns false on disconnected nodes\n\
\t\t\tif ( ret || support.disconnectedMatch ||\n\
\t\t\t\t\t// As well, disconnected nodes are said to be in a document\n\
\t\t\t\t\t// fragment in IE 9\n\
\t\t\t\t\telem.document && elem.document.nodeType !== 11 ) {\n\
\t\t\t\treturn ret;\n\
\t\t\t}\n\
\t\t} catch(e) {}\n\
\t}\n\
\n\
\treturn Sizzle( expr, document, null, [ elem ] ).length > 0;\n\
};\n\
\n\
Sizzle.contains = function( context, elem ) {\n\
\t// Set document vars if needed\n\
\tif ( ( context.ownerDocument || context ) !== document ) {\n\
\t\tsetDocument( context );\n\
\t}\n\
\treturn contains( context, elem );\n\
};\n\
\n\
Sizzle.attr = function( elem, name ) {\n\
\t// Set document vars if needed\n\
\tif ( ( elem.ownerDocument || elem ) !== document ) {\n\
\t\tsetDocument( elem );\n\
\t}\n\
\n\
\tvar fn = Expr.attrHandle[ name.toLowerCase() ],\n\
\t\t// Don't get fooled by Object.prototype properties (jQuery #13807)\n\
\t\tval = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?\n\
\t\t\tfn( elem, name, !documentIsHTML ) :\n\
\t\t\tundefined;\n\
\n\
\treturn val !== undefined ?\n\
\t\tval :\n\
\t\tsupport.attributes || !documentIsHTML ?\n\
\t\t\telem.getAttribute( name ) :\n\
\t\t\t(val = elem.getAttributeNode(name)) && val.specified ?\n\
\t\t\t\tval.value :\n\
\t\t\t\tnull;\n\
};\n\
\n\
Sizzle.error = function( msg ) {\n\
\tthrow new Error( \"Syntax error, unrecognized expression: \" + msg );\n\
};\n\
\n\
/**\n\
 * Document sorting and removing duplicates\n\
 * @param {ArrayLike} results\n\
 */\n\
Sizzle.uniqueSort = function( results ) {\n\
\tvar elem,\n\
\t\tduplicates = [],\n\
\t\tj = 0,\n\
\t\ti = 0;\n\
\n\
\t// Unless we *know* we can detect duplicates, assume their presence\n\
\thasDuplicate = !support.detectDuplicates;\n\
\tsortInput = !support.sortStable && results.slice( 0 );\n\
\tresults.sort( sortOrder );\n\
\n\
\tif ( hasDuplicate ) {\n\
\t\twhile ( (elem = results[i++]) ) {\n\
\t\t\tif ( elem === results[ i ] ) {\n\
\t\t\t\tj = duplicates.push( i );\n\
\t\t\t}\n\
\t\t}\n\
\t\twhile ( j-- ) {\n\
\t\t\tresults.splice( duplicates[ j ], 1 );\n\
\t\t}\n\
\t}\n\
\n\
\t// Clear input after sorting to release objects\n\
\t// See https://github.com/jquery/sizzle/pull/225\n\
\tsortInput = null;\n\
\n\
\treturn results;\n\
};\n\
\n\
/**\n\
 * Utility function for retrieving the text value of an array of DOM nodes\n\
 * @param {Array|Element} elem\n\
 */\n\
getText = Sizzle.getText = function( elem ) {\n\
\tvar node,\n\
\t\tret = \"\",\n\
\t\ti = 0,\n\
\t\tnodeType = elem.nodeType;\n\
\n\
\tif ( !nodeType ) {\n\
\t\t// If no nodeType, this is expected to be an array\n\
\t\twhile ( (node = elem[i++]) ) {\n\
\t\t\t// Do not traverse comment nodes\n\
\t\t\tret += getText( node );\n\
\t\t}\n\
\t} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {\n\
\t\t// Use textContent for elements\n\
\t\t// innerText usage removed for consistency of new lines (jQuery #11153)\n\
\t\tif ( typeof elem.textContent === \"string\" ) {\n\
\t\t\treturn elem.textContent;\n\
\t\t} else {\n\
\t\t\t// Traverse its children\n\
\t\t\tfor ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {\n\
\t\t\t\tret += getText( elem );\n\
\t\t\t}\n\
\t\t}\n\
\t} else if ( nodeType === 3 || nodeType === 4 ) {\n\
\t\treturn elem.nodeValue;\n\
\t}\n\
\t// Do not include comment or processing instruction nodes\n\
\n\
\treturn ret;\n\
};\n\
\n\
Expr = Sizzle.selectors = {\n\
\n\
\t// Can be adjusted by the user\n\
\tcacheLength: 50,\n\
\n\
\tcreatePseudo: markFunction,\n\
\n\
\tmatch: matchExpr,\n\
\n\
\tattrHandle: {},\n\
\n\
\tfind: {},\n\
\n\
\trelative: {\n\
\t\t\">\": { dir: \"parentNode\", first: true },\n\
\t\t\" \": { dir: \"parentNode\" },\n\
\t\t\"+\": { dir: \"previousSibling\", first: true },\n\
\t\t\"~\": { dir: \"previousSibling\" }\n\
\t},\n\
\n\
\tpreFilter: {\n\
\t\t\"ATTR\": function( match ) {\n\
\t\t\tmatch[1] = match[1].replace( runescape, funescape );\n\
\n\
\t\t\t// Move the given value to match[3] whether quoted or unquoted\n\
\t\t\tmatch[3] = ( match[3] || match[4] || match[5] || \"\" ).replace( runescape, funescape );\n\
\n\
\t\t\tif ( match[2] === \"~=\" ) {\n\
\t\t\t\tmatch[3] = \" \" + match[3] + \" \";\n\
\t\t\t}\n\
\n\
\t\t\treturn match.slice( 0, 4 );\n\
\t\t},\n\
\n\
\t\t\"CHILD\": function( match ) {\n\
\t\t\t/* matches from matchExpr[\"CHILD\"]\n\
\t\t\t\t1 type (only|nth|...)\n\
\t\t\t\t2 what (child|of-type)\n\
\t\t\t\t3 argument (even|odd|\\d*|\\d*n([+-]\\d+)?|...)\n\
\t\t\t\t4 xn-component of xn+y argument ([+-]?\\d*n|)\n\
\t\t\t\t5 sign of xn-component\n\
\t\t\t\t6 x of xn-component\n\
\t\t\t\t7 sign of y-component\n\
\t\t\t\t8 y of y-component\n\
\t\t\t*/\n\
\t\t\tmatch[1] = match[1].toLowerCase();\n\
\n\
\t\t\tif ( match[1].slice( 0, 3 ) === \"nth\" ) {\n\
\t\t\t\t// nth-* requires argument\n\
\t\t\t\tif ( !match[3] ) {\n\
\t\t\t\t\tSizzle.error( match[0] );\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// numeric x and y parameters for Expr.filter.CHILD\n\
\t\t\t\t// remember that false/true cast respectively to 0/1\n\
\t\t\t\tmatch[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === \"even\" || match[3] === \"odd\" ) );\n\
\t\t\t\tmatch[5] = +( ( match[7] + match[8] ) || match[3] === \"odd\" );\n\
\n\
\t\t\t// other types prohibit arguments\n\
\t\t\t} else if ( match[3] ) {\n\
\t\t\t\tSizzle.error( match[0] );\n\
\t\t\t}\n\
\n\
\t\t\treturn match;\n\
\t\t},\n\
\n\
\t\t\"PSEUDO\": function( match ) {\n\
\t\t\tvar excess,\n\
\t\t\t\tunquoted = !match[6] && match[2];\n\
\n\
\t\t\tif ( matchExpr[\"CHILD\"].test( match[0] ) ) {\n\
\t\t\t\treturn null;\n\
\t\t\t}\n\
\n\
\t\t\t// Accept quoted arguments as-is\n\
\t\t\tif ( match[3] ) {\n\
\t\t\t\tmatch[2] = match[4] || match[5] || \"\";\n\
\n\
\t\t\t// Strip excess characters from unquoted arguments\n\
\t\t\t} else if ( unquoted && rpseudo.test( unquoted ) &&\n\
\t\t\t\t// Get excess from tokenize (recursively)\n\
\t\t\t\t(excess = tokenize( unquoted, true )) &&\n\
\t\t\t\t// advance to the next closing parenthesis\n\
\t\t\t\t(excess = unquoted.indexOf( \")\", unquoted.length - excess ) - unquoted.length) ) {\n\
\n\
\t\t\t\t// excess is a negative index\n\
\t\t\t\tmatch[0] = match[0].slice( 0, excess );\n\
\t\t\t\tmatch[2] = unquoted.slice( 0, excess );\n\
\t\t\t}\n\
\n\
\t\t\t// Return only captures needed by the pseudo filter method (type and argument)\n\
\t\t\treturn match.slice( 0, 3 );\n\
\t\t}\n\
\t},\n\
\n\
\tfilter: {\n\
\n\
\t\t\"TAG\": function( nodeNameSelector ) {\n\
\t\t\tvar nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();\n\
\t\t\treturn nodeNameSelector === \"*\" ?\n\
\t\t\t\tfunction() { return true; } :\n\
\t\t\t\tfunction( elem ) {\n\
\t\t\t\t\treturn elem.nodeName && elem.nodeName.toLowerCase() === nodeName;\n\
\t\t\t\t};\n\
\t\t},\n\
\n\
\t\t\"CLASS\": function( className ) {\n\
\t\t\tvar pattern = classCache[ className + \" \" ];\n\
\n\
\t\t\treturn pattern ||\n\
\t\t\t\t(pattern = new RegExp( \"(^|\" + whitespace + \")\" + className + \"(\" + whitespace + \"|$)\" )) &&\n\
\t\t\t\tclassCache( className, function( elem ) {\n\
\t\t\t\t\treturn pattern.test( typeof elem.className === \"string\" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute(\"class\") || \"\" );\n\
\t\t\t\t});\n\
\t\t},\n\
\n\
\t\t\"ATTR\": function( name, operator, check ) {\n\
\t\t\treturn function( elem ) {\n\
\t\t\t\tvar result = Sizzle.attr( elem, name );\n\
\n\
\t\t\t\tif ( result == null ) {\n\
\t\t\t\t\treturn operator === \"!=\";\n\
\t\t\t\t}\n\
\t\t\t\tif ( !operator ) {\n\
\t\t\t\t\treturn true;\n\
\t\t\t\t}\n\
\n\
\t\t\t\tresult += \"\";\n\
\n\
\t\t\t\treturn operator === \"=\" ? result === check :\n\
\t\t\t\t\toperator === \"!=\" ? result !== check :\n\
\t\t\t\t\toperator === \"^=\" ? check && result.indexOf( check ) === 0 :\n\
\t\t\t\t\toperator === \"*=\" ? check && result.indexOf( check ) > -1 :\n\
\t\t\t\t\toperator === \"$=\" ? check && result.slice( -check.length ) === check :\n\
\t\t\t\t\toperator === \"~=\" ? ( \" \" + result + \" \" ).indexOf( check ) > -1 :\n\
\t\t\t\t\toperator === \"|=\" ? result === check || result.slice( 0, check.length + 1 ) === check + \"-\" :\n\
\t\t\t\t\tfalse;\n\
\t\t\t};\n\
\t\t},\n\
\n\
\t\t\"CHILD\": function( type, what, argument, first, last ) {\n\
\t\t\tvar simple = type.slice( 0, 3 ) !== \"nth\",\n\
\t\t\t\tforward = type.slice( -4 ) !== \"last\",\n\
\t\t\t\tofType = what === \"of-type\";\n\
\n\
\t\t\treturn first === 1 && last === 0 ?\n\
\n\
\t\t\t\t// Shortcut for :nth-*(n)\n\
\t\t\t\tfunction( elem ) {\n\
\t\t\t\t\treturn !!elem.parentNode;\n\
\t\t\t\t} :\n\
\n\
\t\t\t\tfunction( elem, context, xml ) {\n\
\t\t\t\t\tvar cache, outerCache, node, diff, nodeIndex, start,\n\
\t\t\t\t\t\tdir = simple !== forward ? \"nextSibling\" : \"previousSibling\",\n\
\t\t\t\t\t\tparent = elem.parentNode,\n\
\t\t\t\t\t\tname = ofType && elem.nodeName.toLowerCase(),\n\
\t\t\t\t\t\tuseCache = !xml && !ofType;\n\
\n\
\t\t\t\t\tif ( parent ) {\n\
\n\
\t\t\t\t\t\t// :(first|last|only)-(child|of-type)\n\
\t\t\t\t\t\tif ( simple ) {\n\
\t\t\t\t\t\t\twhile ( dir ) {\n\
\t\t\t\t\t\t\t\tnode = elem;\n\
\t\t\t\t\t\t\t\twhile ( (node = node[ dir ]) ) {\n\
\t\t\t\t\t\t\t\t\tif ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {\n\
\t\t\t\t\t\t\t\t\t\treturn false;\n\
\t\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t\t// Reverse direction for :only-* (if we haven't yet done so)\n\
\t\t\t\t\t\t\t\tstart = dir = type === \"only\" && !start && \"nextSibling\";\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\treturn true;\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\tstart = [ forward ? parent.firstChild : parent.lastChild ];\n\
\n\
\t\t\t\t\t\t// non-xml :nth-child(...) stores cache data on `parent`\n\
\t\t\t\t\t\tif ( forward && useCache ) {\n\
\t\t\t\t\t\t\t// Seek `elem` from a previously-cached index\n\
\t\t\t\t\t\t\touterCache = parent[ expando ] || (parent[ expando ] = {});\n\
\t\t\t\t\t\t\tcache = outerCache[ type ] || [];\n\
\t\t\t\t\t\t\tnodeIndex = cache[0] === dirruns && cache[1];\n\
\t\t\t\t\t\t\tdiff = cache[0] === dirruns && cache[2];\n\
\t\t\t\t\t\t\tnode = nodeIndex && parent.childNodes[ nodeIndex ];\n\
\n\
\t\t\t\t\t\t\twhile ( (node = ++nodeIndex && node && node[ dir ] ||\n\
\n\
\t\t\t\t\t\t\t\t// Fallback to seeking `elem` from the start\n\
\t\t\t\t\t\t\t\t(diff = nodeIndex = 0) || start.pop()) ) {\n\
\n\
\t\t\t\t\t\t\t\t// When found, cache indexes on `parent` and break\n\
\t\t\t\t\t\t\t\tif ( node.nodeType === 1 && ++diff && node === elem ) {\n\
\t\t\t\t\t\t\t\t\touterCache[ type ] = [ dirruns, nodeIndex, diff ];\n\
\t\t\t\t\t\t\t\t\tbreak;\n\
\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t// Use previously-cached element index if available\n\
\t\t\t\t\t\t} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {\n\
\t\t\t\t\t\t\tdiff = cache[1];\n\
\n\
\t\t\t\t\t\t// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)\n\
\t\t\t\t\t\t} else {\n\
\t\t\t\t\t\t\t// Use the same loop as above to seek `elem` from the start\n\
\t\t\t\t\t\t\twhile ( (node = ++nodeIndex && node && node[ dir ] ||\n\
\t\t\t\t\t\t\t\t(diff = nodeIndex = 0) || start.pop()) ) {\n\
\n\
\t\t\t\t\t\t\t\tif ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {\n\
\t\t\t\t\t\t\t\t\t// Cache the index of each encountered element\n\
\t\t\t\t\t\t\t\t\tif ( useCache ) {\n\
\t\t\t\t\t\t\t\t\t\t(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];\n\
\t\t\t\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t\t\t\tif ( node === elem ) {\n\
\t\t\t\t\t\t\t\t\t\tbreak;\n\
\t\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t// Incorporate the offset, then check against cycle size\n\
\t\t\t\t\t\tdiff -= last;\n\
\t\t\t\t\t\treturn diff === first || ( diff % first === 0 && diff / first >= 0 );\n\
\t\t\t\t\t}\n\
\t\t\t\t};\n\
\t\t},\n\
\n\
\t\t\"PSEUDO\": function( pseudo, argument ) {\n\
\t\t\t// pseudo-class names are case-insensitive\n\
\t\t\t// http://www.w3.org/TR/selectors/#pseudo-classes\n\
\t\t\t// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters\n\
\t\t\t// Remember that setFilters inherits from pseudos\n\
\t\t\tvar args,\n\
\t\t\t\tfn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||\n\
\t\t\t\t\tSizzle.error( \"unsupported pseudo: \" + pseudo );\n\
\n\
\t\t\t// The user may use createPseudo to indicate that\n\
\t\t\t// arguments are needed to create the filter function\n\
\t\t\t// just as Sizzle does\n\
\t\t\tif ( fn[ expando ] ) {\n\
\t\t\t\treturn fn( argument );\n\
\t\t\t}\n\
\n\
\t\t\t// But maintain support for old signatures\n\
\t\t\tif ( fn.length > 1 ) {\n\
\t\t\t\targs = [ pseudo, pseudo, \"\", argument ];\n\
\t\t\t\treturn Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?\n\
\t\t\t\t\tmarkFunction(function( seed, matches ) {\n\
\t\t\t\t\t\tvar idx,\n\
\t\t\t\t\t\t\tmatched = fn( seed, argument ),\n\
\t\t\t\t\t\t\ti = matched.length;\n\
\t\t\t\t\t\twhile ( i-- ) {\n\
\t\t\t\t\t\t\tidx = indexOf.call( seed, matched[i] );\n\
\t\t\t\t\t\t\tseed[ idx ] = !( matches[ idx ] = matched[i] );\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}) :\n\
\t\t\t\t\tfunction( elem ) {\n\
\t\t\t\t\t\treturn fn( elem, 0, args );\n\
\t\t\t\t\t};\n\
\t\t\t}\n\
\n\
\t\t\treturn fn;\n\
\t\t}\n\
\t},\n\
\n\
\tpseudos: {\n\
\t\t// Potentially complex pseudos\n\
\t\t\"not\": markFunction(function( selector ) {\n\
\t\t\t// Trim the selector passed to compile\n\
\t\t\t// to avoid treating leading and trailing\n\
\t\t\t// spaces as combinators\n\
\t\t\tvar input = [],\n\
\t\t\t\tresults = [],\n\
\t\t\t\tmatcher = compile( selector.replace( rtrim, \"$1\" ) );\n\
\n\
\t\t\treturn matcher[ expando ] ?\n\
\t\t\t\tmarkFunction(function( seed, matches, context, xml ) {\n\
\t\t\t\t\tvar elem,\n\
\t\t\t\t\t\tunmatched = matcher( seed, null, xml, [] ),\n\
\t\t\t\t\t\ti = seed.length;\n\
\n\
\t\t\t\t\t// Match elements unmatched by `matcher`\n\
\t\t\t\t\twhile ( i-- ) {\n\
\t\t\t\t\t\tif ( (elem = unmatched[i]) ) {\n\
\t\t\t\t\t\t\tseed[i] = !(matches[i] = elem);\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t}) :\n\
\t\t\t\tfunction( elem, context, xml ) {\n\
\t\t\t\t\tinput[0] = elem;\n\
\t\t\t\t\tmatcher( input, null, xml, results );\n\
\t\t\t\t\treturn !results.pop();\n\
\t\t\t\t};\n\
\t\t}),\n\
\n\
\t\t\"has\": markFunction(function( selector ) {\n\
\t\t\treturn function( elem ) {\n\
\t\t\t\treturn Sizzle( selector, elem ).length > 0;\n\
\t\t\t};\n\
\t\t}),\n\
\n\
\t\t\"contains\": markFunction(function( text ) {\n\
\t\t\treturn function( elem ) {\n\
\t\t\t\treturn ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;\n\
\t\t\t};\n\
\t\t}),\n\
\n\
\t\t// \"Whether an element is represented by a :lang() selector\n\
\t\t// is based solely on the element's language value\n\
\t\t// being equal to the identifier C,\n\
\t\t// or beginning with the identifier C immediately followed by \"-\".\n\
\t\t// The matching of C against the element's language value is performed case-insensitively.\n\
\t\t// The identifier C does not have to be a valid language name.\"\n\
\t\t// http://www.w3.org/TR/selectors/#lang-pseudo\n\
\t\t\"lang\": markFunction( function( lang ) {\n\
\t\t\t// lang value must be a valid identifier\n\
\t\t\tif ( !ridentifier.test(lang || \"\") ) {\n\
\t\t\t\tSizzle.error( \"unsupported lang: \" + lang );\n\
\t\t\t}\n\
\t\t\tlang = lang.replace( runescape, funescape ).toLowerCase();\n\
\t\t\treturn function( elem ) {\n\
\t\t\t\tvar elemLang;\n\
\t\t\t\tdo {\n\
\t\t\t\t\tif ( (elemLang = documentIsHTML ?\n\
\t\t\t\t\t\telem.lang :\n\
\t\t\t\t\t\telem.getAttribute(\"xml:lang\") || elem.getAttribute(\"lang\")) ) {\n\
\n\
\t\t\t\t\t\telemLang = elemLang.toLowerCase();\n\
\t\t\t\t\t\treturn elemLang === lang || elemLang.indexOf( lang + \"-\" ) === 0;\n\
\t\t\t\t\t}\n\
\t\t\t\t} while ( (elem = elem.parentNode) && elem.nodeType === 1 );\n\
\t\t\t\treturn false;\n\
\t\t\t};\n\
\t\t}),\n\
\n\
\t\t// Miscellaneous\n\
\t\t\"target\": function( elem ) {\n\
\t\t\tvar hash = window.location && window.location.hash;\n\
\t\t\treturn hash && hash.slice( 1 ) === elem.id;\n\
\t\t},\n\
\n\
\t\t\"root\": function( elem ) {\n\
\t\t\treturn elem === docElem;\n\
\t\t},\n\
\n\
\t\t\"focus\": function( elem ) {\n\
\t\t\treturn elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);\n\
\t\t},\n\
\n\
\t\t// Boolean properties\n\
\t\t\"enabled\": function( elem ) {\n\
\t\t\treturn elem.disabled === false;\n\
\t\t},\n\
\n\
\t\t\"disabled\": function( elem ) {\n\
\t\t\treturn elem.disabled === true;\n\
\t\t},\n\
\n\
\t\t\"checked\": function( elem ) {\n\
\t\t\t// In CSS3, :checked should return both checked and selected elements\n\
\t\t\t// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked\n\
\t\t\tvar nodeName = elem.nodeName.toLowerCase();\n\
\t\t\treturn (nodeName === \"input\" && !!elem.checked) || (nodeName === \"option\" && !!elem.selected);\n\
\t\t},\n\
\n\
\t\t\"selected\": function( elem ) {\n\
\t\t\t// Accessing this property makes selected-by-default\n\
\t\t\t// options in Safari work properly\n\
\t\t\tif ( elem.parentNode ) {\n\
\t\t\t\telem.parentNode.selectedIndex;\n\
\t\t\t}\n\
\n\
\t\t\treturn elem.selected === true;\n\
\t\t},\n\
\n\
\t\t// Contents\n\
\t\t\"empty\": function( elem ) {\n\
\t\t\t// http://www.w3.org/TR/selectors/#empty-pseudo\n\
\t\t\t// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),\n\
\t\t\t//   but not by others (comment: 8; processing instruction: 7; etc.)\n\
\t\t\t// nodeType < 6 works because attributes (2) do not appear as children\n\
\t\t\tfor ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {\n\
\t\t\t\tif ( elem.nodeType < 6 ) {\n\
\t\t\t\t\treturn false;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t\treturn true;\n\
\t\t},\n\
\n\
\t\t\"parent\": function( elem ) {\n\
\t\t\treturn !Expr.pseudos[\"empty\"]( elem );\n\
\t\t},\n\
\n\
\t\t// Element/input types\n\
\t\t\"header\": function( elem ) {\n\
\t\t\treturn rheader.test( elem.nodeName );\n\
\t\t},\n\
\n\
\t\t\"input\": function( elem ) {\n\
\t\t\treturn rinputs.test( elem.nodeName );\n\
\t\t},\n\
\n\
\t\t\"button\": function( elem ) {\n\
\t\t\tvar name = elem.nodeName.toLowerCase();\n\
\t\t\treturn name === \"input\" && elem.type === \"button\" || name === \"button\";\n\
\t\t},\n\
\n\
\t\t\"text\": function( elem ) {\n\
\t\t\tvar attr;\n\
\t\t\treturn elem.nodeName.toLowerCase() === \"input\" &&\n\
\t\t\t\telem.type === \"text\" &&\n\
\n\
\t\t\t\t// Support: IE<8\n\
\t\t\t\t// New HTML5 attribute values (e.g., \"search\") appear with elem.type === \"text\"\n\
\t\t\t\t( (attr = elem.getAttribute(\"type\")) == null || attr.toLowerCase() === \"text\" );\n\
\t\t},\n\
\n\
\t\t// Position-in-collection\n\
\t\t\"first\": createPositionalPseudo(function() {\n\
\t\t\treturn [ 0 ];\n\
\t\t}),\n\
\n\
\t\t\"last\": createPositionalPseudo(function( matchIndexes, length ) {\n\
\t\t\treturn [ length - 1 ];\n\
\t\t}),\n\
\n\
\t\t\"eq\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n\
\t\t\treturn [ argument < 0 ? argument + length : argument ];\n\
\t\t}),\n\
\n\
\t\t\"even\": createPositionalPseudo(function( matchIndexes, length ) {\n\
\t\t\tvar i = 0;\n\
\t\t\tfor ( ; i < length; i += 2 ) {\n\
\t\t\t\tmatchIndexes.push( i );\n\
\t\t\t}\n\
\t\t\treturn matchIndexes;\n\
\t\t}),\n\
\n\
\t\t\"odd\": createPositionalPseudo(function( matchIndexes, length ) {\n\
\t\t\tvar i = 1;\n\
\t\t\tfor ( ; i < length; i += 2 ) {\n\
\t\t\t\tmatchIndexes.push( i );\n\
\t\t\t}\n\
\t\t\treturn matchIndexes;\n\
\t\t}),\n\
\n\
\t\t\"lt\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n\
\t\t\tvar i = argument < 0 ? argument + length : argument;\n\
\t\t\tfor ( ; --i >= 0; ) {\n\
\t\t\t\tmatchIndexes.push( i );\n\
\t\t\t}\n\
\t\t\treturn matchIndexes;\n\
\t\t}),\n\
\n\
\t\t\"gt\": createPositionalPseudo(function( matchIndexes, length, argument ) {\n\
\t\t\tvar i = argument < 0 ? argument + length : argument;\n\
\t\t\tfor ( ; ++i < length; ) {\n\
\t\t\t\tmatchIndexes.push( i );\n\
\t\t\t}\n\
\t\t\treturn matchIndexes;\n\
\t\t})\n\
\t}\n\
};\n\
\n\
Expr.pseudos[\"nth\"] = Expr.pseudos[\"eq\"];\n\
\n\
// Add button/input type pseudos\n\
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {\n\
\tExpr.pseudos[ i ] = createInputPseudo( i );\n\
}\n\
for ( i in { submit: true, reset: true } ) {\n\
\tExpr.pseudos[ i ] = createButtonPseudo( i );\n\
}\n\
\n\
// Easy API for creating new setFilters\n\
function setFilters() {}\n\
setFilters.prototype = Expr.filters = Expr.pseudos;\n\
Expr.setFilters = new setFilters();\n\
\n\
tokenize = Sizzle.tokenize = function( selector, parseOnly ) {\n\
\tvar matched, match, tokens, type,\n\
\t\tsoFar, groups, preFilters,\n\
\t\tcached = tokenCache[ selector + \" \" ];\n\
\n\
\tif ( cached ) {\n\
\t\treturn parseOnly ? 0 : cached.slice( 0 );\n\
\t}\n\
\n\
\tsoFar = selector;\n\
\tgroups = [];\n\
\tpreFilters = Expr.preFilter;\n\
\n\
\twhile ( soFar ) {\n\
\n\
\t\t// Comma and first run\n\
\t\tif ( !matched || (match = rcomma.exec( soFar )) ) {\n\
\t\t\tif ( match ) {\n\
\t\t\t\t// Don't consume trailing commas as valid\n\
\t\t\t\tsoFar = soFar.slice( match[0].length ) || soFar;\n\
\t\t\t}\n\
\t\t\tgroups.push( (tokens = []) );\n\
\t\t}\n\
\n\
\t\tmatched = false;\n\
\n\
\t\t// Combinators\n\
\t\tif ( (match = rcombinators.exec( soFar )) ) {\n\
\t\t\tmatched = match.shift();\n\
\t\t\ttokens.push({\n\
\t\t\t\tvalue: matched,\n\
\t\t\t\t// Cast descendant combinators to space\n\
\t\t\t\ttype: match[0].replace( rtrim, \" \" )\n\
\t\t\t});\n\
\t\t\tsoFar = soFar.slice( matched.length );\n\
\t\t}\n\
\n\
\t\t// Filters\n\
\t\tfor ( type in Expr.filter ) {\n\
\t\t\tif ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||\n\
\t\t\t\t(match = preFilters[ type ]( match ))) ) {\n\
\t\t\t\tmatched = match.shift();\n\
\t\t\t\ttokens.push({\n\
\t\t\t\t\tvalue: matched,\n\
\t\t\t\t\ttype: type,\n\
\t\t\t\t\tmatches: match\n\
\t\t\t\t});\n\
\t\t\t\tsoFar = soFar.slice( matched.length );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\tif ( !matched ) {\n\
\t\t\tbreak;\n\
\t\t}\n\
\t}\n\
\n\
\t// Return the length of the invalid excess\n\
\t// if we're just parsing\n\
\t// Otherwise, throw an error or return tokens\n\
\treturn parseOnly ?\n\
\t\tsoFar.length :\n\
\t\tsoFar ?\n\
\t\t\tSizzle.error( selector ) :\n\
\t\t\t// Cache the tokens\n\
\t\t\ttokenCache( selector, groups ).slice( 0 );\n\
};\n\
\n\
function toSelector( tokens ) {\n\
\tvar i = 0,\n\
\t\tlen = tokens.length,\n\
\t\tselector = \"\";\n\
\tfor ( ; i < len; i++ ) {\n\
\t\tselector += tokens[i].value;\n\
\t}\n\
\treturn selector;\n\
}\n\
\n\
function addCombinator( matcher, combinator, base ) {\n\
\tvar dir = combinator.dir,\n\
\t\tcheckNonElements = base && dir === \"parentNode\",\n\
\t\tdoneName = done++;\n\
\n\
\treturn combinator.first ?\n\
\t\t// Check against closest ancestor/preceding element\n\
\t\tfunction( elem, context, xml ) {\n\
\t\t\twhile ( (elem = elem[ dir ]) ) {\n\
\t\t\t\tif ( elem.nodeType === 1 || checkNonElements ) {\n\
\t\t\t\t\treturn matcher( elem, context, xml );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t} :\n\
\n\
\t\t// Check against all ancestor/preceding elements\n\
\t\tfunction( elem, context, xml ) {\n\
\t\t\tvar oldCache, outerCache,\n\
\t\t\t\tnewCache = [ dirruns, doneName ];\n\
\n\
\t\t\t// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching\n\
\t\t\tif ( xml ) {\n\
\t\t\t\twhile ( (elem = elem[ dir ]) ) {\n\
\t\t\t\t\tif ( elem.nodeType === 1 || checkNonElements ) {\n\
\t\t\t\t\t\tif ( matcher( elem, context, xml ) ) {\n\
\t\t\t\t\t\t\treturn true;\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t} else {\n\
\t\t\t\twhile ( (elem = elem[ dir ]) ) {\n\
\t\t\t\t\tif ( elem.nodeType === 1 || checkNonElements ) {\n\
\t\t\t\t\t\touterCache = elem[ expando ] || (elem[ expando ] = {});\n\
\t\t\t\t\t\tif ( (oldCache = outerCache[ dir ]) &&\n\
\t\t\t\t\t\t\toldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {\n\
\n\
\t\t\t\t\t\t\t// Assign to newCache so results back-propagate to previous elements\n\
\t\t\t\t\t\t\treturn (newCache[ 2 ] = oldCache[ 2 ]);\n\
\t\t\t\t\t\t} else {\n\
\t\t\t\t\t\t\t// Reuse newcache so results back-propagate to previous elements\n\
\t\t\t\t\t\t\touterCache[ dir ] = newCache;\n\
\n\
\t\t\t\t\t\t\t// A match means we're done; a fail means we have to keep checking\n\
\t\t\t\t\t\t\tif ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {\n\
\t\t\t\t\t\t\t\treturn true;\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t};\n\
}\n\
\n\
function elementMatcher( matchers ) {\n\
\treturn matchers.length > 1 ?\n\
\t\tfunction( elem, context, xml ) {\n\
\t\t\tvar i = matchers.length;\n\
\t\t\twhile ( i-- ) {\n\
\t\t\t\tif ( !matchers[i]( elem, context, xml ) ) {\n\
\t\t\t\t\treturn false;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t\treturn true;\n\
\t\t} :\n\
\t\tmatchers[0];\n\
}\n\
\n\
function multipleContexts( selector, contexts, results ) {\n\
\tvar i = 0,\n\
\t\tlen = contexts.length;\n\
\tfor ( ; i < len; i++ ) {\n\
\t\tSizzle( selector, contexts[i], results );\n\
\t}\n\
\treturn results;\n\
}\n\
\n\
function condense( unmatched, map, filter, context, xml ) {\n\
\tvar elem,\n\
\t\tnewUnmatched = [],\n\
\t\ti = 0,\n\
\t\tlen = unmatched.length,\n\
\t\tmapped = map != null;\n\
\n\
\tfor ( ; i < len; i++ ) {\n\
\t\tif ( (elem = unmatched[i]) ) {\n\
\t\t\tif ( !filter || filter( elem, context, xml ) ) {\n\
\t\t\t\tnewUnmatched.push( elem );\n\
\t\t\t\tif ( mapped ) {\n\
\t\t\t\t\tmap.push( i );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\treturn newUnmatched;\n\
}\n\
\n\
function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {\n\
\tif ( postFilter && !postFilter[ expando ] ) {\n\
\t\tpostFilter = setMatcher( postFilter );\n\
\t}\n\
\tif ( postFinder && !postFinder[ expando ] ) {\n\
\t\tpostFinder = setMatcher( postFinder, postSelector );\n\
\t}\n\
\treturn markFunction(function( seed, results, context, xml ) {\n\
\t\tvar temp, i, elem,\n\
\t\t\tpreMap = [],\n\
\t\t\tpostMap = [],\n\
\t\t\tpreexisting = results.length,\n\
\n\
\t\t\t// Get initial elements from seed or context\n\
\t\t\telems = seed || multipleContexts( selector || \"*\", context.nodeType ? [ context ] : context, [] ),\n\
\n\
\t\t\t// Prefilter to get matcher input, preserving a map for seed-results synchronization\n\
\t\t\tmatcherIn = preFilter && ( seed || !selector ) ?\n\
\t\t\t\tcondense( elems, preMap, preFilter, context, xml ) :\n\
\t\t\t\telems,\n\
\n\
\t\t\tmatcherOut = matcher ?\n\
\t\t\t\t// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,\n\
\t\t\t\tpostFinder || ( seed ? preFilter : preexisting || postFilter ) ?\n\
\n\
\t\t\t\t\t// ...intermediate processing is necessary\n\
\t\t\t\t\t[] :\n\
\n\
\t\t\t\t\t// ...otherwise use results directly\n\
\t\t\t\t\tresults :\n\
\t\t\t\tmatcherIn;\n\
\n\
\t\t// Find primary matches\n\
\t\tif ( matcher ) {\n\
\t\t\tmatcher( matcherIn, matcherOut, context, xml );\n\
\t\t}\n\
\n\
\t\t// Apply postFilter\n\
\t\tif ( postFilter ) {\n\
\t\t\ttemp = condense( matcherOut, postMap );\n\
\t\t\tpostFilter( temp, [], context, xml );\n\
\n\
\t\t\t// Un-match failing elements by moving them back to matcherIn\n\
\t\t\ti = temp.length;\n\
\t\t\twhile ( i-- ) {\n\
\t\t\t\tif ( (elem = temp[i]) ) {\n\
\t\t\t\t\tmatcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\tif ( seed ) {\n\
\t\t\tif ( postFinder || preFilter ) {\n\
\t\t\t\tif ( postFinder ) {\n\
\t\t\t\t\t// Get the final matcherOut by condensing this intermediate into postFinder contexts\n\
\t\t\t\t\ttemp = [];\n\
\t\t\t\t\ti = matcherOut.length;\n\
\t\t\t\t\twhile ( i-- ) {\n\
\t\t\t\t\t\tif ( (elem = matcherOut[i]) ) {\n\
\t\t\t\t\t\t\t// Restore matcherIn since elem is not yet a final match\n\
\t\t\t\t\t\t\ttemp.push( (matcherIn[i] = elem) );\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t\tpostFinder( null, (matcherOut = []), temp, xml );\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Move matched elements from seed to results to keep them synchronized\n\
\t\t\t\ti = matcherOut.length;\n\
\t\t\t\twhile ( i-- ) {\n\
\t\t\t\t\tif ( (elem = matcherOut[i]) &&\n\
\t\t\t\t\t\t(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {\n\
\n\
\t\t\t\t\t\tseed[temp] = !(results[temp] = elem);\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t// Add elements to results, through postFinder if defined\n\
\t\t} else {\n\
\t\t\tmatcherOut = condense(\n\
\t\t\t\tmatcherOut === results ?\n\
\t\t\t\t\tmatcherOut.splice( preexisting, matcherOut.length ) :\n\
\t\t\t\t\tmatcherOut\n\
\t\t\t);\n\
\t\t\tif ( postFinder ) {\n\
\t\t\t\tpostFinder( null, results, matcherOut, xml );\n\
\t\t\t} else {\n\
\t\t\t\tpush.apply( results, matcherOut );\n\
\t\t\t}\n\
\t\t}\n\
\t});\n\
}\n\
\n\
function matcherFromTokens( tokens ) {\n\
\tvar checkContext, matcher, j,\n\
\t\tlen = tokens.length,\n\
\t\tleadingRelative = Expr.relative[ tokens[0].type ],\n\
\t\timplicitRelative = leadingRelative || Expr.relative[\" \"],\n\
\t\ti = leadingRelative ? 1 : 0,\n\
\n\
\t\t// The foundational matcher ensures that elements are reachable from top-level context(s)\n\
\t\tmatchContext = addCombinator( function( elem ) {\n\
\t\t\treturn elem === checkContext;\n\
\t\t}, implicitRelative, true ),\n\
\t\tmatchAnyContext = addCombinator( function( elem ) {\n\
\t\t\treturn indexOf.call( checkContext, elem ) > -1;\n\
\t\t}, implicitRelative, true ),\n\
\t\tmatchers = [ function( elem, context, xml ) {\n\
\t\t\treturn ( !leadingRelative && ( xml || context !== outermostContext ) ) || (\n\
\t\t\t\t(checkContext = context).nodeType ?\n\
\t\t\t\t\tmatchContext( elem, context, xml ) :\n\
\t\t\t\t\tmatchAnyContext( elem, context, xml ) );\n\
\t\t} ];\n\
\n\
\tfor ( ; i < len; i++ ) {\n\
\t\tif ( (matcher = Expr.relative[ tokens[i].type ]) ) {\n\
\t\t\tmatchers = [ addCombinator(elementMatcher( matchers ), matcher) ];\n\
\t\t} else {\n\
\t\t\tmatcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );\n\
\n\
\t\t\t// Return special upon seeing a positional matcher\n\
\t\t\tif ( matcher[ expando ] ) {\n\
\t\t\t\t// Find the next relative operator (if any) for proper handling\n\
\t\t\t\tj = ++i;\n\
\t\t\t\tfor ( ; j < len; j++ ) {\n\
\t\t\t\t\tif ( Expr.relative[ tokens[j].type ] ) {\n\
\t\t\t\t\t\tbreak;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t\treturn setMatcher(\n\
\t\t\t\t\ti > 1 && elementMatcher( matchers ),\n\
\t\t\t\t\ti > 1 && toSelector(\n\
\t\t\t\t\t\t// If the preceding token was a descendant combinator, insert an implicit any-element `*`\n\
\t\t\t\t\t\ttokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === \" \" ? \"*\" : \"\" })\n\
\t\t\t\t\t).replace( rtrim, \"$1\" ),\n\
\t\t\t\t\tmatcher,\n\
\t\t\t\t\ti < j && matcherFromTokens( tokens.slice( i, j ) ),\n\
\t\t\t\t\tj < len && matcherFromTokens( (tokens = tokens.slice( j )) ),\n\
\t\t\t\t\tj < len && toSelector( tokens )\n\
\t\t\t\t);\n\
\t\t\t}\n\
\t\t\tmatchers.push( matcher );\n\
\t\t}\n\
\t}\n\
\n\
\treturn elementMatcher( matchers );\n\
}\n\
\n\
function matcherFromGroupMatchers( elementMatchers, setMatchers ) {\n\
\tvar bySet = setMatchers.length > 0,\n\
\t\tbyElement = elementMatchers.length > 0,\n\
\t\tsuperMatcher = function( seed, context, xml, results, outermost ) {\n\
\t\t\tvar elem, j, matcher,\n\
\t\t\t\tmatchedCount = 0,\n\
\t\t\t\ti = \"0\",\n\
\t\t\t\tunmatched = seed && [],\n\
\t\t\t\tsetMatched = [],\n\
\t\t\t\tcontextBackup = outermostContext,\n\
\t\t\t\t// We must always have either seed elements or outermost context\n\
\t\t\t\telems = seed || byElement && Expr.find[\"TAG\"]( \"*\", outermost ),\n\
\t\t\t\t// Use integer dirruns iff this is the outermost matcher\n\
\t\t\t\tdirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),\n\
\t\t\t\tlen = elems.length;\n\
\n\
\t\t\tif ( outermost ) {\n\
\t\t\t\toutermostContext = context !== document && context;\n\
\t\t\t}\n\
\n\
\t\t\t// Add elements passing elementMatchers directly to results\n\
\t\t\t// Keep `i` a string if there are no elements so `matchedCount` will be \"00\" below\n\
\t\t\t// Support: IE<9, Safari\n\
\t\t\t// Tolerate NodeList properties (IE: \"length\"; Safari: <number>) matching elements by id\n\
\t\t\tfor ( ; i !== len && (elem = elems[i]) != null; i++ ) {\n\
\t\t\t\tif ( byElement && elem ) {\n\
\t\t\t\t\tj = 0;\n\
\t\t\t\t\twhile ( (matcher = elementMatchers[j++]) ) {\n\
\t\t\t\t\t\tif ( matcher( elem, context, xml ) ) {\n\
\t\t\t\t\t\t\tresults.push( elem );\n\
\t\t\t\t\t\t\tbreak;\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t\tif ( outermost ) {\n\
\t\t\t\t\t\tdirruns = dirrunsUnique;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Track unmatched elements for set filters\n\
\t\t\t\tif ( bySet ) {\n\
\t\t\t\t\t// They will have gone through all possible matchers\n\
\t\t\t\t\tif ( (elem = !matcher && elem) ) {\n\
\t\t\t\t\t\tmatchedCount--;\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// Lengthen the array for every element, matched or not\n\
\t\t\t\t\tif ( seed ) {\n\
\t\t\t\t\t\tunmatched.push( elem );\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\t// Apply set filters to unmatched elements\n\
\t\t\tmatchedCount += i;\n\
\t\t\tif ( bySet && i !== matchedCount ) {\n\
\t\t\t\tj = 0;\n\
\t\t\t\twhile ( (matcher = setMatchers[j++]) ) {\n\
\t\t\t\t\tmatcher( unmatched, setMatched, context, xml );\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( seed ) {\n\
\t\t\t\t\t// Reintegrate element matches to eliminate the need for sorting\n\
\t\t\t\t\tif ( matchedCount > 0 ) {\n\
\t\t\t\t\t\twhile ( i-- ) {\n\
\t\t\t\t\t\t\tif ( !(unmatched[i] || setMatched[i]) ) {\n\
\t\t\t\t\t\t\t\tsetMatched[i] = pop.call( results );\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// Discard index placeholder values to get only actual matches\n\
\t\t\t\t\tsetMatched = condense( setMatched );\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Add matches to results\n\
\t\t\t\tpush.apply( results, setMatched );\n\
\n\
\t\t\t\t// Seedless set matches succeeding multiple successful matchers stipulate sorting\n\
\t\t\t\tif ( outermost && !seed && setMatched.length > 0 &&\n\
\t\t\t\t\t( matchedCount + setMatchers.length ) > 1 ) {\n\
\n\
\t\t\t\t\tSizzle.uniqueSort( results );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\t// Override manipulation of globals by nested matchers\n\
\t\t\tif ( outermost ) {\n\
\t\t\t\tdirruns = dirrunsUnique;\n\
\t\t\t\toutermostContext = contextBackup;\n\
\t\t\t}\n\
\n\
\t\t\treturn unmatched;\n\
\t\t};\n\
\n\
\treturn bySet ?\n\
\t\tmarkFunction( superMatcher ) :\n\
\t\tsuperMatcher;\n\
}\n\
\n\
compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {\n\
\tvar i,\n\
\t\tsetMatchers = [],\n\
\t\telementMatchers = [],\n\
\t\tcached = compilerCache[ selector + \" \" ];\n\
\n\
\tif ( !cached ) {\n\
\t\t// Generate a function of recursive functions that can be used to check each element\n\
\t\tif ( !match ) {\n\
\t\t\tmatch = tokenize( selector );\n\
\t\t}\n\
\t\ti = match.length;\n\
\t\twhile ( i-- ) {\n\
\t\t\tcached = matcherFromTokens( match[i] );\n\
\t\t\tif ( cached[ expando ] ) {\n\
\t\t\t\tsetMatchers.push( cached );\n\
\t\t\t} else {\n\
\t\t\t\telementMatchers.push( cached );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Cache the compiled function\n\
\t\tcached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );\n\
\n\
\t\t// Save selector and tokenization\n\
\t\tcached.selector = selector;\n\
\t}\n\
\treturn cached;\n\
};\n\
\n\
/**\n\
 * A low-level selection function that works with Sizzle's compiled\n\
 *  selector functions\n\
 * @param {String|Function} selector A selector or a pre-compiled\n\
 *  selector function built with Sizzle.compile\n\
 * @param {Element} context\n\
 * @param {Array} [results]\n\
 * @param {Array} [seed] A set of elements to match against\n\
 */\n\
select = Sizzle.select = function( selector, context, results, seed ) {\n\
\tvar i, tokens, token, type, find,\n\
\t\tcompiled = typeof selector === \"function\" && selector,\n\
\t\tmatch = !seed && tokenize( (selector = compiled.selector || selector) );\n\
\n\
\tresults = results || [];\n\
\n\
\t// Try to minimize operations if there is no seed and only one group\n\
\tif ( match.length === 1 ) {\n\
\n\
\t\t// Take a shortcut and set the context if the root selector is an ID\n\
\t\ttokens = match[0] = match[0].slice( 0 );\n\
\t\tif ( tokens.length > 2 && (token = tokens[0]).type === \"ID\" &&\n\
\t\t\t\tsupport.getById && context.nodeType === 9 && documentIsHTML &&\n\
\t\t\t\tExpr.relative[ tokens[1].type ] ) {\n\
\n\
\t\t\tcontext = ( Expr.find[\"ID\"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];\n\
\t\t\tif ( !context ) {\n\
\t\t\t\treturn results;\n\
\n\
\t\t\t// Precompiled matchers will still verify ancestry, so step up a level\n\
\t\t\t} else if ( compiled ) {\n\
\t\t\t\tcontext = context.parentNode;\n\
\t\t\t}\n\
\n\
\t\t\tselector = selector.slice( tokens.shift().value.length );\n\
\t\t}\n\
\n\
\t\t// Fetch a seed set for right-to-left matching\n\
\t\ti = matchExpr[\"needsContext\"].test( selector ) ? 0 : tokens.length;\n\
\t\twhile ( i-- ) {\n\
\t\t\ttoken = tokens[i];\n\
\n\
\t\t\t// Abort if we hit a combinator\n\
\t\t\tif ( Expr.relative[ (type = token.type) ] ) {\n\
\t\t\t\tbreak;\n\
\t\t\t}\n\
\t\t\tif ( (find = Expr.find[ type ]) ) {\n\
\t\t\t\t// Search, expanding context for leading sibling combinators\n\
\t\t\t\tif ( (seed = find(\n\
\t\t\t\t\ttoken.matches[0].replace( runescape, funescape ),\n\
\t\t\t\t\trsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context\n\
\t\t\t\t)) ) {\n\
\n\
\t\t\t\t\t// If seed is empty or no tokens remain, we can return early\n\
\t\t\t\t\ttokens.splice( i, 1 );\n\
\t\t\t\t\tselector = seed.length && toSelector( tokens );\n\
\t\t\t\t\tif ( !selector ) {\n\
\t\t\t\t\t\tpush.apply( results, seed );\n\
\t\t\t\t\t\treturn results;\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tbreak;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\t// Compile and execute a filtering function if one is not provided\n\
\t// Provide `match` to avoid retokenization if we modified the selector above\n\
\t( compiled || compile( selector, match ) )(\n\
\t\tseed,\n\
\t\tcontext,\n\
\t\t!documentIsHTML,\n\
\t\tresults,\n\
\t\trsibling.test( selector ) && testContext( context.parentNode ) || context\n\
\t);\n\
\treturn results;\n\
};\n\
\n\
// One-time assignments\n\
\n\
// Sort stability\n\
support.sortStable = expando.split(\"\").sort( sortOrder ).join(\"\") === expando;\n\
\n\
// Support: Chrome<14\n\
// Always assume duplicates if they aren't passed to the comparison function\n\
support.detectDuplicates = !!hasDuplicate;\n\
\n\
// Initialize against the default document\n\
setDocument();\n\
\n\
// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)\n\
// Detached nodes confoundingly follow *each other*\n\
support.sortDetached = assert(function( div1 ) {\n\
\t// Should return 1, but returns 4 (following)\n\
\treturn div1.compareDocumentPosition( document.createElement(\"div\") ) & 1;\n\
});\n\
\n\
// Support: IE<8\n\
// Prevent attribute/property \"interpolation\"\n\
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx\n\
if ( !assert(function( div ) {\n\
\tdiv.innerHTML = \"<a href='#'></a>\";\n\
\treturn div.firstChild.getAttribute(\"href\") === \"#\" ;\n\
}) ) {\n\
\taddHandle( \"type|href|height|width\", function( elem, name, isXML ) {\n\
\t\tif ( !isXML ) {\n\
\t\t\treturn elem.getAttribute( name, name.toLowerCase() === \"type\" ? 1 : 2 );\n\
\t\t}\n\
\t});\n\
}\n\
\n\
// Support: IE<9\n\
// Use defaultValue in place of getAttribute(\"value\")\n\
if ( !support.attributes || !assert(function( div ) {\n\
\tdiv.innerHTML = \"<input/>\";\n\
\tdiv.firstChild.setAttribute( \"value\", \"\" );\n\
\treturn div.firstChild.getAttribute( \"value\" ) === \"\";\n\
}) ) {\n\
\taddHandle( \"value\", function( elem, name, isXML ) {\n\
\t\tif ( !isXML && elem.nodeName.toLowerCase() === \"input\" ) {\n\
\t\t\treturn elem.defaultValue;\n\
\t\t}\n\
\t});\n\
}\n\
\n\
// Support: IE<9\n\
// Use getAttributeNode to fetch booleans when getAttribute lies\n\
if ( !assert(function( div ) {\n\
\treturn div.getAttribute(\"disabled\") == null;\n\
}) ) {\n\
\taddHandle( booleans, function( elem, name, isXML ) {\n\
\t\tvar val;\n\
\t\tif ( !isXML ) {\n\
\t\t\treturn elem[ name ] === true ? name.toLowerCase() :\n\
\t\t\t\t\t(val = elem.getAttributeNode( name )) && val.specified ?\n\
\t\t\t\t\tval.value :\n\
\t\t\t\tnull;\n\
\t\t}\n\
\t});\n\
}\n\
\n\
return Sizzle;\n\
\n\
})( window );\n\
\n\
\n\
\n\
jQuery.find = Sizzle;\n\
jQuery.expr = Sizzle.selectors;\n\
jQuery.expr[\":\"] = jQuery.expr.pseudos;\n\
jQuery.unique = Sizzle.uniqueSort;\n\
jQuery.text = Sizzle.getText;\n\
jQuery.isXMLDoc = Sizzle.isXML;\n\
jQuery.contains = Sizzle.contains;\n\
\n\
\n\
\n\
var rneedsContext = jQuery.expr.match.needsContext;\n\
\n\
var rsingleTag = (/^<(\\w+)\\s*\\/?>(?:<\\/\\1>|)$/);\n\
\n\
\n\
\n\
var risSimple = /^.[^:#\\[\\.,]*$/;\n\
\n\
// Implement the identical functionality for filter and not\n\
function winnow( elements, qualifier, not ) {\n\
\tif ( jQuery.isFunction( qualifier ) ) {\n\
\t\treturn jQuery.grep( elements, function( elem, i ) {\n\
\t\t\t/* jshint -W018 */\n\
\t\t\treturn !!qualifier.call( elem, i, elem ) !== not;\n\
\t\t});\n\
\n\
\t}\n\
\n\
\tif ( qualifier.nodeType ) {\n\
\t\treturn jQuery.grep( elements, function( elem ) {\n\
\t\t\treturn ( elem === qualifier ) !== not;\n\
\t\t});\n\
\n\
\t}\n\
\n\
\tif ( typeof qualifier === \"string\" ) {\n\
\t\tif ( risSimple.test( qualifier ) ) {\n\
\t\t\treturn jQuery.filter( qualifier, elements, not );\n\
\t\t}\n\
\n\
\t\tqualifier = jQuery.filter( qualifier, elements );\n\
\t}\n\
\n\
\treturn jQuery.grep( elements, function( elem ) {\n\
\t\treturn ( indexOf.call( qualifier, elem ) >= 0 ) !== not;\n\
\t});\n\
}\n\
\n\
jQuery.filter = function( expr, elems, not ) {\n\
\tvar elem = elems[ 0 ];\n\
\n\
\tif ( not ) {\n\
\t\texpr = \":not(\" + expr + \")\";\n\
\t}\n\
\n\
\treturn elems.length === 1 && elem.nodeType === 1 ?\n\
\t\tjQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :\n\
\t\tjQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {\n\
\t\t\treturn elem.nodeType === 1;\n\
\t\t}));\n\
};\n\
\n\
jQuery.fn.extend({\n\
\tfind: function( selector ) {\n\
\t\tvar i,\n\
\t\t\tlen = this.length,\n\
\t\t\tret = [],\n\
\t\t\tself = this;\n\
\n\
\t\tif ( typeof selector !== \"string\" ) {\n\
\t\t\treturn this.pushStack( jQuery( selector ).filter(function() {\n\
\t\t\t\tfor ( i = 0; i < len; i++ ) {\n\
\t\t\t\t\tif ( jQuery.contains( self[ i ], this ) ) {\n\
\t\t\t\t\t\treturn true;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}) );\n\
\t\t}\n\
\n\
\t\tfor ( i = 0; i < len; i++ ) {\n\
\t\t\tjQuery.find( selector, self[ i ], ret );\n\
\t\t}\n\
\n\
\t\t// Needed because $( selector, context ) becomes $( context ).find( selector )\n\
\t\tret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );\n\
\t\tret.selector = this.selector ? this.selector + \" \" + selector : selector;\n\
\t\treturn ret;\n\
\t},\n\
\tfilter: function( selector ) {\n\
\t\treturn this.pushStack( winnow(this, selector || [], false) );\n\
\t},\n\
\tnot: function( selector ) {\n\
\t\treturn this.pushStack( winnow(this, selector || [], true) );\n\
\t},\n\
\tis: function( selector ) {\n\
\t\treturn !!winnow(\n\
\t\t\tthis,\n\
\n\
\t\t\t// If this is a positional/relative selector, check membership in the returned set\n\
\t\t\t// so $(\"p:first\").is(\"p:last\") won't return true for a doc with two \"p\".\n\
\t\t\ttypeof selector === \"string\" && rneedsContext.test( selector ) ?\n\
\t\t\t\tjQuery( selector ) :\n\
\t\t\t\tselector || [],\n\
\t\t\tfalse\n\
\t\t).length;\n\
\t}\n\
});\n\
\n\
\n\
// Initialize a jQuery object\n\
\n\
\n\
// A central reference to the root jQuery(document)\n\
var rootjQuery,\n\
\n\
\t// A simple way to check for HTML strings\n\
\t// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)\n\
\t// Strict HTML recognition (#11290: must start with <)\n\
\trquickExpr = /^(?:\\s*(<[\\w\\W]+>)[^>]*|#([\\w-]*))$/,\n\
\n\
\tinit = jQuery.fn.init = function( selector, context ) {\n\
\t\tvar match, elem;\n\
\n\
\t\t// HANDLE: $(\"\"), $(null), $(undefined), $(false)\n\
\t\tif ( !selector ) {\n\
\t\t\treturn this;\n\
\t\t}\n\
\n\
\t\t// Handle HTML strings\n\
\t\tif ( typeof selector === \"string\" ) {\n\
\t\t\tif ( selector[0] === \"<\" && selector[ selector.length - 1 ] === \">\" && selector.length >= 3 ) {\n\
\t\t\t\t// Assume that strings that start and end with <> are HTML and skip the regex check\n\
\t\t\t\tmatch = [ null, selector, null ];\n\
\n\
\t\t\t} else {\n\
\t\t\t\tmatch = rquickExpr.exec( selector );\n\
\t\t\t}\n\
\n\
\t\t\t// Match html or make sure no context is specified for #id\n\
\t\t\tif ( match && (match[1] || !context) ) {\n\
\n\
\t\t\t\t// HANDLE: $(html) -> $(array)\n\
\t\t\t\tif ( match[1] ) {\n\
\t\t\t\t\tcontext = context instanceof jQuery ? context[0] : context;\n\
\n\
\t\t\t\t\t// scripts is true for back-compat\n\
\t\t\t\t\t// Intentionally let the error be thrown if parseHTML is not present\n\
\t\t\t\t\tjQuery.merge( this, jQuery.parseHTML(\n\
\t\t\t\t\t\tmatch[1],\n\
\t\t\t\t\t\tcontext && context.nodeType ? context.ownerDocument || context : document,\n\
\t\t\t\t\t\ttrue\n\
\t\t\t\t\t) );\n\
\n\
\t\t\t\t\t// HANDLE: $(html, props)\n\
\t\t\t\t\tif ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {\n\
\t\t\t\t\t\tfor ( match in context ) {\n\
\t\t\t\t\t\t\t// Properties of context are called as methods if possible\n\
\t\t\t\t\t\t\tif ( jQuery.isFunction( this[ match ] ) ) {\n\
\t\t\t\t\t\t\t\tthis[ match ]( context[ match ] );\n\
\n\
\t\t\t\t\t\t\t// ...and otherwise set as attributes\n\
\t\t\t\t\t\t\t} else {\n\
\t\t\t\t\t\t\t\tthis.attr( match, context[ match ] );\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\treturn this;\n\
\n\
\t\t\t\t// HANDLE: $(#id)\n\
\t\t\t\t} else {\n\
\t\t\t\t\telem = document.getElementById( match[2] );\n\
\n\
\t\t\t\t\t// Check parentNode to catch when Blackberry 4.6 returns\n\
\t\t\t\t\t// nodes that are no longer in the document #6963\n\
\t\t\t\t\tif ( elem && elem.parentNode ) {\n\
\t\t\t\t\t\t// Inject the element directly into the jQuery object\n\
\t\t\t\t\t\tthis.length = 1;\n\
\t\t\t\t\t\tthis[0] = elem;\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tthis.context = document;\n\
\t\t\t\t\tthis.selector = selector;\n\
\t\t\t\t\treturn this;\n\
\t\t\t\t}\n\
\n\
\t\t\t// HANDLE: $(expr, $(...))\n\
\t\t\t} else if ( !context || context.jquery ) {\n\
\t\t\t\treturn ( context || rootjQuery ).find( selector );\n\
\n\
\t\t\t// HANDLE: $(expr, context)\n\
\t\t\t// (which is just equivalent to: $(context).find(expr)\n\
\t\t\t} else {\n\
\t\t\t\treturn this.constructor( context ).find( selector );\n\
\t\t\t}\n\
\n\
\t\t// HANDLE: $(DOMElement)\n\
\t\t} else if ( selector.nodeType ) {\n\
\t\t\tthis.context = this[0] = selector;\n\
\t\t\tthis.length = 1;\n\
\t\t\treturn this;\n\
\n\
\t\t// HANDLE: $(function)\n\
\t\t// Shortcut for document ready\n\
\t\t} else if ( jQuery.isFunction( selector ) ) {\n\
\t\t\treturn typeof rootjQuery.ready !== \"undefined\" ?\n\
\t\t\t\trootjQuery.ready( selector ) :\n\
\t\t\t\t// Execute immediately if ready is not present\n\
\t\t\t\tselector( jQuery );\n\
\t\t}\n\
\n\
\t\tif ( selector.selector !== undefined ) {\n\
\t\t\tthis.selector = selector.selector;\n\
\t\t\tthis.context = selector.context;\n\
\t\t}\n\
\n\
\t\treturn jQuery.makeArray( selector, this );\n\
\t};\n\
\n\
// Give the init function the jQuery prototype for later instantiation\n\
init.prototype = jQuery.fn;\n\
\n\
// Initialize central reference\n\
rootjQuery = jQuery( document );\n\
\n\
\n\
var rparentsprev = /^(?:parents|prev(?:Until|All))/,\n\
\t// methods guaranteed to produce a unique set when starting from a unique set\n\
\tguaranteedUnique = {\n\
\t\tchildren: true,\n\
\t\tcontents: true,\n\
\t\tnext: true,\n\
\t\tprev: true\n\
\t};\n\
\n\
jQuery.extend({\n\
\tdir: function( elem, dir, until ) {\n\
\t\tvar matched = [],\n\
\t\t\ttruncate = until !== undefined;\n\
\n\
\t\twhile ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {\n\
\t\t\tif ( elem.nodeType === 1 ) {\n\
\t\t\t\tif ( truncate && jQuery( elem ).is( until ) ) {\n\
\t\t\t\t\tbreak;\n\
\t\t\t\t}\n\
\t\t\t\tmatched.push( elem );\n\
\t\t\t}\n\
\t\t}\n\
\t\treturn matched;\n\
\t},\n\
\n\
\tsibling: function( n, elem ) {\n\
\t\tvar matched = [];\n\
\n\
\t\tfor ( ; n; n = n.nextSibling ) {\n\
\t\t\tif ( n.nodeType === 1 && n !== elem ) {\n\
\t\t\t\tmatched.push( n );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn matched;\n\
\t}\n\
});\n\
\n\
jQuery.fn.extend({\n\
\thas: function( target ) {\n\
\t\tvar targets = jQuery( target, this ),\n\
\t\t\tl = targets.length;\n\
\n\
\t\treturn this.filter(function() {\n\
\t\t\tvar i = 0;\n\
\t\t\tfor ( ; i < l; i++ ) {\n\
\t\t\t\tif ( jQuery.contains( this, targets[i] ) ) {\n\
\t\t\t\t\treturn true;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t});\n\
\t},\n\
\n\
\tclosest: function( selectors, context ) {\n\
\t\tvar cur,\n\
\t\t\ti = 0,\n\
\t\t\tl = this.length,\n\
\t\t\tmatched = [],\n\
\t\t\tpos = rneedsContext.test( selectors ) || typeof selectors !== \"string\" ?\n\
\t\t\t\tjQuery( selectors, context || this.context ) :\n\
\t\t\t\t0;\n\
\n\
\t\tfor ( ; i < l; i++ ) {\n\
\t\t\tfor ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {\n\
\t\t\t\t// Always skip document fragments\n\
\t\t\t\tif ( cur.nodeType < 11 && (pos ?\n\
\t\t\t\t\tpos.index(cur) > -1 :\n\
\n\
\t\t\t\t\t// Don't pass non-elements to Sizzle\n\
\t\t\t\t\tcur.nodeType === 1 &&\n\
\t\t\t\t\t\tjQuery.find.matchesSelector(cur, selectors)) ) {\n\
\n\
\t\t\t\t\tmatched.push( cur );\n\
\t\t\t\t\tbreak;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );\n\
\t},\n\
\n\
\t// Determine the position of an element within\n\
\t// the matched set of elements\n\
\tindex: function( elem ) {\n\
\n\
\t\t// No argument, return index in parent\n\
\t\tif ( !elem ) {\n\
\t\t\treturn ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;\n\
\t\t}\n\
\n\
\t\t// index in selector\n\
\t\tif ( typeof elem === \"string\" ) {\n\
\t\t\treturn indexOf.call( jQuery( elem ), this[ 0 ] );\n\
\t\t}\n\
\n\
\t\t// Locate the position of the desired element\n\
\t\treturn indexOf.call( this,\n\
\n\
\t\t\t// If it receives a jQuery object, the first element is used\n\
\t\t\telem.jquery ? elem[ 0 ] : elem\n\
\t\t);\n\
\t},\n\
\n\
\tadd: function( selector, context ) {\n\
\t\treturn this.pushStack(\n\
\t\t\tjQuery.unique(\n\
\t\t\t\tjQuery.merge( this.get(), jQuery( selector, context ) )\n\
\t\t\t)\n\
\t\t);\n\
\t},\n\
\n\
\taddBack: function( selector ) {\n\
\t\treturn this.add( selector == null ?\n\
\t\t\tthis.prevObject : this.prevObject.filter(selector)\n\
\t\t);\n\
\t}\n\
});\n\
\n\
function sibling( cur, dir ) {\n\
\twhile ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}\n\
\treturn cur;\n\
}\n\
\n\
jQuery.each({\n\
\tparent: function( elem ) {\n\
\t\tvar parent = elem.parentNode;\n\
\t\treturn parent && parent.nodeType !== 11 ? parent : null;\n\
\t},\n\
\tparents: function( elem ) {\n\
\t\treturn jQuery.dir( elem, \"parentNode\" );\n\
\t},\n\
\tparentsUntil: function( elem, i, until ) {\n\
\t\treturn jQuery.dir( elem, \"parentNode\", until );\n\
\t},\n\
\tnext: function( elem ) {\n\
\t\treturn sibling( elem, \"nextSibling\" );\n\
\t},\n\
\tprev: function( elem ) {\n\
\t\treturn sibling( elem, \"previousSibling\" );\n\
\t},\n\
\tnextAll: function( elem ) {\n\
\t\treturn jQuery.dir( elem, \"nextSibling\" );\n\
\t},\n\
\tprevAll: function( elem ) {\n\
\t\treturn jQuery.dir( elem, \"previousSibling\" );\n\
\t},\n\
\tnextUntil: function( elem, i, until ) {\n\
\t\treturn jQuery.dir( elem, \"nextSibling\", until );\n\
\t},\n\
\tprevUntil: function( elem, i, until ) {\n\
\t\treturn jQuery.dir( elem, \"previousSibling\", until );\n\
\t},\n\
\tsiblings: function( elem ) {\n\
\t\treturn jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );\n\
\t},\n\
\tchildren: function( elem ) {\n\
\t\treturn jQuery.sibling( elem.firstChild );\n\
\t},\n\
\tcontents: function( elem ) {\n\
\t\treturn elem.contentDocument || jQuery.merge( [], elem.childNodes );\n\
\t}\n\
}, function( name, fn ) {\n\
\tjQuery.fn[ name ] = function( until, selector ) {\n\
\t\tvar matched = jQuery.map( this, fn, until );\n\
\n\
\t\tif ( name.slice( -5 ) !== \"Until\" ) {\n\
\t\t\tselector = until;\n\
\t\t}\n\
\n\
\t\tif ( selector && typeof selector === \"string\" ) {\n\
\t\t\tmatched = jQuery.filter( selector, matched );\n\
\t\t}\n\
\n\
\t\tif ( this.length > 1 ) {\n\
\t\t\t// Remove duplicates\n\
\t\t\tif ( !guaranteedUnique[ name ] ) {\n\
\t\t\t\tjQuery.unique( matched );\n\
\t\t\t}\n\
\n\
\t\t\t// Reverse order for parents* and prev-derivatives\n\
\t\t\tif ( rparentsprev.test( name ) ) {\n\
\t\t\t\tmatched.reverse();\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn this.pushStack( matched );\n\
\t};\n\
});\n\
var rnotwhite = (/\\S+/g);\n\
\n\
\n\
\n\
// String to Object options format cache\n\
var optionsCache = {};\n\
\n\
// Convert String-formatted options into Object-formatted ones and store in cache\n\
function createOptions( options ) {\n\
\tvar object = optionsCache[ options ] = {};\n\
\tjQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {\n\
\t\tobject[ flag ] = true;\n\
\t});\n\
\treturn object;\n\
}\n\
\n\
/*\n\
 * Create a callback list using the following parameters:\n\
 *\n\
 *\toptions: an optional list of space-separated options that will change how\n\
 *\t\t\tthe callback list behaves or a more traditional option object\n\
 *\n\
 * By default a callback list will act like an event callback list and can be\n\
 * \"fired\" multiple times.\n\
 *\n\
 * Possible options:\n\
 *\n\
 *\tonce:\t\t\twill ensure the callback list can only be fired once (like a Deferred)\n\
 *\n\
 *\tmemory:\t\t\twill keep track of previous values and will call any callback added\n\
 *\t\t\t\t\tafter the list has been fired right away with the latest \"memorized\"\n\
 *\t\t\t\t\tvalues (like a Deferred)\n\
 *\n\
 *\tunique:\t\t\twill ensure a callback can only be added once (no duplicate in the list)\n\
 *\n\
 *\tstopOnFalse:\tinterrupt callings when a callback returns false\n\
 *\n\
 */\n\
jQuery.Callbacks = function( options ) {\n\
\n\
\t// Convert options from String-formatted to Object-formatted if needed\n\
\t// (we check in cache first)\n\
\toptions = typeof options === \"string\" ?\n\
\t\t( optionsCache[ options ] || createOptions( options ) ) :\n\
\t\tjQuery.extend( {}, options );\n\
\n\
\tvar // Last fire value (for non-forgettable lists)\n\
\t\tmemory,\n\
\t\t// Flag to know if list was already fired\n\
\t\tfired,\n\
\t\t// Flag to know if list is currently firing\n\
\t\tfiring,\n\
\t\t// First callback to fire (used internally by add and fireWith)\n\
\t\tfiringStart,\n\
\t\t// End of the loop when firing\n\
\t\tfiringLength,\n\
\t\t// Index of currently firing callback (modified by remove if needed)\n\
\t\tfiringIndex,\n\
\t\t// Actual callback list\n\
\t\tlist = [],\n\
\t\t// Stack of fire calls for repeatable lists\n\
\t\tstack = !options.once && [],\n\
\t\t// Fire callbacks\n\
\t\tfire = function( data ) {\n\
\t\t\tmemory = options.memory && data;\n\
\t\t\tfired = true;\n\
\t\t\tfiringIndex = firingStart || 0;\n\
\t\t\tfiringStart = 0;\n\
\t\t\tfiringLength = list.length;\n\
\t\t\tfiring = true;\n\
\t\t\tfor ( ; list && firingIndex < firingLength; firingIndex++ ) {\n\
\t\t\t\tif ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {\n\
\t\t\t\t\tmemory = false; // To prevent further calls using add\n\
\t\t\t\t\tbreak;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t\tfiring = false;\n\
\t\t\tif ( list ) {\n\
\t\t\t\tif ( stack ) {\n\
\t\t\t\t\tif ( stack.length ) {\n\
\t\t\t\t\t\tfire( stack.shift() );\n\
\t\t\t\t\t}\n\
\t\t\t\t} else if ( memory ) {\n\
\t\t\t\t\tlist = [];\n\
\t\t\t\t} else {\n\
\t\t\t\t\tself.disable();\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t},\n\
\t\t// Actual Callbacks object\n\
\t\tself = {\n\
\t\t\t// Add a callback or a collection of callbacks to the list\n\
\t\t\tadd: function() {\n\
\t\t\t\tif ( list ) {\n\
\t\t\t\t\t// First, we save the current length\n\
\t\t\t\t\tvar start = list.length;\n\
\t\t\t\t\t(function add( args ) {\n\
\t\t\t\t\t\tjQuery.each( args, function( _, arg ) {\n\
\t\t\t\t\t\t\tvar type = jQuery.type( arg );\n\
\t\t\t\t\t\t\tif ( type === \"function\" ) {\n\
\t\t\t\t\t\t\t\tif ( !options.unique || !self.has( arg ) ) {\n\
\t\t\t\t\t\t\t\t\tlist.push( arg );\n\
\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t} else if ( arg && arg.length && type !== \"string\" ) {\n\
\t\t\t\t\t\t\t\t// Inspect recursively\n\
\t\t\t\t\t\t\t\tadd( arg );\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t});\n\
\t\t\t\t\t})( arguments );\n\
\t\t\t\t\t// Do we need to add the callbacks to the\n\
\t\t\t\t\t// current firing batch?\n\
\t\t\t\t\tif ( firing ) {\n\
\t\t\t\t\t\tfiringLength = list.length;\n\
\t\t\t\t\t// With memory, if we're not firing then\n\
\t\t\t\t\t// we should call right away\n\
\t\t\t\t\t} else if ( memory ) {\n\
\t\t\t\t\t\tfiringStart = start;\n\
\t\t\t\t\t\tfire( memory );\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t\treturn this;\n\
\t\t\t},\n\
\t\t\t// Remove a callback from the list\n\
\t\t\tremove: function() {\n\
\t\t\t\tif ( list ) {\n\
\t\t\t\t\tjQuery.each( arguments, function( _, arg ) {\n\
\t\t\t\t\t\tvar index;\n\
\t\t\t\t\t\twhile ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {\n\
\t\t\t\t\t\t\tlist.splice( index, 1 );\n\
\t\t\t\t\t\t\t// Handle firing indexes\n\
\t\t\t\t\t\t\tif ( firing ) {\n\
\t\t\t\t\t\t\t\tif ( index <= firingLength ) {\n\
\t\t\t\t\t\t\t\t\tfiringLength--;\n\
\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t\tif ( index <= firingIndex ) {\n\
\t\t\t\t\t\t\t\t\tfiringIndex--;\n\
\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t});\n\
\t\t\t\t}\n\
\t\t\t\treturn this;\n\
\t\t\t},\n\
\t\t\t// Check if a given callback is in the list.\n\
\t\t\t// If no argument is given, return whether or not list has callbacks attached.\n\
\t\t\thas: function( fn ) {\n\
\t\t\t\treturn fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );\n\
\t\t\t},\n\
\t\t\t// Remove all callbacks from the list\n\
\t\t\tempty: function() {\n\
\t\t\t\tlist = [];\n\
\t\t\t\tfiringLength = 0;\n\
\t\t\t\treturn this;\n\
\t\t\t},\n\
\t\t\t// Have the list do nothing anymore\n\
\t\t\tdisable: function() {\n\
\t\t\t\tlist = stack = memory = undefined;\n\
\t\t\t\treturn this;\n\
\t\t\t},\n\
\t\t\t// Is it disabled?\n\
\t\t\tdisabled: function() {\n\
\t\t\t\treturn !list;\n\
\t\t\t},\n\
\t\t\t// Lock the list in its current state\n\
\t\t\tlock: function() {\n\
\t\t\t\tstack = undefined;\n\
\t\t\t\tif ( !memory ) {\n\
\t\t\t\t\tself.disable();\n\
\t\t\t\t}\n\
\t\t\t\treturn this;\n\
\t\t\t},\n\
\t\t\t// Is it locked?\n\
\t\t\tlocked: function() {\n\
\t\t\t\treturn !stack;\n\
\t\t\t},\n\
\t\t\t// Call all callbacks with the given context and arguments\n\
\t\t\tfireWith: function( context, args ) {\n\
\t\t\t\tif ( list && ( !fired || stack ) ) {\n\
\t\t\t\t\targs = args || [];\n\
\t\t\t\t\targs = [ context, args.slice ? args.slice() : args ];\n\
\t\t\t\t\tif ( firing ) {\n\
\t\t\t\t\t\tstack.push( args );\n\
\t\t\t\t\t} else {\n\
\t\t\t\t\t\tfire( args );\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t\treturn this;\n\
\t\t\t},\n\
\t\t\t// Call all the callbacks with the given arguments\n\
\t\t\tfire: function() {\n\
\t\t\t\tself.fireWith( this, arguments );\n\
\t\t\t\treturn this;\n\
\t\t\t},\n\
\t\t\t// To know if the callbacks have already been called at least once\n\
\t\t\tfired: function() {\n\
\t\t\t\treturn !!fired;\n\
\t\t\t}\n\
\t\t};\n\
\n\
\treturn self;\n\
};\n\
\n\
\n\
jQuery.extend({\n\
\n\
\tDeferred: function( func ) {\n\
\t\tvar tuples = [\n\
\t\t\t\t// action, add listener, listener list, final state\n\
\t\t\t\t[ \"resolve\", \"done\", jQuery.Callbacks(\"once memory\"), \"resolved\" ],\n\
\t\t\t\t[ \"reject\", \"fail\", jQuery.Callbacks(\"once memory\"), \"rejected\" ],\n\
\t\t\t\t[ \"notify\", \"progress\", jQuery.Callbacks(\"memory\") ]\n\
\t\t\t],\n\
\t\t\tstate = \"pending\",\n\
\t\t\tpromise = {\n\
\t\t\t\tstate: function() {\n\
\t\t\t\t\treturn state;\n\
\t\t\t\t},\n\
\t\t\t\talways: function() {\n\
\t\t\t\t\tdeferred.done( arguments ).fail( arguments );\n\
\t\t\t\t\treturn this;\n\
\t\t\t\t},\n\
\t\t\t\tthen: function( /* fnDone, fnFail, fnProgress */ ) {\n\
\t\t\t\t\tvar fns = arguments;\n\
\t\t\t\t\treturn jQuery.Deferred(function( newDefer ) {\n\
\t\t\t\t\t\tjQuery.each( tuples, function( i, tuple ) {\n\
\t\t\t\t\t\t\tvar fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];\n\
\t\t\t\t\t\t\t// deferred[ done | fail | progress ] for forwarding actions to newDefer\n\
\t\t\t\t\t\t\tdeferred[ tuple[1] ](function() {\n\
\t\t\t\t\t\t\t\tvar returned = fn && fn.apply( this, arguments );\n\
\t\t\t\t\t\t\t\tif ( returned && jQuery.isFunction( returned.promise ) ) {\n\
\t\t\t\t\t\t\t\t\treturned.promise()\n\
\t\t\t\t\t\t\t\t\t\t.done( newDefer.resolve )\n\
\t\t\t\t\t\t\t\t\t\t.fail( newDefer.reject )\n\
\t\t\t\t\t\t\t\t\t\t.progress( newDefer.notify );\n\
\t\t\t\t\t\t\t\t} else {\n\
\t\t\t\t\t\t\t\t\tnewDefer[ tuple[ 0 ] + \"With\" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );\n\
\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t});\n\
\t\t\t\t\t\t});\n\
\t\t\t\t\t\tfns = null;\n\
\t\t\t\t\t}).promise();\n\
\t\t\t\t},\n\
\t\t\t\t// Get a promise for this deferred\n\
\t\t\t\t// If obj is provided, the promise aspect is added to the object\n\
\t\t\t\tpromise: function( obj ) {\n\
\t\t\t\t\treturn obj != null ? jQuery.extend( obj, promise ) : promise;\n\
\t\t\t\t}\n\
\t\t\t},\n\
\t\t\tdeferred = {};\n\
\n\
\t\t// Keep pipe for back-compat\n\
\t\tpromise.pipe = promise.then;\n\
\n\
\t\t// Add list-specific methods\n\
\t\tjQuery.each( tuples, function( i, tuple ) {\n\
\t\t\tvar list = tuple[ 2 ],\n\
\t\t\t\tstateString = tuple[ 3 ];\n\
\n\
\t\t\t// promise[ done | fail | progress ] = list.add\n\
\t\t\tpromise[ tuple[1] ] = list.add;\n\
\n\
\t\t\t// Handle state\n\
\t\t\tif ( stateString ) {\n\
\t\t\t\tlist.add(function() {\n\
\t\t\t\t\t// state = [ resolved | rejected ]\n\
\t\t\t\t\tstate = stateString;\n\
\n\
\t\t\t\t// [ reject_list | resolve_list ].disable; progress_list.lock\n\
\t\t\t\t}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );\n\
\t\t\t}\n\
\n\
\t\t\t// deferred[ resolve | reject | notify ]\n\
\t\t\tdeferred[ tuple[0] ] = function() {\n\
\t\t\t\tdeferred[ tuple[0] + \"With\" ]( this === deferred ? promise : this, arguments );\n\
\t\t\t\treturn this;\n\
\t\t\t};\n\
\t\t\tdeferred[ tuple[0] + \"With\" ] = list.fireWith;\n\
\t\t});\n\
\n\
\t\t// Make the deferred a promise\n\
\t\tpromise.promise( deferred );\n\
\n\
\t\t// Call given func if any\n\
\t\tif ( func ) {\n\
\t\t\tfunc.call( deferred, deferred );\n\
\t\t}\n\
\n\
\t\t// All done!\n\
\t\treturn deferred;\n\
\t},\n\
\n\
\t// Deferred helper\n\
\twhen: function( subordinate /* , ..., subordinateN */ ) {\n\
\t\tvar i = 0,\n\
\t\t\tresolveValues = slice.call( arguments ),\n\
\t\t\tlength = resolveValues.length,\n\
\n\
\t\t\t// the count of uncompleted subordinates\n\
\t\t\tremaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,\n\
\n\
\t\t\t// the master Deferred. If resolveValues consist of only a single Deferred, just use that.\n\
\t\t\tdeferred = remaining === 1 ? subordinate : jQuery.Deferred(),\n\
\n\
\t\t\t// Update function for both resolve and progress values\n\
\t\t\tupdateFunc = function( i, contexts, values ) {\n\
\t\t\t\treturn function( value ) {\n\
\t\t\t\t\tcontexts[ i ] = this;\n\
\t\t\t\t\tvalues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;\n\
\t\t\t\t\tif ( values === progressValues ) {\n\
\t\t\t\t\t\tdeferred.notifyWith( contexts, values );\n\
\t\t\t\t\t} else if ( !( --remaining ) ) {\n\
\t\t\t\t\t\tdeferred.resolveWith( contexts, values );\n\
\t\t\t\t\t}\n\
\t\t\t\t};\n\
\t\t\t},\n\
\n\
\t\t\tprogressValues, progressContexts, resolveContexts;\n\
\n\
\t\t// add listeners to Deferred subordinates; treat others as resolved\n\
\t\tif ( length > 1 ) {\n\
\t\t\tprogressValues = new Array( length );\n\
\t\t\tprogressContexts = new Array( length );\n\
\t\t\tresolveContexts = new Array( length );\n\
\t\t\tfor ( ; i < length; i++ ) {\n\
\t\t\t\tif ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {\n\
\t\t\t\t\tresolveValues[ i ].promise()\n\
\t\t\t\t\t\t.done( updateFunc( i, resolveContexts, resolveValues ) )\n\
\t\t\t\t\t\t.fail( deferred.reject )\n\
\t\t\t\t\t\t.progress( updateFunc( i, progressContexts, progressValues ) );\n\
\t\t\t\t} else {\n\
\t\t\t\t\t--remaining;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// if we're not waiting on anything, resolve the master\n\
\t\tif ( !remaining ) {\n\
\t\t\tdeferred.resolveWith( resolveContexts, resolveValues );\n\
\t\t}\n\
\n\
\t\treturn deferred.promise();\n\
\t}\n\
});\n\
\n\
\n\
// The deferred used on DOM ready\n\
var readyList;\n\
\n\
jQuery.fn.ready = function( fn ) {\n\
\t// Add the callback\n\
\tjQuery.ready.promise().done( fn );\n\
\n\
\treturn this;\n\
};\n\
\n\
jQuery.extend({\n\
\t// Is the DOM ready to be used? Set to true once it occurs.\n\
\tisReady: false,\n\
\n\
\t// A counter to track how many items to wait for before\n\
\t// the ready event fires. See #6781\n\
\treadyWait: 1,\n\
\n\
\t// Hold (or release) the ready event\n\
\tholdReady: function( hold ) {\n\
\t\tif ( hold ) {\n\
\t\t\tjQuery.readyWait++;\n\
\t\t} else {\n\
\t\t\tjQuery.ready( true );\n\
\t\t}\n\
\t},\n\
\n\
\t// Handle when the DOM is ready\n\
\tready: function( wait ) {\n\
\n\
\t\t// Abort if there are pending holds or we're already ready\n\
\t\tif ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\t// Remember that the DOM is ready\n\
\t\tjQuery.isReady = true;\n\
\n\
\t\t// If a normal DOM Ready event fired, decrement, and wait if need be\n\
\t\tif ( wait !== true && --jQuery.readyWait > 0 ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\t// If there are functions bound, to execute\n\
\t\treadyList.resolveWith( document, [ jQuery ] );\n\
\n\
\t\t// Trigger any bound ready events\n\
\t\tif ( jQuery.fn.triggerHandler ) {\n\
\t\t\tjQuery( document ).triggerHandler( \"ready\" );\n\
\t\t\tjQuery( document ).off( \"ready\" );\n\
\t\t}\n\
\t}\n\
});\n\
\n\
/**\n\
 * The ready event handler and self cleanup method\n\
 */\n\
function completed() {\n\
\tdocument.removeEventListener( \"DOMContentLoaded\", completed, false );\n\
\twindow.removeEventListener( \"load\", completed, false );\n\
\tjQuery.ready();\n\
}\n\
\n\
jQuery.ready.promise = function( obj ) {\n\
\tif ( !readyList ) {\n\
\n\
\t\treadyList = jQuery.Deferred();\n\
\n\
\t\t// Catch cases where $(document).ready() is called after the browser event has already occurred.\n\
\t\t// we once tried to use readyState \"interactive\" here, but it caused issues like the one\n\
\t\t// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15\n\
\t\tif ( document.readyState === \"complete\" ) {\n\
\t\t\t// Handle it asynchronously to allow scripts the opportunity to delay ready\n\
\t\t\tsetTimeout( jQuery.ready );\n\
\n\
\t\t} else {\n\
\n\
\t\t\t// Use the handy event callback\n\
\t\t\tdocument.addEventListener( \"DOMContentLoaded\", completed, false );\n\
\n\
\t\t\t// A fallback to window.onload, that will always work\n\
\t\t\twindow.addEventListener( \"load\", completed, false );\n\
\t\t}\n\
\t}\n\
\treturn readyList.promise( obj );\n\
};\n\
\n\
// Kick off the DOM ready check even if the user does not\n\
jQuery.ready.promise();\n\
\n\
\n\
\n\
\n\
// Multifunctional method to get and set values of a collection\n\
// The value/s can optionally be executed if it's a function\n\
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {\n\
\tvar i = 0,\n\
\t\tlen = elems.length,\n\
\t\tbulk = key == null;\n\
\n\
\t// Sets many values\n\
\tif ( jQuery.type( key ) === \"object\" ) {\n\
\t\tchainable = true;\n\
\t\tfor ( i in key ) {\n\
\t\t\tjQuery.access( elems, fn, i, key[i], true, emptyGet, raw );\n\
\t\t}\n\
\n\
\t// Sets one value\n\
\t} else if ( value !== undefined ) {\n\
\t\tchainable = true;\n\
\n\
\t\tif ( !jQuery.isFunction( value ) ) {\n\
\t\t\traw = true;\n\
\t\t}\n\
\n\
\t\tif ( bulk ) {\n\
\t\t\t// Bulk operations run against the entire set\n\
\t\t\tif ( raw ) {\n\
\t\t\t\tfn.call( elems, value );\n\
\t\t\t\tfn = null;\n\
\n\
\t\t\t// ...except when executing function values\n\
\t\t\t} else {\n\
\t\t\t\tbulk = fn;\n\
\t\t\t\tfn = function( elem, key, value ) {\n\
\t\t\t\t\treturn bulk.call( jQuery( elem ), value );\n\
\t\t\t\t};\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\tif ( fn ) {\n\
\t\t\tfor ( ; i < len; i++ ) {\n\
\t\t\t\tfn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\treturn chainable ?\n\
\t\telems :\n\
\n\
\t\t// Gets\n\
\t\tbulk ?\n\
\t\t\tfn.call( elems ) :\n\
\t\t\tlen ? fn( elems[0], key ) : emptyGet;\n\
};\n\
\n\
\n\
/**\n\
 * Determines whether an object can have data\n\
 */\n\
jQuery.acceptData = function( owner ) {\n\
\t// Accepts only:\n\
\t//  - Node\n\
\t//    - Node.ELEMENT_NODE\n\
\t//    - Node.DOCUMENT_NODE\n\
\t//  - Object\n\
\t//    - Any\n\
\t/* jshint -W018 */\n\
\treturn owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );\n\
};\n\
\n\
\n\
function Data() {\n\
\t// Support: Android < 4,\n\
\t// Old WebKit does not have Object.preventExtensions/freeze method,\n\
\t// return new empty object instead with no [[set]] accessor\n\
\tObject.defineProperty( this.cache = {}, 0, {\n\
\t\tget: function() {\n\
\t\t\treturn {};\n\
\t\t}\n\
\t});\n\
\n\
\tthis.expando = jQuery.expando + Math.random();\n\
}\n\
\n\
Data.uid = 1;\n\
Data.accepts = jQuery.acceptData;\n\
\n\
Data.prototype = {\n\
\tkey: function( owner ) {\n\
\t\t// We can accept data for non-element nodes in modern browsers,\n\
\t\t// but we should not, see #8335.\n\
\t\t// Always return the key for a frozen object.\n\
\t\tif ( !Data.accepts( owner ) ) {\n\
\t\t\treturn 0;\n\
\t\t}\n\
\n\
\t\tvar descriptor = {},\n\
\t\t\t// Check if the owner object already has a cache key\n\
\t\t\tunlock = owner[ this.expando ];\n\
\n\
\t\t// If not, create one\n\
\t\tif ( !unlock ) {\n\
\t\t\tunlock = Data.uid++;\n\
\n\
\t\t\t// Secure it in a non-enumerable, non-writable property\n\
\t\t\ttry {\n\
\t\t\t\tdescriptor[ this.expando ] = { value: unlock };\n\
\t\t\t\tObject.defineProperties( owner, descriptor );\n\
\n\
\t\t\t// Support: Android < 4\n\
\t\t\t// Fallback to a less secure definition\n\
\t\t\t} catch ( e ) {\n\
\t\t\t\tdescriptor[ this.expando ] = unlock;\n\
\t\t\t\tjQuery.extend( owner, descriptor );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Ensure the cache object\n\
\t\tif ( !this.cache[ unlock ] ) {\n\
\t\t\tthis.cache[ unlock ] = {};\n\
\t\t}\n\
\n\
\t\treturn unlock;\n\
\t},\n\
\tset: function( owner, data, value ) {\n\
\t\tvar prop,\n\
\t\t\t// There may be an unlock assigned to this node,\n\
\t\t\t// if there is no entry for this \"owner\", create one inline\n\
\t\t\t// and set the unlock as though an owner entry had always existed\n\
\t\t\tunlock = this.key( owner ),\n\
\t\t\tcache = this.cache[ unlock ];\n\
\n\
\t\t// Handle: [ owner, key, value ] args\n\
\t\tif ( typeof data === \"string\" ) {\n\
\t\t\tcache[ data ] = value;\n\
\n\
\t\t// Handle: [ owner, { properties } ] args\n\
\t\t} else {\n\
\t\t\t// Fresh assignments by object are shallow copied\n\
\t\t\tif ( jQuery.isEmptyObject( cache ) ) {\n\
\t\t\t\tjQuery.extend( this.cache[ unlock ], data );\n\
\t\t\t// Otherwise, copy the properties one-by-one to the cache object\n\
\t\t\t} else {\n\
\t\t\t\tfor ( prop in data ) {\n\
\t\t\t\t\tcache[ prop ] = data[ prop ];\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t\treturn cache;\n\
\t},\n\
\tget: function( owner, key ) {\n\
\t\t// Either a valid cache is found, or will be created.\n\
\t\t// New caches will be created and the unlock returned,\n\
\t\t// allowing direct access to the newly created\n\
\t\t// empty data object. A valid owner object must be provided.\n\
\t\tvar cache = this.cache[ this.key( owner ) ];\n\
\n\
\t\treturn key === undefined ?\n\
\t\t\tcache : cache[ key ];\n\
\t},\n\
\taccess: function( owner, key, value ) {\n\
\t\tvar stored;\n\
\t\t// In cases where either:\n\
\t\t//\n\
\t\t//   1. No key was specified\n\
\t\t//   2. A string key was specified, but no value provided\n\
\t\t//\n\
\t\t// Take the \"read\" path and allow the get method to determine\n\
\t\t// which value to return, respectively either:\n\
\t\t//\n\
\t\t//   1. The entire cache object\n\
\t\t//   2. The data stored at the key\n\
\t\t//\n\
\t\tif ( key === undefined ||\n\
\t\t\t\t((key && typeof key === \"string\") && value === undefined) ) {\n\
\n\
\t\t\tstored = this.get( owner, key );\n\
\n\
\t\t\treturn stored !== undefined ?\n\
\t\t\t\tstored : this.get( owner, jQuery.camelCase(key) );\n\
\t\t}\n\
\n\
\t\t// [*]When the key is not a string, or both a key and value\n\
\t\t// are specified, set or extend (existing objects) with either:\n\
\t\t//\n\
\t\t//   1. An object of properties\n\
\t\t//   2. A key and value\n\
\t\t//\n\
\t\tthis.set( owner, key, value );\n\
\n\
\t\t// Since the \"set\" path can have two possible entry points\n\
\t\t// return the expected data based on which path was taken[*]\n\
\t\treturn value !== undefined ? value : key;\n\
\t},\n\
\tremove: function( owner, key ) {\n\
\t\tvar i, name, camel,\n\
\t\t\tunlock = this.key( owner ),\n\
\t\t\tcache = this.cache[ unlock ];\n\
\n\
\t\tif ( key === undefined ) {\n\
\t\t\tthis.cache[ unlock ] = {};\n\
\n\
\t\t} else {\n\
\t\t\t// Support array or space separated string of keys\n\
\t\t\tif ( jQuery.isArray( key ) ) {\n\
\t\t\t\t// If \"name\" is an array of keys...\n\
\t\t\t\t// When data is initially created, via (\"key\", \"val\") signature,\n\
\t\t\t\t// keys will be converted to camelCase.\n\
\t\t\t\t// Since there is no way to tell _how_ a key was added, remove\n\
\t\t\t\t// both plain key and camelCase key. #12786\n\
\t\t\t\t// This will only penalize the array argument path.\n\
\t\t\t\tname = key.concat( key.map( jQuery.camelCase ) );\n\
\t\t\t} else {\n\
\t\t\t\tcamel = jQuery.camelCase( key );\n\
\t\t\t\t// Try the string as a key before any manipulation\n\
\t\t\t\tif ( key in cache ) {\n\
\t\t\t\t\tname = [ key, camel ];\n\
\t\t\t\t} else {\n\
\t\t\t\t\t// If a key with the spaces exists, use it.\n\
\t\t\t\t\t// Otherwise, create an array by matching non-whitespace\n\
\t\t\t\t\tname = camel;\n\
\t\t\t\t\tname = name in cache ?\n\
\t\t\t\t\t\t[ name ] : ( name.match( rnotwhite ) || [] );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\ti = name.length;\n\
\t\t\twhile ( i-- ) {\n\
\t\t\t\tdelete cache[ name[ i ] ];\n\
\t\t\t}\n\
\t\t}\n\
\t},\n\
\thasData: function( owner ) {\n\
\t\treturn !jQuery.isEmptyObject(\n\
\t\t\tthis.cache[ owner[ this.expando ] ] || {}\n\
\t\t);\n\
\t},\n\
\tdiscard: function( owner ) {\n\
\t\tif ( owner[ this.expando ] ) {\n\
\t\t\tdelete this.cache[ owner[ this.expando ] ];\n\
\t\t}\n\
\t}\n\
};\n\
var data_priv = new Data();\n\
\n\
var data_user = new Data();\n\
\n\
\n\
\n\
/*\n\
\tImplementation Summary\n\
\n\
\t1. Enforce API surface and semantic compatibility with 1.9.x branch\n\
\t2. Improve the module's maintainability by reducing the storage\n\
\t\tpaths to a single mechanism.\n\
\t3. Use the same single mechanism to support \"private\" and \"user\" data.\n\
\t4. _Never_ expose \"private\" data to user code (TODO: Drop _data, _removeData)\n\
\t5. Avoid exposing implementation details on user objects (eg. expando properties)\n\
\t6. Provide a clear path for implementation upgrade to WeakMap in 2014\n\
*/\n\
var rbrace = /^(?:\\{[\\w\\W]*\\}|\\[[\\w\\W]*\\])$/,\n\
\trmultiDash = /([A-Z])/g;\n\
\n\
function dataAttr( elem, key, data ) {\n\
\tvar name;\n\
\n\
\t// If nothing was found internally, try to fetch any\n\
\t// data from the HTML5 data-* attribute\n\
\tif ( data === undefined && elem.nodeType === 1 ) {\n\
\t\tname = \"data-\" + key.replace( rmultiDash, \"-$1\" ).toLowerCase();\n\
\t\tdata = elem.getAttribute( name );\n\
\n\
\t\tif ( typeof data === \"string\" ) {\n\
\t\t\ttry {\n\
\t\t\t\tdata = data === \"true\" ? true :\n\
\t\t\t\t\tdata === \"false\" ? false :\n\
\t\t\t\t\tdata === \"null\" ? null :\n\
\t\t\t\t\t// Only convert to a number if it doesn't change the string\n\
\t\t\t\t\t+data + \"\" === data ? +data :\n\
\t\t\t\t\trbrace.test( data ) ? jQuery.parseJSON( data ) :\n\
\t\t\t\t\tdata;\n\
\t\t\t} catch( e ) {}\n\
\n\
\t\t\t// Make sure we set the data so it isn't changed later\n\
\t\t\tdata_user.set( elem, key, data );\n\
\t\t} else {\n\
\t\t\tdata = undefined;\n\
\t\t}\n\
\t}\n\
\treturn data;\n\
}\n\
\n\
jQuery.extend({\n\
\thasData: function( elem ) {\n\
\t\treturn data_user.hasData( elem ) || data_priv.hasData( elem );\n\
\t},\n\
\n\
\tdata: function( elem, name, data ) {\n\
\t\treturn data_user.access( elem, name, data );\n\
\t},\n\
\n\
\tremoveData: function( elem, name ) {\n\
\t\tdata_user.remove( elem, name );\n\
\t},\n\
\n\
\t// TODO: Now that all calls to _data and _removeData have been replaced\n\
\t// with direct calls to data_priv methods, these can be deprecated.\n\
\t_data: function( elem, name, data ) {\n\
\t\treturn data_priv.access( elem, name, data );\n\
\t},\n\
\n\
\t_removeData: function( elem, name ) {\n\
\t\tdata_priv.remove( elem, name );\n\
\t}\n\
});\n\
\n\
jQuery.fn.extend({\n\
\tdata: function( key, value ) {\n\
\t\tvar i, name, data,\n\
\t\t\telem = this[ 0 ],\n\
\t\t\tattrs = elem && elem.attributes;\n\
\n\
\t\t// Gets all values\n\
\t\tif ( key === undefined ) {\n\
\t\t\tif ( this.length ) {\n\
\t\t\t\tdata = data_user.get( elem );\n\
\n\
\t\t\t\tif ( elem.nodeType === 1 && !data_priv.get( elem, \"hasDataAttrs\" ) ) {\n\
\t\t\t\t\ti = attrs.length;\n\
\t\t\t\t\twhile ( i-- ) {\n\
\n\
\t\t\t\t\t\t// Support: IE11+\n\
\t\t\t\t\t\t// The attrs elements can be null (#14894)\n\
\t\t\t\t\t\tif ( attrs[ i ] ) {\n\
\t\t\t\t\t\t\tname = attrs[ i ].name;\n\
\t\t\t\t\t\t\tif ( name.indexOf( \"data-\" ) === 0 ) {\n\
\t\t\t\t\t\t\t\tname = jQuery.camelCase( name.slice(5) );\n\
\t\t\t\t\t\t\t\tdataAttr( elem, name, data[ name ] );\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t\tdata_priv.set( elem, \"hasDataAttrs\", true );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\treturn data;\n\
\t\t}\n\
\n\
\t\t// Sets multiple values\n\
\t\tif ( typeof key === \"object\" ) {\n\
\t\t\treturn this.each(function() {\n\
\t\t\t\tdata_user.set( this, key );\n\
\t\t\t});\n\
\t\t}\n\
\n\
\t\treturn access( this, function( value ) {\n\
\t\t\tvar data,\n\
\t\t\t\tcamelKey = jQuery.camelCase( key );\n\
\n\
\t\t\t// The calling jQuery object (element matches) is not empty\n\
\t\t\t// (and therefore has an element appears at this[ 0 ]) and the\n\
\t\t\t// `value` parameter was not undefined. An empty jQuery object\n\
\t\t\t// will result in `undefined` for elem = this[ 0 ] which will\n\
\t\t\t// throw an exception if an attempt to read a data cache is made.\n\
\t\t\tif ( elem && value === undefined ) {\n\
\t\t\t\t// Attempt to get data from the cache\n\
\t\t\t\t// with the key as-is\n\
\t\t\t\tdata = data_user.get( elem, key );\n\
\t\t\t\tif ( data !== undefined ) {\n\
\t\t\t\t\treturn data;\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Attempt to get data from the cache\n\
\t\t\t\t// with the key camelized\n\
\t\t\t\tdata = data_user.get( elem, camelKey );\n\
\t\t\t\tif ( data !== undefined ) {\n\
\t\t\t\t\treturn data;\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Attempt to \"discover\" the data in\n\
\t\t\t\t// HTML5 custom data-* attrs\n\
\t\t\t\tdata = dataAttr( elem, camelKey, undefined );\n\
\t\t\t\tif ( data !== undefined ) {\n\
\t\t\t\t\treturn data;\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// We tried really hard, but the data doesn't exist.\n\
\t\t\t\treturn;\n\
\t\t\t}\n\
\n\
\t\t\t// Set the data...\n\
\t\t\tthis.each(function() {\n\
\t\t\t\t// First, attempt to store a copy or reference of any\n\
\t\t\t\t// data that might've been store with a camelCased key.\n\
\t\t\t\tvar data = data_user.get( this, camelKey );\n\
\n\
\t\t\t\t// For HTML5 data-* attribute interop, we have to\n\
\t\t\t\t// store property names with dashes in a camelCase form.\n\
\t\t\t\t// This might not apply to all properties...*\n\
\t\t\t\tdata_user.set( this, camelKey, value );\n\
\n\
\t\t\t\t// *... In the case of properties that might _actually_\n\
\t\t\t\t// have dashes, we need to also store a copy of that\n\
\t\t\t\t// unchanged property.\n\
\t\t\t\tif ( key.indexOf(\"-\") !== -1 && data !== undefined ) {\n\
\t\t\t\t\tdata_user.set( this, key, value );\n\
\t\t\t\t}\n\
\t\t\t});\n\
\t\t}, null, value, arguments.length > 1, null, true );\n\
\t},\n\
\n\
\tremoveData: function( key ) {\n\
\t\treturn this.each(function() {\n\
\t\t\tdata_user.remove( this, key );\n\
\t\t});\n\
\t}\n\
});\n\
\n\
\n\
jQuery.extend({\n\
\tqueue: function( elem, type, data ) {\n\
\t\tvar queue;\n\
\n\
\t\tif ( elem ) {\n\
\t\t\ttype = ( type || \"fx\" ) + \"queue\";\n\
\t\t\tqueue = data_priv.get( elem, type );\n\
\n\
\t\t\t// Speed up dequeue by getting out quickly if this is just a lookup\n\
\t\t\tif ( data ) {\n\
\t\t\t\tif ( !queue || jQuery.isArray( data ) ) {\n\
\t\t\t\t\tqueue = data_priv.access( elem, type, jQuery.makeArray(data) );\n\
\t\t\t\t} else {\n\
\t\t\t\t\tqueue.push( data );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t\treturn queue || [];\n\
\t\t}\n\
\t},\n\
\n\
\tdequeue: function( elem, type ) {\n\
\t\ttype = type || \"fx\";\n\
\n\
\t\tvar queue = jQuery.queue( elem, type ),\n\
\t\t\tstartLength = queue.length,\n\
\t\t\tfn = queue.shift(),\n\
\t\t\thooks = jQuery._queueHooks( elem, type ),\n\
\t\t\tnext = function() {\n\
\t\t\t\tjQuery.dequeue( elem, type );\n\
\t\t\t};\n\
\n\
\t\t// If the fx queue is dequeued, always remove the progress sentinel\n\
\t\tif ( fn === \"inprogress\" ) {\n\
\t\t\tfn = queue.shift();\n\
\t\t\tstartLength--;\n\
\t\t}\n\
\n\
\t\tif ( fn ) {\n\
\n\
\t\t\t// Add a progress sentinel to prevent the fx queue from being\n\
\t\t\t// automatically dequeued\n\
\t\t\tif ( type === \"fx\" ) {\n\
\t\t\t\tqueue.unshift( \"inprogress\" );\n\
\t\t\t}\n\
\n\
\t\t\t// clear up the last queue stop function\n\
\t\t\tdelete hooks.stop;\n\
\t\t\tfn.call( elem, next, hooks );\n\
\t\t}\n\
\n\
\t\tif ( !startLength && hooks ) {\n\
\t\t\thooks.empty.fire();\n\
\t\t}\n\
\t},\n\
\n\
\t// not intended for public consumption - generates a queueHooks object, or returns the current one\n\
\t_queueHooks: function( elem, type ) {\n\
\t\tvar key = type + \"queueHooks\";\n\
\t\treturn data_priv.get( elem, key ) || data_priv.access( elem, key, {\n\
\t\t\tempty: jQuery.Callbacks(\"once memory\").add(function() {\n\
\t\t\t\tdata_priv.remove( elem, [ type + \"queue\", key ] );\n\
\t\t\t})\n\
\t\t});\n\
\t}\n\
});\n\
\n\
jQuery.fn.extend({\n\
\tqueue: function( type, data ) {\n\
\t\tvar setter = 2;\n\
\n\
\t\tif ( typeof type !== \"string\" ) {\n\
\t\t\tdata = type;\n\
\t\t\ttype = \"fx\";\n\
\t\t\tsetter--;\n\
\t\t}\n\
\n\
\t\tif ( arguments.length < setter ) {\n\
\t\t\treturn jQuery.queue( this[0], type );\n\
\t\t}\n\
\n\
\t\treturn data === undefined ?\n\
\t\t\tthis :\n\
\t\t\tthis.each(function() {\n\
\t\t\t\tvar queue = jQuery.queue( this, type, data );\n\
\n\
\t\t\t\t// ensure a hooks for this queue\n\
\t\t\t\tjQuery._queueHooks( this, type );\n\
\n\
\t\t\t\tif ( type === \"fx\" && queue[0] !== \"inprogress\" ) {\n\
\t\t\t\t\tjQuery.dequeue( this, type );\n\
\t\t\t\t}\n\
\t\t\t});\n\
\t},\n\
\tdequeue: function( type ) {\n\
\t\treturn this.each(function() {\n\
\t\t\tjQuery.dequeue( this, type );\n\
\t\t});\n\
\t},\n\
\tclearQueue: function( type ) {\n\
\t\treturn this.queue( type || \"fx\", [] );\n\
\t},\n\
\t// Get a promise resolved when queues of a certain type\n\
\t// are emptied (fx is the type by default)\n\
\tpromise: function( type, obj ) {\n\
\t\tvar tmp,\n\
\t\t\tcount = 1,\n\
\t\t\tdefer = jQuery.Deferred(),\n\
\t\t\telements = this,\n\
\t\t\ti = this.length,\n\
\t\t\tresolve = function() {\n\
\t\t\t\tif ( !( --count ) ) {\n\
\t\t\t\t\tdefer.resolveWith( elements, [ elements ] );\n\
\t\t\t\t}\n\
\t\t\t};\n\
\n\
\t\tif ( typeof type !== \"string\" ) {\n\
\t\t\tobj = type;\n\
\t\t\ttype = undefined;\n\
\t\t}\n\
\t\ttype = type || \"fx\";\n\
\n\
\t\twhile ( i-- ) {\n\
\t\t\ttmp = data_priv.get( elements[ i ], type + \"queueHooks\" );\n\
\t\t\tif ( tmp && tmp.empty ) {\n\
\t\t\t\tcount++;\n\
\t\t\t\ttmp.empty.add( resolve );\n\
\t\t\t}\n\
\t\t}\n\
\t\tresolve();\n\
\t\treturn defer.promise( obj );\n\
\t}\n\
});\n\
var pnum = (/[+-]?(?:\\d*\\.|)\\d+(?:[eE][+-]?\\d+|)/).source;\n\
\n\
var cssExpand = [ \"Top\", \"Right\", \"Bottom\", \"Left\" ];\n\
\n\
var isHidden = function( elem, el ) {\n\
\t\t// isHidden might be called from jQuery#filter function;\n\
\t\t// in that case, element will be second argument\n\
\t\telem = el || elem;\n\
\t\treturn jQuery.css( elem, \"display\" ) === \"none\" || !jQuery.contains( elem.ownerDocument, elem );\n\
\t};\n\
\n\
var rcheckableType = (/^(?:checkbox|radio)$/i);\n\
\n\
\n\
\n\
(function() {\n\
\tvar fragment = document.createDocumentFragment(),\n\
\t\tdiv = fragment.appendChild( document.createElement( \"div\" ) ),\n\
\t\tinput = document.createElement( \"input\" );\n\
\n\
\t// #11217 - WebKit loses check when the name is after the checked attribute\n\
\t// Support: Windows Web Apps (WWA)\n\
\t// `name` and `type` need .setAttribute for WWA\n\
\tinput.setAttribute( \"type\", \"radio\" );\n\
\tinput.setAttribute( \"checked\", \"checked\" );\n\
\tinput.setAttribute( \"name\", \"t\" );\n\
\n\
\tdiv.appendChild( input );\n\
\n\
\t// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3\n\
\t// old WebKit doesn't clone checked state correctly in fragments\n\
\tsupport.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;\n\
\n\
\t// Make sure textarea (and checkbox) defaultValue is properly cloned\n\
\t// Support: IE9-IE11+\n\
\tdiv.innerHTML = \"<textarea>x</textarea>\";\n\
\tsupport.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;\n\
})();\n\
var strundefined = typeof undefined;\n\
\n\
\n\
\n\
support.focusinBubbles = \"onfocusin\" in window;\n\
\n\
\n\
var\n\
\trkeyEvent = /^key/,\n\
\trmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,\n\
\trfocusMorph = /^(?:focusinfocus|focusoutblur)$/,\n\
\trtypenamespace = /^([^.]*)(?:\\.(.+)|)$/;\n\
\n\
function returnTrue() {\n\
\treturn true;\n\
}\n\
\n\
function returnFalse() {\n\
\treturn false;\n\
}\n\
\n\
function safeActiveElement() {\n\
\ttry {\n\
\t\treturn document.activeElement;\n\
\t} catch ( err ) { }\n\
}\n\
\n\
/*\n\
 * Helper functions for managing events -- not part of the public interface.\n\
 * Props to Dean Edwards' addEvent library for many of the ideas.\n\
 */\n\
jQuery.event = {\n\
\n\
\tglobal: {},\n\
\n\
\tadd: function( elem, types, handler, data, selector ) {\n\
\n\
\t\tvar handleObjIn, eventHandle, tmp,\n\
\t\t\tevents, t, handleObj,\n\
\t\t\tspecial, handlers, type, namespaces, origType,\n\
\t\t\telemData = data_priv.get( elem );\n\
\n\
\t\t// Don't attach events to noData or text/comment nodes (but allow plain objects)\n\
\t\tif ( !elemData ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\t// Caller can pass in an object of custom data in lieu of the handler\n\
\t\tif ( handler.handler ) {\n\
\t\t\thandleObjIn = handler;\n\
\t\t\thandler = handleObjIn.handler;\n\
\t\t\tselector = handleObjIn.selector;\n\
\t\t}\n\
\n\
\t\t// Make sure that the handler has a unique ID, used to find/remove it later\n\
\t\tif ( !handler.guid ) {\n\
\t\t\thandler.guid = jQuery.guid++;\n\
\t\t}\n\
\n\
\t\t// Init the element's event structure and main handler, if this is the first\n\
\t\tif ( !(events = elemData.events) ) {\n\
\t\t\tevents = elemData.events = {};\n\
\t\t}\n\
\t\tif ( !(eventHandle = elemData.handle) ) {\n\
\t\t\teventHandle = elemData.handle = function( e ) {\n\
\t\t\t\t// Discard the second event of a jQuery.event.trigger() and\n\
\t\t\t\t// when an event is called after a page has unloaded\n\
\t\t\t\treturn typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?\n\
\t\t\t\t\tjQuery.event.dispatch.apply( elem, arguments ) : undefined;\n\
\t\t\t};\n\
\t\t}\n\
\n\
\t\t// Handle multiple events separated by a space\n\
\t\ttypes = ( types || \"\" ).match( rnotwhite ) || [ \"\" ];\n\
\t\tt = types.length;\n\
\t\twhile ( t-- ) {\n\
\t\t\ttmp = rtypenamespace.exec( types[t] ) || [];\n\
\t\t\ttype = origType = tmp[1];\n\
\t\t\tnamespaces = ( tmp[2] || \"\" ).split( \".\" ).sort();\n\
\n\
\t\t\t// There *must* be a type, no attaching namespace-only handlers\n\
\t\t\tif ( !type ) {\n\
\t\t\t\tcontinue;\n\
\t\t\t}\n\
\n\
\t\t\t// If event changes its type, use the special event handlers for the changed type\n\
\t\t\tspecial = jQuery.event.special[ type ] || {};\n\
\n\
\t\t\t// If selector defined, determine special event api type, otherwise given type\n\
\t\t\ttype = ( selector ? special.delegateType : special.bindType ) || type;\n\
\n\
\t\t\t// Update special based on newly reset type\n\
\t\t\tspecial = jQuery.event.special[ type ] || {};\n\
\n\
\t\t\t// handleObj is passed to all event handlers\n\
\t\t\thandleObj = jQuery.extend({\n\
\t\t\t\ttype: type,\n\
\t\t\t\torigType: origType,\n\
\t\t\t\tdata: data,\n\
\t\t\t\thandler: handler,\n\
\t\t\t\tguid: handler.guid,\n\
\t\t\t\tselector: selector,\n\
\t\t\t\tneedsContext: selector && jQuery.expr.match.needsContext.test( selector ),\n\
\t\t\t\tnamespace: namespaces.join(\".\")\n\
\t\t\t}, handleObjIn );\n\
\n\
\t\t\t// Init the event handler queue if we're the first\n\
\t\t\tif ( !(handlers = events[ type ]) ) {\n\
\t\t\t\thandlers = events[ type ] = [];\n\
\t\t\t\thandlers.delegateCount = 0;\n\
\n\
\t\t\t\t// Only use addEventListener if the special events handler returns false\n\
\t\t\t\tif ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {\n\
\t\t\t\t\tif ( elem.addEventListener ) {\n\
\t\t\t\t\t\telem.addEventListener( type, eventHandle, false );\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\tif ( special.add ) {\n\
\t\t\t\tspecial.add.call( elem, handleObj );\n\
\n\
\t\t\t\tif ( !handleObj.handler.guid ) {\n\
\t\t\t\t\thandleObj.handler.guid = handler.guid;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\t// Add to the element's handler list, delegates in front\n\
\t\t\tif ( selector ) {\n\
\t\t\t\thandlers.splice( handlers.delegateCount++, 0, handleObj );\n\
\t\t\t} else {\n\
\t\t\t\thandlers.push( handleObj );\n\
\t\t\t}\n\
\n\
\t\t\t// Keep track of which events have ever been used, for event optimization\n\
\t\t\tjQuery.event.global[ type ] = true;\n\
\t\t}\n\
\n\
\t},\n\
\n\
\t// Detach an event or set of events from an element\n\
\tremove: function( elem, types, handler, selector, mappedTypes ) {\n\
\n\
\t\tvar j, origCount, tmp,\n\
\t\t\tevents, t, handleObj,\n\
\t\t\tspecial, handlers, type, namespaces, origType,\n\
\t\t\telemData = data_priv.hasData( elem ) && data_priv.get( elem );\n\
\n\
\t\tif ( !elemData || !(events = elemData.events) ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\t// Once for each type.namespace in types; type may be omitted\n\
\t\ttypes = ( types || \"\" ).match( rnotwhite ) || [ \"\" ];\n\
\t\tt = types.length;\n\
\t\twhile ( t-- ) {\n\
\t\t\ttmp = rtypenamespace.exec( types[t] ) || [];\n\
\t\t\ttype = origType = tmp[1];\n\
\t\t\tnamespaces = ( tmp[2] || \"\" ).split( \".\" ).sort();\n\
\n\
\t\t\t// Unbind all events (on this namespace, if provided) for the element\n\
\t\t\tif ( !type ) {\n\
\t\t\t\tfor ( type in events ) {\n\
\t\t\t\t\tjQuery.event.remove( elem, type + types[ t ], handler, selector, true );\n\
\t\t\t\t}\n\
\t\t\t\tcontinue;\n\
\t\t\t}\n\
\n\
\t\t\tspecial = jQuery.event.special[ type ] || {};\n\
\t\t\ttype = ( selector ? special.delegateType : special.bindType ) || type;\n\
\t\t\thandlers = events[ type ] || [];\n\
\t\t\ttmp = tmp[2] && new RegExp( \"(^|\\\\.)\" + namespaces.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\" );\n\
\n\
\t\t\t// Remove matching events\n\
\t\t\torigCount = j = handlers.length;\n\
\t\t\twhile ( j-- ) {\n\
\t\t\t\thandleObj = handlers[ j ];\n\
\n\
\t\t\t\tif ( ( mappedTypes || origType === handleObj.origType ) &&\n\
\t\t\t\t\t( !handler || handler.guid === handleObj.guid ) &&\n\
\t\t\t\t\t( !tmp || tmp.test( handleObj.namespace ) ) &&\n\
\t\t\t\t\t( !selector || selector === handleObj.selector || selector === \"**\" && handleObj.selector ) ) {\n\
\t\t\t\t\thandlers.splice( j, 1 );\n\
\n\
\t\t\t\t\tif ( handleObj.selector ) {\n\
\t\t\t\t\t\thandlers.delegateCount--;\n\
\t\t\t\t\t}\n\
\t\t\t\t\tif ( special.remove ) {\n\
\t\t\t\t\t\tspecial.remove.call( elem, handleObj );\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\t// Remove generic event handler if we removed something and no more handlers exist\n\
\t\t\t// (avoids potential for endless recursion during removal of special event handlers)\n\
\t\t\tif ( origCount && !handlers.length ) {\n\
\t\t\t\tif ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {\n\
\t\t\t\t\tjQuery.removeEvent( elem, type, elemData.handle );\n\
\t\t\t\t}\n\
\n\
\t\t\t\tdelete events[ type ];\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Remove the expando if it's no longer used\n\
\t\tif ( jQuery.isEmptyObject( events ) ) {\n\
\t\t\tdelete elemData.handle;\n\
\t\t\tdata_priv.remove( elem, \"events\" );\n\
\t\t}\n\
\t},\n\
\n\
\ttrigger: function( event, data, elem, onlyHandlers ) {\n\
\n\
\t\tvar i, cur, tmp, bubbleType, ontype, handle, special,\n\
\t\t\teventPath = [ elem || document ],\n\
\t\t\ttype = hasOwn.call( event, \"type\" ) ? event.type : event,\n\
\t\t\tnamespaces = hasOwn.call( event, \"namespace\" ) ? event.namespace.split(\".\") : [];\n\
\n\
\t\tcur = tmp = elem = elem || document;\n\
\n\
\t\t// Don't do events on text and comment nodes\n\
\t\tif ( elem.nodeType === 3 || elem.nodeType === 8 ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\t// focus/blur morphs to focusin/out; ensure we're not firing them right now\n\
\t\tif ( rfocusMorph.test( type + jQuery.event.triggered ) ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\tif ( type.indexOf(\".\") >= 0 ) {\n\
\t\t\t// Namespaced trigger; create a regexp to match event type in handle()\n\
\t\t\tnamespaces = type.split(\".\");\n\
\t\t\ttype = namespaces.shift();\n\
\t\t\tnamespaces.sort();\n\
\t\t}\n\
\t\tontype = type.indexOf(\":\") < 0 && \"on\" + type;\n\
\n\
\t\t// Caller can pass in a jQuery.Event object, Object, or just an event type string\n\
\t\tevent = event[ jQuery.expando ] ?\n\
\t\t\tevent :\n\
\t\t\tnew jQuery.Event( type, typeof event === \"object\" && event );\n\
\n\
\t\t// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)\n\
\t\tevent.isTrigger = onlyHandlers ? 2 : 3;\n\
\t\tevent.namespace = namespaces.join(\".\");\n\
\t\tevent.namespace_re = event.namespace ?\n\
\t\t\tnew RegExp( \"(^|\\\\.)\" + namespaces.join(\"\\\\.(?:.*\\\\.|)\") + \"(\\\\.|$)\" ) :\n\
\t\t\tnull;\n\
\n\
\t\t// Clean up the event in case it is being reused\n\
\t\tevent.result = undefined;\n\
\t\tif ( !event.target ) {\n\
\t\t\tevent.target = elem;\n\
\t\t}\n\
\n\
\t\t// Clone any incoming data and prepend the event, creating the handler arg list\n\
\t\tdata = data == null ?\n\
\t\t\t[ event ] :\n\
\t\t\tjQuery.makeArray( data, [ event ] );\n\
\n\
\t\t// Allow special events to draw outside the lines\n\
\t\tspecial = jQuery.event.special[ type ] || {};\n\
\t\tif ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\t// Determine event propagation path in advance, per W3C events spec (#9951)\n\
\t\t// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)\n\
\t\tif ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {\n\
\n\
\t\t\tbubbleType = special.delegateType || type;\n\
\t\t\tif ( !rfocusMorph.test( bubbleType + type ) ) {\n\
\t\t\t\tcur = cur.parentNode;\n\
\t\t\t}\n\
\t\t\tfor ( ; cur; cur = cur.parentNode ) {\n\
\t\t\t\teventPath.push( cur );\n\
\t\t\t\ttmp = cur;\n\
\t\t\t}\n\
\n\
\t\t\t// Only add window if we got to document (e.g., not plain obj or detached DOM)\n\
\t\t\tif ( tmp === (elem.ownerDocument || document) ) {\n\
\t\t\t\teventPath.push( tmp.defaultView || tmp.parentWindow || window );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Fire handlers on the event path\n\
\t\ti = 0;\n\
\t\twhile ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {\n\
\n\
\t\t\tevent.type = i > 1 ?\n\
\t\t\t\tbubbleType :\n\
\t\t\t\tspecial.bindType || type;\n\
\n\
\t\t\t// jQuery handler\n\
\t\t\thandle = ( data_priv.get( cur, \"events\" ) || {} )[ event.type ] && data_priv.get( cur, \"handle\" );\n\
\t\t\tif ( handle ) {\n\
\t\t\t\thandle.apply( cur, data );\n\
\t\t\t}\n\
\n\
\t\t\t// Native handler\n\
\t\t\thandle = ontype && cur[ ontype ];\n\
\t\t\tif ( handle && handle.apply && jQuery.acceptData( cur ) ) {\n\
\t\t\t\tevent.result = handle.apply( cur, data );\n\
\t\t\t\tif ( event.result === false ) {\n\
\t\t\t\t\tevent.preventDefault();\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t\tevent.type = type;\n\
\n\
\t\t// If nobody prevented the default action, do it now\n\
\t\tif ( !onlyHandlers && !event.isDefaultPrevented() ) {\n\
\n\
\t\t\tif ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&\n\
\t\t\t\tjQuery.acceptData( elem ) ) {\n\
\n\
\t\t\t\t// Call a native DOM method on the target with the same name name as the event.\n\
\t\t\t\t// Don't do default actions on window, that's where global variables be (#6170)\n\
\t\t\t\tif ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {\n\
\n\
\t\t\t\t\t// Don't re-trigger an onFOO event when we call its FOO() method\n\
\t\t\t\t\ttmp = elem[ ontype ];\n\
\n\
\t\t\t\t\tif ( tmp ) {\n\
\t\t\t\t\t\telem[ ontype ] = null;\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// Prevent re-triggering of the same event, since we already bubbled it above\n\
\t\t\t\t\tjQuery.event.triggered = type;\n\
\t\t\t\t\telem[ type ]();\n\
\t\t\t\t\tjQuery.event.triggered = undefined;\n\
\n\
\t\t\t\t\tif ( tmp ) {\n\
\t\t\t\t\t\telem[ ontype ] = tmp;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn event.result;\n\
\t},\n\
\n\
\tdispatch: function( event ) {\n\
\n\
\t\t// Make a writable jQuery.Event from the native event object\n\
\t\tevent = jQuery.event.fix( event );\n\
\n\
\t\tvar i, j, ret, matched, handleObj,\n\
\t\t\thandlerQueue = [],\n\
\t\t\targs = slice.call( arguments ),\n\
\t\t\thandlers = ( data_priv.get( this, \"events\" ) || {} )[ event.type ] || [],\n\
\t\t\tspecial = jQuery.event.special[ event.type ] || {};\n\
\n\
\t\t// Use the fix-ed jQuery.Event rather than the (read-only) native event\n\
\t\targs[0] = event;\n\
\t\tevent.delegateTarget = this;\n\
\n\
\t\t// Call the preDispatch hook for the mapped type, and let it bail if desired\n\
\t\tif ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\t// Determine handlers\n\
\t\thandlerQueue = jQuery.event.handlers.call( this, event, handlers );\n\
\n\
\t\t// Run delegates first; they may want to stop propagation beneath us\n\
\t\ti = 0;\n\
\t\twhile ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {\n\
\t\t\tevent.currentTarget = matched.elem;\n\
\n\
\t\t\tj = 0;\n\
\t\t\twhile ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {\n\
\n\
\t\t\t\t// Triggered event must either 1) have no namespace, or\n\
\t\t\t\t// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).\n\
\t\t\t\tif ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {\n\
\n\
\t\t\t\t\tevent.handleObj = handleObj;\n\
\t\t\t\t\tevent.data = handleObj.data;\n\
\n\
\t\t\t\t\tret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )\n\
\t\t\t\t\t\t\t.apply( matched.elem, args );\n\
\n\
\t\t\t\t\tif ( ret !== undefined ) {\n\
\t\t\t\t\t\tif ( (event.result = ret) === false ) {\n\
\t\t\t\t\t\t\tevent.preventDefault();\n\
\t\t\t\t\t\t\tevent.stopPropagation();\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Call the postDispatch hook for the mapped type\n\
\t\tif ( special.postDispatch ) {\n\
\t\t\tspecial.postDispatch.call( this, event );\n\
\t\t}\n\
\n\
\t\treturn event.result;\n\
\t},\n\
\n\
\thandlers: function( event, handlers ) {\n\
\t\tvar i, matches, sel, handleObj,\n\
\t\t\thandlerQueue = [],\n\
\t\t\tdelegateCount = handlers.delegateCount,\n\
\t\t\tcur = event.target;\n\
\n\
\t\t// Find delegate handlers\n\
\t\t// Black-hole SVG <use> instance trees (#13180)\n\
\t\t// Avoid non-left-click bubbling in Firefox (#3861)\n\
\t\tif ( delegateCount && cur.nodeType && (!event.button || event.type !== \"click\") ) {\n\
\n\
\t\t\tfor ( ; cur !== this; cur = cur.parentNode || this ) {\n\
\n\
\t\t\t\t// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)\n\
\t\t\t\tif ( cur.disabled !== true || event.type !== \"click\" ) {\n\
\t\t\t\t\tmatches = [];\n\
\t\t\t\t\tfor ( i = 0; i < delegateCount; i++ ) {\n\
\t\t\t\t\t\thandleObj = handlers[ i ];\n\
\n\
\t\t\t\t\t\t// Don't conflict with Object.prototype properties (#13203)\n\
\t\t\t\t\t\tsel = handleObj.selector + \" \";\n\
\n\
\t\t\t\t\t\tif ( matches[ sel ] === undefined ) {\n\
\t\t\t\t\t\t\tmatches[ sel ] = handleObj.needsContext ?\n\
\t\t\t\t\t\t\t\tjQuery( sel, this ).index( cur ) >= 0 :\n\
\t\t\t\t\t\t\t\tjQuery.find( sel, this, null, [ cur ] ).length;\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t\tif ( matches[ sel ] ) {\n\
\t\t\t\t\t\t\tmatches.push( handleObj );\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t\tif ( matches.length ) {\n\
\t\t\t\t\t\thandlerQueue.push({ elem: cur, handlers: matches });\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Add the remaining (directly-bound) handlers\n\
\t\tif ( delegateCount < handlers.length ) {\n\
\t\t\thandlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });\n\
\t\t}\n\
\n\
\t\treturn handlerQueue;\n\
\t},\n\
\n\
\t// Includes some event props shared by KeyEvent and MouseEvent\n\
\tprops: \"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which\".split(\" \"),\n\
\n\
\tfixHooks: {},\n\
\n\
\tkeyHooks: {\n\
\t\tprops: \"char charCode key keyCode\".split(\" \"),\n\
\t\tfilter: function( event, original ) {\n\
\n\
\t\t\t// Add which for key events\n\
\t\t\tif ( event.which == null ) {\n\
\t\t\t\tevent.which = original.charCode != null ? original.charCode : original.keyCode;\n\
\t\t\t}\n\
\n\
\t\t\treturn event;\n\
\t\t}\n\
\t},\n\
\n\
\tmouseHooks: {\n\
\t\tprops: \"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement\".split(\" \"),\n\
\t\tfilter: function( event, original ) {\n\
\t\t\tvar eventDoc, doc, body,\n\
\t\t\t\tbutton = original.button;\n\
\n\
\t\t\t// Calculate pageX/Y if missing and clientX/Y available\n\
\t\t\tif ( event.pageX == null && original.clientX != null ) {\n\
\t\t\t\teventDoc = event.target.ownerDocument || document;\n\
\t\t\t\tdoc = eventDoc.documentElement;\n\
\t\t\t\tbody = eventDoc.body;\n\
\n\
\t\t\t\tevent.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );\n\
\t\t\t\tevent.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );\n\
\t\t\t}\n\
\n\
\t\t\t// Add which for click: 1 === left; 2 === middle; 3 === right\n\
\t\t\t// Note: button is not normalized, so don't use it\n\
\t\t\tif ( !event.which && button !== undefined ) {\n\
\t\t\t\tevent.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );\n\
\t\t\t}\n\
\n\
\t\t\treturn event;\n\
\t\t}\n\
\t},\n\
\n\
\tfix: function( event ) {\n\
\t\tif ( event[ jQuery.expando ] ) {\n\
\t\t\treturn event;\n\
\t\t}\n\
\n\
\t\t// Create a writable copy of the event object and normalize some properties\n\
\t\tvar i, prop, copy,\n\
\t\t\ttype = event.type,\n\
\t\t\toriginalEvent = event,\n\
\t\t\tfixHook = this.fixHooks[ type ];\n\
\n\
\t\tif ( !fixHook ) {\n\
\t\t\tthis.fixHooks[ type ] = fixHook =\n\
\t\t\t\trmouseEvent.test( type ) ? this.mouseHooks :\n\
\t\t\t\trkeyEvent.test( type ) ? this.keyHooks :\n\
\t\t\t\t{};\n\
\t\t}\n\
\t\tcopy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;\n\
\n\
\t\tevent = new jQuery.Event( originalEvent );\n\
\n\
\t\ti = copy.length;\n\
\t\twhile ( i-- ) {\n\
\t\t\tprop = copy[ i ];\n\
\t\t\tevent[ prop ] = originalEvent[ prop ];\n\
\t\t}\n\
\n\
\t\t// Support: Cordova 2.5 (WebKit) (#13255)\n\
\t\t// All events should have a target; Cordova deviceready doesn't\n\
\t\tif ( !event.target ) {\n\
\t\t\tevent.target = document;\n\
\t\t}\n\
\n\
\t\t// Support: Safari 6.0+, Chrome < 28\n\
\t\t// Target should not be a text node (#504, #13143)\n\
\t\tif ( event.target.nodeType === 3 ) {\n\
\t\t\tevent.target = event.target.parentNode;\n\
\t\t}\n\
\n\
\t\treturn fixHook.filter ? fixHook.filter( event, originalEvent ) : event;\n\
\t},\n\
\n\
\tspecial: {\n\
\t\tload: {\n\
\t\t\t// Prevent triggered image.load events from bubbling to window.load\n\
\t\t\tnoBubble: true\n\
\t\t},\n\
\t\tfocus: {\n\
\t\t\t// Fire native event if possible so blur/focus sequence is correct\n\
\t\t\ttrigger: function() {\n\
\t\t\t\tif ( this !== safeActiveElement() && this.focus ) {\n\
\t\t\t\t\tthis.focus();\n\
\t\t\t\t\treturn false;\n\
\t\t\t\t}\n\
\t\t\t},\n\
\t\t\tdelegateType: \"focusin\"\n\
\t\t},\n\
\t\tblur: {\n\
\t\t\ttrigger: function() {\n\
\t\t\t\tif ( this === safeActiveElement() && this.blur ) {\n\
\t\t\t\t\tthis.blur();\n\
\t\t\t\t\treturn false;\n\
\t\t\t\t}\n\
\t\t\t},\n\
\t\t\tdelegateType: \"focusout\"\n\
\t\t},\n\
\t\tclick: {\n\
\t\t\t// For checkbox, fire native event so checked state will be right\n\
\t\t\ttrigger: function() {\n\
\t\t\t\tif ( this.type === \"checkbox\" && this.click && jQuery.nodeName( this, \"input\" ) ) {\n\
\t\t\t\t\tthis.click();\n\
\t\t\t\t\treturn false;\n\
\t\t\t\t}\n\
\t\t\t},\n\
\n\
\t\t\t// For cross-browser consistency, don't fire native .click() on links\n\
\t\t\t_default: function( event ) {\n\
\t\t\t\treturn jQuery.nodeName( event.target, \"a\" );\n\
\t\t\t}\n\
\t\t},\n\
\n\
\t\tbeforeunload: {\n\
\t\t\tpostDispatch: function( event ) {\n\
\n\
\t\t\t\t// Support: Firefox 20+\n\
\t\t\t\t// Firefox doesn't alert if the returnValue field is not set.\n\
\t\t\t\tif ( event.result !== undefined && event.originalEvent ) {\n\
\t\t\t\t\tevent.originalEvent.returnValue = event.result;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t},\n\
\n\
\tsimulate: function( type, elem, event, bubble ) {\n\
\t\t// Piggyback on a donor event to simulate a different one.\n\
\t\t// Fake originalEvent to avoid donor's stopPropagation, but if the\n\
\t\t// simulated event prevents default then we do the same on the donor.\n\
\t\tvar e = jQuery.extend(\n\
\t\t\tnew jQuery.Event(),\n\
\t\t\tevent,\n\
\t\t\t{\n\
\t\t\t\ttype: type,\n\
\t\t\t\tisSimulated: true,\n\
\t\t\t\toriginalEvent: {}\n\
\t\t\t}\n\
\t\t);\n\
\t\tif ( bubble ) {\n\
\t\t\tjQuery.event.trigger( e, null, elem );\n\
\t\t} else {\n\
\t\t\tjQuery.event.dispatch.call( elem, e );\n\
\t\t}\n\
\t\tif ( e.isDefaultPrevented() ) {\n\
\t\t\tevent.preventDefault();\n\
\t\t}\n\
\t}\n\
};\n\
\n\
jQuery.removeEvent = function( elem, type, handle ) {\n\
\tif ( elem.removeEventListener ) {\n\
\t\telem.removeEventListener( type, handle, false );\n\
\t}\n\
};\n\
\n\
jQuery.Event = function( src, props ) {\n\
\t// Allow instantiation without the 'new' keyword\n\
\tif ( !(this instanceof jQuery.Event) ) {\n\
\t\treturn new jQuery.Event( src, props );\n\
\t}\n\
\n\
\t// Event object\n\
\tif ( src && src.type ) {\n\
\t\tthis.originalEvent = src;\n\
\t\tthis.type = src.type;\n\
\n\
\t\t// Events bubbling up the document may have been marked as prevented\n\
\t\t// by a handler lower down the tree; reflect the correct value.\n\
\t\tthis.isDefaultPrevented = src.defaultPrevented ||\n\
\t\t\t\tsrc.defaultPrevented === undefined &&\n\
\t\t\t\t// Support: Android < 4.0\n\
\t\t\t\tsrc.returnValue === false ?\n\
\t\t\treturnTrue :\n\
\t\t\treturnFalse;\n\
\n\
\t// Event type\n\
\t} else {\n\
\t\tthis.type = src;\n\
\t}\n\
\n\
\t// Put explicitly provided properties onto the event object\n\
\tif ( props ) {\n\
\t\tjQuery.extend( this, props );\n\
\t}\n\
\n\
\t// Create a timestamp if incoming event doesn't have one\n\
\tthis.timeStamp = src && src.timeStamp || jQuery.now();\n\
\n\
\t// Mark it as fixed\n\
\tthis[ jQuery.expando ] = true;\n\
};\n\
\n\
// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding\n\
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html\n\
jQuery.Event.prototype = {\n\
\tisDefaultPrevented: returnFalse,\n\
\tisPropagationStopped: returnFalse,\n\
\tisImmediatePropagationStopped: returnFalse,\n\
\n\
\tpreventDefault: function() {\n\
\t\tvar e = this.originalEvent;\n\
\n\
\t\tthis.isDefaultPrevented = returnTrue;\n\
\n\
\t\tif ( e && e.preventDefault ) {\n\
\t\t\te.preventDefault();\n\
\t\t}\n\
\t},\n\
\tstopPropagation: function() {\n\
\t\tvar e = this.originalEvent;\n\
\n\
\t\tthis.isPropagationStopped = returnTrue;\n\
\n\
\t\tif ( e && e.stopPropagation ) {\n\
\t\t\te.stopPropagation();\n\
\t\t}\n\
\t},\n\
\tstopImmediatePropagation: function() {\n\
\t\tvar e = this.originalEvent;\n\
\n\
\t\tthis.isImmediatePropagationStopped = returnTrue;\n\
\n\
\t\tif ( e && e.stopImmediatePropagation ) {\n\
\t\t\te.stopImmediatePropagation();\n\
\t\t}\n\
\n\
\t\tthis.stopPropagation();\n\
\t}\n\
};\n\
\n\
// Create mouseenter/leave events using mouseover/out and event-time checks\n\
// Support: Chrome 15+\n\
jQuery.each({\n\
\tmouseenter: \"mouseover\",\n\
\tmouseleave: \"mouseout\",\n\
\tpointerenter: \"pointerover\",\n\
\tpointerleave: \"pointerout\"\n\
}, function( orig, fix ) {\n\
\tjQuery.event.special[ orig ] = {\n\
\t\tdelegateType: fix,\n\
\t\tbindType: fix,\n\
\n\
\t\thandle: function( event ) {\n\
\t\t\tvar ret,\n\
\t\t\t\ttarget = this,\n\
\t\t\t\trelated = event.relatedTarget,\n\
\t\t\t\thandleObj = event.handleObj;\n\
\n\
\t\t\t// For mousenter/leave call the handler if related is outside the target.\n\
\t\t\t// NB: No relatedTarget if the mouse left/entered the browser window\n\
\t\t\tif ( !related || (related !== target && !jQuery.contains( target, related )) ) {\n\
\t\t\t\tevent.type = handleObj.origType;\n\
\t\t\t\tret = handleObj.handler.apply( this, arguments );\n\
\t\t\t\tevent.type = fix;\n\
\t\t\t}\n\
\t\t\treturn ret;\n\
\t\t}\n\
\t};\n\
});\n\
\n\
// Create \"bubbling\" focus and blur events\n\
// Support: Firefox, Chrome, Safari\n\
if ( !support.focusinBubbles ) {\n\
\tjQuery.each({ focus: \"focusin\", blur: \"focusout\" }, function( orig, fix ) {\n\
\n\
\t\t// Attach a single capturing handler on the document while someone wants focusin/focusout\n\
\t\tvar handler = function( event ) {\n\
\t\t\t\tjQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );\n\
\t\t\t};\n\
\n\
\t\tjQuery.event.special[ fix ] = {\n\
\t\t\tsetup: function() {\n\
\t\t\t\tvar doc = this.ownerDocument || this,\n\
\t\t\t\t\tattaches = data_priv.access( doc, fix );\n\
\n\
\t\t\t\tif ( !attaches ) {\n\
\t\t\t\t\tdoc.addEventListener( orig, handler, true );\n\
\t\t\t\t}\n\
\t\t\t\tdata_priv.access( doc, fix, ( attaches || 0 ) + 1 );\n\
\t\t\t},\n\
\t\t\tteardown: function() {\n\
\t\t\t\tvar doc = this.ownerDocument || this,\n\
\t\t\t\t\tattaches = data_priv.access( doc, fix ) - 1;\n\
\n\
\t\t\t\tif ( !attaches ) {\n\
\t\t\t\t\tdoc.removeEventListener( orig, handler, true );\n\
\t\t\t\t\tdata_priv.remove( doc, fix );\n\
\n\
\t\t\t\t} else {\n\
\t\t\t\t\tdata_priv.access( doc, fix, attaches );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t};\n\
\t});\n\
}\n\
\n\
jQuery.fn.extend({\n\
\n\
\ton: function( types, selector, data, fn, /*INTERNAL*/ one ) {\n\
\t\tvar origFn, type;\n\
\n\
\t\t// Types can be a map of types/handlers\n\
\t\tif ( typeof types === \"object\" ) {\n\
\t\t\t// ( types-Object, selector, data )\n\
\t\t\tif ( typeof selector !== \"string\" ) {\n\
\t\t\t\t// ( types-Object, data )\n\
\t\t\t\tdata = data || selector;\n\
\t\t\t\tselector = undefined;\n\
\t\t\t}\n\
\t\t\tfor ( type in types ) {\n\
\t\t\t\tthis.on( type, selector, data, types[ type ], one );\n\
\t\t\t}\n\
\t\t\treturn this;\n\
\t\t}\n\
\n\
\t\tif ( data == null && fn == null ) {\n\
\t\t\t// ( types, fn )\n\
\t\t\tfn = selector;\n\
\t\t\tdata = selector = undefined;\n\
\t\t} else if ( fn == null ) {\n\
\t\t\tif ( typeof selector === \"string\" ) {\n\
\t\t\t\t// ( types, selector, fn )\n\
\t\t\t\tfn = data;\n\
\t\t\t\tdata = undefined;\n\
\t\t\t} else {\n\
\t\t\t\t// ( types, data, fn )\n\
\t\t\t\tfn = data;\n\
\t\t\t\tdata = selector;\n\
\t\t\t\tselector = undefined;\n\
\t\t\t}\n\
\t\t}\n\
\t\tif ( fn === false ) {\n\
\t\t\tfn = returnFalse;\n\
\t\t} else if ( !fn ) {\n\
\t\t\treturn this;\n\
\t\t}\n\
\n\
\t\tif ( one === 1 ) {\n\
\t\t\torigFn = fn;\n\
\t\t\tfn = function( event ) {\n\
\t\t\t\t// Can use an empty set, since event contains the info\n\
\t\t\t\tjQuery().off( event );\n\
\t\t\t\treturn origFn.apply( this, arguments );\n\
\t\t\t};\n\
\t\t\t// Use same guid so caller can remove using origFn\n\
\t\t\tfn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );\n\
\t\t}\n\
\t\treturn this.each( function() {\n\
\t\t\tjQuery.event.add( this, types, fn, data, selector );\n\
\t\t});\n\
\t},\n\
\tone: function( types, selector, data, fn ) {\n\
\t\treturn this.on( types, selector, data, fn, 1 );\n\
\t},\n\
\toff: function( types, selector, fn ) {\n\
\t\tvar handleObj, type;\n\
\t\tif ( types && types.preventDefault && types.handleObj ) {\n\
\t\t\t// ( event )  dispatched jQuery.Event\n\
\t\t\thandleObj = types.handleObj;\n\
\t\t\tjQuery( types.delegateTarget ).off(\n\
\t\t\t\thandleObj.namespace ? handleObj.origType + \".\" + handleObj.namespace : handleObj.origType,\n\
\t\t\t\thandleObj.selector,\n\
\t\t\t\thandleObj.handler\n\
\t\t\t);\n\
\t\t\treturn this;\n\
\t\t}\n\
\t\tif ( typeof types === \"object\" ) {\n\
\t\t\t// ( types-object [, selector] )\n\
\t\t\tfor ( type in types ) {\n\
\t\t\t\tthis.off( type, selector, types[ type ] );\n\
\t\t\t}\n\
\t\t\treturn this;\n\
\t\t}\n\
\t\tif ( selector === false || typeof selector === \"function\" ) {\n\
\t\t\t// ( types [, fn] )\n\
\t\t\tfn = selector;\n\
\t\t\tselector = undefined;\n\
\t\t}\n\
\t\tif ( fn === false ) {\n\
\t\t\tfn = returnFalse;\n\
\t\t}\n\
\t\treturn this.each(function() {\n\
\t\t\tjQuery.event.remove( this, types, fn, selector );\n\
\t\t});\n\
\t},\n\
\n\
\ttrigger: function( type, data ) {\n\
\t\treturn this.each(function() {\n\
\t\t\tjQuery.event.trigger( type, data, this );\n\
\t\t});\n\
\t},\n\
\ttriggerHandler: function( type, data ) {\n\
\t\tvar elem = this[0];\n\
\t\tif ( elem ) {\n\
\t\t\treturn jQuery.event.trigger( type, data, elem, true );\n\
\t\t}\n\
\t}\n\
});\n\
\n\
\n\
var\n\
\trxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\\w:]+)[^>]*)\\/>/gi,\n\
\trtagName = /<([\\w:]+)/,\n\
\trhtml = /<|&#?\\w+;/,\n\
\trnoInnerhtml = /<(?:script|style|link)/i,\n\
\t// checked=\"checked\" or checked\n\
\trchecked = /checked\\s*(?:[^=]|=\\s*.checked.)/i,\n\
\trscriptType = /^$|\\/(?:java|ecma)script/i,\n\
\trscriptTypeMasked = /^true\\/(.*)/,\n\
\trcleanScript = /^\\s*<!(?:\\[CDATA\\[|--)|(?:\\]\\]|--)>\\s*$/g,\n\
\n\
\t// We have to close these tags to support XHTML (#13200)\n\
\twrapMap = {\n\
\n\
\t\t// Support: IE 9\n\
\t\toption: [ 1, \"<select multiple='multiple'>\", \"</select>\" ],\n\
\n\
\t\tthead: [ 1, \"<table>\", \"</table>\" ],\n\
\t\tcol: [ 2, \"<table><colgroup>\", \"</colgroup></table>\" ],\n\
\t\ttr: [ 2, \"<table><tbody>\", \"</tbody></table>\" ],\n\
\t\ttd: [ 3, \"<table><tbody><tr>\", \"</tr></tbody></table>\" ],\n\
\n\
\t\t_default: [ 0, \"\", \"\" ]\n\
\t};\n\
\n\
// Support: IE 9\n\
wrapMap.optgroup = wrapMap.option;\n\
\n\
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;\n\
wrapMap.th = wrapMap.td;\n\
\n\
// Support: 1.x compatibility\n\
// Manipulating tables requires a tbody\n\
function manipulationTarget( elem, content ) {\n\
\treturn jQuery.nodeName( elem, \"table\" ) &&\n\
\t\tjQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, \"tr\" ) ?\n\
\n\
\t\telem.getElementsByTagName(\"tbody\")[0] ||\n\
\t\t\telem.appendChild( elem.ownerDocument.createElement(\"tbody\") ) :\n\
\t\telem;\n\
}\n\
\n\
// Replace/restore the type attribute of script elements for safe DOM manipulation\n\
function disableScript( elem ) {\n\
\telem.type = (elem.getAttribute(\"type\") !== null) + \"/\" + elem.type;\n\
\treturn elem;\n\
}\n\
function restoreScript( elem ) {\n\
\tvar match = rscriptTypeMasked.exec( elem.type );\n\
\n\
\tif ( match ) {\n\
\t\telem.type = match[ 1 ];\n\
\t} else {\n\
\t\telem.removeAttribute(\"type\");\n\
\t}\n\
\n\
\treturn elem;\n\
}\n\
\n\
// Mark scripts as having already been evaluated\n\
function setGlobalEval( elems, refElements ) {\n\
\tvar i = 0,\n\
\t\tl = elems.length;\n\
\n\
\tfor ( ; i < l; i++ ) {\n\
\t\tdata_priv.set(\n\
\t\t\telems[ i ], \"globalEval\", !refElements || data_priv.get( refElements[ i ], \"globalEval\" )\n\
\t\t);\n\
\t}\n\
}\n\
\n\
function cloneCopyEvent( src, dest ) {\n\
\tvar i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;\n\
\n\
\tif ( dest.nodeType !== 1 ) {\n\
\t\treturn;\n\
\t}\n\
\n\
\t// 1. Copy private data: events, handlers, etc.\n\
\tif ( data_priv.hasData( src ) ) {\n\
\t\tpdataOld = data_priv.access( src );\n\
\t\tpdataCur = data_priv.set( dest, pdataOld );\n\
\t\tevents = pdataOld.events;\n\
\n\
\t\tif ( events ) {\n\
\t\t\tdelete pdataCur.handle;\n\
\t\t\tpdataCur.events = {};\n\
\n\
\t\t\tfor ( type in events ) {\n\
\t\t\t\tfor ( i = 0, l = events[ type ].length; i < l; i++ ) {\n\
\t\t\t\t\tjQuery.event.add( dest, type, events[ type ][ i ] );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\t// 2. Copy user data\n\
\tif ( data_user.hasData( src ) ) {\n\
\t\tudataOld = data_user.access( src );\n\
\t\tudataCur = jQuery.extend( {}, udataOld );\n\
\n\
\t\tdata_user.set( dest, udataCur );\n\
\t}\n\
}\n\
\n\
function getAll( context, tag ) {\n\
\tvar ret = context.getElementsByTagName ? context.getElementsByTagName( tag || \"*\" ) :\n\
\t\t\tcontext.querySelectorAll ? context.querySelectorAll( tag || \"*\" ) :\n\
\t\t\t[];\n\
\n\
\treturn tag === undefined || tag && jQuery.nodeName( context, tag ) ?\n\
\t\tjQuery.merge( [ context ], ret ) :\n\
\t\tret;\n\
}\n\
\n\
// Support: IE >= 9\n\
function fixInput( src, dest ) {\n\
\tvar nodeName = dest.nodeName.toLowerCase();\n\
\n\
\t// Fails to persist the checked state of a cloned checkbox or radio button.\n\
\tif ( nodeName === \"input\" && rcheckableType.test( src.type ) ) {\n\
\t\tdest.checked = src.checked;\n\
\n\
\t// Fails to return the selected option to the default selected state when cloning options\n\
\t} else if ( nodeName === \"input\" || nodeName === \"textarea\" ) {\n\
\t\tdest.defaultValue = src.defaultValue;\n\
\t}\n\
}\n\
\n\
jQuery.extend({\n\
\tclone: function( elem, dataAndEvents, deepDataAndEvents ) {\n\
\t\tvar i, l, srcElements, destElements,\n\
\t\t\tclone = elem.cloneNode( true ),\n\
\t\t\tinPage = jQuery.contains( elem.ownerDocument, elem );\n\
\n\
\t\t// Support: IE >= 9\n\
\t\t// Fix Cloning issues\n\
\t\tif ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&\n\
\t\t\t\t!jQuery.isXMLDoc( elem ) ) {\n\
\n\
\t\t\t// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2\n\
\t\t\tdestElements = getAll( clone );\n\
\t\t\tsrcElements = getAll( elem );\n\
\n\
\t\t\tfor ( i = 0, l = srcElements.length; i < l; i++ ) {\n\
\t\t\t\tfixInput( srcElements[ i ], destElements[ i ] );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Copy the events from the original to the clone\n\
\t\tif ( dataAndEvents ) {\n\
\t\t\tif ( deepDataAndEvents ) {\n\
\t\t\t\tsrcElements = srcElements || getAll( elem );\n\
\t\t\t\tdestElements = destElements || getAll( clone );\n\
\n\
\t\t\t\tfor ( i = 0, l = srcElements.length; i < l; i++ ) {\n\
\t\t\t\t\tcloneCopyEvent( srcElements[ i ], destElements[ i ] );\n\
\t\t\t\t}\n\
\t\t\t} else {\n\
\t\t\t\tcloneCopyEvent( elem, clone );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Preserve script evaluation history\n\
\t\tdestElements = getAll( clone, \"script\" );\n\
\t\tif ( destElements.length > 0 ) {\n\
\t\t\tsetGlobalEval( destElements, !inPage && getAll( elem, \"script\" ) );\n\
\t\t}\n\
\n\
\t\t// Return the cloned set\n\
\t\treturn clone;\n\
\t},\n\
\n\
\tbuildFragment: function( elems, context, scripts, selection ) {\n\
\t\tvar elem, tmp, tag, wrap, contains, j,\n\
\t\t\tfragment = context.createDocumentFragment(),\n\
\t\t\tnodes = [],\n\
\t\t\ti = 0,\n\
\t\t\tl = elems.length;\n\
\n\
\t\tfor ( ; i < l; i++ ) {\n\
\t\t\telem = elems[ i ];\n\
\n\
\t\t\tif ( elem || elem === 0 ) {\n\
\n\
\t\t\t\t// Add nodes directly\n\
\t\t\t\tif ( jQuery.type( elem ) === \"object\" ) {\n\
\t\t\t\t\t// Support: QtWebKit\n\
\t\t\t\t\t// jQuery.merge because push.apply(_, arraylike) throws\n\
\t\t\t\t\tjQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );\n\
\n\
\t\t\t\t// Convert non-html into a text node\n\
\t\t\t\t} else if ( !rhtml.test( elem ) ) {\n\
\t\t\t\t\tnodes.push( context.createTextNode( elem ) );\n\
\n\
\t\t\t\t// Convert html into DOM nodes\n\
\t\t\t\t} else {\n\
\t\t\t\t\ttmp = tmp || fragment.appendChild( context.createElement(\"div\") );\n\
\n\
\t\t\t\t\t// Deserialize a standard representation\n\
\t\t\t\t\ttag = ( rtagName.exec( elem ) || [ \"\", \"\" ] )[ 1 ].toLowerCase();\n\
\t\t\t\t\twrap = wrapMap[ tag ] || wrapMap._default;\n\
\t\t\t\t\ttmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, \"<$1></$2>\" ) + wrap[ 2 ];\n\
\n\
\t\t\t\t\t// Descend through wrappers to the right content\n\
\t\t\t\t\tj = wrap[ 0 ];\n\
\t\t\t\t\twhile ( j-- ) {\n\
\t\t\t\t\t\ttmp = tmp.lastChild;\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// Support: QtWebKit\n\
\t\t\t\t\t// jQuery.merge because push.apply(_, arraylike) throws\n\
\t\t\t\t\tjQuery.merge( nodes, tmp.childNodes );\n\
\n\
\t\t\t\t\t// Remember the top-level container\n\
\t\t\t\t\ttmp = fragment.firstChild;\n\
\n\
\t\t\t\t\t// Fixes #12346\n\
\t\t\t\t\t// Support: Webkit, IE\n\
\t\t\t\t\ttmp.textContent = \"\";\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Remove wrapper from fragment\n\
\t\tfragment.textContent = \"\";\n\
\n\
\t\ti = 0;\n\
\t\twhile ( (elem = nodes[ i++ ]) ) {\n\
\n\
\t\t\t// #4087 - If origin and destination elements are the same, and this is\n\
\t\t\t// that element, do not do anything\n\
\t\t\tif ( selection && jQuery.inArray( elem, selection ) !== -1 ) {\n\
\t\t\t\tcontinue;\n\
\t\t\t}\n\
\n\
\t\t\tcontains = jQuery.contains( elem.ownerDocument, elem );\n\
\n\
\t\t\t// Append to fragment\n\
\t\t\ttmp = getAll( fragment.appendChild( elem ), \"script\" );\n\
\n\
\t\t\t// Preserve script evaluation history\n\
\t\t\tif ( contains ) {\n\
\t\t\t\tsetGlobalEval( tmp );\n\
\t\t\t}\n\
\n\
\t\t\t// Capture executables\n\
\t\t\tif ( scripts ) {\n\
\t\t\t\tj = 0;\n\
\t\t\t\twhile ( (elem = tmp[ j++ ]) ) {\n\
\t\t\t\t\tif ( rscriptType.test( elem.type || \"\" ) ) {\n\
\t\t\t\t\t\tscripts.push( elem );\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn fragment;\n\
\t},\n\
\n\
\tcleanData: function( elems ) {\n\
\t\tvar data, elem, type, key,\n\
\t\t\tspecial = jQuery.event.special,\n\
\t\t\ti = 0;\n\
\n\
\t\tfor ( ; (elem = elems[ i ]) !== undefined; i++ ) {\n\
\t\t\tif ( jQuery.acceptData( elem ) ) {\n\
\t\t\t\tkey = elem[ data_priv.expando ];\n\
\n\
\t\t\t\tif ( key && (data = data_priv.cache[ key ]) ) {\n\
\t\t\t\t\tif ( data.events ) {\n\
\t\t\t\t\t\tfor ( type in data.events ) {\n\
\t\t\t\t\t\t\tif ( special[ type ] ) {\n\
\t\t\t\t\t\t\t\tjQuery.event.remove( elem, type );\n\
\n\
\t\t\t\t\t\t\t// This is a shortcut to avoid jQuery.event.remove's overhead\n\
\t\t\t\t\t\t\t} else {\n\
\t\t\t\t\t\t\t\tjQuery.removeEvent( elem, type, data.handle );\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t\tif ( data_priv.cache[ key ] ) {\n\
\t\t\t\t\t\t// Discard any remaining `private` data\n\
\t\t\t\t\t\tdelete data_priv.cache[ key ];\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t\t// Discard any remaining `user` data\n\
\t\t\tdelete data_user.cache[ elem[ data_user.expando ] ];\n\
\t\t}\n\
\t}\n\
});\n\
\n\
jQuery.fn.extend({\n\
\ttext: function( value ) {\n\
\t\treturn access( this, function( value ) {\n\
\t\t\treturn value === undefined ?\n\
\t\t\t\tjQuery.text( this ) :\n\
\t\t\t\tthis.empty().each(function() {\n\
\t\t\t\t\tif ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n\
\t\t\t\t\t\tthis.textContent = value;\n\
\t\t\t\t\t}\n\
\t\t\t\t});\n\
\t\t}, null, value, arguments.length );\n\
\t},\n\
\n\
\tappend: function() {\n\
\t\treturn this.domManip( arguments, function( elem ) {\n\
\t\t\tif ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n\
\t\t\t\tvar target = manipulationTarget( this, elem );\n\
\t\t\t\ttarget.appendChild( elem );\n\
\t\t\t}\n\
\t\t});\n\
\t},\n\
\n\
\tprepend: function() {\n\
\t\treturn this.domManip( arguments, function( elem ) {\n\
\t\t\tif ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {\n\
\t\t\t\tvar target = manipulationTarget( this, elem );\n\
\t\t\t\ttarget.insertBefore( elem, target.firstChild );\n\
\t\t\t}\n\
\t\t});\n\
\t},\n\
\n\
\tbefore: function() {\n\
\t\treturn this.domManip( arguments, function( elem ) {\n\
\t\t\tif ( this.parentNode ) {\n\
\t\t\t\tthis.parentNode.insertBefore( elem, this );\n\
\t\t\t}\n\
\t\t});\n\
\t},\n\
\n\
\tafter: function() {\n\
\t\treturn this.domManip( arguments, function( elem ) {\n\
\t\t\tif ( this.parentNode ) {\n\
\t\t\t\tthis.parentNode.insertBefore( elem, this.nextSibling );\n\
\t\t\t}\n\
\t\t});\n\
\t},\n\
\n\
\tremove: function( selector, keepData /* Internal Use Only */ ) {\n\
\t\tvar elem,\n\
\t\t\telems = selector ? jQuery.filter( selector, this ) : this,\n\
\t\t\ti = 0;\n\
\n\
\t\tfor ( ; (elem = elems[i]) != null; i++ ) {\n\
\t\t\tif ( !keepData && elem.nodeType === 1 ) {\n\
\t\t\t\tjQuery.cleanData( getAll( elem ) );\n\
\t\t\t}\n\
\n\
\t\t\tif ( elem.parentNode ) {\n\
\t\t\t\tif ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {\n\
\t\t\t\t\tsetGlobalEval( getAll( elem, \"script\" ) );\n\
\t\t\t\t}\n\
\t\t\t\telem.parentNode.removeChild( elem );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\t},\n\
\n\
\tempty: function() {\n\
\t\tvar elem,\n\
\t\t\ti = 0;\n\
\n\
\t\tfor ( ; (elem = this[i]) != null; i++ ) {\n\
\t\t\tif ( elem.nodeType === 1 ) {\n\
\n\
\t\t\t\t// Prevent memory leaks\n\
\t\t\t\tjQuery.cleanData( getAll( elem, false ) );\n\
\n\
\t\t\t\t// Remove any remaining nodes\n\
\t\t\t\telem.textContent = \"\";\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\t},\n\
\n\
\tclone: function( dataAndEvents, deepDataAndEvents ) {\n\
\t\tdataAndEvents = dataAndEvents == null ? false : dataAndEvents;\n\
\t\tdeepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;\n\
\n\
\t\treturn this.map(function() {\n\
\t\t\treturn jQuery.clone( this, dataAndEvents, deepDataAndEvents );\n\
\t\t});\n\
\t},\n\
\n\
\thtml: function( value ) {\n\
\t\treturn access( this, function( value ) {\n\
\t\t\tvar elem = this[ 0 ] || {},\n\
\t\t\t\ti = 0,\n\
\t\t\t\tl = this.length;\n\
\n\
\t\t\tif ( value === undefined && elem.nodeType === 1 ) {\n\
\t\t\t\treturn elem.innerHTML;\n\
\t\t\t}\n\
\n\
\t\t\t// See if we can take a shortcut and just use innerHTML\n\
\t\t\tif ( typeof value === \"string\" && !rnoInnerhtml.test( value ) &&\n\
\t\t\t\t!wrapMap[ ( rtagName.exec( value ) || [ \"\", \"\" ] )[ 1 ].toLowerCase() ] ) {\n\
\n\
\t\t\t\tvalue = value.replace( rxhtmlTag, \"<$1></$2>\" );\n\
\n\
\t\t\t\ttry {\n\
\t\t\t\t\tfor ( ; i < l; i++ ) {\n\
\t\t\t\t\t\telem = this[ i ] || {};\n\
\n\
\t\t\t\t\t\t// Remove element nodes and prevent memory leaks\n\
\t\t\t\t\t\tif ( elem.nodeType === 1 ) {\n\
\t\t\t\t\t\t\tjQuery.cleanData( getAll( elem, false ) );\n\
\t\t\t\t\t\t\telem.innerHTML = value;\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\telem = 0;\n\
\n\
\t\t\t\t// If using innerHTML throws an exception, use the fallback method\n\
\t\t\t\t} catch( e ) {}\n\
\t\t\t}\n\
\n\
\t\t\tif ( elem ) {\n\
\t\t\t\tthis.empty().append( value );\n\
\t\t\t}\n\
\t\t}, null, value, arguments.length );\n\
\t},\n\
\n\
\treplaceWith: function() {\n\
\t\tvar arg = arguments[ 0 ];\n\
\n\
\t\t// Make the changes, replacing each context element with the new content\n\
\t\tthis.domManip( arguments, function( elem ) {\n\
\t\t\targ = this.parentNode;\n\
\n\
\t\t\tjQuery.cleanData( getAll( this ) );\n\
\n\
\t\t\tif ( arg ) {\n\
\t\t\t\targ.replaceChild( elem, this );\n\
\t\t\t}\n\
\t\t});\n\
\n\
\t\t// Force removal if there was no new content (e.g., from empty arguments)\n\
\t\treturn arg && (arg.length || arg.nodeType) ? this : this.remove();\n\
\t},\n\
\n\
\tdetach: function( selector ) {\n\
\t\treturn this.remove( selector, true );\n\
\t},\n\
\n\
\tdomManip: function( args, callback ) {\n\
\n\
\t\t// Flatten any nested arrays\n\
\t\targs = concat.apply( [], args );\n\
\n\
\t\tvar fragment, first, scripts, hasScripts, node, doc,\n\
\t\t\ti = 0,\n\
\t\t\tl = this.length,\n\
\t\t\tset = this,\n\
\t\t\tiNoClone = l - 1,\n\
\t\t\tvalue = args[ 0 ],\n\
\t\t\tisFunction = jQuery.isFunction( value );\n\
\n\
\t\t// We can't cloneNode fragments that contain checked, in WebKit\n\
\t\tif ( isFunction ||\n\
\t\t\t\t( l > 1 && typeof value === \"string\" &&\n\
\t\t\t\t\t!support.checkClone && rchecked.test( value ) ) ) {\n\
\t\t\treturn this.each(function( index ) {\n\
\t\t\t\tvar self = set.eq( index );\n\
\t\t\t\tif ( isFunction ) {\n\
\t\t\t\t\targs[ 0 ] = value.call( this, index, self.html() );\n\
\t\t\t\t}\n\
\t\t\t\tself.domManip( args, callback );\n\
\t\t\t});\n\
\t\t}\n\
\n\
\t\tif ( l ) {\n\
\t\t\tfragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );\n\
\t\t\tfirst = fragment.firstChild;\n\
\n\
\t\t\tif ( fragment.childNodes.length === 1 ) {\n\
\t\t\t\tfragment = first;\n\
\t\t\t}\n\
\n\
\t\t\tif ( first ) {\n\
\t\t\t\tscripts = jQuery.map( getAll( fragment, \"script\" ), disableScript );\n\
\t\t\t\thasScripts = scripts.length;\n\
\n\
\t\t\t\t// Use the original fragment for the last item instead of the first because it can end up\n\
\t\t\t\t// being emptied incorrectly in certain situations (#8070).\n\
\t\t\t\tfor ( ; i < l; i++ ) {\n\
\t\t\t\t\tnode = fragment;\n\
\n\
\t\t\t\t\tif ( i !== iNoClone ) {\n\
\t\t\t\t\t\tnode = jQuery.clone( node, true, true );\n\
\n\
\t\t\t\t\t\t// Keep references to cloned scripts for later restoration\n\
\t\t\t\t\t\tif ( hasScripts ) {\n\
\t\t\t\t\t\t\t// Support: QtWebKit\n\
\t\t\t\t\t\t\t// jQuery.merge because push.apply(_, arraylike) throws\n\
\t\t\t\t\t\t\tjQuery.merge( scripts, getAll( node, \"script\" ) );\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\tcallback.call( this[ i ], node, i );\n\
\t\t\t\t}\n\
\n\
\t\t\t\tif ( hasScripts ) {\n\
\t\t\t\t\tdoc = scripts[ scripts.length - 1 ].ownerDocument;\n\
\n\
\t\t\t\t\t// Reenable scripts\n\
\t\t\t\t\tjQuery.map( scripts, restoreScript );\n\
\n\
\t\t\t\t\t// Evaluate executable scripts on first document insertion\n\
\t\t\t\t\tfor ( i = 0; i < hasScripts; i++ ) {\n\
\t\t\t\t\t\tnode = scripts[ i ];\n\
\t\t\t\t\t\tif ( rscriptType.test( node.type || \"\" ) &&\n\
\t\t\t\t\t\t\t!data_priv.access( node, \"globalEval\" ) && jQuery.contains( doc, node ) ) {\n\
\n\
\t\t\t\t\t\t\tif ( node.src ) {\n\
\t\t\t\t\t\t\t\t// Optional AJAX dependency, but won't run scripts if not present\n\
\t\t\t\t\t\t\t\tif ( jQuery._evalUrl ) {\n\
\t\t\t\t\t\t\t\t\tjQuery._evalUrl( node.src );\n\
\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t} else {\n\
\t\t\t\t\t\t\t\tjQuery.globalEval( node.textContent.replace( rcleanScript, \"\" ) );\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\t}\n\
});\n\
\n\
jQuery.each({\n\
\tappendTo: \"append\",\n\
\tprependTo: \"prepend\",\n\
\tinsertBefore: \"before\",\n\
\tinsertAfter: \"after\",\n\
\treplaceAll: \"replaceWith\"\n\
}, function( name, original ) {\n\
\tjQuery.fn[ name ] = function( selector ) {\n\
\t\tvar elems,\n\
\t\t\tret = [],\n\
\t\t\tinsert = jQuery( selector ),\n\
\t\t\tlast = insert.length - 1,\n\
\t\t\ti = 0;\n\
\n\
\t\tfor ( ; i <= last; i++ ) {\n\
\t\t\telems = i === last ? this : this.clone( true );\n\
\t\t\tjQuery( insert[ i ] )[ original ]( elems );\n\
\n\
\t\t\t// Support: QtWebKit\n\
\t\t\t// .get() because push.apply(_, arraylike) throws\n\
\t\t\tpush.apply( ret, elems.get() );\n\
\t\t}\n\
\n\
\t\treturn this.pushStack( ret );\n\
\t};\n\
});\n\
\n\
\n\
var iframe,\n\
\telemdisplay = {};\n\
\n\
/**\n\
 * Retrieve the actual display of a element\n\
 * @param {String} name nodeName of the element\n\
 * @param {Object} doc Document object\n\
 */\n\
// Called only from within defaultDisplay\n\
function actualDisplay( name, doc ) {\n\
\tvar style,\n\
\t\telem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),\n\
\n\
\t\t// getDefaultComputedStyle might be reliably used only on attached element\n\
\t\tdisplay = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?\n\
\n\
\t\t\t// Use of this method is a temporary fix (more like optmization) until something better comes along,\n\
\t\t\t// since it was removed from specification and supported only in FF\n\
\t\t\tstyle.display : jQuery.css( elem[ 0 ], \"display\" );\n\
\n\
\t// We don't have any data stored on the element,\n\
\t// so use \"detach\" method as fast way to get rid of the element\n\
\telem.detach();\n\
\n\
\treturn display;\n\
}\n\
\n\
/**\n\
 * Try to determine the default display value of an element\n\
 * @param {String} nodeName\n\
 */\n\
function defaultDisplay( nodeName ) {\n\
\tvar doc = document,\n\
\t\tdisplay = elemdisplay[ nodeName ];\n\
\n\
\tif ( !display ) {\n\
\t\tdisplay = actualDisplay( nodeName, doc );\n\
\n\
\t\t// If the simple way fails, read from inside an iframe\n\
\t\tif ( display === \"none\" || !display ) {\n\
\n\
\t\t\t// Use the already-created iframe if possible\n\
\t\t\tiframe = (iframe || jQuery( \"<iframe frameborder='0' width='0' height='0'/>\" )).appendTo( doc.documentElement );\n\
\n\
\t\t\t// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse\n\
\t\t\tdoc = iframe[ 0 ].contentDocument;\n\
\n\
\t\t\t// Support: IE\n\
\t\t\tdoc.write();\n\
\t\t\tdoc.close();\n\
\n\
\t\t\tdisplay = actualDisplay( nodeName, doc );\n\
\t\t\tiframe.detach();\n\
\t\t}\n\
\n\
\t\t// Store the correct default display\n\
\t\telemdisplay[ nodeName ] = display;\n\
\t}\n\
\n\
\treturn display;\n\
}\n\
var rmargin = (/^margin/);\n\
\n\
var rnumnonpx = new RegExp( \"^(\" + pnum + \")(?!px)[a-z%]+$\", \"i\" );\n\
\n\
var getStyles = function( elem ) {\n\
\t\treturn elem.ownerDocument.defaultView.getComputedStyle( elem, null );\n\
\t};\n\
\n\
\n\
\n\
function curCSS( elem, name, computed ) {\n\
\tvar width, minWidth, maxWidth, ret,\n\
\t\tstyle = elem.style;\n\
\n\
\tcomputed = computed || getStyles( elem );\n\
\n\
\t// Support: IE9\n\
\t// getPropertyValue is only needed for .css('filter') in IE9, see #12537\n\
\tif ( computed ) {\n\
\t\tret = computed.getPropertyValue( name ) || computed[ name ];\n\
\t}\n\
\n\
\tif ( computed ) {\n\
\n\
\t\tif ( ret === \"\" && !jQuery.contains( elem.ownerDocument, elem ) ) {\n\
\t\t\tret = jQuery.style( elem, name );\n\
\t\t}\n\
\n\
\t\t// Support: iOS < 6\n\
\t\t// A tribute to the \"awesome hack by Dean Edwards\"\n\
\t\t// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels\n\
\t\t// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values\n\
\t\tif ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {\n\
\n\
\t\t\t// Remember the original values\n\
\t\t\twidth = style.width;\n\
\t\t\tminWidth = style.minWidth;\n\
\t\t\tmaxWidth = style.maxWidth;\n\
\n\
\t\t\t// Put in the new values to get a computed value out\n\
\t\t\tstyle.minWidth = style.maxWidth = style.width = ret;\n\
\t\t\tret = computed.width;\n\
\n\
\t\t\t// Revert the changed values\n\
\t\t\tstyle.width = width;\n\
\t\t\tstyle.minWidth = minWidth;\n\
\t\t\tstyle.maxWidth = maxWidth;\n\
\t\t}\n\
\t}\n\
\n\
\treturn ret !== undefined ?\n\
\t\t// Support: IE\n\
\t\t// IE returns zIndex value as an integer.\n\
\t\tret + \"\" :\n\
\t\tret;\n\
}\n\
\n\
\n\
function addGetHookIf( conditionFn, hookFn ) {\n\
\t// Define the hook, we'll check on the first run if it's really needed.\n\
\treturn {\n\
\t\tget: function() {\n\
\t\t\tif ( conditionFn() ) {\n\
\t\t\t\t// Hook not needed (or it's not possible to use it due to missing dependency),\n\
\t\t\t\t// remove it.\n\
\t\t\t\t// Since there are no other hooks for marginRight, remove the whole object.\n\
\t\t\t\tdelete this.get;\n\
\t\t\t\treturn;\n\
\t\t\t}\n\
\n\
\t\t\t// Hook needed; redefine it so that the support test is not executed again.\n\
\n\
\t\t\treturn (this.get = hookFn).apply( this, arguments );\n\
\t\t}\n\
\t};\n\
}\n\
\n\
\n\
(function() {\n\
\tvar pixelPositionVal, boxSizingReliableVal,\n\
\t\tdocElem = document.documentElement,\n\
\t\tcontainer = document.createElement( \"div\" ),\n\
\t\tdiv = document.createElement( \"div\" );\n\
\n\
\tif ( !div.style ) {\n\
\t\treturn;\n\
\t}\n\
\n\
\tdiv.style.backgroundClip = \"content-box\";\n\
\tdiv.cloneNode( true ).style.backgroundClip = \"\";\n\
\tsupport.clearCloneStyle = div.style.backgroundClip === \"content-box\";\n\
\n\
\tcontainer.style.cssText = \"border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;\" +\n\
\t\t\"position:absolute\";\n\
\tcontainer.appendChild( div );\n\
\n\
\t// Executing both pixelPosition & boxSizingReliable tests require only one layout\n\
\t// so they're executed at the same time to save the second computation.\n\
\tfunction computePixelPositionAndBoxSizingReliable() {\n\
\t\tdiv.style.cssText =\n\
\t\t\t// Support: Firefox<29, Android 2.3\n\
\t\t\t// Vendor-prefix box-sizing\n\
\t\t\t\"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;\" +\n\
\t\t\t\"box-sizing:border-box;display:block;margin-top:1%;top:1%;\" +\n\
\t\t\t\"border:1px;padding:1px;width:4px;position:absolute\";\n\
\t\tdiv.innerHTML = \"\";\n\
\t\tdocElem.appendChild( container );\n\
\n\
\t\tvar divStyle = window.getComputedStyle( div, null );\n\
\t\tpixelPositionVal = divStyle.top !== \"1%\";\n\
\t\tboxSizingReliableVal = divStyle.width === \"4px\";\n\
\n\
\t\tdocElem.removeChild( container );\n\
\t}\n\
\n\
\t// Support: node.js jsdom\n\
\t// Don't assume that getComputedStyle is a property of the global object\n\
\tif ( window.getComputedStyle ) {\n\
\t\tjQuery.extend( support, {\n\
\t\t\tpixelPosition: function() {\n\
\t\t\t\t// This test is executed only once but we still do memoizing\n\
\t\t\t\t// since we can use the boxSizingReliable pre-computing.\n\
\t\t\t\t// No need to check if the test was already performed, though.\n\
\t\t\t\tcomputePixelPositionAndBoxSizingReliable();\n\
\t\t\t\treturn pixelPositionVal;\n\
\t\t\t},\n\
\t\t\tboxSizingReliable: function() {\n\
\t\t\t\tif ( boxSizingReliableVal == null ) {\n\
\t\t\t\t\tcomputePixelPositionAndBoxSizingReliable();\n\
\t\t\t\t}\n\
\t\t\t\treturn boxSizingReliableVal;\n\
\t\t\t},\n\
\t\t\treliableMarginRight: function() {\n\
\t\t\t\t// Support: Android 2.3\n\
\t\t\t\t// Check if div with explicit width and no margin-right incorrectly\n\
\t\t\t\t// gets computed margin-right based on width of container. (#3333)\n\
\t\t\t\t// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\n\
\t\t\t\t// This support function is only executed once so no memoizing is needed.\n\
\t\t\t\tvar ret,\n\
\t\t\t\t\tmarginDiv = div.appendChild( document.createElement( \"div\" ) );\n\
\n\
\t\t\t\t// Reset CSS: box-sizing; display; margin; border; padding\n\
\t\t\t\tmarginDiv.style.cssText = div.style.cssText =\n\
\t\t\t\t\t// Support: Firefox<29, Android 2.3\n\
\t\t\t\t\t// Vendor-prefix box-sizing\n\
\t\t\t\t\t\"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;\" +\n\
\t\t\t\t\t\"box-sizing:content-box;display:block;margin:0;border:0;padding:0\";\n\
\t\t\t\tmarginDiv.style.marginRight = marginDiv.style.width = \"0\";\n\
\t\t\t\tdiv.style.width = \"1px\";\n\
\t\t\t\tdocElem.appendChild( container );\n\
\n\
\t\t\t\tret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );\n\
\n\
\t\t\t\tdocElem.removeChild( container );\n\
\n\
\t\t\t\treturn ret;\n\
\t\t\t}\n\
\t\t});\n\
\t}\n\
})();\n\
\n\
\n\
// A method for quickly swapping in/out CSS properties to get correct calculations.\n\
jQuery.swap = function( elem, options, callback, args ) {\n\
\tvar ret, name,\n\
\t\told = {};\n\
\n\
\t// Remember the old values, and insert the new ones\n\
\tfor ( name in options ) {\n\
\t\told[ name ] = elem.style[ name ];\n\
\t\telem.style[ name ] = options[ name ];\n\
\t}\n\
\n\
\tret = callback.apply( elem, args || [] );\n\
\n\
\t// Revert the old values\n\
\tfor ( name in options ) {\n\
\t\telem.style[ name ] = old[ name ];\n\
\t}\n\
\n\
\treturn ret;\n\
};\n\
\n\
\n\
var\n\
\t// swappable if display is none or starts with table except \"table\", \"table-cell\", or \"table-caption\"\n\
\t// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display\n\
\trdisplayswap = /^(none|table(?!-c[ea]).+)/,\n\
\trnumsplit = new RegExp( \"^(\" + pnum + \")(.*)$\", \"i\" ),\n\
\trrelNum = new RegExp( \"^([+-])=(\" + pnum + \")\", \"i\" ),\n\
\n\
\tcssShow = { position: \"absolute\", visibility: \"hidden\", display: \"block\" },\n\
\tcssNormalTransform = {\n\
\t\tletterSpacing: \"0\",\n\
\t\tfontWeight: \"400\"\n\
\t},\n\
\n\
\tcssPrefixes = [ \"Webkit\", \"O\", \"Moz\", \"ms\" ];\n\
\n\
// return a css property mapped to a potentially vendor prefixed property\n\
function vendorPropName( style, name ) {\n\
\n\
\t// shortcut for names that are not vendor prefixed\n\
\tif ( name in style ) {\n\
\t\treturn name;\n\
\t}\n\
\n\
\t// check for vendor prefixed names\n\
\tvar capName = name[0].toUpperCase() + name.slice(1),\n\
\t\torigName = name,\n\
\t\ti = cssPrefixes.length;\n\
\n\
\twhile ( i-- ) {\n\
\t\tname = cssPrefixes[ i ] + capName;\n\
\t\tif ( name in style ) {\n\
\t\t\treturn name;\n\
\t\t}\n\
\t}\n\
\n\
\treturn origName;\n\
}\n\
\n\
function setPositiveNumber( elem, value, subtract ) {\n\
\tvar matches = rnumsplit.exec( value );\n\
\treturn matches ?\n\
\t\t// Guard against undefined \"subtract\", e.g., when used as in cssHooks\n\
\t\tMath.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || \"px\" ) :\n\
\t\tvalue;\n\
}\n\
\n\
function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {\n\
\tvar i = extra === ( isBorderBox ? \"border\" : \"content\" ) ?\n\
\t\t// If we already have the right measurement, avoid augmentation\n\
\t\t4 :\n\
\t\t// Otherwise initialize for horizontal or vertical properties\n\
\t\tname === \"width\" ? 1 : 0,\n\
\n\
\t\tval = 0;\n\
\n\
\tfor ( ; i < 4; i += 2 ) {\n\
\t\t// both box models exclude margin, so add it if we want it\n\
\t\tif ( extra === \"margin\" ) {\n\
\t\t\tval += jQuery.css( elem, extra + cssExpand[ i ], true, styles );\n\
\t\t}\n\
\n\
\t\tif ( isBorderBox ) {\n\
\t\t\t// border-box includes padding, so remove it if we want content\n\
\t\t\tif ( extra === \"content\" ) {\n\
\t\t\t\tval -= jQuery.css( elem, \"padding\" + cssExpand[ i ], true, styles );\n\
\t\t\t}\n\
\n\
\t\t\t// at this point, extra isn't border nor margin, so remove border\n\
\t\t\tif ( extra !== \"margin\" ) {\n\
\t\t\t\tval -= jQuery.css( elem, \"border\" + cssExpand[ i ] + \"Width\", true, styles );\n\
\t\t\t}\n\
\t\t} else {\n\
\t\t\t// at this point, extra isn't content, so add padding\n\
\t\t\tval += jQuery.css( elem, \"padding\" + cssExpand[ i ], true, styles );\n\
\n\
\t\t\t// at this point, extra isn't content nor padding, so add border\n\
\t\t\tif ( extra !== \"padding\" ) {\n\
\t\t\t\tval += jQuery.css( elem, \"border\" + cssExpand[ i ] + \"Width\", true, styles );\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\treturn val;\n\
}\n\
\n\
function getWidthOrHeight( elem, name, extra ) {\n\
\n\
\t// Start with offset property, which is equivalent to the border-box value\n\
\tvar valueIsBorderBox = true,\n\
\t\tval = name === \"width\" ? elem.offsetWidth : elem.offsetHeight,\n\
\t\tstyles = getStyles( elem ),\n\
\t\tisBorderBox = jQuery.css( elem, \"boxSizing\", false, styles ) === \"border-box\";\n\
\n\
\t// some non-html elements return undefined for offsetWidth, so check for null/undefined\n\
\t// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285\n\
\t// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668\n\
\tif ( val <= 0 || val == null ) {\n\
\t\t// Fall back to computed then uncomputed css if necessary\n\
\t\tval = curCSS( elem, name, styles );\n\
\t\tif ( val < 0 || val == null ) {\n\
\t\t\tval = elem.style[ name ];\n\
\t\t}\n\
\n\
\t\t// Computed unit is not pixels. Stop here and return.\n\
\t\tif ( rnumnonpx.test(val) ) {\n\
\t\t\treturn val;\n\
\t\t}\n\
\n\
\t\t// we need the check for style in case a browser which returns unreliable values\n\
\t\t// for getComputedStyle silently falls back to the reliable elem.style\n\
\t\tvalueIsBorderBox = isBorderBox &&\n\
\t\t\t( support.boxSizingReliable() || val === elem.style[ name ] );\n\
\n\
\t\t// Normalize \"\", auto, and prepare for extra\n\
\t\tval = parseFloat( val ) || 0;\n\
\t}\n\
\n\
\t// use the active box-sizing model to add/subtract irrelevant styles\n\
\treturn ( val +\n\
\t\taugmentWidthOrHeight(\n\
\t\t\telem,\n\
\t\t\tname,\n\
\t\t\textra || ( isBorderBox ? \"border\" : \"content\" ),\n\
\t\t\tvalueIsBorderBox,\n\
\t\t\tstyles\n\
\t\t)\n\
\t) + \"px\";\n\
}\n\
\n\
function showHide( elements, show ) {\n\
\tvar display, elem, hidden,\n\
\t\tvalues = [],\n\
\t\tindex = 0,\n\
\t\tlength = elements.length;\n\
\n\
\tfor ( ; index < length; index++ ) {\n\
\t\telem = elements[ index ];\n\
\t\tif ( !elem.style ) {\n\
\t\t\tcontinue;\n\
\t\t}\n\
\n\
\t\tvalues[ index ] = data_priv.get( elem, \"olddisplay\" );\n\
\t\tdisplay = elem.style.display;\n\
\t\tif ( show ) {\n\
\t\t\t// Reset the inline display of this element to learn if it is\n\
\t\t\t// being hidden by cascaded rules or not\n\
\t\t\tif ( !values[ index ] && display === \"none\" ) {\n\
\t\t\t\telem.style.display = \"\";\n\
\t\t\t}\n\
\n\
\t\t\t// Set elements which have been overridden with display: none\n\
\t\t\t// in a stylesheet to whatever the default browser style is\n\
\t\t\t// for such an element\n\
\t\t\tif ( elem.style.display === \"\" && isHidden( elem ) ) {\n\
\t\t\t\tvalues[ index ] = data_priv.access( elem, \"olddisplay\", defaultDisplay(elem.nodeName) );\n\
\t\t\t}\n\
\t\t} else {\n\
\t\t\thidden = isHidden( elem );\n\
\n\
\t\t\tif ( display !== \"none\" || !hidden ) {\n\
\t\t\t\tdata_priv.set( elem, \"olddisplay\", hidden ? display : jQuery.css( elem, \"display\" ) );\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\t// Set the display of most of the elements in a second loop\n\
\t// to avoid the constant reflow\n\
\tfor ( index = 0; index < length; index++ ) {\n\
\t\telem = elements[ index ];\n\
\t\tif ( !elem.style ) {\n\
\t\t\tcontinue;\n\
\t\t}\n\
\t\tif ( !show || elem.style.display === \"none\" || elem.style.display === \"\" ) {\n\
\t\t\telem.style.display = show ? values[ index ] || \"\" : \"none\";\n\
\t\t}\n\
\t}\n\
\n\
\treturn elements;\n\
}\n\
\n\
jQuery.extend({\n\
\t// Add in style property hooks for overriding the default\n\
\t// behavior of getting and setting a style property\n\
\tcssHooks: {\n\
\t\topacity: {\n\
\t\t\tget: function( elem, computed ) {\n\
\t\t\t\tif ( computed ) {\n\
\t\t\t\t\t// We should always get a number back from opacity\n\
\t\t\t\t\tvar ret = curCSS( elem, \"opacity\" );\n\
\t\t\t\t\treturn ret === \"\" ? \"1\" : ret;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t},\n\
\n\
\t// Don't automatically add \"px\" to these possibly-unitless properties\n\
\tcssNumber: {\n\
\t\t\"columnCount\": true,\n\
\t\t\"fillOpacity\": true,\n\
\t\t\"flexGrow\": true,\n\
\t\t\"flexShrink\": true,\n\
\t\t\"fontWeight\": true,\n\
\t\t\"lineHeight\": true,\n\
\t\t\"opacity\": true,\n\
\t\t\"order\": true,\n\
\t\t\"orphans\": true,\n\
\t\t\"widows\": true,\n\
\t\t\"zIndex\": true,\n\
\t\t\"zoom\": true\n\
\t},\n\
\n\
\t// Add in properties whose names you wish to fix before\n\
\t// setting or getting the value\n\
\tcssProps: {\n\
\t\t// normalize float css property\n\
\t\t\"float\": \"cssFloat\"\n\
\t},\n\
\n\
\t// Get and set the style property on a DOM Node\n\
\tstyle: function( elem, name, value, extra ) {\n\
\t\t// Don't set styles on text and comment nodes\n\
\t\tif ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\t// Make sure that we're working with the right name\n\
\t\tvar ret, type, hooks,\n\
\t\t\torigName = jQuery.camelCase( name ),\n\
\t\t\tstyle = elem.style;\n\
\n\
\t\tname = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );\n\
\n\
\t\t// gets hook for the prefixed version\n\
\t\t// followed by the unprefixed version\n\
\t\thooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];\n\
\n\
\t\t// Check if we're setting a value\n\
\t\tif ( value !== undefined ) {\n\
\t\t\ttype = typeof value;\n\
\n\
\t\t\t// convert relative number strings (+= or -=) to relative numbers. #7345\n\
\t\t\tif ( type === \"string\" && (ret = rrelNum.exec( value )) ) {\n\
\t\t\t\tvalue = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );\n\
\t\t\t\t// Fixes bug #9237\n\
\t\t\t\ttype = \"number\";\n\
\t\t\t}\n\
\n\
\t\t\t// Make sure that null and NaN values aren't set. See: #7116\n\
\t\t\tif ( value == null || value !== value ) {\n\
\t\t\t\treturn;\n\
\t\t\t}\n\
\n\
\t\t\t// If a number was passed in, add 'px' to the (except for certain CSS properties)\n\
\t\t\tif ( type === \"number\" && !jQuery.cssNumber[ origName ] ) {\n\
\t\t\t\tvalue += \"px\";\n\
\t\t\t}\n\
\n\
\t\t\t// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,\n\
\t\t\t// but it would mean to define eight (for every problematic property) identical functions\n\
\t\t\tif ( !support.clearCloneStyle && value === \"\" && name.indexOf( \"background\" ) === 0 ) {\n\
\t\t\t\tstyle[ name ] = \"inherit\";\n\
\t\t\t}\n\
\n\
\t\t\t// If a hook was provided, use that value, otherwise just set the specified value\n\
\t\t\tif ( !hooks || !(\"set\" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {\n\
\t\t\t\tstyle[ name ] = value;\n\
\t\t\t}\n\
\n\
\t\t} else {\n\
\t\t\t// If a hook was provided get the non-computed value from there\n\
\t\t\tif ( hooks && \"get\" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {\n\
\t\t\t\treturn ret;\n\
\t\t\t}\n\
\n\
\t\t\t// Otherwise just get the value from the style object\n\
\t\t\treturn style[ name ];\n\
\t\t}\n\
\t},\n\
\n\
\tcss: function( elem, name, extra, styles ) {\n\
\t\tvar val, num, hooks,\n\
\t\t\torigName = jQuery.camelCase( name );\n\
\n\
\t\t// Make sure that we're working with the right name\n\
\t\tname = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );\n\
\n\
\t\t// gets hook for the prefixed version\n\
\t\t// followed by the unprefixed version\n\
\t\thooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];\n\
\n\
\t\t// If a hook was provided get the computed value from there\n\
\t\tif ( hooks && \"get\" in hooks ) {\n\
\t\t\tval = hooks.get( elem, true, extra );\n\
\t\t}\n\
\n\
\t\t// Otherwise, if a way to get the computed value exists, use that\n\
\t\tif ( val === undefined ) {\n\
\t\t\tval = curCSS( elem, name, styles );\n\
\t\t}\n\
\n\
\t\t//convert \"normal\" to computed value\n\
\t\tif ( val === \"normal\" && name in cssNormalTransform ) {\n\
\t\t\tval = cssNormalTransform[ name ];\n\
\t\t}\n\
\n\
\t\t// Return, converting to number if forced or a qualifier was provided and val looks numeric\n\
\t\tif ( extra === \"\" || extra ) {\n\
\t\t\tnum = parseFloat( val );\n\
\t\t\treturn extra === true || jQuery.isNumeric( num ) ? num || 0 : val;\n\
\t\t}\n\
\t\treturn val;\n\
\t}\n\
});\n\
\n\
jQuery.each([ \"height\", \"width\" ], function( i, name ) {\n\
\tjQuery.cssHooks[ name ] = {\n\
\t\tget: function( elem, computed, extra ) {\n\
\t\t\tif ( computed ) {\n\
\t\t\t\t// certain elements can have dimension info if we invisibly show them\n\
\t\t\t\t// however, it must have a current display style that would benefit from this\n\
\t\t\t\treturn rdisplayswap.test( jQuery.css( elem, \"display\" ) ) && elem.offsetWidth === 0 ?\n\
\t\t\t\t\tjQuery.swap( elem, cssShow, function() {\n\
\t\t\t\t\t\treturn getWidthOrHeight( elem, name, extra );\n\
\t\t\t\t\t}) :\n\
\t\t\t\t\tgetWidthOrHeight( elem, name, extra );\n\
\t\t\t}\n\
\t\t},\n\
\n\
\t\tset: function( elem, value, extra ) {\n\
\t\t\tvar styles = extra && getStyles( elem );\n\
\t\t\treturn setPositiveNumber( elem, value, extra ?\n\
\t\t\t\taugmentWidthOrHeight(\n\
\t\t\t\t\telem,\n\
\t\t\t\t\tname,\n\
\t\t\t\t\textra,\n\
\t\t\t\t\tjQuery.css( elem, \"boxSizing\", false, styles ) === \"border-box\",\n\
\t\t\t\t\tstyles\n\
\t\t\t\t) : 0\n\
\t\t\t);\n\
\t\t}\n\
\t};\n\
});\n\
\n\
// Support: Android 2.3\n\
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,\n\
\tfunction( elem, computed ) {\n\
\t\tif ( computed ) {\n\
\t\t\t// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right\n\
\t\t\t// Work around by temporarily setting element display to inline-block\n\
\t\t\treturn jQuery.swap( elem, { \"display\": \"inline-block\" },\n\
\t\t\t\tcurCSS, [ elem, \"marginRight\" ] );\n\
\t\t}\n\
\t}\n\
);\n\
\n\
// These hooks are used by animate to expand properties\n\
jQuery.each({\n\
\tmargin: \"\",\n\
\tpadding: \"\",\n\
\tborder: \"Width\"\n\
}, function( prefix, suffix ) {\n\
\tjQuery.cssHooks[ prefix + suffix ] = {\n\
\t\texpand: function( value ) {\n\
\t\t\tvar i = 0,\n\
\t\t\t\texpanded = {},\n\
\n\
\t\t\t\t// assumes a single number if not a string\n\
\t\t\t\tparts = typeof value === \"string\" ? value.split(\" \") : [ value ];\n\
\n\
\t\t\tfor ( ; i < 4; i++ ) {\n\
\t\t\t\texpanded[ prefix + cssExpand[ i ] + suffix ] =\n\
\t\t\t\t\tparts[ i ] || parts[ i - 2 ] || parts[ 0 ];\n\
\t\t\t}\n\
\n\
\t\t\treturn expanded;\n\
\t\t}\n\
\t};\n\
\n\
\tif ( !rmargin.test( prefix ) ) {\n\
\t\tjQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;\n\
\t}\n\
});\n\
\n\
jQuery.fn.extend({\n\
\tcss: function( name, value ) {\n\
\t\treturn access( this, function( elem, name, value ) {\n\
\t\t\tvar styles, len,\n\
\t\t\t\tmap = {},\n\
\t\t\t\ti = 0;\n\
\n\
\t\t\tif ( jQuery.isArray( name ) ) {\n\
\t\t\t\tstyles = getStyles( elem );\n\
\t\t\t\tlen = name.length;\n\
\n\
\t\t\t\tfor ( ; i < len; i++ ) {\n\
\t\t\t\t\tmap[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );\n\
\t\t\t\t}\n\
\n\
\t\t\t\treturn map;\n\
\t\t\t}\n\
\n\
\t\t\treturn value !== undefined ?\n\
\t\t\t\tjQuery.style( elem, name, value ) :\n\
\t\t\t\tjQuery.css( elem, name );\n\
\t\t}, name, value, arguments.length > 1 );\n\
\t},\n\
\tshow: function() {\n\
\t\treturn showHide( this, true );\n\
\t},\n\
\thide: function() {\n\
\t\treturn showHide( this );\n\
\t},\n\
\ttoggle: function( state ) {\n\
\t\tif ( typeof state === \"boolean\" ) {\n\
\t\t\treturn state ? this.show() : this.hide();\n\
\t\t}\n\
\n\
\t\treturn this.each(function() {\n\
\t\t\tif ( isHidden( this ) ) {\n\
\t\t\t\tjQuery( this ).show();\n\
\t\t\t} else {\n\
\t\t\t\tjQuery( this ).hide();\n\
\t\t\t}\n\
\t\t});\n\
\t}\n\
});\n\
\n\
\n\
function Tween( elem, options, prop, end, easing ) {\n\
\treturn new Tween.prototype.init( elem, options, prop, end, easing );\n\
}\n\
jQuery.Tween = Tween;\n\
\n\
Tween.prototype = {\n\
\tconstructor: Tween,\n\
\tinit: function( elem, options, prop, end, easing, unit ) {\n\
\t\tthis.elem = elem;\n\
\t\tthis.prop = prop;\n\
\t\tthis.easing = easing || \"swing\";\n\
\t\tthis.options = options;\n\
\t\tthis.start = this.now = this.cur();\n\
\t\tthis.end = end;\n\
\t\tthis.unit = unit || ( jQuery.cssNumber[ prop ] ? \"\" : \"px\" );\n\
\t},\n\
\tcur: function() {\n\
\t\tvar hooks = Tween.propHooks[ this.prop ];\n\
\n\
\t\treturn hooks && hooks.get ?\n\
\t\t\thooks.get( this ) :\n\
\t\t\tTween.propHooks._default.get( this );\n\
\t},\n\
\trun: function( percent ) {\n\
\t\tvar eased,\n\
\t\t\thooks = Tween.propHooks[ this.prop ];\n\
\n\
\t\tif ( this.options.duration ) {\n\
\t\t\tthis.pos = eased = jQuery.easing[ this.easing ](\n\
\t\t\t\tpercent, this.options.duration * percent, 0, 1, this.options.duration\n\
\t\t\t);\n\
\t\t} else {\n\
\t\t\tthis.pos = eased = percent;\n\
\t\t}\n\
\t\tthis.now = ( this.end - this.start ) * eased + this.start;\n\
\n\
\t\tif ( this.options.step ) {\n\
\t\t\tthis.options.step.call( this.elem, this.now, this );\n\
\t\t}\n\
\n\
\t\tif ( hooks && hooks.set ) {\n\
\t\t\thooks.set( this );\n\
\t\t} else {\n\
\t\t\tTween.propHooks._default.set( this );\n\
\t\t}\n\
\t\treturn this;\n\
\t}\n\
};\n\
\n\
Tween.prototype.init.prototype = Tween.prototype;\n\
\n\
Tween.propHooks = {\n\
\t_default: {\n\
\t\tget: function( tween ) {\n\
\t\t\tvar result;\n\
\n\
\t\t\tif ( tween.elem[ tween.prop ] != null &&\n\
\t\t\t\t(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {\n\
\t\t\t\treturn tween.elem[ tween.prop ];\n\
\t\t\t}\n\
\n\
\t\t\t// passing an empty string as a 3rd parameter to .css will automatically\n\
\t\t\t// attempt a parseFloat and fallback to a string if the parse fails\n\
\t\t\t// so, simple values such as \"10px\" are parsed to Float.\n\
\t\t\t// complex values such as \"rotate(1rad)\" are returned as is.\n\
\t\t\tresult = jQuery.css( tween.elem, tween.prop, \"\" );\n\
\t\t\t// Empty strings, null, undefined and \"auto\" are converted to 0.\n\
\t\t\treturn !result || result === \"auto\" ? 0 : result;\n\
\t\t},\n\
\t\tset: function( tween ) {\n\
\t\t\t// use step hook for back compat - use cssHook if its there - use .style if its\n\
\t\t\t// available and use plain properties where available\n\
\t\t\tif ( jQuery.fx.step[ tween.prop ] ) {\n\
\t\t\t\tjQuery.fx.step[ tween.prop ]( tween );\n\
\t\t\t} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {\n\
\t\t\t\tjQuery.style( tween.elem, tween.prop, tween.now + tween.unit );\n\
\t\t\t} else {\n\
\t\t\t\ttween.elem[ tween.prop ] = tween.now;\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
};\n\
\n\
// Support: IE9\n\
// Panic based approach to setting things on disconnected nodes\n\
\n\
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {\n\
\tset: function( tween ) {\n\
\t\tif ( tween.elem.nodeType && tween.elem.parentNode ) {\n\
\t\t\ttween.elem[ tween.prop ] = tween.now;\n\
\t\t}\n\
\t}\n\
};\n\
\n\
jQuery.easing = {\n\
\tlinear: function( p ) {\n\
\t\treturn p;\n\
\t},\n\
\tswing: function( p ) {\n\
\t\treturn 0.5 - Math.cos( p * Math.PI ) / 2;\n\
\t}\n\
};\n\
\n\
jQuery.fx = Tween.prototype.init;\n\
\n\
// Back Compat <1.8 extension point\n\
jQuery.fx.step = {};\n\
\n\
\n\
\n\
\n\
var\n\
\tfxNow, timerId,\n\
\trfxtypes = /^(?:toggle|show|hide)$/,\n\
\trfxnum = new RegExp( \"^(?:([+-])=|)(\" + pnum + \")([a-z%]*)$\", \"i\" ),\n\
\trrun = /queueHooks$/,\n\
\tanimationPrefilters = [ defaultPrefilter ],\n\
\ttweeners = {\n\
\t\t\"*\": [ function( prop, value ) {\n\
\t\t\tvar tween = this.createTween( prop, value ),\n\
\t\t\t\ttarget = tween.cur(),\n\
\t\t\t\tparts = rfxnum.exec( value ),\n\
\t\t\t\tunit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? \"\" : \"px\" ),\n\
\n\
\t\t\t\t// Starting value computation is required for potential unit mismatches\n\
\t\t\t\tstart = ( jQuery.cssNumber[ prop ] || unit !== \"px\" && +target ) &&\n\
\t\t\t\t\trfxnum.exec( jQuery.css( tween.elem, prop ) ),\n\
\t\t\t\tscale = 1,\n\
\t\t\t\tmaxIterations = 20;\n\
\n\
\t\t\tif ( start && start[ 3 ] !== unit ) {\n\
\t\t\t\t// Trust units reported by jQuery.css\n\
\t\t\t\tunit = unit || start[ 3 ];\n\
\n\
\t\t\t\t// Make sure we update the tween properties later on\n\
\t\t\t\tparts = parts || [];\n\
\n\
\t\t\t\t// Iteratively approximate from a nonzero starting point\n\
\t\t\t\tstart = +target || 1;\n\
\n\
\t\t\t\tdo {\n\
\t\t\t\t\t// If previous iteration zeroed out, double until we get *something*\n\
\t\t\t\t\t// Use a string for doubling factor so we don't accidentally see scale as unchanged below\n\
\t\t\t\t\tscale = scale || \".5\";\n\
\n\
\t\t\t\t\t// Adjust and apply\n\
\t\t\t\t\tstart = start / scale;\n\
\t\t\t\t\tjQuery.style( tween.elem, prop, start + unit );\n\
\n\
\t\t\t\t// Update scale, tolerating zero or NaN from tween.cur()\n\
\t\t\t\t// And breaking the loop if scale is unchanged or perfect, or if we've just had enough\n\
\t\t\t\t} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );\n\
\t\t\t}\n\
\n\
\t\t\t// Update tween properties\n\
\t\t\tif ( parts ) {\n\
\t\t\t\tstart = tween.start = +start || +target || 0;\n\
\t\t\t\ttween.unit = unit;\n\
\t\t\t\t// If a +=/-= token was provided, we're doing a relative animation\n\
\t\t\t\ttween.end = parts[ 1 ] ?\n\
\t\t\t\t\tstart + ( parts[ 1 ] + 1 ) * parts[ 2 ] :\n\
\t\t\t\t\t+parts[ 2 ];\n\
\t\t\t}\n\
\n\
\t\t\treturn tween;\n\
\t\t} ]\n\
\t};\n\
\n\
// Animations created synchronously will run synchronously\n\
function createFxNow() {\n\
\tsetTimeout(function() {\n\
\t\tfxNow = undefined;\n\
\t});\n\
\treturn ( fxNow = jQuery.now() );\n\
}\n\
\n\
// Generate parameters to create a standard animation\n\
function genFx( type, includeWidth ) {\n\
\tvar which,\n\
\t\ti = 0,\n\
\t\tattrs = { height: type };\n\
\n\
\t// if we include width, step value is 1 to do all cssExpand values,\n\
\t// if we don't include width, step value is 2 to skip over Left and Right\n\
\tincludeWidth = includeWidth ? 1 : 0;\n\
\tfor ( ; i < 4 ; i += 2 - includeWidth ) {\n\
\t\twhich = cssExpand[ i ];\n\
\t\tattrs[ \"margin\" + which ] = attrs[ \"padding\" + which ] = type;\n\
\t}\n\
\n\
\tif ( includeWidth ) {\n\
\t\tattrs.opacity = attrs.width = type;\n\
\t}\n\
\n\
\treturn attrs;\n\
}\n\
\n\
function createTween( value, prop, animation ) {\n\
\tvar tween,\n\
\t\tcollection = ( tweeners[ prop ] || [] ).concat( tweeners[ \"*\" ] ),\n\
\t\tindex = 0,\n\
\t\tlength = collection.length;\n\
\tfor ( ; index < length; index++ ) {\n\
\t\tif ( (tween = collection[ index ].call( animation, prop, value )) ) {\n\
\n\
\t\t\t// we're done with this property\n\
\t\t\treturn tween;\n\
\t\t}\n\
\t}\n\
}\n\
\n\
function defaultPrefilter( elem, props, opts ) {\n\
\t/* jshint validthis: true */\n\
\tvar prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,\n\
\t\tanim = this,\n\
\t\torig = {},\n\
\t\tstyle = elem.style,\n\
\t\thidden = elem.nodeType && isHidden( elem ),\n\
\t\tdataShow = data_priv.get( elem, \"fxshow\" );\n\
\n\
\t// handle queue: false promises\n\
\tif ( !opts.queue ) {\n\
\t\thooks = jQuery._queueHooks( elem, \"fx\" );\n\
\t\tif ( hooks.unqueued == null ) {\n\
\t\t\thooks.unqueued = 0;\n\
\t\t\toldfire = hooks.empty.fire;\n\
\t\t\thooks.empty.fire = function() {\n\
\t\t\t\tif ( !hooks.unqueued ) {\n\
\t\t\t\t\toldfire();\n\
\t\t\t\t}\n\
\t\t\t};\n\
\t\t}\n\
\t\thooks.unqueued++;\n\
\n\
\t\tanim.always(function() {\n\
\t\t\t// doing this makes sure that the complete handler will be called\n\
\t\t\t// before this completes\n\
\t\t\tanim.always(function() {\n\
\t\t\t\thooks.unqueued--;\n\
\t\t\t\tif ( !jQuery.queue( elem, \"fx\" ).length ) {\n\
\t\t\t\t\thooks.empty.fire();\n\
\t\t\t\t}\n\
\t\t\t});\n\
\t\t});\n\
\t}\n\
\n\
\t// height/width overflow pass\n\
\tif ( elem.nodeType === 1 && ( \"height\" in props || \"width\" in props ) ) {\n\
\t\t// Make sure that nothing sneaks out\n\
\t\t// Record all 3 overflow attributes because IE9-10 do not\n\
\t\t// change the overflow attribute when overflowX and\n\
\t\t// overflowY are set to the same value\n\
\t\topts.overflow = [ style.overflow, style.overflowX, style.overflowY ];\n\
\n\
\t\t// Set display property to inline-block for height/width\n\
\t\t// animations on inline elements that are having width/height animated\n\
\t\tdisplay = jQuery.css( elem, \"display\" );\n\
\n\
\t\t// Test default display if display is currently \"none\"\n\
\t\tcheckDisplay = display === \"none\" ?\n\
\t\t\tdata_priv.get( elem, \"olddisplay\" ) || defaultDisplay( elem.nodeName ) : display;\n\
\n\
\t\tif ( checkDisplay === \"inline\" && jQuery.css( elem, \"float\" ) === \"none\" ) {\n\
\t\t\tstyle.display = \"inline-block\";\n\
\t\t}\n\
\t}\n\
\n\
\tif ( opts.overflow ) {\n\
\t\tstyle.overflow = \"hidden\";\n\
\t\tanim.always(function() {\n\
\t\t\tstyle.overflow = opts.overflow[ 0 ];\n\
\t\t\tstyle.overflowX = opts.overflow[ 1 ];\n\
\t\t\tstyle.overflowY = opts.overflow[ 2 ];\n\
\t\t});\n\
\t}\n\
\n\
\t// show/hide pass\n\
\tfor ( prop in props ) {\n\
\t\tvalue = props[ prop ];\n\
\t\tif ( rfxtypes.exec( value ) ) {\n\
\t\t\tdelete props[ prop ];\n\
\t\t\ttoggle = toggle || value === \"toggle\";\n\
\t\t\tif ( value === ( hidden ? \"hide\" : \"show\" ) ) {\n\
\n\
\t\t\t\t// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden\n\
\t\t\t\tif ( value === \"show\" && dataShow && dataShow[ prop ] !== undefined ) {\n\
\t\t\t\t\thidden = true;\n\
\t\t\t\t} else {\n\
\t\t\t\t\tcontinue;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t\torig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );\n\
\n\
\t\t// Any non-fx value stops us from restoring the original display value\n\
\t\t} else {\n\
\t\t\tdisplay = undefined;\n\
\t\t}\n\
\t}\n\
\n\
\tif ( !jQuery.isEmptyObject( orig ) ) {\n\
\t\tif ( dataShow ) {\n\
\t\t\tif ( \"hidden\" in dataShow ) {\n\
\t\t\t\thidden = dataShow.hidden;\n\
\t\t\t}\n\
\t\t} else {\n\
\t\t\tdataShow = data_priv.access( elem, \"fxshow\", {} );\n\
\t\t}\n\
\n\
\t\t// store state if its toggle - enables .stop().toggle() to \"reverse\"\n\
\t\tif ( toggle ) {\n\
\t\t\tdataShow.hidden = !hidden;\n\
\t\t}\n\
\t\tif ( hidden ) {\n\
\t\t\tjQuery( elem ).show();\n\
\t\t} else {\n\
\t\t\tanim.done(function() {\n\
\t\t\t\tjQuery( elem ).hide();\n\
\t\t\t});\n\
\t\t}\n\
\t\tanim.done(function() {\n\
\t\t\tvar prop;\n\
\n\
\t\t\tdata_priv.remove( elem, \"fxshow\" );\n\
\t\t\tfor ( prop in orig ) {\n\
\t\t\t\tjQuery.style( elem, prop, orig[ prop ] );\n\
\t\t\t}\n\
\t\t});\n\
\t\tfor ( prop in orig ) {\n\
\t\t\ttween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );\n\
\n\
\t\t\tif ( !( prop in dataShow ) ) {\n\
\t\t\t\tdataShow[ prop ] = tween.start;\n\
\t\t\t\tif ( hidden ) {\n\
\t\t\t\t\ttween.end = tween.start;\n\
\t\t\t\t\ttween.start = prop === \"width\" || prop === \"height\" ? 1 : 0;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t// If this is a noop like .hide().hide(), restore an overwritten display value\n\
\t} else if ( (display === \"none\" ? defaultDisplay( elem.nodeName ) : display) === \"inline\" ) {\n\
\t\tstyle.display = display;\n\
\t}\n\
}\n\
\n\
function propFilter( props, specialEasing ) {\n\
\tvar index, name, easing, value, hooks;\n\
\n\
\t// camelCase, specialEasing and expand cssHook pass\n\
\tfor ( index in props ) {\n\
\t\tname = jQuery.camelCase( index );\n\
\t\teasing = specialEasing[ name ];\n\
\t\tvalue = props[ index ];\n\
\t\tif ( jQuery.isArray( value ) ) {\n\
\t\t\teasing = value[ 1 ];\n\
\t\t\tvalue = props[ index ] = value[ 0 ];\n\
\t\t}\n\
\n\
\t\tif ( index !== name ) {\n\
\t\t\tprops[ name ] = value;\n\
\t\t\tdelete props[ index ];\n\
\t\t}\n\
\n\
\t\thooks = jQuery.cssHooks[ name ];\n\
\t\tif ( hooks && \"expand\" in hooks ) {\n\
\t\t\tvalue = hooks.expand( value );\n\
\t\t\tdelete props[ name ];\n\
\n\
\t\t\t// not quite $.extend, this wont overwrite keys already present.\n\
\t\t\t// also - reusing 'index' from above because we have the correct \"name\"\n\
\t\t\tfor ( index in value ) {\n\
\t\t\t\tif ( !( index in props ) ) {\n\
\t\t\t\t\tprops[ index ] = value[ index ];\n\
\t\t\t\t\tspecialEasing[ index ] = easing;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t} else {\n\
\t\t\tspecialEasing[ name ] = easing;\n\
\t\t}\n\
\t}\n\
}\n\
\n\
function Animation( elem, properties, options ) {\n\
\tvar result,\n\
\t\tstopped,\n\
\t\tindex = 0,\n\
\t\tlength = animationPrefilters.length,\n\
\t\tdeferred = jQuery.Deferred().always( function() {\n\
\t\t\t// don't match elem in the :animated selector\n\
\t\t\tdelete tick.elem;\n\
\t\t}),\n\
\t\ttick = function() {\n\
\t\t\tif ( stopped ) {\n\
\t\t\t\treturn false;\n\
\t\t\t}\n\
\t\t\tvar currentTime = fxNow || createFxNow(),\n\
\t\t\t\tremaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),\n\
\t\t\t\t// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)\n\
\t\t\t\ttemp = remaining / animation.duration || 0,\n\
\t\t\t\tpercent = 1 - temp,\n\
\t\t\t\tindex = 0,\n\
\t\t\t\tlength = animation.tweens.length;\n\
\n\
\t\t\tfor ( ; index < length ; index++ ) {\n\
\t\t\t\tanimation.tweens[ index ].run( percent );\n\
\t\t\t}\n\
\n\
\t\t\tdeferred.notifyWith( elem, [ animation, percent, remaining ]);\n\
\n\
\t\t\tif ( percent < 1 && length ) {\n\
\t\t\t\treturn remaining;\n\
\t\t\t} else {\n\
\t\t\t\tdeferred.resolveWith( elem, [ animation ] );\n\
\t\t\t\treturn false;\n\
\t\t\t}\n\
\t\t},\n\
\t\tanimation = deferred.promise({\n\
\t\t\telem: elem,\n\
\t\t\tprops: jQuery.extend( {}, properties ),\n\
\t\t\topts: jQuery.extend( true, { specialEasing: {} }, options ),\n\
\t\t\toriginalProperties: properties,\n\
\t\t\toriginalOptions: options,\n\
\t\t\tstartTime: fxNow || createFxNow(),\n\
\t\t\tduration: options.duration,\n\
\t\t\ttweens: [],\n\
\t\t\tcreateTween: function( prop, end ) {\n\
\t\t\t\tvar tween = jQuery.Tween( elem, animation.opts, prop, end,\n\
\t\t\t\t\t\tanimation.opts.specialEasing[ prop ] || animation.opts.easing );\n\
\t\t\t\tanimation.tweens.push( tween );\n\
\t\t\t\treturn tween;\n\
\t\t\t},\n\
\t\t\tstop: function( gotoEnd ) {\n\
\t\t\t\tvar index = 0,\n\
\t\t\t\t\t// if we are going to the end, we want to run all the tweens\n\
\t\t\t\t\t// otherwise we skip this part\n\
\t\t\t\t\tlength = gotoEnd ? animation.tweens.length : 0;\n\
\t\t\t\tif ( stopped ) {\n\
\t\t\t\t\treturn this;\n\
\t\t\t\t}\n\
\t\t\t\tstopped = true;\n\
\t\t\t\tfor ( ; index < length ; index++ ) {\n\
\t\t\t\t\tanimation.tweens[ index ].run( 1 );\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// resolve when we played the last frame\n\
\t\t\t\t// otherwise, reject\n\
\t\t\t\tif ( gotoEnd ) {\n\
\t\t\t\t\tdeferred.resolveWith( elem, [ animation, gotoEnd ] );\n\
\t\t\t\t} else {\n\
\t\t\t\t\tdeferred.rejectWith( elem, [ animation, gotoEnd ] );\n\
\t\t\t\t}\n\
\t\t\t\treturn this;\n\
\t\t\t}\n\
\t\t}),\n\
\t\tprops = animation.props;\n\
\n\
\tpropFilter( props, animation.opts.specialEasing );\n\
\n\
\tfor ( ; index < length ; index++ ) {\n\
\t\tresult = animationPrefilters[ index ].call( animation, elem, props, animation.opts );\n\
\t\tif ( result ) {\n\
\t\t\treturn result;\n\
\t\t}\n\
\t}\n\
\n\
\tjQuery.map( props, createTween, animation );\n\
\n\
\tif ( jQuery.isFunction( animation.opts.start ) ) {\n\
\t\tanimation.opts.start.call( elem, animation );\n\
\t}\n\
\n\
\tjQuery.fx.timer(\n\
\t\tjQuery.extend( tick, {\n\
\t\t\telem: elem,\n\
\t\t\tanim: animation,\n\
\t\t\tqueue: animation.opts.queue\n\
\t\t})\n\
\t);\n\
\n\
\t// attach callbacks from options\n\
\treturn animation.progress( animation.opts.progress )\n\
\t\t.done( animation.opts.done, animation.opts.complete )\n\
\t\t.fail( animation.opts.fail )\n\
\t\t.always( animation.opts.always );\n\
}\n\
\n\
jQuery.Animation = jQuery.extend( Animation, {\n\
\n\
\ttweener: function( props, callback ) {\n\
\t\tif ( jQuery.isFunction( props ) ) {\n\
\t\t\tcallback = props;\n\
\t\t\tprops = [ \"*\" ];\n\
\t\t} else {\n\
\t\t\tprops = props.split(\" \");\n\
\t\t}\n\
\n\
\t\tvar prop,\n\
\t\t\tindex = 0,\n\
\t\t\tlength = props.length;\n\
\n\
\t\tfor ( ; index < length ; index++ ) {\n\
\t\t\tprop = props[ index ];\n\
\t\t\ttweeners[ prop ] = tweeners[ prop ] || [];\n\
\t\t\ttweeners[ prop ].unshift( callback );\n\
\t\t}\n\
\t},\n\
\n\
\tprefilter: function( callback, prepend ) {\n\
\t\tif ( prepend ) {\n\
\t\t\tanimationPrefilters.unshift( callback );\n\
\t\t} else {\n\
\t\t\tanimationPrefilters.push( callback );\n\
\t\t}\n\
\t}\n\
});\n\
\n\
jQuery.speed = function( speed, easing, fn ) {\n\
\tvar opt = speed && typeof speed === \"object\" ? jQuery.extend( {}, speed ) : {\n\
\t\tcomplete: fn || !fn && easing ||\n\
\t\t\tjQuery.isFunction( speed ) && speed,\n\
\t\tduration: speed,\n\
\t\teasing: fn && easing || easing && !jQuery.isFunction( easing ) && easing\n\
\t};\n\
\n\
\topt.duration = jQuery.fx.off ? 0 : typeof opt.duration === \"number\" ? opt.duration :\n\
\t\topt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;\n\
\n\
\t// normalize opt.queue - true/undefined/null -> \"fx\"\n\
\tif ( opt.queue == null || opt.queue === true ) {\n\
\t\topt.queue = \"fx\";\n\
\t}\n\
\n\
\t// Queueing\n\
\topt.old = opt.complete;\n\
\n\
\topt.complete = function() {\n\
\t\tif ( jQuery.isFunction( opt.old ) ) {\n\
\t\t\topt.old.call( this );\n\
\t\t}\n\
\n\
\t\tif ( opt.queue ) {\n\
\t\t\tjQuery.dequeue( this, opt.queue );\n\
\t\t}\n\
\t};\n\
\n\
\treturn opt;\n\
};\n\
\n\
jQuery.fn.extend({\n\
\tfadeTo: function( speed, to, easing, callback ) {\n\
\n\
\t\t// show any hidden elements after setting opacity to 0\n\
\t\treturn this.filter( isHidden ).css( \"opacity\", 0 ).show()\n\
\n\
\t\t\t// animate to the value specified\n\
\t\t\t.end().animate({ opacity: to }, speed, easing, callback );\n\
\t},\n\
\tanimate: function( prop, speed, easing, callback ) {\n\
\t\tvar empty = jQuery.isEmptyObject( prop ),\n\
\t\t\toptall = jQuery.speed( speed, easing, callback ),\n\
\t\t\tdoAnimation = function() {\n\
\t\t\t\t// Operate on a copy of prop so per-property easing won't be lost\n\
\t\t\t\tvar anim = Animation( this, jQuery.extend( {}, prop ), optall );\n\
\n\
\t\t\t\t// Empty animations, or finishing resolves immediately\n\
\t\t\t\tif ( empty || data_priv.get( this, \"finish\" ) ) {\n\
\t\t\t\t\tanim.stop( true );\n\
\t\t\t\t}\n\
\t\t\t};\n\
\t\t\tdoAnimation.finish = doAnimation;\n\
\n\
\t\treturn empty || optall.queue === false ?\n\
\t\t\tthis.each( doAnimation ) :\n\
\t\t\tthis.queue( optall.queue, doAnimation );\n\
\t},\n\
\tstop: function( type, clearQueue, gotoEnd ) {\n\
\t\tvar stopQueue = function( hooks ) {\n\
\t\t\tvar stop = hooks.stop;\n\
\t\t\tdelete hooks.stop;\n\
\t\t\tstop( gotoEnd );\n\
\t\t};\n\
\n\
\t\tif ( typeof type !== \"string\" ) {\n\
\t\t\tgotoEnd = clearQueue;\n\
\t\t\tclearQueue = type;\n\
\t\t\ttype = undefined;\n\
\t\t}\n\
\t\tif ( clearQueue && type !== false ) {\n\
\t\t\tthis.queue( type || \"fx\", [] );\n\
\t\t}\n\
\n\
\t\treturn this.each(function() {\n\
\t\t\tvar dequeue = true,\n\
\t\t\t\tindex = type != null && type + \"queueHooks\",\n\
\t\t\t\ttimers = jQuery.timers,\n\
\t\t\t\tdata = data_priv.get( this );\n\
\n\
\t\t\tif ( index ) {\n\
\t\t\t\tif ( data[ index ] && data[ index ].stop ) {\n\
\t\t\t\t\tstopQueue( data[ index ] );\n\
\t\t\t\t}\n\
\t\t\t} else {\n\
\t\t\t\tfor ( index in data ) {\n\
\t\t\t\t\tif ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {\n\
\t\t\t\t\t\tstopQueue( data[ index ] );\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\tfor ( index = timers.length; index--; ) {\n\
\t\t\t\tif ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {\n\
\t\t\t\t\ttimers[ index ].anim.stop( gotoEnd );\n\
\t\t\t\t\tdequeue = false;\n\
\t\t\t\t\ttimers.splice( index, 1 );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\t// start the next in the queue if the last step wasn't forced\n\
\t\t\t// timers currently will call their complete callbacks, which will dequeue\n\
\t\t\t// but only if they were gotoEnd\n\
\t\t\tif ( dequeue || !gotoEnd ) {\n\
\t\t\t\tjQuery.dequeue( this, type );\n\
\t\t\t}\n\
\t\t});\n\
\t},\n\
\tfinish: function( type ) {\n\
\t\tif ( type !== false ) {\n\
\t\t\ttype = type || \"fx\";\n\
\t\t}\n\
\t\treturn this.each(function() {\n\
\t\t\tvar index,\n\
\t\t\t\tdata = data_priv.get( this ),\n\
\t\t\t\tqueue = data[ type + \"queue\" ],\n\
\t\t\t\thooks = data[ type + \"queueHooks\" ],\n\
\t\t\t\ttimers = jQuery.timers,\n\
\t\t\t\tlength = queue ? queue.length : 0;\n\
\n\
\t\t\t// enable finishing flag on private data\n\
\t\t\tdata.finish = true;\n\
\n\
\t\t\t// empty the queue first\n\
\t\t\tjQuery.queue( this, type, [] );\n\
\n\
\t\t\tif ( hooks && hooks.stop ) {\n\
\t\t\t\thooks.stop.call( this, true );\n\
\t\t\t}\n\
\n\
\t\t\t// look for any active animations, and finish them\n\
\t\t\tfor ( index = timers.length; index--; ) {\n\
\t\t\t\tif ( timers[ index ].elem === this && timers[ index ].queue === type ) {\n\
\t\t\t\t\ttimers[ index ].anim.stop( true );\n\
\t\t\t\t\ttimers.splice( index, 1 );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\t// look for any animations in the old queue and finish them\n\
\t\t\tfor ( index = 0; index < length; index++ ) {\n\
\t\t\t\tif ( queue[ index ] && queue[ index ].finish ) {\n\
\t\t\t\t\tqueue[ index ].finish.call( this );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\t// turn off finishing flag\n\
\t\t\tdelete data.finish;\n\
\t\t});\n\
\t}\n\
});\n\
\n\
jQuery.each([ \"toggle\", \"show\", \"hide\" ], function( i, name ) {\n\
\tvar cssFn = jQuery.fn[ name ];\n\
\tjQuery.fn[ name ] = function( speed, easing, callback ) {\n\
\t\treturn speed == null || typeof speed === \"boolean\" ?\n\
\t\t\tcssFn.apply( this, arguments ) :\n\
\t\t\tthis.animate( genFx( name, true ), speed, easing, callback );\n\
\t};\n\
});\n\
\n\
// Generate shortcuts for custom animations\n\
jQuery.each({\n\
\tslideDown: genFx(\"show\"),\n\
\tslideUp: genFx(\"hide\"),\n\
\tslideToggle: genFx(\"toggle\"),\n\
\tfadeIn: { opacity: \"show\" },\n\
\tfadeOut: { opacity: \"hide\" },\n\
\tfadeToggle: { opacity: \"toggle\" }\n\
}, function( name, props ) {\n\
\tjQuery.fn[ name ] = function( speed, easing, callback ) {\n\
\t\treturn this.animate( props, speed, easing, callback );\n\
\t};\n\
});\n\
\n\
jQuery.timers = [];\n\
jQuery.fx.tick = function() {\n\
\tvar timer,\n\
\t\ti = 0,\n\
\t\ttimers = jQuery.timers;\n\
\n\
\tfxNow = jQuery.now();\n\
\n\
\tfor ( ; i < timers.length; i++ ) {\n\
\t\ttimer = timers[ i ];\n\
\t\t// Checks the timer has not already been removed\n\
\t\tif ( !timer() && timers[ i ] === timer ) {\n\
\t\t\ttimers.splice( i--, 1 );\n\
\t\t}\n\
\t}\n\
\n\
\tif ( !timers.length ) {\n\
\t\tjQuery.fx.stop();\n\
\t}\n\
\tfxNow = undefined;\n\
};\n\
\n\
jQuery.fx.timer = function( timer ) {\n\
\tjQuery.timers.push( timer );\n\
\tif ( timer() ) {\n\
\t\tjQuery.fx.start();\n\
\t} else {\n\
\t\tjQuery.timers.pop();\n\
\t}\n\
};\n\
\n\
jQuery.fx.interval = 13;\n\
\n\
jQuery.fx.start = function() {\n\
\tif ( !timerId ) {\n\
\t\ttimerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );\n\
\t}\n\
};\n\
\n\
jQuery.fx.stop = function() {\n\
\tclearInterval( timerId );\n\
\ttimerId = null;\n\
};\n\
\n\
jQuery.fx.speeds = {\n\
\tslow: 600,\n\
\tfast: 200,\n\
\t// Default speed\n\
\t_default: 400\n\
};\n\
\n\
\n\
// Based off of the plugin by Clint Helfers, with permission.\n\
// http://blindsignals.com/index.php/2009/07/jquery-delay/\n\
jQuery.fn.delay = function( time, type ) {\n\
\ttime = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;\n\
\ttype = type || \"fx\";\n\
\n\
\treturn this.queue( type, function( next, hooks ) {\n\
\t\tvar timeout = setTimeout( next, time );\n\
\t\thooks.stop = function() {\n\
\t\t\tclearTimeout( timeout );\n\
\t\t};\n\
\t});\n\
};\n\
\n\
\n\
(function() {\n\
\tvar input = document.createElement( \"input\" ),\n\
\t\tselect = document.createElement( \"select\" ),\n\
\t\topt = select.appendChild( document.createElement( \"option\" ) );\n\
\n\
\tinput.type = \"checkbox\";\n\
\n\
\t// Support: iOS 5.1, Android 4.x, Android 2.3\n\
\t// Check the default checkbox/radio value (\"\" on old WebKit; \"on\" elsewhere)\n\
\tsupport.checkOn = input.value !== \"\";\n\
\n\
\t// Must access the parent to make an option select properly\n\
\t// Support: IE9, IE10\n\
\tsupport.optSelected = opt.selected;\n\
\n\
\t// Make sure that the options inside disabled selects aren't marked as disabled\n\
\t// (WebKit marks them as disabled)\n\
\tselect.disabled = true;\n\
\tsupport.optDisabled = !opt.disabled;\n\
\n\
\t// Check if an input maintains its value after becoming a radio\n\
\t// Support: IE9, IE10\n\
\tinput = document.createElement( \"input\" );\n\
\tinput.value = \"t\";\n\
\tinput.type = \"radio\";\n\
\tsupport.radioValue = input.value === \"t\";\n\
})();\n\
\n\
\n\
var nodeHook, boolHook,\n\
\tattrHandle = jQuery.expr.attrHandle;\n\
\n\
jQuery.fn.extend({\n\
\tattr: function( name, value ) {\n\
\t\treturn access( this, jQuery.attr, name, value, arguments.length > 1 );\n\
\t},\n\
\n\
\tremoveAttr: function( name ) {\n\
\t\treturn this.each(function() {\n\
\t\t\tjQuery.removeAttr( this, name );\n\
\t\t});\n\
\t}\n\
});\n\
\n\
jQuery.extend({\n\
\tattr: function( elem, name, value ) {\n\
\t\tvar hooks, ret,\n\
\t\t\tnType = elem.nodeType;\n\
\n\
\t\t// don't get/set attributes on text, comment and attribute nodes\n\
\t\tif ( !elem || nType === 3 || nType === 8 || nType === 2 ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\t// Fallback to prop when attributes are not supported\n\
\t\tif ( typeof elem.getAttribute === strundefined ) {\n\
\t\t\treturn jQuery.prop( elem, name, value );\n\
\t\t}\n\
\n\
\t\t// All attributes are lowercase\n\
\t\t// Grab necessary hook if one is defined\n\
\t\tif ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {\n\
\t\t\tname = name.toLowerCase();\n\
\t\t\thooks = jQuery.attrHooks[ name ] ||\n\
\t\t\t\t( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );\n\
\t\t}\n\
\n\
\t\tif ( value !== undefined ) {\n\
\n\
\t\t\tif ( value === null ) {\n\
\t\t\t\tjQuery.removeAttr( elem, name );\n\
\n\
\t\t\t} else if ( hooks && \"set\" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {\n\
\t\t\t\treturn ret;\n\
\n\
\t\t\t} else {\n\
\t\t\t\telem.setAttribute( name, value + \"\" );\n\
\t\t\t\treturn value;\n\
\t\t\t}\n\
\n\
\t\t} else if ( hooks && \"get\" in hooks && (ret = hooks.get( elem, name )) !== null ) {\n\
\t\t\treturn ret;\n\
\n\
\t\t} else {\n\
\t\t\tret = jQuery.find.attr( elem, name );\n\
\n\
\t\t\t// Non-existent attributes return null, we normalize to undefined\n\
\t\t\treturn ret == null ?\n\
\t\t\t\tundefined :\n\
\t\t\t\tret;\n\
\t\t}\n\
\t},\n\
\n\
\tremoveAttr: function( elem, value ) {\n\
\t\tvar name, propName,\n\
\t\t\ti = 0,\n\
\t\t\tattrNames = value && value.match( rnotwhite );\n\
\n\
\t\tif ( attrNames && elem.nodeType === 1 ) {\n\
\t\t\twhile ( (name = attrNames[i++]) ) {\n\
\t\t\t\tpropName = jQuery.propFix[ name ] || name;\n\
\n\
\t\t\t\t// Boolean attributes get special treatment (#10870)\n\
\t\t\t\tif ( jQuery.expr.match.bool.test( name ) ) {\n\
\t\t\t\t\t// Set corresponding property to false\n\
\t\t\t\t\telem[ propName ] = false;\n\
\t\t\t\t}\n\
\n\
\t\t\t\telem.removeAttribute( name );\n\
\t\t\t}\n\
\t\t}\n\
\t},\n\
\n\
\tattrHooks: {\n\
\t\ttype: {\n\
\t\t\tset: function( elem, value ) {\n\
\t\t\t\tif ( !support.radioValue && value === \"radio\" &&\n\
\t\t\t\t\tjQuery.nodeName( elem, \"input\" ) ) {\n\
\t\t\t\t\t// Setting the type on a radio button after the value resets the value in IE6-9\n\
\t\t\t\t\t// Reset value to default in case type is set after value during creation\n\
\t\t\t\t\tvar val = elem.value;\n\
\t\t\t\t\telem.setAttribute( \"type\", value );\n\
\t\t\t\t\tif ( val ) {\n\
\t\t\t\t\t\telem.value = val;\n\
\t\t\t\t\t}\n\
\t\t\t\t\treturn value;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
});\n\
\n\
// Hooks for boolean attributes\n\
boolHook = {\n\
\tset: function( elem, value, name ) {\n\
\t\tif ( value === false ) {\n\
\t\t\t// Remove boolean attributes when set to false\n\
\t\t\tjQuery.removeAttr( elem, name );\n\
\t\t} else {\n\
\t\t\telem.setAttribute( name, name );\n\
\t\t}\n\
\t\treturn name;\n\
\t}\n\
};\n\
jQuery.each( jQuery.expr.match.bool.source.match( /\\w+/g ), function( i, name ) {\n\
\tvar getter = attrHandle[ name ] || jQuery.find.attr;\n\
\n\
\tattrHandle[ name ] = function( elem, name, isXML ) {\n\
\t\tvar ret, handle;\n\
\t\tif ( !isXML ) {\n\
\t\t\t// Avoid an infinite loop by temporarily removing this function from the getter\n\
\t\t\thandle = attrHandle[ name ];\n\
\t\t\tattrHandle[ name ] = ret;\n\
\t\t\tret = getter( elem, name, isXML ) != null ?\n\
\t\t\t\tname.toLowerCase() :\n\
\t\t\t\tnull;\n\
\t\t\tattrHandle[ name ] = handle;\n\
\t\t}\n\
\t\treturn ret;\n\
\t};\n\
});\n\
\n\
\n\
\n\
\n\
var rfocusable = /^(?:input|select|textarea|button)$/i;\n\
\n\
jQuery.fn.extend({\n\
\tprop: function( name, value ) {\n\
\t\treturn access( this, jQuery.prop, name, value, arguments.length > 1 );\n\
\t},\n\
\n\
\tremoveProp: function( name ) {\n\
\t\treturn this.each(function() {\n\
\t\t\tdelete this[ jQuery.propFix[ name ] || name ];\n\
\t\t});\n\
\t}\n\
});\n\
\n\
jQuery.extend({\n\
\tpropFix: {\n\
\t\t\"for\": \"htmlFor\",\n\
\t\t\"class\": \"className\"\n\
\t},\n\
\n\
\tprop: function( elem, name, value ) {\n\
\t\tvar ret, hooks, notxml,\n\
\t\t\tnType = elem.nodeType;\n\
\n\
\t\t// don't get/set properties on text, comment and attribute nodes\n\
\t\tif ( !elem || nType === 3 || nType === 8 || nType === 2 ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\tnotxml = nType !== 1 || !jQuery.isXMLDoc( elem );\n\
\n\
\t\tif ( notxml ) {\n\
\t\t\t// Fix name and attach hooks\n\
\t\t\tname = jQuery.propFix[ name ] || name;\n\
\t\t\thooks = jQuery.propHooks[ name ];\n\
\t\t}\n\
\n\
\t\tif ( value !== undefined ) {\n\
\t\t\treturn hooks && \"set\" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?\n\
\t\t\t\tret :\n\
\t\t\t\t( elem[ name ] = value );\n\
\n\
\t\t} else {\n\
\t\t\treturn hooks && \"get\" in hooks && (ret = hooks.get( elem, name )) !== null ?\n\
\t\t\t\tret :\n\
\t\t\t\telem[ name ];\n\
\t\t}\n\
\t},\n\
\n\
\tpropHooks: {\n\
\t\ttabIndex: {\n\
\t\t\tget: function( elem ) {\n\
\t\t\t\treturn elem.hasAttribute( \"tabindex\" ) || rfocusable.test( elem.nodeName ) || elem.href ?\n\
\t\t\t\t\telem.tabIndex :\n\
\t\t\t\t\t-1;\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
});\n\
\n\
// Support: IE9+\n\
// Selectedness for an option in an optgroup can be inaccurate\n\
if ( !support.optSelected ) {\n\
\tjQuery.propHooks.selected = {\n\
\t\tget: function( elem ) {\n\
\t\t\tvar parent = elem.parentNode;\n\
\t\t\tif ( parent && parent.parentNode ) {\n\
\t\t\t\tparent.parentNode.selectedIndex;\n\
\t\t\t}\n\
\t\t\treturn null;\n\
\t\t}\n\
\t};\n\
}\n\
\n\
jQuery.each([\n\
\t\"tabIndex\",\n\
\t\"readOnly\",\n\
\t\"maxLength\",\n\
\t\"cellSpacing\",\n\
\t\"cellPadding\",\n\
\t\"rowSpan\",\n\
\t\"colSpan\",\n\
\t\"useMap\",\n\
\t\"frameBorder\",\n\
\t\"contentEditable\"\n\
], function() {\n\
\tjQuery.propFix[ this.toLowerCase() ] = this;\n\
});\n\
\n\
\n\
\n\
\n\
var rclass = /[\\t\\r\\n\
\\f]/g;\n\
\n\
jQuery.fn.extend({\n\
\taddClass: function( value ) {\n\
\t\tvar classes, elem, cur, clazz, j, finalValue,\n\
\t\t\tproceed = typeof value === \"string\" && value,\n\
\t\t\ti = 0,\n\
\t\t\tlen = this.length;\n\
\n\
\t\tif ( jQuery.isFunction( value ) ) {\n\
\t\t\treturn this.each(function( j ) {\n\
\t\t\t\tjQuery( this ).addClass( value.call( this, j, this.className ) );\n\
\t\t\t});\n\
\t\t}\n\
\n\
\t\tif ( proceed ) {\n\
\t\t\t// The disjunction here is for better compressibility (see removeClass)\n\
\t\t\tclasses = ( value || \"\" ).match( rnotwhite ) || [];\n\
\n\
\t\t\tfor ( ; i < len; i++ ) {\n\
\t\t\t\telem = this[ i ];\n\
\t\t\t\tcur = elem.nodeType === 1 && ( elem.className ?\n\
\t\t\t\t\t( \" \" + elem.className + \" \" ).replace( rclass, \" \" ) :\n\
\t\t\t\t\t\" \"\n\
\t\t\t\t);\n\
\n\
\t\t\t\tif ( cur ) {\n\
\t\t\t\t\tj = 0;\n\
\t\t\t\t\twhile ( (clazz = classes[j++]) ) {\n\
\t\t\t\t\t\tif ( cur.indexOf( \" \" + clazz + \" \" ) < 0 ) {\n\
\t\t\t\t\t\t\tcur += clazz + \" \";\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// only assign if different to avoid unneeded rendering.\n\
\t\t\t\t\tfinalValue = jQuery.trim( cur );\n\
\t\t\t\t\tif ( elem.className !== finalValue ) {\n\
\t\t\t\t\t\telem.className = finalValue;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\t},\n\
\n\
\tremoveClass: function( value ) {\n\
\t\tvar classes, elem, cur, clazz, j, finalValue,\n\
\t\t\tproceed = arguments.length === 0 || typeof value === \"string\" && value,\n\
\t\t\ti = 0,\n\
\t\t\tlen = this.length;\n\
\n\
\t\tif ( jQuery.isFunction( value ) ) {\n\
\t\t\treturn this.each(function( j ) {\n\
\t\t\t\tjQuery( this ).removeClass( value.call( this, j, this.className ) );\n\
\t\t\t});\n\
\t\t}\n\
\t\tif ( proceed ) {\n\
\t\t\tclasses = ( value || \"\" ).match( rnotwhite ) || [];\n\
\n\
\t\t\tfor ( ; i < len; i++ ) {\n\
\t\t\t\telem = this[ i ];\n\
\t\t\t\t// This expression is here for better compressibility (see addClass)\n\
\t\t\t\tcur = elem.nodeType === 1 && ( elem.className ?\n\
\t\t\t\t\t( \" \" + elem.className + \" \" ).replace( rclass, \" \" ) :\n\
\t\t\t\t\t\"\"\n\
\t\t\t\t);\n\
\n\
\t\t\t\tif ( cur ) {\n\
\t\t\t\t\tj = 0;\n\
\t\t\t\t\twhile ( (clazz = classes[j++]) ) {\n\
\t\t\t\t\t\t// Remove *all* instances\n\
\t\t\t\t\t\twhile ( cur.indexOf( \" \" + clazz + \" \" ) >= 0 ) {\n\
\t\t\t\t\t\t\tcur = cur.replace( \" \" + clazz + \" \", \" \" );\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\n\
\t\t\t\t\t// only assign if different to avoid unneeded rendering.\n\
\t\t\t\t\tfinalValue = value ? jQuery.trim( cur ) : \"\";\n\
\t\t\t\t\tif ( elem.className !== finalValue ) {\n\
\t\t\t\t\t\telem.className = finalValue;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\t},\n\
\n\
\ttoggleClass: function( value, stateVal ) {\n\
\t\tvar type = typeof value;\n\
\n\
\t\tif ( typeof stateVal === \"boolean\" && type === \"string\" ) {\n\
\t\t\treturn stateVal ? this.addClass( value ) : this.removeClass( value );\n\
\t\t}\n\
\n\
\t\tif ( jQuery.isFunction( value ) ) {\n\
\t\t\treturn this.each(function( i ) {\n\
\t\t\t\tjQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );\n\
\t\t\t});\n\
\t\t}\n\
\n\
\t\treturn this.each(function() {\n\
\t\t\tif ( type === \"string\" ) {\n\
\t\t\t\t// toggle individual class names\n\
\t\t\t\tvar className,\n\
\t\t\t\t\ti = 0,\n\
\t\t\t\t\tself = jQuery( this ),\n\
\t\t\t\t\tclassNames = value.match( rnotwhite ) || [];\n\
\n\
\t\t\t\twhile ( (className = classNames[ i++ ]) ) {\n\
\t\t\t\t\t// check each className given, space separated list\n\
\t\t\t\t\tif ( self.hasClass( className ) ) {\n\
\t\t\t\t\t\tself.removeClass( className );\n\
\t\t\t\t\t} else {\n\
\t\t\t\t\t\tself.addClass( className );\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\n\
\t\t\t// Toggle whole class name\n\
\t\t\t} else if ( type === strundefined || type === \"boolean\" ) {\n\
\t\t\t\tif ( this.className ) {\n\
\t\t\t\t\t// store className if set\n\
\t\t\t\t\tdata_priv.set( this, \"__className__\", this.className );\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// If the element has a class name or if we're passed \"false\",\n\
\t\t\t\t// then remove the whole classname (if there was one, the above saved it).\n\
\t\t\t\t// Otherwise bring back whatever was previously saved (if anything),\n\
\t\t\t\t// falling back to the empty string if nothing was stored.\n\
\t\t\t\tthis.className = this.className || value === false ? \"\" : data_priv.get( this, \"__className__\" ) || \"\";\n\
\t\t\t}\n\
\t\t});\n\
\t},\n\
\n\
\thasClass: function( selector ) {\n\
\t\tvar className = \" \" + selector + \" \",\n\
\t\t\ti = 0,\n\
\t\t\tl = this.length;\n\
\t\tfor ( ; i < l; i++ ) {\n\
\t\t\tif ( this[i].nodeType === 1 && (\" \" + this[i].className + \" \").replace(rclass, \" \").indexOf( className ) >= 0 ) {\n\
\t\t\t\treturn true;\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn false;\n\
\t}\n\
});\n\
\n\
\n\
\n\
\n\
var rreturn = /\\r/g;\n\
\n\
jQuery.fn.extend({\n\
\tval: function( value ) {\n\
\t\tvar hooks, ret, isFunction,\n\
\t\t\telem = this[0];\n\
\n\
\t\tif ( !arguments.length ) {\n\
\t\t\tif ( elem ) {\n\
\t\t\t\thooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];\n\
\n\
\t\t\t\tif ( hooks && \"get\" in hooks && (ret = hooks.get( elem, \"value\" )) !== undefined ) {\n\
\t\t\t\t\treturn ret;\n\
\t\t\t\t}\n\
\n\
\t\t\t\tret = elem.value;\n\
\n\
\t\t\t\treturn typeof ret === \"string\" ?\n\
\t\t\t\t\t// handle most common string cases\n\
\t\t\t\t\tret.replace(rreturn, \"\") :\n\
\t\t\t\t\t// handle cases where value is null/undef or number\n\
\t\t\t\t\tret == null ? \"\" : ret;\n\
\t\t\t}\n\
\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\tisFunction = jQuery.isFunction( value );\n\
\n\
\t\treturn this.each(function( i ) {\n\
\t\t\tvar val;\n\
\n\
\t\t\tif ( this.nodeType !== 1 ) {\n\
\t\t\t\treturn;\n\
\t\t\t}\n\
\n\
\t\t\tif ( isFunction ) {\n\
\t\t\t\tval = value.call( this, i, jQuery( this ).val() );\n\
\t\t\t} else {\n\
\t\t\t\tval = value;\n\
\t\t\t}\n\
\n\
\t\t\t// Treat null/undefined as \"\"; convert numbers to string\n\
\t\t\tif ( val == null ) {\n\
\t\t\t\tval = \"\";\n\
\n\
\t\t\t} else if ( typeof val === \"number\" ) {\n\
\t\t\t\tval += \"\";\n\
\n\
\t\t\t} else if ( jQuery.isArray( val ) ) {\n\
\t\t\t\tval = jQuery.map( val, function( value ) {\n\
\t\t\t\t\treturn value == null ? \"\" : value + \"\";\n\
\t\t\t\t});\n\
\t\t\t}\n\
\n\
\t\t\thooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];\n\
\n\
\t\t\t// If set returns undefined, fall back to normal setting\n\
\t\t\tif ( !hooks || !(\"set\" in hooks) || hooks.set( this, val, \"value\" ) === undefined ) {\n\
\t\t\t\tthis.value = val;\n\
\t\t\t}\n\
\t\t});\n\
\t}\n\
});\n\
\n\
jQuery.extend({\n\
\tvalHooks: {\n\
\t\toption: {\n\
\t\t\tget: function( elem ) {\n\
\t\t\t\tvar val = jQuery.find.attr( elem, \"value\" );\n\
\t\t\t\treturn val != null ?\n\
\t\t\t\t\tval :\n\
\t\t\t\t\t// Support: IE10-11+\n\
\t\t\t\t\t// option.text throws exceptions (#14686, #14858)\n\
\t\t\t\t\tjQuery.trim( jQuery.text( elem ) );\n\
\t\t\t}\n\
\t\t},\n\
\t\tselect: {\n\
\t\t\tget: function( elem ) {\n\
\t\t\t\tvar value, option,\n\
\t\t\t\t\toptions = elem.options,\n\
\t\t\t\t\tindex = elem.selectedIndex,\n\
\t\t\t\t\tone = elem.type === \"select-one\" || index < 0,\n\
\t\t\t\t\tvalues = one ? null : [],\n\
\t\t\t\t\tmax = one ? index + 1 : options.length,\n\
\t\t\t\t\ti = index < 0 ?\n\
\t\t\t\t\t\tmax :\n\
\t\t\t\t\t\tone ? index : 0;\n\
\n\
\t\t\t\t// Loop through all the selected options\n\
\t\t\t\tfor ( ; i < max; i++ ) {\n\
\t\t\t\t\toption = options[ i ];\n\
\n\
\t\t\t\t\t// IE6-9 doesn't update selected after form reset (#2551)\n\
\t\t\t\t\tif ( ( option.selected || i === index ) &&\n\
\t\t\t\t\t\t\t// Don't return options that are disabled or in a disabled optgroup\n\
\t\t\t\t\t\t\t( support.optDisabled ? !option.disabled : option.getAttribute( \"disabled\" ) === null ) &&\n\
\t\t\t\t\t\t\t( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, \"optgroup\" ) ) ) {\n\
\n\
\t\t\t\t\t\t// Get the specific value for the option\n\
\t\t\t\t\t\tvalue = jQuery( option ).val();\n\
\n\
\t\t\t\t\t\t// We don't need an array for one selects\n\
\t\t\t\t\t\tif ( one ) {\n\
\t\t\t\t\t\t\treturn value;\n\
\t\t\t\t\t\t}\n\
\n\
\t\t\t\t\t\t// Multi-Selects return an array\n\
\t\t\t\t\t\tvalues.push( value );\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\n\
\t\t\t\treturn values;\n\
\t\t\t},\n\
\n\
\t\t\tset: function( elem, value ) {\n\
\t\t\t\tvar optionSet, option,\n\
\t\t\t\t\toptions = elem.options,\n\
\t\t\t\t\tvalues = jQuery.makeArray( value ),\n\
\t\t\t\t\ti = options.length;\n\
\n\
\t\t\t\twhile ( i-- ) {\n\
\t\t\t\t\toption = options[ i ];\n\
\t\t\t\t\tif ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {\n\
\t\t\t\t\t\toptionSet = true;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// force browsers to behave consistently when non-matching value is set\n\
\t\t\t\tif ( !optionSet ) {\n\
\t\t\t\t\telem.selectedIndex = -1;\n\
\t\t\t\t}\n\
\t\t\t\treturn values;\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
});\n\
\n\
// Radios and checkboxes getter/setter\n\
jQuery.each([ \"radio\", \"checkbox\" ], function() {\n\
\tjQuery.valHooks[ this ] = {\n\
\t\tset: function( elem, value ) {\n\
\t\t\tif ( jQuery.isArray( value ) ) {\n\
\t\t\t\treturn ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );\n\
\t\t\t}\n\
\t\t}\n\
\t};\n\
\tif ( !support.checkOn ) {\n\
\t\tjQuery.valHooks[ this ].get = function( elem ) {\n\
\t\t\t// Support: Webkit\n\
\t\t\t// \"\" is returned instead of \"on\" if a value isn't specified\n\
\t\t\treturn elem.getAttribute(\"value\") === null ? \"on\" : elem.value;\n\
\t\t};\n\
\t}\n\
});\n\
\n\
\n\
\n\
\n\
// Return jQuery for attributes-only inclusion\n\
\n\
\n\
jQuery.each( (\"blur focus focusin focusout load resize scroll unload click dblclick \" +\n\
\t\"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave \" +\n\
\t\"change select submit keydown keypress keyup error contextmenu\").split(\" \"), function( i, name ) {\n\
\n\
\t// Handle event binding\n\
\tjQuery.fn[ name ] = function( data, fn ) {\n\
\t\treturn arguments.length > 0 ?\n\
\t\t\tthis.on( name, null, data, fn ) :\n\
\t\t\tthis.trigger( name );\n\
\t};\n\
});\n\
\n\
jQuery.fn.extend({\n\
\thover: function( fnOver, fnOut ) {\n\
\t\treturn this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );\n\
\t},\n\
\n\
\tbind: function( types, data, fn ) {\n\
\t\treturn this.on( types, null, data, fn );\n\
\t},\n\
\tunbind: function( types, fn ) {\n\
\t\treturn this.off( types, null, fn );\n\
\t},\n\
\n\
\tdelegate: function( selector, types, data, fn ) {\n\
\t\treturn this.on( types, selector, data, fn );\n\
\t},\n\
\tundelegate: function( selector, types, fn ) {\n\
\t\t// ( namespace ) or ( selector, types [, fn] )\n\
\t\treturn arguments.length === 1 ? this.off( selector, \"**\" ) : this.off( types, selector || \"**\", fn );\n\
\t}\n\
});\n\
\n\
\n\
var nonce = jQuery.now();\n\
\n\
var rquery = (/\\?/);\n\
\n\
\n\
\n\
// Support: Android 2.3\n\
// Workaround failure to string-cast null input\n\
jQuery.parseJSON = function( data ) {\n\
\treturn JSON.parse( data + \"\" );\n\
};\n\
\n\
\n\
// Cross-browser xml parsing\n\
jQuery.parseXML = function( data ) {\n\
\tvar xml, tmp;\n\
\tif ( !data || typeof data !== \"string\" ) {\n\
\t\treturn null;\n\
\t}\n\
\n\
\t// Support: IE9\n\
\ttry {\n\
\t\ttmp = new DOMParser();\n\
\t\txml = tmp.parseFromString( data, \"text/xml\" );\n\
\t} catch ( e ) {\n\
\t\txml = undefined;\n\
\t}\n\
\n\
\tif ( !xml || xml.getElementsByTagName( \"parsererror\" ).length ) {\n\
\t\tjQuery.error( \"Invalid XML: \" + data );\n\
\t}\n\
\treturn xml;\n\
};\n\
\n\
\n\
var\n\
\t// Document location\n\
\tajaxLocParts,\n\
\tajaxLocation,\n\
\n\
\trhash = /#.*$/,\n\
\trts = /([?&])_=[^&]*/,\n\
\trheaders = /^(.*?):[ \\t]*([^\\r\\n\
]*)$/mg,\n\
\t// #7653, #8125, #8152: local protocol detection\n\
\trlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,\n\
\trnoContent = /^(?:GET|HEAD)$/,\n\
\trprotocol = /^\\/\\//,\n\
\trurl = /^([\\w.+-]+:)(?:\\/\\/(?:[^\\/?#]*@|)([^\\/?#:]*)(?::(\\d+)|)|)/,\n\
\n\
\t/* Prefilters\n\
\t * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)\n\
\t * 2) These are called:\n\
\t *    - BEFORE asking for a transport\n\
\t *    - AFTER param serialization (s.data is a string if s.processData is true)\n\
\t * 3) key is the dataType\n\
\t * 4) the catchall symbol \"*\" can be used\n\
\t * 5) execution will start with transport dataType and THEN continue down to \"*\" if needed\n\
\t */\n\
\tprefilters = {},\n\
\n\
\t/* Transports bindings\n\
\t * 1) key is the dataType\n\
\t * 2) the catchall symbol \"*\" can be used\n\
\t * 3) selection will start with transport dataType and THEN go to \"*\" if needed\n\
\t */\n\
\ttransports = {},\n\
\n\
\t// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression\n\
\tallTypes = \"*/\".concat(\"*\");\n\
\n\
// #8138, IE may throw an exception when accessing\n\
// a field from window.location if document.domain has been set\n\
try {\n\
\tajaxLocation = location.href;\n\
} catch( e ) {\n\
\t// Use the href attribute of an A element\n\
\t// since IE will modify it given document.location\n\
\tajaxLocation = document.createElement( \"a\" );\n\
\tajaxLocation.href = \"\";\n\
\tajaxLocation = ajaxLocation.href;\n\
}\n\
\n\
// Segment location into parts\n\
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];\n\
\n\
// Base \"constructor\" for jQuery.ajaxPrefilter and jQuery.ajaxTransport\n\
function addToPrefiltersOrTransports( structure ) {\n\
\n\
\t// dataTypeExpression is optional and defaults to \"*\"\n\
\treturn function( dataTypeExpression, func ) {\n\
\n\
\t\tif ( typeof dataTypeExpression !== \"string\" ) {\n\
\t\t\tfunc = dataTypeExpression;\n\
\t\t\tdataTypeExpression = \"*\";\n\
\t\t}\n\
\n\
\t\tvar dataType,\n\
\t\t\ti = 0,\n\
\t\t\tdataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];\n\
\n\
\t\tif ( jQuery.isFunction( func ) ) {\n\
\t\t\t// For each dataType in the dataTypeExpression\n\
\t\t\twhile ( (dataType = dataTypes[i++]) ) {\n\
\t\t\t\t// Prepend if requested\n\
\t\t\t\tif ( dataType[0] === \"+\" ) {\n\
\t\t\t\t\tdataType = dataType.slice( 1 ) || \"*\";\n\
\t\t\t\t\t(structure[ dataType ] = structure[ dataType ] || []).unshift( func );\n\
\n\
\t\t\t\t// Otherwise append\n\
\t\t\t\t} else {\n\
\t\t\t\t\t(structure[ dataType ] = structure[ dataType ] || []).push( func );\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t};\n\
}\n\
\n\
// Base inspection function for prefilters and transports\n\
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {\n\
\n\
\tvar inspected = {},\n\
\t\tseekingTransport = ( structure === transports );\n\
\n\
\tfunction inspect( dataType ) {\n\
\t\tvar selected;\n\
\t\tinspected[ dataType ] = true;\n\
\t\tjQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {\n\
\t\t\tvar dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );\n\
\t\t\tif ( typeof dataTypeOrTransport === \"string\" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {\n\
\t\t\t\toptions.dataTypes.unshift( dataTypeOrTransport );\n\
\t\t\t\tinspect( dataTypeOrTransport );\n\
\t\t\t\treturn false;\n\
\t\t\t} else if ( seekingTransport ) {\n\
\t\t\t\treturn !( selected = dataTypeOrTransport );\n\
\t\t\t}\n\
\t\t});\n\
\t\treturn selected;\n\
\t}\n\
\n\
\treturn inspect( options.dataTypes[ 0 ] ) || !inspected[ \"*\" ] && inspect( \"*\" );\n\
}\n\
\n\
// A special extend for ajax options\n\
// that takes \"flat\" options (not to be deep extended)\n\
// Fixes #9887\n\
function ajaxExtend( target, src ) {\n\
\tvar key, deep,\n\
\t\tflatOptions = jQuery.ajaxSettings.flatOptions || {};\n\
\n\
\tfor ( key in src ) {\n\
\t\tif ( src[ key ] !== undefined ) {\n\
\t\t\t( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];\n\
\t\t}\n\
\t}\n\
\tif ( deep ) {\n\
\t\tjQuery.extend( true, target, deep );\n\
\t}\n\
\n\
\treturn target;\n\
}\n\
\n\
/* Handles responses to an ajax request:\n\
 * - finds the right dataType (mediates between content-type and expected dataType)\n\
 * - returns the corresponding response\n\
 */\n\
function ajaxHandleResponses( s, jqXHR, responses ) {\n\
\n\
\tvar ct, type, finalDataType, firstDataType,\n\
\t\tcontents = s.contents,\n\
\t\tdataTypes = s.dataTypes;\n\
\n\
\t// Remove auto dataType and get content-type in the process\n\
\twhile ( dataTypes[ 0 ] === \"*\" ) {\n\
\t\tdataTypes.shift();\n\
\t\tif ( ct === undefined ) {\n\
\t\t\tct = s.mimeType || jqXHR.getResponseHeader(\"Content-Type\");\n\
\t\t}\n\
\t}\n\
\n\
\t// Check if we're dealing with a known content-type\n\
\tif ( ct ) {\n\
\t\tfor ( type in contents ) {\n\
\t\t\tif ( contents[ type ] && contents[ type ].test( ct ) ) {\n\
\t\t\t\tdataTypes.unshift( type );\n\
\t\t\t\tbreak;\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\t// Check to see if we have a response for the expected dataType\n\
\tif ( dataTypes[ 0 ] in responses ) {\n\
\t\tfinalDataType = dataTypes[ 0 ];\n\
\t} else {\n\
\t\t// Try convertible dataTypes\n\
\t\tfor ( type in responses ) {\n\
\t\t\tif ( !dataTypes[ 0 ] || s.converters[ type + \" \" + dataTypes[0] ] ) {\n\
\t\t\t\tfinalDataType = type;\n\
\t\t\t\tbreak;\n\
\t\t\t}\n\
\t\t\tif ( !firstDataType ) {\n\
\t\t\t\tfirstDataType = type;\n\
\t\t\t}\n\
\t\t}\n\
\t\t// Or just use first one\n\
\t\tfinalDataType = finalDataType || firstDataType;\n\
\t}\n\
\n\
\t// If we found a dataType\n\
\t// We add the dataType to the list if needed\n\
\t// and return the corresponding response\n\
\tif ( finalDataType ) {\n\
\t\tif ( finalDataType !== dataTypes[ 0 ] ) {\n\
\t\t\tdataTypes.unshift( finalDataType );\n\
\t\t}\n\
\t\treturn responses[ finalDataType ];\n\
\t}\n\
}\n\
\n\
/* Chain conversions given the request and the original response\n\
 * Also sets the responseXXX fields on the jqXHR instance\n\
 */\n\
function ajaxConvert( s, response, jqXHR, isSuccess ) {\n\
\tvar conv2, current, conv, tmp, prev,\n\
\t\tconverters = {},\n\
\t\t// Work with a copy of dataTypes in case we need to modify it for conversion\n\
\t\tdataTypes = s.dataTypes.slice();\n\
\n\
\t// Create converters map with lowercased keys\n\
\tif ( dataTypes[ 1 ] ) {\n\
\t\tfor ( conv in s.converters ) {\n\
\t\t\tconverters[ conv.toLowerCase() ] = s.converters[ conv ];\n\
\t\t}\n\
\t}\n\
\n\
\tcurrent = dataTypes.shift();\n\
\n\
\t// Convert to each sequential dataType\n\
\twhile ( current ) {\n\
\n\
\t\tif ( s.responseFields[ current ] ) {\n\
\t\t\tjqXHR[ s.responseFields[ current ] ] = response;\n\
\t\t}\n\
\n\
\t\t// Apply the dataFilter if provided\n\
\t\tif ( !prev && isSuccess && s.dataFilter ) {\n\
\t\t\tresponse = s.dataFilter( response, s.dataType );\n\
\t\t}\n\
\n\
\t\tprev = current;\n\
\t\tcurrent = dataTypes.shift();\n\
\n\
\t\tif ( current ) {\n\
\n\
\t\t// There's only work to do if current dataType is non-auto\n\
\t\t\tif ( current === \"*\" ) {\n\
\n\
\t\t\t\tcurrent = prev;\n\
\n\
\t\t\t// Convert response if prev dataType is non-auto and differs from current\n\
\t\t\t} else if ( prev !== \"*\" && prev !== current ) {\n\
\n\
\t\t\t\t// Seek a direct converter\n\
\t\t\t\tconv = converters[ prev + \" \" + current ] || converters[ \"* \" + current ];\n\
\n\
\t\t\t\t// If none found, seek a pair\n\
\t\t\t\tif ( !conv ) {\n\
\t\t\t\t\tfor ( conv2 in converters ) {\n\
\n\
\t\t\t\t\t\t// If conv2 outputs current\n\
\t\t\t\t\t\ttmp = conv2.split( \" \" );\n\
\t\t\t\t\t\tif ( tmp[ 1 ] === current ) {\n\
\n\
\t\t\t\t\t\t\t// If prev can be converted to accepted input\n\
\t\t\t\t\t\t\tconv = converters[ prev + \" \" + tmp[ 0 ] ] ||\n\
\t\t\t\t\t\t\t\tconverters[ \"* \" + tmp[ 0 ] ];\n\
\t\t\t\t\t\t\tif ( conv ) {\n\
\t\t\t\t\t\t\t\t// Condense equivalence converters\n\
\t\t\t\t\t\t\t\tif ( conv === true ) {\n\
\t\t\t\t\t\t\t\t\tconv = converters[ conv2 ];\n\
\n\
\t\t\t\t\t\t\t\t// Otherwise, insert the intermediate dataType\n\
\t\t\t\t\t\t\t\t} else if ( converters[ conv2 ] !== true ) {\n\
\t\t\t\t\t\t\t\t\tcurrent = tmp[ 0 ];\n\
\t\t\t\t\t\t\t\t\tdataTypes.unshift( tmp[ 1 ] );\n\
\t\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t\t\tbreak;\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Apply converter (if not an equivalence)\n\
\t\t\t\tif ( conv !== true ) {\n\
\n\
\t\t\t\t\t// Unless errors are allowed to bubble, catch and return them\n\
\t\t\t\t\tif ( conv && s[ \"throws\" ] ) {\n\
\t\t\t\t\t\tresponse = conv( response );\n\
\t\t\t\t\t} else {\n\
\t\t\t\t\t\ttry {\n\
\t\t\t\t\t\t\tresponse = conv( response );\n\
\t\t\t\t\t\t} catch ( e ) {\n\
\t\t\t\t\t\t\treturn { state: \"parsererror\", error: conv ? e : \"No conversion from \" + prev + \" to \" + current };\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\t}\n\
\n\
\treturn { state: \"success\", data: response };\n\
}\n\
\n\
jQuery.extend({\n\
\n\
\t// Counter for holding the number of active queries\n\
\tactive: 0,\n\
\n\
\t// Last-Modified header cache for next request\n\
\tlastModified: {},\n\
\tetag: {},\n\
\n\
\tajaxSettings: {\n\
\t\turl: ajaxLocation,\n\
\t\ttype: \"GET\",\n\
\t\tisLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),\n\
\t\tglobal: true,\n\
\t\tprocessData: true,\n\
\t\tasync: true,\n\
\t\tcontentType: \"application/x-www-form-urlencoded; charset=UTF-8\",\n\
\t\t/*\n\
\t\ttimeout: 0,\n\
\t\tdata: null,\n\
\t\tdataType: null,\n\
\t\tusername: null,\n\
\t\tpassword: null,\n\
\t\tcache: null,\n\
\t\tthrows: false,\n\
\t\ttraditional: false,\n\
\t\theaders: {},\n\
\t\t*/\n\
\n\
\t\taccepts: {\n\
\t\t\t\"*\": allTypes,\n\
\t\t\ttext: \"text/plain\",\n\
\t\t\thtml: \"text/html\",\n\
\t\t\txml: \"application/xml, text/xml\",\n\
\t\t\tjson: \"application/json, text/javascript\"\n\
\t\t},\n\
\n\
\t\tcontents: {\n\
\t\t\txml: /xml/,\n\
\t\t\thtml: /html/,\n\
\t\t\tjson: /json/\n\
\t\t},\n\
\n\
\t\tresponseFields: {\n\
\t\t\txml: \"responseXML\",\n\
\t\t\ttext: \"responseText\",\n\
\t\t\tjson: \"responseJSON\"\n\
\t\t},\n\
\n\
\t\t// Data converters\n\
\t\t// Keys separate source (or catchall \"*\") and destination types with a single space\n\
\t\tconverters: {\n\
\n\
\t\t\t// Convert anything to text\n\
\t\t\t\"* text\": String,\n\
\n\
\t\t\t// Text to html (true = no transformation)\n\
\t\t\t\"text html\": true,\n\
\n\
\t\t\t// Evaluate text as a json expression\n\
\t\t\t\"text json\": jQuery.parseJSON,\n\
\n\
\t\t\t// Parse text as xml\n\
\t\t\t\"text xml\": jQuery.parseXML\n\
\t\t},\n\
\n\
\t\t// For options that shouldn't be deep extended:\n\
\t\t// you can add your own custom options here if\n\
\t\t// and when you create one that shouldn't be\n\
\t\t// deep extended (see ajaxExtend)\n\
\t\tflatOptions: {\n\
\t\t\turl: true,\n\
\t\t\tcontext: true\n\
\t\t}\n\
\t},\n\
\n\
\t// Creates a full fledged settings object into target\n\
\t// with both ajaxSettings and settings fields.\n\
\t// If target is omitted, writes into ajaxSettings.\n\
\tajaxSetup: function( target, settings ) {\n\
\t\treturn settings ?\n\
\n\
\t\t\t// Building a settings object\n\
\t\t\tajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :\n\
\n\
\t\t\t// Extending ajaxSettings\n\
\t\t\tajaxExtend( jQuery.ajaxSettings, target );\n\
\t},\n\
\n\
\tajaxPrefilter: addToPrefiltersOrTransports( prefilters ),\n\
\tajaxTransport: addToPrefiltersOrTransports( transports ),\n\
\n\
\t// Main method\n\
\tajax: function( url, options ) {\n\
\n\
\t\t// If url is an object, simulate pre-1.5 signature\n\
\t\tif ( typeof url === \"object\" ) {\n\
\t\t\toptions = url;\n\
\t\t\turl = undefined;\n\
\t\t}\n\
\n\
\t\t// Force options to be an object\n\
\t\toptions = options || {};\n\
\n\
\t\tvar transport,\n\
\t\t\t// URL without anti-cache param\n\
\t\t\tcacheURL,\n\
\t\t\t// Response headers\n\
\t\t\tresponseHeadersString,\n\
\t\t\tresponseHeaders,\n\
\t\t\t// timeout handle\n\
\t\t\ttimeoutTimer,\n\
\t\t\t// Cross-domain detection vars\n\
\t\t\tparts,\n\
\t\t\t// To know if global events are to be dispatched\n\
\t\t\tfireGlobals,\n\
\t\t\t// Loop variable\n\
\t\t\ti,\n\
\t\t\t// Create the final options object\n\
\t\t\ts = jQuery.ajaxSetup( {}, options ),\n\
\t\t\t// Callbacks context\n\
\t\t\tcallbackContext = s.context || s,\n\
\t\t\t// Context for global events is callbackContext if it is a DOM node or jQuery collection\n\
\t\t\tglobalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?\n\
\t\t\t\tjQuery( callbackContext ) :\n\
\t\t\t\tjQuery.event,\n\
\t\t\t// Deferreds\n\
\t\t\tdeferred = jQuery.Deferred(),\n\
\t\t\tcompleteDeferred = jQuery.Callbacks(\"once memory\"),\n\
\t\t\t// Status-dependent callbacks\n\
\t\t\tstatusCode = s.statusCode || {},\n\
\t\t\t// Headers (they are sent all at once)\n\
\t\t\trequestHeaders = {},\n\
\t\t\trequestHeadersNames = {},\n\
\t\t\t// The jqXHR state\n\
\t\t\tstate = 0,\n\
\t\t\t// Default abort message\n\
\t\t\tstrAbort = \"canceled\",\n\
\t\t\t// Fake xhr\n\
\t\t\tjqXHR = {\n\
\t\t\t\treadyState: 0,\n\
\n\
\t\t\t\t// Builds headers hashtable if needed\n\
\t\t\t\tgetResponseHeader: function( key ) {\n\
\t\t\t\t\tvar match;\n\
\t\t\t\t\tif ( state === 2 ) {\n\
\t\t\t\t\t\tif ( !responseHeaders ) {\n\
\t\t\t\t\t\t\tresponseHeaders = {};\n\
\t\t\t\t\t\t\twhile ( (match = rheaders.exec( responseHeadersString )) ) {\n\
\t\t\t\t\t\t\t\tresponseHeaders[ match[1].toLowerCase() ] = match[ 2 ];\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t\tmatch = responseHeaders[ key.toLowerCase() ];\n\
\t\t\t\t\t}\n\
\t\t\t\t\treturn match == null ? null : match;\n\
\t\t\t\t},\n\
\n\
\t\t\t\t// Raw string\n\
\t\t\t\tgetAllResponseHeaders: function() {\n\
\t\t\t\t\treturn state === 2 ? responseHeadersString : null;\n\
\t\t\t\t},\n\
\n\
\t\t\t\t// Caches the header\n\
\t\t\t\tsetRequestHeader: function( name, value ) {\n\
\t\t\t\t\tvar lname = name.toLowerCase();\n\
\t\t\t\t\tif ( !state ) {\n\
\t\t\t\t\t\tname = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;\n\
\t\t\t\t\t\trequestHeaders[ name ] = value;\n\
\t\t\t\t\t}\n\
\t\t\t\t\treturn this;\n\
\t\t\t\t},\n\
\n\
\t\t\t\t// Overrides response content-type header\n\
\t\t\t\toverrideMimeType: function( type ) {\n\
\t\t\t\t\tif ( !state ) {\n\
\t\t\t\t\t\ts.mimeType = type;\n\
\t\t\t\t\t}\n\
\t\t\t\t\treturn this;\n\
\t\t\t\t},\n\
\n\
\t\t\t\t// Status-dependent callbacks\n\
\t\t\t\tstatusCode: function( map ) {\n\
\t\t\t\t\tvar code;\n\
\t\t\t\t\tif ( map ) {\n\
\t\t\t\t\t\tif ( state < 2 ) {\n\
\t\t\t\t\t\t\tfor ( code in map ) {\n\
\t\t\t\t\t\t\t\t// Lazy-add the new callback in a way that preserves old ones\n\
\t\t\t\t\t\t\t\tstatusCode[ code ] = [ statusCode[ code ], map[ code ] ];\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t} else {\n\
\t\t\t\t\t\t\t// Execute the appropriate callbacks\n\
\t\t\t\t\t\t\tjqXHR.always( map[ jqXHR.status ] );\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t\treturn this;\n\
\t\t\t\t},\n\
\n\
\t\t\t\t// Cancel the request\n\
\t\t\t\tabort: function( statusText ) {\n\
\t\t\t\t\tvar finalText = statusText || strAbort;\n\
\t\t\t\t\tif ( transport ) {\n\
\t\t\t\t\t\ttransport.abort( finalText );\n\
\t\t\t\t\t}\n\
\t\t\t\t\tdone( 0, finalText );\n\
\t\t\t\t\treturn this;\n\
\t\t\t\t}\n\
\t\t\t};\n\
\n\
\t\t// Attach deferreds\n\
\t\tdeferred.promise( jqXHR ).complete = completeDeferred.add;\n\
\t\tjqXHR.success = jqXHR.done;\n\
\t\tjqXHR.error = jqXHR.fail;\n\
\n\
\t\t// Remove hash character (#7531: and string promotion)\n\
\t\t// Add protocol if not provided (prefilters might expect it)\n\
\t\t// Handle falsy url in the settings object (#10093: consistency with old signature)\n\
\t\t// We also use the url parameter if available\n\
\t\ts.url = ( ( url || s.url || ajaxLocation ) + \"\" ).replace( rhash, \"\" )\n\
\t\t\t.replace( rprotocol, ajaxLocParts[ 1 ] + \"//\" );\n\
\n\
\t\t// Alias method option to type as per ticket #12004\n\
\t\ts.type = options.method || options.type || s.method || s.type;\n\
\n\
\t\t// Extract dataTypes list\n\
\t\ts.dataTypes = jQuery.trim( s.dataType || \"*\" ).toLowerCase().match( rnotwhite ) || [ \"\" ];\n\
\n\
\t\t// A cross-domain request is in order when we have a protocol:host:port mismatch\n\
\t\tif ( s.crossDomain == null ) {\n\
\t\t\tparts = rurl.exec( s.url.toLowerCase() );\n\
\t\t\ts.crossDomain = !!( parts &&\n\
\t\t\t\t( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||\n\
\t\t\t\t\t( parts[ 3 ] || ( parts[ 1 ] === \"http:\" ? \"80\" : \"443\" ) ) !==\n\
\t\t\t\t\t\t( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === \"http:\" ? \"80\" : \"443\" ) ) )\n\
\t\t\t);\n\
\t\t}\n\
\n\
\t\t// Convert data if not already a string\n\
\t\tif ( s.data && s.processData && typeof s.data !== \"string\" ) {\n\
\t\t\ts.data = jQuery.param( s.data, s.traditional );\n\
\t\t}\n\
\n\
\t\t// Apply prefilters\n\
\t\tinspectPrefiltersOrTransports( prefilters, s, options, jqXHR );\n\
\n\
\t\t// If request was aborted inside a prefilter, stop there\n\
\t\tif ( state === 2 ) {\n\
\t\t\treturn jqXHR;\n\
\t\t}\n\
\n\
\t\t// We can fire global events as of now if asked to\n\
\t\tfireGlobals = s.global;\n\
\n\
\t\t// Watch for a new set of requests\n\
\t\tif ( fireGlobals && jQuery.active++ === 0 ) {\n\
\t\t\tjQuery.event.trigger(\"ajaxStart\");\n\
\t\t}\n\
\n\
\t\t// Uppercase the type\n\
\t\ts.type = s.type.toUpperCase();\n\
\n\
\t\t// Determine if request has content\n\
\t\ts.hasContent = !rnoContent.test( s.type );\n\
\n\
\t\t// Save the URL in case we're toying with the If-Modified-Since\n\
\t\t// and/or If-None-Match header later on\n\
\t\tcacheURL = s.url;\n\
\n\
\t\t// More options handling for requests with no content\n\
\t\tif ( !s.hasContent ) {\n\
\n\
\t\t\t// If data is available, append data to url\n\
\t\t\tif ( s.data ) {\n\
\t\t\t\tcacheURL = ( s.url += ( rquery.test( cacheURL ) ? \"&\" : \"?\" ) + s.data );\n\
\t\t\t\t// #9682: remove data so that it's not used in an eventual retry\n\
\t\t\t\tdelete s.data;\n\
\t\t\t}\n\
\n\
\t\t\t// Add anti-cache in url if needed\n\
\t\t\tif ( s.cache === false ) {\n\
\t\t\t\ts.url = rts.test( cacheURL ) ?\n\
\n\
\t\t\t\t\t// If there is already a '_' parameter, set its value\n\
\t\t\t\t\tcacheURL.replace( rts, \"$1_=\" + nonce++ ) :\n\
\n\
\t\t\t\t\t// Otherwise add one to the end\n\
\t\t\t\t\tcacheURL + ( rquery.test( cacheURL ) ? \"&\" : \"?\" ) + \"_=\" + nonce++;\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n\
\t\tif ( s.ifModified ) {\n\
\t\t\tif ( jQuery.lastModified[ cacheURL ] ) {\n\
\t\t\t\tjqXHR.setRequestHeader( \"If-Modified-Since\", jQuery.lastModified[ cacheURL ] );\n\
\t\t\t}\n\
\t\t\tif ( jQuery.etag[ cacheURL ] ) {\n\
\t\t\t\tjqXHR.setRequestHeader( \"If-None-Match\", jQuery.etag[ cacheURL ] );\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Set the correct header, if data is being sent\n\
\t\tif ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {\n\
\t\t\tjqXHR.setRequestHeader( \"Content-Type\", s.contentType );\n\
\t\t}\n\
\n\
\t\t// Set the Accepts header for the server, depending on the dataType\n\
\t\tjqXHR.setRequestHeader(\n\
\t\t\t\"Accept\",\n\
\t\t\ts.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?\n\
\t\t\t\ts.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== \"*\" ? \", \" + allTypes + \"; q=0.01\" : \"\" ) :\n\
\t\t\t\ts.accepts[ \"*\" ]\n\
\t\t);\n\
\n\
\t\t// Check for headers option\n\
\t\tfor ( i in s.headers ) {\n\
\t\t\tjqXHR.setRequestHeader( i, s.headers[ i ] );\n\
\t\t}\n\
\n\
\t\t// Allow custom headers/mimetypes and early abort\n\
\t\tif ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {\n\
\t\t\t// Abort if not done already and return\n\
\t\t\treturn jqXHR.abort();\n\
\t\t}\n\
\n\
\t\t// aborting is no longer a cancellation\n\
\t\tstrAbort = \"abort\";\n\
\n\
\t\t// Install callbacks on deferreds\n\
\t\tfor ( i in { success: 1, error: 1, complete: 1 } ) {\n\
\t\t\tjqXHR[ i ]( s[ i ] );\n\
\t\t}\n\
\n\
\t\t// Get transport\n\
\t\ttransport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );\n\
\n\
\t\t// If no transport, we auto-abort\n\
\t\tif ( !transport ) {\n\
\t\t\tdone( -1, \"No Transport\" );\n\
\t\t} else {\n\
\t\t\tjqXHR.readyState = 1;\n\
\n\
\t\t\t// Send global event\n\
\t\t\tif ( fireGlobals ) {\n\
\t\t\t\tglobalEventContext.trigger( \"ajaxSend\", [ jqXHR, s ] );\n\
\t\t\t}\n\
\t\t\t// Timeout\n\
\t\t\tif ( s.async && s.timeout > 0 ) {\n\
\t\t\t\ttimeoutTimer = setTimeout(function() {\n\
\t\t\t\t\tjqXHR.abort(\"timeout\");\n\
\t\t\t\t}, s.timeout );\n\
\t\t\t}\n\
\n\
\t\t\ttry {\n\
\t\t\t\tstate = 1;\n\
\t\t\t\ttransport.send( requestHeaders, done );\n\
\t\t\t} catch ( e ) {\n\
\t\t\t\t// Propagate exception as error if not done\n\
\t\t\t\tif ( state < 2 ) {\n\
\t\t\t\t\tdone( -1, e );\n\
\t\t\t\t// Simply rethrow otherwise\n\
\t\t\t\t} else {\n\
\t\t\t\t\tthrow e;\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\t// Callback for when everything is done\n\
\t\tfunction done( status, nativeStatusText, responses, headers ) {\n\
\t\t\tvar isSuccess, success, error, response, modified,\n\
\t\t\t\tstatusText = nativeStatusText;\n\
\n\
\t\t\t// Called once\n\
\t\t\tif ( state === 2 ) {\n\
\t\t\t\treturn;\n\
\t\t\t}\n\
\n\
\t\t\t// State is \"done\" now\n\
\t\t\tstate = 2;\n\
\n\
\t\t\t// Clear timeout if it exists\n\
\t\t\tif ( timeoutTimer ) {\n\
\t\t\t\tclearTimeout( timeoutTimer );\n\
\t\t\t}\n\
\n\
\t\t\t// Dereference transport for early garbage collection\n\
\t\t\t// (no matter how long the jqXHR object will be used)\n\
\t\t\ttransport = undefined;\n\
\n\
\t\t\t// Cache response headers\n\
\t\t\tresponseHeadersString = headers || \"\";\n\
\n\
\t\t\t// Set readyState\n\
\t\t\tjqXHR.readyState = status > 0 ? 4 : 0;\n\
\n\
\t\t\t// Determine if successful\n\
\t\t\tisSuccess = status >= 200 && status < 300 || status === 304;\n\
\n\
\t\t\t// Get response data\n\
\t\t\tif ( responses ) {\n\
\t\t\t\tresponse = ajaxHandleResponses( s, jqXHR, responses );\n\
\t\t\t}\n\
\n\
\t\t\t// Convert no matter what (that way responseXXX fields are always set)\n\
\t\t\tresponse = ajaxConvert( s, response, jqXHR, isSuccess );\n\
\n\
\t\t\t// If successful, handle type chaining\n\
\t\t\tif ( isSuccess ) {\n\
\n\
\t\t\t\t// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.\n\
\t\t\t\tif ( s.ifModified ) {\n\
\t\t\t\t\tmodified = jqXHR.getResponseHeader(\"Last-Modified\");\n\
\t\t\t\t\tif ( modified ) {\n\
\t\t\t\t\t\tjQuery.lastModified[ cacheURL ] = modified;\n\
\t\t\t\t\t}\n\
\t\t\t\t\tmodified = jqXHR.getResponseHeader(\"etag\");\n\
\t\t\t\t\tif ( modified ) {\n\
\t\t\t\t\t\tjQuery.etag[ cacheURL ] = modified;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// if no content\n\
\t\t\t\tif ( status === 204 || s.type === \"HEAD\" ) {\n\
\t\t\t\t\tstatusText = \"nocontent\";\n\
\n\
\t\t\t\t// if not modified\n\
\t\t\t\t} else if ( status === 304 ) {\n\
\t\t\t\t\tstatusText = \"notmodified\";\n\
\n\
\t\t\t\t// If we have data, let's convert it\n\
\t\t\t\t} else {\n\
\t\t\t\t\tstatusText = response.state;\n\
\t\t\t\t\tsuccess = response.data;\n\
\t\t\t\t\terror = response.error;\n\
\t\t\t\t\tisSuccess = !error;\n\
\t\t\t\t}\n\
\t\t\t} else {\n\
\t\t\t\t// We extract error from statusText\n\
\t\t\t\t// then normalize statusText and status for non-aborts\n\
\t\t\t\terror = statusText;\n\
\t\t\t\tif ( status || !statusText ) {\n\
\t\t\t\t\tstatusText = \"error\";\n\
\t\t\t\t\tif ( status < 0 ) {\n\
\t\t\t\t\t\tstatus = 0;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t}\n\
\n\
\t\t\t// Set data for the fake xhr object\n\
\t\t\tjqXHR.status = status;\n\
\t\t\tjqXHR.statusText = ( nativeStatusText || statusText ) + \"\";\n\
\n\
\t\t\t// Success/Error\n\
\t\t\tif ( isSuccess ) {\n\
\t\t\t\tdeferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );\n\
\t\t\t} else {\n\
\t\t\t\tdeferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );\n\
\t\t\t}\n\
\n\
\t\t\t// Status-dependent callbacks\n\
\t\t\tjqXHR.statusCode( statusCode );\n\
\t\t\tstatusCode = undefined;\n\
\n\
\t\t\tif ( fireGlobals ) {\n\
\t\t\t\tglobalEventContext.trigger( isSuccess ? \"ajaxSuccess\" : \"ajaxError\",\n\
\t\t\t\t\t[ jqXHR, s, isSuccess ? success : error ] );\n\
\t\t\t}\n\
\n\
\t\t\t// Complete\n\
\t\t\tcompleteDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );\n\
\n\
\t\t\tif ( fireGlobals ) {\n\
\t\t\t\tglobalEventContext.trigger( \"ajaxComplete\", [ jqXHR, s ] );\n\
\t\t\t\t// Handle the global AJAX counter\n\
\t\t\t\tif ( !( --jQuery.active ) ) {\n\
\t\t\t\t\tjQuery.event.trigger(\"ajaxStop\");\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t}\n\
\n\
\t\treturn jqXHR;\n\
\t},\n\
\n\
\tgetJSON: function( url, data, callback ) {\n\
\t\treturn jQuery.get( url, data, callback, \"json\" );\n\
\t},\n\
\n\
\tgetScript: function( url, callback ) {\n\
\t\treturn jQuery.get( url, undefined, callback, \"script\" );\n\
\t}\n\
});\n\
\n\
jQuery.each( [ \"get\", \"post\" ], function( i, method ) {\n\
\tjQuery[ method ] = function( url, data, callback, type ) {\n\
\t\t// shift arguments if data argument was omitted\n\
\t\tif ( jQuery.isFunction( data ) ) {\n\
\t\t\ttype = type || callback;\n\
\t\t\tcallback = data;\n\
\t\t\tdata = undefined;\n\
\t\t}\n\
\n\
\t\treturn jQuery.ajax({\n\
\t\t\turl: url,\n\
\t\t\ttype: method,\n\
\t\t\tdataType: type,\n\
\t\t\tdata: data,\n\
\t\t\tsuccess: callback\n\
\t\t});\n\
\t};\n\
});\n\
\n\
// Attach a bunch of functions for handling common AJAX events\n\
jQuery.each( [ \"ajaxStart\", \"ajaxStop\", \"ajaxComplete\", \"ajaxError\", \"ajaxSuccess\", \"ajaxSend\" ], function( i, type ) {\n\
\tjQuery.fn[ type ] = function( fn ) {\n\
\t\treturn this.on( type, fn );\n\
\t};\n\
});\n\
\n\
\n\
jQuery._evalUrl = function( url ) {\n\
\treturn jQuery.ajax({\n\
\t\turl: url,\n\
\t\ttype: \"GET\",\n\
\t\tdataType: \"script\",\n\
\t\tasync: false,\n\
\t\tglobal: false,\n\
\t\t\"throws\": true\n\
\t});\n\
};\n\
\n\
\n\
jQuery.fn.extend({\n\
\twrapAll: function( html ) {\n\
\t\tvar wrap;\n\
\n\
\t\tif ( jQuery.isFunction( html ) ) {\n\
\t\t\treturn this.each(function( i ) {\n\
\t\t\t\tjQuery( this ).wrapAll( html.call(this, i) );\n\
\t\t\t});\n\
\t\t}\n\
\n\
\t\tif ( this[ 0 ] ) {\n\
\n\
\t\t\t// The elements to wrap the target around\n\
\t\t\twrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );\n\
\n\
\t\t\tif ( this[ 0 ].parentNode ) {\n\
\t\t\t\twrap.insertBefore( this[ 0 ] );\n\
\t\t\t}\n\
\n\
\t\t\twrap.map(function() {\n\
\t\t\t\tvar elem = this;\n\
\n\
\t\t\t\twhile ( elem.firstElementChild ) {\n\
\t\t\t\t\telem = elem.firstElementChild;\n\
\t\t\t\t}\n\
\n\
\t\t\t\treturn elem;\n\
\t\t\t}).append( this );\n\
\t\t}\n\
\n\
\t\treturn this;\n\
\t},\n\
\n\
\twrapInner: function( html ) {\n\
\t\tif ( jQuery.isFunction( html ) ) {\n\
\t\t\treturn this.each(function( i ) {\n\
\t\t\t\tjQuery( this ).wrapInner( html.call(this, i) );\n\
\t\t\t});\n\
\t\t}\n\
\n\
\t\treturn this.each(function() {\n\
\t\t\tvar self = jQuery( this ),\n\
\t\t\t\tcontents = self.contents();\n\
\n\
\t\t\tif ( contents.length ) {\n\
\t\t\t\tcontents.wrapAll( html );\n\
\n\
\t\t\t} else {\n\
\t\t\t\tself.append( html );\n\
\t\t\t}\n\
\t\t});\n\
\t},\n\
\n\
\twrap: function( html ) {\n\
\t\tvar isFunction = jQuery.isFunction( html );\n\
\n\
\t\treturn this.each(function( i ) {\n\
\t\t\tjQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );\n\
\t\t});\n\
\t},\n\
\n\
\tunwrap: function() {\n\
\t\treturn this.parent().each(function() {\n\
\t\t\tif ( !jQuery.nodeName( this, \"body\" ) ) {\n\
\t\t\t\tjQuery( this ).replaceWith( this.childNodes );\n\
\t\t\t}\n\
\t\t}).end();\n\
\t}\n\
});\n\
\n\
\n\
jQuery.expr.filters.hidden = function( elem ) {\n\
\t// Support: Opera <= 12.12\n\
\t// Opera reports offsetWidths and offsetHeights less than zero on some elements\n\
\treturn elem.offsetWidth <= 0 && elem.offsetHeight <= 0;\n\
};\n\
jQuery.expr.filters.visible = function( elem ) {\n\
\treturn !jQuery.expr.filters.hidden( elem );\n\
};\n\
\n\
\n\
\n\
\n\
var r20 = /%20/g,\n\
\trbracket = /\\[\\]$/,\n\
\trCRLF = /\\r?\\n\
/g,\n\
\trsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,\n\
\trsubmittable = /^(?:input|select|textarea|keygen)/i;\n\
\n\
function buildParams( prefix, obj, traditional, add ) {\n\
\tvar name;\n\
\n\
\tif ( jQuery.isArray( obj ) ) {\n\
\t\t// Serialize array item.\n\
\t\tjQuery.each( obj, function( i, v ) {\n\
\t\t\tif ( traditional || rbracket.test( prefix ) ) {\n\
\t\t\t\t// Treat each array item as a scalar.\n\
\t\t\t\tadd( prefix, v );\n\
\n\
\t\t\t} else {\n\
\t\t\t\t// Item is non-scalar (array or object), encode its numeric index.\n\
\t\t\t\tbuildParams( prefix + \"[\" + ( typeof v === \"object\" ? i : \"\" ) + \"]\", v, traditional, add );\n\
\t\t\t}\n\
\t\t});\n\
\n\
\t} else if ( !traditional && jQuery.type( obj ) === \"object\" ) {\n\
\t\t// Serialize object item.\n\
\t\tfor ( name in obj ) {\n\
\t\t\tbuildParams( prefix + \"[\" + name + \"]\", obj[ name ], traditional, add );\n\
\t\t}\n\
\n\
\t} else {\n\
\t\t// Serialize scalar item.\n\
\t\tadd( prefix, obj );\n\
\t}\n\
}\n\
\n\
// Serialize an array of form elements or a set of\n\
// key/values into a query string\n\
jQuery.param = function( a, traditional ) {\n\
\tvar prefix,\n\
\t\ts = [],\n\
\t\tadd = function( key, value ) {\n\
\t\t\t// If value is a function, invoke it and return its value\n\
\t\t\tvalue = jQuery.isFunction( value ) ? value() : ( value == null ? \"\" : value );\n\
\t\t\ts[ s.length ] = encodeURIComponent( key ) + \"=\" + encodeURIComponent( value );\n\
\t\t};\n\
\n\
\t// Set traditional to true for jQuery <= 1.3.2 behavior.\n\
\tif ( traditional === undefined ) {\n\
\t\ttraditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;\n\
\t}\n\
\n\
\t// If an array was passed in, assume that it is an array of form elements.\n\
\tif ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {\n\
\t\t// Serialize the form elements\n\
\t\tjQuery.each( a, function() {\n\
\t\t\tadd( this.name, this.value );\n\
\t\t});\n\
\n\
\t} else {\n\
\t\t// If traditional, encode the \"old\" way (the way 1.3.2 or older\n\
\t\t// did it), otherwise encode params recursively.\n\
\t\tfor ( prefix in a ) {\n\
\t\t\tbuildParams( prefix, a[ prefix ], traditional, add );\n\
\t\t}\n\
\t}\n\
\n\
\t// Return the resulting serialization\n\
\treturn s.join( \"&\" ).replace( r20, \"+\" );\n\
};\n\
\n\
jQuery.fn.extend({\n\
\tserialize: function() {\n\
\t\treturn jQuery.param( this.serializeArray() );\n\
\t},\n\
\tserializeArray: function() {\n\
\t\treturn this.map(function() {\n\
\t\t\t// Can add propHook for \"elements\" to filter or add form elements\n\
\t\t\tvar elements = jQuery.prop( this, \"elements\" );\n\
\t\t\treturn elements ? jQuery.makeArray( elements ) : this;\n\
\t\t})\n\
\t\t.filter(function() {\n\
\t\t\tvar type = this.type;\n\
\n\
\t\t\t// Use .is( \":disabled\" ) so that fieldset[disabled] works\n\
\t\t\treturn this.name && !jQuery( this ).is( \":disabled\" ) &&\n\
\t\t\t\trsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&\n\
\t\t\t\t( this.checked || !rcheckableType.test( type ) );\n\
\t\t})\n\
\t\t.map(function( i, elem ) {\n\
\t\t\tvar val = jQuery( this ).val();\n\
\n\
\t\t\treturn val == null ?\n\
\t\t\t\tnull :\n\
\t\t\t\tjQuery.isArray( val ) ?\n\
\t\t\t\t\tjQuery.map( val, function( val ) {\n\
\t\t\t\t\t\treturn { name: elem.name, value: val.replace( rCRLF, \"\\r\\n\
\" ) };\n\
\t\t\t\t\t}) :\n\
\t\t\t\t\t{ name: elem.name, value: val.replace( rCRLF, \"\\r\\n\
\" ) };\n\
\t\t}).get();\n\
\t}\n\
});\n\
\n\
\n\
jQuery.ajaxSettings.xhr = function() {\n\
\ttry {\n\
\t\treturn new XMLHttpRequest();\n\
\t} catch( e ) {}\n\
};\n\
\n\
var xhrId = 0,\n\
\txhrCallbacks = {},\n\
\txhrSuccessStatus = {\n\
\t\t// file protocol always yields status code 0, assume 200\n\
\t\t0: 200,\n\
\t\t// Support: IE9\n\
\t\t// #1450: sometimes IE returns 1223 when it should be 204\n\
\t\t1223: 204\n\
\t},\n\
\txhrSupported = jQuery.ajaxSettings.xhr();\n\
\n\
// Support: IE9\n\
// Open requests must be manually aborted on unload (#5280)\n\
if ( window.ActiveXObject ) {\n\
\tjQuery( window ).on( \"unload\", function() {\n\
\t\tfor ( var key in xhrCallbacks ) {\n\
\t\t\txhrCallbacks[ key ]();\n\
\t\t}\n\
\t});\n\
}\n\
\n\
support.cors = !!xhrSupported && ( \"withCredentials\" in xhrSupported );\n\
support.ajax = xhrSupported = !!xhrSupported;\n\
\n\
jQuery.ajaxTransport(function( options ) {\n\
\tvar callback;\n\
\n\
\t// Cross domain only allowed if supported through XMLHttpRequest\n\
\tif ( support.cors || xhrSupported && !options.crossDomain ) {\n\
\t\treturn {\n\
\t\t\tsend: function( headers, complete ) {\n\
\t\t\t\tvar i,\n\
\t\t\t\t\txhr = options.xhr(),\n\
\t\t\t\t\tid = ++xhrId;\n\
\n\
\t\t\t\txhr.open( options.type, options.url, options.async, options.username, options.password );\n\
\n\
\t\t\t\t// Apply custom fields if provided\n\
\t\t\t\tif ( options.xhrFields ) {\n\
\t\t\t\t\tfor ( i in options.xhrFields ) {\n\
\t\t\t\t\t\txhr[ i ] = options.xhrFields[ i ];\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Override mime type if needed\n\
\t\t\t\tif ( options.mimeType && xhr.overrideMimeType ) {\n\
\t\t\t\t\txhr.overrideMimeType( options.mimeType );\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// X-Requested-With header\n\
\t\t\t\t// For cross-domain requests, seeing as conditions for a preflight are\n\
\t\t\t\t// akin to a jigsaw puzzle, we simply never set it to be sure.\n\
\t\t\t\t// (it can always be set on a per-request basis or even using ajaxSetup)\n\
\t\t\t\t// For same-domain requests, won't change header if already provided.\n\
\t\t\t\tif ( !options.crossDomain && !headers[\"X-Requested-With\"] ) {\n\
\t\t\t\t\theaders[\"X-Requested-With\"] = \"XMLHttpRequest\";\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Set headers\n\
\t\t\t\tfor ( i in headers ) {\n\
\t\t\t\t\txhr.setRequestHeader( i, headers[ i ] );\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Callback\n\
\t\t\t\tcallback = function( type ) {\n\
\t\t\t\t\treturn function() {\n\
\t\t\t\t\t\tif ( callback ) {\n\
\t\t\t\t\t\t\tdelete xhrCallbacks[ id ];\n\
\t\t\t\t\t\t\tcallback = xhr.onload = xhr.onerror = null;\n\
\n\
\t\t\t\t\t\t\tif ( type === \"abort\" ) {\n\
\t\t\t\t\t\t\t\txhr.abort();\n\
\t\t\t\t\t\t\t} else if ( type === \"error\" ) {\n\
\t\t\t\t\t\t\t\tcomplete(\n\
\t\t\t\t\t\t\t\t\t// file: protocol always yields status 0; see #8605, #14207\n\
\t\t\t\t\t\t\t\t\txhr.status,\n\
\t\t\t\t\t\t\t\t\txhr.statusText\n\
\t\t\t\t\t\t\t\t);\n\
\t\t\t\t\t\t\t} else {\n\
\t\t\t\t\t\t\t\tcomplete(\n\
\t\t\t\t\t\t\t\t\txhrSuccessStatus[ xhr.status ] || xhr.status,\n\
\t\t\t\t\t\t\t\t\txhr.statusText,\n\
\t\t\t\t\t\t\t\t\t// Support: IE9\n\
\t\t\t\t\t\t\t\t\t// Accessing binary-data responseText throws an exception\n\
\t\t\t\t\t\t\t\t\t// (#11426)\n\
\t\t\t\t\t\t\t\t\ttypeof xhr.responseText === \"string\" ? {\n\
\t\t\t\t\t\t\t\t\t\ttext: xhr.responseText\n\
\t\t\t\t\t\t\t\t\t} : undefined,\n\
\t\t\t\t\t\t\t\t\txhr.getAllResponseHeaders()\n\
\t\t\t\t\t\t\t\t);\n\
\t\t\t\t\t\t\t}\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t};\n\
\t\t\t\t};\n\
\n\
\t\t\t\t// Listen to events\n\
\t\t\t\txhr.onload = callback();\n\
\t\t\t\txhr.onerror = callback(\"error\");\n\
\n\
\t\t\t\t// Create the abort callback\n\
\t\t\t\tcallback = xhrCallbacks[ id ] = callback(\"abort\");\n\
\n\
\t\t\t\ttry {\n\
\t\t\t\t\t// Do send the request (this may raise an exception)\n\
\t\t\t\t\txhr.send( options.hasContent && options.data || null );\n\
\t\t\t\t} catch ( e ) {\n\
\t\t\t\t\t// #14683: Only rethrow if this hasn't been notified as an error yet\n\
\t\t\t\t\tif ( callback ) {\n\
\t\t\t\t\t\tthrow e;\n\
\t\t\t\t\t}\n\
\t\t\t\t}\n\
\t\t\t},\n\
\n\
\t\t\tabort: function() {\n\
\t\t\t\tif ( callback ) {\n\
\t\t\t\t\tcallback();\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t};\n\
\t}\n\
});\n\
\n\
\n\
\n\
\n\
// Install script dataType\n\
jQuery.ajaxSetup({\n\
\taccepts: {\n\
\t\tscript: \"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript\"\n\
\t},\n\
\tcontents: {\n\
\t\tscript: /(?:java|ecma)script/\n\
\t},\n\
\tconverters: {\n\
\t\t\"text script\": function( text ) {\n\
\t\t\tjQuery.globalEval( text );\n\
\t\t\treturn text;\n\
\t\t}\n\
\t}\n\
});\n\
\n\
// Handle cache's special case and crossDomain\n\
jQuery.ajaxPrefilter( \"script\", function( s ) {\n\
\tif ( s.cache === undefined ) {\n\
\t\ts.cache = false;\n\
\t}\n\
\tif ( s.crossDomain ) {\n\
\t\ts.type = \"GET\";\n\
\t}\n\
});\n\
\n\
// Bind script tag hack transport\n\
jQuery.ajaxTransport( \"script\", function( s ) {\n\
\t// This transport only deals with cross domain requests\n\
\tif ( s.crossDomain ) {\n\
\t\tvar script, callback;\n\
\t\treturn {\n\
\t\t\tsend: function( _, complete ) {\n\
\t\t\t\tscript = jQuery(\"<script>\").prop({\n\
\t\t\t\t\tasync: true,\n\
\t\t\t\t\tcharset: s.scriptCharset,\n\
\t\t\t\t\tsrc: s.url\n\
\t\t\t\t}).on(\n\
\t\t\t\t\t\"load error\",\n\
\t\t\t\t\tcallback = function( evt ) {\n\
\t\t\t\t\t\tscript.remove();\n\
\t\t\t\t\t\tcallback = null;\n\
\t\t\t\t\t\tif ( evt ) {\n\
\t\t\t\t\t\t\tcomplete( evt.type === \"error\" ? 404 : 200, evt.type );\n\
\t\t\t\t\t\t}\n\
\t\t\t\t\t}\n\
\t\t\t\t);\n\
\t\t\t\tdocument.head.appendChild( script[ 0 ] );\n\
\t\t\t},\n\
\t\t\tabort: function() {\n\
\t\t\t\tif ( callback ) {\n\
\t\t\t\t\tcallback();\n\
\t\t\t\t}\n\
\t\t\t}\n\
\t\t};\n\
\t}\n\
});\n\
\n\
\n\
\n\
\n\
var oldCallbacks = [],\n\
\trjsonp = /(=)\\?(?=&|$)|\\?\\?/;\n\
\n\
// Default jsonp settings\n\
jQuery.ajaxSetup({\n\
\tjsonp: \"callback\",\n\
\tjsonpCallback: function() {\n\
\t\tvar callback = oldCallbacks.pop() || ( jQuery.expando + \"_\" + ( nonce++ ) );\n\
\t\tthis[ callback ] = true;\n\
\t\treturn callback;\n\
\t}\n\
});\n\
\n\
// Detect, normalize options and install callbacks for jsonp requests\n\
jQuery.ajaxPrefilter( \"json jsonp\", function( s, originalSettings, jqXHR ) {\n\
\n\
\tvar callbackName, overwritten, responseContainer,\n\
\t\tjsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?\n\
\t\t\t\"url\" :\n\
\t\t\ttypeof s.data === \"string\" && !( s.contentType || \"\" ).indexOf(\"application/x-www-form-urlencoded\") && rjsonp.test( s.data ) && \"data\"\n\
\t\t);\n\
\n\
\t// Handle iff the expected data type is \"jsonp\" or we have a parameter to set\n\
\tif ( jsonProp || s.dataTypes[ 0 ] === \"jsonp\" ) {\n\
\n\
\t\t// Get callback name, remembering preexisting value associated with it\n\
\t\tcallbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?\n\
\t\t\ts.jsonpCallback() :\n\
\t\t\ts.jsonpCallback;\n\
\n\
\t\t// Insert callback into url or form data\n\
\t\tif ( jsonProp ) {\n\
\t\t\ts[ jsonProp ] = s[ jsonProp ].replace( rjsonp, \"$1\" + callbackName );\n\
\t\t} else if ( s.jsonp !== false ) {\n\
\t\t\ts.url += ( rquery.test( s.url ) ? \"&\" : \"?\" ) + s.jsonp + \"=\" + callbackName;\n\
\t\t}\n\
\n\
\t\t// Use data converter to retrieve json after script execution\n\
\t\ts.converters[\"script json\"] = function() {\n\
\t\t\tif ( !responseContainer ) {\n\
\t\t\t\tjQuery.error( callbackName + \" was not called\" );\n\
\t\t\t}\n\
\t\t\treturn responseContainer[ 0 ];\n\
\t\t};\n\
\n\
\t\t// force json dataType\n\
\t\ts.dataTypes[ 0 ] = \"json\";\n\
\n\
\t\t// Install callback\n\
\t\toverwritten = window[ callbackName ];\n\
\t\twindow[ callbackName ] = function() {\n\
\t\t\tresponseContainer = arguments;\n\
\t\t};\n\
\n\
\t\t// Clean-up function (fires after converters)\n\
\t\tjqXHR.always(function() {\n\
\t\t\t// Restore preexisting value\n\
\t\t\twindow[ callbackName ] = overwritten;\n\
\n\
\t\t\t// Save back as free\n\
\t\t\tif ( s[ callbackName ] ) {\n\
\t\t\t\t// make sure that re-using the options doesn't screw things around\n\
\t\t\t\ts.jsonpCallback = originalSettings.jsonpCallback;\n\
\n\
\t\t\t\t// save the callback name for future use\n\
\t\t\t\toldCallbacks.push( callbackName );\n\
\t\t\t}\n\
\n\
\t\t\t// Call if it was a function and we have a response\n\
\t\t\tif ( responseContainer && jQuery.isFunction( overwritten ) ) {\n\
\t\t\t\toverwritten( responseContainer[ 0 ] );\n\
\t\t\t}\n\
\n\
\t\t\tresponseContainer = overwritten = undefined;\n\
\t\t});\n\
\n\
\t\t// Delegate to script\n\
\t\treturn \"script\";\n\
\t}\n\
});\n\
\n\
\n\
\n\
\n\
// data: string of html\n\
// context (optional): If specified, the fragment will be created in this context, defaults to document\n\
// keepScripts (optional): If true, will include scripts passed in the html string\n\
jQuery.parseHTML = function( data, context, keepScripts ) {\n\
\tif ( !data || typeof data !== \"string\" ) {\n\
\t\treturn null;\n\
\t}\n\
\tif ( typeof context === \"boolean\" ) {\n\
\t\tkeepScripts = context;\n\
\t\tcontext = false;\n\
\t}\n\
\tcontext = context || document;\n\
\n\
\tvar parsed = rsingleTag.exec( data ),\n\
\t\tscripts = !keepScripts && [];\n\
\n\
\t// Single tag\n\
\tif ( parsed ) {\n\
\t\treturn [ context.createElement( parsed[1] ) ];\n\
\t}\n\
\n\
\tparsed = jQuery.buildFragment( [ data ], context, scripts );\n\
\n\
\tif ( scripts && scripts.length ) {\n\
\t\tjQuery( scripts ).remove();\n\
\t}\n\
\n\
\treturn jQuery.merge( [], parsed.childNodes );\n\
};\n\
\n\
\n\
// Keep a copy of the old load method\n\
var _load = jQuery.fn.load;\n\
\n\
/**\n\
 * Load a url into a page\n\
 */\n\
jQuery.fn.load = function( url, params, callback ) {\n\
\tif ( typeof url !== \"string\" && _load ) {\n\
\t\treturn _load.apply( this, arguments );\n\
\t}\n\
\n\
\tvar selector, type, response,\n\
\t\tself = this,\n\
\t\toff = url.indexOf(\" \");\n\
\n\
\tif ( off >= 0 ) {\n\
\t\tselector = jQuery.trim( url.slice( off ) );\n\
\t\turl = url.slice( 0, off );\n\
\t}\n\
\n\
\t// If it's a function\n\
\tif ( jQuery.isFunction( params ) ) {\n\
\n\
\t\t// We assume that it's the callback\n\
\t\tcallback = params;\n\
\t\tparams = undefined;\n\
\n\
\t// Otherwise, build a param string\n\
\t} else if ( params && typeof params === \"object\" ) {\n\
\t\ttype = \"POST\";\n\
\t}\n\
\n\
\t// If we have elements to modify, make the request\n\
\tif ( self.length > 0 ) {\n\
\t\tjQuery.ajax({\n\
\t\t\turl: url,\n\
\n\
\t\t\t// if \"type\" variable is undefined, then \"GET\" method will be used\n\
\t\t\ttype: type,\n\
\t\t\tdataType: \"html\",\n\
\t\t\tdata: params\n\
\t\t}).done(function( responseText ) {\n\
\n\
\t\t\t// Save response for use in complete callback\n\
\t\t\tresponse = arguments;\n\
\n\
\t\t\tself.html( selector ?\n\
\n\
\t\t\t\t// If a selector was specified, locate the right elements in a dummy div\n\
\t\t\t\t// Exclude scripts to avoid IE 'Permission Denied' errors\n\
\t\t\t\tjQuery(\"<div>\").append( jQuery.parseHTML( responseText ) ).find( selector ) :\n\
\n\
\t\t\t\t// Otherwise use the full result\n\
\t\t\t\tresponseText );\n\
\n\
\t\t}).complete( callback && function( jqXHR, status ) {\n\
\t\t\tself.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );\n\
\t\t});\n\
\t}\n\
\n\
\treturn this;\n\
};\n\
\n\
\n\
\n\
\n\
jQuery.expr.filters.animated = function( elem ) {\n\
\treturn jQuery.grep(jQuery.timers, function( fn ) {\n\
\t\treturn elem === fn.elem;\n\
\t}).length;\n\
};\n\
\n\
\n\
\n\
\n\
var docElem = window.document.documentElement;\n\
\n\
/**\n\
 * Gets a window from an element\n\
 */\n\
function getWindow( elem ) {\n\
\treturn jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;\n\
}\n\
\n\
jQuery.offset = {\n\
\tsetOffset: function( elem, options, i ) {\n\
\t\tvar curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,\n\
\t\t\tposition = jQuery.css( elem, \"position\" ),\n\
\t\t\tcurElem = jQuery( elem ),\n\
\t\t\tprops = {};\n\
\n\
\t\t// Set position first, in-case top/left are set even on static elem\n\
\t\tif ( position === \"static\" ) {\n\
\t\t\telem.style.position = \"relative\";\n\
\t\t}\n\
\n\
\t\tcurOffset = curElem.offset();\n\
\t\tcurCSSTop = jQuery.css( elem, \"top\" );\n\
\t\tcurCSSLeft = jQuery.css( elem, \"left\" );\n\
\t\tcalculatePosition = ( position === \"absolute\" || position === \"fixed\" ) &&\n\
\t\t\t( curCSSTop + curCSSLeft ).indexOf(\"auto\") > -1;\n\
\n\
\t\t// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed\n\
\t\tif ( calculatePosition ) {\n\
\t\t\tcurPosition = curElem.position();\n\
\t\t\tcurTop = curPosition.top;\n\
\t\t\tcurLeft = curPosition.left;\n\
\n\
\t\t} else {\n\
\t\t\tcurTop = parseFloat( curCSSTop ) || 0;\n\
\t\t\tcurLeft = parseFloat( curCSSLeft ) || 0;\n\
\t\t}\n\
\n\
\t\tif ( jQuery.isFunction( options ) ) {\n\
\t\t\toptions = options.call( elem, i, curOffset );\n\
\t\t}\n\
\n\
\t\tif ( options.top != null ) {\n\
\t\t\tprops.top = ( options.top - curOffset.top ) + curTop;\n\
\t\t}\n\
\t\tif ( options.left != null ) {\n\
\t\t\tprops.left = ( options.left - curOffset.left ) + curLeft;\n\
\t\t}\n\
\n\
\t\tif ( \"using\" in options ) {\n\
\t\t\toptions.using.call( elem, props );\n\
\n\
\t\t} else {\n\
\t\t\tcurElem.css( props );\n\
\t\t}\n\
\t}\n\
};\n\
\n\
jQuery.fn.extend({\n\
\toffset: function( options ) {\n\
\t\tif ( arguments.length ) {\n\
\t\t\treturn options === undefined ?\n\
\t\t\t\tthis :\n\
\t\t\t\tthis.each(function( i ) {\n\
\t\t\t\t\tjQuery.offset.setOffset( this, options, i );\n\
\t\t\t\t});\n\
\t\t}\n\
\n\
\t\tvar docElem, win,\n\
\t\t\telem = this[ 0 ],\n\
\t\t\tbox = { top: 0, left: 0 },\n\
\t\t\tdoc = elem && elem.ownerDocument;\n\
\n\
\t\tif ( !doc ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\tdocElem = doc.documentElement;\n\
\n\
\t\t// Make sure it's not a disconnected DOM node\n\
\t\tif ( !jQuery.contains( docElem, elem ) ) {\n\
\t\t\treturn box;\n\
\t\t}\n\
\n\
\t\t// If we don't have gBCR, just use 0,0 rather than error\n\
\t\t// BlackBerry 5, iOS 3 (original iPhone)\n\
\t\tif ( typeof elem.getBoundingClientRect !== strundefined ) {\n\
\t\t\tbox = elem.getBoundingClientRect();\n\
\t\t}\n\
\t\twin = getWindow( doc );\n\
\t\treturn {\n\
\t\t\ttop: box.top + win.pageYOffset - docElem.clientTop,\n\
\t\t\tleft: box.left + win.pageXOffset - docElem.clientLeft\n\
\t\t};\n\
\t},\n\
\n\
\tposition: function() {\n\
\t\tif ( !this[ 0 ] ) {\n\
\t\t\treturn;\n\
\t\t}\n\
\n\
\t\tvar offsetParent, offset,\n\
\t\t\telem = this[ 0 ],\n\
\t\t\tparentOffset = { top: 0, left: 0 };\n\
\n\
\t\t// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent\n\
\t\tif ( jQuery.css( elem, \"position\" ) === \"fixed\" ) {\n\
\t\t\t// We assume that getBoundingClientRect is available when computed position is fixed\n\
\t\t\toffset = elem.getBoundingClientRect();\n\
\n\
\t\t} else {\n\
\t\t\t// Get *real* offsetParent\n\
\t\t\toffsetParent = this.offsetParent();\n\
\n\
\t\t\t// Get correct offsets\n\
\t\t\toffset = this.offset();\n\
\t\t\tif ( !jQuery.nodeName( offsetParent[ 0 ], \"html\" ) ) {\n\
\t\t\t\tparentOffset = offsetParent.offset();\n\
\t\t\t}\n\
\n\
\t\t\t// Add offsetParent borders\n\
\t\t\tparentOffset.top += jQuery.css( offsetParent[ 0 ], \"borderTopWidth\", true );\n\
\t\t\tparentOffset.left += jQuery.css( offsetParent[ 0 ], \"borderLeftWidth\", true );\n\
\t\t}\n\
\n\
\t\t// Subtract parent offsets and element margins\n\
\t\treturn {\n\
\t\t\ttop: offset.top - parentOffset.top - jQuery.css( elem, \"marginTop\", true ),\n\
\t\t\tleft: offset.left - parentOffset.left - jQuery.css( elem, \"marginLeft\", true )\n\
\t\t};\n\
\t},\n\
\n\
\toffsetParent: function() {\n\
\t\treturn this.map(function() {\n\
\t\t\tvar offsetParent = this.offsetParent || docElem;\n\
\n\
\t\t\twhile ( offsetParent && ( !jQuery.nodeName( offsetParent, \"html\" ) && jQuery.css( offsetParent, \"position\" ) === \"static\" ) ) {\n\
\t\t\t\toffsetParent = offsetParent.offsetParent;\n\
\t\t\t}\n\
\n\
\t\t\treturn offsetParent || docElem;\n\
\t\t});\n\
\t}\n\
});\n\
\n\
// Create scrollLeft and scrollTop methods\n\
jQuery.each( { scrollLeft: \"pageXOffset\", scrollTop: \"pageYOffset\" }, function( method, prop ) {\n\
\tvar top = \"pageYOffset\" === prop;\n\
\n\
\tjQuery.fn[ method ] = function( val ) {\n\
\t\treturn access( this, function( elem, method, val ) {\n\
\t\t\tvar win = getWindow( elem );\n\
\n\
\t\t\tif ( val === undefined ) {\n\
\t\t\t\treturn win ? win[ prop ] : elem[ method ];\n\
\t\t\t}\n\
\n\
\t\t\tif ( win ) {\n\
\t\t\t\twin.scrollTo(\n\
\t\t\t\t\t!top ? val : window.pageXOffset,\n\
\t\t\t\t\ttop ? val : window.pageYOffset\n\
\t\t\t\t);\n\
\n\
\t\t\t} else {\n\
\t\t\t\telem[ method ] = val;\n\
\t\t\t}\n\
\t\t}, method, val, arguments.length, null );\n\
\t};\n\
});\n\
\n\
// Add the top/left cssHooks using jQuery.fn.position\n\
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084\n\
// getComputedStyle returns percent when specified for top/left/bottom/right\n\
// rather than make the css module depend on the offset module, we just check for it here\n\
jQuery.each( [ \"top\", \"left\" ], function( i, prop ) {\n\
\tjQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,\n\
\t\tfunction( elem, computed ) {\n\
\t\t\tif ( computed ) {\n\
\t\t\t\tcomputed = curCSS( elem, prop );\n\
\t\t\t\t// if curCSS returns percentage, fallback to offset\n\
\t\t\t\treturn rnumnonpx.test( computed ) ?\n\
\t\t\t\t\tjQuery( elem ).position()[ prop ] + \"px\" :\n\
\t\t\t\t\tcomputed;\n\
\t\t\t}\n\
\t\t}\n\
\t);\n\
});\n\
\n\
\n\
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods\n\
jQuery.each( { Height: \"height\", Width: \"width\" }, function( name, type ) {\n\
\tjQuery.each( { padding: \"inner\" + name, content: type, \"\": \"outer\" + name }, function( defaultExtra, funcName ) {\n\
\t\t// margin is only for outerHeight, outerWidth\n\
\t\tjQuery.fn[ funcName ] = function( margin, value ) {\n\
\t\t\tvar chainable = arguments.length && ( defaultExtra || typeof margin !== \"boolean\" ),\n\
\t\t\t\textra = defaultExtra || ( margin === true || value === true ? \"margin\" : \"border\" );\n\
\n\
\t\t\treturn access( this, function( elem, type, value ) {\n\
\t\t\t\tvar doc;\n\
\n\
\t\t\t\tif ( jQuery.isWindow( elem ) ) {\n\
\t\t\t\t\t// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there\n\
\t\t\t\t\t// isn't a whole lot we can do. See pull request at this URL for discussion:\n\
\t\t\t\t\t// https://github.com/jquery/jquery/pull/764\n\
\t\t\t\t\treturn elem.document.documentElement[ \"client\" + name ];\n\
\t\t\t\t}\n\
\n\
\t\t\t\t// Get document width or height\n\
\t\t\t\tif ( elem.nodeType === 9 ) {\n\
\t\t\t\t\tdoc = elem.documentElement;\n\
\n\
\t\t\t\t\t// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],\n\
\t\t\t\t\t// whichever is greatest\n\
\t\t\t\t\treturn Math.max(\n\
\t\t\t\t\t\telem.body[ \"scroll\" + name ], doc[ \"scroll\" + name ],\n\
\t\t\t\t\t\telem.body[ \"offset\" + name ], doc[ \"offset\" + name ],\n\
\t\t\t\t\t\tdoc[ \"client\" + name ]\n\
\t\t\t\t\t);\n\
\t\t\t\t}\n\
\n\
\t\t\t\treturn value === undefined ?\n\
\t\t\t\t\t// Get width or height on the element, requesting but not forcing parseFloat\n\
\t\t\t\t\tjQuery.css( elem, type, extra ) :\n\
\n\
\t\t\t\t\t// Set width or height on the element\n\
\t\t\t\t\tjQuery.style( elem, type, value, extra );\n\
\t\t\t}, type, chainable ? margin : undefined, chainable, null );\n\
\t\t};\n\
\t});\n\
});\n\
\n\
\n\
// The number of elements contained in the matched element set\n\
jQuery.fn.size = function() {\n\
\treturn this.length;\n\
};\n\
\n\
jQuery.fn.andSelf = jQuery.fn.addBack;\n\
\n\
\n\
\n\
\n\
// Register as a named AMD module, since jQuery can be concatenated with other\n\
// files that may use define, but not via a proper concatenation script that\n\
// understands anonymous AMD modules. A named AMD is safest and most robust\n\
// way to register. Lowercase jquery is used because AMD module names are\n\
// derived from file names, and jQuery is normally delivered in a lowercase\n\
// file name. Do this after creating the global so that if an AMD module wants\n\
// to call noConflict to hide this version of jQuery, it will work.\n\
\n\
// Note that for maximum portability, libraries that are not jQuery should\n\
// declare themselves as anonymous modules, and avoid setting a global if an\n\
// AMD loader is present. jQuery is a special case. For more information, see\n\
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon\n\
\n\
if ( typeof define === \"function\" && define.amd ) {\n\
\tdefine( \"jquery\", [], function() {\n\
\t\treturn jQuery;\n\
\t});\n\
}\n\
\n\
\n\
\n\
\n\
var\n\
\t// Map over jQuery in case of overwrite\n\
\t_jQuery = window.jQuery,\n\
\n\
\t// Map over the $ in case of overwrite\n\
\t_$ = window.$;\n\
\n\
jQuery.noConflict = function( deep ) {\n\
\tif ( window.$ === jQuery ) {\n\
\t\twindow.$ = _$;\n\
\t}\n\
\n\
\tif ( deep && window.jQuery === jQuery ) {\n\
\t\twindow.jQuery = _jQuery;\n\
\t}\n\
\n\
\treturn jQuery;\n\
};\n\
\n\
// Expose jQuery and $ identifiers, even in\n\
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)\n\
// and CommonJS for browser emulators (#13566)\n\
if ( typeof noGlobal === strundefined ) {\n\
\twindow.jQuery = window.$ = jQuery;\n\
}\n\
\n\
\n\
\n\
\n\
return jQuery;\n\
\n\
}));\n\
//# sourceURL=components/components/jquery/2.1.1/jquery.js"
));

require.modules["components-jquery"] = require.modules["components~jquery@2.1.1"];
require.modules["components~jquery"] = require.modules["components~jquery@2.1.1"];
require.modules["jquery"] = require.modules["components~jquery@2.1.1"];


require.register("lodash~lodash@2.4.1", Function("exports, module",
"module.exports = require(\"lodash~lodash@2.4.1/dist/lodash.compat.js\");\n\
//# sourceURL=components/lodash/lodash/2.4.1/index.js"
));

require.register("lodash~lodash@2.4.1/dist/lodash.compat.js", Function("exports, module",
"/**\n\
 * @license\n\
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>\n\
 * Build: `lodash -o ./dist/lodash.compat.js`\n\
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>\n\
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>\n\
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors\n\
 * Available under MIT license <http://lodash.com/license>\n\
 */\n\
;(function() {\n\
\n\
  /** Used as a safe reference for `undefined` in pre ES5 environments */\n\
  var undefined;\n\
\n\
  /** Used to pool arrays and objects used internally */\n\
  var arrayPool = [],\n\
      objectPool = [];\n\
\n\
  /** Used to generate unique IDs */\n\
  var idCounter = 0;\n\
\n\
  /** Used internally to indicate various things */\n\
  var indicatorObject = {};\n\
\n\
  /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */\n\
  var keyPrefix = +new Date + '';\n\
\n\
  /** Used as the size when optimizations are enabled for large arrays */\n\
  var largeArraySize = 75;\n\
\n\
  /** Used as the max size of the `arrayPool` and `objectPool` */\n\
  var maxPoolSize = 40;\n\
\n\
  /** Used to detect and test whitespace */\n\
  var whitespace = (\n\
    // whitespace\n\
    ' \\t\\x0B\\f\\xA0\\ufeff' +\n\
\n\
    // line terminators\n\
    '\\n\
\\r\\u2028\\u2029' +\n\
\n\
    // unicode category \"Zs\" space separators\n\
    '\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000'\n\
  );\n\
\n\
  /** Used to match empty string literals in compiled template source */\n\
  var reEmptyStringLeading = /\\b__p \\+= '';/g,\n\
      reEmptyStringMiddle = /\\b(__p \\+=) '' \\+/g,\n\
      reEmptyStringTrailing = /(__e\\(.*?\\)|\\b__t\\)) \\+\\n\
'';/g;\n\
\n\
  /**\n\
   * Used to match ES6 template delimiters\n\
   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals\n\
   */\n\
  var reEsTemplate = /\\$\\{([^\\\\}]*(?:\\\\.[^\\\\}]*)*)\\}/g;\n\
\n\
  /** Used to match regexp flags from their coerced string values */\n\
  var reFlags = /\\w*$/;\n\
\n\
  /** Used to detected named functions */\n\
  var reFuncName = /^\\s*function[ \\n\
\\r\\t]+\\w/;\n\
\n\
  /** Used to match \"interpolate\" template delimiters */\n\
  var reInterpolate = /<%=([\\s\\S]+?)%>/g;\n\
\n\
  /** Used to match leading whitespace and zeros to be removed */\n\
  var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');\n\
\n\
  /** Used to ensure capturing order of template delimiters */\n\
  var reNoMatch = /($^)/;\n\
\n\
  /** Used to detect functions containing a `this` reference */\n\
  var reThis = /\\bthis\\b/;\n\
\n\
  /** Used to match unescaped characters in compiled string literals */\n\
  var reUnescapedString = /['\\n\
\\r\\t\\u2028\\u2029\\\\]/g;\n\
\n\
  /** Used to assign default `context` object properties */\n\
  var contextProps = [\n\
    'Array', 'Boolean', 'Date', 'Error', 'Function', 'Math', 'Number', 'Object',\n\
    'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',\n\
    'parseInt', 'setTimeout'\n\
  ];\n\
\n\
  /** Used to fix the JScript [[DontEnum]] bug */\n\
  var shadowedProps = [\n\
    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',\n\
    'toLocaleString', 'toString', 'valueOf'\n\
  ];\n\
\n\
  /** Used to make template sourceURLs easier to identify */\n\
  var templateCounter = 0;\n\
\n\
  /** `Object#toString` result shortcuts */\n\
  var argsClass = '[object Arguments]',\n\
      arrayClass = '[object Array]',\n\
      boolClass = '[object Boolean]',\n\
      dateClass = '[object Date]',\n\
      errorClass = '[object Error]',\n\
      funcClass = '[object Function]',\n\
      numberClass = '[object Number]',\n\
      objectClass = '[object Object]',\n\
      regexpClass = '[object RegExp]',\n\
      stringClass = '[object String]';\n\
\n\
  /** Used to identify object classifications that `_.clone` supports */\n\
  var cloneableClasses = {};\n\
  cloneableClasses[funcClass] = false;\n\
  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =\n\
  cloneableClasses[boolClass] = cloneableClasses[dateClass] =\n\
  cloneableClasses[numberClass] = cloneableClasses[objectClass] =\n\
  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;\n\
\n\
  /** Used as an internal `_.debounce` options object */\n\
  var debounceOptions = {\n\
    'leading': false,\n\
    'maxWait': 0,\n\
    'trailing': false\n\
  };\n\
\n\
  /** Used as the property descriptor for `__bindData__` */\n\
  var descriptor = {\n\
    'configurable': false,\n\
    'enumerable': false,\n\
    'value': null,\n\
    'writable': false\n\
  };\n\
\n\
  /** Used as the data object for `iteratorTemplate` */\n\
  var iteratorData = {\n\
    'args': '',\n\
    'array': null,\n\
    'bottom': '',\n\
    'firstArg': '',\n\
    'init': '',\n\
    'keys': null,\n\
    'loop': '',\n\
    'shadowedProps': null,\n\
    'support': null,\n\
    'top': '',\n\
    'useHas': false\n\
  };\n\
\n\
  /** Used to determine if values are of the language type Object */\n\
  var objectTypes = {\n\
    'boolean': false,\n\
    'function': true,\n\
    'object': true,\n\
    'number': false,\n\
    'string': false,\n\
    'undefined': false\n\
  };\n\
\n\
  /** Used to escape characters for inclusion in compiled string literals */\n\
  var stringEscapes = {\n\
    '\\\\': '\\\\',\n\
    \"'\": \"'\",\n\
    '\\n\
': 'n',\n\
    '\\r': 'r',\n\
    '\\t': 't',\n\
    '\\u2028': 'u2028',\n\
    '\\u2029': 'u2029'\n\
  };\n\
\n\
  /** Used as a reference to the global object */\n\
  var root = (objectTypes[typeof window] && window) || this;\n\
\n\
  /** Detect free variable `exports` */\n\
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;\n\
\n\
  /** Detect free variable `module` */\n\
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;\n\
\n\
  /** Detect the popular CommonJS extension `module.exports` */\n\
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;\n\
\n\
  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */\n\
  var freeGlobal = objectTypes[typeof global] && global;\n\
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {\n\
    root = freeGlobal;\n\
  }\n\
\n\
  /*--------------------------------------------------------------------------*/\n\
\n\
  /**\n\
   * The base implementation of `_.indexOf` without support for binary searches\n\
   * or `fromIndex` constraints.\n\
   *\n\
   * @private\n\
   * @param {Array} array The array to search.\n\
   * @param {*} value The value to search for.\n\
   * @param {number} [fromIndex=0] The index to search from.\n\
   * @returns {number} Returns the index of the matched value or `-1`.\n\
   */\n\
  function baseIndexOf(array, value, fromIndex) {\n\
    var index = (fromIndex || 0) - 1,\n\
        length = array ? array.length : 0;\n\
\n\
    while (++index < length) {\n\
      if (array[index] === value) {\n\
        return index;\n\
      }\n\
    }\n\
    return -1;\n\
  }\n\
\n\
  /**\n\
   * An implementation of `_.contains` for cache objects that mimics the return\n\
   * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.\n\
   *\n\
   * @private\n\
   * @param {Object} cache The cache object to inspect.\n\
   * @param {*} value The value to search for.\n\
   * @returns {number} Returns `0` if `value` is found, else `-1`.\n\
   */\n\
  function cacheIndexOf(cache, value) {\n\
    var type = typeof value;\n\
    cache = cache.cache;\n\
\n\
    if (type == 'boolean' || value == null) {\n\
      return cache[value] ? 0 : -1;\n\
    }\n\
    if (type != 'number' && type != 'string') {\n\
      type = 'object';\n\
    }\n\
    var key = type == 'number' ? value : keyPrefix + value;\n\
    cache = (cache = cache[type]) && cache[key];\n\
\n\
    return type == 'object'\n\
      ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)\n\
      : (cache ? 0 : -1);\n\
  }\n\
\n\
  /**\n\
   * Adds a given value to the corresponding cache object.\n\
   *\n\
   * @private\n\
   * @param {*} value The value to add to the cache.\n\
   */\n\
  function cachePush(value) {\n\
    var cache = this.cache,\n\
        type = typeof value;\n\
\n\
    if (type == 'boolean' || value == null) {\n\
      cache[value] = true;\n\
    } else {\n\
      if (type != 'number' && type != 'string') {\n\
        type = 'object';\n\
      }\n\
      var key = type == 'number' ? value : keyPrefix + value,\n\
          typeCache = cache[type] || (cache[type] = {});\n\
\n\
      if (type == 'object') {\n\
        (typeCache[key] || (typeCache[key] = [])).push(value);\n\
      } else {\n\
        typeCache[key] = true;\n\
      }\n\
    }\n\
  }\n\
\n\
  /**\n\
   * Used by `_.max` and `_.min` as the default callback when a given\n\
   * collection is a string value.\n\
   *\n\
   * @private\n\
   * @param {string} value The character to inspect.\n\
   * @returns {number} Returns the code unit of given character.\n\
   */\n\
  function charAtCallback(value) {\n\
    return value.charCodeAt(0);\n\
  }\n\
\n\
  /**\n\
   * Used by `sortBy` to compare transformed `collection` elements, stable sorting\n\
   * them in ascending order.\n\
   *\n\
   * @private\n\
   * @param {Object} a The object to compare to `b`.\n\
   * @param {Object} b The object to compare to `a`.\n\
   * @returns {number} Returns the sort order indicator of `1` or `-1`.\n\
   */\n\
  function compareAscending(a, b) {\n\
    var ac = a.criteria,\n\
        bc = b.criteria,\n\
        index = -1,\n\
        length = ac.length;\n\
\n\
    while (++index < length) {\n\
      var value = ac[index],\n\
          other = bc[index];\n\
\n\
      if (value !== other) {\n\
        if (value > other || typeof value == 'undefined') {\n\
          return 1;\n\
        }\n\
        if (value < other || typeof other == 'undefined') {\n\
          return -1;\n\
        }\n\
      }\n\
    }\n\
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications\n\
    // that causes it, under certain circumstances, to return the same value for\n\
    // `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247\n\
    //\n\
    // This also ensures a stable sort in V8 and other engines.\n\
    // See http://code.google.com/p/v8/issues/detail?id=90\n\
    return a.index - b.index;\n\
  }\n\
\n\
  /**\n\
   * Creates a cache object to optimize linear searches of large arrays.\n\
   *\n\
   * @private\n\
   * @param {Array} [array=[]] The array to search.\n\
   * @returns {null|Object} Returns the cache object or `null` if caching should not be used.\n\
   */\n\
  function createCache(array) {\n\
    var index = -1,\n\
        length = array.length,\n\
        first = array[0],\n\
        mid = array[(length / 2) | 0],\n\
        last = array[length - 1];\n\
\n\
    if (first && typeof first == 'object' &&\n\
        mid && typeof mid == 'object' && last && typeof last == 'object') {\n\
      return false;\n\
    }\n\
    var cache = getObject();\n\
    cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;\n\
\n\
    var result = getObject();\n\
    result.array = array;\n\
    result.cache = cache;\n\
    result.push = cachePush;\n\
\n\
    while (++index < length) {\n\
      result.push(array[index]);\n\
    }\n\
    return result;\n\
  }\n\
\n\
  /**\n\
   * Used by `template` to escape characters for inclusion in compiled\n\
   * string literals.\n\
   *\n\
   * @private\n\
   * @param {string} match The matched character to escape.\n\
   * @returns {string} Returns the escaped character.\n\
   */\n\
  function escapeStringChar(match) {\n\
    return '\\\\' + stringEscapes[match];\n\
  }\n\
\n\
  /**\n\
   * Gets an array from the array pool or creates a new one if the pool is empty.\n\
   *\n\
   * @private\n\
   * @returns {Array} The array from the pool.\n\
   */\n\
  function getArray() {\n\
    return arrayPool.pop() || [];\n\
  }\n\
\n\
  /**\n\
   * Gets an object from the object pool or creates a new one if the pool is empty.\n\
   *\n\
   * @private\n\
   * @returns {Object} The object from the pool.\n\
   */\n\
  function getObject() {\n\
    return objectPool.pop() || {\n\
      'array': null,\n\
      'cache': null,\n\
      'criteria': null,\n\
      'false': false,\n\
      'index': 0,\n\
      'null': false,\n\
      'number': null,\n\
      'object': null,\n\
      'push': null,\n\
      'string': null,\n\
      'true': false,\n\
      'undefined': false,\n\
      'value': null\n\
    };\n\
  }\n\
\n\
  /**\n\
   * Checks if `value` is a DOM node in IE < 9.\n\
   *\n\
   * @private\n\
   * @param {*} value The value to check.\n\
   * @returns {boolean} Returns `true` if the `value` is a DOM node, else `false`.\n\
   */\n\
  function isNode(value) {\n\
    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`\n\
    // methods that are `typeof` \"string\" and still can coerce nodes to strings\n\
    return typeof value.toString != 'function' && typeof (value + '') == 'string';\n\
  }\n\
\n\
  /**\n\
   * Releases the given array back to the array pool.\n\
   *\n\
   * @private\n\
   * @param {Array} [array] The array to release.\n\
   */\n\
  function releaseArray(array) {\n\
    array.length = 0;\n\
    if (arrayPool.length < maxPoolSize) {\n\
      arrayPool.push(array);\n\
    }\n\
  }\n\
\n\
  /**\n\
   * Releases the given object back to the object pool.\n\
   *\n\
   * @private\n\
   * @param {Object} [object] The object to release.\n\
   */\n\
  function releaseObject(object) {\n\
    var cache = object.cache;\n\
    if (cache) {\n\
      releaseObject(cache);\n\
    }\n\
    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;\n\
    if (objectPool.length < maxPoolSize) {\n\
      objectPool.push(object);\n\
    }\n\
  }\n\
\n\
  /**\n\
   * Slices the `collection` from the `start` index up to, but not including,\n\
   * the `end` index.\n\
   *\n\
   * Note: This function is used instead of `Array#slice` to support node lists\n\
   * in IE < 9 and to ensure dense arrays are returned.\n\
   *\n\
   * @private\n\
   * @param {Array|Object|string} collection The collection to slice.\n\
   * @param {number} start The start index.\n\
   * @param {number} end The end index.\n\
   * @returns {Array} Returns the new array.\n\
   */\n\
  function slice(array, start, end) {\n\
    start || (start = 0);\n\
    if (typeof end == 'undefined') {\n\
      end = array ? array.length : 0;\n\
    }\n\
    var index = -1,\n\
        length = end - start || 0,\n\
        result = Array(length < 0 ? 0 : length);\n\
\n\
    while (++index < length) {\n\
      result[index] = array[start + index];\n\
    }\n\
    return result;\n\
  }\n\
\n\
  /*--------------------------------------------------------------------------*/\n\
\n\
  /**\n\
   * Create a new `lodash` function using the given context object.\n\
   *\n\
   * @static\n\
   * @memberOf _\n\
   * @category Utilities\n\
   * @param {Object} [context=root] The context object.\n\
   * @returns {Function} Returns the `lodash` function.\n\
   */\n\
  function runInContext(context) {\n\
    // Avoid issues with some ES3 environments that attempt to use values, named\n\
    // after built-in constructors like `Object`, for the creation of literals.\n\
    // ES5 clears this up by stating that literals must use built-in constructors.\n\
    // See http://es5.github.io/#x11.1.5.\n\
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;\n\
\n\
    /** Native constructor references */\n\
    var Array = context.Array,\n\
        Boolean = context.Boolean,\n\
        Date = context.Date,\n\
        Error = context.Error,\n\
        Function = context.Function,\n\
        Math = context.Math,\n\
        Number = context.Number,\n\
        Object = context.Object,\n\
        RegExp = context.RegExp,\n\
        String = context.String,\n\
        TypeError = context.TypeError;\n\
\n\
    /**\n\
     * Used for `Array` method references.\n\
     *\n\
     * Normally `Array.prototype` would suffice, however, using an array literal\n\
     * avoids issues in Narwhal.\n\
     */\n\
    var arrayRef = [];\n\
\n\
    /** Used for native method references */\n\
    var errorProto = Error.prototype,\n\
        objectProto = Object.prototype,\n\
        stringProto = String.prototype;\n\
\n\
    /** Used to restore the original `_` reference in `noConflict` */\n\
    var oldDash = context._;\n\
\n\
    /** Used to resolve the internal [[Class]] of values */\n\
    var toString = objectProto.toString;\n\
\n\
    /** Used to detect if a method is native */\n\
    var reNative = RegExp('^' +\n\
      String(toString)\n\
        .replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')\n\
        .replace(/toString| for [^\\]]+/g, '.*?') + '$'\n\
    );\n\
\n\
    /** Native method shortcuts */\n\
    var ceil = Math.ceil,\n\
        clearTimeout = context.clearTimeout,\n\
        floor = Math.floor,\n\
        fnToString = Function.prototype.toString,\n\
        getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,\n\
        hasOwnProperty = objectProto.hasOwnProperty,\n\
        push = arrayRef.push,\n\
        propertyIsEnumerable = objectProto.propertyIsEnumerable,\n\
        setTimeout = context.setTimeout,\n\
        splice = arrayRef.splice,\n\
        unshift = arrayRef.unshift;\n\
\n\
    /** Used to set meta data on functions */\n\
    var defineProperty = (function() {\n\
      // IE 8 only accepts DOM elements\n\
      try {\n\
        var o = {},\n\
            func = isNative(func = Object.defineProperty) && func,\n\
            result = func(o, o, o) && func;\n\
      } catch(e) { }\n\
      return result;\n\
    }());\n\
\n\
    /* Native method shortcuts for methods with the same name as other `lodash` methods */\n\
    var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,\n\
        nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,\n\
        nativeIsFinite = context.isFinite,\n\
        nativeIsNaN = context.isNaN,\n\
        nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,\n\
        nativeMax = Math.max,\n\
        nativeMin = Math.min,\n\
        nativeParseInt = context.parseInt,\n\
        nativeRandom = Math.random;\n\
\n\
    /** Used to lookup a built-in constructor by [[Class]] */\n\
    var ctorByClass = {};\n\
    ctorByClass[arrayClass] = Array;\n\
    ctorByClass[boolClass] = Boolean;\n\
    ctorByClass[dateClass] = Date;\n\
    ctorByClass[funcClass] = Function;\n\
    ctorByClass[objectClass] = Object;\n\
    ctorByClass[numberClass] = Number;\n\
    ctorByClass[regexpClass] = RegExp;\n\
    ctorByClass[stringClass] = String;\n\
\n\
    /** Used to avoid iterating non-enumerable properties in IE < 9 */\n\
    var nonEnumProps = {};\n\
    nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };\n\
    nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };\n\
    nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };\n\
    nonEnumProps[objectClass] = { 'constructor': true };\n\
\n\
    (function() {\n\
      var length = shadowedProps.length;\n\
      while (length--) {\n\
        var key = shadowedProps[length];\n\
        for (var className in nonEnumProps) {\n\
          if (hasOwnProperty.call(nonEnumProps, className) && !hasOwnProperty.call(nonEnumProps[className], key)) {\n\
            nonEnumProps[className][key] = false;\n\
          }\n\
        }\n\
      }\n\
    }());\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * Creates a `lodash` object which wraps the given value to enable intuitive\n\
     * method chaining.\n\
     *\n\
     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:\n\
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,\n\
     * and `unshift`\n\
     *\n\
     * Chaining is supported in custom builds as long as the `value` method is\n\
     * implicitly or explicitly included in the build.\n\
     *\n\
     * The chainable wrapper functions are:\n\
     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,\n\
     * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,\n\
     * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,\n\
     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,\n\
     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,\n\
     * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,\n\
     * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,\n\
     * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,\n\
     * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,\n\
     * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,\n\
     * and `zip`\n\
     *\n\
     * The non-chainable wrapper functions are:\n\
     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,\n\
     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,\n\
     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,\n\
     * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,\n\
     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,\n\
     * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,\n\
     * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,\n\
     * `template`, `unescape`, `uniqueId`, and `value`\n\
     *\n\
     * The wrapper functions `first` and `last` return wrapped values when `n` is\n\
     * provided, otherwise they return unwrapped values.\n\
     *\n\
     * Explicit chaining can be enabled by using the `_.chain` method.\n\
     *\n\
     * @name _\n\
     * @constructor\n\
     * @category Chaining\n\
     * @param {*} value The value to wrap in a `lodash` instance.\n\
     * @returns {Object} Returns a `lodash` instance.\n\
     * @example\n\
     *\n\
     * var wrapped = _([1, 2, 3]);\n\
     *\n\
     * // returns an unwrapped value\n\
     * wrapped.reduce(function(sum, num) {\n\
     *   return sum + num;\n\
     * });\n\
     * // => 6\n\
     *\n\
     * // returns a wrapped value\n\
     * var squares = wrapped.map(function(num) {\n\
     *   return num * num;\n\
     * });\n\
     *\n\
     * _.isArray(squares);\n\
     * // => false\n\
     *\n\
     * _.isArray(squares.value());\n\
     * // => true\n\
     */\n\
    function lodash(value) {\n\
      // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor\n\
      return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))\n\
       ? value\n\
       : new lodashWrapper(value);\n\
    }\n\
\n\
    /**\n\
     * A fast path for creating `lodash` wrapper objects.\n\
     *\n\
     * @private\n\
     * @param {*} value The value to wrap in a `lodash` instance.\n\
     * @param {boolean} chainAll A flag to enable chaining for all methods\n\
     * @returns {Object} Returns a `lodash` instance.\n\
     */\n\
    function lodashWrapper(value, chainAll) {\n\
      this.__chain__ = !!chainAll;\n\
      this.__wrapped__ = value;\n\
    }\n\
    // ensure `new lodashWrapper` is an instance of `lodash`\n\
    lodashWrapper.prototype = lodash.prototype;\n\
\n\
    /**\n\
     * An object used to flag environments features.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @type Object\n\
     */\n\
    var support = lodash.support = {};\n\
\n\
    (function() {\n\
      var ctor = function() { this.x = 1; },\n\
          object = { '0': 1, 'length': 1 },\n\
          props = [];\n\
\n\
      ctor.prototype = { 'valueOf': 1, 'y': 1 };\n\
      for (var key in new ctor) { props.push(key); }\n\
      for (key in arguments) { }\n\
\n\
      /**\n\
       * Detect if an `arguments` object's [[Class]] is resolvable (all but Firefox < 4, IE < 9).\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.argsClass = toString.call(arguments) == argsClass;\n\
\n\
      /**\n\
       * Detect if `arguments` objects are `Object` objects (all but Narwhal and Opera < 10.5).\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.argsObject = arguments.constructor == Object && !(arguments instanceof Array);\n\
\n\
      /**\n\
       * Detect if `name` or `message` properties of `Error.prototype` are\n\
       * enumerable by default. (IE < 9, Safari < 5.1)\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');\n\
\n\
      /**\n\
       * Detect if `prototype` properties are enumerable by default.\n\
       *\n\
       * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1\n\
       * (if the prototype or a property on the prototype has been set)\n\
       * incorrectly sets a function's `prototype` property [[Enumerable]]\n\
       * value to `true`.\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');\n\
\n\
      /**\n\
       * Detect if functions can be decompiled by `Function#toString`\n\
       * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);\n\
\n\
      /**\n\
       * Detect if `Function#name` is supported (all but IE).\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.funcNames = typeof Function.name == 'string';\n\
\n\
      /**\n\
       * Detect if `arguments` object indexes are non-enumerable\n\
       * (Firefox < 4, IE < 9, PhantomJS, Safari < 5.1).\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.nonEnumArgs = key != 0;\n\
\n\
      /**\n\
       * Detect if properties shadowing those on `Object.prototype` are non-enumerable.\n\
       *\n\
       * In IE < 9 an objects own properties, shadowing non-enumerable ones, are\n\
       * made non-enumerable as well (a.k.a the JScript [[DontEnum]] bug).\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.nonEnumShadows = !/valueOf/.test(props);\n\
\n\
      /**\n\
       * Detect if own properties are iterated after inherited properties (all but IE < 9).\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.ownLast = props[0] != 'x';\n\
\n\
      /**\n\
       * Detect if `Array#shift` and `Array#splice` augment array-like objects correctly.\n\
       *\n\
       * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`\n\
       * and `splice()` functions that fail to remove the last element, `value[0]`,\n\
       * of array-like objects even though the `length` property is set to `0`.\n\
       * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`\n\
       * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.spliceObjects = (arrayRef.splice.call(object, 0, 1), !object[0]);\n\
\n\
      /**\n\
       * Detect lack of support for accessing string characters by index.\n\
       *\n\
       * IE < 8 can't access characters by index and IE 8 can only access\n\
       * characters by index on string literals.\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';\n\
\n\
      /**\n\
       * Detect if a DOM node's [[Class]] is resolvable (all but IE < 9)\n\
       * and that the JS engine errors when attempting to coerce an object to\n\
       * a string without a `toString` function.\n\
       *\n\
       * @memberOf _.support\n\
       * @type boolean\n\
       */\n\
      try {\n\
        support.nodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));\n\
      } catch(e) {\n\
        support.nodeClass = true;\n\
      }\n\
    }(1));\n\
\n\
    /**\n\
     * By default, the template delimiters used by Lo-Dash are similar to those in\n\
     * embedded Ruby (ERB). Change the following template settings to use alternative\n\
     * delimiters.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @type Object\n\
     */\n\
    lodash.templateSettings = {\n\
\n\
      /**\n\
       * Used to detect `data` property values to be HTML-escaped.\n\
       *\n\
       * @memberOf _.templateSettings\n\
       * @type RegExp\n\
       */\n\
      'escape': /<%-([\\s\\S]+?)%>/g,\n\
\n\
      /**\n\
       * Used to detect code to be evaluated.\n\
       *\n\
       * @memberOf _.templateSettings\n\
       * @type RegExp\n\
       */\n\
      'evaluate': /<%([\\s\\S]+?)%>/g,\n\
\n\
      /**\n\
       * Used to detect `data` property values to inject.\n\
       *\n\
       * @memberOf _.templateSettings\n\
       * @type RegExp\n\
       */\n\
      'interpolate': reInterpolate,\n\
\n\
      /**\n\
       * Used to reference the data object in the template text.\n\
       *\n\
       * @memberOf _.templateSettings\n\
       * @type string\n\
       */\n\
      'variable': '',\n\
\n\
      /**\n\
       * Used to import variables into the compiled template.\n\
       *\n\
       * @memberOf _.templateSettings\n\
       * @type Object\n\
       */\n\
      'imports': {\n\
\n\
        /**\n\
         * A reference to the `lodash` function.\n\
         *\n\
         * @memberOf _.templateSettings.imports\n\
         * @type Function\n\
         */\n\
        '_': lodash\n\
      }\n\
    };\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * The template used to create iterator functions.\n\
     *\n\
     * @private\n\
     * @param {Object} data The data object used to populate the text.\n\
     * @returns {string} Returns the interpolated text.\n\
     */\n\
    var iteratorTemplate = function(obj) {\n\
\n\
      var __p = 'var index, iterable = ' +\n\
      (obj.firstArg) +\n\
      ', result = ' +\n\
      (obj.init) +\n\
      ';\\n\
if (!iterable) return result;\\n\
' +\n\
      (obj.top) +\n\
      ';';\n\
       if (obj.array) {\n\
      __p += '\\n\
var length = iterable.length; index = -1;\\n\
if (' +\n\
      (obj.array) +\n\
      ') {  ';\n\
       if (support.unindexedChars) {\n\
      __p += '\\n\
  if (isString(iterable)) {\\n\
    iterable = iterable.split(\\'\\')\\n\
  }  ';\n\
       }\n\
      __p += '\\n\
  while (++index < length) {\\n\
    ' +\n\
      (obj.loop) +\n\
      ';\\n\
  }\\n\
}\\n\
else {  ';\n\
       } else if (support.nonEnumArgs) {\n\
      __p += '\\n\
  var length = iterable.length; index = -1;\\n\
  if (length && isArguments(iterable)) {\\n\
    while (++index < length) {\\n\
      index += \\'\\';\\n\
      ' +\n\
      (obj.loop) +\n\
      ';\\n\
    }\\n\
  } else {  ';\n\
       }\n\
\n\
       if (support.enumPrototypes) {\n\
      __p += '\\n\
  var skipProto = typeof iterable == \\'function\\';\\n\
  ';\n\
       }\n\
\n\
       if (support.enumErrorProps) {\n\
      __p += '\\n\
  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\\n\
  ';\n\
       }\n\
\n\
          var conditions = [];    if (support.enumPrototypes) { conditions.push('!(skipProto && index == \"prototype\")'); }    if (support.enumErrorProps)  { conditions.push('!(skipErrorProps && (index == \"message\" || index == \"name\"))'); }\n\
\n\
       if (obj.useHas && obj.keys) {\n\
      __p += '\\n\
  var ownIndex = -1,\\n\
      ownProps = objectTypes[typeof iterable] && keys(iterable),\\n\
      length = ownProps ? ownProps.length : 0;\\n\
\\n\
  while (++ownIndex < length) {\\n\
    index = ownProps[ownIndex];\\n\
';\n\
          if (conditions.length) {\n\
      __p += '    if (' +\n\
      (conditions.join(' && ')) +\n\
      ') {\\n\
  ';\n\
       }\n\
      __p +=\n\
      (obj.loop) +\n\
      ';    ';\n\
       if (conditions.length) {\n\
      __p += '\\n\
    }';\n\
       }\n\
      __p += '\\n\
  }  ';\n\
       } else {\n\
      __p += '\\n\
  for (index in iterable) {\\n\
';\n\
          if (obj.useHas) { conditions.push(\"hasOwnProperty.call(iterable, index)\"); }    if (conditions.length) {\n\
      __p += '    if (' +\n\
      (conditions.join(' && ')) +\n\
      ') {\\n\
  ';\n\
       }\n\
      __p +=\n\
      (obj.loop) +\n\
      ';    ';\n\
       if (conditions.length) {\n\
      __p += '\\n\
    }';\n\
       }\n\
      __p += '\\n\
  }    ';\n\
       if (support.nonEnumShadows) {\n\
      __p += '\\n\
\\n\
  if (iterable !== objectProto) {\\n\
    var ctor = iterable.constructor,\\n\
        isProto = iterable === (ctor && ctor.prototype),\\n\
        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\\n\
        nonEnum = nonEnumProps[className];\\n\
      ';\n\
       for (k = 0; k < 7; k++) {\n\
      __p += '\\n\
    index = \\'' +\n\
      (obj.shadowedProps[k]) +\n\
      '\\';\\n\
    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))';\n\
              if (!obj.useHas) {\n\
      __p += ' || (!nonEnum[index] && iterable[index] !== objectProto[index])';\n\
       }\n\
      __p += ') {\\n\
      ' +\n\
      (obj.loop) +\n\
      ';\\n\
    }      ';\n\
       }\n\
      __p += '\\n\
  }    ';\n\
       }\n\
\n\
       }\n\
\n\
       if (obj.array || support.nonEnumArgs) {\n\
      __p += '\\n\
}';\n\
       }\n\
      __p +=\n\
      (obj.bottom) +\n\
      ';\\n\
return result';\n\
\n\
      return __p\n\
    };\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * The base implementation of `_.bind` that creates the bound function and\n\
     * sets its meta data.\n\
     *\n\
     * @private\n\
     * @param {Array} bindData The bind data array.\n\
     * @returns {Function} Returns the new bound function.\n\
     */\n\
    function baseBind(bindData) {\n\
      var func = bindData[0],\n\
          partialArgs = bindData[2],\n\
          thisArg = bindData[4];\n\
\n\
      function bound() {\n\
        // `Function#bind` spec\n\
        // http://es5.github.io/#x15.3.4.5\n\
        if (partialArgs) {\n\
          // avoid `arguments` object deoptimizations by using `slice` instead\n\
          // of `Array.prototype.slice.call` and not assigning `arguments` to a\n\
          // variable as a ternary expression\n\
          var args = slice(partialArgs);\n\
          push.apply(args, arguments);\n\
        }\n\
        // mimic the constructor's `return` behavior\n\
        // http://es5.github.io/#x13.2.2\n\
        if (this instanceof bound) {\n\
          // ensure `new bound` is an instance of `func`\n\
          var thisBinding = baseCreate(func.prototype),\n\
              result = func.apply(thisBinding, args || arguments);\n\
          return isObject(result) ? result : thisBinding;\n\
        }\n\
        return func.apply(thisArg, args || arguments);\n\
      }\n\
      setBindData(bound, bindData);\n\
      return bound;\n\
    }\n\
\n\
    /**\n\
     * The base implementation of `_.clone` without argument juggling or support\n\
     * for `thisArg` binding.\n\
     *\n\
     * @private\n\
     * @param {*} value The value to clone.\n\
     * @param {boolean} [isDeep=false] Specify a deep clone.\n\
     * @param {Function} [callback] The function to customize cloning values.\n\
     * @param {Array} [stackA=[]] Tracks traversed source objects.\n\
     * @param {Array} [stackB=[]] Associates clones with source counterparts.\n\
     * @returns {*} Returns the cloned value.\n\
     */\n\
    function baseClone(value, isDeep, callback, stackA, stackB) {\n\
      if (callback) {\n\
        var result = callback(value);\n\
        if (typeof result != 'undefined') {\n\
          return result;\n\
        }\n\
      }\n\
      // inspect [[Class]]\n\
      var isObj = isObject(value);\n\
      if (isObj) {\n\
        var className = toString.call(value);\n\
        if (!cloneableClasses[className] || (!support.nodeClass && isNode(value))) {\n\
          return value;\n\
        }\n\
        var ctor = ctorByClass[className];\n\
        switch (className) {\n\
          case boolClass:\n\
          case dateClass:\n\
            return new ctor(+value);\n\
\n\
          case numberClass:\n\
          case stringClass:\n\
            return new ctor(value);\n\
\n\
          case regexpClass:\n\
            result = ctor(value.source, reFlags.exec(value));\n\
            result.lastIndex = value.lastIndex;\n\
            return result;\n\
        }\n\
      } else {\n\
        return value;\n\
      }\n\
      var isArr = isArray(value);\n\
      if (isDeep) {\n\
        // check for circular references and return corresponding clone\n\
        var initedStack = !stackA;\n\
        stackA || (stackA = getArray());\n\
        stackB || (stackB = getArray());\n\
\n\
        var length = stackA.length;\n\
        while (length--) {\n\
          if (stackA[length] == value) {\n\
            return stackB[length];\n\
          }\n\
        }\n\
        result = isArr ? ctor(value.length) : {};\n\
      }\n\
      else {\n\
        result = isArr ? slice(value) : assign({}, value);\n\
      }\n\
      // add array properties assigned by `RegExp#exec`\n\
      if (isArr) {\n\
        if (hasOwnProperty.call(value, 'index')) {\n\
          result.index = value.index;\n\
        }\n\
        if (hasOwnProperty.call(value, 'input')) {\n\
          result.input = value.input;\n\
        }\n\
      }\n\
      // exit for shallow clone\n\
      if (!isDeep) {\n\
        return result;\n\
      }\n\
      // add the source value to the stack of traversed objects\n\
      // and associate it with its clone\n\
      stackA.push(value);\n\
      stackB.push(result);\n\
\n\
      // recursively populate clone (susceptible to call stack limits)\n\
      (isArr ? baseEach : forOwn)(value, function(objValue, key) {\n\
        result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);\n\
      });\n\
\n\
      if (initedStack) {\n\
        releaseArray(stackA);\n\
        releaseArray(stackB);\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * The base implementation of `_.create` without support for assigning\n\
     * properties to the created object.\n\
     *\n\
     * @private\n\
     * @param {Object} prototype The object to inherit from.\n\
     * @returns {Object} Returns the new object.\n\
     */\n\
    function baseCreate(prototype, properties) {\n\
      return isObject(prototype) ? nativeCreate(prototype) : {};\n\
    }\n\
    // fallback for browsers without `Object.create`\n\
    if (!nativeCreate) {\n\
      baseCreate = (function() {\n\
        function Object() {}\n\
        return function(prototype) {\n\
          if (isObject(prototype)) {\n\
            Object.prototype = prototype;\n\
            var result = new Object;\n\
            Object.prototype = null;\n\
          }\n\
          return result || context.Object();\n\
        };\n\
      }());\n\
    }\n\
\n\
    /**\n\
     * The base implementation of `_.createCallback` without support for creating\n\
     * \"_.pluck\" or \"_.where\" style callbacks.\n\
     *\n\
     * @private\n\
     * @param {*} [func=identity] The value to convert to a callback.\n\
     * @param {*} [thisArg] The `this` binding of the created callback.\n\
     * @param {number} [argCount] The number of arguments the callback accepts.\n\
     * @returns {Function} Returns a callback function.\n\
     */\n\
    function baseCreateCallback(func, thisArg, argCount) {\n\
      if (typeof func != 'function') {\n\
        return identity;\n\
      }\n\
      // exit early for no `thisArg` or already bound by `Function#bind`\n\
      if (typeof thisArg == 'undefined' || !('prototype' in func)) {\n\
        return func;\n\
      }\n\
      var bindData = func.__bindData__;\n\
      if (typeof bindData == 'undefined') {\n\
        if (support.funcNames) {\n\
          bindData = !func.name;\n\
        }\n\
        bindData = bindData || !support.funcDecomp;\n\
        if (!bindData) {\n\
          var source = fnToString.call(func);\n\
          if (!support.funcNames) {\n\
            bindData = !reFuncName.test(source);\n\
          }\n\
          if (!bindData) {\n\
            // checks if `func` references the `this` keyword and stores the result\n\
            bindData = reThis.test(source);\n\
            setBindData(func, bindData);\n\
          }\n\
        }\n\
      }\n\
      // exit early if there are no `this` references or `func` is bound\n\
      if (bindData === false || (bindData !== true && bindData[1] & 1)) {\n\
        return func;\n\
      }\n\
      switch (argCount) {\n\
        case 1: return function(value) {\n\
          return func.call(thisArg, value);\n\
        };\n\
        case 2: return function(a, b) {\n\
          return func.call(thisArg, a, b);\n\
        };\n\
        case 3: return function(value, index, collection) {\n\
          return func.call(thisArg, value, index, collection);\n\
        };\n\
        case 4: return function(accumulator, value, index, collection) {\n\
          return func.call(thisArg, accumulator, value, index, collection);\n\
        };\n\
      }\n\
      return bind(func, thisArg);\n\
    }\n\
\n\
    /**\n\
     * The base implementation of `createWrapper` that creates the wrapper and\n\
     * sets its meta data.\n\
     *\n\
     * @private\n\
     * @param {Array} bindData The bind data array.\n\
     * @returns {Function} Returns the new function.\n\
     */\n\
    function baseCreateWrapper(bindData) {\n\
      var func = bindData[0],\n\
          bitmask = bindData[1],\n\
          partialArgs = bindData[2],\n\
          partialRightArgs = bindData[3],\n\
          thisArg = bindData[4],\n\
          arity = bindData[5];\n\
\n\
      var isBind = bitmask & 1,\n\
          isBindKey = bitmask & 2,\n\
          isCurry = bitmask & 4,\n\
          isCurryBound = bitmask & 8,\n\
          key = func;\n\
\n\
      function bound() {\n\
        var thisBinding = isBind ? thisArg : this;\n\
        if (partialArgs) {\n\
          var args = slice(partialArgs);\n\
          push.apply(args, arguments);\n\
        }\n\
        if (partialRightArgs || isCurry) {\n\
          args || (args = slice(arguments));\n\
          if (partialRightArgs) {\n\
            push.apply(args, partialRightArgs);\n\
          }\n\
          if (isCurry && args.length < arity) {\n\
            bitmask |= 16 & ~32;\n\
            return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);\n\
          }\n\
        }\n\
        args || (args = arguments);\n\
        if (isBindKey) {\n\
          func = thisBinding[key];\n\
        }\n\
        if (this instanceof bound) {\n\
          thisBinding = baseCreate(func.prototype);\n\
          var result = func.apply(thisBinding, args);\n\
          return isObject(result) ? result : thisBinding;\n\
        }\n\
        return func.apply(thisBinding, args);\n\
      }\n\
      setBindData(bound, bindData);\n\
      return bound;\n\
    }\n\
\n\
    /**\n\
     * The base implementation of `_.difference` that accepts a single array\n\
     * of values to exclude.\n\
     *\n\
     * @private\n\
     * @param {Array} array The array to process.\n\
     * @param {Array} [values] The array of values to exclude.\n\
     * @returns {Array} Returns a new array of filtered values.\n\
     */\n\
    function baseDifference(array, values) {\n\
      var index = -1,\n\
          indexOf = getIndexOf(),\n\
          length = array ? array.length : 0,\n\
          isLarge = length >= largeArraySize && indexOf === baseIndexOf,\n\
          result = [];\n\
\n\
      if (isLarge) {\n\
        var cache = createCache(values);\n\
        if (cache) {\n\
          indexOf = cacheIndexOf;\n\
          values = cache;\n\
        } else {\n\
          isLarge = false;\n\
        }\n\
      }\n\
      while (++index < length) {\n\
        var value = array[index];\n\
        if (indexOf(values, value) < 0) {\n\
          result.push(value);\n\
        }\n\
      }\n\
      if (isLarge) {\n\
        releaseObject(values);\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * The base implementation of `_.flatten` without support for callback\n\
     * shorthands or `thisArg` binding.\n\
     *\n\
     * @private\n\
     * @param {Array} array The array to flatten.\n\
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.\n\
     * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.\n\
     * @param {number} [fromIndex=0] The index to start from.\n\
     * @returns {Array} Returns a new flattened array.\n\
     */\n\
    function baseFlatten(array, isShallow, isStrict, fromIndex) {\n\
      var index = (fromIndex || 0) - 1,\n\
          length = array ? array.length : 0,\n\
          result = [];\n\
\n\
      while (++index < length) {\n\
        var value = array[index];\n\
\n\
        if (value && typeof value == 'object' && typeof value.length == 'number'\n\
            && (isArray(value) || isArguments(value))) {\n\
          // recursively flatten arrays (susceptible to call stack limits)\n\
          if (!isShallow) {\n\
            value = baseFlatten(value, isShallow, isStrict);\n\
          }\n\
          var valIndex = -1,\n\
              valLength = value.length,\n\
              resIndex = result.length;\n\
\n\
          result.length += valLength;\n\
          while (++valIndex < valLength) {\n\
            result[resIndex++] = value[valIndex];\n\
          }\n\
        } else if (!isStrict) {\n\
          result.push(value);\n\
        }\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * The base implementation of `_.isEqual`, without support for `thisArg` binding,\n\
     * that allows partial \"_.where\" style comparisons.\n\
     *\n\
     * @private\n\
     * @param {*} a The value to compare.\n\
     * @param {*} b The other value to compare.\n\
     * @param {Function} [callback] The function to customize comparing values.\n\
     * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.\n\
     * @param {Array} [stackA=[]] Tracks traversed `a` objects.\n\
     * @param {Array} [stackB=[]] Tracks traversed `b` objects.\n\
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n\
     */\n\
    function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {\n\
      // used to indicate that when comparing objects, `a` has at least the properties of `b`\n\
      if (callback) {\n\
        var result = callback(a, b);\n\
        if (typeof result != 'undefined') {\n\
          return !!result;\n\
        }\n\
      }\n\
      // exit early for identical values\n\
      if (a === b) {\n\
        // treat `+0` vs. `-0` as not equal\n\
        return a !== 0 || (1 / a == 1 / b);\n\
      }\n\
      var type = typeof a,\n\
          otherType = typeof b;\n\
\n\
      // exit early for unlike primitive values\n\
      if (a === a &&\n\
          !(a && objectTypes[type]) &&\n\
          !(b && objectTypes[otherType])) {\n\
        return false;\n\
      }\n\
      // exit early for `null` and `undefined` avoiding ES3's Function#call behavior\n\
      // http://es5.github.io/#x15.3.4.4\n\
      if (a == null || b == null) {\n\
        return a === b;\n\
      }\n\
      // compare [[Class]] names\n\
      var className = toString.call(a),\n\
          otherClass = toString.call(b);\n\
\n\
      if (className == argsClass) {\n\
        className = objectClass;\n\
      }\n\
      if (otherClass == argsClass) {\n\
        otherClass = objectClass;\n\
      }\n\
      if (className != otherClass) {\n\
        return false;\n\
      }\n\
      switch (className) {\n\
        case boolClass:\n\
        case dateClass:\n\
          // coerce dates and booleans to numbers, dates to milliseconds and booleans\n\
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal\n\
          return +a == +b;\n\
\n\
        case numberClass:\n\
          // treat `NaN` vs. `NaN` as equal\n\
          return (a != +a)\n\
            ? b != +b\n\
            // but treat `+0` vs. `-0` as not equal\n\
            : (a == 0 ? (1 / a == 1 / b) : a == +b);\n\
\n\
        case regexpClass:\n\
        case stringClass:\n\
          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)\n\
          // treat string primitives and their corresponding object instances as equal\n\
          return a == String(b);\n\
      }\n\
      var isArr = className == arrayClass;\n\
      if (!isArr) {\n\
        // unwrap any `lodash` wrapped values\n\
        var aWrapped = hasOwnProperty.call(a, '__wrapped__'),\n\
            bWrapped = hasOwnProperty.call(b, '__wrapped__');\n\
\n\
        if (aWrapped || bWrapped) {\n\
          return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);\n\
        }\n\
        // exit for functions and DOM nodes\n\
        if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {\n\
          return false;\n\
        }\n\
        // in older versions of Opera, `arguments` objects have `Array` constructors\n\
        var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,\n\
            ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;\n\
\n\
        // non `Object` object instances with different constructors are not equal\n\
        if (ctorA != ctorB &&\n\
              !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&\n\
              ('constructor' in a && 'constructor' in b)\n\
            ) {\n\
          return false;\n\
        }\n\
      }\n\
      // assume cyclic structures are equal\n\
      // the algorithm for detecting cyclic structures is adapted from ES 5.1\n\
      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)\n\
      var initedStack = !stackA;\n\
      stackA || (stackA = getArray());\n\
      stackB || (stackB = getArray());\n\
\n\
      var length = stackA.length;\n\
      while (length--) {\n\
        if (stackA[length] == a) {\n\
          return stackB[length] == b;\n\
        }\n\
      }\n\
      var size = 0;\n\
      result = true;\n\
\n\
      // add `a` and `b` to the stack of traversed objects\n\
      stackA.push(a);\n\
      stackB.push(b);\n\
\n\
      // recursively compare objects and arrays (susceptible to call stack limits)\n\
      if (isArr) {\n\
        // compare lengths to determine if a deep comparison is necessary\n\
        length = a.length;\n\
        size = b.length;\n\
        result = size == length;\n\
\n\
        if (result || isWhere) {\n\
          // deep compare the contents, ignoring non-numeric properties\n\
          while (size--) {\n\
            var index = length,\n\
                value = b[size];\n\
\n\
            if (isWhere) {\n\
              while (index--) {\n\
                if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {\n\
                  break;\n\
                }\n\
              }\n\
            } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {\n\
              break;\n\
            }\n\
          }\n\
        }\n\
      }\n\
      else {\n\
        // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`\n\
        // which, in this case, is more costly\n\
        forIn(b, function(value, key, b) {\n\
          if (hasOwnProperty.call(b, key)) {\n\
            // count the number of properties.\n\
            size++;\n\
            // deep compare each property value.\n\
            return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));\n\
          }\n\
        });\n\
\n\
        if (result && !isWhere) {\n\
          // ensure both objects have the same number of properties\n\
          forIn(a, function(value, key, a) {\n\
            if (hasOwnProperty.call(a, key)) {\n\
              // `size` will be `-1` if `a` has more properties than `b`\n\
              return (result = --size > -1);\n\
            }\n\
          });\n\
        }\n\
      }\n\
      stackA.pop();\n\
      stackB.pop();\n\
\n\
      if (initedStack) {\n\
        releaseArray(stackA);\n\
        releaseArray(stackB);\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * The base implementation of `_.merge` without argument juggling or support\n\
     * for `thisArg` binding.\n\
     *\n\
     * @private\n\
     * @param {Object} object The destination object.\n\
     * @param {Object} source The source object.\n\
     * @param {Function} [callback] The function to customize merging properties.\n\
     * @param {Array} [stackA=[]] Tracks traversed source objects.\n\
     * @param {Array} [stackB=[]] Associates values with source counterparts.\n\
     */\n\
    function baseMerge(object, source, callback, stackA, stackB) {\n\
      (isArray(source) ? forEach : forOwn)(source, function(source, key) {\n\
        var found,\n\
            isArr,\n\
            result = source,\n\
            value = object[key];\n\
\n\
        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {\n\
          // avoid merging previously merged cyclic sources\n\
          var stackLength = stackA.length;\n\
          while (stackLength--) {\n\
            if ((found = stackA[stackLength] == source)) {\n\
              value = stackB[stackLength];\n\
              break;\n\
            }\n\
          }\n\
          if (!found) {\n\
            var isShallow;\n\
            if (callback) {\n\
              result = callback(value, source);\n\
              if ((isShallow = typeof result != 'undefined')) {\n\
                value = result;\n\
              }\n\
            }\n\
            if (!isShallow) {\n\
              value = isArr\n\
                ? (isArray(value) ? value : [])\n\
                : (isPlainObject(value) ? value : {});\n\
            }\n\
            // add `source` and associated `value` to the stack of traversed objects\n\
            stackA.push(source);\n\
            stackB.push(value);\n\
\n\
            // recursively merge objects and arrays (susceptible to call stack limits)\n\
            if (!isShallow) {\n\
              baseMerge(value, source, callback, stackA, stackB);\n\
            }\n\
          }\n\
        }\n\
        else {\n\
          if (callback) {\n\
            result = callback(value, source);\n\
            if (typeof result == 'undefined') {\n\
              result = source;\n\
            }\n\
          }\n\
          if (typeof result != 'undefined') {\n\
            value = result;\n\
          }\n\
        }\n\
        object[key] = value;\n\
      });\n\
    }\n\
\n\
    /**\n\
     * The base implementation of `_.random` without argument juggling or support\n\
     * for returning floating-point numbers.\n\
     *\n\
     * @private\n\
     * @param {number} min The minimum possible value.\n\
     * @param {number} max The maximum possible value.\n\
     * @returns {number} Returns a random number.\n\
     */\n\
    function baseRandom(min, max) {\n\
      return min + floor(nativeRandom() * (max - min + 1));\n\
    }\n\
\n\
    /**\n\
     * The base implementation of `_.uniq` without support for callback shorthands\n\
     * or `thisArg` binding.\n\
     *\n\
     * @private\n\
     * @param {Array} array The array to process.\n\
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.\n\
     * @param {Function} [callback] The function called per iteration.\n\
     * @returns {Array} Returns a duplicate-value-free array.\n\
     */\n\
    function baseUniq(array, isSorted, callback) {\n\
      var index = -1,\n\
          indexOf = getIndexOf(),\n\
          length = array ? array.length : 0,\n\
          result = [];\n\
\n\
      var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,\n\
          seen = (callback || isLarge) ? getArray() : result;\n\
\n\
      if (isLarge) {\n\
        var cache = createCache(seen);\n\
        indexOf = cacheIndexOf;\n\
        seen = cache;\n\
      }\n\
      while (++index < length) {\n\
        var value = array[index],\n\
            computed = callback ? callback(value, index, array) : value;\n\
\n\
        if (isSorted\n\
              ? !index || seen[seen.length - 1] !== computed\n\
              : indexOf(seen, computed) < 0\n\
            ) {\n\
          if (callback || isLarge) {\n\
            seen.push(computed);\n\
          }\n\
          result.push(value);\n\
        }\n\
      }\n\
      if (isLarge) {\n\
        releaseArray(seen.array);\n\
        releaseObject(seen);\n\
      } else if (callback) {\n\
        releaseArray(seen);\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Creates a function that aggregates a collection, creating an object composed\n\
     * of keys generated from the results of running each element of the collection\n\
     * through a callback. The given `setter` function sets the keys and values\n\
     * of the composed object.\n\
     *\n\
     * @private\n\
     * @param {Function} setter The setter function.\n\
     * @returns {Function} Returns the new aggregator function.\n\
     */\n\
    function createAggregator(setter) {\n\
      return function(collection, callback, thisArg) {\n\
        var result = {};\n\
        callback = lodash.createCallback(callback, thisArg, 3);\n\
\n\
        if (isArray(collection)) {\n\
          var index = -1,\n\
              length = collection.length;\n\
\n\
          while (++index < length) {\n\
            var value = collection[index];\n\
            setter(result, value, callback(value, index, collection), collection);\n\
          }\n\
        } else {\n\
          baseEach(collection, function(value, key, collection) {\n\
            setter(result, value, callback(value, key, collection), collection);\n\
          });\n\
        }\n\
        return result;\n\
      };\n\
    }\n\
\n\
    /**\n\
     * Creates a function that, when called, either curries or invokes `func`\n\
     * with an optional `this` binding and partially applied arguments.\n\
     *\n\
     * @private\n\
     * @param {Function|string} func The function or method name to reference.\n\
     * @param {number} bitmask The bitmask of method flags to compose.\n\
     *  The bitmask may be composed of the following flags:\n\
     *  1 - `_.bind`\n\
     *  2 - `_.bindKey`\n\
     *  4 - `_.curry`\n\
     *  8 - `_.curry` (bound)\n\
     *  16 - `_.partial`\n\
     *  32 - `_.partialRight`\n\
     * @param {Array} [partialArgs] An array of arguments to prepend to those\n\
     *  provided to the new function.\n\
     * @param {Array} [partialRightArgs] An array of arguments to append to those\n\
     *  provided to the new function.\n\
     * @param {*} [thisArg] The `this` binding of `func`.\n\
     * @param {number} [arity] The arity of `func`.\n\
     * @returns {Function} Returns the new function.\n\
     */\n\
    function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {\n\
      var isBind = bitmask & 1,\n\
          isBindKey = bitmask & 2,\n\
          isCurry = bitmask & 4,\n\
          isCurryBound = bitmask & 8,\n\
          isPartial = bitmask & 16,\n\
          isPartialRight = bitmask & 32;\n\
\n\
      if (!isBindKey && !isFunction(func)) {\n\
        throw new TypeError;\n\
      }\n\
      if (isPartial && !partialArgs.length) {\n\
        bitmask &= ~16;\n\
        isPartial = partialArgs = false;\n\
      }\n\
      if (isPartialRight && !partialRightArgs.length) {\n\
        bitmask &= ~32;\n\
        isPartialRight = partialRightArgs = false;\n\
      }\n\
      var bindData = func && func.__bindData__;\n\
      if (bindData && bindData !== true) {\n\
        // clone `bindData`\n\
        bindData = slice(bindData);\n\
        if (bindData[2]) {\n\
          bindData[2] = slice(bindData[2]);\n\
        }\n\
        if (bindData[3]) {\n\
          bindData[3] = slice(bindData[3]);\n\
        }\n\
        // set `thisBinding` is not previously bound\n\
        if (isBind && !(bindData[1] & 1)) {\n\
          bindData[4] = thisArg;\n\
        }\n\
        // set if previously bound but not currently (subsequent curried functions)\n\
        if (!isBind && bindData[1] & 1) {\n\
          bitmask |= 8;\n\
        }\n\
        // set curried arity if not yet set\n\
        if (isCurry && !(bindData[1] & 4)) {\n\
          bindData[5] = arity;\n\
        }\n\
        // append partial left arguments\n\
        if (isPartial) {\n\
          push.apply(bindData[2] || (bindData[2] = []), partialArgs);\n\
        }\n\
        // append partial right arguments\n\
        if (isPartialRight) {\n\
          unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);\n\
        }\n\
        // merge flags\n\
        bindData[1] |= bitmask;\n\
        return createWrapper.apply(null, bindData);\n\
      }\n\
      // fast path for `_.bind`\n\
      var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;\n\
      return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);\n\
    }\n\
\n\
    /**\n\
     * Creates compiled iteration functions.\n\
     *\n\
     * @private\n\
     * @param {...Object} [options] The compile options object(s).\n\
     * @param {string} [options.array] Code to determine if the iterable is an array or array-like.\n\
     * @param {boolean} [options.useHas] Specify using `hasOwnProperty` checks in the object loop.\n\
     * @param {Function} [options.keys] A reference to `_.keys` for use in own property iteration.\n\
     * @param {string} [options.args] A comma separated string of iteration function arguments.\n\
     * @param {string} [options.top] Code to execute before the iteration branches.\n\
     * @param {string} [options.loop] Code to execute in the object loop.\n\
     * @param {string} [options.bottom] Code to execute after the iteration branches.\n\
     * @returns {Function} Returns the compiled function.\n\
     */\n\
    function createIterator() {\n\
      // data properties\n\
      iteratorData.shadowedProps = shadowedProps;\n\
\n\
      // iterator options\n\
      iteratorData.array = iteratorData.bottom = iteratorData.loop = iteratorData.top = '';\n\
      iteratorData.init = 'iterable';\n\
      iteratorData.useHas = true;\n\
\n\
      // merge options into a template data object\n\
      for (var object, index = 0; object = arguments[index]; index++) {\n\
        for (var key in object) {\n\
          iteratorData[key] = object[key];\n\
        }\n\
      }\n\
      var args = iteratorData.args;\n\
      iteratorData.firstArg = /^[^,]+/.exec(args)[0];\n\
\n\
      // create the function factory\n\
      var factory = Function(\n\
          'baseCreateCallback, errorClass, errorProto, hasOwnProperty, ' +\n\
          'indicatorObject, isArguments, isArray, isString, keys, objectProto, ' +\n\
          'objectTypes, nonEnumProps, stringClass, stringProto, toString',\n\
        'return function(' + args + ') {\\n\
' + iteratorTemplate(iteratorData) + '\\n\
}'\n\
      );\n\
\n\
      // return the compiled function\n\
      return factory(\n\
        baseCreateCallback, errorClass, errorProto, hasOwnProperty,\n\
        indicatorObject, isArguments, isArray, isString, iteratorData.keys, objectProto,\n\
        objectTypes, nonEnumProps, stringClass, stringProto, toString\n\
      );\n\
    }\n\
\n\
    /**\n\
     * Used by `escape` to convert characters to HTML entities.\n\
     *\n\
     * @private\n\
     * @param {string} match The matched character to escape.\n\
     * @returns {string} Returns the escaped character.\n\
     */\n\
    function escapeHtmlChar(match) {\n\
      return htmlEscapes[match];\n\
    }\n\
\n\
    /**\n\
     * Gets the appropriate \"indexOf\" function. If the `_.indexOf` method is\n\
     * customized, this method returns the custom method, otherwise it returns\n\
     * the `baseIndexOf` function.\n\
     *\n\
     * @private\n\
     * @returns {Function} Returns the \"indexOf\" function.\n\
     */\n\
    function getIndexOf() {\n\
      var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is a native function.\n\
     *\n\
     * @private\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.\n\
     */\n\
    function isNative(value) {\n\
      return typeof value == 'function' && reNative.test(value);\n\
    }\n\
\n\
    /**\n\
     * Sets `this` binding data on a given function.\n\
     *\n\
     * @private\n\
     * @param {Function} func The function to set data on.\n\
     * @param {Array} value The data array to set.\n\
     */\n\
    var setBindData = !defineProperty ? noop : function(func, value) {\n\
      descriptor.value = value;\n\
      defineProperty(func, '__bindData__', descriptor);\n\
    };\n\
\n\
    /**\n\
     * A fallback implementation of `isPlainObject` which checks if a given value\n\
     * is an object created by the `Object` constructor, assuming objects created\n\
     * by the `Object` constructor have no inherited enumerable properties and that\n\
     * there are no `Object.prototype` extensions.\n\
     *\n\
     * @private\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.\n\
     */\n\
    function shimIsPlainObject(value) {\n\
      var ctor,\n\
          result;\n\
\n\
      // avoid non Object objects, `arguments` objects, and DOM elements\n\
      if (!(value && toString.call(value) == objectClass) ||\n\
          (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor)) ||\n\
          (!support.argsClass && isArguments(value)) ||\n\
          (!support.nodeClass && isNode(value))) {\n\
        return false;\n\
      }\n\
      // IE < 9 iterates inherited properties before own properties. If the first\n\
      // iterated property is an object's own property then there are no inherited\n\
      // enumerable properties.\n\
      if (support.ownLast) {\n\
        forIn(value, function(value, key, object) {\n\
          result = hasOwnProperty.call(object, key);\n\
          return false;\n\
        });\n\
        return result !== false;\n\
      }\n\
      // In most environments an object's own properties are iterated before\n\
      // its inherited properties. If the last iterated property is an object's\n\
      // own property then there are no inherited enumerable properties.\n\
      forIn(value, function(value, key) {\n\
        result = key;\n\
      });\n\
      return typeof result == 'undefined' || hasOwnProperty.call(value, result);\n\
    }\n\
\n\
    /**\n\
     * Used by `unescape` to convert HTML entities to characters.\n\
     *\n\
     * @private\n\
     * @param {string} match The matched character to unescape.\n\
     * @returns {string} Returns the unescaped character.\n\
     */\n\
    function unescapeHtmlChar(match) {\n\
      return htmlUnescapes[match];\n\
    }\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * Checks if `value` is an `arguments` object.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.\n\
     * @example\n\
     *\n\
     * (function() { return _.isArguments(arguments); })(1, 2, 3);\n\
     * // => true\n\
     *\n\
     * _.isArguments([1, 2, 3]);\n\
     * // => false\n\
     */\n\
    function isArguments(value) {\n\
      return value && typeof value == 'object' && typeof value.length == 'number' &&\n\
        toString.call(value) == argsClass || false;\n\
    }\n\
    // fallback for browsers that can't detect `arguments` objects by [[Class]]\n\
    if (!support.argsClass) {\n\
      isArguments = function(value) {\n\
        return value && typeof value == 'object' && typeof value.length == 'number' &&\n\
          hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee') || false;\n\
      };\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is an array.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @type Function\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is an array, else `false`.\n\
     * @example\n\
     *\n\
     * (function() { return _.isArray(arguments); })();\n\
     * // => false\n\
     *\n\
     * _.isArray([1, 2, 3]);\n\
     * // => true\n\
     */\n\
    var isArray = nativeIsArray || function(value) {\n\
      return value && typeof value == 'object' && typeof value.length == 'number' &&\n\
        toString.call(value) == arrayClass || false;\n\
    };\n\
\n\
    /**\n\
     * A fallback implementation of `Object.keys` which produces an array of the\n\
     * given object's own enumerable property names.\n\
     *\n\
     * @private\n\
     * @type Function\n\
     * @param {Object} object The object to inspect.\n\
     * @returns {Array} Returns an array of property names.\n\
     */\n\
    var shimKeys = createIterator({\n\
      'args': 'object',\n\
      'init': '[]',\n\
      'top': 'if (!(objectTypes[typeof object])) return result',\n\
      'loop': 'result.push(index)'\n\
    });\n\
\n\
    /**\n\
     * Creates an array composed of the own enumerable property names of an object.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The object to inspect.\n\
     * @returns {Array} Returns an array of property names.\n\
     * @example\n\
     *\n\
     * _.keys({ 'one': 1, 'two': 2, 'three': 3 });\n\
     * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)\n\
     */\n\
    var keys = !nativeKeys ? shimKeys : function(object) {\n\
      if (!isObject(object)) {\n\
        return [];\n\
      }\n\
      if ((support.enumPrototypes && typeof object == 'function') ||\n\
          (support.nonEnumArgs && object.length && isArguments(object))) {\n\
        return shimKeys(object);\n\
      }\n\
      return nativeKeys(object);\n\
    };\n\
\n\
    /** Reusable iterator options shared by `each`, `forIn`, and `forOwn` */\n\
    var eachIteratorOptions = {\n\
      'args': 'collection, callback, thisArg',\n\
      'top': \"callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)\",\n\
      'array': \"typeof length == 'number'\",\n\
      'keys': keys,\n\
      'loop': 'if (callback(iterable[index], index, collection) === false) return result'\n\
    };\n\
\n\
    /** Reusable iterator options for `assign` and `defaults` */\n\
    var defaultsIteratorOptions = {\n\
      'args': 'object, source, guard',\n\
      'top':\n\
        'var args = arguments,\\n\
' +\n\
        '    argsIndex = 0,\\n\
' +\n\
        \"    argsLength = typeof guard == 'number' ? 2 : args.length;\\n\
\" +\n\
        'while (++argsIndex < argsLength) {\\n\
' +\n\
        '  iterable = args[argsIndex];\\n\
' +\n\
        '  if (iterable && objectTypes[typeof iterable]) {',\n\
      'keys': keys,\n\
      'loop': \"if (typeof result[index] == 'undefined') result[index] = iterable[index]\",\n\
      'bottom': '  }\\n\
}'\n\
    };\n\
\n\
    /** Reusable iterator options for `forIn` and `forOwn` */\n\
    var forOwnIteratorOptions = {\n\
      'top': 'if (!objectTypes[typeof iterable]) return result;\\n\
' + eachIteratorOptions.top,\n\
      'array': false\n\
    };\n\
\n\
    /**\n\
     * Used to convert characters to HTML entities:\n\
     *\n\
     * Though the `>` character is escaped for symmetry, characters like `>` and `/`\n\
     * don't require escaping in HTML and have no special meaning unless they're part\n\
     * of a tag or an unquoted attribute value.\n\
     * http://mathiasbynens.be/notes/ambiguous-ampersands (under \"semi-related fun fact\")\n\
     */\n\
    var htmlEscapes = {\n\
      '&': '&amp;',\n\
      '<': '&lt;',\n\
      '>': '&gt;',\n\
      '\"': '&quot;',\n\
      \"'\": '&#39;'\n\
    };\n\
\n\
    /** Used to convert HTML entities to characters */\n\
    var htmlUnescapes = invert(htmlEscapes);\n\
\n\
    /** Used to match HTML entities and HTML characters */\n\
    var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),\n\
        reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');\n\
\n\
    /**\n\
     * A function compiled to iterate `arguments` objects, arrays, objects, and\n\
     * strings consistenly across environments, executing the callback for each\n\
     * element in the collection. The callback is bound to `thisArg` and invoked\n\
     * with three arguments; (value, index|key, collection). Callbacks may exit\n\
     * iteration early by explicitly returning `false`.\n\
     *\n\
     * @private\n\
     * @type Function\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function} [callback=identity] The function called per iteration.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array|Object|string} Returns `collection`.\n\
     */\n\
    var baseEach = createIterator(eachIteratorOptions);\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * Assigns own enumerable properties of source object(s) to the destination\n\
     * object. Subsequent sources will overwrite property assignments of previous\n\
     * sources. If a callback is provided it will be executed to produce the\n\
     * assigned values. The callback is bound to `thisArg` and invoked with two\n\
     * arguments; (objectValue, sourceValue).\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @type Function\n\
     * @alias extend\n\
     * @category Objects\n\
     * @param {Object} object The destination object.\n\
     * @param {...Object} [source] The source objects.\n\
     * @param {Function} [callback] The function to customize assigning values.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns the destination object.\n\
     * @example\n\
     *\n\
     * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });\n\
     * // => { 'name': 'fred', 'employer': 'slate' }\n\
     *\n\
     * var defaults = _.partialRight(_.assign, function(a, b) {\n\
     *   return typeof a == 'undefined' ? b : a;\n\
     * });\n\
     *\n\
     * var object = { 'name': 'barney' };\n\
     * defaults(object, { 'name': 'fred', 'employer': 'slate' });\n\
     * // => { 'name': 'barney', 'employer': 'slate' }\n\
     */\n\
    var assign = createIterator(defaultsIteratorOptions, {\n\
      'top':\n\
        defaultsIteratorOptions.top.replace(';',\n\
          ';\\n\
' +\n\
          \"if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\\n\
\" +\n\
          '  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\\n\
' +\n\
          \"} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\\n\
\" +\n\
          '  callback = args[--argsLength];\\n\
' +\n\
          '}'\n\
        ),\n\
      'loop': 'result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]'\n\
    });\n\
\n\
    /**\n\
     * Creates a clone of `value`. If `isDeep` is `true` nested objects will also\n\
     * be cloned, otherwise they will be assigned by reference. If a callback\n\
     * is provided it will be executed to produce the cloned values. If the\n\
     * callback returns `undefined` cloning will be handled by the method instead.\n\
     * The callback is bound to `thisArg` and invoked with one argument; (value).\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to clone.\n\
     * @param {boolean} [isDeep=false] Specify a deep clone.\n\
     * @param {Function} [callback] The function to customize cloning values.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the cloned value.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36 },\n\
     *   { 'name': 'fred',   'age': 40 }\n\
     * ];\n\
     *\n\
     * var shallow = _.clone(characters);\n\
     * shallow[0] === characters[0];\n\
     * // => true\n\
     *\n\
     * var deep = _.clone(characters, true);\n\
     * deep[0] === characters[0];\n\
     * // => false\n\
     *\n\
     * _.mixin({\n\
     *   'clone': _.partialRight(_.clone, function(value) {\n\
     *     return _.isElement(value) ? value.cloneNode(false) : undefined;\n\
     *   })\n\
     * });\n\
     *\n\
     * var clone = _.clone(document.body);\n\
     * clone.childNodes.length;\n\
     * // => 0\n\
     */\n\
    function clone(value, isDeep, callback, thisArg) {\n\
      // allows working with \"Collections\" methods without using their `index`\n\
      // and `collection` arguments for `isDeep` and `callback`\n\
      if (typeof isDeep != 'boolean' && isDeep != null) {\n\
        thisArg = callback;\n\
        callback = isDeep;\n\
        isDeep = false;\n\
      }\n\
      return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));\n\
    }\n\
\n\
    /**\n\
     * Creates a deep clone of `value`. If a callback is provided it will be\n\
     * executed to produce the cloned values. If the callback returns `undefined`\n\
     * cloning will be handled by the method instead. The callback is bound to\n\
     * `thisArg` and invoked with one argument; (value).\n\
     *\n\
     * Note: This method is loosely based on the structured clone algorithm. Functions\n\
     * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and\n\
     * objects created by constructors other than `Object` are cloned to plain `Object` objects.\n\
     * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to deep clone.\n\
     * @param {Function} [callback] The function to customize cloning values.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the deep cloned value.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36 },\n\
     *   { 'name': 'fred',   'age': 40 }\n\
     * ];\n\
     *\n\
     * var deep = _.cloneDeep(characters);\n\
     * deep[0] === characters[0];\n\
     * // => false\n\
     *\n\
     * var view = {\n\
     *   'label': 'docs',\n\
     *   'node': element\n\
     * };\n\
     *\n\
     * var clone = _.cloneDeep(view, function(value) {\n\
     *   return _.isElement(value) ? value.cloneNode(true) : undefined;\n\
     * });\n\
     *\n\
     * clone.node == view.node;\n\
     * // => false\n\
     */\n\
    function cloneDeep(value, callback, thisArg) {\n\
      return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));\n\
    }\n\
\n\
    /**\n\
     * Creates an object that inherits from the given `prototype` object. If a\n\
     * `properties` object is provided its own enumerable properties are assigned\n\
     * to the created object.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} prototype The object to inherit from.\n\
     * @param {Object} [properties] The properties to assign to the object.\n\
     * @returns {Object} Returns the new object.\n\
     * @example\n\
     *\n\
     * function Shape() {\n\
     *   this.x = 0;\n\
     *   this.y = 0;\n\
     * }\n\
     *\n\
     * function Circle() {\n\
     *   Shape.call(this);\n\
     * }\n\
     *\n\
     * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });\n\
     *\n\
     * var circle = new Circle;\n\
     * circle instanceof Circle;\n\
     * // => true\n\
     *\n\
     * circle instanceof Shape;\n\
     * // => true\n\
     */\n\
    function create(prototype, properties) {\n\
      var result = baseCreate(prototype);\n\
      return properties ? assign(result, properties) : result;\n\
    }\n\
\n\
    /**\n\
     * Assigns own enumerable properties of source object(s) to the destination\n\
     * object for all destination properties that resolve to `undefined`. Once a\n\
     * property is set, additional defaults of the same property will be ignored.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @type Function\n\
     * @category Objects\n\
     * @param {Object} object The destination object.\n\
     * @param {...Object} [source] The source objects.\n\
     * @param- {Object} [guard] Allows working with `_.reduce` without using its\n\
     *  `key` and `object` arguments as sources.\n\
     * @returns {Object} Returns the destination object.\n\
     * @example\n\
     *\n\
     * var object = { 'name': 'barney' };\n\
     * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });\n\
     * // => { 'name': 'barney', 'employer': 'slate' }\n\
     */\n\
    var defaults = createIterator(defaultsIteratorOptions);\n\
\n\
    /**\n\
     * This method is like `_.findIndex` except that it returns the key of the\n\
     * first element that passes the callback check, instead of the element itself.\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The object to search.\n\
     * @param {Function|Object|string} [callback=identity] The function called per\n\
     *  iteration. If a property name or object is provided it will be used to\n\
     *  create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.\n\
     * @example\n\
     *\n\
     * var characters = {\n\
     *   'barney': {  'age': 36, 'blocked': false },\n\
     *   'fred': {    'age': 40, 'blocked': true },\n\
     *   'pebbles': { 'age': 1,  'blocked': false }\n\
     * };\n\
     *\n\
     * _.findKey(characters, function(chr) {\n\
     *   return chr.age < 40;\n\
     * });\n\
     * // => 'barney' (property order is not guaranteed across environments)\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.findKey(characters, { 'age': 1 });\n\
     * // => 'pebbles'\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.findKey(characters, 'blocked');\n\
     * // => 'fred'\n\
     */\n\
    function findKey(object, callback, thisArg) {\n\
      var result;\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
      forOwn(object, function(value, key, object) {\n\
        if (callback(value, key, object)) {\n\
          result = key;\n\
          return false;\n\
        }\n\
      });\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * This method is like `_.findKey` except that it iterates over elements\n\
     * of a `collection` in the opposite order.\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The object to search.\n\
     * @param {Function|Object|string} [callback=identity] The function called per\n\
     *  iteration. If a property name or object is provided it will be used to\n\
     *  create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {string|undefined} Returns the key of the found element, else `undefined`.\n\
     * @example\n\
     *\n\
     * var characters = {\n\
     *   'barney': {  'age': 36, 'blocked': true },\n\
     *   'fred': {    'age': 40, 'blocked': false },\n\
     *   'pebbles': { 'age': 1,  'blocked': true }\n\
     * };\n\
     *\n\
     * _.findLastKey(characters, function(chr) {\n\
     *   return chr.age < 40;\n\
     * });\n\
     * // => returns `pebbles`, assuming `_.findKey` returns `barney`\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.findLastKey(characters, { 'age': 40 });\n\
     * // => 'fred'\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.findLastKey(characters, 'blocked');\n\
     * // => 'pebbles'\n\
     */\n\
    function findLastKey(object, callback, thisArg) {\n\
      var result;\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
      forOwnRight(object, function(value, key, object) {\n\
        if (callback(value, key, object)) {\n\
          result = key;\n\
          return false;\n\
        }\n\
      });\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Iterates over own and inherited enumerable properties of an object,\n\
     * executing the callback for each property. The callback is bound to `thisArg`\n\
     * and invoked with three arguments; (value, key, object). Callbacks may exit\n\
     * iteration early by explicitly returning `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @type Function\n\
     * @category Objects\n\
     * @param {Object} object The object to iterate over.\n\
     * @param {Function} [callback=identity] The function called per iteration.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns `object`.\n\
     * @example\n\
     *\n\
     * function Shape() {\n\
     *   this.x = 0;\n\
     *   this.y = 0;\n\
     * }\n\
     *\n\
     * Shape.prototype.move = function(x, y) {\n\
     *   this.x += x;\n\
     *   this.y += y;\n\
     * };\n\
     *\n\
     * _.forIn(new Shape, function(value, key) {\n\
     *   console.log(key);\n\
     * });\n\
     * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)\n\
     */\n\
    var forIn = createIterator(eachIteratorOptions, forOwnIteratorOptions, {\n\
      'useHas': false\n\
    });\n\
\n\
    /**\n\
     * This method is like `_.forIn` except that it iterates over elements\n\
     * of a `collection` in the opposite order.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The object to iterate over.\n\
     * @param {Function} [callback=identity] The function called per iteration.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns `object`.\n\
     * @example\n\
     *\n\
     * function Shape() {\n\
     *   this.x = 0;\n\
     *   this.y = 0;\n\
     * }\n\
     *\n\
     * Shape.prototype.move = function(x, y) {\n\
     *   this.x += x;\n\
     *   this.y += y;\n\
     * };\n\
     *\n\
     * _.forInRight(new Shape, function(value, key) {\n\
     *   console.log(key);\n\
     * });\n\
     * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'\n\
     */\n\
    function forInRight(object, callback, thisArg) {\n\
      var pairs = [];\n\
\n\
      forIn(object, function(value, key) {\n\
        pairs.push(key, value);\n\
      });\n\
\n\
      var length = pairs.length;\n\
      callback = baseCreateCallback(callback, thisArg, 3);\n\
      while (length--) {\n\
        if (callback(pairs[length--], pairs[length], object) === false) {\n\
          break;\n\
        }\n\
      }\n\
      return object;\n\
    }\n\
\n\
    /**\n\
     * Iterates over own enumerable properties of an object, executing the callback\n\
     * for each property. The callback is bound to `thisArg` and invoked with three\n\
     * arguments; (value, key, object). Callbacks may exit iteration early by\n\
     * explicitly returning `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @type Function\n\
     * @category Objects\n\
     * @param {Object} object The object to iterate over.\n\
     * @param {Function} [callback=identity] The function called per iteration.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns `object`.\n\
     * @example\n\
     *\n\
     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {\n\
     *   console.log(key);\n\
     * });\n\
     * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)\n\
     */\n\
    var forOwn = createIterator(eachIteratorOptions, forOwnIteratorOptions);\n\
\n\
    /**\n\
     * This method is like `_.forOwn` except that it iterates over elements\n\
     * of a `collection` in the opposite order.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The object to iterate over.\n\
     * @param {Function} [callback=identity] The function called per iteration.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns `object`.\n\
     * @example\n\
     *\n\
     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {\n\
     *   console.log(key);\n\
     * });\n\
     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'\n\
     */\n\
    function forOwnRight(object, callback, thisArg) {\n\
      var props = keys(object),\n\
          length = props.length;\n\
\n\
      callback = baseCreateCallback(callback, thisArg, 3);\n\
      while (length--) {\n\
        var key = props[length];\n\
        if (callback(object[key], key, object) === false) {\n\
          break;\n\
        }\n\
      }\n\
      return object;\n\
    }\n\
\n\
    /**\n\
     * Creates a sorted array of property names of all enumerable properties,\n\
     * own and inherited, of `object` that have function values.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias methods\n\
     * @category Objects\n\
     * @param {Object} object The object to inspect.\n\
     * @returns {Array} Returns an array of property names that have function values.\n\
     * @example\n\
     *\n\
     * _.functions(_);\n\
     * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]\n\
     */\n\
    function functions(object) {\n\
      var result = [];\n\
      forIn(object, function(value, key) {\n\
        if (isFunction(value)) {\n\
          result.push(key);\n\
        }\n\
      });\n\
      return result.sort();\n\
    }\n\
\n\
    /**\n\
     * Checks if the specified property name exists as a direct property of `object`,\n\
     * instead of an inherited property.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The object to inspect.\n\
     * @param {string} key The name of the property to check.\n\
     * @returns {boolean} Returns `true` if key is a direct property, else `false`.\n\
     * @example\n\
     *\n\
     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');\n\
     * // => true\n\
     */\n\
    function has(object, key) {\n\
      return object ? hasOwnProperty.call(object, key) : false;\n\
    }\n\
\n\
    /**\n\
     * Creates an object composed of the inverted keys and values of the given object.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The object to invert.\n\
     * @returns {Object} Returns the created inverted object.\n\
     * @example\n\
     *\n\
     * _.invert({ 'first': 'fred', 'second': 'barney' });\n\
     * // => { 'fred': 'first', 'barney': 'second' }\n\
     */\n\
    function invert(object) {\n\
      var index = -1,\n\
          props = keys(object),\n\
          length = props.length,\n\
          result = {};\n\
\n\
      while (++index < length) {\n\
        var key = props[index];\n\
        result[object[key]] = key;\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is a boolean value.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.\n\
     * @example\n\
     *\n\
     * _.isBoolean(null);\n\
     * // => false\n\
     */\n\
    function isBoolean(value) {\n\
      return value === true || value === false ||\n\
        value && typeof value == 'object' && toString.call(value) == boolClass || false;\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is a date.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is a date, else `false`.\n\
     * @example\n\
     *\n\
     * _.isDate(new Date);\n\
     * // => true\n\
     */\n\
    function isDate(value) {\n\
      return value && typeof value == 'object' && toString.call(value) == dateClass || false;\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is a DOM element.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.\n\
     * @example\n\
     *\n\
     * _.isElement(document.body);\n\
     * // => true\n\
     */\n\
    function isElement(value) {\n\
      return value && value.nodeType === 1 || false;\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a\n\
     * length of `0` and objects with no own enumerable properties are considered\n\
     * \"empty\".\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Array|Object|string} value The value to inspect.\n\
     * @returns {boolean} Returns `true` if the `value` is empty, else `false`.\n\
     * @example\n\
     *\n\
     * _.isEmpty([1, 2, 3]);\n\
     * // => false\n\
     *\n\
     * _.isEmpty({});\n\
     * // => true\n\
     *\n\
     * _.isEmpty('');\n\
     * // => true\n\
     */\n\
    function isEmpty(value) {\n\
      var result = true;\n\
      if (!value) {\n\
        return result;\n\
      }\n\
      var className = toString.call(value),\n\
          length = value.length;\n\
\n\
      if ((className == arrayClass || className == stringClass ||\n\
          (support.argsClass ? className == argsClass : isArguments(value))) ||\n\
          (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {\n\
        return !length;\n\
      }\n\
      forOwn(value, function() {\n\
        return (result = false);\n\
      });\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Performs a deep comparison between two values to determine if they are\n\
     * equivalent to each other. If a callback is provided it will be executed\n\
     * to compare values. If the callback returns `undefined` comparisons will\n\
     * be handled by the method instead. The callback is bound to `thisArg` and\n\
     * invoked with two arguments; (a, b).\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} a The value to compare.\n\
     * @param {*} b The other value to compare.\n\
     * @param {Function} [callback] The function to customize comparing values.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n\
     * @example\n\
     *\n\
     * var object = { 'name': 'fred' };\n\
     * var copy = { 'name': 'fred' };\n\
     *\n\
     * object == copy;\n\
     * // => false\n\
     *\n\
     * _.isEqual(object, copy);\n\
     * // => true\n\
     *\n\
     * var words = ['hello', 'goodbye'];\n\
     * var otherWords = ['hi', 'goodbye'];\n\
     *\n\
     * _.isEqual(words, otherWords, function(a, b) {\n\
     *   var reGreet = /^(?:hello|hi)$/i,\n\
     *       aGreet = _.isString(a) && reGreet.test(a),\n\
     *       bGreet = _.isString(b) && reGreet.test(b);\n\
     *\n\
     *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;\n\
     * });\n\
     * // => true\n\
     */\n\
    function isEqual(a, b, callback, thisArg) {\n\
      return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is, or can be coerced to, a finite number.\n\
     *\n\
     * Note: This is not the same as native `isFinite` which will return true for\n\
     * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is finite, else `false`.\n\
     * @example\n\
     *\n\
     * _.isFinite(-101);\n\
     * // => true\n\
     *\n\
     * _.isFinite('10');\n\
     * // => true\n\
     *\n\
     * _.isFinite(true);\n\
     * // => false\n\
     *\n\
     * _.isFinite('');\n\
     * // => false\n\
     *\n\
     * _.isFinite(Infinity);\n\
     * // => false\n\
     */\n\
    function isFinite(value) {\n\
      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is a function.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is a function, else `false`.\n\
     * @example\n\
     *\n\
     * _.isFunction(_);\n\
     * // => true\n\
     */\n\
    function isFunction(value) {\n\
      return typeof value == 'function';\n\
    }\n\
    // fallback for older versions of Chrome and Safari\n\
    if (isFunction(/x/)) {\n\
      isFunction = function(value) {\n\
        return typeof value == 'function' && toString.call(value) == funcClass;\n\
      };\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is the language type of Object.\n\
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is an object, else `false`.\n\
     * @example\n\
     *\n\
     * _.isObject({});\n\
     * // => true\n\
     *\n\
     * _.isObject([1, 2, 3]);\n\
     * // => true\n\
     *\n\
     * _.isObject(1);\n\
     * // => false\n\
     */\n\
    function isObject(value) {\n\
      // check if the value is the ECMAScript language type of Object\n\
      // http://es5.github.io/#x8\n\
      // and avoid a V8 bug\n\
      // http://code.google.com/p/v8/issues/detail?id=2291\n\
      return !!(value && objectTypes[typeof value]);\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is `NaN`.\n\
     *\n\
     * Note: This is not the same as native `isNaN` which will return `true` for\n\
     * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.\n\
     * @example\n\
     *\n\
     * _.isNaN(NaN);\n\
     * // => true\n\
     *\n\
     * _.isNaN(new Number(NaN));\n\
     * // => true\n\
     *\n\
     * isNaN(undefined);\n\
     * // => true\n\
     *\n\
     * _.isNaN(undefined);\n\
     * // => false\n\
     */\n\
    function isNaN(value) {\n\
      // `NaN` as a primitive is the only value that is not equal to itself\n\
      // (perform the [[Class]] check first to avoid errors with some host objects in IE)\n\
      return isNumber(value) && value != +value;\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is `null`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.\n\
     * @example\n\
     *\n\
     * _.isNull(null);\n\
     * // => true\n\
     *\n\
     * _.isNull(undefined);\n\
     * // => false\n\
     */\n\
    function isNull(value) {\n\
      return value === null;\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is a number.\n\
     *\n\
     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.\n\
     * @example\n\
     *\n\
     * _.isNumber(8.4 * 5);\n\
     * // => true\n\
     */\n\
    function isNumber(value) {\n\
      return typeof value == 'number' ||\n\
        value && typeof value == 'object' && toString.call(value) == numberClass || false;\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is an object created by the `Object` constructor.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.\n\
     * @example\n\
     *\n\
     * function Shape() {\n\
     *   this.x = 0;\n\
     *   this.y = 0;\n\
     * }\n\
     *\n\
     * _.isPlainObject(new Shape);\n\
     * // => false\n\
     *\n\
     * _.isPlainObject([1, 2, 3]);\n\
     * // => false\n\
     *\n\
     * _.isPlainObject({ 'x': 0, 'y': 0 });\n\
     * // => true\n\
     */\n\
    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {\n\
      if (!(value && toString.call(value) == objectClass) || (!support.argsClass && isArguments(value))) {\n\
        return false;\n\
      }\n\
      var valueOf = value.valueOf,\n\
          objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);\n\
\n\
      return objProto\n\
        ? (value == objProto || getPrototypeOf(value) == objProto)\n\
        : shimIsPlainObject(value);\n\
    };\n\
\n\
    /**\n\
     * Checks if `value` is a regular expression.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.\n\
     * @example\n\
     *\n\
     * _.isRegExp(/fred/);\n\
     * // => true\n\
     */\n\
    function isRegExp(value) {\n\
      return value && objectTypes[typeof value] && toString.call(value) == regexpClass || false;\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is a string.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is a string, else `false`.\n\
     * @example\n\
     *\n\
     * _.isString('fred');\n\
     * // => true\n\
     */\n\
    function isString(value) {\n\
      return typeof value == 'string' ||\n\
        value && typeof value == 'object' && toString.call(value) == stringClass || false;\n\
    }\n\
\n\
    /**\n\
     * Checks if `value` is `undefined`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {*} value The value to check.\n\
     * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.\n\
     * @example\n\
     *\n\
     * _.isUndefined(void 0);\n\
     * // => true\n\
     */\n\
    function isUndefined(value) {\n\
      return typeof value == 'undefined';\n\
    }\n\
\n\
    /**\n\
     * Creates an object with the same keys as `object` and values generated by\n\
     * running each own enumerable property of `object` through the callback.\n\
     * The callback is bound to `thisArg` and invoked with three arguments;\n\
     * (value, key, object).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The object to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns a new object with values of the results of each `callback` execution.\n\
     * @example\n\
     *\n\
     * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });\n\
     * // => { 'a': 3, 'b': 6, 'c': 9 }\n\
     *\n\
     * var characters = {\n\
     *   'fred': { 'name': 'fred', 'age': 40 },\n\
     *   'pebbles': { 'name': 'pebbles', 'age': 1 }\n\
     * };\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.mapValues(characters, 'age');\n\
     * // => { 'fred': 40, 'pebbles': 1 }\n\
     */\n\
    function mapValues(object, callback, thisArg) {\n\
      var result = {};\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
\n\
      forOwn(object, function(value, key, object) {\n\
        result[key] = callback(value, key, object);\n\
      });\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Recursively merges own enumerable properties of the source object(s), that\n\
     * don't resolve to `undefined` into the destination object. Subsequent sources\n\
     * will overwrite property assignments of previous sources. If a callback is\n\
     * provided it will be executed to produce the merged values of the destination\n\
     * and source properties. If the callback returns `undefined` merging will\n\
     * be handled by the method instead. The callback is bound to `thisArg` and\n\
     * invoked with two arguments; (objectValue, sourceValue).\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The destination object.\n\
     * @param {...Object} [source] The source objects.\n\
     * @param {Function} [callback] The function to customize merging properties.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns the destination object.\n\
     * @example\n\
     *\n\
     * var names = {\n\
     *   'characters': [\n\
     *     { 'name': 'barney' },\n\
     *     { 'name': 'fred' }\n\
     *   ]\n\
     * };\n\
     *\n\
     * var ages = {\n\
     *   'characters': [\n\
     *     { 'age': 36 },\n\
     *     { 'age': 40 }\n\
     *   ]\n\
     * };\n\
     *\n\
     * _.merge(names, ages);\n\
     * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }\n\
     *\n\
     * var food = {\n\
     *   'fruits': ['apple'],\n\
     *   'vegetables': ['beet']\n\
     * };\n\
     *\n\
     * var otherFood = {\n\
     *   'fruits': ['banana'],\n\
     *   'vegetables': ['carrot']\n\
     * };\n\
     *\n\
     * _.merge(food, otherFood, function(a, b) {\n\
     *   return _.isArray(a) ? a.concat(b) : undefined;\n\
     * });\n\
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }\n\
     */\n\
    function merge(object) {\n\
      var args = arguments,\n\
          length = 2;\n\
\n\
      if (!isObject(object)) {\n\
        return object;\n\
      }\n\
      // allows working with `_.reduce` and `_.reduceRight` without using\n\
      // their `index` and `collection` arguments\n\
      if (typeof args[2] != 'number') {\n\
        length = args.length;\n\
      }\n\
      if (length > 3 && typeof args[length - 2] == 'function') {\n\
        var callback = baseCreateCallback(args[--length - 1], args[length--], 2);\n\
      } else if (length > 2 && typeof args[length - 1] == 'function') {\n\
        callback = args[--length];\n\
      }\n\
      var sources = slice(arguments, 1, length),\n\
          index = -1,\n\
          stackA = getArray(),\n\
          stackB = getArray();\n\
\n\
      while (++index < length) {\n\
        baseMerge(object, sources[index], callback, stackA, stackB);\n\
      }\n\
      releaseArray(stackA);\n\
      releaseArray(stackB);\n\
      return object;\n\
    }\n\
\n\
    /**\n\
     * Creates a shallow clone of `object` excluding the specified properties.\n\
     * Property names may be specified as individual arguments or as arrays of\n\
     * property names. If a callback is provided it will be executed for each\n\
     * property of `object` omitting the properties the callback returns truey\n\
     * for. The callback is bound to `thisArg` and invoked with three arguments;\n\
     * (value, key, object).\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The source object.\n\
     * @param {Function|...string|string[]} [callback] The properties to omit or the\n\
     *  function called per iteration.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns an object without the omitted properties.\n\
     * @example\n\
     *\n\
     * _.omit({ 'name': 'fred', 'age': 40 }, 'age');\n\
     * // => { 'name': 'fred' }\n\
     *\n\
     * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {\n\
     *   return typeof value == 'number';\n\
     * });\n\
     * // => { 'name': 'fred' }\n\
     */\n\
    function omit(object, callback, thisArg) {\n\
      var result = {};\n\
      if (typeof callback != 'function') {\n\
        var props = [];\n\
        forIn(object, function(value, key) {\n\
          props.push(key);\n\
        });\n\
        props = baseDifference(props, baseFlatten(arguments, true, false, 1));\n\
\n\
        var index = -1,\n\
            length = props.length;\n\
\n\
        while (++index < length) {\n\
          var key = props[index];\n\
          result[key] = object[key];\n\
        }\n\
      } else {\n\
        callback = lodash.createCallback(callback, thisArg, 3);\n\
        forIn(object, function(value, key, object) {\n\
          if (!callback(value, key, object)) {\n\
            result[key] = value;\n\
          }\n\
        });\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Creates a two dimensional array of an object's key-value pairs,\n\
     * i.e. `[[key1, value1], [key2, value2]]`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The object to inspect.\n\
     * @returns {Array} Returns new array of key-value pairs.\n\
     * @example\n\
     *\n\
     * _.pairs({ 'barney': 36, 'fred': 40 });\n\
     * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)\n\
     */\n\
    function pairs(object) {\n\
      var index = -1,\n\
          props = keys(object),\n\
          length = props.length,\n\
          result = Array(length);\n\
\n\
      while (++index < length) {\n\
        var key = props[index];\n\
        result[index] = [key, object[key]];\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Creates a shallow clone of `object` composed of the specified properties.\n\
     * Property names may be specified as individual arguments or as arrays of\n\
     * property names. If a callback is provided it will be executed for each\n\
     * property of `object` picking the properties the callback returns truey\n\
     * for. The callback is bound to `thisArg` and invoked with three arguments;\n\
     * (value, key, object).\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The source object.\n\
     * @param {Function|...string|string[]} [callback] The function called per\n\
     *  iteration or property names to pick, specified as individual property\n\
     *  names or arrays of property names.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns an object composed of the picked properties.\n\
     * @example\n\
     *\n\
     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');\n\
     * // => { 'name': 'fred' }\n\
     *\n\
     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {\n\
     *   return key.charAt(0) != '_';\n\
     * });\n\
     * // => { 'name': 'fred' }\n\
     */\n\
    function pick(object, callback, thisArg) {\n\
      var result = {};\n\
      if (typeof callback != 'function') {\n\
        var index = -1,\n\
            props = baseFlatten(arguments, true, false, 1),\n\
            length = isObject(object) ? props.length : 0;\n\
\n\
        while (++index < length) {\n\
          var key = props[index];\n\
          if (key in object) {\n\
            result[key] = object[key];\n\
          }\n\
        }\n\
      } else {\n\
        callback = lodash.createCallback(callback, thisArg, 3);\n\
        forIn(object, function(value, key, object) {\n\
          if (callback(value, key, object)) {\n\
            result[key] = value;\n\
          }\n\
        });\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * An alternative to `_.reduce` this method transforms `object` to a new\n\
     * `accumulator` object which is the result of running each of its own\n\
     * enumerable properties through a callback, with each callback execution\n\
     * potentially mutating the `accumulator` object. The callback is bound to\n\
     * `thisArg` and invoked with four arguments; (accumulator, value, key, object).\n\
     * Callbacks may exit iteration early by explicitly returning `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Array|Object} object The object to iterate over.\n\
     * @param {Function} [callback=identity] The function called per iteration.\n\
     * @param {*} [accumulator] The custom accumulator value.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the accumulated value.\n\
     * @example\n\
     *\n\
     * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {\n\
     *   num *= num;\n\
     *   if (num % 2) {\n\
     *     return result.push(num) < 3;\n\
     *   }\n\
     * });\n\
     * // => [1, 9, 25]\n\
     *\n\
     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {\n\
     *   result[key] = num * 3;\n\
     * });\n\
     * // => { 'a': 3, 'b': 6, 'c': 9 }\n\
     */\n\
    function transform(object, callback, accumulator, thisArg) {\n\
      var isArr = isArray(object);\n\
      if (accumulator == null) {\n\
        if (isArr) {\n\
          accumulator = [];\n\
        } else {\n\
          var ctor = object && object.constructor,\n\
              proto = ctor && ctor.prototype;\n\
\n\
          accumulator = baseCreate(proto);\n\
        }\n\
      }\n\
      if (callback) {\n\
        callback = lodash.createCallback(callback, thisArg, 4);\n\
        (isArr ? baseEach : forOwn)(object, function(value, index, object) {\n\
          return callback(accumulator, value, index, object);\n\
        });\n\
      }\n\
      return accumulator;\n\
    }\n\
\n\
    /**\n\
     * Creates an array composed of the own enumerable property values of `object`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Objects\n\
     * @param {Object} object The object to inspect.\n\
     * @returns {Array} Returns an array of property values.\n\
     * @example\n\
     *\n\
     * _.values({ 'one': 1, 'two': 2, 'three': 3 });\n\
     * // => [1, 2, 3] (property order is not guaranteed across environments)\n\
     */\n\
    function values(object) {\n\
      var index = -1,\n\
          props = keys(object),\n\
          length = props.length,\n\
          result = Array(length);\n\
\n\
      while (++index < length) {\n\
        result[index] = object[props[index]];\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * Creates an array of elements from the specified indexes, or keys, of the\n\
     * `collection`. Indexes may be specified as individual arguments or as arrays\n\
     * of indexes.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`\n\
     *   to retrieve, specified as individual indexes or arrays of indexes.\n\
     * @returns {Array} Returns a new array of elements corresponding to the\n\
     *  provided indexes.\n\
     * @example\n\
     *\n\
     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);\n\
     * // => ['a', 'c', 'e']\n\
     *\n\
     * _.at(['fred', 'barney', 'pebbles'], 0, 2);\n\
     * // => ['fred', 'pebbles']\n\
     */\n\
    function at(collection) {\n\
      var args = arguments,\n\
          index = -1,\n\
          props = baseFlatten(args, true, false, 1),\n\
          length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,\n\
          result = Array(length);\n\
\n\
      if (support.unindexedChars && isString(collection)) {\n\
        collection = collection.split('');\n\
      }\n\
      while(++index < length) {\n\
        result[index] = collection[props[index]];\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Checks if a given value is present in a collection using strict equality\n\
     * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the\n\
     * offset from the end of the collection.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias include\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {*} target The value to check for.\n\
     * @param {number} [fromIndex=0] The index to search from.\n\
     * @returns {boolean} Returns `true` if the `target` element is found, else `false`.\n\
     * @example\n\
     *\n\
     * _.contains([1, 2, 3], 1);\n\
     * // => true\n\
     *\n\
     * _.contains([1, 2, 3], 1, 2);\n\
     * // => false\n\
     *\n\
     * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');\n\
     * // => true\n\
     *\n\
     * _.contains('pebbles', 'eb');\n\
     * // => true\n\
     */\n\
    function contains(collection, target, fromIndex) {\n\
      var index = -1,\n\
          indexOf = getIndexOf(),\n\
          length = collection ? collection.length : 0,\n\
          result = false;\n\
\n\
      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;\n\
      if (isArray(collection)) {\n\
        result = indexOf(collection, target, fromIndex) > -1;\n\
      } else if (typeof length == 'number') {\n\
        result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;\n\
      } else {\n\
        baseEach(collection, function(value) {\n\
          if (++index >= fromIndex) {\n\
            return !(result = value === target);\n\
          }\n\
        });\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Creates an object composed of keys generated from the results of running\n\
     * each element of `collection` through the callback. The corresponding value\n\
     * of each key is the number of times the key was returned by the callback.\n\
     * The callback is bound to `thisArg` and invoked with three arguments;\n\
     * (value, index|key, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns the composed aggregate object.\n\
     * @example\n\
     *\n\
     * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });\n\
     * // => { '4': 1, '6': 2 }\n\
     *\n\
     * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);\n\
     * // => { '4': 1, '6': 2 }\n\
     *\n\
     * _.countBy(['one', 'two', 'three'], 'length');\n\
     * // => { '3': 2, '5': 1 }\n\
     */\n\
    var countBy = createAggregator(function(result, value, key) {\n\
      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);\n\
    });\n\
\n\
    /**\n\
     * Checks if the given callback returns truey value for **all** elements of\n\
     * a collection. The callback is bound to `thisArg` and invoked with three\n\
     * arguments; (value, index|key, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias all\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {boolean} Returns `true` if all elements passed the callback check,\n\
     *  else `false`.\n\
     * @example\n\
     *\n\
     * _.every([true, 1, null, 'yes']);\n\
     * // => false\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36 },\n\
     *   { 'name': 'fred',   'age': 40 }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.every(characters, 'age');\n\
     * // => true\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.every(characters, { 'age': 36 });\n\
     * // => false\n\
     */\n\
    function every(collection, callback, thisArg) {\n\
      var result = true;\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
\n\
      if (isArray(collection)) {\n\
        var index = -1,\n\
            length = collection.length;\n\
\n\
        while (++index < length) {\n\
          if (!(result = !!callback(collection[index], index, collection))) {\n\
            break;\n\
          }\n\
        }\n\
      } else {\n\
        baseEach(collection, function(value, index, collection) {\n\
          return (result = !!callback(value, index, collection));\n\
        });\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Iterates over elements of a collection, returning an array of all elements\n\
     * the callback returns truey for. The callback is bound to `thisArg` and\n\
     * invoked with three arguments; (value, index|key, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias select\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns a new array of elements that passed the callback check.\n\
     * @example\n\
     *\n\
     * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });\n\
     * // => [2, 4, 6]\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36, 'blocked': false },\n\
     *   { 'name': 'fred',   'age': 40, 'blocked': true }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.filter(characters, 'blocked');\n\
     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.filter(characters, { 'age': 36 });\n\
     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]\n\
     */\n\
    function filter(collection, callback, thisArg) {\n\
      var result = [];\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
\n\
      if (isArray(collection)) {\n\
        var index = -1,\n\
            length = collection.length;\n\
\n\
        while (++index < length) {\n\
          var value = collection[index];\n\
          if (callback(value, index, collection)) {\n\
            result.push(value);\n\
          }\n\
        }\n\
      } else {\n\
        baseEach(collection, function(value, index, collection) {\n\
          if (callback(value, index, collection)) {\n\
            result.push(value);\n\
          }\n\
        });\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Iterates over elements of a collection, returning the first element that\n\
     * the callback returns truey for. The callback is bound to `thisArg` and\n\
     * invoked with three arguments; (value, index|key, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias detect, findWhere\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the found element, else `undefined`.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney',  'age': 36, 'blocked': false },\n\
     *   { 'name': 'fred',    'age': 40, 'blocked': true },\n\
     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }\n\
     * ];\n\
     *\n\
     * _.find(characters, function(chr) {\n\
     *   return chr.age < 40;\n\
     * });\n\
     * // => { 'name': 'barney', 'age': 36, 'blocked': false }\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.find(characters, { 'age': 1 });\n\
     * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.find(characters, 'blocked');\n\
     * // => { 'name': 'fred', 'age': 40, 'blocked': true }\n\
     */\n\
    function find(collection, callback, thisArg) {\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
\n\
      if (isArray(collection)) {\n\
        var index = -1,\n\
            length = collection.length;\n\
\n\
        while (++index < length) {\n\
          var value = collection[index];\n\
          if (callback(value, index, collection)) {\n\
            return value;\n\
          }\n\
        }\n\
      } else {\n\
        var result;\n\
        baseEach(collection, function(value, index, collection) {\n\
          if (callback(value, index, collection)) {\n\
            result = value;\n\
            return false;\n\
          }\n\
        });\n\
        return result;\n\
      }\n\
    }\n\
\n\
    /**\n\
     * This method is like `_.find` except that it iterates over elements\n\
     * of a `collection` from right to left.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the found element, else `undefined`.\n\
     * @example\n\
     *\n\
     * _.findLast([1, 2, 3, 4], function(num) {\n\
     *   return num % 2 == 1;\n\
     * });\n\
     * // => 3\n\
     */\n\
    function findLast(collection, callback, thisArg) {\n\
      var result;\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
      forEachRight(collection, function(value, index, collection) {\n\
        if (callback(value, index, collection)) {\n\
          result = value;\n\
          return false;\n\
        }\n\
      });\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Iterates over elements of a collection, executing the callback for each\n\
     * element. The callback is bound to `thisArg` and invoked with three arguments;\n\
     * (value, index|key, collection). Callbacks may exit iteration early by\n\
     * explicitly returning `false`.\n\
     *\n\
     * Note: As with other \"Collections\" methods, objects with a `length` property\n\
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`\n\
     * may be used for object iteration.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias each\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function} [callback=identity] The function called per iteration.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array|Object|string} Returns `collection`.\n\
     * @example\n\
     *\n\
     * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');\n\
     * // => logs each number and returns '1,2,3'\n\
     *\n\
     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });\n\
     * // => logs each number and returns the object (property order is not guaranteed across environments)\n\
     */\n\
    function forEach(collection, callback, thisArg) {\n\
      if (callback && typeof thisArg == 'undefined' && isArray(collection)) {\n\
        var index = -1,\n\
            length = collection.length;\n\
\n\
        while (++index < length) {\n\
          if (callback(collection[index], index, collection) === false) {\n\
            break;\n\
          }\n\
        }\n\
      } else {\n\
        baseEach(collection, callback, thisArg);\n\
      }\n\
      return collection;\n\
    }\n\
\n\
    /**\n\
     * This method is like `_.forEach` except that it iterates over elements\n\
     * of a `collection` from right to left.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias eachRight\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function} [callback=identity] The function called per iteration.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array|Object|string} Returns `collection`.\n\
     * @example\n\
     *\n\
     * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');\n\
     * // => logs each number from right to left and returns '3,2,1'\n\
     */\n\
    function forEachRight(collection, callback, thisArg) {\n\
      var iterable = collection,\n\
          length = collection ? collection.length : 0;\n\
\n\
      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);\n\
      if (isArray(collection)) {\n\
        while (length--) {\n\
          if (callback(collection[length], length, collection) === false) {\n\
            break;\n\
          }\n\
        }\n\
      } else {\n\
        if (typeof length != 'number') {\n\
          var props = keys(collection);\n\
          length = props.length;\n\
        } else if (support.unindexedChars && isString(collection)) {\n\
          iterable = collection.split('');\n\
        }\n\
        baseEach(collection, function(value, key, collection) {\n\
          key = props ? props[--length] : --length;\n\
          return callback(iterable[key], key, collection);\n\
        });\n\
      }\n\
      return collection;\n\
    }\n\
\n\
    /**\n\
     * Creates an object composed of keys generated from the results of running\n\
     * each element of a collection through the callback. The corresponding value\n\
     * of each key is an array of the elements responsible for generating the key.\n\
     * The callback is bound to `thisArg` and invoked with three arguments;\n\
     * (value, index|key, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns the composed aggregate object.\n\
     * @example\n\
     *\n\
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });\n\
     * // => { '4': [4.2], '6': [6.1, 6.4] }\n\
     *\n\
     * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);\n\
     * // => { '4': [4.2], '6': [6.1, 6.4] }\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.groupBy(['one', 'two', 'three'], 'length');\n\
     * // => { '3': ['one', 'two'], '5': ['three'] }\n\
     */\n\
    var groupBy = createAggregator(function(result, value, key) {\n\
      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);\n\
    });\n\
\n\
    /**\n\
     * Creates an object composed of keys generated from the results of running\n\
     * each element of the collection through the given callback. The corresponding\n\
     * value of each key is the last element responsible for generating the key.\n\
     * The callback is bound to `thisArg` and invoked with three arguments;\n\
     * (value, index|key, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Object} Returns the composed aggregate object.\n\
     * @example\n\
     *\n\
     * var keys = [\n\
     *   { 'dir': 'left', 'code': 97 },\n\
     *   { 'dir': 'right', 'code': 100 }\n\
     * ];\n\
     *\n\
     * _.indexBy(keys, 'dir');\n\
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }\n\
     *\n\
     * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });\n\
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }\n\
     *\n\
     * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);\n\
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }\n\
     */\n\
    var indexBy = createAggregator(function(result, value, key) {\n\
      result[key] = value;\n\
    });\n\
\n\
    /**\n\
     * Invokes the method named by `methodName` on each element in the `collection`\n\
     * returning an array of the results of each invoked method. Additional arguments\n\
     * will be provided to each invoked method. If `methodName` is a function it\n\
     * will be invoked for, and `this` bound to, each element in the `collection`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|string} methodName The name of the method to invoke or\n\
     *  the function invoked per iteration.\n\
     * @param {...*} [arg] Arguments to invoke the method with.\n\
     * @returns {Array} Returns a new array of the results of each invoked method.\n\
     * @example\n\
     *\n\
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');\n\
     * // => [[1, 5, 7], [1, 2, 3]]\n\
     *\n\
     * _.invoke([123, 456], String.prototype.split, '');\n\
     * // => [['1', '2', '3'], ['4', '5', '6']]\n\
     */\n\
    function invoke(collection, methodName) {\n\
      var args = slice(arguments, 2),\n\
          index = -1,\n\
          isFunc = typeof methodName == 'function',\n\
          length = collection ? collection.length : 0,\n\
          result = Array(typeof length == 'number' ? length : 0);\n\
\n\
      forEach(collection, function(value) {\n\
        result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);\n\
      });\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Creates an array of values by running each element in the collection\n\
     * through the callback. The callback is bound to `thisArg` and invoked with\n\
     * three arguments; (value, index|key, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias collect\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns a new array of the results of each `callback` execution.\n\
     * @example\n\
     *\n\
     * _.map([1, 2, 3], function(num) { return num * 3; });\n\
     * // => [3, 6, 9]\n\
     *\n\
     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });\n\
     * // => [3, 6, 9] (property order is not guaranteed across environments)\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36 },\n\
     *   { 'name': 'fred',   'age': 40 }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.map(characters, 'name');\n\
     * // => ['barney', 'fred']\n\
     */\n\
    function map(collection, callback, thisArg) {\n\
      var index = -1,\n\
          length = collection ? collection.length : 0,\n\
          result = Array(typeof length == 'number' ? length : 0);\n\
\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
      if (isArray(collection)) {\n\
        while (++index < length) {\n\
          result[index] = callback(collection[index], index, collection);\n\
        }\n\
      } else {\n\
        baseEach(collection, function(value, key, collection) {\n\
          result[++index] = callback(value, key, collection);\n\
        });\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Retrieves the maximum value of a collection. If the collection is empty or\n\
     * falsey `-Infinity` is returned. If a callback is provided it will be executed\n\
     * for each value in the collection to generate the criterion by which the value\n\
     * is ranked. The callback is bound to `thisArg` and invoked with three\n\
     * arguments; (value, index, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the maximum value.\n\
     * @example\n\
     *\n\
     * _.max([4, 2, 8, 6]);\n\
     * // => 8\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36 },\n\
     *   { 'name': 'fred',   'age': 40 }\n\
     * ];\n\
     *\n\
     * _.max(characters, function(chr) { return chr.age; });\n\
     * // => { 'name': 'fred', 'age': 40 };\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.max(characters, 'age');\n\
     * // => { 'name': 'fred', 'age': 40 };\n\
     */\n\
    function max(collection, callback, thisArg) {\n\
      var computed = -Infinity,\n\
          result = computed;\n\
\n\
      // allows working with functions like `_.map` without using\n\
      // their `index` argument as a callback\n\
      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {\n\
        callback = null;\n\
      }\n\
      if (callback == null && isArray(collection)) {\n\
        var index = -1,\n\
            length = collection.length;\n\
\n\
        while (++index < length) {\n\
          var value = collection[index];\n\
          if (value > result) {\n\
            result = value;\n\
          }\n\
        }\n\
      } else {\n\
        callback = (callback == null && isString(collection))\n\
          ? charAtCallback\n\
          : lodash.createCallback(callback, thisArg, 3);\n\
\n\
        baseEach(collection, function(value, index, collection) {\n\
          var current = callback(value, index, collection);\n\
          if (current > computed) {\n\
            computed = current;\n\
            result = value;\n\
          }\n\
        });\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Retrieves the minimum value of a collection. If the collection is empty or\n\
     * falsey `Infinity` is returned. If a callback is provided it will be executed\n\
     * for each value in the collection to generate the criterion by which the value\n\
     * is ranked. The callback is bound to `thisArg` and invoked with three\n\
     * arguments; (value, index, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the minimum value.\n\
     * @example\n\
     *\n\
     * _.min([4, 2, 8, 6]);\n\
     * // => 2\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36 },\n\
     *   { 'name': 'fred',   'age': 40 }\n\
     * ];\n\
     *\n\
     * _.min(characters, function(chr) { return chr.age; });\n\
     * // => { 'name': 'barney', 'age': 36 };\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.min(characters, 'age');\n\
     * // => { 'name': 'barney', 'age': 36 };\n\
     */\n\
    function min(collection, callback, thisArg) {\n\
      var computed = Infinity,\n\
          result = computed;\n\
\n\
      // allows working with functions like `_.map` without using\n\
      // their `index` argument as a callback\n\
      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {\n\
        callback = null;\n\
      }\n\
      if (callback == null && isArray(collection)) {\n\
        var index = -1,\n\
            length = collection.length;\n\
\n\
        while (++index < length) {\n\
          var value = collection[index];\n\
          if (value < result) {\n\
            result = value;\n\
          }\n\
        }\n\
      } else {\n\
        callback = (callback == null && isString(collection))\n\
          ? charAtCallback\n\
          : lodash.createCallback(callback, thisArg, 3);\n\
\n\
        baseEach(collection, function(value, index, collection) {\n\
          var current = callback(value, index, collection);\n\
          if (current < computed) {\n\
            computed = current;\n\
            result = value;\n\
          }\n\
        });\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Retrieves the value of a specified property from all elements in the collection.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @type Function\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {string} property The name of the property to pluck.\n\
     * @returns {Array} Returns a new array of property values.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36 },\n\
     *   { 'name': 'fred',   'age': 40 }\n\
     * ];\n\
     *\n\
     * _.pluck(characters, 'name');\n\
     * // => ['barney', 'fred']\n\
     */\n\
    var pluck = map;\n\
\n\
    /**\n\
     * Reduces a collection to a value which is the accumulated result of running\n\
     * each element in the collection through the callback, where each successive\n\
     * callback execution consumes the return value of the previous execution. If\n\
     * `accumulator` is not provided the first element of the collection will be\n\
     * used as the initial `accumulator` value. The callback is bound to `thisArg`\n\
     * and invoked with four arguments; (accumulator, value, index|key, collection).\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias foldl, inject\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function} [callback=identity] The function called per iteration.\n\
     * @param {*} [accumulator] Initial value of the accumulator.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the accumulated value.\n\
     * @example\n\
     *\n\
     * var sum = _.reduce([1, 2, 3], function(sum, num) {\n\
     *   return sum + num;\n\
     * });\n\
     * // => 6\n\
     *\n\
     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {\n\
     *   result[key] = num * 3;\n\
     *   return result;\n\
     * }, {});\n\
     * // => { 'a': 3, 'b': 6, 'c': 9 }\n\
     */\n\
    function reduce(collection, callback, accumulator, thisArg) {\n\
      var noaccum = arguments.length < 3;\n\
      callback = lodash.createCallback(callback, thisArg, 4);\n\
\n\
      if (isArray(collection)) {\n\
        var index = -1,\n\
            length = collection.length;\n\
\n\
        if (noaccum) {\n\
          accumulator = collection[++index];\n\
        }\n\
        while (++index < length) {\n\
          accumulator = callback(accumulator, collection[index], index, collection);\n\
        }\n\
      } else {\n\
        baseEach(collection, function(value, index, collection) {\n\
          accumulator = noaccum\n\
            ? (noaccum = false, value)\n\
            : callback(accumulator, value, index, collection)\n\
        });\n\
      }\n\
      return accumulator;\n\
    }\n\
\n\
    /**\n\
     * This method is like `_.reduce` except that it iterates over elements\n\
     * of a `collection` from right to left.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias foldr\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function} [callback=identity] The function called per iteration.\n\
     * @param {*} [accumulator] Initial value of the accumulator.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the accumulated value.\n\
     * @example\n\
     *\n\
     * var list = [[0, 1], [2, 3], [4, 5]];\n\
     * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);\n\
     * // => [4, 5, 2, 3, 0, 1]\n\
     */\n\
    function reduceRight(collection, callback, accumulator, thisArg) {\n\
      var noaccum = arguments.length < 3;\n\
      callback = lodash.createCallback(callback, thisArg, 4);\n\
      forEachRight(collection, function(value, index, collection) {\n\
        accumulator = noaccum\n\
          ? (noaccum = false, value)\n\
          : callback(accumulator, value, index, collection);\n\
      });\n\
      return accumulator;\n\
    }\n\
\n\
    /**\n\
     * The opposite of `_.filter` this method returns the elements of a\n\
     * collection that the callback does **not** return truey for.\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns a new array of elements that failed the callback check.\n\
     * @example\n\
     *\n\
     * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });\n\
     * // => [1, 3, 5]\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36, 'blocked': false },\n\
     *   { 'name': 'fred',   'age': 40, 'blocked': true }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.reject(characters, 'blocked');\n\
     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.reject(characters, { 'age': 36 });\n\
     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]\n\
     */\n\
    function reject(collection, callback, thisArg) {\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
      return filter(collection, function(value, index, collection) {\n\
        return !callback(value, index, collection);\n\
      });\n\
    }\n\
\n\
    /**\n\
     * Retrieves a random element or `n` random elements from a collection.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to sample.\n\
     * @param {number} [n] The number of elements to sample.\n\
     * @param- {Object} [guard] Allows working with functions like `_.map`\n\
     *  without using their `index` arguments as `n`.\n\
     * @returns {Array} Returns the random sample(s) of `collection`.\n\
     * @example\n\
     *\n\
     * _.sample([1, 2, 3, 4]);\n\
     * // => 2\n\
     *\n\
     * _.sample([1, 2, 3, 4], 2);\n\
     * // => [3, 1]\n\
     */\n\
    function sample(collection, n, guard) {\n\
      if (collection && typeof collection.length != 'number') {\n\
        collection = values(collection);\n\
      } else if (support.unindexedChars && isString(collection)) {\n\
        collection = collection.split('');\n\
      }\n\
      if (n == null || guard) {\n\
        return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;\n\
      }\n\
      var result = shuffle(collection);\n\
      result.length = nativeMin(nativeMax(0, n), result.length);\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Creates an array of shuffled values, using a version of the Fisher-Yates\n\
     * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to shuffle.\n\
     * @returns {Array} Returns a new shuffled collection.\n\
     * @example\n\
     *\n\
     * _.shuffle([1, 2, 3, 4, 5, 6]);\n\
     * // => [4, 1, 6, 3, 5, 2]\n\
     */\n\
    function shuffle(collection) {\n\
      var index = -1,\n\
          length = collection ? collection.length : 0,\n\
          result = Array(typeof length == 'number' ? length : 0);\n\
\n\
      forEach(collection, function(value) {\n\
        var rand = baseRandom(0, ++index);\n\
        result[index] = result[rand];\n\
        result[rand] = value;\n\
      });\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Gets the size of the `collection` by returning `collection.length` for arrays\n\
     * and array-like objects or the number of own enumerable properties for objects.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to inspect.\n\
     * @returns {number} Returns `collection.length` or number of own enumerable properties.\n\
     * @example\n\
     *\n\
     * _.size([1, 2]);\n\
     * // => 2\n\
     *\n\
     * _.size({ 'one': 1, 'two': 2, 'three': 3 });\n\
     * // => 3\n\
     *\n\
     * _.size('pebbles');\n\
     * // => 7\n\
     */\n\
    function size(collection) {\n\
      var length = collection ? collection.length : 0;\n\
      return typeof length == 'number' ? length : keys(collection).length;\n\
    }\n\
\n\
    /**\n\
     * Checks if the callback returns a truey value for **any** element of a\n\
     * collection. The function returns as soon as it finds a passing value and\n\
     * does not iterate over the entire collection. The callback is bound to\n\
     * `thisArg` and invoked with three arguments; (value, index|key, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias any\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {boolean} Returns `true` if any element passed the callback check,\n\
     *  else `false`.\n\
     * @example\n\
     *\n\
     * _.some([null, 0, 'yes', false], Boolean);\n\
     * // => true\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36, 'blocked': false },\n\
     *   { 'name': 'fred',   'age': 40, 'blocked': true }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.some(characters, 'blocked');\n\
     * // => true\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.some(characters, { 'age': 1 });\n\
     * // => false\n\
     */\n\
    function some(collection, callback, thisArg) {\n\
      var result;\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
\n\
      if (isArray(collection)) {\n\
        var index = -1,\n\
            length = collection.length;\n\
\n\
        while (++index < length) {\n\
          if ((result = callback(collection[index], index, collection))) {\n\
            break;\n\
          }\n\
        }\n\
      } else {\n\
        baseEach(collection, function(value, index, collection) {\n\
          return !(result = callback(value, index, collection));\n\
        });\n\
      }\n\
      return !!result;\n\
    }\n\
\n\
    /**\n\
     * Creates an array of elements, sorted in ascending order by the results of\n\
     * running each element in a collection through the callback. This method\n\
     * performs a stable sort, that is, it will preserve the original sort order\n\
     * of equal elements. The callback is bound to `thisArg` and invoked with\n\
     * three arguments; (value, index|key, collection).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an array of property names is provided for `callback` the collection\n\
     * will be sorted by each property value.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Array|Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns a new array of sorted elements.\n\
     * @example\n\
     *\n\
     * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });\n\
     * // => [3, 1, 2]\n\
     *\n\
     * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);\n\
     * // => [3, 1, 2]\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney',  'age': 36 },\n\
     *   { 'name': 'fred',    'age': 40 },\n\
     *   { 'name': 'barney',  'age': 26 },\n\
     *   { 'name': 'fred',    'age': 30 }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.map(_.sortBy(characters, 'age'), _.values);\n\
     * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]\n\
     *\n\
     * // sorting by multiple properties\n\
     * _.map(_.sortBy(characters, ['name', 'age']), _.values);\n\
     * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]\n\
     */\n\
    function sortBy(collection, callback, thisArg) {\n\
      var index = -1,\n\
          isArr = isArray(callback),\n\
          length = collection ? collection.length : 0,\n\
          result = Array(typeof length == 'number' ? length : 0);\n\
\n\
      if (!isArr) {\n\
        callback = lodash.createCallback(callback, thisArg, 3);\n\
      }\n\
      forEach(collection, function(value, key, collection) {\n\
        var object = result[++index] = getObject();\n\
        if (isArr) {\n\
          object.criteria = map(callback, function(key) { return value[key]; });\n\
        } else {\n\
          (object.criteria = getArray())[0] = callback(value, key, collection);\n\
        }\n\
        object.index = index;\n\
        object.value = value;\n\
      });\n\
\n\
      length = result.length;\n\
      result.sort(compareAscending);\n\
      while (length--) {\n\
        var object = result[length];\n\
        result[length] = object.value;\n\
        if (!isArr) {\n\
          releaseArray(object.criteria);\n\
        }\n\
        releaseObject(object);\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Converts the `collection` to an array.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to convert.\n\
     * @returns {Array} Returns the new converted array.\n\
     * @example\n\
     *\n\
     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);\n\
     * // => [2, 3, 4]\n\
     */\n\
    function toArray(collection) {\n\
      if (collection && typeof collection.length == 'number') {\n\
        return (support.unindexedChars && isString(collection))\n\
          ? collection.split('')\n\
          : slice(collection);\n\
      }\n\
      return values(collection);\n\
    }\n\
\n\
    /**\n\
     * Performs a deep comparison of each element in a `collection` to the given\n\
     * `properties` object, returning an array of all elements that have equivalent\n\
     * property values.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @type Function\n\
     * @category Collections\n\
     * @param {Array|Object|string} collection The collection to iterate over.\n\
     * @param {Object} props The object of property values to filter by.\n\
     * @returns {Array} Returns a new array of elements that have the given properties.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },\n\
     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }\n\
     * ];\n\
     *\n\
     * _.where(characters, { 'age': 36 });\n\
     * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]\n\
     *\n\
     * _.where(characters, { 'pets': ['dino'] });\n\
     * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]\n\
     */\n\
    var where = filter;\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * Creates an array with all falsey values removed. The values `false`, `null`,\n\
     * `0`, `\"\"`, `undefined`, and `NaN` are all falsey.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to compact.\n\
     * @returns {Array} Returns a new array of filtered values.\n\
     * @example\n\
     *\n\
     * _.compact([0, 1, false, 2, '', 3]);\n\
     * // => [1, 2, 3]\n\
     */\n\
    function compact(array) {\n\
      var index = -1,\n\
          length = array ? array.length : 0,\n\
          result = [];\n\
\n\
      while (++index < length) {\n\
        var value = array[index];\n\
        if (value) {\n\
          result.push(value);\n\
        }\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Creates an array excluding all values of the provided arrays using strict\n\
     * equality for comparisons, i.e. `===`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to process.\n\
     * @param {...Array} [values] The arrays of values to exclude.\n\
     * @returns {Array} Returns a new array of filtered values.\n\
     * @example\n\
     *\n\
     * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);\n\
     * // => [1, 3, 4]\n\
     */\n\
    function difference(array) {\n\
      return baseDifference(array, baseFlatten(arguments, true, true, 1));\n\
    }\n\
\n\
    /**\n\
     * This method is like `_.find` except that it returns the index of the first\n\
     * element that passes the callback check, instead of the element itself.\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to search.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {number} Returns the index of the found element, else `-1`.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney',  'age': 36, 'blocked': false },\n\
     *   { 'name': 'fred',    'age': 40, 'blocked': true },\n\
     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }\n\
     * ];\n\
     *\n\
     * _.findIndex(characters, function(chr) {\n\
     *   return chr.age < 20;\n\
     * });\n\
     * // => 2\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.findIndex(characters, { 'age': 36 });\n\
     * // => 0\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.findIndex(characters, 'blocked');\n\
     * // => 1\n\
     */\n\
    function findIndex(array, callback, thisArg) {\n\
      var index = -1,\n\
          length = array ? array.length : 0;\n\
\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
      while (++index < length) {\n\
        if (callback(array[index], index, array)) {\n\
          return index;\n\
        }\n\
      }\n\
      return -1;\n\
    }\n\
\n\
    /**\n\
     * This method is like `_.findIndex` except that it iterates over elements\n\
     * of a `collection` from right to left.\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to search.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {number} Returns the index of the found element, else `-1`.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney',  'age': 36, 'blocked': true },\n\
     *   { 'name': 'fred',    'age': 40, 'blocked': false },\n\
     *   { 'name': 'pebbles', 'age': 1,  'blocked': true }\n\
     * ];\n\
     *\n\
     * _.findLastIndex(characters, function(chr) {\n\
     *   return chr.age > 30;\n\
     * });\n\
     * // => 1\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.findLastIndex(characters, { 'age': 36 });\n\
     * // => 0\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.findLastIndex(characters, 'blocked');\n\
     * // => 2\n\
     */\n\
    function findLastIndex(array, callback, thisArg) {\n\
      var length = array ? array.length : 0;\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
      while (length--) {\n\
        if (callback(array[length], length, array)) {\n\
          return length;\n\
        }\n\
      }\n\
      return -1;\n\
    }\n\
\n\
    /**\n\
     * Gets the first element or first `n` elements of an array. If a callback\n\
     * is provided elements at the beginning of the array are returned as long\n\
     * as the callback returns truey. The callback is bound to `thisArg` and\n\
     * invoked with three arguments; (value, index, array).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias head, take\n\
     * @category Arrays\n\
     * @param {Array} array The array to query.\n\
     * @param {Function|Object|number|string} [callback] The function called\n\
     *  per element or the number of elements to return. If a property name or\n\
     *  object is provided it will be used to create a \"_.pluck\" or \"_.where\"\n\
     *  style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the first element(s) of `array`.\n\
     * @example\n\
     *\n\
     * _.first([1, 2, 3]);\n\
     * // => 1\n\
     *\n\
     * _.first([1, 2, 3], 2);\n\
     * // => [1, 2]\n\
     *\n\
     * _.first([1, 2, 3], function(num) {\n\
     *   return num < 3;\n\
     * });\n\
     * // => [1, 2]\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },\n\
     *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },\n\
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.first(characters, 'blocked');\n\
     * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');\n\
     * // => ['barney', 'fred']\n\
     */\n\
    function first(array, callback, thisArg) {\n\
      var n = 0,\n\
          length = array ? array.length : 0;\n\
\n\
      if (typeof callback != 'number' && callback != null) {\n\
        var index = -1;\n\
        callback = lodash.createCallback(callback, thisArg, 3);\n\
        while (++index < length && callback(array[index], index, array)) {\n\
          n++;\n\
        }\n\
      } else {\n\
        n = callback;\n\
        if (n == null || thisArg) {\n\
          return array ? array[0] : undefined;\n\
        }\n\
      }\n\
      return slice(array, 0, nativeMin(nativeMax(0, n), length));\n\
    }\n\
\n\
    /**\n\
     * Flattens a nested array (the nesting can be to any depth). If `isShallow`\n\
     * is truey, the array will only be flattened a single level. If a callback\n\
     * is provided each element of the array is passed through the callback before\n\
     * flattening. The callback is bound to `thisArg` and invoked with three\n\
     * arguments; (value, index, array).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to flatten.\n\
     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns a new flattened array.\n\
     * @example\n\
     *\n\
     * _.flatten([1, [2], [3, [[4]]]]);\n\
     * // => [1, 2, 3, 4];\n\
     *\n\
     * _.flatten([1, [2], [3, [[4]]]], true);\n\
     * // => [1, 2, 3, [[4]]];\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },\n\
     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.flatten(characters, 'pets');\n\
     * // => ['hoppy', 'baby puss', 'dino']\n\
     */\n\
    function flatten(array, isShallow, callback, thisArg) {\n\
      // juggle arguments\n\
      if (typeof isShallow != 'boolean' && isShallow != null) {\n\
        thisArg = callback;\n\
        callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;\n\
        isShallow = false;\n\
      }\n\
      if (callback != null) {\n\
        array = map(array, callback, thisArg);\n\
      }\n\
      return baseFlatten(array, isShallow);\n\
    }\n\
\n\
    /**\n\
     * Gets the index at which the first occurrence of `value` is found using\n\
     * strict equality for comparisons, i.e. `===`. If the array is already sorted\n\
     * providing `true` for `fromIndex` will run a faster binary search.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to search.\n\
     * @param {*} value The value to search for.\n\
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`\n\
     *  to perform a binary search on a sorted array.\n\
     * @returns {number} Returns the index of the matched value or `-1`.\n\
     * @example\n\
     *\n\
     * _.indexOf([1, 2, 3, 1, 2, 3], 2);\n\
     * // => 1\n\
     *\n\
     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);\n\
     * // => 4\n\
     *\n\
     * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);\n\
     * // => 2\n\
     */\n\
    function indexOf(array, value, fromIndex) {\n\
      if (typeof fromIndex == 'number') {\n\
        var length = array ? array.length : 0;\n\
        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);\n\
      } else if (fromIndex) {\n\
        var index = sortedIndex(array, value);\n\
        return array[index] === value ? index : -1;\n\
      }\n\
      return baseIndexOf(array, value, fromIndex);\n\
    }\n\
\n\
    /**\n\
     * Gets all but the last element or last `n` elements of an array. If a\n\
     * callback is provided elements at the end of the array are excluded from\n\
     * the result as long as the callback returns truey. The callback is bound\n\
     * to `thisArg` and invoked with three arguments; (value, index, array).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to query.\n\
     * @param {Function|Object|number|string} [callback=1] The function called\n\
     *  per element or the number of elements to exclude. If a property name or\n\
     *  object is provided it will be used to create a \"_.pluck\" or \"_.where\"\n\
     *  style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns a slice of `array`.\n\
     * @example\n\
     *\n\
     * _.initial([1, 2, 3]);\n\
     * // => [1, 2]\n\
     *\n\
     * _.initial([1, 2, 3], 2);\n\
     * // => [1]\n\
     *\n\
     * _.initial([1, 2, 3], function(num) {\n\
     *   return num > 1;\n\
     * });\n\
     * // => [1]\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },\n\
     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },\n\
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.initial(characters, 'blocked');\n\
     * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');\n\
     * // => ['barney', 'fred']\n\
     */\n\
    function initial(array, callback, thisArg) {\n\
      var n = 0,\n\
          length = array ? array.length : 0;\n\
\n\
      if (typeof callback != 'number' && callback != null) {\n\
        var index = length;\n\
        callback = lodash.createCallback(callback, thisArg, 3);\n\
        while (index-- && callback(array[index], index, array)) {\n\
          n++;\n\
        }\n\
      } else {\n\
        n = (callback == null || thisArg) ? 1 : callback || n;\n\
      }\n\
      return slice(array, 0, nativeMin(nativeMax(0, length - n), length));\n\
    }\n\
\n\
    /**\n\
     * Creates an array of unique values present in all provided arrays using\n\
     * strict equality for comparisons, i.e. `===`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {...Array} [array] The arrays to inspect.\n\
     * @returns {Array} Returns an array of shared values.\n\
     * @example\n\
     *\n\
     * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);\n\
     * // => [1, 2]\n\
     */\n\
    function intersection() {\n\
      var args = [],\n\
          argsIndex = -1,\n\
          argsLength = arguments.length,\n\
          caches = getArray(),\n\
          indexOf = getIndexOf(),\n\
          trustIndexOf = indexOf === baseIndexOf,\n\
          seen = getArray();\n\
\n\
      while (++argsIndex < argsLength) {\n\
        var value = arguments[argsIndex];\n\
        if (isArray(value) || isArguments(value)) {\n\
          args.push(value);\n\
          caches.push(trustIndexOf && value.length >= largeArraySize &&\n\
            createCache(argsIndex ? args[argsIndex] : seen));\n\
        }\n\
      }\n\
      var array = args[0],\n\
          index = -1,\n\
          length = array ? array.length : 0,\n\
          result = [];\n\
\n\
      outer:\n\
      while (++index < length) {\n\
        var cache = caches[0];\n\
        value = array[index];\n\
\n\
        if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {\n\
          argsIndex = argsLength;\n\
          (cache || seen).push(value);\n\
          while (--argsIndex) {\n\
            cache = caches[argsIndex];\n\
            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {\n\
              continue outer;\n\
            }\n\
          }\n\
          result.push(value);\n\
        }\n\
      }\n\
      while (argsLength--) {\n\
        cache = caches[argsLength];\n\
        if (cache) {\n\
          releaseObject(cache);\n\
        }\n\
      }\n\
      releaseArray(caches);\n\
      releaseArray(seen);\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Gets the last element or last `n` elements of an array. If a callback is\n\
     * provided elements at the end of the array are returned as long as the\n\
     * callback returns truey. The callback is bound to `thisArg` and invoked\n\
     * with three arguments; (value, index, array).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to query.\n\
     * @param {Function|Object|number|string} [callback] The function called\n\
     *  per element or the number of elements to return. If a property name or\n\
     *  object is provided it will be used to create a \"_.pluck\" or \"_.where\"\n\
     *  style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {*} Returns the last element(s) of `array`.\n\
     * @example\n\
     *\n\
     * _.last([1, 2, 3]);\n\
     * // => 3\n\
     *\n\
     * _.last([1, 2, 3], 2);\n\
     * // => [2, 3]\n\
     *\n\
     * _.last([1, 2, 3], function(num) {\n\
     *   return num > 1;\n\
     * });\n\
     * // => [2, 3]\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },\n\
     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },\n\
     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.pluck(_.last(characters, 'blocked'), 'name');\n\
     * // => ['fred', 'pebbles']\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.last(characters, { 'employer': 'na' });\n\
     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]\n\
     */\n\
    function last(array, callback, thisArg) {\n\
      var n = 0,\n\
          length = array ? array.length : 0;\n\
\n\
      if (typeof callback != 'number' && callback != null) {\n\
        var index = length;\n\
        callback = lodash.createCallback(callback, thisArg, 3);\n\
        while (index-- && callback(array[index], index, array)) {\n\
          n++;\n\
        }\n\
      } else {\n\
        n = callback;\n\
        if (n == null || thisArg) {\n\
          return array ? array[length - 1] : undefined;\n\
        }\n\
      }\n\
      return slice(array, nativeMax(0, length - n));\n\
    }\n\
\n\
    /**\n\
     * Gets the index at which the last occurrence of `value` is found using strict\n\
     * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used\n\
     * as the offset from the end of the collection.\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to search.\n\
     * @param {*} value The value to search for.\n\
     * @param {number} [fromIndex=array.length-1] The index to search from.\n\
     * @returns {number} Returns the index of the matched value or `-1`.\n\
     * @example\n\
     *\n\
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);\n\
     * // => 4\n\
     *\n\
     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);\n\
     * // => 1\n\
     */\n\
    function lastIndexOf(array, value, fromIndex) {\n\
      var index = array ? array.length : 0;\n\
      if (typeof fromIndex == 'number') {\n\
        index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;\n\
      }\n\
      while (index--) {\n\
        if (array[index] === value) {\n\
          return index;\n\
        }\n\
      }\n\
      return -1;\n\
    }\n\
\n\
    /**\n\
     * Removes all provided values from the given array using strict equality for\n\
     * comparisons, i.e. `===`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to modify.\n\
     * @param {...*} [value] The values to remove.\n\
     * @returns {Array} Returns `array`.\n\
     * @example\n\
     *\n\
     * var array = [1, 2, 3, 1, 2, 3];\n\
     * _.pull(array, 2, 3);\n\
     * console.log(array);\n\
     * // => [1, 1]\n\
     */\n\
    function pull(array) {\n\
      var args = arguments,\n\
          argsIndex = 0,\n\
          argsLength = args.length,\n\
          length = array ? array.length : 0;\n\
\n\
      while (++argsIndex < argsLength) {\n\
        var index = -1,\n\
            value = args[argsIndex];\n\
        while (++index < length) {\n\
          if (array[index] === value) {\n\
            splice.call(array, index--, 1);\n\
            length--;\n\
          }\n\
        }\n\
      }\n\
      return array;\n\
    }\n\
\n\
    /**\n\
     * Creates an array of numbers (positive and/or negative) progressing from\n\
     * `start` up to but not including `end`. If `start` is less than `stop` a\n\
     * zero-length range is created unless a negative `step` is specified.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {number} [start=0] The start of the range.\n\
     * @param {number} end The end of the range.\n\
     * @param {number} [step=1] The value to increment or decrement by.\n\
     * @returns {Array} Returns a new range array.\n\
     * @example\n\
     *\n\
     * _.range(4);\n\
     * // => [0, 1, 2, 3]\n\
     *\n\
     * _.range(1, 5);\n\
     * // => [1, 2, 3, 4]\n\
     *\n\
     * _.range(0, 20, 5);\n\
     * // => [0, 5, 10, 15]\n\
     *\n\
     * _.range(0, -4, -1);\n\
     * // => [0, -1, -2, -3]\n\
     *\n\
     * _.range(1, 4, 0);\n\
     * // => [1, 1, 1]\n\
     *\n\
     * _.range(0);\n\
     * // => []\n\
     */\n\
    function range(start, end, step) {\n\
      start = +start || 0;\n\
      step = typeof step == 'number' ? step : (+step || 1);\n\
\n\
      if (end == null) {\n\
        end = start;\n\
        start = 0;\n\
      }\n\
      // use `Array(length)` so engines like Chakra and V8 avoid slower modes\n\
      // http://youtu.be/XAqIpGU8ZZk#t=17m25s\n\
      var index = -1,\n\
          length = nativeMax(0, ceil((end - start) / (step || 1))),\n\
          result = Array(length);\n\
\n\
      while (++index < length) {\n\
        result[index] = start;\n\
        start += step;\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Removes all elements from an array that the callback returns truey for\n\
     * and returns an array of removed elements. The callback is bound to `thisArg`\n\
     * and invoked with three arguments; (value, index, array).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to modify.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns a new array of removed elements.\n\
     * @example\n\
     *\n\
     * var array = [1, 2, 3, 4, 5, 6];\n\
     * var evens = _.remove(array, function(num) { return num % 2 == 0; });\n\
     *\n\
     * console.log(array);\n\
     * // => [1, 3, 5]\n\
     *\n\
     * console.log(evens);\n\
     * // => [2, 4, 6]\n\
     */\n\
    function remove(array, callback, thisArg) {\n\
      var index = -1,\n\
          length = array ? array.length : 0,\n\
          result = [];\n\
\n\
      callback = lodash.createCallback(callback, thisArg, 3);\n\
      while (++index < length) {\n\
        var value = array[index];\n\
        if (callback(value, index, array)) {\n\
          result.push(value);\n\
          splice.call(array, index--, 1);\n\
          length--;\n\
        }\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * The opposite of `_.initial` this method gets all but the first element or\n\
     * first `n` elements of an array. If a callback function is provided elements\n\
     * at the beginning of the array are excluded from the result as long as the\n\
     * callback returns truey. The callback is bound to `thisArg` and invoked\n\
     * with three arguments; (value, index, array).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias drop, tail\n\
     * @category Arrays\n\
     * @param {Array} array The array to query.\n\
     * @param {Function|Object|number|string} [callback=1] The function called\n\
     *  per element or the number of elements to exclude. If a property name or\n\
     *  object is provided it will be used to create a \"_.pluck\" or \"_.where\"\n\
     *  style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns a slice of `array`.\n\
     * @example\n\
     *\n\
     * _.rest([1, 2, 3]);\n\
     * // => [2, 3]\n\
     *\n\
     * _.rest([1, 2, 3], 2);\n\
     * // => [3]\n\
     *\n\
     * _.rest([1, 2, 3], function(num) {\n\
     *   return num < 3;\n\
     * });\n\
     * // => [3]\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },\n\
     *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },\n\
     *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }\n\
     * ];\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.pluck(_.rest(characters, 'blocked'), 'name');\n\
     * // => ['fred', 'pebbles']\n\
     *\n\
     * // using \"_.where\" callback shorthand\n\
     * _.rest(characters, { 'employer': 'slate' });\n\
     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]\n\
     */\n\
    function rest(array, callback, thisArg) {\n\
      if (typeof callback != 'number' && callback != null) {\n\
        var n = 0,\n\
            index = -1,\n\
            length = array ? array.length : 0;\n\
\n\
        callback = lodash.createCallback(callback, thisArg, 3);\n\
        while (++index < length && callback(array[index], index, array)) {\n\
          n++;\n\
        }\n\
      } else {\n\
        n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);\n\
      }\n\
      return slice(array, n);\n\
    }\n\
\n\
    /**\n\
     * Uses a binary search to determine the smallest index at which a value\n\
     * should be inserted into a given sorted array in order to maintain the sort\n\
     * order of the array. If a callback is provided it will be executed for\n\
     * `value` and each element of `array` to compute their sort ranking. The\n\
     * callback is bound to `thisArg` and invoked with one argument; (value).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to inspect.\n\
     * @param {*} value The value to evaluate.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {number} Returns the index at which `value` should be inserted\n\
     *  into `array`.\n\
     * @example\n\
     *\n\
     * _.sortedIndex([20, 30, 50], 40);\n\
     * // => 2\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');\n\
     * // => 2\n\
     *\n\
     * var dict = {\n\
     *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }\n\
     * };\n\
     *\n\
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {\n\
     *   return dict.wordToNumber[word];\n\
     * });\n\
     * // => 2\n\
     *\n\
     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {\n\
     *   return this.wordToNumber[word];\n\
     * }, dict);\n\
     * // => 2\n\
     */\n\
    function sortedIndex(array, value, callback, thisArg) {\n\
      var low = 0,\n\
          high = array ? array.length : low;\n\
\n\
      // explicitly reference `identity` for better inlining in Firefox\n\
      callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;\n\
      value = callback(value);\n\
\n\
      while (low < high) {\n\
        var mid = (low + high) >>> 1;\n\
        (callback(array[mid]) < value)\n\
          ? low = mid + 1\n\
          : high = mid;\n\
      }\n\
      return low;\n\
    }\n\
\n\
    /**\n\
     * Creates an array of unique values, in order, of the provided arrays using\n\
     * strict equality for comparisons, i.e. `===`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {...Array} [array] The arrays to inspect.\n\
     * @returns {Array} Returns an array of combined values.\n\
     * @example\n\
     *\n\
     * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);\n\
     * // => [1, 2, 3, 5, 4]\n\
     */\n\
    function union() {\n\
      return baseUniq(baseFlatten(arguments, true, true));\n\
    }\n\
\n\
    /**\n\
     * Creates a duplicate-value-free version of an array using strict equality\n\
     * for comparisons, i.e. `===`. If the array is sorted, providing\n\
     * `true` for `isSorted` will use a faster algorithm. If a callback is provided\n\
     * each element of `array` is passed through the callback before uniqueness\n\
     * is computed. The callback is bound to `thisArg` and invoked with three\n\
     * arguments; (value, index, array).\n\
     *\n\
     * If a property name is provided for `callback` the created \"_.pluck\" style\n\
     * callback will return the property value of the given element.\n\
     *\n\
     * If an object is provided for `callback` the created \"_.where\" style callback\n\
     * will return `true` for elements that have the properties of the given object,\n\
     * else `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias unique\n\
     * @category Arrays\n\
     * @param {Array} array The array to process.\n\
     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.\n\
     * @param {Function|Object|string} [callback=identity] The function called\n\
     *  per iteration. If a property name or object is provided it will be used\n\
     *  to create a \"_.pluck\" or \"_.where\" style callback, respectively.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns a duplicate-value-free array.\n\
     * @example\n\
     *\n\
     * _.uniq([1, 2, 1, 3, 1]);\n\
     * // => [1, 2, 3]\n\
     *\n\
     * _.uniq([1, 1, 2, 2, 3], true);\n\
     * // => [1, 2, 3]\n\
     *\n\
     * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });\n\
     * // => ['A', 'b', 'C']\n\
     *\n\
     * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);\n\
     * // => [1, 2.5, 3]\n\
     *\n\
     * // using \"_.pluck\" callback shorthand\n\
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');\n\
     * // => [{ 'x': 1 }, { 'x': 2 }]\n\
     */\n\
    function uniq(array, isSorted, callback, thisArg) {\n\
      // juggle arguments\n\
      if (typeof isSorted != 'boolean' && isSorted != null) {\n\
        thisArg = callback;\n\
        callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;\n\
        isSorted = false;\n\
      }\n\
      if (callback != null) {\n\
        callback = lodash.createCallback(callback, thisArg, 3);\n\
      }\n\
      return baseUniq(array, isSorted, callback);\n\
    }\n\
\n\
    /**\n\
     * Creates an array excluding all provided values using strict equality for\n\
     * comparisons, i.e. `===`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {Array} array The array to filter.\n\
     * @param {...*} [value] The values to exclude.\n\
     * @returns {Array} Returns a new array of filtered values.\n\
     * @example\n\
     *\n\
     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);\n\
     * // => [2, 3, 4]\n\
     */\n\
    function without(array) {\n\
      return baseDifference(array, slice(arguments, 1));\n\
    }\n\
\n\
    /**\n\
     * Creates an array that is the symmetric difference of the provided arrays.\n\
     * See http://en.wikipedia.org/wiki/Symmetric_difference.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Arrays\n\
     * @param {...Array} [array] The arrays to inspect.\n\
     * @returns {Array} Returns an array of values.\n\
     * @example\n\
     *\n\
     * _.xor([1, 2, 3], [5, 2, 1, 4]);\n\
     * // => [3, 5, 4]\n\
     *\n\
     * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);\n\
     * // => [1, 4, 5]\n\
     */\n\
    function xor() {\n\
      var index = -1,\n\
          length = arguments.length;\n\
\n\
      while (++index < length) {\n\
        var array = arguments[index];\n\
        if (isArray(array) || isArguments(array)) {\n\
          var result = result\n\
            ? baseUniq(baseDifference(result, array).concat(baseDifference(array, result)))\n\
            : array;\n\
        }\n\
      }\n\
      return result || [];\n\
    }\n\
\n\
    /**\n\
     * Creates an array of grouped elements, the first of which contains the first\n\
     * elements of the given arrays, the second of which contains the second\n\
     * elements of the given arrays, and so on.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias unzip\n\
     * @category Arrays\n\
     * @param {...Array} [array] Arrays to process.\n\
     * @returns {Array} Returns a new array of grouped elements.\n\
     * @example\n\
     *\n\
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);\n\
     * // => [['fred', 30, true], ['barney', 40, false]]\n\
     */\n\
    function zip() {\n\
      var array = arguments.length > 1 ? arguments : arguments[0],\n\
          index = -1,\n\
          length = array ? max(pluck(array, 'length')) : 0,\n\
          result = Array(length < 0 ? 0 : length);\n\
\n\
      while (++index < length) {\n\
        result[index] = pluck(array, index);\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Creates an object composed from arrays of `keys` and `values`. Provide\n\
     * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`\n\
     * or two arrays, one of `keys` and one of corresponding `values`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @alias object\n\
     * @category Arrays\n\
     * @param {Array} keys The array of keys.\n\
     * @param {Array} [values=[]] The array of values.\n\
     * @returns {Object} Returns an object composed of the given keys and\n\
     *  corresponding values.\n\
     * @example\n\
     *\n\
     * _.zipObject(['fred', 'barney'], [30, 40]);\n\
     * // => { 'fred': 30, 'barney': 40 }\n\
     */\n\
    function zipObject(keys, values) {\n\
      var index = -1,\n\
          length = keys ? keys.length : 0,\n\
          result = {};\n\
\n\
      if (!values && length && !isArray(keys[0])) {\n\
        values = [];\n\
      }\n\
      while (++index < length) {\n\
        var key = keys[index];\n\
        if (values) {\n\
          result[key] = values[index];\n\
        } else if (key) {\n\
          result[key[0]] = key[1];\n\
        }\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * Creates a function that executes `func`, with  the `this` binding and\n\
     * arguments of the created function, only after being called `n` times.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {number} n The number of times the function must be called before\n\
     *  `func` is executed.\n\
     * @param {Function} func The function to restrict.\n\
     * @returns {Function} Returns the new restricted function.\n\
     * @example\n\
     *\n\
     * var saves = ['profile', 'settings'];\n\
     *\n\
     * var done = _.after(saves.length, function() {\n\
     *   console.log('Done saving!');\n\
     * });\n\
     *\n\
     * _.forEach(saves, function(type) {\n\
     *   asyncSave({ 'type': type, 'complete': done });\n\
     * });\n\
     * // => logs 'Done saving!', after all saves have completed\n\
     */\n\
    function after(n, func) {\n\
      if (!isFunction(func)) {\n\
        throw new TypeError;\n\
      }\n\
      return function() {\n\
        if (--n < 1) {\n\
          return func.apply(this, arguments);\n\
        }\n\
      };\n\
    }\n\
\n\
    /**\n\
     * Creates a function that, when called, invokes `func` with the `this`\n\
     * binding of `thisArg` and prepends any additional `bind` arguments to those\n\
     * provided to the bound function.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Function} func The function to bind.\n\
     * @param {*} [thisArg] The `this` binding of `func`.\n\
     * @param {...*} [arg] Arguments to be partially applied.\n\
     * @returns {Function} Returns the new bound function.\n\
     * @example\n\
     *\n\
     * var func = function(greeting) {\n\
     *   return greeting + ' ' + this.name;\n\
     * };\n\
     *\n\
     * func = _.bind(func, { 'name': 'fred' }, 'hi');\n\
     * func();\n\
     * // => 'hi fred'\n\
     */\n\
    function bind(func, thisArg) {\n\
      return arguments.length > 2\n\
        ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)\n\
        : createWrapper(func, 1, null, null, thisArg);\n\
    }\n\
\n\
    /**\n\
     * Binds methods of an object to the object itself, overwriting the existing\n\
     * method. Method names may be specified as individual arguments or as arrays\n\
     * of method names. If no method names are provided all the function properties\n\
     * of `object` will be bound.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Object} object The object to bind and assign the bound methods to.\n\
     * @param {...string} [methodName] The object method names to\n\
     *  bind, specified as individual method names or arrays of method names.\n\
     * @returns {Object} Returns `object`.\n\
     * @example\n\
     *\n\
     * var view = {\n\
     *   'label': 'docs',\n\
     *   'onClick': function() { console.log('clicked ' + this.label); }\n\
     * };\n\
     *\n\
     * _.bindAll(view);\n\
     * jQuery('#docs').on('click', view.onClick);\n\
     * // => logs 'clicked docs', when the button is clicked\n\
     */\n\
    function bindAll(object) {\n\
      var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),\n\
          index = -1,\n\
          length = funcs.length;\n\
\n\
      while (++index < length) {\n\
        var key = funcs[index];\n\
        object[key] = createWrapper(object[key], 1, null, null, object);\n\
      }\n\
      return object;\n\
    }\n\
\n\
    /**\n\
     * Creates a function that, when called, invokes the method at `object[key]`\n\
     * and prepends any additional `bindKey` arguments to those provided to the bound\n\
     * function. This method differs from `_.bind` by allowing bound functions to\n\
     * reference methods that will be redefined or don't yet exist.\n\
     * See http://michaux.ca/articles/lazy-function-definition-pattern.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Object} object The object the method belongs to.\n\
     * @param {string} key The key of the method.\n\
     * @param {...*} [arg] Arguments to be partially applied.\n\
     * @returns {Function} Returns the new bound function.\n\
     * @example\n\
     *\n\
     * var object = {\n\
     *   'name': 'fred',\n\
     *   'greet': function(greeting) {\n\
     *     return greeting + ' ' + this.name;\n\
     *   }\n\
     * };\n\
     *\n\
     * var func = _.bindKey(object, 'greet', 'hi');\n\
     * func();\n\
     * // => 'hi fred'\n\
     *\n\
     * object.greet = function(greeting) {\n\
     *   return greeting + 'ya ' + this.name + '!';\n\
     * };\n\
     *\n\
     * func();\n\
     * // => 'hiya fred!'\n\
     */\n\
    function bindKey(object, key) {\n\
      return arguments.length > 2\n\
        ? createWrapper(key, 19, slice(arguments, 2), null, object)\n\
        : createWrapper(key, 3, null, null, object);\n\
    }\n\
\n\
    /**\n\
     * Creates a function that is the composition of the provided functions,\n\
     * where each function consumes the return value of the function that follows.\n\
     * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.\n\
     * Each function is executed with the `this` binding of the composed function.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {...Function} [func] Functions to compose.\n\
     * @returns {Function} Returns the new composed function.\n\
     * @example\n\
     *\n\
     * var realNameMap = {\n\
     *   'pebbles': 'penelope'\n\
     * };\n\
     *\n\
     * var format = function(name) {\n\
     *   name = realNameMap[name.toLowerCase()] || name;\n\
     *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();\n\
     * };\n\
     *\n\
     * var greet = function(formatted) {\n\
     *   return 'Hiya ' + formatted + '!';\n\
     * };\n\
     *\n\
     * var welcome = _.compose(greet, format);\n\
     * welcome('pebbles');\n\
     * // => 'Hiya Penelope!'\n\
     */\n\
    function compose() {\n\
      var funcs = arguments,\n\
          length = funcs.length;\n\
\n\
      while (length--) {\n\
        if (!isFunction(funcs[length])) {\n\
          throw new TypeError;\n\
        }\n\
      }\n\
      return function() {\n\
        var args = arguments,\n\
            length = funcs.length;\n\
\n\
        while (length--) {\n\
          args = [funcs[length].apply(this, args)];\n\
        }\n\
        return args[0];\n\
      };\n\
    }\n\
\n\
    /**\n\
     * Creates a function which accepts one or more arguments of `func` that when\n\
     * invoked either executes `func` returning its result, if all `func` arguments\n\
     * have been provided, or returns a function that accepts one or more of the\n\
     * remaining `func` arguments, and so on. The arity of `func` can be specified\n\
     * if `func.length` is not sufficient.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Function} func The function to curry.\n\
     * @param {number} [arity=func.length] The arity of `func`.\n\
     * @returns {Function} Returns the new curried function.\n\
     * @example\n\
     *\n\
     * var curried = _.curry(function(a, b, c) {\n\
     *   console.log(a + b + c);\n\
     * });\n\
     *\n\
     * curried(1)(2)(3);\n\
     * // => 6\n\
     *\n\
     * curried(1, 2)(3);\n\
     * // => 6\n\
     *\n\
     * curried(1, 2, 3);\n\
     * // => 6\n\
     */\n\
    function curry(func, arity) {\n\
      arity = typeof arity == 'number' ? arity : (+arity || func.length);\n\
      return createWrapper(func, 4, null, null, null, arity);\n\
    }\n\
\n\
    /**\n\
     * Creates a function that will delay the execution of `func` until after\n\
     * `wait` milliseconds have elapsed since the last time it was invoked.\n\
     * Provide an options object to indicate that `func` should be invoked on\n\
     * the leading and/or trailing edge of the `wait` timeout. Subsequent calls\n\
     * to the debounced function will return the result of the last `func` call.\n\
     *\n\
     * Note: If `leading` and `trailing` options are `true` `func` will be called\n\
     * on the trailing edge of the timeout only if the the debounced function is\n\
     * invoked more than once during the `wait` timeout.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Function} func The function to debounce.\n\
     * @param {number} wait The number of milliseconds to delay.\n\
     * @param {Object} [options] The options object.\n\
     * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.\n\
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.\n\
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.\n\
     * @returns {Function} Returns the new debounced function.\n\
     * @example\n\
     *\n\
     * // avoid costly calculations while the window size is in flux\n\
     * var lazyLayout = _.debounce(calculateLayout, 150);\n\
     * jQuery(window).on('resize', lazyLayout);\n\
     *\n\
     * // execute `sendMail` when the click event is fired, debouncing subsequent calls\n\
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {\n\
     *   'leading': true,\n\
     *   'trailing': false\n\
     * });\n\
     *\n\
     * // ensure `batchLog` is executed once after 1 second of debounced calls\n\
     * var source = new EventSource('/stream');\n\
     * source.addEventListener('message', _.debounce(batchLog, 250, {\n\
     *   'maxWait': 1000\n\
     * }, false);\n\
     */\n\
    function debounce(func, wait, options) {\n\
      var args,\n\
          maxTimeoutId,\n\
          result,\n\
          stamp,\n\
          thisArg,\n\
          timeoutId,\n\
          trailingCall,\n\
          lastCalled = 0,\n\
          maxWait = false,\n\
          trailing = true;\n\
\n\
      if (!isFunction(func)) {\n\
        throw new TypeError;\n\
      }\n\
      wait = nativeMax(0, wait) || 0;\n\
      if (options === true) {\n\
        var leading = true;\n\
        trailing = false;\n\
      } else if (isObject(options)) {\n\
        leading = options.leading;\n\
        maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);\n\
        trailing = 'trailing' in options ? options.trailing : trailing;\n\
      }\n\
      var delayed = function() {\n\
        var remaining = wait - (now() - stamp);\n\
        if (remaining <= 0) {\n\
          if (maxTimeoutId) {\n\
            clearTimeout(maxTimeoutId);\n\
          }\n\
          var isCalled = trailingCall;\n\
          maxTimeoutId = timeoutId = trailingCall = undefined;\n\
          if (isCalled) {\n\
            lastCalled = now();\n\
            result = func.apply(thisArg, args);\n\
            if (!timeoutId && !maxTimeoutId) {\n\
              args = thisArg = null;\n\
            }\n\
          }\n\
        } else {\n\
          timeoutId = setTimeout(delayed, remaining);\n\
        }\n\
      };\n\
\n\
      var maxDelayed = function() {\n\
        if (timeoutId) {\n\
          clearTimeout(timeoutId);\n\
        }\n\
        maxTimeoutId = timeoutId = trailingCall = undefined;\n\
        if (trailing || (maxWait !== wait)) {\n\
          lastCalled = now();\n\
          result = func.apply(thisArg, args);\n\
          if (!timeoutId && !maxTimeoutId) {\n\
            args = thisArg = null;\n\
          }\n\
        }\n\
      };\n\
\n\
      return function() {\n\
        args = arguments;\n\
        stamp = now();\n\
        thisArg = this;\n\
        trailingCall = trailing && (timeoutId || !leading);\n\
\n\
        if (maxWait === false) {\n\
          var leadingCall = leading && !timeoutId;\n\
        } else {\n\
          if (!maxTimeoutId && !leading) {\n\
            lastCalled = stamp;\n\
          }\n\
          var remaining = maxWait - (stamp - lastCalled),\n\
              isCalled = remaining <= 0;\n\
\n\
          if (isCalled) {\n\
            if (maxTimeoutId) {\n\
              maxTimeoutId = clearTimeout(maxTimeoutId);\n\
            }\n\
            lastCalled = stamp;\n\
            result = func.apply(thisArg, args);\n\
          }\n\
          else if (!maxTimeoutId) {\n\
            maxTimeoutId = setTimeout(maxDelayed, remaining);\n\
          }\n\
        }\n\
        if (isCalled && timeoutId) {\n\
          timeoutId = clearTimeout(timeoutId);\n\
        }\n\
        else if (!timeoutId && wait !== maxWait) {\n\
          timeoutId = setTimeout(delayed, wait);\n\
        }\n\
        if (leadingCall) {\n\
          isCalled = true;\n\
          result = func.apply(thisArg, args);\n\
        }\n\
        if (isCalled && !timeoutId && !maxTimeoutId) {\n\
          args = thisArg = null;\n\
        }\n\
        return result;\n\
      };\n\
    }\n\
\n\
    /**\n\
     * Defers executing the `func` function until the current call stack has cleared.\n\
     * Additional arguments will be provided to `func` when it is invoked.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Function} func The function to defer.\n\
     * @param {...*} [arg] Arguments to invoke the function with.\n\
     * @returns {number} Returns the timer id.\n\
     * @example\n\
     *\n\
     * _.defer(function(text) { console.log(text); }, 'deferred');\n\
     * // logs 'deferred' after one or more milliseconds\n\
     */\n\
    function defer(func) {\n\
      if (!isFunction(func)) {\n\
        throw new TypeError;\n\
      }\n\
      var args = slice(arguments, 1);\n\
      return setTimeout(function() { func.apply(undefined, args); }, 1);\n\
    }\n\
\n\
    /**\n\
     * Executes the `func` function after `wait` milliseconds. Additional arguments\n\
     * will be provided to `func` when it is invoked.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Function} func The function to delay.\n\
     * @param {number} wait The number of milliseconds to delay execution.\n\
     * @param {...*} [arg] Arguments to invoke the function with.\n\
     * @returns {number} Returns the timer id.\n\
     * @example\n\
     *\n\
     * _.delay(function(text) { console.log(text); }, 1000, 'later');\n\
     * // => logs 'later' after one second\n\
     */\n\
    function delay(func, wait) {\n\
      if (!isFunction(func)) {\n\
        throw new TypeError;\n\
      }\n\
      var args = slice(arguments, 2);\n\
      return setTimeout(function() { func.apply(undefined, args); }, wait);\n\
    }\n\
\n\
    /**\n\
     * Creates a function that memoizes the result of `func`. If `resolver` is\n\
     * provided it will be used to determine the cache key for storing the result\n\
     * based on the arguments provided to the memoized function. By default, the\n\
     * first argument provided to the memoized function is used as the cache key.\n\
     * The `func` is executed with the `this` binding of the memoized function.\n\
     * The result cache is exposed as the `cache` property on the memoized function.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Function} func The function to have its output memoized.\n\
     * @param {Function} [resolver] A function used to resolve the cache key.\n\
     * @returns {Function} Returns the new memoizing function.\n\
     * @example\n\
     *\n\
     * var fibonacci = _.memoize(function(n) {\n\
     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);\n\
     * });\n\
     *\n\
     * fibonacci(9)\n\
     * // => 34\n\
     *\n\
     * var data = {\n\
     *   'fred': { 'name': 'fred', 'age': 40 },\n\
     *   'pebbles': { 'name': 'pebbles', 'age': 1 }\n\
     * };\n\
     *\n\
     * // modifying the result cache\n\
     * var get = _.memoize(function(name) { return data[name]; }, _.identity);\n\
     * get('pebbles');\n\
     * // => { 'name': 'pebbles', 'age': 1 }\n\
     *\n\
     * get.cache.pebbles.name = 'penelope';\n\
     * get('pebbles');\n\
     * // => { 'name': 'penelope', 'age': 1 }\n\
     */\n\
    function memoize(func, resolver) {\n\
      if (!isFunction(func)) {\n\
        throw new TypeError;\n\
      }\n\
      var memoized = function() {\n\
        var cache = memoized.cache,\n\
            key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];\n\
\n\
        return hasOwnProperty.call(cache, key)\n\
          ? cache[key]\n\
          : (cache[key] = func.apply(this, arguments));\n\
      }\n\
      memoized.cache = {};\n\
      return memoized;\n\
    }\n\
\n\
    /**\n\
     * Creates a function that is restricted to execute `func` once. Repeat calls to\n\
     * the function will return the value of the first call. The `func` is executed\n\
     * with the `this` binding of the created function.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Function} func The function to restrict.\n\
     * @returns {Function} Returns the new restricted function.\n\
     * @example\n\
     *\n\
     * var initialize = _.once(createApplication);\n\
     * initialize();\n\
     * initialize();\n\
     * // `initialize` executes `createApplication` once\n\
     */\n\
    function once(func) {\n\
      var ran,\n\
          result;\n\
\n\
      if (!isFunction(func)) {\n\
        throw new TypeError;\n\
      }\n\
      return function() {\n\
        if (ran) {\n\
          return result;\n\
        }\n\
        ran = true;\n\
        result = func.apply(this, arguments);\n\
\n\
        // clear the `func` variable so the function may be garbage collected\n\
        func = null;\n\
        return result;\n\
      };\n\
    }\n\
\n\
    /**\n\
     * Creates a function that, when called, invokes `func` with any additional\n\
     * `partial` arguments prepended to those provided to the new function. This\n\
     * method is similar to `_.bind` except it does **not** alter the `this` binding.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Function} func The function to partially apply arguments to.\n\
     * @param {...*} [arg] Arguments to be partially applied.\n\
     * @returns {Function} Returns the new partially applied function.\n\
     * @example\n\
     *\n\
     * var greet = function(greeting, name) { return greeting + ' ' + name; };\n\
     * var hi = _.partial(greet, 'hi');\n\
     * hi('fred');\n\
     * // => 'hi fred'\n\
     */\n\
    function partial(func) {\n\
      return createWrapper(func, 16, slice(arguments, 1));\n\
    }\n\
\n\
    /**\n\
     * This method is like `_.partial` except that `partial` arguments are\n\
     * appended to those provided to the new function.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Function} func The function to partially apply arguments to.\n\
     * @param {...*} [arg] Arguments to be partially applied.\n\
     * @returns {Function} Returns the new partially applied function.\n\
     * @example\n\
     *\n\
     * var defaultsDeep = _.partialRight(_.merge, _.defaults);\n\
     *\n\
     * var options = {\n\
     *   'variable': 'data',\n\
     *   'imports': { 'jq': $ }\n\
     * };\n\
     *\n\
     * defaultsDeep(options, _.templateSettings);\n\
     *\n\
     * options.variable\n\
     * // => 'data'\n\
     *\n\
     * options.imports\n\
     * // => { '_': _, 'jq': $ }\n\
     */\n\
    function partialRight(func) {\n\
      return createWrapper(func, 32, null, slice(arguments, 1));\n\
    }\n\
\n\
    /**\n\
     * Creates a function that, when executed, will only call the `func` function\n\
     * at most once per every `wait` milliseconds. Provide an options object to\n\
     * indicate that `func` should be invoked on the leading and/or trailing edge\n\
     * of the `wait` timeout. Subsequent calls to the throttled function will\n\
     * return the result of the last `func` call.\n\
     *\n\
     * Note: If `leading` and `trailing` options are `true` `func` will be called\n\
     * on the trailing edge of the timeout only if the the throttled function is\n\
     * invoked more than once during the `wait` timeout.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {Function} func The function to throttle.\n\
     * @param {number} wait The number of milliseconds to throttle executions to.\n\
     * @param {Object} [options] The options object.\n\
     * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.\n\
     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.\n\
     * @returns {Function} Returns the new throttled function.\n\
     * @example\n\
     *\n\
     * // avoid excessively updating the position while scrolling\n\
     * var throttled = _.throttle(updatePosition, 100);\n\
     * jQuery(window).on('scroll', throttled);\n\
     *\n\
     * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes\n\
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {\n\
     *   'trailing': false\n\
     * }));\n\
     */\n\
    function throttle(func, wait, options) {\n\
      var leading = true,\n\
          trailing = true;\n\
\n\
      if (!isFunction(func)) {\n\
        throw new TypeError;\n\
      }\n\
      if (options === false) {\n\
        leading = false;\n\
      } else if (isObject(options)) {\n\
        leading = 'leading' in options ? options.leading : leading;\n\
        trailing = 'trailing' in options ? options.trailing : trailing;\n\
      }\n\
      debounceOptions.leading = leading;\n\
      debounceOptions.maxWait = wait;\n\
      debounceOptions.trailing = trailing;\n\
\n\
      return debounce(func, wait, debounceOptions);\n\
    }\n\
\n\
    /**\n\
     * Creates a function that provides `value` to the wrapper function as its\n\
     * first argument. Additional arguments provided to the function are appended\n\
     * to those provided to the wrapper function. The wrapper is executed with\n\
     * the `this` binding of the created function.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Functions\n\
     * @param {*} value The value to wrap.\n\
     * @param {Function} wrapper The wrapper function.\n\
     * @returns {Function} Returns the new function.\n\
     * @example\n\
     *\n\
     * var p = _.wrap(_.escape, function(func, text) {\n\
     *   return '<p>' + func(text) + '</p>';\n\
     * });\n\
     *\n\
     * p('Fred, Wilma, & Pebbles');\n\
     * // => '<p>Fred, Wilma, &amp; Pebbles</p>'\n\
     */\n\
    function wrap(value, wrapper) {\n\
      return createWrapper(wrapper, 16, [value]);\n\
    }\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * Creates a function that returns `value`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {*} value The value to return from the new function.\n\
     * @returns {Function} Returns the new function.\n\
     * @example\n\
     *\n\
     * var object = { 'name': 'fred' };\n\
     * var getter = _.constant(object);\n\
     * getter() === object;\n\
     * // => true\n\
     */\n\
    function constant(value) {\n\
      return function() {\n\
        return value;\n\
      };\n\
    }\n\
\n\
    /**\n\
     * Produces a callback bound to an optional `thisArg`. If `func` is a property\n\
     * name the created callback will return the property value for a given element.\n\
     * If `func` is an object the created callback will return `true` for elements\n\
     * that contain the equivalent object properties, otherwise it will return `false`.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {*} [func=identity] The value to convert to a callback.\n\
     * @param {*} [thisArg] The `this` binding of the created callback.\n\
     * @param {number} [argCount] The number of arguments the callback accepts.\n\
     * @returns {Function} Returns a callback function.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36 },\n\
     *   { 'name': 'fred',   'age': 40 }\n\
     * ];\n\
     *\n\
     * // wrap to create custom callback shorthands\n\
     * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {\n\
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);\n\
     *   return !match ? func(callback, thisArg) : function(object) {\n\
     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];\n\
     *   };\n\
     * });\n\
     *\n\
     * _.filter(characters, 'age__gt38');\n\
     * // => [{ 'name': 'fred', 'age': 40 }]\n\
     */\n\
    function createCallback(func, thisArg, argCount) {\n\
      var type = typeof func;\n\
      if (func == null || type == 'function') {\n\
        return baseCreateCallback(func, thisArg, argCount);\n\
      }\n\
      // handle \"_.pluck\" style callback shorthands\n\
      if (type != 'object') {\n\
        return property(func);\n\
      }\n\
      var props = keys(func),\n\
          key = props[0],\n\
          a = func[key];\n\
\n\
      // handle \"_.where\" style callback shorthands\n\
      if (props.length == 1 && a === a && !isObject(a)) {\n\
        // fast path the common case of providing an object with a single\n\
        // property containing a primitive value\n\
        return function(object) {\n\
          var b = object[key];\n\
          return a === b && (a !== 0 || (1 / a == 1 / b));\n\
        };\n\
      }\n\
      return function(object) {\n\
        var length = props.length,\n\
            result = false;\n\
\n\
        while (length--) {\n\
          if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {\n\
            break;\n\
          }\n\
        }\n\
        return result;\n\
      };\n\
    }\n\
\n\
    /**\n\
     * Converts the characters `&`, `<`, `>`, `\"`, and `'` in `string` to their\n\
     * corresponding HTML entities.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {string} string The string to escape.\n\
     * @returns {string} Returns the escaped string.\n\
     * @example\n\
     *\n\
     * _.escape('Fred, Wilma, & Pebbles');\n\
     * // => 'Fred, Wilma, &amp; Pebbles'\n\
     */\n\
    function escape(string) {\n\
      return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);\n\
    }\n\
\n\
    /**\n\
     * This method returns the first argument provided to it.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {*} value Any value.\n\
     * @returns {*} Returns `value`.\n\
     * @example\n\
     *\n\
     * var object = { 'name': 'fred' };\n\
     * _.identity(object) === object;\n\
     * // => true\n\
     */\n\
    function identity(value) {\n\
      return value;\n\
    }\n\
\n\
    /**\n\
     * Adds function properties of a source object to the destination object.\n\
     * If `object` is a function methods will be added to its prototype as well.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {Function|Object} [object=lodash] object The destination object.\n\
     * @param {Object} source The object of functions to add.\n\
     * @param {Object} [options] The options object.\n\
     * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.\n\
     * @example\n\
     *\n\
     * function capitalize(string) {\n\
     *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();\n\
     * }\n\
     *\n\
     * _.mixin({ 'capitalize': capitalize });\n\
     * _.capitalize('fred');\n\
     * // => 'Fred'\n\
     *\n\
     * _('fred').capitalize().value();\n\
     * // => 'Fred'\n\
     *\n\
     * _.mixin({ 'capitalize': capitalize }, { 'chain': false });\n\
     * _('fred').capitalize();\n\
     * // => 'Fred'\n\
     */\n\
    function mixin(object, source, options) {\n\
      var chain = true,\n\
          methodNames = source && functions(source);\n\
\n\
      if (!source || (!options && !methodNames.length)) {\n\
        if (options == null) {\n\
          options = source;\n\
        }\n\
        ctor = lodashWrapper;\n\
        source = object;\n\
        object = lodash;\n\
        methodNames = functions(source);\n\
      }\n\
      if (options === false) {\n\
        chain = false;\n\
      } else if (isObject(options) && 'chain' in options) {\n\
        chain = options.chain;\n\
      }\n\
      var ctor = object,\n\
          isFunc = isFunction(ctor);\n\
\n\
      forEach(methodNames, function(methodName) {\n\
        var func = object[methodName] = source[methodName];\n\
        if (isFunc) {\n\
          ctor.prototype[methodName] = function() {\n\
            var chainAll = this.__chain__,\n\
                value = this.__wrapped__,\n\
                args = [value];\n\
\n\
            push.apply(args, arguments);\n\
            var result = func.apply(object, args);\n\
            if (chain || chainAll) {\n\
              if (value === result && isObject(result)) {\n\
                return this;\n\
              }\n\
              result = new ctor(result);\n\
              result.__chain__ = chainAll;\n\
            }\n\
            return result;\n\
          };\n\
        }\n\
      });\n\
    }\n\
\n\
    /**\n\
     * Reverts the '_' variable to its previous value and returns a reference to\n\
     * the `lodash` function.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @returns {Function} Returns the `lodash` function.\n\
     * @example\n\
     *\n\
     * var lodash = _.noConflict();\n\
     */\n\
    function noConflict() {\n\
      context._ = oldDash;\n\
      return this;\n\
    }\n\
\n\
    /**\n\
     * A no-operation function.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @example\n\
     *\n\
     * var object = { 'name': 'fred' };\n\
     * _.noop(object) === undefined;\n\
     * // => true\n\
     */\n\
    function noop() {\n\
      // no operation performed\n\
    }\n\
\n\
    /**\n\
     * Gets the number of milliseconds that have elapsed since the Unix epoch\n\
     * (1 January 1970 00:00:00 UTC).\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @example\n\
     *\n\
     * var stamp = _.now();\n\
     * _.defer(function() { console.log(_.now() - stamp); });\n\
     * // => logs the number of milliseconds it took for the deferred function to be called\n\
     */\n\
    var now = isNative(now = Date.now) && now || function() {\n\
      return new Date().getTime();\n\
    };\n\
\n\
    /**\n\
     * Converts the given value into an integer of the specified radix.\n\
     * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the\n\
     * `value` is a hexadecimal, in which case a `radix` of `16` is used.\n\
     *\n\
     * Note: This method avoids differences in native ES3 and ES5 `parseInt`\n\
     * implementations. See http://es5.github.io/#E.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {string} value The value to parse.\n\
     * @param {number} [radix] The radix used to interpret the value to parse.\n\
     * @returns {number} Returns the new integer value.\n\
     * @example\n\
     *\n\
     * _.parseInt('08');\n\
     * // => 8\n\
     */\n\
    var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {\n\
      // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`\n\
      return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);\n\
    };\n\
\n\
    /**\n\
     * Creates a \"_.pluck\" style function, which returns the `key` value of a\n\
     * given object.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {string} key The name of the property to retrieve.\n\
     * @returns {Function} Returns the new function.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'fred',   'age': 40 },\n\
     *   { 'name': 'barney', 'age': 36 }\n\
     * ];\n\
     *\n\
     * var getName = _.property('name');\n\
     *\n\
     * _.map(characters, getName);\n\
     * // => ['barney', 'fred']\n\
     *\n\
     * _.sortBy(characters, getName);\n\
     * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]\n\
     */\n\
    function property(key) {\n\
      return function(object) {\n\
        return object[key];\n\
      };\n\
    }\n\
\n\
    /**\n\
     * Produces a random number between `min` and `max` (inclusive). If only one\n\
     * argument is provided a number between `0` and the given number will be\n\
     * returned. If `floating` is truey or either `min` or `max` are floats a\n\
     * floating-point number will be returned instead of an integer.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {number} [min=0] The minimum possible value.\n\
     * @param {number} [max=1] The maximum possible value.\n\
     * @param {boolean} [floating=false] Specify returning a floating-point number.\n\
     * @returns {number} Returns a random number.\n\
     * @example\n\
     *\n\
     * _.random(0, 5);\n\
     * // => an integer between 0 and 5\n\
     *\n\
     * _.random(5);\n\
     * // => also an integer between 0 and 5\n\
     *\n\
     * _.random(5, true);\n\
     * // => a floating-point number between 0 and 5\n\
     *\n\
     * _.random(1.2, 5.2);\n\
     * // => a floating-point number between 1.2 and 5.2\n\
     */\n\
    function random(min, max, floating) {\n\
      var noMin = min == null,\n\
          noMax = max == null;\n\
\n\
      if (floating == null) {\n\
        if (typeof min == 'boolean' && noMax) {\n\
          floating = min;\n\
          min = 1;\n\
        }\n\
        else if (!noMax && typeof max == 'boolean') {\n\
          floating = max;\n\
          noMax = true;\n\
        }\n\
      }\n\
      if (noMin && noMax) {\n\
        max = 1;\n\
      }\n\
      min = +min || 0;\n\
      if (noMax) {\n\
        max = min;\n\
        min = 0;\n\
      } else {\n\
        max = +max || 0;\n\
      }\n\
      if (floating || min % 1 || max % 1) {\n\
        var rand = nativeRandom();\n\
        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max);\n\
      }\n\
      return baseRandom(min, max);\n\
    }\n\
\n\
    /**\n\
     * Resolves the value of property `key` on `object`. If `key` is a function\n\
     * it will be invoked with the `this` binding of `object` and its result returned,\n\
     * else the property value is returned. If `object` is falsey then `undefined`\n\
     * is returned.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {Object} object The object to inspect.\n\
     * @param {string} key The name of the property to resolve.\n\
     * @returns {*} Returns the resolved value.\n\
     * @example\n\
     *\n\
     * var object = {\n\
     *   'cheese': 'crumpets',\n\
     *   'stuff': function() {\n\
     *     return 'nonsense';\n\
     *   }\n\
     * };\n\
     *\n\
     * _.result(object, 'cheese');\n\
     * // => 'crumpets'\n\
     *\n\
     * _.result(object, 'stuff');\n\
     * // => 'nonsense'\n\
     */\n\
    function result(object, key) {\n\
      if (object) {\n\
        var value = object[key];\n\
        return isFunction(value) ? object[key]() : value;\n\
      }\n\
    }\n\
\n\
    /**\n\
     * A micro-templating method that handles arbitrary delimiters, preserves\n\
     * whitespace, and correctly escapes quotes within interpolated code.\n\
     *\n\
     * Note: In the development build, `_.template` utilizes sourceURLs for easier\n\
     * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl\n\
     *\n\
     * For more information on precompiling templates see:\n\
     * http://lodash.com/custom-builds\n\
     *\n\
     * For more information on Chrome extension sandboxes see:\n\
     * http://developer.chrome.com/stable/extensions/sandboxingEval.html\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {string} text The template text.\n\
     * @param {Object} data The data object used to populate the text.\n\
     * @param {Object} [options] The options object.\n\
     * @param {RegExp} [options.escape] The \"escape\" delimiter.\n\
     * @param {RegExp} [options.evaluate] The \"evaluate\" delimiter.\n\
     * @param {Object} [options.imports] An object to import into the template as local variables.\n\
     * @param {RegExp} [options.interpolate] The \"interpolate\" delimiter.\n\
     * @param {string} [sourceURL] The sourceURL of the template's compiled source.\n\
     * @param {string} [variable] The data object variable name.\n\
     * @returns {Function|string} Returns a compiled function when no `data` object\n\
     *  is given, else it returns the interpolated text.\n\
     * @example\n\
     *\n\
     * // using the \"interpolate\" delimiter to create a compiled template\n\
     * var compiled = _.template('hello <%= name %>');\n\
     * compiled({ 'name': 'fred' });\n\
     * // => 'hello fred'\n\
     *\n\
     * // using the \"escape\" delimiter to escape HTML in data property values\n\
     * _.template('<b><%- value %></b>', { 'value': '<script>' });\n\
     * // => '<b>&lt;script&gt;</b>'\n\
     *\n\
     * // using the \"evaluate\" delimiter to generate HTML\n\
     * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';\n\
     * _.template(list, { 'people': ['fred', 'barney'] });\n\
     * // => '<li>fred</li><li>barney</li>'\n\
     *\n\
     * // using the ES6 delimiter as an alternative to the default \"interpolate\" delimiter\n\
     * _.template('hello ${ name }', { 'name': 'pebbles' });\n\
     * // => 'hello pebbles'\n\
     *\n\
     * // using the internal `print` function in \"evaluate\" delimiters\n\
     * _.template('<% print(\"hello \" + name); %>!', { 'name': 'barney' });\n\
     * // => 'hello barney!'\n\
     *\n\
     * // using a custom template delimiters\n\
     * _.templateSettings = {\n\
     *   'interpolate': /{{([\\s\\S]+?)}}/g\n\
     * };\n\
     *\n\
     * _.template('hello {{ name }}!', { 'name': 'mustache' });\n\
     * // => 'hello mustache!'\n\
     *\n\
     * // using the `imports` option to import jQuery\n\
     * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';\n\
     * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });\n\
     * // => '<li>fred</li><li>barney</li>'\n\
     *\n\
     * // using the `sourceURL` option to specify a custom sourceURL for the template\n\
     * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });\n\
     * compiled(data);\n\
     * // => find the source of \"greeting.jst\" under the Sources tab or Resources panel of the web inspector\n\
     *\n\
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template\n\
     * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });\n\
     * compiled.source;\n\
     * // => function(data) {\n\
     *   var __t, __p = '', __e = _.escape;\n\
     *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';\n\
     *   return __p;\n\
     * }\n\
     *\n\
     * // using the `source` property to inline compiled templates for meaningful\n\
     * // line numbers in error messages and a stack trace\n\
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\\\n\
     *   var JST = {\\\n\
     *     \"main\": ' + _.template(mainText).source + '\\\n\
     *   };\\\n\
     * ');\n\
     */\n\
    function template(text, data, options) {\n\
      // based on John Resig's `tmpl` implementation\n\
      // http://ejohn.org/blog/javascript-micro-templating/\n\
      // and Laura Doktorova's doT.js\n\
      // https://github.com/olado/doT\n\
      var settings = lodash.templateSettings;\n\
      text = String(text || '');\n\
\n\
      // avoid missing dependencies when `iteratorTemplate` is not defined\n\
      options = defaults({}, options, settings);\n\
\n\
      var imports = defaults({}, options.imports, settings.imports),\n\
          importsKeys = keys(imports),\n\
          importsValues = values(imports);\n\
\n\
      var isEvaluating,\n\
          index = 0,\n\
          interpolate = options.interpolate || reNoMatch,\n\
          source = \"__p += '\";\n\
\n\
      // compile the regexp to match each delimiter\n\
      var reDelimiters = RegExp(\n\
        (options.escape || reNoMatch).source + '|' +\n\
        interpolate.source + '|' +\n\
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +\n\
        (options.evaluate || reNoMatch).source + '|$'\n\
      , 'g');\n\
\n\
      text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {\n\
        interpolateValue || (interpolateValue = esTemplateValue);\n\
\n\
        // escape characters that cannot be included in string literals\n\
        source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);\n\
\n\
        // replace delimiters with snippets\n\
        if (escapeValue) {\n\
          source += \"' +\\n\
__e(\" + escapeValue + \") +\\n\
'\";\n\
        }\n\
        if (evaluateValue) {\n\
          isEvaluating = true;\n\
          source += \"';\\n\
\" + evaluateValue + \";\\n\
__p += '\";\n\
        }\n\
        if (interpolateValue) {\n\
          source += \"' +\\n\
((__t = (\" + interpolateValue + \")) == null ? '' : __t) +\\n\
'\";\n\
        }\n\
        index = offset + match.length;\n\
\n\
        // the JS engine embedded in Adobe products requires returning the `match`\n\
        // string in order to produce the correct `offset` value\n\
        return match;\n\
      });\n\
\n\
      source += \"';\\n\
\";\n\
\n\
      // if `variable` is not specified, wrap a with-statement around the generated\n\
      // code to add the data object to the top of the scope chain\n\
      var variable = options.variable,\n\
          hasVariable = variable;\n\
\n\
      if (!hasVariable) {\n\
        variable = 'obj';\n\
        source = 'with (' + variable + ') {\\n\
' + source + '\\n\
}\\n\
';\n\
      }\n\
      // cleanup code by stripping empty strings\n\
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)\n\
        .replace(reEmptyStringMiddle, '$1')\n\
        .replace(reEmptyStringTrailing, '$1;');\n\
\n\
      // frame code as the function body\n\
      source = 'function(' + variable + ') {\\n\
' +\n\
        (hasVariable ? '' : variable + ' || (' + variable + ' = {});\\n\
') +\n\
        \"var __t, __p = '', __e = _.escape\" +\n\
        (isEvaluating\n\
          ? ', __j = Array.prototype.join;\\n\
' +\n\
            \"function print() { __p += __j.call(arguments, '') }\\n\
\"\n\
          : ';\\n\
'\n\
        ) +\n\
        source +\n\
        'return __p\\n\
}';\n\
\n\
      // Use a sourceURL for easier debugging.\n\
      // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl\n\
      var sourceURL = '\\n\
/*\\n\
//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\\n\
*/';\n\
\n\
      try {\n\
        var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);\n\
      } catch(e) {\n\
        e.source = source;\n\
        throw e;\n\
      }\n\
      if (data) {\n\
        return result(data);\n\
      }\n\
      // provide the compiled function's source by its `toString` method, in\n\
      // supported environments, or the `source` property as a convenience for\n\
      // inlining compiled templates during the build process\n\
      result.source = source;\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * Executes the callback `n` times, returning an array of the results\n\
     * of each callback execution. The callback is bound to `thisArg` and invoked\n\
     * with one argument; (index).\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {number} n The number of times to execute the callback.\n\
     * @param {Function} callback The function called per iteration.\n\
     * @param {*} [thisArg] The `this` binding of `callback`.\n\
     * @returns {Array} Returns an array of the results of each `callback` execution.\n\
     * @example\n\
     *\n\
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6));\n\
     * // => [3, 6, 4]\n\
     *\n\
     * _.times(3, function(n) { mage.castSpell(n); });\n\
     * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively\n\
     *\n\
     * _.times(3, function(n) { this.cast(n); }, mage);\n\
     * // => also calls `mage.castSpell(n)` three times\n\
     */\n\
    function times(n, callback, thisArg) {\n\
      n = (n = +n) > -1 ? n : 0;\n\
      var index = -1,\n\
          result = Array(n);\n\
\n\
      callback = baseCreateCallback(callback, thisArg, 1);\n\
      while (++index < n) {\n\
        result[index] = callback(index);\n\
      }\n\
      return result;\n\
    }\n\
\n\
    /**\n\
     * The inverse of `_.escape` this method converts the HTML entities\n\
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their\n\
     * corresponding characters.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {string} string The string to unescape.\n\
     * @returns {string} Returns the unescaped string.\n\
     * @example\n\
     *\n\
     * _.unescape('Fred, Barney &amp; Pebbles');\n\
     * // => 'Fred, Barney & Pebbles'\n\
     */\n\
    function unescape(string) {\n\
      return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);\n\
    }\n\
\n\
    /**\n\
     * Generates a unique ID. If `prefix` is provided the ID will be appended to it.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Utilities\n\
     * @param {string} [prefix] The value to prefix the ID with.\n\
     * @returns {string} Returns the unique ID.\n\
     * @example\n\
     *\n\
     * _.uniqueId('contact_');\n\
     * // => 'contact_104'\n\
     *\n\
     * _.uniqueId();\n\
     * // => '105'\n\
     */\n\
    function uniqueId(prefix) {\n\
      var id = ++idCounter;\n\
      return String(prefix == null ? '' : prefix) + id;\n\
    }\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * Creates a `lodash` object that wraps the given value with explicit\n\
     * method chaining enabled.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Chaining\n\
     * @param {*} value The value to wrap.\n\
     * @returns {Object} Returns the wrapper object.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney',  'age': 36 },\n\
     *   { 'name': 'fred',    'age': 40 },\n\
     *   { 'name': 'pebbles', 'age': 1 }\n\
     * ];\n\
     *\n\
     * var youngest = _.chain(characters)\n\
     *     .sortBy('age')\n\
     *     .map(function(chr) { return chr.name + ' is ' + chr.age; })\n\
     *     .first()\n\
     *     .value();\n\
     * // => 'pebbles is 1'\n\
     */\n\
    function chain(value) {\n\
      value = new lodashWrapper(value);\n\
      value.__chain__ = true;\n\
      return value;\n\
    }\n\
\n\
    /**\n\
     * Invokes `interceptor` with the `value` as the first argument and then\n\
     * returns `value`. The purpose of this method is to \"tap into\" a method\n\
     * chain in order to perform operations on intermediate results within\n\
     * the chain.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @category Chaining\n\
     * @param {*} value The value to provide to `interceptor`.\n\
     * @param {Function} interceptor The function to invoke.\n\
     * @returns {*} Returns `value`.\n\
     * @example\n\
     *\n\
     * _([1, 2, 3, 4])\n\
     *  .tap(function(array) { array.pop(); })\n\
     *  .reverse()\n\
     *  .value();\n\
     * // => [3, 2, 1]\n\
     */\n\
    function tap(value, interceptor) {\n\
      interceptor(value);\n\
      return value;\n\
    }\n\
\n\
    /**\n\
     * Enables explicit method chaining on the wrapper object.\n\
     *\n\
     * @name chain\n\
     * @memberOf _\n\
     * @category Chaining\n\
     * @returns {*} Returns the wrapper object.\n\
     * @example\n\
     *\n\
     * var characters = [\n\
     *   { 'name': 'barney', 'age': 36 },\n\
     *   { 'name': 'fred',   'age': 40 }\n\
     * ];\n\
     *\n\
     * // without explicit chaining\n\
     * _(characters).first();\n\
     * // => { 'name': 'barney', 'age': 36 }\n\
     *\n\
     * // with explicit chaining\n\
     * _(characters).chain()\n\
     *   .first()\n\
     *   .pick('age')\n\
     *   .value();\n\
     * // => { 'age': 36 }\n\
     */\n\
    function wrapperChain() {\n\
      this.__chain__ = true;\n\
      return this;\n\
    }\n\
\n\
    /**\n\
     * Produces the `toString` result of the wrapped value.\n\
     *\n\
     * @name toString\n\
     * @memberOf _\n\
     * @category Chaining\n\
     * @returns {string} Returns the string result.\n\
     * @example\n\
     *\n\
     * _([1, 2, 3]).toString();\n\
     * // => '1,2,3'\n\
     */\n\
    function wrapperToString() {\n\
      return String(this.__wrapped__);\n\
    }\n\
\n\
    /**\n\
     * Extracts the wrapped value.\n\
     *\n\
     * @name valueOf\n\
     * @memberOf _\n\
     * @alias value\n\
     * @category Chaining\n\
     * @returns {*} Returns the wrapped value.\n\
     * @example\n\
     *\n\
     * _([1, 2, 3]).valueOf();\n\
     * // => [1, 2, 3]\n\
     */\n\
    function wrapperValueOf() {\n\
      return this.__wrapped__;\n\
    }\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    // add functions that return wrapped values when chaining\n\
    lodash.after = after;\n\
    lodash.assign = assign;\n\
    lodash.at = at;\n\
    lodash.bind = bind;\n\
    lodash.bindAll = bindAll;\n\
    lodash.bindKey = bindKey;\n\
    lodash.chain = chain;\n\
    lodash.compact = compact;\n\
    lodash.compose = compose;\n\
    lodash.constant = constant;\n\
    lodash.countBy = countBy;\n\
    lodash.create = create;\n\
    lodash.createCallback = createCallback;\n\
    lodash.curry = curry;\n\
    lodash.debounce = debounce;\n\
    lodash.defaults = defaults;\n\
    lodash.defer = defer;\n\
    lodash.delay = delay;\n\
    lodash.difference = difference;\n\
    lodash.filter = filter;\n\
    lodash.flatten = flatten;\n\
    lodash.forEach = forEach;\n\
    lodash.forEachRight = forEachRight;\n\
    lodash.forIn = forIn;\n\
    lodash.forInRight = forInRight;\n\
    lodash.forOwn = forOwn;\n\
    lodash.forOwnRight = forOwnRight;\n\
    lodash.functions = functions;\n\
    lodash.groupBy = groupBy;\n\
    lodash.indexBy = indexBy;\n\
    lodash.initial = initial;\n\
    lodash.intersection = intersection;\n\
    lodash.invert = invert;\n\
    lodash.invoke = invoke;\n\
    lodash.keys = keys;\n\
    lodash.map = map;\n\
    lodash.mapValues = mapValues;\n\
    lodash.max = max;\n\
    lodash.memoize = memoize;\n\
    lodash.merge = merge;\n\
    lodash.min = min;\n\
    lodash.omit = omit;\n\
    lodash.once = once;\n\
    lodash.pairs = pairs;\n\
    lodash.partial = partial;\n\
    lodash.partialRight = partialRight;\n\
    lodash.pick = pick;\n\
    lodash.pluck = pluck;\n\
    lodash.property = property;\n\
    lodash.pull = pull;\n\
    lodash.range = range;\n\
    lodash.reject = reject;\n\
    lodash.remove = remove;\n\
    lodash.rest = rest;\n\
    lodash.shuffle = shuffle;\n\
    lodash.sortBy = sortBy;\n\
    lodash.tap = tap;\n\
    lodash.throttle = throttle;\n\
    lodash.times = times;\n\
    lodash.toArray = toArray;\n\
    lodash.transform = transform;\n\
    lodash.union = union;\n\
    lodash.uniq = uniq;\n\
    lodash.values = values;\n\
    lodash.where = where;\n\
    lodash.without = without;\n\
    lodash.wrap = wrap;\n\
    lodash.xor = xor;\n\
    lodash.zip = zip;\n\
    lodash.zipObject = zipObject;\n\
\n\
    // add aliases\n\
    lodash.collect = map;\n\
    lodash.drop = rest;\n\
    lodash.each = forEach;\n\
    lodash.eachRight = forEachRight;\n\
    lodash.extend = assign;\n\
    lodash.methods = functions;\n\
    lodash.object = zipObject;\n\
    lodash.select = filter;\n\
    lodash.tail = rest;\n\
    lodash.unique = uniq;\n\
    lodash.unzip = zip;\n\
\n\
    // add functions to `lodash.prototype`\n\
    mixin(lodash);\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    // add functions that return unwrapped values when chaining\n\
    lodash.clone = clone;\n\
    lodash.cloneDeep = cloneDeep;\n\
    lodash.contains = contains;\n\
    lodash.escape = escape;\n\
    lodash.every = every;\n\
    lodash.find = find;\n\
    lodash.findIndex = findIndex;\n\
    lodash.findKey = findKey;\n\
    lodash.findLast = findLast;\n\
    lodash.findLastIndex = findLastIndex;\n\
    lodash.findLastKey = findLastKey;\n\
    lodash.has = has;\n\
    lodash.identity = identity;\n\
    lodash.indexOf = indexOf;\n\
    lodash.isArguments = isArguments;\n\
    lodash.isArray = isArray;\n\
    lodash.isBoolean = isBoolean;\n\
    lodash.isDate = isDate;\n\
    lodash.isElement = isElement;\n\
    lodash.isEmpty = isEmpty;\n\
    lodash.isEqual = isEqual;\n\
    lodash.isFinite = isFinite;\n\
    lodash.isFunction = isFunction;\n\
    lodash.isNaN = isNaN;\n\
    lodash.isNull = isNull;\n\
    lodash.isNumber = isNumber;\n\
    lodash.isObject = isObject;\n\
    lodash.isPlainObject = isPlainObject;\n\
    lodash.isRegExp = isRegExp;\n\
    lodash.isString = isString;\n\
    lodash.isUndefined = isUndefined;\n\
    lodash.lastIndexOf = lastIndexOf;\n\
    lodash.mixin = mixin;\n\
    lodash.noConflict = noConflict;\n\
    lodash.noop = noop;\n\
    lodash.now = now;\n\
    lodash.parseInt = parseInt;\n\
    lodash.random = random;\n\
    lodash.reduce = reduce;\n\
    lodash.reduceRight = reduceRight;\n\
    lodash.result = result;\n\
    lodash.runInContext = runInContext;\n\
    lodash.size = size;\n\
    lodash.some = some;\n\
    lodash.sortedIndex = sortedIndex;\n\
    lodash.template = template;\n\
    lodash.unescape = unescape;\n\
    lodash.uniqueId = uniqueId;\n\
\n\
    // add aliases\n\
    lodash.all = every;\n\
    lodash.any = some;\n\
    lodash.detect = find;\n\
    lodash.findWhere = find;\n\
    lodash.foldl = reduce;\n\
    lodash.foldr = reduceRight;\n\
    lodash.include = contains;\n\
    lodash.inject = reduce;\n\
\n\
    mixin(function() {\n\
      var source = {}\n\
      forOwn(lodash, function(func, methodName) {\n\
        if (!lodash.prototype[methodName]) {\n\
          source[methodName] = func;\n\
        }\n\
      });\n\
      return source;\n\
    }(), false);\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    // add functions capable of returning wrapped and unwrapped values when chaining\n\
    lodash.first = first;\n\
    lodash.last = last;\n\
    lodash.sample = sample;\n\
\n\
    // add aliases\n\
    lodash.take = first;\n\
    lodash.head = first;\n\
\n\
    forOwn(lodash, function(func, methodName) {\n\
      var callbackable = methodName !== 'sample';\n\
      if (!lodash.prototype[methodName]) {\n\
        lodash.prototype[methodName]= function(n, guard) {\n\
          var chainAll = this.__chain__,\n\
              result = func(this.__wrapped__, n, guard);\n\
\n\
          return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))\n\
            ? result\n\
            : new lodashWrapper(result, chainAll);\n\
        };\n\
      }\n\
    });\n\
\n\
    /*--------------------------------------------------------------------------*/\n\
\n\
    /**\n\
     * The semantic version number.\n\
     *\n\
     * @static\n\
     * @memberOf _\n\
     * @type string\n\
     */\n\
    lodash.VERSION = '2.4.1';\n\
\n\
    // add \"Chaining\" functions to the wrapper\n\
    lodash.prototype.chain = wrapperChain;\n\
    lodash.prototype.toString = wrapperToString;\n\
    lodash.prototype.value = wrapperValueOf;\n\
    lodash.prototype.valueOf = wrapperValueOf;\n\
\n\
    // add `Array` functions that return unwrapped values\n\
    baseEach(['join', 'pop', 'shift'], function(methodName) {\n\
      var func = arrayRef[methodName];\n\
      lodash.prototype[methodName] = function() {\n\
        var chainAll = this.__chain__,\n\
            result = func.apply(this.__wrapped__, arguments);\n\
\n\
        return chainAll\n\
          ? new lodashWrapper(result, chainAll)\n\
          : result;\n\
      };\n\
    });\n\
\n\
    // add `Array` functions that return the existing wrapped value\n\
    baseEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {\n\
      var func = arrayRef[methodName];\n\
      lodash.prototype[methodName] = function() {\n\
        func.apply(this.__wrapped__, arguments);\n\
        return this;\n\
      };\n\
    });\n\
\n\
    // add `Array` functions that return new wrapped values\n\
    baseEach(['concat', 'slice', 'splice'], function(methodName) {\n\
      var func = arrayRef[methodName];\n\
      lodash.prototype[methodName] = function() {\n\
        return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);\n\
      };\n\
    });\n\
\n\
    // avoid array-like object bugs with `Array#shift` and `Array#splice`\n\
    // in IE < 9, Firefox < 10, Narwhal, and RingoJS\n\
    if (!support.spliceObjects) {\n\
      baseEach(['pop', 'shift', 'splice'], function(methodName) {\n\
        var func = arrayRef[methodName],\n\
            isSplice = methodName == 'splice';\n\
\n\
        lodash.prototype[methodName] = function() {\n\
          var chainAll = this.__chain__,\n\
              value = this.__wrapped__,\n\
              result = func.apply(value, arguments);\n\
\n\
          if (value.length === 0) {\n\
            delete value[0];\n\
          }\n\
          return (chainAll || isSplice)\n\
            ? new lodashWrapper(result, chainAll)\n\
            : result;\n\
        };\n\
      });\n\
    }\n\
\n\
    return lodash;\n\
  }\n\
\n\
  /*--------------------------------------------------------------------------*/\n\
\n\
  // expose Lo-Dash\n\
  var _ = runInContext();\n\
\n\
  // some AMD build optimizers like r.js check for condition patterns like the following:\n\
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {\n\
    // Expose Lo-Dash to the global object even when an AMD loader is present in\n\
    // case Lo-Dash is loaded with a RequireJS shim config.\n\
    // See http://requirejs.org/docs/api.html#config-shim\n\
    root._ = _;\n\
\n\
    // define as an anonymous module so, through path mapping, it can be\n\
    // referenced as the \"underscore\" module\n\
    define(function() {\n\
      return _;\n\
    });\n\
  }\n\
  // check for `exports` after `define` in case a build optimizer adds an `exports` object\n\
  else if (freeExports && freeModule) {\n\
    // in Node.js or RingoJS\n\
    if (moduleExports) {\n\
      (freeModule.exports = _)._ = _;\n\
    }\n\
    // in Narwhal or Rhino -require\n\
    else {\n\
      freeExports._ = _;\n\
    }\n\
  }\n\
  else {\n\
    // in a browser or Rhino\n\
    root._ = _;\n\
  }\n\
}.call(this));\n\
\n\
//# sourceURL=components/lodash/lodash/2.4.1/dist/lodash.compat.js"
));

require.modules["lodash-lodash"] = require.modules["lodash~lodash@2.4.1"];
require.modules["lodash~lodash"] = require.modules["lodash~lodash@2.4.1"];
require.modules["lodash"] = require.modules["lodash~lodash@2.4.1"];


require.register("sidebar", Function("exports, module",
"\n\
\n\
var template = require(\"sidebar/templates/sidebar.hbs\");\n\
var jquery = require(\"components~jquery@2.1.1\");\n\
var lodash = require(\"lodash~lodash@2.4.1\");\n\
\n\
function sidebar(deferredLoading) {\n\
\n\
  function bindEvents() {\n\
    this.element.bind(\"click\", function (event) {\n\
      var target = jquery(event.target);\n\
      target.parent(\".sidebar\").toggleClass(\"pullLeft\");\n\
    });\n\
    jquery(window).resize(lodash.debounce(function onResize(event) {\n\
      resizeHandler(event);\n\
    }, 200));\n\
  }\n\
  function resizeHandler(e) {\n\
    if(this.innerHeight > window.innerHeight) {\n\
      return;\n\
    }\n\
    this.element.find(\"#commentsholder\").empty();\n\
    loadComments(this.url);\n\
  }\n\
\n\
  function attach(element, url) {\n\
    var el = element || \"body\";\n\
    jquery(el).append(template);\n\
    this.element = jquery(el).find(\".sidebar\");\n\
    this.url = url || window.location;\n\
    bindEvents();\n\
    loadComments(url);\n\
    this.innerHeight = window.innerHeight;\n\
  }\n\
\n\
  function loadComments(url) {\n\
    var sidebarWidth = parseInt(jquery(\"body\").css(\"width\") || 0, 10);\n\
    gapi.comments.render(\"commentsholder\", {\n\
      href: url || window.location,\n\
      width: Math.round((sidebarWidth * (1/2)).toString()),\n\
      first_party_property: 'BLOGGER',\n\
      view_type: 'FILTERED_POSTMOD'\n\
    });\n\
  }\n\
\n\
  if (!deferredLoading) {\n\
      var angular = angular || null;\n\
      if (angular && angular.element) {\n\
        angular.element(document).ready(function() {\n\
          attach();\n\
        }.bind(this))\n\
      } else {\n\
        jquery(document).ready(function() {\n\
          attach();\n\
        }.bind(this));\n\
      }\n\
  }\n\
  return {\n\
    attach: attach,\n\
    loadComments: loadComments\n\
  };\n\
}\n\
module.exports = sidebar();\n\
\n\
//# sourceURL=scripts/sidebar.js"
));

require.define("sidebar/templates/sidebar.hbs", "<div class=\"sidebar pull\">\n  <div class=\"gplus title-icon icon-google-plus\" attachpoint= \"tabIcon\" name=\"gplus\"></div>\n  <div class=\"commentsWrapper\">\n    <div class=\"comments holder\" id=\"commentsholder\">\n\n    <div>\n  </div>\n</div>\n");

require.modules["sidebar"] = require.modules["sidebar"];


require("sidebar")
