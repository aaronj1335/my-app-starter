import createStore from 'redux/lib/createStore';

import auth from './auth/reducer';

var _instance;

function accessor() {
  if (!_instance)
    _instance = createStore((state, action) => auth(state, action));

  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined')
    window.store = _instance;

  return _instance;
};

accessor.reset = () => _instance = null;

export default accessor;
