import { type Product } from '@prisma/client'
import { create } from 'zustand'

type SaleItem = {
    product: Product,
    quantity: number
}

interface State {
    items: SaleItem[]
}

type Action = {
    add: (item: SaleItem) => void,
    remove: (product_id: number) => void,
    clear: () => void
}

export const useSaleCreateStore = create<State & Action>((set) => ({
    items: [],
    add: (item) => set(({ items }) => {
        items.push(item)
        return { items }
    }),
    remove: (id) => set(({ items }) => ({ items: items.filter(pr => pr.product.id !== id) })),
    clear: () => set(() => ({ items: [] }))
}))