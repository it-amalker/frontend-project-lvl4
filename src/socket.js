// @ts-check

import io from 'socket.io-client';

export default io(`http://localhost:${process.env.PORT || 5000}`);