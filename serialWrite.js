const { SerialPort } = require('serialport')
const { InterByteTimeoutParser } = require('@serialport/parser-inter-byte-timeout')

const port = new SerialPort({ path: "COM14", baudRate: 19200 })

// stream gets parsed after no updates for interval x (ms)
const parser = port.pipe(new InterByteTimeoutParser({ interval: 10 }))


parser.on('data', (data) => {
    console.log(`${Date.now()} - inbound data: ${data.toString('hex')}`)
})


// data to send vv
const strHexData = '00 00'


const data = Buffer.from(strHexData, 'hex')
console.log(`${Date.now()} - sending data: ${data.toString('hex')}`)
port.write(data)