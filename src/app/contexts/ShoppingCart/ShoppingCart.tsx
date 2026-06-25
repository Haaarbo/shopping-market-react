import { createContext, useContext, useState } from "react";

interface ShoppingListProviderProps {
    children: React.ReactNode;
}

export interface ListItem {
    id: number;
    name: string;
    unitPrice: number;
    quantity: number;
    amount: number;
}

export interface ShoppingCartListContextData {
    items: ListItem[];
    // totalSumAmount: number;
    // totalQtd: number;
    
    addProduct: (id: number, name: string, price: number) => void;
    // onRemove: (id: number) => void;
    // onDecrease: (id: number, price: number) => void;
}

const ShoppingListContextDefaultValues = {
    items: [],
    totalSumAmount: 0,
    totalQtd: 0,
    addProduct: () => null,
    onRemove: () => null,
    onDecrease: () => null
};

const ShoppingListContext = createContext<ShoppingCartListContextData> (ShoppingListContextDefaultValues);

export const ShoppingListProvider = ({ 
        children 
    }: ShoppingListProviderProps) => {
        const [items, setItems] = useState<ListItem[]>([]);

        const addProduct = (id: number, name: string, price: number) => {
            const productAlreadyInCart = items.find(product => product.id === id);

            if (!productAlreadyInCart) {
                const newItem: ListItem = {
                    id,
                    name,
                    unitPrice: price,
                    quantity: 1,
                    amount: price
                };
                return setItems([...items, newItem]);
            } else {
                const updateCart = items.map(cartItem =>
                    cartItem.id === id ? {
                        ...cartItem,
                        quantity: Number(cartItem.quantity) + 1,
                        amount: cartItem.amount + price
                    } : cartItem
                );

                return setItems(updateCart);
            }
        };

        // const onRemove = (id: number) => {
        //     setItems(prevItems => prevItems.filter(item => item.id !== id));
        // };

        // const onDecrease = (id: number, price: number) => {
        //     const existingItem = items.find(item => item.id === id);

        //     if (existingItem) {
        //         if (existingItem.quantity > 1) {
        //             setItems(prevItems =>
        //                 prevItems.map(item =>
        //                     item.id === id
        //                         ? { ...item, quantity: item.quantity - 1, amount: item.amount - price }
        //                         : item
        //                 )
        //             );
        //         } else {
        //             onRemove(id);
        //         }
        //     }
        // };

        // const totalSumAmount = items.reduce((sum, item) => sum + item.amount, 0);
        // const totalQtd = items.reduce((sum, item) => sum + item.quantity, 0);

        return (
            <ShoppingListContext.Provider value={{ items, addProduct }}>
                {children}
            </ShoppingListContext.Provider>
        );
};

export const useShoppingList = () => useContext(ShoppingListContext);
