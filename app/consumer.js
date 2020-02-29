const {Kafka} = require("kafkajs")

async function run(){
  try {
    const kafka = new Kafka({
      "clientId": "app",
      "brokers": ["kafka:9092"]
    })

    const consumer = kafka.consumer()
    console.log("Connecting...")
    await consumer.connect()
    console.log("Connected!")

    await consumer.subscribe({
      "topic": "Users",
      "fromBeginning": true
    })

    await consumer.run({
      "eachMessage": async result => {
        console.log(`"Recieved Msg ${result.message.value} on partion ${result.partition}`)
      }
    })

//    await consumer.disconnect()
  } catch (ex) {
    console.error(`something bad happened ${ex}`)
  }

}

run()
