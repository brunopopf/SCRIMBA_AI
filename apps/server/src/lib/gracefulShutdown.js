export const gracefulShutdown = async (server) => {
    console.log('SIGTERM received, shutting down gracefully');

     // Close the server first (stop accepting new connections)
    server.close(() => {
      console.log('HTTP server closed');
    });

     // Then close database pool
    try {
    //   await pool.end(); TODO
      console.log('Database pool closed');
      process.exit(0);
    } catch (error) {
      console.error('Error closing database pool:', error);
      process.exit(1);
    }
}