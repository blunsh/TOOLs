/**
* Creates main object that can handle custom events.
*/	 
var events = (function (){
	var events = {};
	
	return {
	
		/**
		* Add a callback for custom event.
		* @param  {string} ename name of custom event.
		* @param  {function} callback 
		* @param  {object} scope 
		* @param  {object} args 
		*/	
		subscribe : function subscribe(ename, callback, scope, args){
			scope = scope || window;
			if (!events[ename]) events[ename] = [];
			events[ename].push({
				fun: callback,
				scope: scope,
				name: ename,
				args: args
			});
		},
		
		/**
		* Remove a callback for custom event.
		* @param  {string} ename name of custom event.
		* @param  {function} callback 
		* @param  {object} scope 
		*/	
		unsubscribe : function unsubscribe(ename, callback, scope){
			if (!events[ename]) return;
			for (var i=0; i < events[ename].length; i++){
				var el = events[ename][i];
				if (el.fun == callback && el.scope == scope) events[ename].splice(i, 1)
			};
			
		},
		
		/**
		* Tells that custom event is just happened.
		* Calls for all callback functions.
		* @param  {string} ename name of custom event.
		*/
		fire : function fire(ename){
			if (events[ename]){
				for (var i=0; i < events[ename].length; i++){
					var el = events[ename][i];
					el.fun.call(el.scope, el.args);
				};
			}
		},
		
		/**
		* Logs all events.
		*/
		log : function log(){
			console.log(events);
		}
	}
})();

/*   --example--

var obj = {
	name: 'Parent', 
	getName: function Obj_getName(){
		console.log('Obj_getName: ', this.name);
	}
};
function rename (newName){
	this.name = newName;
	this.getName();
};
events.subscribe('nameChange', rename, obj, 'Child');
console.log('subscribed');
events.fire('nameChange');


events.unsubscribe('nameChange', rename, obj);
console.log('unsubscribed');
events.fire('nameChange');

*/