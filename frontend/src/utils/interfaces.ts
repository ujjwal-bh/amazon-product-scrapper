// api interfaces

export interface IProduct {
    id: string,
    title: string,
    url: string,
    img: string,
    price: string,
    categoryId: string,
    createdAt: string,
    updateAt: string,
    category: ICateogry
}
export interface ICateogry {
    id: string,
    name: string
}

export interface IScrapedData {
    failedUrls: string[],
    products: IProduct[]
}

export interface IScrapePayload{
    urls: string[]
}

export {}