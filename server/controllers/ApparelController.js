import express from 'express'

export default class ApparelController {
  constructor() {
    this.router = express.Router()
      .get('', this.getAllApparel)
  }

  getAllApparel(req, res, next) {
    res.send("All Apparel Here")
  }
}