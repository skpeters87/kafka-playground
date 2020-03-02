const {Kafka} = require("kafkajs")
const msg = process.argv[2]

async function run(){
  try {
    const kafka = new Kafka({
      "clientId": "app",
      "brokers": ["10.40.1.159:9092"]
    })

    const producer = kafka.producer()
    console.log("Connecting...")
    await producer.connect()
    console.log("Connected!")

    const partition = msg[0] < "N" ? 0 : 1
    const result = await producer.send({
      "topic": "Users",
      "messages": [{
        "value": msg,
        "partition": partition
      }]
    })

    console.log(`Send Successfully: ${JSON.stringify(result)}`)
    await producer.disconnect()

  } catch (ex) {
    console.error(`something bad happened ${ex}`)

  } finally {
    process.exit(0)
  }
}

run()
