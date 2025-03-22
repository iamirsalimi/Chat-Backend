const socketIo = require("socket.io");

module.exports = (httpServer) => {
  const io = socketIo(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // io.use((socket, next) => {
  //   // socket , Token , ...

  //   if (!token) {
  //   } else {
  //     // Codes
  //     next();
  //   }
  // });

  return io;
};
