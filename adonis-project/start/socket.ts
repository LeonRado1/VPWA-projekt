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
  .on('invite:sent', 'WsChannelsController.onChannelInvite')
  .on('ban:sent', 'WsChannelsController.onChannelBan')
  .on('join:sent', 'WsChannelsController.onChannelJoin')
  .on('invite:accept', 'WsChannelsController.onInviteAccept');
