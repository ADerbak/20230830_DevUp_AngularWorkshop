export const selectedPlayerIdRouteParamName = 'playerId';
export const selectedGameIdRouteParamName = 'gameId';
export enum cardTypes {
  red = 'red',
  yellow = 'yellow'
}
export const cardTypesList = Object.values(cardTypes);

const apiUrl = '/api';
export const playerEndpointLocation = apiUrl + '/soccer/players';
export const gameEndpointLocation = apiUrl + '/soccer/games';
export const goalEndpointLocation = apiUrl + '/soccer/shotsongoal';
export const cardEndpointLocation = apiUrl + '/soccer/cards';
