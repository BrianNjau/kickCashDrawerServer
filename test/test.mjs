import USB from '../lib/escpos-usb.mjs'
import * as receiptio from '../lib/receiptio.js'

const print = receiptio.print

const bill = `^^^RECEIPT

${new Date().toLocaleString('zh')}

-
|品名 | 数量 | 单价 | 总价|
-
|苹果 |
|| 1 | 1.00 | "1.00|
|香蕉 |
|| 2 | 2.00 | "4.00|
-
^TOTAL | "^5.00

{code:1234567890; option:code128,2,72,nohri}

{code:https://receiptline.github.io/designer/; option:qrcode,8,L}`

// 网口打印-已调通
// await print(bill, `-d 192.168.1.2 -p generic`)

// USB打印(with escpos-usb)-已调通
const commands = await print(bill, `-p generic`)
const device = new USB()
device.open(() => {
  device.write(Buffer.from(commands, 'binary'), device.close)
})

// USB打印(with receiptio)-未调通
// await print(bill, `-d ??? -p generic`)
