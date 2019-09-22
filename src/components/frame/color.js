let color = {}

color.hex3to6 = function (number) {
    // #123 to #112233
    return `${number[0]}${number[0]}${number[1]}${number[1]}${number[2]}${number[2]}`
}

export default color
