import { type Product } from '@prisma/client'
import { create } from 'zustand'

export type SaleItem = {
    product: Product,
    quantity: number,


}

interface State {
    items: SaleItem[],
    customerId: string
    date: Date
}

type Action = {
    add: (item: SaleItem) => void,
    remove: (product_id: number) => void,
    clear: () => void,
    setCustomerId: (id: string) => void
    setDate: (date: Date) => void
    update: (id: number, quantity: number) => void
}

export const useSaleCreateStore = create<State & Action>((set) => ({
    items: [],
    customerId: "",
    date: new Date(),

    add: (item) => set(({ items }) => {
        items.push(item)
        return { items }
    }),
    remove: (id) => set(({ items }) => ({ items: items.filter(pr => pr.product.id !== id) })),
    clear: () => set(() => ({ items: [], customerId: "", date: new Date() })),
    setCustomerId: (id) => set(() => ({ customerId: id })),
    setDate: (date) => set(() => ({ date })),
    update: (id, quantity) => set(({ items }) => ({ items: items.map(item => item.product.id === id ? { ...item, quantity } : item) }))
}))