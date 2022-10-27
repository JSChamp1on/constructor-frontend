// pages
import { Homepage } from "@pages/Homepage";
import { ProductCard } from "@pages/ProductCard";
import { Cart } from "@pages/Cart";

// constants
import { constants } from "@app";

const {
    PAGES: {
        HOMEPAGE,
        PRODUCT_CARD,
        CART,
    }
} = constants;

export const paths = [
    {
        path: HOMEPAGE.PATH,
        component: Homepage,
    },
    {
        path: PRODUCT_CARD.PATH,
        component: ProductCard,
    },
    {
        path: CART.PATH,
        component: Cart,
    },
];