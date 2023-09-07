export const tableSize = {
  width: 960 / 1.25,
  height: 540 / 1.25
}

export const playerSize = {
  width: 100,
  height: 100
}


export function getPlayerPosition(playerCount: number): {x: number, y: number} {
  if (playerCount === 1) {
    return {x: playerSize.width/2, y: 0}

  } else if (playerCount === 2) {
    return {x: 0 - playerSize.width/3, y: tableSize.height/2 - playerSize.height/2}

  } else if (playerCount === 3) {
    return {x: playerSize.width/2, y: tableSize.height - playerSize.height*1.25}

  } else if (playerCount === 4) {
    return {x: tableSize.width/2 - playerSize.width/2, y: tableSize.height - playerSize.height}

  } else if (playerCount === 5) {
    return {x: tableSize.width - playerSize.width*1.35, y:tableSize.height - playerSize.height*1.25}

  } else if (playerCount === 6) {
    return {x: tableSize.width - playerSize.width/1.45, y: tableSize.height/2 - playerSize.height/2}

  } else if (playerCount === 7) {
    return {x: tableSize.width - playerSize.width*1.35, y: 0}

  }

  return {x: -playerSize/2, y: tableSize.height/2 - playerSize.height/2}
}