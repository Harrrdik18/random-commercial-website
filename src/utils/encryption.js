
export const encryptData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    const encodedData = btoa(encodeURIComponent(jsonString));
    return encodedData;
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};

export const decryptData = (encryptedData) => {
  try {
    const decodedString = decodeURIComponent(atob(encryptedData));
    return JSON.parse(decodedString);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}; 