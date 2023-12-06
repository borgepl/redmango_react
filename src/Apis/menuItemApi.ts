import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
    reducerPath: "menuItemAPi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7052/api/",
        prepareHeaders: (headers: Headers, api ) => {
            const token = localStorage.getItem("token");
            token && headers.append("Authorization", "Bearer " + token);
          }
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
        createMenuItem: builder.mutation({
            query: (data) => ({
              url: "menuitem",
              method: "POST",
              body: data,
            }),
            invalidatesTags: ["menuItems"],
        }),
        updateMenuItem: builder.mutation({
            query: ({data, menuItemId}) => ({
              url: "menuitem/" + menuItemId,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["menuItems"],
        }),
        deleteMenuItem: builder.mutation({
            query: (menuItemId) => ({
              url: "menuitem/" + menuItemId,
              method: "DELETE",
            }),
            invalidatesTags: ["menuItems"],
        }),
    })
});

export const {
    useGetMenuItemsQuery, 
    useGetMenuItemByIdQuery,
    useCreateMenuItemMutation,
    useUpdateMenuItemMutation,
    useDeleteMenuItemMutation
} = menuItemApi;

export default menuItemApi;