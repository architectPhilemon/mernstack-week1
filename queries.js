const { MongoClient } = require('mongodb');

// Connection URL (modify this if using MongoDB Atlas)
const url = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';

async function runQueries() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB server');

        const db = client.db(dbName);
        const collection = db.collection('books');

        // Task 2: Basic CRUD Operations
        console.log('\n--- Basic CRUD Operations ---');

        // Find all books in a specific genre
        console.log('\nBooks in Science Fiction genre:');
        const scifiBooks = await collection.find({ genre: 'Science Fiction' }).toArray();
        console.log(scifiBooks);

        // Find books published after a certain year
        console.log('\nBooks published after 1950:');
        const modernBooks = await collection.find({ published_year: { $gt: 1950 } }).toArray();
        console.log(modernBooks);

        // Find books by a specific author
        console.log('\nBooks by J.R.R. Tolkien:');
        const tolkienBooks = await collection.find({ author: 'J.R.R. Tolkien' }).toArray();
        console.log(tolkienBooks);

        // Update the price of a specific book
        console.log('\nUpdating price of The Hobbit:');
        const updateResult = await collection.updateOne(
            { title: 'The Hobbit' },
            { $set: { price: 17.99 } }
        );
        console.log('Update result:', updateResult);

        // Task 3: Advanced Queries
        console.log('\n--- Advanced Queries ---');

        // Find books that are both in stock and published after 2010
        console.log('\nBooks in stock and published after 2010:');
        const recentBooks = await collection.find({
            in_stock: true,
            published_year: { $gt: 2010 }
        }).toArray();
        console.log(recentBooks);

        // Use projection to return only specific fields
        console.log('\nBooks with title, author, and price only:');
        const projectedBooks = await collection.find(
            {},
            { projection: { title: 1, author: 1, price: 1, _id: 0 } }
        ).toArray();
        console.log(projectedBooks);

        // Sort books by price (ascending)
        console.log('\nBooks sorted by price (ascending):');
        const ascendingPrice = await collection.find().sort({ price: 1 }).toArray();
        console.log(ascendingPrice);

        // Sort books by price (descending)
        console.log('\nBooks sorted by price (descending):');
        const descendingPrice = await collection.find().sort({ price: -1 }).toArray();
        console.log(descendingPrice);

        // Implement pagination
        console.log('\nFirst page (5 books):');
        const page1 = await collection.find().limit(5).toArray();
        console.log(page1);

        console.log('\nSecond page (5 books):');
        const page2 = await collection.find().skip(5).limit(5).toArray();
        console.log(page2);

        // Task 4: Aggregation Pipeline
        console.log('\n--- Aggregation Pipeline ---');

        // Calculate average price by genre
        console.log('\nAverage price by genre:');
        const avgPriceByGenre = await collection.aggregate([
            {
                $group: {
                    _id: '$genre',
                    averagePrice: { $avg: '$price' }
                }
            }
        ]).toArray();
        console.log(avgPriceByGenre);

        // Find author with most books
        console.log('\nAuthor with most books:');
        const authorWithMostBooks = await collection.aggregate([
            {
                $group: {
                    _id: '$author',
                    bookCount: { $sum: 1 }
                }
            },
            {
                $sort: { bookCount: -1 }
            },
            {
                $limit: 1
            }
        ]).toArray();
        console.log(authorWithMostBooks);

        // Group books by publication decade
        console.log('\nBooks by publication decade:');
        const booksByDecade = await collection.aggregate([
            {
                $group: {
                    _id: {
                        $subtract: [
                            { $floor: { $divide: ['$published_year', 10] } },
                            { $mod: [{ $floor: { $divide: ['$published_year', 10] } }, 10] }
                        ]
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]).toArray();
        console.log(booksByDecade);

        // Task 5: Indexing
        console.log('\n--- Indexing ---');

        // Demonstrate index usage with explain()
        console.log('\nQuery performance with index:');
        const queryExplain = await collection.find({ title: 'The Hobbit' })
            .explain('executionStats');
        console.log(JSON.stringify(queryExplain, null, 2));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
        console.log('\nConnection closed');
    }
}

runQueries().catch(console.error); 