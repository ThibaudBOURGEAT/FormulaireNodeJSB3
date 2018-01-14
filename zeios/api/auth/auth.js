var router = require('express').Router();
var User = require('../../models/User');
var hash = require('../../helpers/hash');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "test";

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    User.findOne({_id: jwt_payload.id}, function(err, user) {
        if (!user) {
            res.status(401).json({message:"Id non trouvé"});
        }
        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });
});

passport.use(strategy);

router.use(passport.initialize());

router.use(bodyParser.urlencoded({
  extended: true
}));

router.post("/", function(req, res) {
  User.findOne({login: req.body.login}, function(err, user) {
    if (!user) {
        console.log(user);
        return res.json({success: false,message:"Utilisateur non trouvé"});
    }

    if(req.body.password)
    {
    if (hash.hashPassword(req.body.password) == user.password) {
          if (!user.del) {
              var payload = {id: user.id};
              var token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({success: true,message: "Vous êtes connecté.", token: token});
          }
          else {
              res.json({success: false,message:"Mauvais compte."});
          }
      }
      else {
          res.json({success: false,message:"Mauvais mot de passe."});
      }
    }else{res.json({success: false, message:"Entrez un mot de passe."})}
  });

});

module.exports = router;
