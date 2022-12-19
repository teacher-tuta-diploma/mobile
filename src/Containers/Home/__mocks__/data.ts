import { faker } from '@faker-js/faker'

// Code to generate User Mock data
export const generatePromtions = (num: number) => {
  const data = []
  while (num >= 0) {
    data.push({
      title: faker.lorem.sentence(),
      image: faker.image.business(),
    })
    num--
  }
  return data
}

// Code to generate User Mock data
export const generateNews = (num: number) => {
  const data = []
  while (num >= 0) {
    data.push({
      title: faker.lorem.sentence(),
      image: faker.image.transport(),
      date: faker.date.between(
        '2022-01-01T00:00:00.000Z',
        '2030-01-01T00:00:00.000Z',
      ), // => "2022-08-22T18:54:23.238Z"
    })
    num--
  }
  return data
}
