function cizgivarsa () {
    pos = huskylens.readeArrow(1, Content2.xOrigin)
    if (pos >= 150 && pos <= 170) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, maxspeed)
    } else if (pos < 150) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, maxspeed)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, minspeed)
    } else if (pos > 170) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, maxspeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, minspeed)
    }
    lastpos = pos
}
function cizgiyoksa () {
    if (lastpos < 150) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, maxspeed)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, minspeed)
    }
    if (lastpos > 170) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, maxspeed)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, minspeed)
    }
}
// Start Communication between HuskyLens & Micro:Bit
// 
// Clear Micro:Bit Screen
// 
// Set MOVE variable to FALSE
// 
// Display MAN icon to show system is ready
// 
// If you don't get this far check the connections between HUSKYLENS & Micro:Bit
// Also Check correct Protocol is set on HUSKYLENS as well as make sure the HUSKYLENS is getting adequate power
let lastpos = 0
let pos = 0
let minspeed = 0
let maxspeed = 0
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_LINE_TRACKING)
maxspeed = 50
minspeed = 10
// Request latest result from HUSKYLENS at start of FOREVER so that each time it repeats it has the latest result
// 
// If MOVE variable is set to TRUE - show the recognised ID# from the HUSKYLENS & display its number / light LED based on the result
// 
// If MOVE is set to FALSE turn off BOTH MaQueen LED & Display X on MicroBit
basic.forever(function () {
    huskylens.request()
    if (huskylens.isLearned(1)) {
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultArrow)) {
            cizgivarsa()
        } else {
            cizgiyoksa()
        }
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
})
