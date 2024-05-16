const buckets = [
    {
        name: 'products',
        options: {
            public: true,
            allowedMimeTypes: ['image/*'],
            fileSizeLimit: '50MB',
        }
    },
    {
        name: 'brands',
        options: {
            public: true,
            allowedMimeTypes: ['image/*'],
            fileSizeLimit: '50MB',
        }
    },
    {
        name: 'looks',
        options: {
            public: true,
            allowedMimeTypes: ['image/*'],
            fileSizeLimit: '50MB',
        }
    },
    {
        name: 'users',
        options: {
            public: true,
            allowedMimeTypes: ['image/*'],
            fileSizeLimit: '50MB',
        }
    },
]

module.exports = buckets;