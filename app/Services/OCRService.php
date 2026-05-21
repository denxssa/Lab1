<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Smalot\PdfParser\Parser as PdfParser;
use Spatie\PdfToText\Pdf;
use thiagoalessio\TesseractOCR\TesseractOCR;

class OCRService
{
    public function extractFromPdf(string $storagePath, string $disk = 'local'): string
    {
        $absolutePath = Storage::disk($disk)->path($storagePath);

        if (!is_file($absolutePath)) {
            throw new \RuntimeException('Resume file not found for text extraction.');
        }

        $text = $this->extractWithPdfToText($absolutePath);

        if ($this->isTextTooShort($text)) {
            $text = $this->extractWithPdfParser($absolutePath);
        }

        if ($this->isTextTooShort($text) && config('resume.ocr.tesseract_enabled')) {
            $text = $this->extractWithTesseract($absolutePath);
        }

        $text = $this->normalizeText($text);

        if ($this->isTextTooShort($text)) {
            throw new \RuntimeException('Unable to extract readable text from the PDF. Try a text-based PDF or enable OCR.');
        }

        return $text;
    }

    private function extractWithPdfToText(string $absolutePath): string
    {
        try {
            $binary = config('resume.ocr.pdftotext_binary');

            return Pdf::getText($absolutePath, $binary ?: null);
        } catch (\Throwable $exception) {
            Log::debug('spatie/pdf-to-text failed', ['message' => $exception->getMessage()]);

            return '';
        }
    }

    private function extractWithPdfParser(string $absolutePath): string
    {
        try {
            $parser = new PdfParser();
            $pdf = $parser->parseFile($absolutePath);

            return $pdf->getText();
        } catch (\Throwable $exception) {
            Log::debug('smalot/pdfparser failed', ['message' => $exception->getMessage()]);

            return '';
        }
    }

    private function extractWithTesseract(string $absolutePath): string
    {
        try {
            $ocr = new TesseractOCR($absolutePath);
            $binary = config('resume.ocr.tesseract_binary');

            if ($binary) {
                $ocr->executable($binary);
            }

            return $ocr->run();
        } catch (\Throwable $exception) {
            Log::debug('tesseract OCR failed', ['message' => $exception->getMessage()]);

            return '';
        }
    }

    private function isTextTooShort(string $text): bool
    {
        return mb_strlen(trim($text)) < (int) config('resume.ocr.min_text_length', 80);
    }

    private function normalizeText(string $text): string
    {
        $text = str_replace(["\r\n", "\r"], "\n", $text);
        $text = preg_replace("/([A-Za-z])-\n([A-Za-z])/", '$1$2', $text) ?? $text;
        $text = preg_replace("/[ \t]+/", ' ', $text) ?? $text;
        $text = preg_replace("/[ \t]*\n[ \t]*/", "\n", $text) ?? $text;
        $text = preg_replace("/\n{3,}/", "\n\n", $text) ?? $text;

        return trim($text);
    }
}
