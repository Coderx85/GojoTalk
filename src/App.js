import { useState } from'react'


const App = () => {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

  console.log('messages',messages)

  const getResponse = async () => {
    try{
      const response = await fetch(`http://localhost:8000/prompt/${text}`)
      const data = await response.json()
      console.log('data', data)

      setMessages((premessages) => [
        ...premessages,
        {
          author: data.messages[0].content,
          bot:  data.candidates[0].content
        }
      ])
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  }

  console.log(text)

  function scrollToBottom() {
    var feed = document.querySelector('.feed');
    feed.scrollTop = feed.scrollHeight;
  }


  return (
    <div className="chat-bot">
      <div className="chat-header">
        <div className="info-container">
          <div>
            <img src='author.svg' alt='logo' height={100} width={100} />
          </div>
          <div>
            <h3>Chat with</h3>
            <h1>Gojo Talk</h1>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='slider'>
            <path 
              fill="rgb(90, 10, 120)" 
              fillOpacity="1"
              d="M0,224L60,218.7C120,213,240,203,360,186.7C480,171,600,149,720,154.7C840,160,960,192,1080,186.7C1200,181,1320,139,1380,117.3L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z">
            </path>
        </svg>
      </div>
      <div className="feed">
          {messages?.map((message, _index) =>
              <div key={_index} className='feed-content'>
                  <div className="question bubble"> 
                    <div className='bubble-header'>
                      <img src='author.svg' alt='author-img' height={35} width={35} />
                      <h3>Jogo Talk</h3>
                    </div>
                    <div className='message'>
                      {message.author}
                    </div>
                </div>
                <div className='response bubble'>
                  <div className="bubble-header">
                    <img src='bot.svg' alt='bot-img' height={35} width={35}/>
                    <h3>You</h3>
                  </div>
                  <div className="message">
                    {message.bot}
                  </div>
                  </div>
              </div>
          )}

      </div>
      
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button type='submit' onClick={getResponse}>⇨</button>
    </div>
  )
}

export default App
