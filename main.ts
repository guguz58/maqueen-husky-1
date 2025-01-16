// Set MOVE variable to TRUE - this "activates" the display loop in the FOREVER block
// 
// Display TICK icon to show it has been activated
input.onButtonPressed(Button.A, function () {
    Move = true
    basic.showIcon(IconNames.Yes)
    basic.pause(1000)
})
// Set MOVE variable to FALSE to "deactivate" the display part of the FOREVER block
// 
// Also turn off both Maqueen LED
input.onButtonPressed(Button.B, function () {
    Move = false
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
    maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
})
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
let Move = false
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
maqueen.motorStop(maqueen.Motors.All)
basic.clearScreen()
Move = false
basic.showIcon(IconNames.StickFigure)
// Request latest result from HUSKYLENS at start of FOREVER so that each time it repeats it has the latest result
// 
// If MOVE variable is set to TRUE - show the recognised ID# from the HUSKYLENS & display its number / light LED based on the result
// 
// If MOVE is set to FALSE turn off BOTH MaQueen LED & Display X on MicroBit
basic.forever(function () {
    huskylens.request()
    if (Move) {
        if (huskylens.isAppear(1, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            basic.showNumber(1)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        } else if (huskylens.isAppear(2, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            basic.showNumber(2)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        } else if (huskylens.isAppear(3, HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
            basic.showNumber(3)
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        } else {
            basic.clearScreen()
            maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
            maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        }
    } else {
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        maqueen.motorStop(maqueen.Motors.All)
        basic.showIcon(IconNames.No)
    }
})
