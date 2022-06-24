// const baseUrl = 'http://localhost:8000/api'
const baseUrl = 'https://api.b7web.com.br/devcond/api'

const request = async (method, endpoint, params, token = null) => {
  method = method.toLowerCase();
  let fullUrl = `${baseUrl}${endpoint}`
  let body = null

  switch (method) {
    case 'get':
      let queryString = new URLSearchParams(params).toString()
      fullUrl += `?${queryString}`
      break
    case 'post':
    case 'put':
    case 'delete':
      body = JSON.stringify(params)
      break
  }

  let headers = { 'Content-Type': 'application/json' }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  let req = await fetch(fullUrl, { method, body })
  let json = await req.json()
  return json
}

export default () => {
    return {
        getToken: () => {
            return localStorage.getItem('token');
        },

        validateToken: async () => {
            let token = localStorage.getItem('token');
            let json = await request('post', '/auth/validate', {}, token);
            return json;
        },

        login: async (email, password) => {
            let json = await request('post', '/auth/login', { email, password })
            return json;
        },
        logout: async () => {
            let token = localStorage.getItem('token')
            let json = await request('post', '/auth/logout', {}, token);
            localStorage.removeItem('token')
            return json;
        },

        getWall: async () => {
          let token = localStorage.getItem('token');
          let json = await request('get', '/walls', {}, token);
          return json;
        },

        upDateWall: async (id, data) => {
          let token = localStorage.getItem('token');
          let json = await request('put', `/wall/${id}`, data, token);
          return json;
        },

        addWall: async (data) => {
          let token = localStorage.getItem('token');
          let json = await request('post', '/walls', data, token);
          return json;
        },

        removeWall: async (id) => {
          let token = localStorage.getItem('token');
          let json = await request('delet', `/wall/${id}`, {}, token);
          return json;
        },

        getMedicines: async () => {
          let token = localStorage.getItem('token');
          let json = await request('get', '/medics', {}, token);
          return json;
        },
        addMedicines: async () => {
          let token = localStorage.getItem('token');
          let formData = new FormData();
          formData.append('title', data.title);
          if(data.file) {
            formData.append('file', data.file);
          }
          let req = await fetch('${baseUrl}/docs', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });
          let json = await req.json();
          return json;
        },
        updateMedicines: async (id, data) => {
           let roken = localStorage.getItem('token');
           let formData = new FormData();
           formData.append('title', data.title);
           if(data.file) {
            formData.append('file', data.file);
           }
           let req = await fetch(`${baseUrl}/doc/${id}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
           });
           let json = await req.json();
           return json;
        },

        removeMedicine: async (id) => {
          let token = localStorage.getItem('token');
          let json = await request('delete', `/med/${id}`, {}, token);
          return json;
        }
    };
}
