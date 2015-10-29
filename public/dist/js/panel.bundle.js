webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(8);
	module.exports = __webpack_require__(13);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./AppController": 4,
		"./AppController.js": 4
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 3;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10).extend("AppController", {
	  // Layout: require("game.views.Layout"),
	  config: "ractive",

	  routes: {
	    "setContext": "setContext",
	  },

	  setContext: function( screen_name, tab, context, action ){
	    var state = { 
	      screen:    screen_name,
	      tab:       tab,
	      context:   context,
	      action:    action,
	    };
	    this.reset( "state", state );
	  },



	});


/***/ },
/* 5 */
/***/ function(module, exports) {

	// Config namespace object
	module.exports = {};

/***/ },
/* 6 */
1,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);

	var with_constructor    = "function @@(){return proto.constructor.apply(this, arguments)}";
	var without_constructor = "function @@(){ return parent.apply(this, arguments); };";

	// var extend = function(name, proto, statics){
	  
	//   var parent = this;
	//   if(typeof name === "string" && /^[a-z][a-z0-9]*$/i.test(name)){
	//     name = name;
	//   }
	//   else{
	//     statics = proto;
	//     proto = name;
	//     name = "child";
	//   }

	//   name = (parent.__className) || "child"+"_"+name;

	//   // The constructor function for the new subclass is either defined by you
	//   // (the "constructor" property in your `extend` definition), or defaulted
	//   // by us to simply call the parent's constructor.

	//   // if (protoProps && _.has(protoProps, 'constructor')) { //first call parent's constructor, then current
	//   //   eval("function "+name+"(){return protoProps.constructor.apply(this, arguments)}");
	//   // } else {
	//   //   eval("function "+name+"(){ return parent.apply(this, arguments); };");
	//   // }

	//   eval((proto && _.has(proto, 'constructor')?with_constructor:without_constructor).replace("@@", name))
	//   var child = eval(name);

	//   // Add static properties to the constructor function, if supplied.
	//   _.extend(child, parent, statics);

	//   // Set the prototype chain to inherit from `parent`, without calling
	//   // `parent`'s constructor function.
	//   var Surrogate = function(){
	//     this.constructor = child; 
	//   };

	//   Surrogate.prototype = parent.prototype;
	//   child.prototype = new Surrogate;
	//   child.__className = (statics || {}).__className || name;

	//   // Add prototype properties (instance properties) to the subclass,
	//   // if supplied.
	//   if (proto) _.extend(child.prototype, proto);

	//   // Set a convenience property in case the parent's prototype is needed
	//   // later.
	//   child.__super__ = parent.prototype;

	//   return eval(name);
	// };

	var Class = function(){
	  if(this.initialize) this.initialize.apply(this, arguments);
	};
	Class.__className = "Class";
	// minified version will work faster
	Class.extend = function(name,proto,statics){var parent=this;"string"==typeof name&&/^[a-z][a-z0-9]*$/i.test(name)?name=name:(statics=proto,proto=name,name="child"),name=parent.__className||"child_"+name,eval((proto&&_.has(proto,"constructor")?with_constructor:without_constructor).replace("@@",name));var child=eval(name);_.extend(child,parent,statics);var Surrogate=function(){this.constructor=child};return Surrogate.prototype=parent.prototype,child.prototype=new Surrogate,child.__className=(statics||{}).__className||name,proto&&_.extend(child.prototype,proto),child.__super__=parent.prototype,eval(name)};

	module.exports = Class;




	// Original extend function in case evaluating class names is not good idea
	// var _ = require("underscore");

	// var extend = function(protoProps, staticProps) {
	//   var parent = this;
	//   var child;

	//   // The constructor function for the new subclass is either defined by you
	//   // (the "constructor" property in your `extend` definition), or defaulted
	//   // by us to simply call the parent's constructor.
	//   if (protoProps && _.has(protoProps, 'constructor')) {
	//     child = protoProps.constructor;
	//   } else {
	//     child = function(){ return parent.apply(this, arguments); };
	//   }

	//   // Add static properties to the constructor function, if supplied.
	//   _.extend(child, parent, staticProps);

	//   // Set the prototype chain to inherit from `parent`, without calling
	//   // `parent`'s constructor function.
	//   var Surrogate = function(){ this.constructor = child; };
	//   Surrogate.prototype = parent.prototype;
	//   child.prototype = new Surrogate;

	//   // Add prototype properties (instance properties) to the subclass,
	//   // if supplied.
	//   if (protoProps) _.extend(child.prototype, protoProps);

	//   // Set a convenience property in case the parent's prototype is needed
	//   // later.
	//   child.__super__ = parent.prototype;

	//   return child;
	// };

	// var Class = function(){
	//   if(this.initialize) this.initialize.apply(this, arguments);
	// };
	// Class.prototype.extend = extend;

	// module.exports = Class;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// var _           = require("underscore");
	// var bulk        = require("bulk-require");
	var App         = __webpack_require__(12);

	// require("panel.controllers.AppController");

	App.config(__webpack_require__(3));
	App.Controllers = App.bulk(__webpack_require__(3));

	var volen = __webpack_require__(15);


	// var ctx = require.context("./controllers");

	// window.req = ctx;

	// console.log("context: ", ctx)


	                  // bulk(__dirname+"/boot",             ["**/*.js",   "**/*.coffee" ] );
	// App.partials    = bulk(__dirname+"/views/partials",   [ "**/*.html"               ] );
	// App.Models      = bulk(__dirname+"/models",           [ "**/*.js",  "**/*.coffee" ] );
	// App.Controllers = bulk(__dirname+"/controllers",      [ "**/*.js",  "**/*.coffee" ] );

	//var app         = require("app");
	// app.init({
	//   App:          App,
	//   config:       require("config"),
	//   settings:     window.settings,
	//   routes:       require("./routes.json"),
	//   data:         require("data")
	// }, function(err){
	//   console.log(err?err.stack:undefined);
	//   if(err) throw err;
	//   console.log("app initialized");



	// });


/***/ },
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _            = __webpack_require__(11);
	var helpers      = __webpack_require__(19); 
	var Controller   = __webpack_require__(17);
	var Router       = __webpack_require__(18);

	/*
	  // Every controller can:
	  {

	    data: {...},  // attach data to main data namespace
	    
	    routes: {
	      route_name: "method" or ["method", "method_2"],
	    },

	    observe: {
	      dataPath: "method" or ["method", "method_2"],
	    },

	    events: {
	      event_name: "method" or ["method", "method_2"],
	    },

	    config: "config.path" or { ... }

	  }
	*/

	module.exports = Controller.extend("BaseRactiveAppController", {

	  init: function(options, cb){
	    var self = this;
	    if(!document.body){
	      window.onload = function(){
	        self.init(options, cb);
	      }
	      return;
	    }
	    var app_config = {};
	    if(this.config) app_config = helpers.resolve(options.config, this.config);

	    this.options  = options;
	    this.config   = options.config;
	    this.settings = options.settings;

	    this.setupRouter(options);

	    helpers.chain([

	      function(cb){
	        if(this.Layout){
	          var container = config.container;
	          var element;
	          if(!container) element = document.body;
	          else           element = document.querySelector(container);
	          var self = this;
	          this.layout = new (this.Layout)({
	            data: options.data,
	            el:   element,
	            onrender: function(){ self.layout = this; cb(); }
	          });

	        }
	        else cb();  
	      },

	      function(cb){ this.setupControllers(cb); },

	      function(cb){
	        this.router.bindRoutes(this.routes);
	        this.router.startHistory();
	        this.trigger("ready");
	        cb();
	      }

	    ])(cb, this);

	  },

	  setupRouter: function(options){
	    this.router = new Router(options.routes);
	  },

	  setupControllers: function(cb){
	    var self       = this;
	    var App        = this.options.App;
	    var observers  = [];
	    var data       = this.options.data;
	    var config     = this.config;

	    this.routes && this.bindRoutes(this);

	    if(this.data) _.extend(data, this.data );

	    var controllerNames = _.without(_.keys(App.Controllers), "AppController");
	    controllerNames = _.sortBy(controllerNames, function(controllerName){
	      return typeof App.Controllers[controllerName].prototype.initOrder === "number"
	        ? App.Controllers[controllerName].prototype.initOrder
	        : controllerNames.length;
	    });
	    var initChain = controllerNames.map(function(controllerName){
	      var controllerPrototype = App.Controllers[controllerName];

	      if(controllerPrototype.prototype.config){
	        if(_.isString(controllerPrototype.prototype.config)){
	          controllerPrototype.prototype.config = helpers.resolve(config, controllerPrototype.prototype.config);
	        }
	      }

	      if(controllerPrototype.prototype.data) self.set(controllerPrototype.prototype.data );
	      var controller = self[controllerName] = new controllerPrototype();
	      controller.routes && controller.bindRoutes(self);
	      controller.app = self;
	      if(controller.observe && self.bindObserver){
	        observers.push(controller);
	      }
	      return controller;
	    }).map(function(controller){
	      if(!controller.init || controller.init.length!=2) return function(cb){
	        controller.init.call(controller, self.options);
	        cb();
	      }
	      return function(cb){
	        controller.init.call(controller, self.options, cb );
	      }
	    });

	    helpers.chain(initChain)(function(err){
	      if(err) return cb(err);
	      if(observers.length > 0){
	        observers.forEach(function(observer){
	          self.bindObserver(observer);
	        });
	      }
	      cb();
	    });
	  },

	  bindObserver: function(observer){
	    for(var key in observer.observe){
	      if(typeof observer[observer.observe[key]] === "function"){
	        this.observe( key, observer[observer.observe[key]].bind(observer) );
	      }
	    }
	  },

	  get:          function(){ return   this.layout.get          .apply(this.layout, arguments);              },
	  fetch:        function(){ return   this.layout.fetch        .apply(this.layout, arguments);              },
	  set:          function(){          this.layout.set          .apply(this.layout, arguments); return this; },
	  observe:      function(){          this.layout.observe      .apply(this.layout, arguments); return this; },
	  toggle:       function(){          this.layout.toggle       .apply(this.layout, arguments); return this; },
	  radioToggle:  function(){          this.layout.radioToggle  .apply(this.layout, arguments); return this; },
	  reset:        function(path, val){ this.layout.set(path, null); this.layout.set(path, val);              },
	  navigate:     function(path){      this.router.navigate(path.replace(/^\//, ""), true ) },


	});


/***/ },
/* 11 */
1,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Main App namespace
	var helpers = __webpack_require__(14);
	var _ = __webpack_require__(6);

	var App = module.exports = {
	  
	  bulk: function(context){
	    var result = {};
	    return _.chain( context.keys() )
	      .filter(function(path){ return !!path.match(/\.[a-z]{2,6}$/i); })
	      .map(function(path){
	        var prop_name = path.replace(/^\.\//, "").replace(/\.js$/i, "");
	        return [prop_name, context(path)];
	     }).object().value();
	  },

	  config: function(conf){
	    var config = __webpack_require__(5);
	    _.extend(config, typeof conf === "function" ? App.bulk(conf) : conf );
	  }

	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var _ = __webpack_require__(6);
	var helpers = module.exports = {
	  
	  everyIs: function(iterator){ return function(val){ return _.isArray(val) && _.every(val, iterator);} },

	  isOneOf: function(){
	    var comparators = Array.prototype.slice.call(arguments);
	    return function(val){
	      return _.some(comparators, function(comparator){
	        return comparator(val);
	      });
	    }
	  },

	  deepExtend: function(target, source){
	    for(var key in source){
	      if(_.isObject(target[key]) && _.isObject(source[key])){
	        helpers.deepExtend(target[key], source[key]);
	      }
	      else { target[key] = source[key]; }
	    }
	  },

	  filterObject: function(obj, iterator){
	    var result = {};
	    for(key in obj)
	      !!iterator(key, obj[key]) && (result[key] = obj[key]);
	    return result;
	  },

	  //Warning !!! - changing passed object
	  cleanObject: function(obj){ for(key in obj) !obj[key] && (delete obj[key]); },

	  // Takes number n and returns function that can be executed n times
	  // when n becomes 0, will be executed callback m in context C with arguments a,b and c
	  counter: function(n,m,C,a,b,c){return function(){n--;n===0&&m.call(C||this,a,b,c)}},
	  
	  // Generates a chain of functions
	  chain: function(fns, context){
	    var self = this;
	    fns = fns.map(function(f){
	      if(typeof f !== "function") {
	        return function(){
	          var ctx = this;
	          var args = Array.prototype.slice.call(arguments);
	          var chain_cb = args.pop();
	          helpers.amap(f, function(ob_fn, amap_cb){
	            ob_fn.apply(ctx, args.concat([amap_cb]));
	          }, chain_cb);
	        };
	      }
	      else{
	        return f;
	      }
	    });

	    var ft = "function", sl = [].slice, em = "callback not found!!";
	    return function(){var t,n=context||this,a=fns,r=-1,f=sl.call(arguments);if(t=f.pop(),typeof t!==ft&&(n=t,t=f.pop()),typeof t!==ft)throw new Error(em);var l=function(){var f=arguments[0];if(f)return t(f);if(!a[++r])return t.apply(n,arguments);try{a[r].apply(n,sl.call(arguments,1).concat([l]))}catch(f){t.call(n,f)}};l.finish=t,fns.length?(r++,f.push(l),fns[0].apply(n,f)):(f.unshift(null),t.apply(n,f))};
	    // return function(){
	    //   var cb,c=context||this,ch=fns,ptr=-1;
	    //   var a=sl.call(arguments);
	    //   cb = a.pop();
	    //   if(typeof cb!==ft) c=cb,cb=a.pop();
	    //   if(typeof cb!==ft) throw new Error(em);
	    //   var n=function(){
	    //     var e=arguments[0];
	    //     if(e) return cb(e);
	    //     if(!ch[++ptr]) return cb.apply(c, arguments);
	    //     try{ch[ptr].apply(c,sl.call(arguments,1).concat([n]));}
	    //     catch(e){cb.call(c,e);}
	    //   }
	    //   n.finish=cb;
	    //   if(fns.length){
	    //     ptr++;
	    //     a.push(n);
	    //     fns[0].apply(c,a);
	    //   }
	    //   else{
	    //     a.unshift(null);
	    //     cb.apply(c,a);
	    //   }
	    // };

	  },

	  amapCompose: function(obj, iterator){
	    return function(ob, itr, cb){
	      helpers.amap( ob||obj, itr||iterator, cb, this);
	    }
	  },

	  runFnsIterator: function(fn, cb){fn(cb);},
	  amap: function(r,n,t,a){a=a||this,n?Array.isArray(n)&&(n=this.chain(n)):n=this.runFnsIterator;var i,e;if(Array.isArray(r)?(e=r.length,i=new Array(r.length)):(i={},e=Object.keys(r).length,r.forEach=function(n){for(var t in r)"forEach"!==t&&n(r[t],t,r)}),0===e)return t(null,r);var f;r.forEach(function(r,c){setTimeout(function(){n.call(a,r,function(r,n){if(f!==!0){if(r)return f=!0,t(r);i[c]=n,e--,0===e&&t(null,i)}})},0)}),Array.isArray(r)||delete r.forEach},
	  // amap: function(arr, iterator, cb, ctx){
	  //   ctx = ctx || this;
	  //   if(!iterator) iterator = this.runFnsIterator;
	  //   else if(Array.isArray(iterator)) iterator = this.chain(iterator);
	  //   var results, counter;
	  //   if(!Array.isArray(arr)){
	  //     results = {};
	  //     counter = Object.keys(arr).length;
	  //     arr.forEach = function(itr){
	  //       for(var key in arr) {
	  //         if(key==="forEach") continue;
	  //         itr(arr[key], key, arr);
	  //       }
	  //     }
	  //   }
	  //   else{
	  //     counter = arr.length;
	  //     results = new Array(arr.length);
	  //   }
	  //   if(counter===0) return cb(null, arr);

	  //   var  error;
	  //   arr.forEach(function(el, idx, arr){
	  //     setTimeout(function(){
	  //       iterator.call(ctx, el, function(err, result){
	  //         if(error === true) return;
	  //         if(err){error = true; return cb(err);}
	  //         results[idx] = result;
	  //         counter--;
	  //         if(counter===0) {
	  //           cb(null, results);
	  //         }
	  //       });
	  //     }, 0);
	  //   });
	  //   if(!Array.isArray(arr)) delete arr.forEach;
	  // },

	  parseArgs: function(a){
	    var r    = { params: Array.prototype.call.slice(a), ctx: global};
	    var last = Array.prototype.call.slice(a, -2);
	    var l1   = last.pop();
	    var l2   = last.pop();
	    if(typeof l1 === "function"){
	      r.cb   = r.params.pop();
	      return r;
	    }
	    else if(typeof l2 === "function"){
	      r.ctx  = r.params.pop();
	      r.cb   = r.params.pop();
	      return r;
	    }
	    return r;
	  },

	  defaultize: function(base, target){
	    if(Array.isArray(target)) target.forEach(function(t){_.defaults(t, base)});
	    else{
	      for(var key in target){
	        _.defaults(target[key], base);
	      }
	    }
	    return target;
	  },

	  instantiate: function(objects, Prototype){
	    if(_.isArray(objects)){
	      return objects.map(function(object){
	        return new Prototype(object);
	      });
	    }
	    else if(_.isObject(objects)){
	      var result = {};
	      for(var key in objects){
	        result[key] = new Prototype(objects[key]);
	      }
	      return result;
	    }
	    else{
	      return new Prototype(objects);
	    }
	  },

	  traverse: function(obj, iterator){
	    for(var key in obj){
	      (function(name, val){
	        if(_.isObject(val) && (typeof val !== "function")){
	          return helpers.traverse(val, iterator);
	        }
	        iterator(val, name, obj);
	      })(key, obj[key]);
	    }
	  },

	  resolve: function(target, path){
	    var parts = path.split("."), parent = target, last_target = parts.pop();
	    for(var i = 0; i< parts.length; i++){
	      if(!parent.hasOwnProperty(parts[i]) && !parent.__proto__.hasOwnProperty(parts[i])){
	        return undefined;
	      }
	      parent = parent[parts[i]];
	    }
	    return parent[last_target];
	  },

	  patch: function(target, path, val){
	    if(typeof path === "object"){
	      for(var key in path) helpers.patch(target, key, path[key]);
	      return;
	    }
	    var parts = path.split("."), parent = target, last = parts.pop();
	    for(var i = 0; i< parts.length; i++){
	      if(!parent.hasOwnProperty(parts[i]) && !parent.__proto__.hasOwnProperty(parts[i])) parent[parts[i]] = {};
	      parent = parent[parts[i]];
	    }
	    var real_target = (!parent[last] && !parent.__proto__[last] ? parent : ( !parent.__proto__[last] ? parent : parent.__proto__ ) );
	    real_target[last] = val;
	  }

	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "public/dist/images/82ba47a317adf2c825eb6f8fd71fb62e.jpg"

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
	var Backbone = __webpack_require__(2);
	var Class = __webpack_require__(7);

	var _ = __webpack_require__(1);

	var EventedClass = Class.extend("EventedClass", _.extend(Backbone.Events, {
	  
	  // EventedClass's constructor handles props like:
	  // events:{
	  //   "event_name": "method name",
	  //   "evt": ["method1", "method2", function(){}],
	  //   "event": function(){ ... }
	  // }

	  constructor: function(){
	    if(_.isObject(this.events)){
	      for(event in this.events){ var evt = this.events[event];
	        
	        if(_.isFunction(evt)) this.on(event, evt, this);
	        
	        else if(_.isString(evt) && _.isFunction(this[evt])){
	          this.on(event, this[evt], this);
	        }
	        
	        else if(_.isArray(evt)){
	          for(var i = 0;i< evt.length;i++){ var meth = evt[i];
	            if(_.isString(meth) && _.isFunction(this[meth])){
	              this.on(event, this[meth], this);
	            }
	            else if(_.isFunction(meth)){
	              this.on(event, meth, this);
	            }
	          }
	        }
	      }
	    }
	    Class.apply(this, arguments);
	  }

	}), Backbone.Events);
	module.exports = EventedClass;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);
	var EventedClass = __webpack_require__(16);

	module.exports = EventedClass.extend("Controller", {

	  bindRoutes: function(app){
	    for(var key in this.routes){
	      var handlerName = this.routes[key];
	      if(Array.isArray(handlerName)){
	        for(var i=0;i<handlerName.length;i++){
	          if(_.isFunction(this[handlerName[i]])){
	            app.router.on("route:"+key, this[handlerName[i]], this);
	          }
	        }
	      }
	      else{
	        if(_.isFunction(this[handlerName])){
	          app.router.on("route:"+key, this[handlerName], this);
	        }
	      }
	    }
	  }
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Backbone router needs jQuery to select 'window' and to attach 2 events to it
	// Creating simple mockup

	var Backbone               = __webpack_require__(2);
	var Class                  = __webpack_require__(7);

	var jQueryMockup = {
	  on: function(event, handler){
	    this.el.addEventListener(event, handler);
	    return jQueryMockup;
	  },
	  off: function(event, handler){
	    this.el.removeEventListener(event, handler);
	    return jQueryMockup;
	  }
	};

	Backbone.$ = function(el){
	  jQueryMockup.el = el;
	  return jQueryMockup;
	}

	function getLink(elem){
	  if(elem.nodeName === "A") return elem;
	  else if(!elem.parentNode) return null;
	  else return getLink(elem.parentNode);
	}

	function getHref(elem, rootPath){
	  if(!elem || !elem.href) return false;
	  var href = elem.getAttribute("href");
	  if( href.indexOf( "/" ) === 0 ){
	    if( href.indexOf(rootPath) === 0 ) return href.replace(/^\//, "");
	    else return false;
	  }
	  else if( href.indexOf( "javascript:" ) === -1 ) return rootPath + "/" + href;
	  return false;
	}

	var BaseRouter = Backbone.Router.extend({
	  
	  initialize: function(routes){
	    this.routes = routes;
	    var config  = __webpack_require__(5);
	    var router  = this;
	    var rootPath = document.getElementsByTagName("base")[0].href.replace(window.location.origin, ""); //config.router.base_path || "";
	    this.rootPath = rootPath.replace(/^\/+/, "");
	    document.body.addEventListener("click", function(e){
	      var href = getHref(getLink(e.target), rootPath);
	      if(href) {
	        e.preventDefault();
	        router.navigate(href, true);
	      }
	    });
	  },

	  startHistory: function(){
	    Backbone.history.start({pushState: true});
	  },

	  back: function(n){
	    Backbone.history.back(n || -1);
	  },

	  bindRoutes: function(){
	    var rootPath = this.rootPath;
	    for(var routePath in this.routes){
	      var routeName = this.routes[routePath];
	      if(Array.isArray(routeName)){
	        for(var i=0;i<routeName.length;i++){
	          this.route((rootPath+"/"+routePath).replace(/^\/+/,"").replace(/\/+$/,"").replace(/\/+/,"/"), routeName[i]);
	        }
	      }
	      else{
	        this.route((rootPath+"/"+routePath).replace(/^\/+/,"").replace(/\/+$/,"").replace(/\/+/,"/"), routeName);
	      }
	    }
	  }

	});

	BaseRouter.__className = "Router";
	BaseRouter.extend      = Class.extend;
	module.exports         = BaseRouter;





/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var _ = __webpack_require__(1);
	var helpers = module.exports = {
	  
	  everyIs: function(iterator){ return function(val){ return _.isArray(val) && _.every(val, iterator);} },

	  isOneOf: function(){
	    var comparators = Array.prototype.slice.call(arguments);
	    return function(val){
	      return _.some(comparators, function(comparator){
	        return comparator(val);
	      });
	    }
	  },

	  deepExtend: function(target, source){
	    for(var key in source){
	      if(_.isObject(target[key]) && _.isObject(source[key])){
	        helpers.deepExtend(target[key], source[key]);
	      }
	      else { target[key] = source[key]; }
	    }
	  },

	  filterObject: function(obj, iterator){
	    var result = {};
	    for(key in obj)
	      !!iterator(key, obj[key]) && (result[key] = obj[key]);
	    return result;
	  },

	  //Warning !!! - changing passed object
	  cleanObject: function(obj){ for(key in obj) !obj[key] && (delete obj[key]); },

	  // Takes number n and returns function that can be executed n times
	  // when n becomes 0, will be executed callback m in context C with arguments a,b and c
	  counter: function(n,m,C,a,b,c){return function(){n--;n===0&&m.call(C||this,a,b,c)}},
	  
	  // Generates a chain of functions
	  chain: function(fns, context){
	    var self = this;
	    fns = fns.map(function(f){
	      if(typeof f !== "function") {
	        return function(){
	          var ctx = this;
	          var args = Array.prototype.slice.call(arguments);
	          var chain_cb = args.pop();
	          helpers.amap(f, function(ob_fn, amap_cb){
	            ob_fn.apply(ctx, args.concat([amap_cb]));
	          }, chain_cb);
	        };
	      }
	      else{
	        return f;
	      }
	    });

	    var ft = "function", sl = [].slice, em = "callback not found!!";
	    return function(){var t,n=context||this,a=fns,r=-1,f=sl.call(arguments);if(t=f.pop(),typeof t!==ft&&(n=t,t=f.pop()),typeof t!==ft)throw new Error(em);var l=function(){var f=arguments[0];if(f)return t(f);if(!a[++r])return t.apply(n,arguments);try{a[r].apply(n,sl.call(arguments,1).concat([l]))}catch(f){t.call(n,f)}};l.finish=t,fns.length?(r++,f.push(l),fns[0].apply(n,f)):(f.unshift(null),t.apply(n,f))};
	    // return function(){
	    //   var cb,c=context||this,ch=fns,ptr=-1;
	    //   var a=sl.call(arguments);
	    //   cb = a.pop();
	    //   if(typeof cb!==ft) c=cb,cb=a.pop();
	    //   if(typeof cb!==ft) throw new Error(em);
	    //   var n=function(){
	    //     var e=arguments[0];
	    //     if(e) return cb(e);
	    //     if(!ch[++ptr]) return cb.apply(c, arguments);
	    //     try{ch[ptr].apply(c,sl.call(arguments,1).concat([n]));}
	    //     catch(e){cb.call(c,e);}
	    //   }
	    //   n.finish=cb;
	    //   if(fns.length){
	    //     ptr++;
	    //     a.push(n);
	    //     fns[0].apply(c,a);
	    //   }
	    //   else{
	    //     a.unshift(null);
	    //     cb.apply(c,a);
	    //   }
	    // };

	  },

	  amapCompose: function(obj, iterator){
	    return function(ob, itr, cb){
	      helpers.amap( ob||obj, itr||iterator, cb, this);
	    }
	  },

	  runFnsIterator: function(fn, cb){fn(cb);},
	  amap: function(r,n,t,a){a=a||this,n?Array.isArray(n)&&(n=this.chain(n)):n=this.runFnsIterator;var i,e;if(Array.isArray(r)?(e=r.length,i=new Array(r.length)):(i={},e=Object.keys(r).length,r.forEach=function(n){for(var t in r)"forEach"!==t&&n(r[t],t,r)}),0===e)return t(null,r);var f;r.forEach(function(r,c){setTimeout(function(){n.call(a,r,function(r,n){if(f!==!0){if(r)return f=!0,t(r);i[c]=n,e--,0===e&&t(null,i)}})},0)}),Array.isArray(r)||delete r.forEach},
	  // amap: function(arr, iterator, cb, ctx){
	  //   ctx = ctx || this;
	  //   if(!iterator) iterator = this.runFnsIterator;
	  //   else if(Array.isArray(iterator)) iterator = this.chain(iterator);
	  //   var results, counter;
	  //   if(!Array.isArray(arr)){
	  //     results = {};
	  //     counter = Object.keys(arr).length;
	  //     arr.forEach = function(itr){
	  //       for(var key in arr) {
	  //         if(key==="forEach") continue;
	  //         itr(arr[key], key, arr);
	  //       }
	  //     }
	  //   }
	  //   else{
	  //     counter = arr.length;
	  //     results = new Array(arr.length);
	  //   }
	  //   if(counter===0) return cb(null, arr);

	  //   var  error;
	  //   arr.forEach(function(el, idx, arr){
	  //     setTimeout(function(){
	  //       iterator.call(ctx, el, function(err, result){
	  //         if(error === true) return;
	  //         if(err){error = true; return cb(err);}
	  //         results[idx] = result;
	  //         counter--;
	  //         if(counter===0) {
	  //           cb(null, results);
	  //         }
	  //       });
	  //     }, 0);
	  //   });
	  //   if(!Array.isArray(arr)) delete arr.forEach;
	  // },

	  parseArgs: function(a){
	    var r    = { params: Array.prototype.call.slice(a), ctx: global};
	    var last = Array.prototype.call.slice(a, -2);
	    var l1   = last.pop();
	    var l2   = last.pop();
	    if(typeof l1 === "function"){
	      r.cb   = r.params.pop();
	      return r;
	    }
	    else if(typeof l2 === "function"){
	      r.ctx  = r.params.pop();
	      r.cb   = r.params.pop();
	      return r;
	    }
	    return r;
	  },

	  defaultize: function(base, target){
	    if(Array.isArray(target)) target.forEach(function(t){_.defaults(t, base)});
	    else{
	      for(var key in target){
	        _.defaults(target[key], base);
	      }
	    }
	    return target;
	  },

	  instantiate: function(objects, Prototype){
	    if(_.isArray(objects)){
	      return objects.map(function(object){
	        return new Prototype(object);
	      });
	    }
	    else if(_.isObject(objects)){
	      var result = {};
	      for(var key in objects){
	        result[key] = new Prototype(objects[key]);
	      }
	      return result;
	    }
	    else{
	      return new Prototype(objects);
	    }
	  },

	  traverse: function(obj, iterator, path){
	    path = path || [];
	    for(var key in obj){
	      (function(name, val){
	        if(_.isObject(val) && (typeof val !== "function")){
	          return helpers.traverse(val, iterator, path.concat([name]));
	        }
	        iterator(val, name, obj, path.concat([name]));
	      })(key, obj[key]);
	    }
	  },

	  resolve: function(target, path){
	    var parts = path.split("."), parent = target, last_target = parts.pop();
	    for(var i = 0; i< parts.length; i++){
	      if(!parent.hasOwnProperty(parts[i]) && !parent.__proto__.hasOwnProperty(parts[i])){
	        return undefined;
	      }
	      parent = parent[parts[i]];
	    }
	    return parent[last_target];
	  },

	  patch: function(target, path, val){
	    if(typeof path === "object"){
	      for(var key in path) helpers.patch(target, key, path[key]);
	      return;
	    }
	    var parts = path.split("."), parent = target, last = parts.pop();
	    for(var i = 0; i< parts.length; i++){
	      if(!parent.hasOwnProperty(parts[i]) && !parent.__proto__.hasOwnProperty(parts[i])) parent[parts[i]] = {};
	      parent = parent[parts[i]];
	    }
	    var real_target = (!parent[last] && !parent.__proto__[last] ? parent : ( !parent.__proto__[last] ? parent : parent.__proto__ ) );
	    real_target[last] = val;
	  }

	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
]);