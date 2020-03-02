const {Kafka} = require("kafkajs")

async function run(){
  try {
    const kafka = new Kafka({
      "clientId": "app",
      "brokers": ["10.40.1.159:9092"]
    })

    const admin = kafka.admin()
    console.log("Connecting...")
    await admin.connect()
    console.log("Connected!")
    await admin.createTopics({
      "topics": [{
        "topic": "Users",
        "numPartions": 2
      }]
    })
    console.log("Created Successfully!")
    await admin.disconnect()
  } catch (ex) {
    console.error(`something bad happened ${ex}`)
  } finally {
    process.exit(0)
  }
}

run()
