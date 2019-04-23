'use strict'
const db = require('../db')

exports.authenticateByGoogleStrategy = (req, accessToken, refreshToken, profile, done) => {
  db.client.findByIdGoogleStrategy(profile).then((id) => {
    if (id) {
      req.session.newuser = false
      return done(null, profile)
    } else {
      db.client.createUsingGoogleStrategy(profile)
        .then(function (id) {
          req.session.newuser = true
          return done(null, profile)
        })
    }
  })
}

exports.authenticateByFacebookStrategy = (req, accessToken, refreshToken, profile, done) => {
  db.client.findByIdFacebookStrategy(profile).then((id) => {
    if (id) {
      req.session.newuser = false
      return done(null, profile)
    } else {
      db.client.createUsingFacebookStrategy(profile)
        .then(function (id) {
          req.session.newuser = true
          return done(null, profile)
        })
    }
  })
}

exports.loginRedirectGoogleStrategy = async (req, res) => {
  if (req.session.newuser) {
    res.render('pages/form-client', { user: req.user })
  } else {
    await db.client.findByIdGoogleStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/')
  }
}

exports.loginRedirectFacebookStrategy = async (req, res) => {
  if (req.session.newuser) {
    res.render('pages/form-client', { user: req.user })
  } else {
    await db.client.findByIdFacebookStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/')
  }
}

exports.setAddressGoogleStrategy = async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  await db.client.registerAdressUsingGoogleStrategy(req.user).then()
  await db.client.findByIdGoogleStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
}

exports.setAddressFacebookStrategy = async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  await db.client.registerAdressUsingFacebookStrategy(req.user).then()
  await db.client.findByIdFacebookStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
}
