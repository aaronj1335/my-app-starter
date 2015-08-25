/** @module accessor
 *
 * @description this module exports a helper function to create an easy
 * singleton accessor. a lot of our app-level data stores will probably be
 * instantiated only once and shared among all the components. so given some
 * class, i.e.:
 *
 *     class MyStore extends EventEmitter {
 *       // ...
 *     }
 *
 * we'll probably want one instance of this shared, but if we are to unit test
 * it, we'll need a way to clear out that singleton. this utility cleans up
 * some of that boiler plate:
 *
 *    export default createAccessor(MyStore);
 *
 * and then you can use it in your views as follows:
 *
 *    import myStore from 'my-store';
 *    var instance1 = myStore();
 *    var stillInstance1 = myStore();
 *    console.log(instance1 === stillInstance1); // -> true
 *    myStore.reset()
 *    var instance2 = myStore(); // new instance
 */
export default function createAccessor(Class) {
  var instance;

  function accessor() {
    if (!instance)
      instance = new Class();

    return instance;
  }

  accessor.reset = function reset() {
    instance = null;
  }

  accessor[Class.name || 'Class'] = Class;

  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined'
      && Class.name) {
    var name = Class.name[0].toLowerCase() + Class.name.slice(1) + '_';

    if (!window[name])
      window[name] = accessor;
  }

  return accessor;
};
