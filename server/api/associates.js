/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Associate = require("./../models/associate");

module.exports = {
    getAssociates: function (req, resp) {    
            if (req.decoded.role === 'user') {
                Associate.find({id: req.decoded.username}, function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                    resp.status(200).json(res);
                });
                     
        } else {
            Associate.find(function (err, res) {
                if (err) {
                    console.log(err);
                }
                resp.status(200).json(res);
            });
        }
    },
    
    getAccordingId: function (req, resp) {       
       var associateId = req.params.id;
       if(req.decoded.role === 'user')
           associateId=req.decoded.username;
       
        Associate.findOne({id: associateId}, function (err, res) {
            if (err) {
                console.log(err);
            }
            resp.status(200).json(res);
        });
    }
    
    
}

