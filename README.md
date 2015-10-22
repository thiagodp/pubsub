# pubsub
A JavaScript _publish-subscribe_ pattern implementation that adds the pattern methods to *your* object. Just use the `empower` method passing your object as an argument and it will have `pub`, `sub`, and `unsub` methods. Thus you don't need to deal with a global PubSub object, as many libraries do out there. Use it just where you need it! ;)

 Example on how to use it:
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
 
 myObj.sub( 'onAnotherThing', function( a, b ) { console.log( a + b ); } );
 myObj.pub( 'onAnotherThing', [ 'hello', ' world' ] ); // prints hello world
 
 myObj.unsub( 'onSomething', sth );
 myObj.pub( 'onSomething' ); // prints only 'something happened again'
 
 myObj.unsub( 'onSomething', sth2 );
 myObj.pub( 'onSomething' ); // does nothing!
 
 myObj.sub( 'onSomething', sth );
 myObj.sub( 'onSomething', sth2 );
 myObj.unsub( 'onSomething' ); // remove all subscriptions to onSomething
 myObj.pub( 'onSomething' ); // does nothing!
 ```
