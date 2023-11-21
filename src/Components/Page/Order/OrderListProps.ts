import orderHeader from "../../../Interfaces/orderHeader";

export default interface OrderListProps {
    isLoading: boolean;
    orderData: orderHeader[];
}