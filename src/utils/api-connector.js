export default function apiConnector(endpoint, method='GET', json={}) {
  return new Promise((resolve, reject) => {
    const cors_url = process.env.GATSBY_USE_CORS === 'TRUE' ? 'https://cors-anywhere.herokuapp.com/' : '';
    const protocol = 'https://';
    const host = process.env.GATSBY_API_HOST || 'localhost';
    const headers = { 'Content-Type': 'application/json' };

    const url = cors_url + protocol + host + endpoint;
    let options = { method: method };
    if (method === 'POST') {
      options.headers = headers;
      options.body = JSON.stringify(json);
    }

    fetch(url, options).then(response => {
      response.json().then(response_json => {
        response_json.error ? reject(response_json.error) : resolve(response_json);
      }).catch(error => reject(error));
    }).catch(error => reject(error));
  });
}

function handleError(error, error_callback=null) {
  console.error(error);
  error_callback !== null && error_callback(error);
}

export function fetch_last_action(resolve_callback) {
  apiConnector('/last_action_on_messages').then(result => {
    result.value && resolve_callback(result.value);
  }).catch(error => handleError(error));
}

export function fetch_messages(resolve_callback) {
  apiConnector('/messages').then(result => {
    resolve_callback(result.map(message => {
      message.key = message.id;
      return message;
    }));
  }).catch(error => handleError(error));
}
