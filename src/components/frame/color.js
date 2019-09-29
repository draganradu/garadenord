
const cHex3to6 = function (number) {
  // #123 to #112233
  return `${number[0]}${number[0]}${number[1]}${number[1]}${number[2]}${number[2]}`
}

const cHex6to3 = function (number) {
  // #123 to #112233
  return `${number[0]}${number[0]}${number[1]}${number[1]}${number[2]}${number[2]}`
}

const cRgbToHex = function ([r, g, b]) {
  return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const cGrayscale = function ([r, g, b]) {
  const gray = Math.round((0.3 * r) + (0.59 * g) + (0.11 * b))
  return [gray, gray, gray]
}

export {
  cHex3to6,
  cHex6to3,
  cRgbToHex,
  cGrayscale,
}
