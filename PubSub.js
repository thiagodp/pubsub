
/**
 *  PubSub is a simple publish-subscribe pattern implementation.
 *  
 *  @author		Thiago Delgado Pinto
 *  @version	1.0
 *  
 *  How to use it:
 *  
 *		var myObj = {};
 *		( new PubSub() ).empower( myObj ); // add methods "pub", "sub", and "unsub".
 *		  
 *		var sth = function() { console.log( 'something happened' ); };
 *		var sth2 = function() { console.log( 'something happened again' ); };
 *		  
 *		myObj.sub( 'onSomething', sth );
 *		myObj.sub( 'onSomething', sth2 );
 *		myObj.pub( 'onSomething' ); // prints 'something happened' and 'something happened again'
 *		  
 *		myObj.sub( 'onOtherThing', function( value ) { console.log( value ); } );
 *		myObj.pub( 'onOtherThing', [ 10 ] ); // prints 10
 *		  
 *		myObj.unsub( 'onSomething', sth );
 *		myObj.pub( 'onSomething' ); // prints only 'something happened again'
 *		
 *		myObj.unsub( 'onSomething', sth2 );
 *		myObj.pub( 'onSomething' ); // does nothing!
 *
 *		myObj.sub( 'onSomething', sth );
 *		myObj.sub( 'onSomething', sth2 );
 *		myObj.unsub( 'onSomething' ); // remove all subscriptions
 *		myObj.pub( 'onSomething' ); // does nothing!
 *  
 */
function PubSub() {
	'use strict';
	
	var _sub = function _sub( that ) {
		return function sub( event, cb ) {
			if ( that[ event ] === undefined ) {
				that[ event ] = [ cb ];
			} else {
				that[ event ].push( cb );
			}
		};
	};
	
	var _unsub = function _unsub( that ) {
		return function unsub( event, cb ) {
			if ( that[ event ] === undefined ) { return false; }
			if ( typeof cb === 'function' ) {
				var pos = that[ event ].indexOf( cb );
				if ( pos >= 0 ) {
					that[ event ].splice( pos, 1 );
					return true;
				}
				return false;
			}
			that[ event ] = []; // clear all events
			return true;
		};
	};
	
	var _pub = function _pub( that ) {
		return function pub( event, valueArray ) {
			if ( that[ event ] === undefined ) { return; }
			var arr = that[ event ];
			for ( var i in arr ) {
				arr[ i ].apply( that, valueArray );
			}
		};
	};

	/**
	 *  Adds these methods to the given object:
	 *  
	 *  	function sub( event, cb )
	 *  	function unsub( event, cb )
	 *  	function pub( event, valueArray )
	 */
	this.empower = function empower( that ) {
		that.sub = _sub( that );		// add function sub( event, cb )
		that.unsub = _unsub( that );	// add function unsub( event, cb )
		that.pub = _pub( that );		// add function pub( event, valueArray )
	};

}