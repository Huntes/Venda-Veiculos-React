const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      resolve(base64Image);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

  
const ImageConverter = {
    convertImageToBase64,
}

export default ImageConverter;