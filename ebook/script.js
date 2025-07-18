// Ebook Creator JavaScript

class EbookCreator {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadSavedData();
    }

    initializeElements() {
        this.titleInput = document.getElementById('title');
        this.authorInput = document.getElementById('author');
        this.subtitleInput = document.getElementById('subtitle');
        this.contentInput = document.getElementById('content');
        this.themeSelect = document.getElementById('theme');
        this.previewBtn = document.getElementById('preview-btn');
        this.exportPdfBtn = document.getElementById('export-pdf');
        this.exportHtmlBtn = document.getElementById('export-html');
        this.previewContent = document.getElementById('preview-content');
    }

    bindEvents() {
        this.previewBtn.addEventListener('click', () => this.generatePreview());
        this.exportPdfBtn.addEventListener('click', () => this.exportPDF());
        this.exportHtmlBtn.addEventListener('click', () => this.exportHTML());
        
        // Auto-preview on input change
        [this.titleInput, this.authorInput, this.subtitleInput, this.contentInput, this.themeSelect].forEach(element => {
            element.addEventListener('input', () => this.autoPreview());
        });
    }

    loadSavedData() {
        // Load saved data from localStorage
        const savedData = localStorage.getItem('ebookData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.titleInput.value = data.title || '';
            this.authorInput.value = data.author || '';
            this.subtitleInput.value = data.subtitle || '';
            this.contentInput.value = data.content || '';
            this.themeSelect.value = data.theme || 'professional';
        }
    }

    saveData() {
        const data = {
            title: this.titleInput.value,
            author: this.authorInput.value,
            subtitle: this.subtitleInput.value,
            content: this.contentInput.value,
            theme: this.themeSelect.value
        };
        localStorage.setItem('ebookData', JSON.stringify(data));
    }

    autoPreview() {
        this.saveData();
        this.generatePreview();
    }

    generatePreview() {
        const title = this.titleInput.value || 'Your Ebook Title';
        const author = this.authorInput.value || 'Author Name';
        const subtitle = this.subtitleInput.value || '';
        const content = this.contentInput.value || 'Your ebook content will appear here...';
        const theme = this.themeSelect.value;

        const processedContent = this.processMarkdown(content);
        
        const previewHTML = `
            <div class="ebook-preview theme-${theme}">
                <div class="ebook-cover">
                    <h1 class="ebook-title">${this.escapeHtml(title)}</h1>
                    ${subtitle ? `<p class="ebook-subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
                    <p class="ebook-author">by ${this.escapeHtml(author)}</p>
                </div>
                <div class="ebook-content">
                    ${processedContent}
                </div>
            </div>
        `;

        this.previewContent.innerHTML = previewHTML;
    }

    processMarkdown(text) {
        // Simple markdown processor for headings and paragraphs
        const lines = text.split('\n');
        let html = '';
        let currentParagraph = '';

        lines.forEach(line => {
            line = line.trim();
            
            if (line.startsWith('# ')) {
                if (currentParagraph) {
                    html += `<p>${this.escapeHtml(currentParagraph)}</p>`;
                    currentParagraph = '';
                }
                html += `<h1>${this.escapeHtml(line.substring(2))}</h1>`;
            } else if (line.startsWith('## ')) {
                if (currentParagraph) {
                    html += `<p>${this.escapeHtml(currentParagraph)}</p>`;
                    currentParagraph = '';
                }
                html += `<h2>${this.escapeHtml(line.substring(3))}</h2>`;
            } else if (line.startsWith('### ')) {
                if (currentParagraph) {
                    html += `<p>${this.escapeHtml(currentParagraph)}</p>`;
                    currentParagraph = '';
                }
                html += `<h3>${this.escapeHtml(line.substring(4))}</h3>`;
            } else if (line === '') {
                if (currentParagraph) {
                    html += `<p>${this.escapeHtml(currentParagraph)}</p>`;
                    currentParagraph = '';
                }
            } else {
                if (currentParagraph) {
                    currentParagraph += ' ' + line;
                } else {
                    currentParagraph = line;
                }
            }
        });

        if (currentParagraph) {
            html += `<p>${this.escapeHtml(currentParagraph)}</p>`;
        }

        return html;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    exportPDF() {
        // Generate PDF using browser's print functionality
        const title = this.titleInput.value || 'ebook';
        const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
        
        // Create a new window with the ebook content
        const printWindow = window.open('', '_blank');
        const theme = this.themeSelect.value;
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${this.escapeHtml(title)}</title>
                <style>
                    body {
                        font-family: ${this.getThemeFont(theme)};
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    h1 {
                        font-size: 2em;
                        color: #333;
                        margin: 40px 0 20px 0;
                        page-break-before: always;
                    }
                    h1:first-child {
                        page-break-before: avoid;
                    }
                    h2 {
                        font-size: 1.5em;
                        color: #555;
                        margin: 30px 0 15px 0;
                    }
                    h3 {
                        font-size: 1.2em;
                        color: #666;
                        margin: 20px 0 10px 0;
                    }
                    p {
                        margin-bottom: 16px;
                        text-align: justify;
                        line-height: 1.8;
                    }
                    .cover {
                        text-align: center;
                        margin-bottom: 60px;
                        padding: 60px 0;
                        border-bottom: 2px solid #333;
                    }
                    .cover h1 {
                        font-size: 2.5em;
                        margin-bottom: 20px;
                        page-break-before: avoid;
                    }
                    .cover p {
                        font-size: 1.2em;
                        margin-bottom: 20px;
                    }
                    .author {
                        font-size: 1.1em;
                        font-weight: 600;
                    }
                </style>
            </head>
            <body>
                <div class="cover">
                    <h1>${this.escapeHtml(this.titleInput.value || 'Ebook Title')}</h1>
                    ${this.subtitleInput.value ? `<p>${this.escapeHtml(this.subtitleInput.value)}</p>` : ''}
                    <p class="author">by ${this.escapeHtml(this.authorInput.value || 'Author Name')}</p>
                </div>
                ${this.processMarkdown(this.contentInput.value || 'Your content here...')}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        // Wait for content to load then print
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }

    exportHTML() {
        const title = this.titleInput.value || 'ebook';
        const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
        const theme = this.themeSelect.value;
        
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.escapeHtml(title)}</title>
    <style>
        body {
            font-family: ${this.getThemeFont(theme)};
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f9f9f9;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        h1 {
            font-size: 2em;
            color: #333;
            margin: 40px 0 20px 0;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        h2 {
            font-size: 1.5em;
            color: #555;
            margin: 30px 0 15px 0;
        }
        h3 {
            font-size: 1.2em;
            color: #666;
            margin: 20px 0 10px 0;
        }
        p {
            margin-bottom: 16px;
            text-align: justify;
            line-height: 1.8;
        }
        .cover {
            text-align: center;
            margin-bottom: 60px;
            padding: 60px 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 8px;
        }
        .cover h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            border: none;
            color: white;
        }
        .cover p {
            font-size: 1.2em;
            margin-bottom: 20px;
            opacity: 0.9;
        }
        .author {
            font-size: 1.1em;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="cover">
            <h1>${this.escapeHtml(this.titleInput.value || 'Ebook Title')}</h1>
            ${this.subtitleInput.value ? `<p>${this.escapeHtml(this.subtitleInput.value)}</p>` : ''}
            <p class="author">by ${this.escapeHtml(this.authorInput.value || 'Author Name')}</p>
        </div>
        ${this.processMarkdown(this.contentInput.value || 'Your content here...')}
    </div>
</body>
</html>
        `;
        
        this.downloadFile(htmlContent, filename, 'text/html');
    }

    getThemeFont(theme) {
        const fonts = {
            professional: "'Times New Roman', serif",
            modern: "'Arial', sans-serif",
            classic: "'Georgia', serif",
            minimal: "'Helvetica', sans-serif"
        };
        return fonts[theme] || fonts.professional;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Initialize the ebook creator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EbookCreator();
});