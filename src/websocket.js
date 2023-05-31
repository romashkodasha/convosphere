const createWebSocket = (setMessagesWS) => {
    const newSocket = new WebSocket('ws://localhost:5000');
  
    newSocket.onopen = () => {
      console.log('Соединение установлено');
    };
  
    newSocket.onmessage = (message) => {
        console.log(message)
      const newmessage = JSON.parse(message.data);
      setMessagesWS((prevMessages) => [...prevMessages, newmessage]);
    };
  
    newSocket.onclose = () => {
      console.log('Соединение закрыто');
    };
  
    return newSocket;
  };
  
  export default createWebSocket;