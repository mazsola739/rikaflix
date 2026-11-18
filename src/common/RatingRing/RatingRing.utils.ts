export const rating = (num: number) => num.toFixed(1)

export const ratingDeg = (num: number) => (360 / 100) * (num * 10)

export const restDeg = (num: number) => 360 - ratingDeg(num)
