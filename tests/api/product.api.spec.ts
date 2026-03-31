// tests/api/api.spec.ts

import { test, expect, APIRequestContext } from '@playwright/test';

// Type definitions
interface LoginResponse {
    data: User;
}

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    images: string[];

}


interface User {
    _id: string;
    email: string;
    password: string;
    role: "ADMIN" | "USER";
    accessToken: string;
    refreshToken: string;
}

const API_BASE = 'https://api.freeapi.app/api/v1';

test.describe('API  Testing ', () => {

    test.describe('POST /auth/login', () => {
        test('valid login returns 200 and user data', async ({ request }: { request: APIRequestContext }) => {
            const response = await request.post(`${API_BASE}/users/login`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    "email": "stnam.email@gmail.com",
                    "password": "stnam@123",

                }
            });

            expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy(); // ok() = status 200-299

            const headers = response.headers();
            expect(headers['content-type']).toContain('application/json');

            const body = await response.json() as LoginResponse;
            expect(body.data).not.toBeNull();
            expect(body.data).toHaveProperty('accessToken');
            expect(body.data).toHaveProperty('refreshToken');

        });


        test('invalid credentials returns 401', async ({ request }: { request: APIRequestContext }) => {
            const response = await request.post(`${API_BASE}/users/login`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    email: 'satnam@gmail.com',
                    password: 'wrongpass'
                }
            });

            expect(response.status()).toBe(401);
            expect(response.ok()).toBeFalsy();
        });

    })



    test.describe('GET /products', () => {

        test('fetch all products — status, headers, body', async ({ request }: { request: APIRequestContext }) => {

            const response = await request.get(`${API_BASE}/public/randomproducts`);

            expect(response.status()).toBe(200);

            const headers = response.headers();
            expect(headers['content-type']).toContain('application/json');

            const body = await response.json();
            const products = body?.data?.data as Product[];
            expect(Array.isArray(products)).toBeTruthy();
            expect(products.length).toBeGreaterThan(0);

            products.forEach((product: Product) => {
                expect(product).toHaveProperty('id');
                expect(product).toHaveProperty('title');
                expect(product).toHaveProperty('price');
                expect(product).toHaveProperty('category');
                expect(product).toHaveProperty('images');
                expect(product.price).toBeGreaterThan(0);
            });

            console.log(`Total products fetched: ${products.length}`);
        });


        test('fetch single product by ID', async ({ request }: { request: APIRequestContext }) => {
            const productId = 1;
            const response = await request.get(`${API_BASE}/public/randomproducts/${productId}`);

            expect(response.status()).toBe(200);

            const body = await response.json();
            const product = body?.data as Product;

            expect(product.id).toBe(1);
            expect(product.title).toBeTruthy();
            expect(product.price).toBeGreaterThan(0);

        });
    });

});