import Sharp from 'sharp';

export const resizeImage = async (buffer: Buffer, width = 300, height = 300) => await Sharp(buffer).resize(width, height).toFormat('webp').toBuffer();
