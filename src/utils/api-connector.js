export function getSyncTiming() {
  return parseInt(process.env.GATSBY_SYNC_TIMING) || 5000;
}
export function getRetryTiming() {
  return parseInt(process.env.GATSBY_RETRY_TIMING) || 5000;
}

export default function apiConnector(endpoint, method='GET', json={}) {
  return new Promise((resolve, reject) => {
    const cors_url = process.env.GATSBY_USE_CORS === 'TRUE' ? 'https://cors-anywhere.herokuapp.com/' : '';
    const host = process.env.GATSBY_API_HOST || '';
    const protocol = process.env.GATSBY_API_PROTOCOL || host === '' ? '' : 'https://';
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

export function push_event(event, onError, onComplete) {
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
      onComplete();
    }).catch(error => {
      const retry = event.try < 6 ? true : false;
      const retry_timing = getRetryTiming();
      const error_callback = event.try === 1 ? onError : null;

      handleError(`Event ${event.type} fail! ` +
                  `Retry in ${retry_timing/1000} seconds`,
                  error_callback);
      console.debug(error);

      if (retry) {
        const new_event = { ...event, try: event.try+1 }

        setTimeout(() => push_event(new_event, onError, onComplete), retry_timing);
      }
    });
  }
}
