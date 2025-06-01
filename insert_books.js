const { MongoClient } = require('mongodb');

// Connection URL (modify this if using MongoDB Atlas)
const url = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';

const sampleBooks = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        published_year: 1925,
        price: 12.99,
        in_stock: true,
        pages: 180,
        publisher: "Scribner"
    },
    {
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction",
        published_year: 1949,
        price: 14.99,
        in_stock: true,
        pages: 328,
        publisher: "Secker and Warburg"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        published_year: 1960,
        price: 13.99,
        in_stock: true,
        pages: 281,
        publisher: "J. B. Lippincott & Co."
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        published_year: 1937,
        price: 15.99,
        in_stock: true,
        pages: 310,
        publisher: "George Allen & Unwin"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "Romance",
        published_year: 1813,
        price: 11.99,
        in_stock: true,
        pages: 432,
        publisher: "T. Egerton, Whitehall"
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        published_year: 1951,
        price: 13.99,
        in_stock: false,
        pages: 234,
        publisher: "Little, Brown and Company"
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        published_year: 1965,
        price: 16.99,
        in_stock: true,
        pages: 412,
        publisher: "Chilton Books"
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        published_year: 1954,
        price: 24.99,
        in_stock: true,
        pages: 1178,
        publisher: "Allen & Unwin"
    },
    {
        title: "Brave New World",
        author: "Aldous Huxley",
        genre: "Science Fiction",
        published_year: 1932,
        price: 12.99,
        in_stock: true,
        pages: 311,
        publisher: "Chatto & Windus"
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "Fiction",
        published_year: 1988,
        price: 11.99,
        in_stock: true,
        pages: 197,
        publisher: "HarperOne"
    }
];

async function insertBooks() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB server');

        const db = client.db(dbName);
        const collection = db.collection('books');

        // Drop existing collection if it exists
        await collection.drop().catch(() => console.log('No existing collection to drop'));

        // Insert the sample books
        const result = await collection.insertMany(sampleBooks);
        console.log(`Successfully inserted ${result.insertedCount} books`);

        // Create indexes
        await collection.createIndex({ title: 1 });
        await collection.createIndex({ author: 1, published_year: 1 });
        console.log('Indexes created successfully');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

insertBooks().catch(console.error); 