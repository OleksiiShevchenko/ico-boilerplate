import superagent from 'superagent';

export default class ApiClient {
  constructor(prefix) {
    if (!prefix) throw new Error('[apiPrefix] required');
    this.prefix = prefix;
    this.token = window.localStorage.getItem('token') || null;
  }

  setToken(token) {
    this.token = token;
    window.localStorage.setItem('token', token);
  }

  removeToken() {
    this.token = null;
    window.localStorage.removeItem('token');
  }

  get(url, params = {}) {
    return this._request({ url, method: 'get', params });
  }

  post(url, body) {
    return this._request({ url, method: 'post', body });
  }

  patch(url, body) {
    return this._request({ url, method: 'patch', body });
  }

  put(url, body) {
    return this._request({ url, method: 'put', body });
  }

  delete(url, body) {
    return this._request({ url, method: 'delete', body });
  }

  download(url) {
    return this._request({
      url: url.replace(this.prefix, ''),
      method: 'get',
      download: true,
    });
  }

  _request({ url, method, params, body, download = false }) {
    const req = superagent[method](`${this.prefix}${url}`);

    if (download) req.responseType('blob');
    if (params) req.query(params);
    if (body) req.send(body);

    return req.then(res => {
      if (res.type !== 'application/json') return res.xhr.response;
      return res.body;
    });
  }
}
