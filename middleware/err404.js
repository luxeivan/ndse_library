module.exports = (req, res) => {
    res.status(404)
    // res.json({ errcode: 404, errmsg: "not found path" })
    res.render('404', { title: "Страница не найдена" })
}