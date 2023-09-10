const dgram = require('dgram');
const fs = require('fs');
const {logMessages}   = require("./messages.json")

// Replace these with your Syslog server's IP and port
const syslogServerIP = '127.0.0.1';
const syslogServerPort = 514;

// Function to send a Syslog message
const sendSyslogMessage = (message) => {
    const client = dgram.createSocket('udp4');

    // Send the message to the Syslog server
    client.send(message, syslogServerPort, syslogServerIP, (error) => {
        if (error) {
            console.error(`Error sending Syslog message: ${error.message}`);
        } else {
            console.log(`Syslog message sent successfully: ${message}`);
        }

        // Close the UDP socket
        client.close();
    });
}

const getRandomSyslogMessage = () => {
    return logMessages[Math.floor(Math.random() * logMessages.length)]
}

const sendRandomSyslogMessage = () => {
    setInterval(()=>{
        const randomMessage = getRandomSyslogMessage()
        sendSyslogMessage(randomMessage);
    }, 5000)
}
sendRandomSyslogMessage()
