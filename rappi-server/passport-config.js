var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const FacebokStrategy = require('passport-facebook').Strategy

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

// configuracion de modulo passport para el logeo con google de cliente
passport.use('googleClient', new GoogleStrategy(
  {
    // la configuracion es de prueba
    clientID: '211157800680-e3eaf3b2fjrq8iga50n240k980prniil.apps.googleusercontent.com',
    clientSecret: 'XGF0o_67kmQQlOIUdFQHCtL1',
    callbackURL: '/login/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario
    // por ahora solo mostrara información
    console.log(profile)
    return done(null, profile)
  }
))
// configuracion de modulo passport para el logeo con google de RappiTendero
passport.use('googleSoyRappi', new GoogleStrategy(
  {
    // la configuracion es de prueba
    clientID: '211157800680-e3eaf3b2fjrq8iga50n240k980prniil.apps.googleusercontent.com',
    clientSecret: 'XGF0o_67kmQQlOIUdFQHCtL1',
    callbackURL: '/soyrappi/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario
    // por ahora solo mostrara información
    console.log(profile)
    return done(null, profile)
  }
))
// configuracion de modulo passport para el logeo con facebook de cliente
passport.use('facebookClient', new FacebokStrategy(
  {
    clientID: '763631774020039',
    clientSecret: '880d835b71c05dae172cde96ed7eeefb',
    callbackURL: '/login/auth/facebook/callback',
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email', 'address', 'friends']
  },
  (accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario
    // por ahora solo mostrara información
    console.log(profile)
    return done(null, profile)
  }))
// configuracion de modulo passport para el logeo con facebook de Rappitendero
passport.use('facebookRT', new FacebokStrategy(
  {
    clientID: '763631774020039',
    clientSecret: '880d835b71c05dae172cde96ed7eeefb',
    callbackURL: '/soyrappi/auth/facebook/callback',
    enableProof: true,
    profileFields: ['id', 'displayName', 'photos', 'email', 'address', 'friends']
  },
  (accessToken, refreshToken, profile, done) => {
    // aqui se define el guardado o busqueda en la base de datos de este usuario
    // por ahora solo mostrara información
    console.log(profile)
    return done(null, profile)
  }))
module.exports = passport
