import { type ResponseWrapper } from 'src/misc/ResponseWrapper';
import { type Channel } from 'src/models/Channel';
import { api } from 'boot/axios';
import { getErrorMessage } from 'src/misc/helpers';
import { useChannelsStore } from 'stores/channels';
import { useSocketStore } from 'stores/socket';
const channelsStore = useChannelsStore(); 
export async function getChannels(): Promise<ResponseWrapper<Channel[]>> {
  try {
    const { data } = await api.get<Channel[]>('/channels');
    return { success: true, data };
  } catch (error: unknown) {
    return { success: false, message: getErrorMessage(error) };
  }
}

export async function getChannel(channelId: string): Promise<ResponseWrapper<Channel>> {
  try {
    const { data } = await api.get<Channel>('/channels/' + channelId);
    return { success: true, data };
  } catch (error: unknown) {
    return { success: false, message: getErrorMessage(error) };
  }
}

export function leaveChannel(channelId: string) {
  try {
    const socketStore = useSocketStore();
    socketStore.ws?.emit('cancel:sent', channelId)
    channelsStore.removeChannel(channelId)
    return { success: true };
  } catch (e: any) {
    return { success: false, message: e.response?.data?.message || 'Failed to leave channel' };
  }
}

export function deleteChannel(channelId: string) {
  try {
    const socketStore = useSocketStore();

    socketStore.ws?.emit('quit:sent', channelId)

    return { success: true };
  } catch (e: any) {
    return {
      success: false,
      message: e.response?.data?.message || "Failed to delete channel",
    };
  }
}

