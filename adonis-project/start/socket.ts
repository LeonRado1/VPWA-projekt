/*
|--------------------------------------------------------------------------
| Websocket events
|--------------------------------------------------------------------------
|
| This file is dedicated for defining websocket namespaces and event handlers.
|
*/

import Ws from '@ioc:Ruby184/Socket.IO/Ws';

Ws.namespace('/ws')
  .connected('WsChannelsController.onConnect')
  .disconnected('WsChannelsController.onDisconnect')
  .on('join:sent', 'WsChannelsController.onChannelJoin')
  .on('invite:sent', 'WsChannelsController.onChannelInvite')
  .on('revoke:sent', 'WsChannelsController.onChannelRevoke')
  .on('ban:sent', 'WsChannelsController.onChannelBan')
  .on('kick:sent', 'WsChannelsController.onKick')
  .on('quit:sent', 'WsChannelsController.onChannelQuit')
  .on('invite:accept', 'WsChannelsController.onInviteAccept')
  .on('invite:reject', 'WsChannelsController.onInviteReject');
