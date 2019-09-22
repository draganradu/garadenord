
let imageOfTheDay = function (arrayOfWeather, day) {
  day = day || false
  let settings = {
    count: arrayOfWeather.length,
    time: {
      current: new Date(),
      start: '',
      diff: '',
      daysInYear: '',
    },
    position: '',
  }
  if (day) {
    settings.time.current = new Date('1/1/2019')
    settings.time.current.setDate(settings.time.current.getDate() + (day - 1))
  }

  settings.time.start = new Date('1/1/' + new Date().getFullYear())
  settings.time.daysInYear = settings.time.current.getFullYear() % 400 === 0 || (settings.time.current.getFullYear() % 100 !== 0 && settings.time.current.getFullYear() % 4 === 0) ? 366 : 365
  settings.time.diff = Math.floor((settings.time.current - settings.time.start) / (1000 * 60 * 60 * 24))
  settings.position = Math.round((settings.time.diff / settings.time.daysInYear) * (settings.count - 1))
  return arrayOfWeather[settings.position]
}

export default imageOfTheDay
