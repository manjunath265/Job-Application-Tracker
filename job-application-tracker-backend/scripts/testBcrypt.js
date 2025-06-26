const bcrypt = require('bcryptjs');

const run = async () => {
  const password = '258';
  const hash = await bcrypt.hash(password, 10);

  console.log('🔐 Hash:', hash);

  const match = await bcrypt.compare('258', hash);
  console.log('🔍 Does "258" match the hash?', match);
};

run();
