import fetch from 'node-fetch';

const url = 'https://safety-tip-microservice.onrender.com/safety-tips';

async function testMicroservice() {
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            location: 'New York',
            startDate: '2025-08-01',
            endDate: '2025-08-10',
            numberOfTravelers: 2
        })
    });
    if (resp.ok) {
        const data = await resp.json();
        console.log("Microservice responsed with: ");
        console.log(data);
    }
}

testMicroservice()