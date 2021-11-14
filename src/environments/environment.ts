export const environment = {
  production: false,
  // *******************************
  // MQTT - BROKERS
  // If the application is used over HTTP, the protocol must be ws. If HTTPS is used, the protocol is wss.
  // ATTENTION: The MQTT broker must be able to open the correct websocket either encrypted for wss or unencrypted for ws.
  // *******************************
  hostname: 'YOUR_BROKER_HOSTNAME',
  port: 9001,
  protocol: 'ws',
  username: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
  path: '/mqtt',
  // MQTT Endpoint
  mqttEndpoint: 'YOUR_ENDPOINT'
};
