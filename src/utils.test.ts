import * as utils from './utils'

it('should convert a valid google drive url', () => {
  const input =
    'https://drive.google.com/file/u/1/d/0B60b9LKpHsoAVUdOa29YY2dNLVJsRTh02Eo560foUkFgYzc4/view?usp=sharing&export=download'
  const output = utils.generateAutodownloadUrl(input)
  expect(output).toEqual(
    `https://docs.google.com/uc?export=download&id=0B60b9LKpHsoAVUdOa29YY2dNLVJsRTh02Eo560foUkFgYzc4`
  )
})

it('should check a valid google drive url', () => {
  expect(utils.isValidGdriveUrl('bla')).toEqual(false)
  expect(
    utils.isValidGdriveUrl(
      'https://drive.google.com/file/u/1/d/0B60b9LKpHsoAVUdOa29YY2dNLVJsRTh02Eo560foUkFgYzc4/view?usp=sharing&export=download'
    )
  ).toEqual(true)
  expect(
    utils.isValidGdriveUrl('0B60b9LKpHsoAVUdOa29YY2dNLVJsRTh02Eo560foUkFgYzc4/view?usp=sharing&export=download')
  ).toEqual(false)
  expect(
    utils.isValidGdriveUrl('/0B60b9LKpHsoAVUdOa29YY2dNLVJsRTh02Eo560foUkFgYzc4/view?usp=sharing&export=download')
  ).toEqual(true)
  expect(
    utils.isValidGdriveUrl('/0B60b9LKpHsoAVUdOa29YY2dNLVJsRTh02Eo560foUkFgYzc4/view?usp=sharing&export=download')
  ).toEqual(true)
  expect(
    utils.isValidGdriveUrl('/0B60b9LKpHsoAVUdOa29YY2dNLVJsRTh02Eo560foUkFgYzc4/export?usp=sharing&export=download')
  ).toEqual(true)
})
