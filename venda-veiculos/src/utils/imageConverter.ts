const convertImageToBase64 = (file: File) => {
  const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result as string;
      // Faça o que precisar com a imagem em formato base64
      console.log(base64Image);

      return base64Image;
    };
    reader.readAsDataURL(file);

    return '';
};
  
const ImageConverter = {
    convertImageToBase64,
}

export default ImageConverter;