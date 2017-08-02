var _ = require('lodash');
export const ADD_TO_QUEUE = 'ADD_TO_QUEUE';
export const ADD_STREAMS_TO_QUEUE_ITEM = 'ADD_STREAMS_TO_QUEUE_ITEM';

export function addToQueue(musicSources, item) {
  return (dispatch) => {
    item.loading = true;
    dispatch({
      type: ADD_TO_QUEUE,
      payload: item
    });

    Promise.all(_.map(musicSources, m => m.search(item.artist + ' ' + item.name)))
    .then(results => {
       dispatch({
         type: ADD_STREAMS_TO_QUEUE_ITEM,
         payload: {
           item: item,
           streams: results
         }
       });
    });
  }
}
