import mongoose from './../../config/db'
import * as messages from './../../config/messages'

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    strict: true,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

export function categoryModel() {
  return mongoose.model('Category', CategorySchema)
}

const Category = categoryModel()

export function create(data) {
  return new Category(data)
    .save()
    .then(result => result)
    .catch((err) => {
      throw Object({ message: messages.CREATE_CATEGORY_FAILED, status: 422, payload: err })
    })
}

export function findByIdOrFindAll(categoryId, currentPage) {
  if (categoryId) {
    const { ObjectId } = mongoose.Types
    return Category.findById(ObjectId(categoryId))
      .then(result => result)
      .catch((err) => {
        throw new Error({ payload: err, code: 500 })
      })
  }
  const perPage = 2
  const page = currentPage || 1

  return Category.find({})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(result => (
      Category
        .count()
        .then(contResult => ({
          categories: result,
          currentPage: page,
          pages: Math.ceil(contResult / perPage),
        }))
        .catch((err) => {
          throw new Error({ payload: err, code: 500 })
        })
    ))
    .catch((err) => {
      throw new Error({ payload: err, code: 500 })
    })
}

export function remove(categoryId) {
  const { ObjectId } = mongoose.Types

  return Category.remove({ _id: ObjectId(categoryId) })
    .exec()
    .then(payload => payload)
    .catch((err) => {
      throw Object({ message: messages.REMOVE_CATEGORY_FAILED, status: 422, payload: err })
    })
}
