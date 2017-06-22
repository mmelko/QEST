/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Quarter = require("./../models/quarter");

module.exports = {
    // get all records in quarter by ID 
    getQuarter: function (req, resp) {
        Quarter(req.params.quarter).find(function (err, res) {
            if (err) {
                console.log(err);
            }
            resp.status(200).json(res);
        });
    },
    getAssociateInQuarter: function (req, resp) {
        var associateId = req.params.associate;
        if (req.decoded.role === 'user') {
            associateId = req.decoded.username;
        }

        Quarter(req.params.quarter).findOne({id: associateId}, function (err, res) {
            if (err) {
                console.log(err);
            }
           
            for (var i = 0;i<res.weeks.length;i++){
               for (var j = 0;j<res.weeks[i].goals.length;j++){
                res.weeks[i].goals[j].value=0;
                }
            }
            resp.status(200).json(res);
        });
    },
    updateStatusValues: function (req, resp) {
        Quarter(req.params.quarter).findOne({id: req.params.associate}, function (err, res) {
            if (err) {
                console.log(err);

            }
           // res.weeks = req.body.weeks.weeks;
           modified = req.body.weeks.weeks;
           for (var i = 0;i<res.weeks.length;i++){
               for (var j = 0;j<res.weeks[i].goals.length;j++){
                   if(res.weeks[i].goals[j].value !=modified[i].goals[j].value ){                    
                       res.weeks[i].goals[j].value=modified[i].goals[j].value;
                   }
                       
               }
               
           }
           
            res.markModified('weeks');
            res.save(function (res, err) {
                if (err) {
                    console.log(err);
                }
                    resp.status(200).json({
                        success: true,
                        message: "Statuses modified"
                    });
                
            });

        });
    },
    //TODO
    
    calculateBonusesRatios: function (req,resp){
        
    }
};

