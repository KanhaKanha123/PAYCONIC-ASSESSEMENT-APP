const AppRoutes = {
  dashboard: '/',
  history: 'history'
}

const ApiEndPoint = {
  apiExchangeRate: 'https://api.exchangerate.host/convert',
  apiExchangeHistory: 'https://api.exchangerate.host/timeseries'
}

export const RoutesConfig = {
  ...AppRoutes,
  ...ApiEndPoint
};
