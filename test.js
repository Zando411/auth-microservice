const axios = require('axios');

// fake mongodb 
const mongoDBExample = {
  collection: () => ({
    findOne: (query) => {
        // example database values:
        const mockData = [
        { email: 'testuser@example.com', name: 'Test User' },
        { email: 'otheruser@example.com', name: 'Other User' }
      ];

      return mockData.find(user => user.email === query.email) || null;
    }
  })
};

async function checkUser() {
  try {
    const db = {
      type: 'mongodb',
      connection: mongoDBExample
    };

    const response = await axios.post('http://localhost:3362/verifyUser', {
      email: 'otheruser1@example.com',  
      db: db  
    });

    console.log('User verification response:', response.data);
  } catch (error) {
    console.error('Error during verification:', error);
  }
}

checkUser();
