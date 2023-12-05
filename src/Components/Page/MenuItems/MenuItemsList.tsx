import React, { useEffect, useState } from 'react';
import { menuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../Apis/menuItemApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuItem } from '../../../Redux/menuItemSlice';
import { MainLoader } from '../Common';
import { RootState } from '../../../Redux/store';


export default function MenuItemsList() {

const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  // useEffect(() => {
  //   fetch("https://localhost:7052/api/MenuItem").then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setMenuItems(data.result);
  //     })
  // }, []);

  const {data, isLoading} = useGetMenuItemsQuery(null);
  const dispatch = useDispatch();

  const searchValue = useSelector(
    (state: RootState) => state.menuItemStore.search
  );

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(searchValue);
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if(!isLoading){
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
    }
  },  []);

  const handleFilters = (search: string) => {
    let tempMenuItems = [...data.result];

    //search functionality - search on item name
    if (search) {
      const tempSearchMenuItems = [...tempMenuItems];
      tempMenuItems = tempSearchMenuItems.filter((item: menuItemModel) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }

    return tempMenuItems;
  };


  if (isLoading) {
    return <MainLoader />;
  }

  return (
    (<div className='container row'>
        {menuItems.length > 0  && menuItems.map((menuItem : menuItemModel, index : number) => (
            <MenuItemCard menuItem={menuItem} key={index}/>
        ))}
    </div>)
  )
}
