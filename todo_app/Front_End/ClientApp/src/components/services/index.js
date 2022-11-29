import Todo from './todoAPI'
import Category from './categoryAPI'

export const TodoAPI = new Todo()
export const CategoryAPI = new Category()

export default {
    TodoAPI,
    CategoryAPI
}
