import express from 'express'
import ApparelService from '../services/ApparelService'
import TagService from '../services/TagService'

let _tagService = new TagService().repository
let _apparelService = new ApparelService().repository

// (validateTagArray) create method to iterate over tags and check for duplicate tags

//NOTE this controller route is under '/api/tags'
export default class TagController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllTag)
      .get('/:tagId/apparel', this.getApparelByTagId)
      .post('', this.addTag)
      .put('/:tagId', this.editTag)
      .delete('/:tagId', this.deleteTag)
  }

  async getAllTag(req, res, next) {
    try {
      let tag = await _tagService.find({})
      return res.send(tag)
    } catch (error) {
      next(error)
    }
  }
  async getTagById(req, res, next) {
    try {
      let tag = await _tagService.findById(req.params.tagId)
      return res.send(tag)
    } catch (error) {
      next(error)
    }
  }
  async getApparelByTagId(req, res, next) {
    try {
      let apparel = await _apparelService.find({ tags: req.params.tagId })
      return res.send(apparel)
    } catch (error) {
      next(error)
    }
  }
  async addTag(req, res, next) {
    try {
      //validateTagArray
      let newTag = await _tagService.create(req.body)
      return res.send(newTag)
    } catch (error) {
      next(error)
    }
  }

  async editTag(req, res, next) {
    try {
      //validateTagArray
      let editedTag = await _tagService.findOneAndUpdate({ _id: req.params.tagId }, req.body, { new: true })
      return res.send(editedTag)
    } catch (error) {
      next(error)
    }
  }

  async deleteTag(req, res, next) {
    try {
      let toBeDestroyed = await _tagService.findByIdAndRemove(req.params.tagId)
      res.send("Deleted")
    } catch (error) {
      next(error)
    }
  }
}