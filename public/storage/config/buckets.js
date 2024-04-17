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
        name: 'teste1',
        options: {
            public: true,
            allowedMimeTypes: ['image/*'],
            fileSizeLimit: '50MB',
        }
    },
    {
        name: 'teste2',
        options: {
            public: true,
            allowedMimeTypes: ['image/*'],
            fileSizeLimit: '50MB',
        }
    },
        // {
    //     name: 'users',
    //     options: {
    //         public: true,
    //         allowedMimeTypes: ['image/jpg, image/png'],
    //         fileSizeLimit: '50MB',
    //     }
    // },
]

module.exports = buckets;