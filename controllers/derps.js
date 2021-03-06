var Derp = require('../models/derp');

module.exports = {
    index,
    show,
    create,
    remove,
    update
};

function index(req, res) {
    Derp.find({}, function(err, derps) {
        res.render('derps/index', {
            title: 'All Derps',
            derps
        });
    });
}

function show(req, res) {
    Derp.findById(req.params.id, function (err, derp) {
        res.render('derps/show', {
            title: 'Derp Detail',
            derp
        });
    });
}

function create(req, res) {
    var derp = new Derp(req.body);
    console.log(derp);
    derp.save(function(err) {
    // Derp.create(req.body, function(err, derp) {
        // console.log(derp, "AND THE", req.body);
        if (err) return res.redirect('derps');
        res.rediret(`derp/${derp._id}`);
    });
}

function remove(req, res) {
    Derp.findOneAndRemove({'_id': req.params.id}, function(err, threads) {
        res.redirect('/derps');
    });
}

function update(req, res) {
    Derp.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, derp) {
        if (err) return res.redirect('derps/edit');
        res.redirect(`/derps/${derp._id}`);
    });
}