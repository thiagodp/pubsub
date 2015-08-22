# pubsub
A simple publish-subscribe pattern implementation (in JavaScript).

 How to use it:
```javascript
 var myObj = {}; // your object
 
 ( new PubSub() ).empower( myObj ); // add methods "pub", "sub", and "unsub" to your object
 
 var sth = function() { console.log( 'something happened' ); };
 var sth2 = function() { console.log( 'something happened again' ); };
 
 myObj.sub( 'onSomething', sth );
 myObj.sub( 'onSomething', sth2 );
 myObj.pub( 'onSomething' ); // prints 'something happened' and 'something happened again'
 
 myObj.sub( 'onOtherThing', function( value ) { console.log( value ); } );
 myObj.pub( 'onOtherThing', [ 10 ] ); // prints 10
 
 myObj.unsub( 'onSomething', sth );
 myObj.pub( 'onSomething' ); // prints only 'something happened again'
 
 myObj.unsub( 'onSomething', sth2 );
 myObj.pub( 'onSomething' ); // does nothing!
 
 myObj.sub( 'onSomething', sth );
 myObj.sub( 'onSomething', sth2 );
 myObj.unsub( 'onSomething' ); // remove all subscriptions
 myObj.pub( 'onSomething' ); // does nothing!
 ```
