export interface MarketItem {
  tokenId: string
  seller: string
  owner: string
  price: string
}

export enum NFTstate {
  ALL = 'ALL',
  LISTED = 'LISTED',
  MINE = 'MINE',
}
