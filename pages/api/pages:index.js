import { useEffect, useState } from 'react';

export default function Home() {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch('/api/conversations')
            .then(res => res.json())
            .then(data => setConversations(data.conversations));
    }, []);

    const loadConversation = (number) => {
        setSelectedConversation(number);
        fetch(`/api/conversation/${number}`)
            .then(res => res.json())
            .then(data => setMessages(data.messages));
    };

    const sendMessage = (message) => {
        fetch('/api/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ to: selectedConversation, message })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                loadConversation(selectedConversation);
            } else {
                alert('Error sending message');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 text-black flex">
            <aside className="w-64 bg-blue-600 text-white p-4">
                <h2 className="text-2xl font-semibold mb-4">Conversations</h2>
                <ul>
                    {conversations.map(number => (
                        <li key={number} onClick={() => loadConversation(number)} className="cursor-pointer">
                            {number}
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="flex-1 p-4">
                <h2 className="text-2xl font-semibold mb-4">Messages</h2>
                <div>
                    {messages.map((msg, index) => (
                        <p key={index} className={msg.from_admin ? 'text-blue-600' : 'text-gray-800'}>
                            {msg.message}
                        </p>
                    ))}
                </div>
                {selectedConversation && (
                    <form onSubmit={(e) => { e.preventDefault(); sendMessage(e.target.message.value); e.target.message.value = ''; }}>
                        <input type="text" name="message" placeholder="Type your message here..." className="border p-2 w-full" />
                        <button type="submit" className="bg-blue-600 text-white p-2 mt-2">Send</button>
                    </form>
                )}
            </main>
        </div>
    );
}
