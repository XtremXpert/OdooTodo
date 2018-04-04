// a library simplify odoo api calls
import apisauce from 'apisauce'
// our "constructor"
//const create = ( baseURL = 'http://192.168.234.124:8069/' ) => {
const create = ( baseURL = 'http://demo-projet.xtremxpert.com/' ) => {

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

    //
    // Low Level fonction (basic api)
    //

    // Login function == Return function generate loginSucces action from saga
    const login = (username, password, dbname) => {
        const url = 'web/session/authenticate'
        const params = {
            db: dbname,
            login: username,
            password: password
        }
        const json = JSON.stringify({ params: params });
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
        const url = 'web/dataset/call_kw'

        const params = {
            kwargs: {
                model,
                method: 'read',
                args: [
                    paramsIn.ids,
                ],
                kwargs: {
                    fields: paramsIn.fields,
                },
            }
        }
        const json = JSON.stringify(
            {jsonrpc: '2.0',
            id: new Date().getUTCMilliseconds(),
            method: 'call',
            params});
        return odoo.post(url, json )
    }
    // Now we gonna use those low lev api function and
    // build the real transaction with odoo and their
    // response handler can be link by saga to reducer

    // Projects
    const getProjects = ( sessionId ) => {
        odoo.setHeader('Cookie': sessionId)
        return search_read('project.project', {
            domain: [ [ 'active', '=', true ] ],
//          fields: ['name','id','project_id']
        })

    }

    // TimeSheet
    // In fact timesheet in Odoo are store in account.analytic.line
    // Those account.analytic.line stock many other information related
    // analytic account so we need to extract only those related to
    // returned Project so we need to pass the list of project (id)
    const getTimesheets = ( sessionId, projectIds) => {
        odoo.setHeader('Cookie': sessionId)
        return search_read('account.analytic.line', {
            domain: [ [ 'project_id', 'in', projectIds ] ],
//          fields: ['name','id','project_id']
        })

    }

//     // getProjectTasks
//     const getProjectTasks = ( projectId , sessionId ) => {
//         odoo.setHeader('Cookie': sessionId)
//         return search_read('project.task', {
//             domain: [ [ 'project_id', '=', projectId ] ],
// //          fields: ['name','id','project_id']
//         })
//     }

    // getUsers
    const getUsers = ( sessionId ) => {
        odoo.setHeader('Cookie': sessionId)
        return search_read('hr.employee', {
            domain: [ [ 'user_id', '!=', false ] ],
//          fields: ['name','id','project_id']
        })

    }

//     // getUserTasks
//     const getUserTasks = ( userId , sessionId ) => {
//         odoo.setHeader('Cookie': sessionId)
//         return search_read('project.task', {
//             domain: [ [ 'user_id', '=', userId ] ],
// //          fields: ['name','id','project_id']
//         })
//
//     }

    // getUserTasks
    const getTasks = ( sessionId ) => {
        odoo.setHeader('Cookie': sessionId)
        return search_read('project.task', {
            domain: [ [ 'active', '!=', false ] ],
//          fields: ['name','id','project_id']
        })

    }

    const createTimesheet = ( sessionId, name, date, unit_amount, task_id, user_id ) => {
        odoo.setHeader('Cookie': sessionId)
        return create('account.analytic.line', {
            name: 'test',
            date: date,
            unit_amount: unit_amout,
            task_id: task_id,
            user_id:user_id,
//          fields: ['name','id','project_id']
        })
    }


  return {
    login,
    getUsers,
    getTasks,
    getProjects,
    getTimesheets,
    createTimesheet
  }
}

// let's return back our create method as the default.
export default {
  create
}
