import io from 'socket.io-client';
import { toast } from 'react-toastify';

const SOCKET_URL = 'http://localhost:3000';

class SocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.connected = false;
  }

  connect() {
    if (this.connected) return;

    try {
      this.socket = io(SOCKET_URL, {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
      });

      this.socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        this.connected = true;
      });

      this.socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
        this.connected = false;
      });

      this.socket.on('sensor-alert', (data) => {
        if (data && typeof data === 'object' && data.message) {
          toast.warning(data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      });

      this.socket.on('data-update', (data) => {
        if (data && typeof data === 'object') {
          // Ensure data is serializable before passing to listeners
          const serializedData = JSON.parse(JSON.stringify(data));
          this.listeners.forEach((callback) => {
            try {
              callback(serializedData);
            } catch (error) {
              console.error('Error in socket listener callback:', error);
            }
          });
        }
      });

      this.socket.on('error', (error) => {
        console.error('Socket error:', error);
        toast.error('Connection error. Retrying...', {
          position: "bottom-right",
        });
      });
    } catch (error) {
      console.error('Socket connection error:', error);
      this.connected = false;
    }
  }

  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Socket subscriber must be a function');
    }
    const id = Date.now().toString();
    this.listeners.set(id, callback);
    return id;
  }

  unsubscribe(id) {
    if (id) {
      this.listeners.delete(id);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
      this.listeners.clear();
    }
  }

  // Helper method to check connection status
  isConnected() {
    return this.connected;
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService;