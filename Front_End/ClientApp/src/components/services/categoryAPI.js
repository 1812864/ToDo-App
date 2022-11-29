import RestAPI from './Rest'

class CategoryAPI  {
    constructor () {
        this.adapter = new RestAPI()
    }

    async getCatagorys () {
        let url = 'category/getAll'
        return await this.adapter.getAsync(url, {})
    }

    async getTodoId (payload) {
        let url = `category/getTodoId/${payload}`
        return await this.adapter.getAsync(url, {})
    }

    async updateCatagorys (payload) {
        let url = 'category/updateById'+ `/${payload.id}`
        return await this.adapter.putAsync(url, payload)
    }

    async deleteCatagorys (payload,id) {
        let url = 'category/delete' + `/${id}`
        return await this.adapter.deleteAsync(url, payload)
    }

    async createCatagorys (payload) {
        let url = 'category/create'
        return await this.adapter.postAsync(url, payload)
    }
}

export default CategoryAPI