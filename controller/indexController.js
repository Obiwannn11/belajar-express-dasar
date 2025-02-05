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
            if(!data) { throw {message: "Gagal Masukkan Data"}}

            return res.json({
                status: true,
                message: "Data Berhasil Dimasukkan",
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Data Gagal Dimasukkan",
            })
            
        }
    }
    
    update  = async (req, res) => {
        try {
            const [updated] = await this._model.update(req.body, {
                where: {id: req.params.id}
            });

            if(!updated) { 
                throw new Error("Gagal Update Data");
            }

            const updatedData = await this._model.findOne({where: {id:req.params.id} });

            return res.json({
                status: true,
                message: "Data Berhasil Di Update",
                data: updatedData
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Data Gagal Di Update",
            })
            
        }
    }
    show  = async (req, res) => {
        console.log(req.params.id)
        try {
            const data = await this._model.findOne({where: {id:req.params.id} });
            if(!data) {
                 throw new Error("Gagal Menemukan Data");
            }

            return res.json({
                status: true,
                message: "Data Berhasil Ditemukan",
                data
            })
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Data Gagal Ditemukan",
            })
            
        }
    }

    delete  = async (req, res) => {
        try {
            const deleted = await this._model.destroy({
                where: {id: req.params.id}
            });

            if(!deleted) {
                 throw new Error("Gagal Menghapus Data")}

            return res.json({
                status: true,
                message: "Data Berhasil Dihapus",
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                message: "Data Gagal Dihapus",
                error: error.message
            })
            
        }
    }

}

module.exports = IndexController;