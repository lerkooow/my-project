import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/constants";

export const apiSlice = createApi({
    reducerPath: 'storeApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: ({ sorting, categoryProducts, limit, categoryUrl }) => ({
                url: `products/${categoryUrl}/${categoryProducts}?limit=${limit}&sort=${sorting}`,
            }),
        }),
        fetchCategories: builder.query({
            query: () => ({
                url: 'products/categories',
            }),
        }),
        fetchUser: builder.query({
            query: (userId) => ({
                url: `users/${userId}`,
            }),
        }),
    }),
});

export const { useFetchCategoriesQuery, useFetchProductsQuery, useFetchUserQuery } = apiSlice;