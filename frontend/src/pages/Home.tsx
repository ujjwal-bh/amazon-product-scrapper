import { SyntheticEvent, useEffect, useState } from "react";
// components
import Button from "../components/ui/button";
import Input from "../components/ui/input";
import Products from "./Products";
import Loader from "../components/ui/loader";
// apis
import { useGetAllProductsQuery, useScrapeDataMutation } from "../services/api";

export default function Home() {
  const [
    scrapeData,
    {
      data: scrapedData,
      isSuccess: scrapeDataSuccess,
      isLoading: scrapeDataLoading,
    },
  ] = useScrapeDataMutation();
  const {
    data: dbData,
    isLoading: dbDataLoading,
    isSuccess: dbDataSuccess,
  } = useGetAllProductsQuery();

  const handleScrapeData = async () => {
    await scrapeData({ urls });
  };

  const [inputVal, setInputVal] = useState("");
  const [urls, setUrls] = useState<string[]>([]);

  const [scrapedProducts, setScrapedProducts] = useState<any[]>([]);
  const [failedUrls, setFailedUrls] = useState<string[]>([]);

  const handleAddUrl = (e: SyntheticEvent) => {
    e.preventDefault();
    if (inputVal === "") return;
    setUrls([...urls, inputVal]);
    setInputVal("");
  };

  useEffect(() => {
    if (scrapeDataSuccess) {
      setScrapedProducts(scrapedData?.products || []);
      setFailedUrls(scrapedData?.failedUrls || []);
      setUrls([]);
    }
  }, [scrapeDataSuccess]);

  return (
    <>
      <main className="home-main main">
        <section className="full">
          <form
            className="container home-form-container"
            onSubmit={handleAddUrl}
          >
            <Input
              placeholder="add amazon product link to scrape data"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <div className="container row-container">
              <Button className="outline error" onClick={() => setUrls([])}>
                Clear
              </Button>
              <Button type="submit">Add</Button>
            </div>
          </form>
          <div className="container col-container home-link-container">
            {urls.length > 0 && (
              <>
                <h4>Preview Links</h4>
                <ul className="list-items">
                  {urls.map((url, index) => {
                    return (
                      <li className="list-item" key={index}>
                        {url}
                      </li>
                    );
                  })}
                </ul>
                <Button className="submit" onClick={handleScrapeData}>
                  Scrape Data
                </Button>
              </>
            )}
          </div>
        </section>
      </main>
      {(scrapeDataLoading || dbDataLoading) && (
        <div className="main loader-container">
          <Loader />
        </div>
      )}
      {scrapeDataSuccess && scrapedProducts.length > 0 && (
        <Products
          {...{ products: scrapedProducts, failedUrls, title: "Scraped data" }}
        />
      )}
      {dbDataSuccess && dbData.length > 0 && (
        <Products {...{ products: dbData, title: "All DB data" }} />
      )}
    </>
  );
}
