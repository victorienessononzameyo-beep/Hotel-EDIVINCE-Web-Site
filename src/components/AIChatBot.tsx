import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Landmark, HelpCircle, Bot, Sparkles } from "lucide-react";
import { ChatMessage } from "../types";
import { apiService } from "../utils/apiService";

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatBot({ isOpen, onClose }: AIChatBotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Mbolo ! Bienvenue sur le site de l'Hôtel EDIVINCE A.N Kribi. Je suis votre assistant virtuel 24h/24. Je peux vous renseigner sur nos chambres, nos tarifs, notre emplacement en face de la Marina ou vous recommander des activités à Kribi. Que puis-je faire pour vous aujourd'hui ?",
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    { text: "💵 Tarifs des chambres", query: "Quels sont les tarifs de vos chambres ?" },
    { text: "📍 Où se situe l'hôtel ?", query: "Quelle est votre adresse exacte à Kribi et comment venir ?" },
    { text: "🌴 Activités à Kribi", query: "Que peut-on faire et visiter d'intéressant à Kribi ?" },
    { text: "📞 Comment vous contacter ?", query: "Quels sont vos contacts téléphoniques et WhatsApp ?" }
  ];

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const chatHistory = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp
      }));

      const reply = await apiService.sendChatMessage(chatHistory);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, j'ai rencontré un contretemps. Vous pouvez joindre notre réception directement sur WhatsApp au +237 670 49 71 40 ou par appel au +237 696 82 66 09.",
          timestamp: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  if (!isOpen) return null;

  return (
    <div id="ai-chat-drawer" class="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-[#F4EBE1] text-[#0A2342] shadow-2xl border-l border-gold/20 flex flex-col animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div class="bg-ocean text-sand p-4 border-b border-gold/20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-gold/10 border border-gold/30 rounded-lg">
            <Bot class="h-5 w-5 text-gold animate-pulse" />
          </div>
          <div>
            <h3 class="font-serif font-bold text-base text-white flex items-center gap-1.5">
              Assistant IA EDIVINCE
              <span class="inline-flex items-center text-[9px] font-sans font-medium px-1.5 py-0.5 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                En ligne
              </span>
            </h3>
            <p class="text-[10px] text-sand/60">Concierge virtuel • Dispo 24h/24</p>
          </div>
        </div>
        <button
          onClick={onClose}
          class="p-1 rounded-lg text-sand/70 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
        >
          <X class="h-6 w-6" />
        </button>
      </div>

      {/* Messages List */}
      <div class="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} class={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
            <div class={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed font-sans shadow-sm ${
              msg.role === "user"
                ? "bg-ocean text-sand rounded-br-none border border-ocean/50"
                : "bg-white text-ocean rounded-bl-none border border-gold/10"
            }`}>
              <div class="whitespace-pre-line">{msg.content}</div>
              <span class={`text-[9px] block mt-1.5 text-right ${
                msg.role === "user" ? "text-sand/50" : "text-gray-400"
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div class="flex items-start gap-2">
            <div class="bg-white border border-gold/10 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center gap-1">
              <span class="w-1.5 h-1.5 bg-ocean rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span class="w-1.5 h-1.5 bg-ocean rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span class="w-1.5 h-1.5 bg-ocean rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick suggestions if empty or user wants help */}
      <div class="p-4 bg-white/40 border-t border-gold/10">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
          <Sparkles class="h-3 w-3 text-gold" />
          <span>Questions fréquentes :</span>
        </p>
        <div class="flex flex-col gap-1.5">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleSend(reply.query)}
              class="w-full text-left bg-white hover:bg-[#F4EBE1]/50 border border-gold/10 hover:border-gold/30 rounded-lg px-3 py-2 text-xs font-medium text-ocean transition-all shadow-sm focus:outline-none"
            >
              {reply.text}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Form */}
      <form onSubmit={handleSubmit} class="p-3 bg-white border-t border-gold/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez votre question sur l'hôtel..."
          class="flex-grow bg-[#F4EBE1]/30 border border-gold/20 focus:border-gold focus:outline-none px-4 py-3 rounded-xl text-xs font-medium transition-all"
        />
        <button
          type="submit"
          class="bg-ocean text-sand hover:text-white p-3 rounded-xl border border-ocean hover:bg-ocean/90 transition-all flex items-center justify-center focus:outline-none"
        >
          <Send class="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
