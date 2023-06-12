export interface MarketItem {
  tokenId: string
  seller: string
  owner: string
  price: string
  tokenURI: string
}

export enum NFTstate {
  ALL = 'ALL',
  LISTED = 'LISTED',
  MINE = 'MINE',
}
