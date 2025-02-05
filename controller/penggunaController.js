class IndexController {
    _model;

    constructor(model) {
        this._model = model
    }

    index = async (req, res) => {
        try {
            const data = await this._model.findAll();
            return res.json({
                status: true,
                message: "Data Ditemukan",
                total: data.length,
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Data Tidak Ditemukan",
                err: error.message
            })
            
        }
    }

    store  = async (req, res) => {
        try {
            const data = await this._model.create(req.body);
            if(!data) { throw {message: "Gagal Daftar Akun Pengguna"}}

            return res.json({
                status: true,
                message: "Data Berhasil Mendaftar Akun Pengguna",
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Gagal Daftar Akun Pengguna",
            })
            
        }
    }
}

module.exports = IndexController;