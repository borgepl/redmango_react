import React, { useEffect } from 'react';
import { menuItemModel } from '../../../Interfaces';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../Apis/menuItemApi';
import { useDispatch } from 'react-redux';
import { setMenuItem } from '../../../Redux/menuItemSlice';
import { MainLoader } from '../Common';


export default function MenuItemsList() {

//const [menuItems, setMenuItems] = useState<menuItemModel[]>([]);

  // useEffect(() => {
  //   fetch("https://localhost:7052/api/MenuItem").then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setMenuItems(data.result);
  //     })
  // }, []);

  const {data, isLoading} = useGetMenuItemsQuery(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!isLoading){
      dispatch(setMenuItem(data.result))
    }
  },  []);

  if (isLoading) {
    return <MainLoader />;
  }

  return (
    (<div className='container row'>
        {data.result.length > 0  && data.result.map((menuItem : menuItemModel, index : number) => (
            <MenuItemCard menuItem={menuItem} key={index}/>
        ))}
    </div>)
  )
}
