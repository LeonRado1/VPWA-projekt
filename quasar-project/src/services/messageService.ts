import { api } from 'boot/axios';

export async function getMessages(channelId: string, page = 1) {
  try {
    const res = await api.get(`/channels/${channelId}/messages?page=${page}`);
    return { success: true, data: res.data };
  } catch (e: any) {
    return {
      success: false,
      message: e.response?.data?.message || 'Failed to load messages'
    };
  }
}
