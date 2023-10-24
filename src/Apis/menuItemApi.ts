import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
    reducerPath: "menuItemAPi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7052/api/"
    }),
    tagTypes: ["menuItems"],
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: () => ({
                url: "menuitem"
            }),
            providesTags: ["menuItems"]
        }),
        getMenuItemById: builder.query({
            query: (menuItemId) => ({
                url: `menuitem/${menuItemId}`
            }),
            providesTags: ["menuItems"]
        }),
    })
});

export const {useGetMenuItemsQuery, useGetMenuItemByIdQuery} = menuItemApi;
export default menuItemApi;