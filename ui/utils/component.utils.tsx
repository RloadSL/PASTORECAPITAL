
export function randomIntFromInterval(min:number, max:number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const hashIDGenerator = (id:string) => {
  let arr = id.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};

export function toHoursAndMinutes(totalSeconds:number) {
  const totalMinutes = Math.floor(totalSeconds / 60);

  const seconds = totalSeconds % 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;


  const twoCharacters = (n:number)=>{
    const sn = n.toString()
    return sn.length < 2 ? '0'.concat(sn) : sn
  }

  return `${twoCharacters(hours)}:${twoCharacters(minutes)}:${twoCharacters(seconds)}`;
}


