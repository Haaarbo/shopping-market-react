import {Button} from "../../components/Button/Button";
import { useShoppingList } from "../../contexts";

const ShoppingCart = () => {
    const { items, addProduct, onRemove, onDecrease } = useShoppingList();

    return (
        <div className="flex h-full flex-col gap-12">
            <div className="mt-32 flex h-4/5 justify-center overflow-x-auto">
                <div className="flex w-3/6 flex-col gap-8">
                    {items.map((item) => {return 
                        <div key={item.id} className="flex justify-between rounded-3xl bg-white p-8">
                            <div className="flex flex-col gap-4">
                                <p>
                                    <span>Quantidade: {item.quantity}</span>
                                    <span>Valor Total: {item.amount.toFixed(2)}</span>
                                </p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <Button onClick={(e) => {e.stopPropagation(); addProduct(item.id, item.name, item.unitPrice)}}>
                                    +
                                </Button>
                                <Button onClick={(e) => {e.stopPropagation(); onDecrease(item.id, item.unitPrice)}}>
                                    -
                                </Button>
                                <Button variant="secondary" onClick={(e) => {e.stopPropagation(); onRemove(item.id)}}>
                                    Remover
                                </Button>
                            </div>
                        </div>   
                    })}
                </div>
            </div>
        </div>
    )
}

export { ShoppingCart }