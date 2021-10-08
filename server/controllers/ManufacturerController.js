import express from 'express'
import ApparelService from '../services/ApparelService'
import ManufacturerService from '../services/ManufacturerService'

let _manufacturerService = new ManufacturerService().repository
let _apparelService = new ApparelService().repository

export default class ManufacturerController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllManufacturer)
      .get('/:manufacturerId', this.getManufacturerById)
      .get('/:manufacturerId/apparel', this.getApparelByManufacturerId)
      .post('', this.addManufacturer)
      .put('/:manufacturerId', this.editManufacturer)
      .delete('/:manufacturerId', this.deleteManufacturer)
  }

  async getAllManufacturer(req, res, next) {
    try {
      let manufacturer = await _manufacturerService.find({})
      return res.send(manufacturer)
    } catch (error) {
      next(error)
    }
  }
  async getManufacturerById(req, res, next) {
    try {
      let manufacturer = await _manufacturerService.findById(req.params.manufacturerId)
      return res.send(manufacturer)
    } catch (error) {
      next(error)
    }
  }
  async getApparelByManufacturerId(req, res, next) {
    try {
      let apparel = await _apparelService.find({ manufacturer: req.params.manufacturerId })
      return res.send(apparel)
    } catch (error) {
      next(error)
    }
  }
  async addManufacturer(req, res, next) {
    try {
      let newManufacturer = await _manufacturerService.create(req.body)
      return res.send(manufacturer)
    } catch (error) {
      next(error)
    }
  }

  async editManufacturer(req, res, next) {
    try {
      let editedManufacturer = await _manufacturerService.findOneAndUpdate({ _id: req.params.manufacturerId }, req.body, { new: true })
      return res.send(editedManufacturer)
    } catch (error) {
      next(error)
    }
  }

  async deleteManufacturer(req, res, next) {
    try {
      let toBeDestroyed = await _manufacturerService.findByIdAndRemove(req.params.manufacturerId)
      res.send("Deleted")
    } catch (error) {
      next(error)
    }
  }
}