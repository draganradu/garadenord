const color = require('./src/components/frame/color.js')

test('Test color', () => {
  let colorArray = [['fff','ffffff'], ['123','112233']]

  for (color of colorArray) {
    expect(color.hex3to6(color[0])).toBe(color[1])
  }
  
});


// const testeer = require('./_test_jest.js')

// test('test of tests', () => {
//   expect(testeer(2,3)).toBe(5)
// });