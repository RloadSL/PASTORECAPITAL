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