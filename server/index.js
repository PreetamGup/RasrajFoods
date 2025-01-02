import http from 'http';
import { app } from './app.js';
import connectDB from './db/db.connection.js';




const startServer=async()=>{
    
    const server = http.createServer(app);
    await connectDB(); // Connect to MongoDB  
    const PORT = process.env.PORT || 8080;
    
    
    
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}

startServer()