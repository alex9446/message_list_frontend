export function nextId(arr) {
  const last_elem = arr[arr.length - 1];
  if (last_elem) return last_elem.id + 1;
  return 0;
}

export function nextKey(arr) {
  const last_elem = arr[arr.length - 1];
  if (last_elem) return last_elem.key + 1;
  return 0;
}
