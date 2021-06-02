import { ISeat } from './features/seats/inputSeatsSlice'

interface AutomaticSeatSelectionParams {
  allSeats: ISeat[]
  numOfSeats: number
  adjacent: boolean
}

export const automaticSeatSelection = (opts: AutomaticSeatSelectionParams): ISeat[] => {
  const { allSeats, adjacent, numOfSeats } = opts
  if (adjacent) {
    const allY = allSeats.map((s) => s.cords.y)
    const allX = allSeats.map((s) => s.cords.x)
    const biggestY = Math.max(...allY)
    const biggestX = Math.max(...allX)

    const mapOfSeats = [...new Array(biggestY + 1)].map(
      () => [...new Array(biggestX + 1)].map(() => 1) // initially fill them with 1, so aisles are not taken in count
    )

    allSeats.forEach((s) => {
      mapOfSeats[s.cords.y][s.cords.x] = s.reserved ? 1 : 0
    })

    const result: ISeat[] = []

    while (result.length < numOfSeats) {
      const randomY = Math.floor(Math.random() * mapOfSeats.length)
      const randomX = Math.floor(Math.random() * mapOfSeats[0].length)
      const currRow = mapOfSeats[randomY]
      const currItem = currRow[randomX]
      if (currItem === 0) {
        for (let i = randomX; i < currRow.length; i++) {
          if (currRow[i] === 0) {
            const seat = allSeats.find((s) => s.cords.x === i && s.cords.y === randomY)
            if (seat && result.length < numOfSeats) {
              result.push(seat)
            }
          } else {
            break
          }
        }
        if (numOfSeats - result.length <= currRow.length - (currRow.length - randomX)) {
          for (let i = randomX - 1; i >= 0; i--) {
            if (currRow[i] === 0) {
              const seat = allSeats.find((s) => s.cords.x === i && s.cords.y === randomY)
              if (seat && result.length < numOfSeats) {
                result.push(seat)
              }
            } else {
              break
            }
          }
          if (result.length < numOfSeats) {
            result.splice(0)
          }
        } else {
          result.splice(0)
        }
      } else {
        result.splice(0)
      }
    }

    return result
  } else {
    const result: ISeat[] = []
    while (result.length < numOfSeats) {
      const randomNum = Math.floor(Math.random() * allSeats.length)
      const randomlyChosenSeat = allSeats[randomNum]
      if (randomlyChosenSeat && !randomlyChosenSeat.reserved) {
        result.push(randomlyChosenSeat)
      }
    }
    return result
  }

  // for (let i = 0; i < biggestY; i ++) {
  //   const thislevelSeats = .allSeats.filter((s) => s.cords.y === i)
  //   thislevelSeats.sort((a, b) => )
  // }
  // const seatsSortedByRows = .allSeats.sort((a, b) => (a.cords.y >= b.cords.y ? 1 : -1))
  // const uninterpretedSeats =
}
