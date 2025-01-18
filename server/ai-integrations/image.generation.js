import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localFolder = path.resolve(__dirname, 'images');


const saveImageLocally = async (imageUrl, localFolder, fileName) => {
  try {
    // Ensure the folder exists
    fs.mkdirSync(localFolder, { recursive: true });

    // Define the full local file path
    const filePath = path.join(localFolder, fileName);

    // Fetch the image
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'stream', // Fetch as a stream
    });

    // Create a write stream and save the image
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`Image saved successfully at ${filePath}`);
        resolve(filePath);
      });
      writer.on('error', (error) => {
        console.error('Error writing the image:', error);
        reject(error);
      });
    });
  } catch (error) {
    console.error('Error saving the image locally:', error);
  }
};

const textToImage = async({ prompt }) => {

  
  try {
    const response = await axios.post('https://api.monsterapi.ai/v1/generate/txt2img', {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjFkYzI4MTk2Nzg1Y2IzZDZmMDQ2ZTEzZWNmMDI5OWQ1IiwiY3JlYXRlZF9hdCI6IjIwMjUtMDEtMTJUMjA6NTU6NDIuODU3NjY2In0.n_ciMnZiPg_P2VKX3laDh2w4GNaPTAR7DwWZOzliT9Y'
      },

    });
    const processId = response.data.process_id;
    console.log(processId); 
    const getImageUrl = await axios.get(`https://api.monsterapi.ai/v1/status/${processId}`, {
      headers: {
        accept: 'application/json',
        authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjFkYzI4MTk2Nzg1Y2IzZDZmMDQ2ZTEzZWNmMDI5OWQ1IiwiY3JlYXRlZF9hdCI6IjIwMjUtMDEtMTJUMjA6NTU6NDIuODU3NjY2In0.n_ciMnZiPg_P2VKX3laDh2w4GNaPTAR7DwWZOzliT9Y'
      },
        aspect_ratio: 'square',
        guidance_scale: 7.5,
        negprompt: 'deformed, bad anatomy, disfigured',
        prompt: prompt,
        safe_filter: true,
        samples: 1,
        seed: 2414,
        steps: 15,
        style: 'anime'
    });
    return getImageUrl.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
  
  

  // saveImageLocally({ imageUrl: getImageUrl.data.result.output[0], fileName: `${processId}.png`, localFolder: localFolder });
    
  }

  export default textToImage;