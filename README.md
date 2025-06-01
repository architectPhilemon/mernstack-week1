# PLP Bookstore MongoDB Project

This project demonstrates MongoDB operations including CRUD operations, advanced queries, aggregation pipelines, and indexing.

## Prerequisites

- MongoDB (local installation or MongoDB Atlas account)
- Node.js installed on your system

## Setup Instructions

1. **MongoDB Setup**
   - For local installation: Install MongoDB Community Edition from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - For MongoDB Atlas: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

2. **Database Setup**
   ```bash
   # Connect to MongoDB shell
   mongosh

   # Create and use the database
   use plp_bookstore
   ```

3. **Run the Insert Script**
   ```bash
   node insert_books.js
   ```

4. **Run Queries**
   ```bash
   node queries.js
   ```

## Project Structure

- `insert_books.js`: Script to populate the database with sample book data
- `queries.js`: Contains all MongoDB queries for CRUD operations, advanced queries, and aggregation pipelines

## Features

- Basic CRUD Operations
- Advanced Queries with filtering, projection, and sorting
- Aggregation Pipelines
- Database Indexing
- Pagination Implementation

## Query Examples

All queries are documented in the `queries.js` file, including:
- Finding books by genre
- Finding books by publication year
- Author-based searches
- Price updates
- Advanced filtering
- Aggregation pipelines
- Index creation and usage 