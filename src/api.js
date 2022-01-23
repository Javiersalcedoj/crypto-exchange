const URL = "https://api.coincap.io/v2"

function getAssets () {
  return fetch(`${URL}/assets?limit=20`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(() => getAssets())
}

function getAsset(coin) {
  return fetch(`${URL}/assets/${coin}`)
  .then(res => res.json())
  .then(res => res.data)
  .catch(()=> getAsset(coin))
}

function getAssetHistory (coin) {
  const now = new Date();
  const end =  now.getTime()

  now.setDate(now.getDate() - 1)
  const start = now.getTime()

  return fetch(`${URL}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
    .then(res => res.json())
    .then(res => res.data)
    .catch(() => getAssetHistory(coin))
}

function getMarkets (coin) {
  return fetch(`${URL}/assets/${coin}/markets?limit=5`)
  .then(res => res.json())
  .then(res => res.data)
  .catch(() => getMarkets(coin))
}

function getExchange(id) {
  //este if es por un error de la api
  if(id === 'Crypto.com Exchange') {
    id = 'crypto'
  }
  return fetch(`${URL}/exchanges/${id}`)
  .then(res => res.json())
  .then(res => res.data)
  .catch(() => getExchange(id))
}
export default { getAssets, getAsset, getAssetHistory, getMarkets, getExchange }

