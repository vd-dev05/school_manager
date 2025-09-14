import { PositonsModel } from "../../models/positions.js";

const PositionController = {
    create: async (req, res) => {

        try {
            const payload = {
                code: req.body.ma,
                name: req.body.ten,
                des: req.body.moTa,
                isDeleted: !!req.body.trangThai
            };

            // chờ tạo xong
            const position = await PositonsModel.create(payload);

            return res.status(201).json(position);

        } catch (error) {
            res.status(403).json({ message: error.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const positions = await PositonsModel.find()
            if (!positions) {
                return res.status(404).json({ message: "No positions found" });
            }
            if (positions.length === 0) {
                return res.status(404).json({ message: "No positions found" });
            }
            res.set('Cache-Control', 'no-store'); // tránh 304 cache

            res.json(positions);

        } catch (error) {
            res.status(403).json({ message: error.message });
        }
    }
}

export default PositionController