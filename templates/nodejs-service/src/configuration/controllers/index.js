module.exports = async (req, res, next) => {
    try {
        res.json({
            title: 'Hello!',
            message: 'Hi there'
        })
    } catch (error) {
        next(error)
    }
}
