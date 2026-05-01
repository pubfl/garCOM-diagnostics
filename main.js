const { SerialPort } = require('serialport')
const { InterByteTimeoutParser } = require('@serialport/parser-inter-byte-timeout')

const portEmaSWTX = new SerialPort({ path: "COM17", baudRate: 19200 })
const portEmaSWRX = new SerialPort({ path: "COM18", baudRate: 19200 })

// stream gets parsed after no updates for interval x (ms)
const parserEmaSWTX = portEmaSWTX.pipe(new InterByteTimeoutParser({ interval: 10 }))
const parserEmaSWRX = portEmaSWRX.pipe(new InterByteTimeoutParser({ interval: 10 }))


parserEmaSWTX.on('data', (data) => {
    console.log(`${Date.now()} - EMA SW TX: ${data.toString('hex')}`)
})
parserEmaSWRX.on('data', (data) => {
    console.log(`${Date.now()} - EMA SW RX: ${data.toString('hex')}`)
})
