export const TICKERS = {
    AllTickers: '',
    "Mis favoritas" : 'fav',
    BTC: "Bitcoin",
    ETH: "Etherum",
    XRP: "Ripple",
    LTC: "Litecoin",
    LINK: "Chainlink",
    ADA: "Cardano",
    DOT: "Polkadot",
    KSM: "Kusama",
    MATIC: "Polygon",
    AVAX: "Avalanche",
    BNB: "Binance Coin",
    LIDO: "Lido DAO",
    APT: "Aptos",
    Near: "Near Protocol",
    ICP: "Internet Computer",
    FTM: "Fantom",
    XTZ: "Tezos",
    ATOM: "Cosmos",
    AAVE: "Aave",
    UNI: "Uniswap",
    DOGE: "Dogecoin",
    ALGO: "Algorand",
    HBAR: "Hedera Hashgraph",
    NEAR: "Near Protocol",
    SOL: "Solana",
    SCRT: "Secret Network",
    USDC: "USD Coin",
    USDT: "Tether"
}

export interface News {
    news_url: string,
    image_url: string,
    title: string,
    /**
     * Descripción  de la noticia o resumen
     */
    text: string,
    /**
     * Fuente de la noticia
     */
    source_name: string,
    /**
     * Fecha de la noticia
     */
    date: Date,
    /**
     * Temas de la noticia
     */
    topics: [],
    /**
     * Posición de la noticia 
     */
    sentiment: string,
    /**
     * Tipo
     */
    type: string,
    /**
     * Coins que se trata en la noticia [Tickers]
     */
    tickers: string[]
}