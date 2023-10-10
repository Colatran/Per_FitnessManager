export function getHoursNMinuts_FromMinutes(minutes) {
  return {
    h: parseInt(minutes/60),
    m: parseInt(minutes%60),
  }
}

export function getTimeText_FromMinutes(minutes) {
  const hm = getHoursNMinuts_FromMinutes(minutes);
  const h = hm.h.toString().padStart(2, '0');
  const m = hm.m.toString().padStart(2, '0');
  return `${h}:${m}`;
}

export function getDurationText_FromMinuts(minutes) {
  const hm = getHoursNMinuts_FromMinutes(minutes);
  
  let h = hm.h === 0 ? "" : hm.h.toString() + "h";
  let m = hm.m === 0 ? "" : hm.m.toString() + "min";
  
  return `${h}${m}`;
}


export const FloorValue = (value) => {return  Math.floor(value * Math.pow(10, 2)) / Math.pow(10, 2);}