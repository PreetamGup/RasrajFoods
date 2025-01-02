import http from 'http';
import { app } from './app.js';
import connectDB from './db/db.connection.js';




const startServer=async()=>{
    
    await connectDB(); // Connect to MongoDB  
     

    const PORT = process.env.PORT || 8080;
    
    const server = http.createServer(app);
    
    
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}

startServer()