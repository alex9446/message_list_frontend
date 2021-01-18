export function getSyncTiming() {
  return parseInt(process.env.GATSBY_SYNC_TIMING) || 5000;
}

export default function apiConnector(endpoint, method='GET', json={}) {
  return new Promise((resolve, reject) => {
    const cors_url = process.env.GATSBY_USE_CORS === 'TRUE' ? 'https://cors-anywhere.herokuapp.com/' : '';
    const protocol = 'https://';
    const host = process.env.GATSBY_API_HOST || 'localhost';
    const headers = { 'Content-Type': 'application/json' };

    const url = cors_url + protocol + host + endpoint;
    let options = { method: method };
    if (method === 'POST' || method === 'PATCH') {
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

export function push_event(event, onError) {
  let response;

  switch (event.type) {
    case 'add':
      response = apiConnector('/messages', 'POST', {text: event.data.text});
      break;
    case 'edit':
      response = apiConnector(`/messages/${event.data.remote_id}`, 'PATCH', {text: event.data.text});
      break;
    case 'delete':
      response = apiConnector(`/messages/${event.data.remote_id}`, 'DELETE');
      break;
    default:
      console.error(`Event with a wrong type: ${event.type}`);
      console.debug(event.data);
      break;
  }

  if (response) {
    response.then(() => {
      console.debug(`Event ${event.type} complete!`);
    }).catch(() => {
      let error_message = `Event ${event.type} fail!`
      const retry = event.try <= 3 ? true : false;
      const retry_timing = getSyncTiming();

      if (retry) error_message += ` Retry in ${retry_timing/1000} seconds`;
      handleError(error_message, onError);

      if (retry) {
        event.try = event.try + 1;

        setTimeout(() => push_event(event, onError), retry_timing);
      }
    });
  }
}
