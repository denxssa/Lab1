<?php

return [
    'max_upload_kb' => (int) env('RESUME_MAX_UPLOAD_KB', 5120),

    'ollama' => [
        'enabled' => env('OLLAMA_ENABLED', true),
        'base_url' => env('OLLAMA_BASE_URL', 'http://127.0.0.1:11434'),
        'model' => env('OLLAMA_MODEL', 'llama3'),
        'embedding_model' => env('OLLAMA_EMBEDDING_MODEL', 'nomic-embed-text'),
        'timeout' => (int) env('OLLAMA_TIMEOUT', 120),
        'num_ctx' => (int) env('OLLAMA_NUM_CTX', 8192),
        'max_prompt_chars' => (int) env('OLLAMA_MAX_PROMPT_CHARS', 24000),
    ],

    'ocr' => [
        'pdftotext_binary' => env('PDFTOTEXT_BINARY'),
        'tesseract_enabled' => env('TESSERACT_ENABLED', false),
        'tesseract_binary' => env('TESSERACT_BINARY', 'tesseract'),
        'min_text_length' => 80,
    ],

    'puppeteer' => [
        'node_binary' => env('CV_PDF_NODE_BINARY', 'node'),
        'timeout' => (int) env('CV_PDF_TIMEOUT', 60),
    ],
];
