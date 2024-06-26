const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const path = require('path');
const allBuckets = require('./config/buckets.js');

dotenv.config();

const colors = {
    green: '\x1b[32m%s\x1b[0m',
    red: '\x1b[31m%s\x1b[0m',
    cyan: '\x1b[36m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m'
}

// This creates the Supabase client, needed in order to access the DB.

const getCredentials = () => {
    const isDev = process.argv.includes("--dev");
    const isProd = process.argv.includes("--prod");

    if(!isDev && !isProd){
        console.log(colors.yellow, '🔒 Setting up local storage.')
        return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    };
    if(isDev) {
        console.log(colors.cyan, '🚀 Setting up dev storage.')
        return createClient(process.env.SUPABASE_DEV_URL, process.env.SUPABASE_DEV_ADMIN_KEY);
    };
    if(isProd){
        console.log(colors.cyan, '🚀 Setting up prod enviroment.')
        return createClient(process.env.SUPABASE_PROD_URL, process.env.SUPABASE_PROD_ADMIN_KEY);
    } 
    
}

const supabase = getCredentials()

// This function is responsible to verify and filter what buckets need to be created in Supabase
async function filterBuckets(existingBuckets) {
    let newBucketsToAdd = [];
    let addedBuckets = [];
    
    await Promise.all(existingBuckets.map(async (bucket) => {
        const { data, error } = await supabase.storage.getBucket(bucket.name);
        if(!data && error){
            newBucketsToAdd.push(bucket)
        }else{
            addedBuckets.push(bucket)
        }
    }));

    if (newBucketsToAdd.length === existingBuckets.length) {
        await createBuckets(newBucketsToAdd, 'all'); // Create all buckets from scratch
    } else if (newBucketsToAdd.length > 0) {
        await emptyBuckets(addedBuckets)
        await createBuckets(newBucketsToAdd, 'new'); // Create specific new buckets
    } else {
        console.log(colors.green, '✅ No new buckets need to be created');
        await emptyBuckets(addedBuckets)
        await getFiles();
    }
}

// This function is responsible for reseting the buckets in the Supabase.
// This is needed in order to upload newer local images without errors.
async function emptyBuckets(buckets) {
    try {
        await Promise.all(buckets.map(async ({ name }) => {
            const { data, error } = await supabase
                .storage
                .emptyBucket(name);
            if (error) {
                throw new Error(`Failed to restart bucket ${name}: ${error.message}`);
            }
        }));

        console.log(colors.green, '✅ Restarted all existing buckets');
    } catch (error) {
        console.error(colors.red, '❌ Error restarting existing buckets:', error.message);
    }
}

// This function creates newer buckets in Supabase. 
async function createBuckets(buckets, type) {
    try {
        await Promise.all(buckets.map(async ({ name, options }) => {
            const { data, error } = await supabase.storage.createBucket(name, options);
            if (error) {
                throw new Error(`Failed to create bucket ${name}: ${error.message}`);
            }
        }));

        const successMessage = (type === 'all') ? '✅ Buckets were created' : '✅ New buckets were added to storage';
        console.log(colors.green, successMessage);
        await getFiles();
    } catch (error) {
        console.error(colors.red, '❌ Error creating buckets:', error.message);
    }
}

// This function maps trough all the files in the image folder.
async function getFiles() {
    try {
        const basePath = path.join(__dirname, 'images');
        const folders = await fs.readdir(basePath);

        for (const folder of folders) {
            const folderPath = path.join(basePath, folder);
            try {
                await uploadFiles(folderPath, folder);
            } catch (error) {
                console.error(colors.red, `❌ Error uploading files in folder ${folder}:`, error.message);
                throw error; // Re-throw the error to stop further processing
            }
        }

        console.log(colors.green, '✅ Files uploaded');

    } catch (error) {
        return;
    }
}

// This function uploads the files to the Supabase.
async function uploadFiles(folderPath, folderName) {

    // This function is useful to consider images inside subfolders.
    async function uploadRecursive(folderPath, fname = '') {
        const files = await fs.readdir(folderPath);

        await Promise.all(files.map(async (file) => {
            const filePath = path.join(folderPath, file);
            const stats = await fs.stat(filePath);

            if (stats.isDirectory()) {
                const subfolderName = path.join(fname, file);
                await uploadRecursive(filePath, subfolderName);
            } else {
                const buffer = await fs.readFile(filePath);
                const { data, error } = await supabase.storage.from(folderName).upload(path.join(fname, file), buffer, {
                    contentType: 'image/*'
                });

                if (error) {
                    throw new Error(`Failed to upload file ${file}: ${error.message}`);
                }
            }
        }));
    }

    await uploadRecursive(folderPath);
}



filterBuckets(allBuckets);