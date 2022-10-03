function giveChange(diff, cid) {
let changeArr
for(let i = cid.length - 1; i > 0; i--) {
if(cid[i-1][0] <= diff && diff <= cid[i][0]) {
changeArr = Array(cid.length - i).fill([0, 0])
for(let j = i-1; j >= 0; j--) {

if(!Number.isInteger(((diff-cid[j][0])/cid[j][0]))
&& ((diff-cid[j][0])/cid[j][0]) > 0) {
changeArr.push([cid[j][0],Math.min(cid[j][1], cid[j][0]*Math.ceil(((diff-cid[j][0])/cid[j][0])))])
diff = diff - Math.min(cid[j][1], cid[j][0]*Math.ceil(((diff-cid[j][0])/cid[j][0])))
diff = parseFloat(diff.toFixed(2))

} else if (Number.isInteger(((diff-cid[j][0])/cid[j][0]))
&& ((diff-cid[j][0])/cid[j][0]) > 0) {
changeArr.push([cid[j][0],Math.min(cid[j][1], cid[j][0]*(1+((diff-cid[j][0])/cid[j][0])))])
diff = diff - Math.min(cid[j][1], cid[j][0]*(1+((diff-cid[j][0])/cid[j][0])))
diff = parseFloat(diff.toFixed(2))
} else if ( ((diff-cid[j][0])/cid[j][0]) <= 0) {
changeArr.push([cid[j][0], 0])
}
}
}
}
return {changeArr, remainder: diff}
}
function currConvert(cid) {
let bankNoteName = [
"ONE HUNDRED",
"TWENTY",
"TEN",
"FIVE",
"ONE",
"QUARTER",
"DIME",
"NICKEL",
"PENNY"
]
for(let i = 0; i < cid.length; i++) {
cid[i][0] = bankNoteName[i]
}
return cid
}
function reversedcurrConvert(cid) {
let bankNoteName = [
"PENNY",
"NICKEL",
"DIME",
"QUARTER",
"ONE",
"FIVE",
"TEN",
"TWENTY",
"ONE HUNDRED"
]
for(let i = 0; i < cid.length; i++) {
cid[i][0] = bankNoteName[i]
}
return cid
}

function checkCashRegister(price, cash, cid) {
let change = {}
let allCash = 0
let diff = cash - price
diff = parseFloat(diff.toFixed(2))
cid[0][0] = 0.01
cid[1][0] = 0.05
cid[2][0] = 0.1
cid[3][0] = 0.25
cid[4][0] = 1
cid[5][0] = 5
cid[6][0] = 10
cid[7][0] = 20
cid[8][0] = 100
let { changeArr, remainder } = giveChange(diff, cid)
for(let i = 0; i < cid.length; i++) {
allCash = allCash + cid[i][1]
}
allCash = parseFloat(allCash.toFixed(2))
if(diff > allCash) {
change['status'] = "INSUFFICIENT_FUNDS"
change['change'] = []
return change
} else if(diff < allCash) {
if(remainder === 0) {
change['status'] = "OPEN"
let convertedArr = currConvert(changeArr)
change['change'] = convertedArr.filter(el => el[1] !== 0)
return change
} else if (remainder > 0) {
change['status'] = "INSUFFICIENT_FUNDS"
change['change'] = []
return change
}
} else {
change['status'] = "CLOSED"
change['change'] = reversedcurrConvert(cid)
return change
}
}
checkCashRegister(27.44, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])