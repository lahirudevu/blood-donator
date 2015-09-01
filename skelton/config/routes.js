
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

module.exports = router;
