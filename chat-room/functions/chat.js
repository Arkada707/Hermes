const messages = [];

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    // Return all chat messages
    return {
      statusCode: 200,
      body: JSON.stringify(messages)
    };
  } else if (event.httpMethod === 'POST') {
    // Add a new message to the chat
    const { username, message } = JSON.parse(event.body);
    const newMessage = { username, message, timestamp: new Date().toISOString() };
    messages.push(newMessage);
    return {
      statusCode: 200,
      body: JSON.stringify(newMessage)
    };
  }

  return {
    statusCode: 405,
    body: 'Method Not Allowed'
  };
};