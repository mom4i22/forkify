import { TIMEOUT_SECONDS } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// export const getJSON = async function (url) {
//   try {
//     const response = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(`${data.message}; Error:(${response.status})`);
//     }
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const postJSON = async function (url, uploadData) {
//   try {
//     const fetchObject = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const response = await Promise.race([
//       fetchObject,
//       timeout(TIMEOUT_SECONDS),
//     ]);
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(`${data.message}; Error:(${response.status})`);
//     }
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchObject = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([
      fetchObject,
      timeout(TIMEOUT_SECONDS),
    ]);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`${data.message}; Error:(${response.status})`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
