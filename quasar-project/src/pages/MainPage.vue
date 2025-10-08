  <template>
  <q-page class="column bg-grey-2 flex" style="font-size: 1.5rem; min-height: 100vh;">
     <div class="flex flex-center column q-pa-xl text-center text-grey-7">
        <q-icon name="forum" size="64px" color="primary" />
        <div class="text-h5 q-mt-md">Select a channel to start chatting</div>
        <div class="text-subtitle2 q-mt-sm">
          Choose one from the left sidebar or create a new channel.
        </div>
    </div>
  </q-page>
  </template>
  

  <script lang="ts">
  import { defineComponent } from 'vue';
  import profilePicture from '../assets/profile-picture.png';
  
  export default defineComponent({
    name: 'MainPage',
    data() {
      return{
       
      }
       
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
    
  });
  </script>


