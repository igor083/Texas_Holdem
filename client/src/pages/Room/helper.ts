const allPlayers = [
  {xSide: "left", ySide: "top"},
  {xSide: "left", ySide: "middle"},
  {xSide: "left", ySide: "bottom"},
  {xSide: "middle", ySide: "bottom"},
  {xSide: "right", ySide: "bottom"},
  {xSide: "right", ySide: "middle"},
  {xSide: "right", ySide: "top"},
  {xSide: "middle", ySide: "top"}
];

export function getPos(pos: number) {
  const style = {transform: "", left: "", top: ""}
  const sides = allPlayers[pos];

  if (sides.xSide === "middle") {
    style.transform += "translateX(-50%)";
    style.left = "50%";
  }
  else if (sides.xSide === "right") {
    style.transform += "translateX(-100%)";
    style.left = "100%";
  }

  if (sides.ySide === "middle") {
    style.transform += "translateY(-50%)";
    style.top = "50%";
  }
  else if (sides.ySide === "bottom") {
    style.transform += "translateY(-100%)";
    style.top = "100%";
  }

  return style;
}