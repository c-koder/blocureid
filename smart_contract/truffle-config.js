module.exports = {
  compilers: {
    solc: {
      version: "0.8.0",
    },
  },
  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*",
    },
  },
};
