const bcrypt = require('bcryptjs');

// Generate a fresh bcrypt hash for 'admin123'
const password = 'admin123';
const hash = bcrypt.hashSync(password, 10);

console.log('\n=== ADMIN CREDENTIALS ===');
console.log('Email: admin@godsgym.com');
console.log('Password:', password);
console.log('\n=== BCRYPT HASH (for .env.local) ===');
console.log(hash);
console.log('\n=== BASE64 ENCODED (alternative) ===');
console.log('B64:' + Buffer.from(hash).toString('base64'));
console.log('\n=== VERIFICATION ===');
console.log('Hash is valid:', bcrypt.compareSync(password, hash));
