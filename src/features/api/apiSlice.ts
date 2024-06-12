import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constants";

interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type Category = string[];

interface User {
  address: {
    geolocation: {
      lat: string;
      long: string;
    };
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
}

interface queryProducts {
  sorting: string;
  categoryProducts: string;
  limit: number;
  categoryUrl: string;
}

export const apiSlice = createApi({
  reducerPath: "storeApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<Products[], queryProducts>({
      query: ({ sorting, categoryProducts, limit, categoryUrl }) => ({
        url: `products/${categoryUrl}/${categoryProducts}?limit=${limit}&sort=${sorting}`,
      }),
    }),
    fetchCategories: builder.query<Category, void>({
      query: () => ({
        url: "products/categories",
      }),
    }),
    fetchUser: builder.query<User, string | null>({
      query: (userId) => ({
        url: `users/${userId}`,
      }),
    }),
  }),
});

export const { useFetchCategoriesQuery, useFetchProductsQuery, useFetchUserQuery } = apiSlice;
