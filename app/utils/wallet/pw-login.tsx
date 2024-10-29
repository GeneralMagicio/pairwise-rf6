import { axiosInstance } from '../axiosInstance';
import StorageLabel from '../../lib/localStorage';

export const isLoggedIn = async () => {
  if (!localStorage.getItem(StorageLabel.AUTH)) return false;
  try {
    const { data } = await axiosInstance.get<Number>('/auth/isloggedin');
    return data;
  }
  catch (err) {
    return false;
  }
};

export const loginToPwBackend = async (
  chainId: number,
  address: string,
  message: string,
  signature: `0x${string}`
) => {
  // const nonce = await fetchNonce()
  // const nonce = generateRandomString(16

  // const message = 'Sign in to Agora with Ethereum';

  // Verify signature
  const { data } = await axiosInstance.post<{
    token: string
    isNewUser: boolean
  }>('/auth/login', {
    ...{ message, signature: `${signature}`, address, chainId },
  });

  const token = data.token;
  window.localStorage.setItem(StorageLabel.AUTH, token);
  window.localStorage.setItem(StorageLabel.LOGGED_IN_ADDRESS, address);
  axiosInstance.defaults.headers.common['auth'] = token;

  return data;
};

export const logoutFromPwBackend = () => {
  try {
    window.localStorage.removeItem(StorageLabel.AUTH);
    window.localStorage.removeItem(StorageLabel.LOGGED_IN_ADDRESS);
    if (axiosInstance.defaults.headers.common['auth']) {
      delete axiosInstance.defaults.headers.common['auth'];
    }
    // await axios.post('/auth/logout')
  }
  catch (err) {
    console.error(err);
  }
};
