# Text-to-Image Generator

## Overview
This is a simple **Text-to-Image Generator** built using **HTML, CSS, and JavaScript**, integrating the **Hugging Face API** for AI-powered image generation. Users can input text prompts, and the system generates corresponding images using a pre-trained model.

## Features
- Convert text descriptions into AI-generated images
- Simple and interactive UI
- Uses **Hugging Face's text-to-image models**
- Fully responsive design with HTML and CSS
- Fetch API to communicate with Hugging Face API

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend API**: Hugging Face Text-to-Image Model
- **Hosting**: GitHub Pages (Optional)



## Usage
1. Enter a descriptive text prompt in the input box.
2. Click on the "Generate Image" button.
3. The system will send the request to the **Hugging Face API** and display the generated image.

## API Integration
This project uses **Hugging Face's text-to-image API**. To integrate it:
1. Get a Hugging Face API key from [Hugging Face](https://huggingface.co/).
2. Use the Fetch API in JavaScript to send the request:
   ```javascript
   async function generateImage(prompt) {
       const response = await fetch("https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4", {
           method: "POST",
           headers: {
               "Authorization": "Bearer YOUR_HF_API_KEY",
               "Content-Type": "application/json"
           },
           body: JSON.stringify({ inputs: prompt })
       });
       const blob = await response.blob();
       document.getElementById("imageOutput").src = URL.createObjectURL(blob);
   }
   ```

## Future Enhancements
- Implement user authentication
- Add different AI models for text-to-image generation
- Improve UI/UX with animations

## Contributing
Contributions are welcome! Feel free to submit a Pull Request or open an Issue.

## License
This project is licensed under the **MIT License**.

---
🚀Developed by Nikunj Modgill | GitHub: [@yourusername](https://github.com/NikunjModgill)

