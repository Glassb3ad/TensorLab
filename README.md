# TensorLab

TensorLab is a TypeScript library designed to simplify the manipulation and processing of tensors. It provides basic utilities for tensor computations and ready-made image operations based on tensors.

### Safe vs. Raw functions

Type system is not enough to check whether something is tensor or not. There are two additional things we need to check:

1. All subtensors at the same level have equal length. for example all vectors in matrix, must have the same length.
2. Empty tensors are not allowed. For example, empty array [] is not vector

To check these conditions, we wrap tensor functions with tensorGuard higher-order function that check that tensor parameters are tensors. Functions wrapped in tensorGuard are safe functions. On the other hand, we sometimes want to use unsafe operations to reduce reduntant checks and imrpve performace. For this we have so called raw functions like dotProductRaw. For those using this library, we recommend to sticking with the safe functions except you are building new functions by combining libraries functions. In those cases it is often better to use raw functions to avoid useless checks.

## Tensor

### Predicates

#### haveEqualShape

Checks whether two tensors have the same dimensions and structure. It ensures that two tensors can be used together in operations like element-wise addition, multiplication, or convolution.

```
haveEqualShape(t1: Tensor, t2: Tensor): boolean;
```

### operations

#### convolution

Applies a discrete convolution operation between a tensor and a kernel. This is widely used in signal processing, image processing, and deep learning for tasks like edge detection and feature extraction.

```
convolution(tensor: Tensor, kernel: Tensor): Tensor;
```

Our convolution function supports all tensor shapes and thus goes beyond vectors, matrixes and 3D tensors. It is implemented as recursive convolution by slicing tensors and kernels to smaller convolution problems where base is vector convolution. Partial convolutions are then added together to provide the final solution. This is not as effective as implementations based on Fourier Transform but it sticks with tensor operations which aligns with the idea of this library.

#### combine

#### dot product

#### fold

#### pointwise

Applies a mathematical function element-wise to each value in a tensor. This is useful for transformations like normalization, thresholding, and scaling.

```
pointwise(tensor: Tensor, func: (arg: number) => number): Tensor;
```

#### add

## Image operations

### Color space transformations

#### rgb2gray

Converts an RGB image tensor into a grayscale tensor by computing a weighted sum of the RGB channels using convolution.

```
rgb2gray(image: Tensor): Tensor
```

### Edge detectors

#### sobel

Detects edges in a grayscale image tensor using the Sobel operator. It calculates intensity gradients in the horizontal (X) and vertical (Y) directions and combines them to highlight edges.

```
sobel(image: Tensor): Tensor;
```

### Filters

#### contrast stretch

Performs contrast stretching on a image by normalizing its pixel values between 0 and a specified globalMax. This enhances the contrast of an image by expanding the range of pixel intensities. You can think this operation as balancing the historgram of pixel intensities.

```
contrastStretch(image: Tensor, globalMax = 255): Tensor;
```

#### gamma

The gamma filter is a mathematical transformation often used to adjust brightness and contrast non-linearly based on gamma factor. Use gamma >1 for darkening and gamma <1 for brightening.

```
gamma(tensor: Tensor, gamma: number, c?: number): Tensor;
```

### Geometric transformations

#### verticalFlip

#### horizontalFlip

Mirrors a 2D image tensor horizontally, flipping it from left to right.

```
horizontalFlip(image: Tensor): Tensor;
```
