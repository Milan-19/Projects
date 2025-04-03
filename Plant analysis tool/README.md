# Plant Analysis Tool

An AI-powered plant analysis tool that uses Google's Gemini API to identify plant species, assess plant health, and provide care recommendations based on uploaded images.

## Features

- Plant species identification
- Health assessment of plants from images
- Detailed care recommendations
- PDF report generation and download
- Simple and intuitive web interface
- Google Gemini AI integration

## Technologies Used

- **Backend**: Node.js, Express.js
- **AI/ML**: Google Generative AI (Gemini 1.5)
- **PDF Generation**: PDFKit
- **File Upload**: Multer
- **Frontend**: HTML, CSS, JavaScript

## Project Structure

- `app.js` - Main application file and API endpoints
- `public/` - Static files for the frontend
  - `index.html` - User interface
- `upload/` - Temporary storage for uploaded images
- `reports/` - Generated PDF reports

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. Run the application:
   ```
   node app.js
   ```
5. Open your browser and navigate to `http://localhost:5000`

## How to Use

1. **Upload an Image**: Click the upload button and select a clear image of a plant.
2. **Analyze**: Click the "Analyze Plant" button to send the image to the Gemini AI for analysis.
3. **View Results**: The analysis will show details about the plant species, health assessment, and care instructions.
4. **Download Report**: Click "Download PDF Report" to generate and download a PDF with the analysis results.

## API Endpoints

- `POST /analyze` - Upload and analyze a plant image
- `POST /download` - Generate and download a PDF report

## Future Enhancements

- Disease detection for plants
- Multiple image analysis for better accuracy
- Watering schedule recommendations
- Mobile application integration
