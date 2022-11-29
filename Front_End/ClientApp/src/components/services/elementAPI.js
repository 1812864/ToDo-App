import RestAPI from './Rest'

class ElementAPI  {
    constructor () {
        this.adapter = new RestAPI()
    }

    async getElements () {
        let url = 'element/getAll'
        return await this.adapter.getAsync(url, {})
    }

    async getTodoId (payload) {
        let url = `element/getTodoId/${payload}`
        return await this.adapter.getAsync(url, {})
    }

    async updateElements (payload) {
        let url = 'element/updateById'+ `/${payload.id}`
        return await this.adapter.putAsync(url, payload)
    }

    async deleteElements (payload,id) {
        let url = 'element/delete' + `/${id}`
        return await this.adapter.deleteAsync(url, payload)
    }

    async createElements (payload) {
        let url = 'element/create'
        return await this.adapter.postAsync(url, payload)
    }
}

export default ElementAPI