export const authorizedRequest = async (url: string, method: string, tokenType: string = 'accessToken', body?: object) => {
  const token = localStorage.getItem(tokenType);

  const request: object = body ? {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body)
  } : {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  }

  if (!token || token === '') {
    return undefined;
  }

  const response = await fetch(url, request);

  console.log(response.status)

  if (response.status === 200 || response.status === 201) {
    return await response.json();
  }else{
    // window.location.href = 'http://127.0.0.1:3000/';
    // localStorage.setItem(tokenType, '');
    return response.status;
  }

}

export const unauthorizedRequest = async (url: string, method: string, body?: object) => {
  const request: object = body ? {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)

  } : {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    }
  }

  console.log(body)
  console.log(request)

  const response = await fetch(url, request);

  if (response.status === 200) {
    return await response.json();
  } else {
    return response.status
  }
}
