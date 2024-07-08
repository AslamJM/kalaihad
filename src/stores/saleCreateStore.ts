import { type Product } from '@prisma/client'
import { create } from 'zustand'

type SaleItem = {
    product: Product,
    quantity: number,


}

interface State {
    items: SaleItem[],
    customerId: number | null
    saleDate: Date
}

type Action = {
    add: (item: SaleItem) => void,
    remove: (product_id: number) => void,
    clear: () => void,
    setCustomer: (id: number | null) => void,
    setDate: (date: Date) => void,

}

export const useSaleCreateStore = create<State & Action>((set) => ({
    items: [],
    customerId: null,
    saleDate: new Date(),
    add: (item) => set(({ items }) => {
        items.push(item)
        return { items }
    }),
    remove: (id) => set(({ items }) => ({ items: items.filter(pr => pr.product.id !== id) })),
    clear: () => set(() => ({ items: [] })),
    setCustomer: (id) => set(() => ({ customerId: id })),
    setDate: (id) => set(() => ({ saleDate: id }))
}))