export default function nextKey(messages) {
    if (messages.length > 0) {
        return messages.pop().key + 1;
    } else {
        return 0;
    }
}
