const { Pinecone } = require('pinecone');
const { SentenceTransformer } = require('sentence-transformers');
//const { getPostgresConnection } = require('../config/db');

const model = new SentenceTransformer('all-mpnet-base-v2');
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const indexName = 'related-products';

const index = pc.Index(indexName);

// ✅ Function to Insert Embedding into Pinecone
const insertProductEmbedding = async (product, subCategory, category) => {
    try {
        const text = `${product.brand} ${product.name} ${category.name} ${subCategory.name} ${product.description}`;
        const embedding = model.encode(text, { convertToTensor: false, normalize: true });

        // ✅ Insert into Pinecone
        await index.upsert([{ id: product.product_id.toString(), values: embedding, metadata: product }]);

        console.log(`✅ Inserted product ${product.product_id} into Pinecone`);
    } catch (error) {
        console.error('❌ Error inserting embedding into Pinecone:', error.message);
    }
};

module.exports = { insertProductEmbedding };