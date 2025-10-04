<template>
  <q-page class="chat-page main-window-layout">
    <div class="chat-header">
      <div class="chat-header-info">
        <q-avatar size="40px" class="q-mr-sm">
          <img :src="profilePicture" alt="User">
        </q-avatar>
        <div class="chat-header-text">
          <div class="chat-title">{{ currentChatName }}</div>
        </div>
      </div>
      <div class="chat-actions">
        
      </div>
    </div>

    <div class="messages-container" ref="messagesContainer">
      <div class="messages-list">
        <div 
          v-for="message in messages" 
          :key="message.id"
          :class="['message', message.isOwn ? 'message-own' : 'message-other']"
        >
          <div v-if="!message.isOwn" class="message-avatar">
            <q-avatar size="28px">
              <img :src="profilePicture" alt="User">
            </q-avatar>
          </div>
          <div class="message-content">
            <div class="message-bubble">
              <div class="message-text">{{ message.text }}</div>
              <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="message-input-container">
      <div class="message-input-wrapper">
        <q-input
          v-model="newMessage"
          placeholder="Type a message..."
          outlined
          dense
          class="message-input"
          @keyup.enter="sendMessage"
          autogrow
          :max-height="100"
        />
       
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import profilePicture from '../assets/profile-picture.png';

const currentChatName = ref('Channel name');
const newMessage = ref('');
const messagesContainer = ref<HTMLElement>();

interface Message {
  id: number;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

const messages = ref<Message[]>([
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        isOwn: false
    },
    {
        id: 2,
        text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        timestamp: new Date(Date.now() - 1000 * 60 * 55),
        isOwn: true
    },
    {
        id: 3,
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        timestamp: new Date(Date.now() - 1000 * 60 * 50),
        isOwn: false
    },
    {
        id: 4,
        text: "Laboris nisi ut aliquip ex ea commodo consequat.",
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
        isOwn: true
    },
    {
        id: 5,
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
        isOwn: false
    },
    {
        id: 6,
        text: "Cillum dolore eu fugiat nulla pariatur.",
        timestamp: new Date(Date.now() - 1000 * 60 * 35),
        isOwn: true
    },
    {
        id: 7,
        text: "Excepteur sint occaecat cupidatat non proident.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        isOwn: false
    },
    {
        id: 8,
        text: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        isOwn: true
    },
    {
        id: 9,
        text: "Curabitur pretium tincidunt lacus.",
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
        isOwn: false
    },
    {
        id: 10,
        text: "Nulla gravida orci a odio.",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        isOwn: true
    },
    {
        id: 11,
        text: "Nullam varius, turpis et commodo pharetra.",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        isOwn: false
    },
    {
        id: 12,
        text: "Eget placerat enim elit eu nunc.",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        isOwn: true
    }
]);

// Send message function
const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  
  const message: Message = {
    id: Date.now(),
    text: newMessage.value.trim(),
    timestamp: new Date(),
    isOwn: true
  };
  
  messages.value.push(message);
  newMessage.value = '';
  
  // Scroll to bottom
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// Format time function
const formatTime = (timestamp: Date): string => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  
  return timestamp.toLocaleDateString();
};
</script>

<style scoped>
/* Chat Page Layout */
.chat-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--header-height));
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  color: var(--text-primary);
  position: relative;
}

/* Chat Header */
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  border-bottom: 1px solid var(--border-light);
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(10px);
  z-index: 1;
  color: var(--text-primary);
}

.chat-header-info {
  display: flex;
  align-items: center;
}

.chat-header-text {
  display: flex;
  flex-direction: column;
}

.chat-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-primary);
  line-height: 1.2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.chat-status {
  font-size: 12px;
  color: #65676b;
  margin-top: 2px;
}

.chat-actions {
  display: flex;
  gap: 4px;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem;
  background: var(--bg-primary);
  min-height: 0;
  max-height: calc(100vh - var(--header-height) - 120px);
  position: relative;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  max-width: 75%;
  animation: messageSlide 0.3s ease-out;
}

@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-own {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-other {
  align-self: flex-start;
}

.message-avatar {
  flex-shrink: 0;
}

.message-content {
  display: flex;
  flex-direction: column;
}

.message-bubble {
  padding: 0.875rem 1.125rem;
  border-radius: var(--border-radius-xl);
  position: relative;
  word-wrap: break-word;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-fast);
  backdrop-filter: blur(5px);
}

.message-bubble:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.message-own .message-bubble {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  color: var(--text-primary);
  border-bottom-right-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md), 0 0 20px rgba(59, 130, 246, 0.3);
}

.message-other .message-bubble {
  background: linear-gradient(135deg, var(--bg-quaternary) 0%, var(--bg-surface) 100%);
  color: var(--text-primary);
  border-bottom-left-radius: var(--border-radius-md);
  border: 1px solid var(--border-light);
}

.message-text {
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.25rem;
  font-weight: 400;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.8;
  text-align: right;
  font-weight: 500;
  color: var(--text-muted);
}

.message-other .message-time {
  text-align: left;
}

.message-input-container {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  border-top: 1px solid var(--border-light);
  backdrop-filter: blur(10px);
}

.message-input-wrapper {
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  background: var(--bg-tertiary);
  border-radius: var(--border-radius-xl);
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-medium);
  transition: var(--transition-fast);
  box-shadow: var(--shadow-sm);
}

.message-input-wrapper:focus-within {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), var(--shadow-md);
}

.message-input {
  flex: 1;
  background-color: transparent;
}

.message-input :deep(.q-field__control) {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0;
  color: var(--text-primary) !important;
}

.message-input :deep(.q-field__native) {
  padding: 0.5rem 0;
  font-size: 0.95rem;
  color: var(--text-primary) !important;
}

.message-input :deep(.q-placeholder) {
  color: var(--text-muted) !important;
}

.input-action-btn {
  color: var(--text-muted);
  min-width: 40px;
  transition: var(--transition-fast);
  border-radius: 50%;
}

.input-action-btn:hover {
  color: var(--text-accent);
  background-color: var(--bg-quaternary);
  transform: scale(1.1);
}

.send-btn {
  color: var(--accent-primary);
  min-width: 40px;
  transition: var(--transition-fast);
  border-radius: 50%;
}

.send-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
}

.send-btn-active {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  color: var(--text-primary);
  box-shadow: var(--shadow-md), 0 0 20px rgba(59, 130, 246, 0.5);
}

.send-btn-active:hover {
  transform: scale(1.1);
  box-shadow: var(--shadow-lg), 0 0 25px rgba(59, 130, 246, 0.6);
}

/* Enhanced Scrollbar styling */
.messages-container::-webkit-scrollbar {
  width: 8px;
}

.messages-container::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: var(--border-radius-sm);
}

.messages-container::-webkit-scrollbar-thumb {
  background: var(--accent-primary);
  border-radius: var(--border-radius-sm);
  transition: var(--transition-fast);
}

.messages-container::-webkit-scrollbar-thumb:hover {
  background: var(--accent-secondary);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

/* Responsive design */
@media (max-width: 600px) {
  .message {
    max-width: 85%;
  }
  
  .chat-header {
    padding: 8px 12px;
  }
  
  .messages-container {
    padding: 12px;
  }
  
  .message-input-container {
    padding: 8px 12px;
  }
}
</style>