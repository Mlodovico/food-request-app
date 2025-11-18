import http from 'k6/http';

export default function () {
    const url = "http://localhost:3000/order";
    const payload = JSON.stringify({
        customerId: "123",
        items: [{ foodItemId: "1", quantity: 2 }],
        notes: "Test order",
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    http.post(url, payload, params);
}