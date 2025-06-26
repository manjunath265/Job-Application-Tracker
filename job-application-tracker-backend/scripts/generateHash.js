const bcrypt = require('bcryptjs');

const run = async () => {
  const password = '258';
  const hash = await bcrypt.hash(password, 10);
  console.log('✅ HASH FOR "258":', hash);

  const match = await bcrypt.compare('258', hash);
  console.log('🔍 Does bcrypt.compare("258", hash) work?', match);
};

run();
