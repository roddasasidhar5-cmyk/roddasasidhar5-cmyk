const axios = require('axios');
const API = 'http://localhost:5001/api';

async function test() {
    try {
        console.log('Testing /health...');
        const h = await axios.get(`${API.replace('/api', '')}/health`);
        console.log('Health:', h.status, h.data);

        console.log('Testing /api/jobs...');
        const j = await axios.get(`${API}/jobs`);
        console.log('Jobs:', j.status, 'Count:', j.data.length);

        console.log('Testing /api/jobs/admin/applications (should be 401 without token)...');
        try {
            await axios.get(`${API}/jobs/admin/applications`);
        } catch (e) {
            console.log('Admin Applications result (expected error):', e.response ? e.response.status : e.message);
        }
    } catch (err) {
        console.error('Error testing:', err.message);
        if (err.response) console.log('Response:', err.response.status, err.response.data);
    }
}

test();
