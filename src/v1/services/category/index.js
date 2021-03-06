import express from 'express'

import {
  create,
  findByIdOrFindAll,
  remove,
  update,
} from './../../models/category'


const router = express.Router()

router.post('/', ({ body }, res, next) => {
  create(body)
    .then(payload => res.status(201).json({ payload }))
    .catch(error => next(error))
})

router.get('/:categoryId?', ({ params, query }, res, next) => {
  const { categoryId } = params
  const { currentPage } = query
  findByIdOrFindAll(categoryId, currentPage)
    .then(payload => res.status(200).json({ payload }))
    .catch(error => next(error))
})

router.delete('/categoryId', ({ params }, res, next) => {
  const { categoryId } = params
  remove(categoryId)
    .then(payload => res.status(200).json({ payload }))
    .catch(error => next(error))
})

router.put('/:categoryId', ({ body, params }, res, next) => {
  const { categoryId } = params

  update(body, categoryId)
    .then(payload => res.status(200).json({ payload }))
    .catch(error => next(error))
})

export default router
