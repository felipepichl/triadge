"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FinancialCategory_1 = require("./FinancialCategory");
describe('[FinancialCategory] - Create a new instance of financial category', () => {
    it('should be able to create a new instance of financial category', () => {
        const financialCategory = FinancialCategory_1.FinancialCategory.createFinancialCategory({
            description: 'Transaction category description',
            userId: 'userId',
        });
        expect(financialCategory instanceof FinancialCategory_1.FinancialCategory).toBe(true);
        expect(financialCategory).toBeTruthy();
    });
});
//# sourceMappingURL=FinancialCategory.spec.js.map