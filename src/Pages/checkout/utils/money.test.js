import { it, expect, describe } from 'vitest';
import { formatMoney } from './money';


describe('formatMoney',()=>{

    it('format 2004 cents as $20.04',()=>{
        expect(formatMoney(2004)).toBe('$20.04');
    })

    it('displays 2 decimals',()=>{
        expect(formatMoney(1090)).toBe('$10.90');
        expect(formatMoney(100)).toBe('$1.00');
    })

})
