  <template>
  <q-page class="column bg-grey-2" >

    <div class="row items-center justify-between flex-none bg-secondary q-pa-sm q-mb-sm rounded-lg shadow-1" style="position: sticky; top: 50px; z-index: 30;">
      <div class="row items-center" style=" ">
        <q-avatar size="40px" class="q-mr-sm rounded-full">
          <img :src="profilePicture" alt="User" />
        </q-avatar>
        <div class="column">
          <div class="text-subtitle1 text-weight-medium text-white">
            {{ currentChatName }}
          </div>
        </div>
      </div>
      <div class="row items-center chat-actions">
        
      </div>
    </div>

   
      <div class="column q-gutter-sm">
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="[
            'row items-end',
            msg.isOwn ? 'justify-end' : 'justify-start'
          ]"
          
        >
          <q-chat-message
            :text="[msg.text]"
            :sent="msg.isOwn"
            :stamp="formatTime(msg.timestamp)"
            :avatar="!msg.isOwn ? profilePicture : undefined"
            :bg-color="msg.isOwn ? 'secondary' : 'grey-4'"
            :text-color="msg.isOwn ? 'white' : 'dark'"
            class="q-mb-xs"
            style="margin: 10px;"
          />
        </div>
      </div>

  <div class="row items-center q-pa-sm bg-grey-1 flex-none rounded-lg shadow-1" style="position: sticky; bottom: 0px;">
      <q-input
        v-model="newMessage"
        placeholder="Type a message..."
        outlined
        dense
        class="col rounded-lg"
        @keyup.enter="sendMessage"
        autogrow
        :max-height="100"
      />
      <q-btn
        icon="send"
        flat
        round
        dense
        color="primary"
        class="q-ml-sm rounded-full"
        @click="sendMessage"
      />
    </div>
  </q-page>
</template>


  <script lang="ts">
  import { defineComponent } from 'vue';
  import profilePicture from '../assets/profile-picture.png';

  interface Message {
    id: number;
    text: string;
    timestamp: Date;
    isOwn: boolean;
  }

  export default defineComponent({
    name: 'MainPage',
    data() {
      return {
        currentChatName: 'Channel name',
        newMessage: '',
        messagesContainer: null as HTMLElement | null,
        messages: [
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
        ] as Message[]
      };
    },
    computed: {
      profilePicture() {
        return profilePicture;
      }
    },
    methods: {
      sendMessage() {

      },
      formatTime(timestamp: Date): string {
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
      }
    },
    mounted() {
      this.messagesContainer = this.$refs.messagesContainer as HTMLElement;
    }
  });
  </script>


