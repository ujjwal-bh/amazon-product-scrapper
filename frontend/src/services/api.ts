import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IScrapePayload, IScrapedData,IProduct } from "../utils/interfaces";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1/",
  credentials: "include",
});

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Products"],

  endpoints: (builder) => ({
    scrapeData: builder.mutation<IScrapedData, IScrapePayload>({
      query: (body) => ({
        url: "/scrapper/product",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"]
    }),
    getAllProducts: builder.query<IProduct[], void>({
      query: () => `/scrapper`,
      providesTags: ["Products"]
    }),

  }),
});

export const {useScrapeDataMutation, useGetAllProductsQuery} = api;
