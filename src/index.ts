import sharp from 'sharp';
import { contrastStretch } from './image-operations/filters/contrastStretch';
import { adjustBrightness } from './image-operations/filters/adjustBrightness';
import { invert } from './image-operations/filters/invert';
import { log } from './image-operations/filters/log';
import { gamma } from './image-operations/filters/gamma';
import { verticalFlip } from './image-operations/geometric-transformation/verticalFlip';
import { horizontalFlip } from './image-operations/geometric-transformation/horizontalFlip';
import { translate } from './image-operations/geometric-transformation/translation';
import { scale } from './image-operations/geometric-transformation/scale';
import { Tensor } from './tensor/types';
import { getShape } from './tensor/properties/getShape';

// Function to read a JPG image and convert it to a 3 x n x m array
async function readImageToArray(filePath: string): Promise<number[][][]> {
  const image = sharp(filePath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const height = info.height;
  const width = info.width;
  const channels = info.channels; // Should be 3 for RGB images

  if (channels !== 3) {
    throw new Error('Image is not an RGB image.');
  }

  // Create a 3 x height x width array
  const result: number[][][] = Array.from({ length: 3 }, () =>
    Array.from({ length: height }, () => Array(width).fill(0)),
  );

  for (let i = 0; i < data.length; i += 3) {
    const row = Math.floor(i / (3 * width));
    const col = (i / 3) % width;
    result[0][row][col] = data[i]; // Red channel
    result[1][row][col] = data[i + 1]; // Green channel
    result[2][row][col] = data[i + 2]; // Blue channel
  }

  return result;
}

async function readGrayscaleToArray(filePath: string): Promise<number[][]> {
  const image = sharp(filePath);

  // Convert image to grayscale using .greyscale() method
  const { data, info } = await image
    .greyscale() // Ensure it's a grayscale image
    .raw() // Get raw pixel data
    .toBuffer({ resolveWithObject: true });

  const height = info.height;
  const width = info.width;
  const channels = info.channels; // Should be 1 for grayscale images

  if (channels !== 1) {
    throw new Error('Image is not a grayscale image.');
  }

  // Create a 2D array to store pixel values (height x width)
  const result: number[][] = Array.from({ length: height }, () => Array(width).fill(0));

  // Populate the result array with grayscale pixel data
  for (let i = 0; i < data.length; i++) {
    const row = Math.floor(i / width);
    const col = i % width;
    result[row][col] = data[i]; // Set grayscale pixel value
  }

  return result;
}

// readImageToArray('input.jpg').then(array => {
//   console.log('Image array:');
// });

async function arrayToImage(array: number[][][], outputPath: string): Promise<void> {
  const height = array[0].length;
  const width = array[0][0].length;
  const buffer = Buffer.alloc(height * width * 3);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const index = (row * width + col) * 3;
      buffer[index] = array[0][row][col]; // Red channel
      buffer[index + 1] = array[1][row][col]; // Green channel
      buffer[index + 2] = array[2][row][col]; // Blue channel
    }
  }

  // Write the buffer to an image file
  await sharp(buffer, { raw: { width, height, channels: 3 } }).toFile(outputPath);
}

async function arrayToGrayscale(array: number[][], outputPath: string): Promise<void> {
  const height = array.length;
  const width = array[0].length;
  const buffer = Buffer.alloc(height * width);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const index = row * width + col;
      buffer[index] = array[row][col];
    }
  }

  // Write the buffer to an image file
  await sharp(buffer, { raw: { width, height, channels: 1 } }).toFile(outputPath);
}

// Example usage
const array = [
  [
    [255, 0],
    [0, 255],
  ],
  [
    [0, 255],
    [255, 0],
  ],
  [
    [0, 0],
    [255, 255],
  ],
];

// // Simple 2x2 image
// arrayToImage(array, 'output.jpg').then(() => {
//   console.log('Image created successfully!');
// });

readGrayscaleToArray('contrast-test.png').then(async array => {
  const tensor = array as Array<Tensor>;
  // const modifiedTensor = rgb2gray(tensor) as number[][];
  // console.log(modifiedTensor[0]);
  const stretched = contrastStretch(tensor, 255) as number[][];
  const scaled = scale(stretched, 1, 2) as number[][];

  const translated = translate(stretched, 10, 100) as number[][];
  const stretchedFlipped = verticalFlip(stretched) as number[][];
  const stretchedHorizontalFlipped = horizontalFlip(stretched) as number[][];
  const bothWayFlipped = horizontalFlip(stretchedFlipped) as number[][];

  console.log('brighter');
  const brighter = adjustBrightness(tensor, 1.9) as number[][];
  console.log('darker');
  const darker = adjustBrightness(tensor, 0.5) as number[][];
  console.log('inverted');
  const inverted = invert(brighter) as number[][];
  console.log('logTransformed');
  const logTransformed = log(stretched) as number[][];
  console.log('gammaDark');
  const gammaDark = gamma(tensor, 2.2) as number[][];
  console.log('gammaBright');
  const gammaBright = gamma(tensor, 0.55) as number[][];

  console.log('stretched picture');
  console.log(getShape(stretched));
  await arrayToGrayscale(stretched, 'stretched.jpg');
  console.log('scaled picture');
  console.log(getShape(scaled));
  await arrayToGrayscale(scaled, 'scaled.jpg');
  console.log('translated picture');
  await arrayToGrayscale(translated, 'translated.jpg');
  console.log('stretchedFlipped picture');
  await arrayToGrayscale(stretchedFlipped, 'stretchedFlipped.jpg');
  console.log('stretchedHorizontalFlipped picture');
  await arrayToGrayscale(stretchedFlipped, 'stretchedFlipped.jpg');
  console.log('bothWayFlipped picture');
  await arrayToGrayscale(bothWayFlipped, 'bothWayFlipped.jpg');
  console.log('brighter picture');
  await arrayToGrayscale(brighter, 'brightness-up.jpg');
  console.log('darker picture');
  await arrayToGrayscale(darker, 'darker.jpg');
  console.log('inverted picture');
  await arrayToGrayscale(inverted, 'inverted.jpg');
  console.log('logTransformed picture');
  await arrayToGrayscale(logTransformed, 'logTransformed.jpg');
  console.log('gammaDark picture');
  await arrayToGrayscale(gammaDark, 'gammaDark.jpg');
  console.log('gammaBright picture');
  await arrayToGrayscale(gammaBright, 'gammaBright.jpg');
});
