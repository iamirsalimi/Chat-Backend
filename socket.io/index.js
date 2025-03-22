const { initConnection, sendPvs } = require("./namespaces.socket");

module.exports = socketHandler = (io) => {
  initConnection(io);
  sendPvs(io);
};
