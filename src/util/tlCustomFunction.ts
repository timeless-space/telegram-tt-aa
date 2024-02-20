/**
 * TL - Add padding top
 * Description: Add padding top when this function has called, all elements have 'tl-custom-padding' className will be change styles.
 */
import Axios from 'axios';
import { getActions, getGlobal } from '../global';

import type { ApiUser } from '../api/types';
import type { Message } from '../global/types';

const HEIGHT_HEADER_FIXED = 56;

/**
 * TL - Custom a sendMessage function
 */
export function handleSendMessage({ chatId, threadId = 0, text }: Message) {
  getActions().sendMessage({
    text,
    messageList: {
      chatId,
      threadId,
      type: 'thread',
    },
  });
}

/**
 * TL - Set session screen name
 */
export function sendScreenName(name: string) {
  (window as any).onScreenChanged?.postMessage(JSON.stringify({ screenName: name }));
}

/**
 * TL - This function will active expand header in inactive tab folder whenever it is activated in current tab.
 */
export function handleScrollUnactiveTab() {
  // eslint-disable-next-line max-len
  const elements = document.querySelectorAll('#custom-id-chat-list-inf-scroll.chat-list.custom-scroll.Transition_slide');
  const isExpandHeader = sessionStorage.getItem('isExpandHeader');
  if (elements) {
    if (elements.length > 0) {
      elements.forEach((item) => {
        item.scrollTo({ top: isExpandHeader === 'true' ? 0 : HEIGHT_HEADER_FIXED });
      });
    }
  }
}

/**
 * TL - Send push notification
 */
export function sendPushNotification(message: string) {
  (window as any).onShowSnackBar?.postMessage(JSON.stringify({ message }));
}

/**
 * TL - Send link to iOS Native App
 */
export function handleSendLink(message: string) {
  (window as any).openLink?.postMessage(JSON.stringify({ message }));
}

/**
 * TL - Custom function to get base64 encode image data from blob url
 */
export const getBlobData = (url: string) => {
  return new Promise((resolve, reject) => {
    Axios({
      method: 'GET',
      url,
      responseType: 'blob',
    }).then((response: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    }).catch((error: any) => reject(error));
  });
};

/**
 * TL - Custom function to get current user data
 */
export function handleGetUserInfo() {
  const userById = getGlobal().users.byId;
  for (const key of Object.keys(userById)) {
    if (userById[key].hasOwnProperty('isSelf')) {
      (window as any).getUserInfo?.postMessage(JSON.stringify(userById[key]));
      return;
    }
  }
  (window as any).getUserInfo?.postMessage(JSON.stringify({
    message: 'No Data',
  }));
}

/**
 * TL - This function which send contact list of this account to Native App
 */
export async function handleGetContacts() {
  const users = getGlobal().contactList?.userIds.reduce((acc: ApiUser[], id: string) => {
    const user = getGlobal().users.byId[id];
    if (user) {
      acc.push(user);
    }
    return acc;
  }, []);

  // First send contact without avatar
  (window as any).onContactsReceived?.postMessage(JSON.stringify(users));

  const imageList = JSON.parse(window.sessionStorage.getItem('imageList') ?? '[]');
  getGlobal().contactList?.userIds.forEach((id) => {
    const isExist = imageList.some((contact: { id: string; imgBlobUrl: string }) => contact.id === id);
    if (!isExist) {
      imageList.push({
        id,
        imgBlobUrl: '',
      });
    }
  });
  for (const contact of imageList) {
    const { id, imgBlobUrl } = contact;
    const user = getGlobal().users.byId[id];
    if (user && !user?.isSelf) {
      if (imgBlobUrl) {
        await getBlobData(imgBlobUrl).then((data) => {
          // Send the image after calling generate image API
          (window as any).onAvatarReceived?.postMessage(JSON.stringify({
            id,
            photoBase64: data,
          }));
        });
      }
    }
  }
}
