// ### Q: Assume there are two ropes R1 and R2 with lengths L1 and L2 and cross-sectional areas of D1 and D2 respectively. R1 takes t1 mins to burn completely. Write a function to calculate the time it will take for R2 to burn completely given the lengths and cross-sectional areas of R1 and R2.

let R1 = {
    len: 4,
    width: 3,
}
let R2 = {
    len: 4,
    width: 3,
}

function CalculateTime(R1, R2, t1 = 5) {
    let volume_per_sec = (Math.PI * (R1.width / 2) * (R1.width / 2) * (R1.len)) / t1
    let t2 = (Math.PI * (R2.width / 2) * (R2.width / 2) * (R2.len)) / volume_per_sec;
    return t2
}

console.log(CalculateTime(R1,R2));