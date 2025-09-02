import { it, describe, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Product } from './product'

describe('product componenet',()=>{

    it('displays the product correctly',()=>{

        const product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
            stars: 4.5,
            count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        }   
 
        // 'Mock' fake version of any func
       const loadCart = vi.fn();

       render(<Product product={product} loadCart={loadCart}/>);

       expect(
        screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
       ).toBeInTheDocument();
       
       expect(
        screen.getByText('$10.90')
       ).toBeInTheDocument();

       expect(
        screen.getByTestId("product-image")
         ).toHaveAttribute(
         "src",
         "images/products/athletic-cotton-socks-6-pairs.jpg"
       );

       expect(screen.getByTestId("product-reating-star-image")).toHaveAttribute(
         "src",
         "images/ratings/rating-45.png"
       );

       expect(
        screen.getByText('87')
       ).toBeInTheDocument();

    });
});