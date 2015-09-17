export default function APIError(response, responseText) {
  this.name = 'APIError';
  this.message = responseText || 'There was a problem contacting the server.';
  this.stack = (new Error()).stack;
  this.response = response;
  this.responseText = responseText;
};

APIError.prototype = Object.create(Error.prototype);
APIError.prototype.constructor = APIError;
