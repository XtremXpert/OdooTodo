// a library simplify odoo api calls
import apisauce from 'apisauce'
// our "constructor"
//const create = ( baseURL = 'http://192.168.234.124:8069/' ) => {

const create = ( baseURL = 'https://demo-projet.xtremxpert.com/' ) => {
    const odoo = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            'Cache-Control': 'no-cache',
            'Accept': 'application/json'
        },
        // 10 second timeout...
        timeout: 10000
    })

    odoo.axiosInstance.defaults.withCredentials = true;

    //
    // Low Level fonction (basic api)
    //

    // Login function == Return function generate loginSucces action from saga
    const login = (username, password, dbname, baseUrl) => {
        const url = 'web/session/authenticate'

        const params = {
            db: dbname,
            login: username,
            password: password
        }
        const json = JSON.stringify({ params: params });
        console.tron.log(odoo)
//        odoo.setBaseURL(baseUrl)
        return odoo.post(url, json )
    }

    const create = (model, paramsNew, callback) => {
        const url = 'web/dataset/call_kw'

        const params = {
            model,
            method: 'create',
            args: [ paramsNew ],
            kwargs: {
              context: this.context,
            },
          }

        const json = JSON.stringify({
            jsonrpc: '2.0',
            id: new Date().getUTCMilliseconds(),
            method: 'call',
            params});

        return odoo.post(url, json )
    };
    // basic search
    const search = (model, paramsIn) => {
        const url = 'web/dataset/call_kw'

        const params = {            kwargs: {
                context: this.context
            },
            model,
            method: 'search',
            args: [
                paramsIn.domain,
            ],
        }
        const json = JSON.stringify({
            jsonrpc: '2.0',
            id: new Date().getUTCMilliseconds(),
            method: 'call',
            params });
        return odoo.post(url, json )
  }

  // basic search_read
  const search_read = (model, paramsIn) => {
      const url = 'web/dataset/call_kw'

      const params = {
          model,
          method: 'search_read',
          args: [],
          kwargs: {
            context: this.context,
            domain: paramsIn.domain,
            offset: paramsIn.offset,
            limit: paramsIn.limit,
            order: paramsIn.order,
            fields: paramsIn.fields,
          },
        }
      const json = JSON.stringify({
          jsonrpc: '2.0',
          id: new Date().getUTCMilliseconds(),
          method: 'call',
          params});
      return odoo.post(url, json )
  }

  // Basic Get
    const get = (model, paramsIn) => {
        console.tron.log('param')
        console.tron.log(paramsIn)
        console.tron.log(model)

        const url = 'web/dataset/call_kw'

        const params = {
                model,
                method: 'read',
                args: [
                    paramsIn.ids,
                ],
                kwargs: {
                    fields: paramsIn.fields,
                },
            }

        console.tron.log(params)

        const json = JSON.stringify(
            {jsonrpc: '2.0',
            id: new Date().getUTCMilliseconds(),
            method: 'call',
            params});


        console.tron.log(json)
        return odoo.post(url, json )
    }


    return {
        get,
        search_read,
        login,
    }
}

// let's return back our create method as the default.
export default {
  create
}
