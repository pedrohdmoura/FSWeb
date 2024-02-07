document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chatBox');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendBtn');

  sendBtn.addEventListener('click', () => sendMessage());

  chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });

  function sendMessage() {
      const message = chatInput.value.trim();
      if (message) {
          addMessageToChat('Você', message);
          chatInput.value = '';
          // Aqui você adicionaria a lógica para enviar a mensagem ao backend e obter a resposta
      }
  }

  function addMessageToChat(sender, message) {
      const messageElement = document.createElement('div');
      messageElement.textContent = `${sender}: ${message}`;
      chatBox.appendChild(messageElement);

      // Salvar a mensagem no armazenamento local
      saveMessageInLocalStorage(sender, message);

      // Manter o chatBox rolando para o último mensagem
      chatBox.scrollTop = chatBox.scrollHeight;
  }

  function loadMessagesFromLocalStorage() {
      const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
      messages.forEach(msg => {
          addMessageToChat(msg.sender, msg.message);
      });
  }

  function saveMessageInLocalStorage(sender, message) {
      const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
      messages.push({sender, message});
      localStorage.setItem('chatMessages', JSON.stringify(messages));
  }

  // Carregar mensagens anteriores
  loadMessagesFromLocalStorage();
});
