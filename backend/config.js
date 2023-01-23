export default {
    host : process.env.host || 'localhost',
    user : process.env.user || 'root',
    password : process.env.password || '',
    database : process.env.database || 'pharmacie',
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/Pharmacie',
    JWT_SECRET: process.env.JWT_SECRET || 'secretprofessionel'
}