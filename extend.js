/**
* Creates extend method to the parent function.
*/
function extend(){
	/**
	* Creates child function.
	* @param  {object} mixins - methods to be added to new function prototype.
	*/
	return function (mixins){
		var Parent = this;
	
		var F = function() { }
		F.prototype = Parent.prototype;
		
		/**
		* Creating a new function.
		*/	
		var Child = function() { 
			/**
			* Execution of code inside the parent function.
			*/
			Parent.apply(this, arguments);
			/**
			* You can add code to be executed inside the new function 
			* and all its children to the method called "initialize".
			*/
			this.initialize.apply(this, arguments);
		}
		
		Child.prototype = new F();
		
		Child.prototype.constructor = Child;
		Child.superclass = Parent.prototype;
		Child.superclass.constructor = Parent;
		Child.extend = extend();
		Child.prototype.initialize = function(){};
		
		/**
		* Adding methods to prototype of new function.
		*/
		var mixins = Array.prototype.slice.call(arguments, 0);
		
		for (var i = 0; i < mixins.length; ++i)
		{
			for (var prop in mixins[i])
			{
				Child.prototype[prop] = mixins[i][prop];
			}
		}

		return Child;
	}
}


/*   --example--
var Class = function (){};
Class.extend = extend();

var Parent = Class.extend({
	name: 'Parent', 
	gettitle: function Parent_gettitle(){
		console.log('parent_method: ', this.name);
	}
});
var parent = new Parent();


var Child = Parent.extend({
	name: 'Child', 
	gettitle: function Child_gettitle(){
		this.constructor.superclass.gettitle.call(this);
		console.log('child_method: ', this.name);
	}
});
var child = new Child();

child.gettitle();


*/