"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("@shared/error/AppError");
const BrapiB3Provider_1 = require("../../../implementations/BrapiB3Provider");
const brapi_1 = require("../../../services/brapi");
jest.mock('../../../services/brapi');
let brapiProvider;
describe('[BrAPI] - Get Quote Tickers', () => {
    beforeEach(() => {
        brapiProvider = new BrapiB3Provider_1.BrapiB3Provider();
    });
    it('should be able to return symbol and short name by ticket', async () => {
        const mockedResponse = {
            data: {
                results: [{ shortName: 'XXX RRRR ASDFG', symbol: 'RRRR11' }],
            },
        };
        brapi_1.brapi.get.mockResolvedValueOnce(mockedResponse);
        const stock = await brapiProvider.getQuoteTickers('RRRR11');
        expect(stock).toEqual({
            shortName: 'XXX RRRR ASDFG',
            symbol: 'RRRR11',
        });
    });
    it('should be able to return invalid request to response 400', async () => {
        ;
        brapi_1.brapi.get.mockRejectedValueOnce({
            response: { status: 400 },
        });
        const promise = brapiProvider.getQuoteTickers('?');
        await expect(promise).rejects.toBeInstanceOf(AppError_1.AppError);
        await expect(promise).rejects.toMatchObject({
            message: 'Invalid request to the BrAPI',
            statusCode: 400,
        });
    });
    it('should be able to return Invalid or unauthorized token to response 401', async () => {
        ;
        brapi_1.brapi.get.mockRejectedValueOnce({
            response: { status: 401 },
        });
        const promise = brapiProvider.getQuoteTickers('VALID');
        await expect(promise).rejects.toBeInstanceOf(AppError_1.AppError);
        await expect(promise).rejects.toMatchObject({
            message: 'Invalid or unauthorized token',
            statusCode: 401,
        });
    });
    it('should be able to return request limit reached to response 402', async () => {
        ;
        brapi_1.brapi.get.mockRejectedValueOnce({
            response: { status: 402 },
        });
        const promise = brapiProvider.getQuoteTickers('VALID');
        await expect(promise).rejects.toBeInstanceOf(AppError_1.AppError);
        await expect(promise).rejects.toMatchObject({
            message: 'Request limit reached for the BrAPI',
            statusCode: 402,
        });
    });
    it('should be able to return not found to response 404', async () => {
        ;
        brapi_1.brapi.get.mockRejectedValueOnce({
            response: { status: 404 },
        });
        const promise = brapiProvider.getQuoteTickers('INVALID');
        await expect(promise).rejects.toBeInstanceOf(AppError_1.AppError);
        await expect(promise).rejects.toMatchObject({
            message: 'Stock not found for the BrAPI',
            statusCode: 404,
        });
    });
});
//# sourceMappingURL=BrapiB3Provider.spec.js.map