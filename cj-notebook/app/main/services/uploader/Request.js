import request from 'request-promise-native';
import pkg from '../../../../package.json';

const Request = request.defaults({
  jar: request.jar(),
  'User-Agent': `CJNotebook/${pkg.version}`,
});

export default Request;
