export function getActionType(action) {
  return `action:${action}`;
}

export function getSagaActionType(action) {
  return `saga:${action}`;
}

export function createAsyncActionTypes(action) {
  return {
    SAGA: getSagaActionType(action),
    REQUEST: getActionType(`${action}#request`),
    SUCCESS: getActionType(`${action}#success`),
    FAILURE: getActionType(`${action}#failure`),
  };
}
