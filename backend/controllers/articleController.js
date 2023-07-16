exports.createArticle = async (req, res) => {
    const { link } = req.body;
    const fileName = Date.now() + '.jpg';

    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + fileName
    });
    res.json(fileName);
}

exports.createArticle = async (req, res) => {
}

exports.editArticle = async (req, res) => {
}

exports.deleteArticle = async (req, res) => {
}

exports.addArticleToFav = async (req, res) => {
}