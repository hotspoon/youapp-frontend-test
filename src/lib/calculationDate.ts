type ZodiacSign =
  | "Capricorn"
  | "Aquarius"
  | "Pisces"
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"

export function getHoroscope(dateString: string) {
  const date = new Date(dateString)
  const month = date.getMonth() + 1 // months are 0-based in JavaScript
  const day = date.getDate()

  switch (month) {
    case 1:
      return day < 20 ? "Capricornus" : "Aquarius"
    case 2:
      return day < 19 ? "Aquarius" : "Pisces"
    case 3:
      return day < 21 ? "Pisces" : "Aries"
    case 4:
      return day < 20 ? "Aries" : "Taurus"
    case 5:
      return day < 21 ? "Taurus" : "Gemini"
    case 6:
      return day < 22 ? "Gemini" : "Cancer"
    case 7:
      return day < 23 ? "Cancer" : "Leo"
    case 8:
      return day < 23 ? "Leo" : "Virgo"
    case 9:
      return day < 23 ? "Virgo" : "Libra"
    case 10:
      return day < 24 ? "Libra" : "Scorpius"
    case 11:
      return day < 22 ? "Scorpius" : "Sagittarius"
    case 12:
      return day < 22 ? "Sagittarius" : "Capricornus"
    default:
      return "Invalid date"
  }
}

export function getZodiac(dateString: string): string {
  // Convert the date string to a JavaScript Date object
  const date: Date = new Date(dateString)

  // Get the year
  const year: number = date.getFullYear()

  // Define zodiac animals and their corresponding years
  const animals: string[] = [
    "Rat",
    "Ox",
    "Tiger",
    "Rabbit",
    "Dragon",
    "Snake",
    "Horse",
    "Goat",
    "Monkey",
    "Rooster",
    "Dog",
    "Pig"
  ]

  // Calculate the zodiac animal index based on the year (cyclic pattern every 12 years)
  const zodiacIndex: number = (year - 1900) % 12

  // Return the zodiac animal based on the index
  return animals[zodiacIndex]
}

export function calculateAge(birthday: any): number {
  const birthDate = new Date(birthday)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}
