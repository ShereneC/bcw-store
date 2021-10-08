import express from 'express'
import ApparelService from '../services/ApparelService'

let _apparelService = new ApparelService().repository

export default class ApparelController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllApparel)
      .get('/:apparelId', this.getApparelById)
      .post('', this.addApparel)
      .put('/:apparelId', this.editApparel)
      .delete('/:apparelId', this.deleteApparel)
  }

  async getAllApparel(req, res, next) {
    try {
      let apparel = await _apparelService.find({}).populate("manufacturer")
      return res.send(apparel)
    } catch (error) {
      next(error)
    }
  }
  async getApparelById(req, res, next) {
    try {
      let apparel = await _apparelService.findById(req.params.apparelId).populate("manufacturer")
      return res.send(apparel)
    } catch (error) {
      next(error)
    }
  }
  async addApparel(req, res, next) {
    try {
      let newApparel = await _apparelService.create(req.body)
      return res.send(apparel)
    } catch (error) {
      next(error)
    }
  }

  async editApparel(req, res, next) {
    try {
      let editedApparel = await _apparelService.findOneAndUpdate({ _id: req.params.apparelId }, req.body, { new: true })
      return res.send(editedApparel)
    } catch (error) {
      next(error)
    }
  }

  async deleteApparel(req, res, next) {
    try {
      let toBeDestroyed = await _apparelService.findByIdAndRemove(req.params.apparelId)
      res.send("Deleted")
    } catch (error) {
      next(error)
    }
  }
}