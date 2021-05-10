export const sequelizeLogger = (...msg) => {
  if (process.env.NO_LOG) {
    return;
  }
  console.log('===');
  console.log('Message from DB:');
  console.log(msg);
  console.log('===');
};
