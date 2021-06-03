import type { ISeat } from '../features/seats/slices/inputSeatsSlice'

interface AutomaticSeatSelectionParams {
  allSeats: ISeat[]
  numOfSeats: number
  adjacent: boolean
}

const calculateLongestPossibleSequence = (mapOfSeats: number[][]): number => {
  let longestPossibleSequence = 0
  mapOfSeats.forEach((row) => {
    let localLongest = 0
    let tempLongest = 0
    row.forEach((item) => {
      if (item === 0) tempLongest++
      else {
        tempLongest > localLongest ? (localLongest = tempLongest) : null
      }
    })
    if (longestPossibleSequence < localLongest) longestPossibleSequence = localLongest
  })
  return longestPossibleSequence
}

const getSpreadSeats = (numOfSeats: number, allSeats: ISeat[]): ISeat[] => {
  const result: ISeat[] = []
  const rolled: number[] = []
  while (result.length < numOfSeats) {
    let randomNum = Math.floor(Math.random() * allSeats.length)
    while (rolled.some((r) => r === randomNum)) {
      randomNum = Math.floor(Math.random() * allSeats.length)
    }
    rolled.push(randomNum)
    const randomlyChosenSeat = allSeats[randomNum]
    if (randomlyChosenSeat && !randomlyChosenSeat.reserved) {
      result.push(randomlyChosenSeat)
    }
  }
  return result
}

const getAdjacentSeats = (numOfSeats: number, allSeats: ISeat[]): ISeat[] => {
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

  const longestPossibleSequence = calculateLongestPossibleSequence(mapOfSeats)

  const result: ISeat[] = []
  const checkedY: number[] = []

  while (result.length < numOfSeats) {
    const randomX = Math.floor(Math.random() * mapOfSeats[0].length)
    let randomY = Math.floor(Math.random() * mapOfSeats.length)
    if (checkedY.length > 0) {
      const maxCheckedY = Math.max(...checkedY)
      const minCheckedY = Math.min(...checkedY)
      if (Math.random() > 0.5) {
        if (maxCheckedY === biggestY) {
          randomY = minCheckedY - 1
        } else {
          randomY = maxCheckedY + 1
        }
      } else {
        if (minCheckedY === 0) {
          randomY = maxCheckedY + 1
        } else {
          randomY = minCheckedY - 1
        }
      }
    }

    const currRow = mapOfSeats[randomY]
    const currItem = currRow[randomX]

    if (currItem === 0) {
      const tempResult: ISeat[] = []
      for (let i = randomX; i < currRow.length; i++) {
        if (currRow[i] === 0) {
          const seat = allSeats.find((s) => s.cords.x === i && s.cords.y === randomY)
          if (seat && result.length + tempResult.length < numOfSeats) {
            tempResult.push(seat)
          }
        } else {
          if (checkedY.length > 0) {
            if (!currRow.every((i) => i === 1)) {
              checkedY.push(randomY + 1)
            }
          }
          break
        }
      }
      for (let i = randomX - 1; i >= 0; i--) {
        if (currRow[i] === 0) {
          const seat = allSeats.find((s) => s.cords.x === i && s.cords.y === randomY)
          if (seat && result.length + tempResult.length < numOfSeats) {
            tempResult.push(seat)
          }
        } else {
          if (checkedY.length > 0) {
            if (currRow.every((i) => i === 1)) {
              checkedY.push(randomY + 1)
            }
          }
          break
        }
      }
      if (result.length + tempResult.length === numOfSeats) {
        result.push(...tempResult)
        break
      }

      if (numOfSeats >= longestPossibleSequence) {
        if (result.length === 0) {
          if (tempResult.length === longestPossibleSequence) {
            result.push(...tempResult)
            checkedY.push(randomY)
          }
        } else {
          result.push(...tempResult)
          checkedY.push(randomY)
        }
      }
      //
      //
    } else if (numOfSeats <= longestPossibleSequence) {
      result.splice(0)
    }
  }

  return result
}

export const automaticSeatSelection = (opts: AutomaticSeatSelectionParams): ISeat[] => {
  const { allSeats, adjacent, numOfSeats } = opts
  if (adjacent) {
    return getAdjacentSeats(numOfSeats, allSeats)
  } else {
    return getSpreadSeats(numOfSeats, allSeats)
  }
}
